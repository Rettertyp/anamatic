import { Injectable, Logger } from '@nestjs/common';
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
        const dwdsData: dwdsAnswer[] = (
            await lastValueFrom(this.httpService.get(this.dwdsUrl, { params: { q: word } }))
        ).data;
        return { wordExists: dwdsData.length > 0 };
    }

    wakeUpServer(): awakeAnswer {
        return { awake: true };
    }
}
