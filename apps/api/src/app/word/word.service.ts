import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { dwdsFrequencyAnswer, dwdsWordbankAnswer } from '../../assets/types';
import { lastValueFrom } from 'rxjs';
import { wordAnswer, BatchWordCheckResponseDto } from '@retter/api-interfaces';
import { RequestUser } from '../user/user.schema';
import { GameService } from '../game/game.service';

@Injectable()
export class WordService {
    private readonly _log = new Logger(WordService.name);

    constructor(private readonly httpService: HttpService, private readonly gameService: GameService) {}

    private readonly dwdsUrl = 'https://www.dwds.de/api';

    /**
     * Checks if the word exists in the DWDS database and returns the frequency of the word.
     * If gameId and user are provided, adds the word to the game.
     * @param word The word to check.
     * @param gameId Optional game ID to add the word to.
     * @param user Optional user making the request.
     * @returns The frequency of the word / false if the word does not exist.
     */
    async checkWord(word: string, gameId?: string, user?: RequestUser): Promise<wordAnswer> {
        // check if the word exists
        const wordExists = await this.checkWordExists(word);

        if (!wordExists) return { wordExists: false };

        // check the frequency of the word
        const frequency: number = await this.getWordFrequency(word);
        const points: number = this.calculatePoints(word, frequency);

        // add the word to the game if gameId and user are provided
        if (gameId && user) {
            await this.gameService.addWord(user, gameId, word, points);
        }

        return {
            wordExists,
            points,
        };
    }

    /**
     * Checks if a word exists in the word bank.
     * @param word - The word to check.
     * @returns A promise that resolves to a boolean indicating whether the word exists or not.
     */
    private async checkWordExists(word: string): Promise<boolean> {
        if (word.length < 2) return false;

        // check if the word exists
        const dwdsExistsData: dwdsWordbankAnswer[] = (
            await lastValueFrom(this.httpService.get(`${this.dwdsUrl}/wb/snippet/`, { params: { q: word } }))
        ).data;

        // if (dwdsExistsData.length === 0)
        return dwdsExistsData.length > 0;
    }

    /**
     * Retrieves the frequency of a word from the DWDS API.
     * @param word - The word to get the frequency for.
     * @returns A Promise that resolves to the frequency of the word.
     */
    private async getWordFrequency(word: string): Promise<number> {
        // check the frequency of the word
        const dwdsFrequencyData: dwdsFrequencyAnswer = (
            await lastValueFrom(this.httpService.get(`${this.dwdsUrl}/frequency/`, { params: { q: word } }))
        ).data;

        return dwdsFrequencyData.frequency;
    }

    /**
     * Calculates the number of points a word should give the player.
     * @param word - The word that was used.
     * @returns number of points the word should give
     */
    private calculatePoints(word: string, wordFrequency: number): number {
        const sum = word.length + (6 - wordFrequency) / 2;

        return Math.floor((sum * (sum + 1)) / 4);
    }

    /**
     * Checks multiple words and adds them to the game.
     * @param words Array of words to check.
     * @param gameId Game ID to add the words to.
     * @param user User making the request.
     * @returns Array of word answers.
     */
    async checkWordsInBatch(words: string[], gameId: string, user: RequestUser): Promise<BatchWordCheckResponseDto> {
        const results: BatchWordCheckResponseDto = [];

        for (const word of words) {
            const answer = await this.checkWord(word, gameId, user);
            results.push({ word, answer });
        }

        return results;
    }
}
