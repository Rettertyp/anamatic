import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import authConfig from './auth.config';
import { AuthService, JwtPayload, REFRESH_COOKIE_NAME } from './auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(
        private authService: AuthService,
        @Inject(authConfig.KEY) private authCfg: ConfigType<typeof authConfig>
    ) {
        super({
            jwtFromRequest: (req: Request & { cookies: Record<string, unknown> }) =>
                req?.cookies ? req.cookies[REFRESH_COOKIE_NAME] : null,
            ignoreExpiration: false,
            secretOrKey: authCfg.jwtRefreshSecret,
        });
    }

    /**
     * Validates a user's JWT and returns their JWT payload if successful.
     * @param payload The user's JWT payload
     * @returns The user's JWT payload if successful
     */
    async validate(payload: JwtPayload): Promise<JwtPayload> {
        return payload;
    }
}
