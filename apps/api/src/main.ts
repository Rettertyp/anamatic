/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Needed for refresh-token cookies (req.cookies in JwtRefreshStrategy)
    app.use(cookieParser());

    const frontendOrigin = process.env.FRONTEND_ORIGIN;
    app.enableCors({
        origin: frontendOrigin ?? true,
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    );

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
