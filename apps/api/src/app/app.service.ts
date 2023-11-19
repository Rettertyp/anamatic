import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { dwdsFrequencyAnswer, dwdsWordbankAnswer } from '../assets/types';
import { lastValueFrom } from 'rxjs';
import { awakeAnswer, wordAnswer } from 'src/types';

@Injectable()
export class AppService {
    private readonly _log = new Logger(AppService.name);

    constructor(private readonly httpService: HttpService) {}

    private readonly dwdsUrl = 'https://www.dwds.de/api/';

    async checkWord(word: string): Promise<wordAnswer> {
        try {
            // check if the word exists
            const dwdsExistsData: dwdsWordbankAnswer[] = (
                await lastValueFrom(this.httpService.get(`${this.dwdsUrl}wb/snippet/`, { params: { q: word } }))
            ).data;

            if (dwdsExistsData.length === 0) {
                return { wordExists: false };
            }

            // check the frequency of the word
            const dwdsFrequencyData: dwdsFrequencyAnswer = (
                await lastValueFrom(this.httpService.get(`${this.dwdsUrl}frequency/`, { params: { q: word } }))
            ).data;

            return {
                wordExists: true,
                wordFrequency: dwdsFrequencyData.frequency,
            };
        } catch (error) {
            this._log.error('An Error occured while processing the checkWord-API-Request:', null, error);
            throw new InternalServerErrorException('The server seems to have problems connecting to the API.');
        }
    }

    wakeUpServer(): awakeAnswer {
        return { awake: true };
    }
}
