import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { WordService } from './word.service';
import { RequestUser } from '../user/user.schema';
import { User } from '../auth/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ObjectIdValidationPipe } from '../util/mongoObjectId.pipe';

@Controller('word')
export class WordController {
    private readonly _log = new Logger(WordController.name);

    constructor(private readonly wordService: WordService) {}

    /**
     * Wakes up the server.
     */
    @Get('wake-up')
    wakeUpServer() {
        return this.wordService.wakeUpServer();
    }

    /**
     * Checks if a word exists in the word bank. For users that are not logged in.
     */
    @Get(':word')
    checkWord(@Param('word') word: string) {
        return this.wordService.checkWord(word);
    }

    /**
     * Checks if a word exists in the word bank. For users that are logged in.
     */
    @UseGuards(JwtAuthGuard)
    @Get(':word/:gameId')
    checkWordWithGameId(
        @Param('word') word: string,
        @Param('gameId', ObjectIdValidationPipe) gameId: string,
        @User() user: RequestUser
    ) {
        return this.wordService.checkWordWithGameId(word, gameId, user);
    }
}
