import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { PublicUser, RequestUser } from '../user/user.schema';
import { Types } from 'mongoose';
import authConfig from './auth.config';

export const REFRESH_COOKIE_NAME = 'studybuddy_session';

export type JwtPayload = {
    /**
     * The ID of the user.
     */
    sub: string;
    /**
     * The username of the user.
     */
    username: string;
};

@Injectable()
export class AuthService {
    private readonly _log = new Logger(AuthService.name);
    private readonly SALT_ROUNDS = 10;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(authConfig.KEY) private readonly authCfg: ConfigType<typeof authConfig>
    ) {}

    /**
     * Validates a user's credentials and returns their public information if successful.
     * @param username - The username of the user
     * @param password - The plaintext password of the user
     * @returns A Promise that resolves to the public information of the user if successful
     * @throws UnauthorizedException if the user is not found or the password is incorrect
     */
    async validateUserOrThrow(username: string, password: string) {
        const user = await this.userService.findByNameOrThrow(username);

        if (!(await this.validatePassword(password, user.passwordHash))) {
            throw new UnauthorizedException('Invalid password');
        }

        // strip password has from user object
        delete user.passwordHash;

        return user;
    }

    /**
     * Logs in a user and returns a refresh token and an access token.
     * @param user The user to log in
     * @returns An object containing the refresh token and the access token
     */
    async login(user: PublicUser): Promise<{ refreshToken: string; accessToken: string }> {
        const payload: JwtPayload = {
            sub: user._id,
            username: user.name,
        };
        const [refreshToken, accessToken] = await Promise.all([
            this.jwtService.signAsync(payload, { secret: this.authCfg.jwtRefreshSecret, expiresIn: '3d' }),
            this.refresh(payload),
        ]);
        return { refreshToken, accessToken };
    }

    /**
     * Generates a new access token for a user.
     * @param refreshPayload The payload of the refresh token
     * @returns A Promise that resolves to the new access token
     */
    async refresh(refreshPayload: JwtPayload): Promise<string> {
        return this.jwtService.signAsync(refreshPayload);
    }

    /**
     * Validates a plain text password against a hash.
     * @param password The plain text password to validate
     * @param hash The hash to validate against
     * @returns Promise that resolves to boolean indicating whether the password is valid
     */
    private async validatePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }

    /**
     * Generates a user object based on the provided JWT payload.
     * @param payload - The JWT payload containing user information
     * @returns A RequestUser object with the user's information
     */
    generateUserObject(payload: JwtPayload): RequestUser {
        return {
            _id: new Types.ObjectId(payload.sub),
            name: payload.username,
        };
    }
}
