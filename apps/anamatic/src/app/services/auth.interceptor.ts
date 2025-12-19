import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, from, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private readonly refreshTokenSubject = new BehaviorSubject<string | null>(null);

    constructor(private readonly authService: AuthService) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.authService.getAccessToken();
        const authReq = token ? this.addToken(req, token) : req;

        return next.handle(authReq).pipe(
            catchError((err: unknown) => {
                if (!(err instanceof HttpErrorResponse)) {
                    return throwError(() => err);
                }

                // Avoid refresh loops on auth endpoints.
                if (
                    err.status !== 401 ||
                    !this.authService.isLoggedIn ||
                    authReq.url.includes('/auth/login') ||
                    authReq.url.includes('/auth/refresh') ||
                    authReq.url.includes('/auth/logout')
                ) {
                    return throwError(() => err);
                }

                if (this.isRefreshing) {
                    return this.refreshTokenSubject.pipe(
                        filter((t): t is string => t !== null),
                        take(1),
                        switchMap((newToken) => next.handle(this.addToken(req, newToken)))
                    );
                }

                this.isRefreshing = true;
                this.refreshTokenSubject.next(null);

                return from(this.authService.refreshAccessToken()).pipe(
                    switchMap((newToken) => {
                        this.isRefreshing = false;
                        this.refreshTokenSubject.next(newToken);
                        return next.handle(this.addToken(req, newToken));
                    }),
                    catchError((refreshErr) => {
                        this.isRefreshing = false;
                        return from(this.authService.logout()).pipe(
                            switchMap(() => throwError(() => refreshErr))
                        );
                    })
                );
            })
        );
    }

    private addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
