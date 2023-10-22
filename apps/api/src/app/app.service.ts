import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { dwdsAnswer } from '../assets/types';
import { lastValueFrom } from 'rxjs';
import { awakeAnswer, wordAnswer } from 'src/types';

@Injectable()
export class AppService {
    private readonly _log = new Logger(AppService.name);

    constructor(private readonly httpService: HttpService) {}

    private readonly dwdsUrl = 'https://www.dwds.de/api/wb/snippet/';

    async checkWord(word: string): Promise<wordAnswer> {
        try {
            const dwdsData: dwdsAnswer[] = (
                await lastValueFrom(this.httpService.get(this.dwdsUrl, { params: { q: word } }))
            ).data;
            return { wordExists: dwdsData.length > 0 };
        } catch (error) {
            this._log.error('An Error occured while processing the checkWord-API-Request:', null, error);
            throw new InternalServerErrorException('The server seems to have problems connecting to the API.');
        }
    }

    wakeUpServer(): awakeAnswer {
        return { awake: true };
    }
}
