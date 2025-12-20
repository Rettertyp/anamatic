import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CharacterService } from '../../services/character.service';
import { GameSessionService } from '../../services/game-session.service';
import { ScoreService } from '../../services/score.service';
import { WordListService } from '../../services/word-list.service';

@Component({
    selector: 'app-leaderboard',
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent {
    leaderboard$ = this.apiService.getLeaderboard();

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private characterService: CharacterService,
        private gameSessionService: GameSessionService,
        private scoreService: ScoreService,
        private wordListService: WordListService,
        private router: Router
    ) {}

    async challenge(characters: string[]): Promise<void> {
        if (!this.authService.isLoggedIn()) {
            // For anonymous users, just start a game with these characters
            this.characterService.setCharacterList(characters);
            this.gameSessionService.setGameId(null);
            this.wordListService.resetAll();
            this.scoreService.reset();
            await this.router.navigate(['/game']);
        } else {
            // For logged-in users, create a new game in the backend
            const created = await this.apiService.createGame(characters);
            this.characterService.setCharacterList(characters);
            this.gameSessionService.setGameId(created._id);
            this.wordListService.resetAll();
            this.scoreService.reset();
            await this.router.navigate(['/game', created._id]);
        }
    }

    goBack(): void {
        this.router.navigate(['/personal']);
    }
}
