import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { WordModule } from './word/word.module';
import { GameModule } from './game/game.module';
import { StatusModule } from './status/status.module';

@Module({
    imports: [UserModule, AuthModule, CoreModule, WordModule, GameModule, StatusModule],
})
export class AppModule {}
