import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService, JwtPayload, REFRESH_COOKIE_NAME } from './auth.service';
import { Public } from './public.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';
import { PublicUser } from '../user/user.schema';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { LoginResponseDto } from '@retter/api-interfaces';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request & { user: PublicUser }, @Res() res: Response): Promise<void> {
        const { refreshToken, accessToken } = await this.authService.login(req.user);

        const isProd = process.env.NODE_ENV === 'production';
        res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
            httpOnly: true, // inaccessible to JS, help prevent XSS
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            path: '/api',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
        });
        res.json({ access_token: accessToken } as LoginResponseDto);
    }

    @Public()
    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refresh(@Req() req: Request & { user: JwtPayload }, @Res() res: Response): Promise<void> {
        const accessToken = await this.authService.refresh(req.user);
        res.json({ access_token: accessToken });
    }

    @Public()
    @Post('logout')
    async logout(@Res() res: Response): Promise<void> {
        const isProd = process.env.NODE_ENV === 'production';
        res.clearCookie(REFRESH_COOKIE_NAME, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            path: '/api',
        });
        res.json({ ok: true });
    }
}
