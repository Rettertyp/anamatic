import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GameSessionService {
    private readonly gameIdSignal = signal<string | null>(null);

    get gameId(): string | null {
        return this.gameIdSignal();
    }

    setGameId(gameId: string | null): void {
        this.gameIdSignal.set(gameId);
    }
}
