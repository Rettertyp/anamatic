import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from '../user/user.schema';

/**
 * Decorator to retrieve the user object from the request object.
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): RequestUser => {
    const request: Request & { user: RequestUser } = ctx.switchToHttp().getRequest();
    return request.user;
});
