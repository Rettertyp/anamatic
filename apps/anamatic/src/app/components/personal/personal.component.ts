import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { GameDetailDto, GameListItemDto } from '@retter/api-interfaces';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CharacterService } from '../../services/character.service';
import { GameSessionService } from '../../services/game-session.service';
import { ScoreService } from '../../services/score.service';
import { WordListService } from '../../services/word-list.service';

@Component({
    selector: 'app-personal',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './personal.component.html',
    styleUrl: './personal.component.css',
})
export class PersonalComponent implements OnInit {
    lastGames: GameListItemDto[] | undefined = undefined;
    bestGames: GameListItemDto[] | undefined = undefined;

    constructor(
        private readonly apiService: ApiService,
        private readonly authService: AuthService,
        private readonly characterService: CharacterService,
        private readonly gameSessionService: GameSessionService,
        private readonly scoreService: ScoreService,
        private readonly wordListService: WordListService,
        private readonly router: Router,
        private readonly cdr: ChangeDetectorRef
    ) {}

    async ngOnInit(): Promise<void> {
        if (!this.authService.isLoggedIn()) {
            await this.router.navigate(['/']);
            return;
        }

        await this.reloadLists();
    }

    async reloadLists(): Promise<void> {
        const [last, best] = await Promise.all([this.apiService.getLastGames(), this.apiService.getBestGames()]);
        console.log('Loaded last games');
        this.lastGames = last;
        this.bestGames = best;
        this.cdr.detectChanges();
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
        console.log(game);
        this.characterService.setCharacterList(game.characters);
        this.gameSessionService.setGameId(game._id);
        this.wordListService.setCorrectWords(game.words);
        this.scoreService.setScore(game.totalScore);
        await this.router.navigate(['/game', game._id]);
    }

    async deleteGame(gameId: string): Promise<void> {
        await this.apiService.deleteGame(gameId);
        await this.reloadLists();
    }

    async logout(): Promise<void> {
        await this.authService.logout();
        this.gameSessionService.setGameId(null);
        this.wordListService.resetAll();
        this.scoreService.reset();
        await this.router.navigate(['/']);
    }
}
