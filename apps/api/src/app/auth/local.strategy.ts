import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { PublicUser } from '../user/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    /**
     * Validates a user's credentials and returns their public information if successful.
     * @param req The request object
     * @param username The user's username
     * @param password The user's password
     * @returns The user's public information if successful
     */
    async validate(username: string, password: string): Promise<PublicUser> {
        return this.authService.validateUserOrThrow(username, password);
    }
}
