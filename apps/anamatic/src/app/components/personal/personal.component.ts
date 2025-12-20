import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { GameDetailDto } from '@retter/api-interfaces';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CharacterService } from '../../services/character.service';
import { GameSessionService } from '../../services/game-session.service';
import { ScoreService } from '../../services/score.service';
import { WordListService } from '../../services/word-list.service';
import { GameListComponent } from '../game-list/game-list.component';
import { startWith, Subject, switchMap } from 'rxjs';

@Component({
    selector: 'app-personal',
    imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink, GameListComponent],
    templateUrl: './personal.component.html',
    styleUrl: './personal.component.css',
})
export class PersonalComponent implements OnInit {
    private readonly refresh$ = new Subject<void>();

    lastGames$ = this.refresh$.pipe(
        startWith(void 0),
        switchMap(() => this.apiService.getLastGames())
    );
    bestGames$ = this.refresh$.pipe(
        startWith(void 0),
        switchMap(() => this.apiService.getBestGames())
    );

    constructor(
        private readonly apiService: ApiService,
        private readonly authService: AuthService,
        private readonly characterService: CharacterService,
        private readonly gameSessionService: GameSessionService,
        private readonly scoreService: ScoreService,
        private readonly wordListService: WordListService,
        private readonly router: Router
    ) {}

    async ngOnInit(): Promise<void> {
        if (!this.authService.isLoggedIn()) {
            await this.router.navigate(['/']);
            return;
        }
    }

    private reloadLists(): void {
        this.refresh$.next();
    }

    async newGame(): Promise<void> {
        const chars = this.characterService.generateNewCharacterList();
        const created = await this.apiService.createGame(chars);
        this.gameSessionService.setGameId(created._id);
        this.wordListService.resetAll();
        this.scoreService.reset();
        await this.router.navigate(['/game', created._id]);
    }

    async resumeGame(gameId: string): Promise<void> {
        const game: GameDetailDto = await this.apiService.getGame(gameId);
        this.characterService.setCharacterList(game.characters);
        this.gameSessionService.setGameId(game._id);
        this.wordListService.setCorrectWords(game.words);
        this.scoreService.setScore(game.totalScore);
        await this.router.navigate(['/game', game._id]);
    }

    async deleteGame(gameId: string): Promise<void> {
        await this.apiService.deleteGame(gameId);
        this.reloadLists();
    }

    async logout(): Promise<void> {
        await this.authService.logout();
        this.gameSessionService.setGameId(null);
        this.wordListService.resetAll();
        this.scoreService.reset();
        await this.router.navigate(['/']);
    }
}
