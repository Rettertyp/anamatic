import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

/**
 * Guard to make routes perform a JWT refresh.
 */
@Injectable()
export class JwtRefreshGuard extends AuthGuard("refresh") {
    constructor(private reflector: Reflector) {
        super();
    }
}
