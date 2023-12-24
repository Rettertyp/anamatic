import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import authConfig from './auth.config';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        ConfigModule.forFeature(authConfig),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule.forFeature(authConfig)],
            useFactory: async (authCfg: ConfigType<typeof authConfig>) => ({
                secret: authCfg.jwtAccessSecret,
                signOptions: { expiresIn: '1w' },
            }),
            inject: [authConfig.KEY],
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
    exports: [],
})
export class AuthModule {}
