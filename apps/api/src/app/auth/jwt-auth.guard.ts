import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';

/**
 * Guard to protect routes using JWT authentication.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('access') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
}

/**
 * Guard to protect routes using JWT authentication. Allows requests with no JWT token.
 */
@Injectable()
export class OptionalJwtAuthGuard extends JwtAuthGuard {
    constructor(reflector: Reflector) {
        super(reflector);
    }

    handleRequest(err, user, info) {
        // Allow requests with no JWT token.
        if (err || info instanceof UnauthorizedException) {
            return null;
        }
        return user;
    }
}
