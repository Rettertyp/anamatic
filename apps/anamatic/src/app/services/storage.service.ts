import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root',
})
/**
 * Service for managing session storage.
 */
export class StorageService {
    constructor() {}

    /**
     * Clears the session storage.
     */
    public clean() {
        window.sessionStorage.clear();
    }

    /**
     * Saves the user object to the session storage.
     * @param user - The user object to be saved.
     */
    public saveUser(user: { access_token: string }) {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    /**
     * Retrieves the user object from the session storage.
     * @returns The user object if it exists, otherwise an empty object.
     */
    public getUser(): { access_token: string } | null {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return null;
    }

    /**
     * Checks if a user is logged in.
     * @returns True if a user is logged in, false otherwise.
     */
    public isLoggedIn(): boolean {
        const user = this.getUser();
        return !!user?.access_token;
    }
}
