import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GameSessionService {
    private readonly gameIdSubject = new BehaviorSubject<string | null>(null);

    get gameId$(): Observable<string | null> {
        return this.gameIdSubject.asObservable();
    }

    get gameId(): string | null {
        return this.gameIdSubject.value;
    }

    setGameId(gameId: string | null): void {
        this.gameIdSubject.next(gameId);
    }
}
