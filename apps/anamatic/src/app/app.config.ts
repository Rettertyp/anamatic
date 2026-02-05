import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';

/**
 * Initializer function that attempts to refresh the access token on app startup.
 * This allows users to stay logged in across browser sessions using the refresh token cookie.
 * Uses a short timeout to avoid blocking page load if backend is not responsive.
 */
function initializeAuth(authService: AuthService) {
    return async () => {
        try {
            // Use a short timeout (3 seconds) to avoid blocking page load if backend is cold-starting
            await authService.refreshAccessToken(3000);
        } catch {
            // User is not logged in or refresh token is invalid/expired, or backend is not responsive yet
            // Nothing to do - the page will load and show backend status indicator if needed
        }
    };
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAuth,
            deps: [AuthService],
            multi: true,
        },
    ],
};
