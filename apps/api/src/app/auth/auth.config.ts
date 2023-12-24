import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    jwtAccessSecret: process.env.AUTH_JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.AUTH_JWT_REFRESH_SECRET,
}));
