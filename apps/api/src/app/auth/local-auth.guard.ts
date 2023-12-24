import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard to protect routes using local authentication.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
