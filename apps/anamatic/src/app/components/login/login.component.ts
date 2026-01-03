import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { WordListService } from '../../services/word-list.service';
import { GameSessionService } from '../../services/game-session.service';
import { CharacterService } from '../../services/character.service';
import { ScoreService } from '../../services/score.service';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    username = '';
    password = '';
    error = signal<string | null>(null);

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly apiService: ApiService,
        private readonly wordListService: WordListService,
        private readonly gameSessionService: GameSessionService,
        private readonly characterService: CharacterService,
        private readonly scoreService: ScoreService
    ) {}

    async submit(): Promise<void> {
        this.error.set(null);
        try {
            await this.authService.login(this.username, this.password);

            // Sync current game after login
            const syncedGameId = await this.syncCurrentGame();

            // Navigate based on whether we synced a game
            if (syncedGameId) {
                // User had a game in progress, take them to it
                await this.router.navigate(['/game', syncedGameId]);
            } else {
                // No game in progress, take them to personal page
                await this.router.navigate(['/personal']);
            }
        } catch {
            this.error.set('Login fehlgeschlagen');
        }
    }

    /**
     * Syncs the current game to the backend if there are any words.
     * @returns The game ID if a game was synced, null otherwise
     */
    private async syncCurrentGame(): Promise<string | null> {
        const allWords = [
            ...this.wordListService.pendingWords().map((w) => w.word),
            ...this.wordListService.correctWords().map((w) => w.word),
            ...this.wordListService.wrongWords().map((w) => w.word),
        ];

        // Only sync if there are words to save
        if (allWords.length === 0) {
            return null;
        }

        try {
            // Check if we already have a game ID
            let gameId = this.gameSessionService.gameId;

            // If no game ID, create a new game
            if (!gameId) {
                const characters = this.characterService.getCharacterList();
                const newGame = await this.apiService.createGame(characters);
                gameId = newGame._id;
                this.gameSessionService.setGameId(gameId);
            }

            // Batch check all words and register them in the game
            const results = await this.apiService.batchCheckWords(allWords, gameId);

            // Update word lists and score based on results
            this.wordListService.resetAll();
            this.scoreService.reset();
            for (const result of results) {
                if (result.answer.wordExists && result.answer.points !== undefined) {
                    this.wordListService.addToCorrect(result.word, result.answer.points);
                    this.scoreService.addPoints(result.answer.points);
                } else {
                    this.wordListService.addToWrong(result.word);
                }
            }

            return gameId;
        } catch (error) {
            console.error('Failed to sync game:', error);
            return null;
        }
    }
}
