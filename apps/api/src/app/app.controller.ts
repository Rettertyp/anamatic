import { Controller, Get, Logger, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
    private readonly _log = new Logger(AppController.name);

    constructor(private readonly appService: AppService) {}

    @Get('wake-up')
    wakeUpServer() {
        const res = this.appService.wakeUpServer();
        return res;
    }

    @Get(':word')
    checkWord(@Param('word') word: string) {
        return this.appService.checkWord(word);
    }
}
