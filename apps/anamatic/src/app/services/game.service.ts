import { Injectable } from '@angular/core';
import { wordAnswer } from '@retter/api-interfaces';
import { ScoreService } from './score.service';
import { WordCheckerService } from './word-checker.service';
import { WordListService } from './word-list.service';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(
        private readonly scoreService: ScoreService,
        private readonly wordCheckerService: WordCheckerService,
        private readonly wordListService: WordListService
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

    /**
     * Calculates the number of points a word should give the player.
     * @param wordLength length of the word that was used
     * @returns number of points the word should give
     */
    private calculatePoints(wordLength: number, wordFrequency: number): number {
        const sum = wordLength + (6 - wordFrequency) / 2;

        return Math.floor((sum * (sum + 1)) / 4);
    }
}
