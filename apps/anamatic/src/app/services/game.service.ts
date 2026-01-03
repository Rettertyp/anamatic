import { Injectable } from '@angular/core';
import { GameDetailDto, wordAnswer } from '@retter/api-interfaces';
import { ScoreService } from './score.service';
import { WordCheckerService } from './word-checker.service';
import { WordListService } from './word-list.service';
import { GameSessionService } from './game-session.service';
import { CharacterService } from './character.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(
        private readonly wordCheckerService: WordCheckerService,
        private readonly wordListService: WordListService,
        private readonly gameSessionService: GameSessionService,
        private readonly characterService: CharacterService,
        private readonly apiService: ApiService,
        private readonly scoreService: ScoreService,
        private readonly router: Router
    ) {}

    /**
     * Processes the input of the user and handles it for the game.
     * @param input the word the user put in
     */
    async processInput(input: string): Promise<void> {
        if (this.wordListService.alreadyExists(input)) return;

        this.wordListService.addToPending(input);

        const wordData: wordAnswer = await this.wordCheckerService.checkWord(input);

        this.wordListService.removeFromPending(input);

        if (wordData.wordExists) {
            this.wordListService.addToCorrect(input, wordData.points!);
            this.scoreService.addPoints(wordData.points!);
        } else {
            this.wordListService.addToWrong(input);
        }
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
    }

    /**
     * Syncs the current game to the backend if there are any words.
     */
    async syncCurrentGame(): Promise<void> {
        const allWords = [
            ...this.wordListService.pendingWords().map((w) => w.word),
            ...this.wordListService.correctWords().map((w) => w.word),
            ...this.wordListService.wrongWords().map((w) => w.word),
        ];
        console.log('Syncing game with words:', allWords);

        // Only sync if there are words to save
        if (allWords.length === 0) {
            return;
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
            // add game ID to route without reloading
            this.router.navigate(['/game', gameId], { replaceUrl: true });

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
        } catch (error) {
            console.error('Failed to sync game:', error);
        }
    }
}
