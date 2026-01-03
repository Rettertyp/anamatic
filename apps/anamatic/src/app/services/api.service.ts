import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, of, share, tap } from 'rxjs';
import { environment } from '../environment/environment';
import {
    GameDetailDto,
    NewGameDto,
    GameIdDto,
    GameListItemDto,
    LeaderboardEntryDto,
    LoginResponseDto,
    awakeAnswer,
    wordAnswer,
    BatchWordCheckDto,
    BatchWordCheckResponseDto,
} from '@retter/api-interfaces';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly baseUrl = environment.production ? 'https://anamatic.onrender.com/api' : '/api';
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    private apiIsAwake = false;
    private wakeUpObservable: Observable<awakeAnswer> | null = null;

    constructor(private readonly http: HttpClient) {}

    /**
     * Checks a word on the DWDS API and returns the servers response.
     * @param word the word to check on the API
     * @returns the response object from the API
     */
    getWordPublic(word: string): Promise<wordAnswer> {
        return lastValueFrom(
            this.http.get<wordAnswer>(`${this.baseUrl}/word/${word}`, {
                headers: this.headers,
                withCredentials: true,
            })
        );
    }

    getWordForGame(word: string, gameId: string): Promise<wordAnswer> {
        return lastValueFrom(
            this.http.get<wordAnswer>(`${this.baseUrl}/word/${word}/${gameId}`, {
                headers: this.headers,
                withCredentials: true,
            })
        );
    }

    /**
     * Wakes up the server to prevent cold starts.
     * @returns whether the server is awake
     */
    wakeUpServer(): Observable<awakeAnswer> {
        // If the server is already awake, return an observable that completes immediately.
        if (this.apiIsAwake) {
            return of({ awake: true });
        }

        // If the server is not awake, but a request is already in progress, return the observable.
        if (this.wakeUpObservable) {
            return this.wakeUpObservable;
        }

        // If the server is not awake, wake it up and return the observable.
        return this.http.get<awakeAnswer>(`${this.baseUrl}/word/wake-up`).pipe(
            tap(() => {
                this.apiIsAwake = true;
                this.wakeUpObservable = null;
            }),
            share()
        );
    }

    /**
     * Logs in the user.
     * @param username the username of the user
     * @param password the password of the user
     * @returns nothing, the
     */
    async login(username: string, password: string): Promise<LoginResponseDto> {
        return lastValueFrom(
            this.http.post<LoginResponseDto>(
                `${this.baseUrl}/auth/login`,
                {
                    username,
                    password,
                },
                {
                    headers: this.headers,
                    withCredentials: true,
                }
            )
        );
    }

    async refresh(): Promise<LoginResponseDto> {
        return lastValueFrom(
            this.http.get<LoginResponseDto>(`${this.baseUrl}/auth/refresh`, {
                headers: this.headers,
                withCredentials: true,
            })
        );
    }

    async logout(): Promise<{ ok: boolean }> {
        return lastValueFrom(
            this.http.post<{ ok: boolean }>(
                `${this.baseUrl}/auth/logout`,
                {},
                {
                    headers: this.headers,
                    withCredentials: true,
                }
            )
        );
    }

    async createGame(characters: string[]): Promise<GameIdDto> {
        return lastValueFrom(
            this.http.post<GameIdDto>(`${this.baseUrl}/game`, { characters } as NewGameDto, {
                headers: this.headers,
                withCredentials: true,
            })
        );
    }

    async deleteGame(gameId: string): Promise<void> {
        await lastValueFrom(
            this.http.delete(`${this.baseUrl}/game/${gameId}`, {
                headers: this.headers,
                withCredentials: true,
            })
        );
    }

    getBestGames(): Observable<GameListItemDto[]> {
        return this.http.get<GameListItemDto[]>(`${this.baseUrl}/game/best`, {
            headers: this.headers,
            withCredentials: true,
        });
    }

    getLastGames(): Observable<GameListItemDto[]> {
        return this.http.get<GameListItemDto[]>(`${this.baseUrl}/game/last`, {
            headers: this.headers,
            withCredentials: true,
        });
    }

    async getGame(gameId: string): Promise<GameDetailDto> {
        return lastValueFrom(
            this.http.get<GameDetailDto>(`${this.baseUrl}/game/${gameId}`, {
                headers: this.headers,
                withCredentials: true,
            })
        );
    }

    getLeaderboard(): Observable<LeaderboardEntryDto[]> {
        return this.http.get<LeaderboardEntryDto[]>(`${this.baseUrl}/game/leaderboard`, {
            headers: this.headers,
            withCredentials: true,
        });
    }

    /**
     * Checks the backend status.
     * @returns Promise resolving to backend status
     */
    async checkStatus(timeout?: number): Promise<awakeAnswer> {
        return lastValueFrom(
            this.http.get<awakeAnswer>(`${this.baseUrl}/status/`, {
                headers: this.headers,
                timeout,
            })
        );
    }

    /**
     * Checks multiple words in batch and adds them to a game.
     * @param words Array of words to check
     * @param gameId The game ID to add the words to
     * @returns Promise resolving to batch word check response
     */
    async batchCheckWords(words: string[], gameId: string): Promise<BatchWordCheckResponseDto> {
        return lastValueFrom(
            this.http.post<BatchWordCheckResponseDto>(
                `${this.baseUrl}/word/batch/${gameId}`,
                { words } as BatchWordCheckDto,
                {
                    headers: this.headers,
                    withCredentials: true,
                }
            )
        );
    }
}
