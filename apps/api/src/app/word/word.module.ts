import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { HttpModule } from '@nestjs/axios';
import { GameModule } from '../game/game.module';

@Module({
    imports: [HttpModule, GameModule],
    providers: [WordService],
    controllers: [WordController],
})
export class WordModule {}
