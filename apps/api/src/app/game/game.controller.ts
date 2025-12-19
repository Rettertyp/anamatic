import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GameDetailDto, GameDto, GameListItemDto } from '@retter/api-interfaces';
import { User } from '../auth/user.decorator';
import { RequestUser } from '../user/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GameService } from './game.service';
import { ObjectIdValidationPipe } from '../util/mongoObjectId.pipe';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createGame(@User() user: RequestUser, @Body() gameDto: GameDto) {
        return this.gameService.create(user, gameDto.characters);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':gameId')
    deleteGame(@User() user: RequestUser, @Param('gameId', ObjectIdValidationPipe) gameId: string) {
        return this.gameService.delete(user, gameId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('best')
    getBestGames(@User() user: RequestUser) {
        return this.gameService.findBest(user).then((games) =>
            games.map(
                (g) =>
                    ({
                        _id: g._id.toString(),
                        characters: g.characters,
                        totalScore: g.totalScore,
                        wordsCount: g.words.length,
                    }) as GameListItemDto
            )
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('last')
    getLastGames(@User() user: RequestUser) {
        return this.gameService.findLast(user).then((games) =>
            games.map(
                (g) =>
                    ({
                        _id: g._id.toString(),
                        characters: g.characters,
                        totalScore: g.totalScore,
                        wordsCount: g.words.length,
                    }) as GameListItemDto
            )
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':gameId')
    async getGame(@User() user: RequestUser, @Param('gameId', ObjectIdValidationPipe) gameId: string) {
        const game = await this.gameService.findByIdOrThrow(user, gameId);
        return {
            _id: game._id.toString(),
            characters: game.characters,
            words: game.words,
            totalScore: game.totalScore,
        } as GameDetailDto;
    }
}
