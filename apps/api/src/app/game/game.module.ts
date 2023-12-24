import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './game.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }])],
    providers: [GameService],
    controllers: [GameController],
    exports: [GameService],
})
export class GameModule {}
