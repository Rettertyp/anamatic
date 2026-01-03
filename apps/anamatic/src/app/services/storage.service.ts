import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root',
})
/**
 * Service for managing local storage for authentication.
 */
export class StorageService {
    constructor() {}

    /**
     * Clears the local storage.
     */
    public clean() {
        window.localStorage.removeItem(USER_KEY);
    }

    /**
     * Saves the user object to the local storage.
     * @param user - The user object to be saved.
     */
    public saveUser(user: { access_token: string }) {
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    /**
     * Retrieves the user object from the local storage.
     * @returns The user object if it exists, otherwise null.
     */
    public getUser(): { access_token: string } | null {
        const user = window.localStorage.getItem(USER_KEY);
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
