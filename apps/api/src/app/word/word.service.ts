import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { dwdsFrequencyAnswer, dwdsWordbankAnswer } from '../../assets/types';
import { lastValueFrom } from 'rxjs';
import { awakeAnswer, wordAnswer } from '@retter/api-interfaces';
import { RequestUser } from '../user/user.schema';
import { GameService } from '../game/game.service';

@Injectable()
export class WordService {
    private readonly _log = new Logger(WordService.name);

    constructor(private readonly httpService: HttpService, private readonly gameService: GameService) {}

    private readonly dwdsUrl = 'https://www.dwds.de/api/';

    /**
     * Wakes up the server.
     * @returns true
     */
    wakeUpServer(): awakeAnswer {
        return { awake: true };
    }

    /**
     * Checks if the word exists in the DWDS database and returns the frequency of the word.
     * @param word The word to check.
     * @returns The frequency of the word / false if the word does not exist.
     */
    async checkWord(word: string): Promise<wordAnswer> {
        // check if the word exists
        const wordExists = await this.checkWordExists(word);

        if (!wordExists) return { wordExists: false };

        // check the frequency of the word
        const frequency = await this.getWordFrequency(word);

        return {
            wordExists: true,
            points: this.calculatePoints(word, frequency),
        } as wordAnswer;
    }

    /**
     * Checks a word with a given game ID. If the word exists, it is added to the game.
     * @param word - The word to check.
     * @param gameId - The ID of the game.
     * @param user - The user making the request.
     * @returns A promise that resolves to a wordAnswer object.
     */
    async checkWordWithGameId(word: string, gameId: string, user: RequestUser): Promise<wordAnswer> {
        // check if the word exists
        const wordExists = await this.checkWordExists(word);

        if (!wordExists) return { wordExists: false };

        // check the frequency of the word
        const frequency: number = await this.getWordFrequency(word);
        const points: number = this.calculatePoints(word, frequency);

        // add the word to the game
        await this.gameService.addWord(user, gameId, word, points);

        return {
            wordExists: true,
            points: points,
        } as wordAnswer;
    }

    /**
     * Checks if a word exists in the word bank.
     * @param word - The word to check.
     * @returns A promise that resolves to a boolean indicating whether the word exists or not.
     */
    private async checkWordExists(word: string): Promise<boolean> {
        // check if the word exists
        const dwdsExistsData: dwdsWordbankAnswer[] = (
            await lastValueFrom(this.httpService.get(`${this.dwdsUrl}wb/snippet/`, { params: { q: word } }))
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
            await lastValueFrom(this.httpService.get(`${this.dwdsUrl}frequency/`, { params: { q: word } }))
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
}
