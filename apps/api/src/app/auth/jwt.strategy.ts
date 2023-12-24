import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from './auth.config';
import { AuthService, JwtPayload } from './auth.service';
import { RequestUser } from '../user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access') {
    constructor(
        private readonly authService: AuthService,
        @Inject(authConfig.KEY) private readonly authCfg: ConfigType<typeof authConfig>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authCfg.jwtAccessSecret,
        });
    }

    /**
     * Validates a user's JWT and returns their user object if successful.
     * @param payload The user's JWT payload
     * @returns The user's user object if successful
     */
    async validate(payload: JwtPayload): Promise<RequestUser> {
        return this.authService.generateUserObject(payload);
    }
}
