import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly loggedInSubject = new BehaviorSubject<boolean>(this.storageService.isLoggedIn());

    get loggedIn$(): Observable<boolean> {
        return this.loggedInSubject.asObservable();
    }

    get isLoggedIn(): boolean {
        return this.storageService.isLoggedIn();
    }

    constructor(private readonly apiService: ApiService, private readonly storageService: StorageService) {}

    getAccessToken(): string | null {
        const user = this.storageService.getUser();
        return user?.access_token ?? null;
    }

    async login(username: string, password: string): Promise<void> {
        const res = await this.apiService.login(username, password);
        this.storageService.saveUser({ access_token: res.access_token });
        this.loggedInSubject.next(true);
    }

    async refreshAccessToken(): Promise<string> {
        const res = await this.apiService.refresh();
        this.storageService.saveUser({ access_token: res.access_token });
        this.loggedInSubject.next(true);
        return res.access_token;
    }

    async logout(): Promise<void> {
        try {
            await this.apiService.logout();
        } catch {
            // best-effort
        }
        this.storageService.clean();
        this.loggedInSubject.next(false);
    }
}
