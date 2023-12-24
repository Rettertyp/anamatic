import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { GameDto } from '@retter/api-interfaces';
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
}
