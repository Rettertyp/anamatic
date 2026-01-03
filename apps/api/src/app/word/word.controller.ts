import { Controller, Get, Logger, Param, UseGuards, Post, Body } from '@nestjs/common';
import { WordService } from './word.service';
import { RequestUser } from '../user/user.schema';
import { User } from '../auth/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ObjectIdValidationPipe } from '../util/mongoObjectId.pipe';
import { BatchWordCheckDto } from '@retter/api-interfaces';

@Controller('word')
export class WordController {
    private readonly _log = new Logger(WordController.name);

    constructor(private readonly wordService: WordService) {}

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
        return this.wordService.checkWord(word, gameId, user);
    }

    /**
     * Checks multiple words and adds them to the game. For users that are logged in.
     */
    @UseGuards(JwtAuthGuard)
    @Post('batch/:gameId')
    checkWordsInBatch(
        @Body() dto: BatchWordCheckDto,
        @Param('gameId', ObjectIdValidationPipe) gameId: string,
        @User() user: RequestUser
    ) {
        return this.wordService.checkWordsInBatch(dto.words, gameId, user);
    }
}
