import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get(':word')
    checkWord(@Param('word') word: string) {
        return this.appService.checkWord(word);
    }
}
