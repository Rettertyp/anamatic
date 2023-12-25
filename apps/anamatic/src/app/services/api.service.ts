import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, of, share, tap } from 'rxjs';
import { environment } from '../environment/environment';
import { awakeAnswer, wordAnswer } from '@retter/api-interfaces';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly baseUrl = environment.production ? 'https://anamatic.onrender.com/api/' : '/api/';

    private apiIsAwake = false;
    private wakeUpObservable: Observable<awakeAnswer> | null = null;

    constructor(private readonly http: HttpClient) {}

    /**
     * Checks a word on the DWDS API and returns the servers response.
     * @param word the word to check on the API
     * @returns the response object from the API
     */
    getWord(word: string): Promise<wordAnswer> {
        return lastValueFrom(this.http.get<wordAnswer>(`${this.baseUrl}word/${word}`));
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
        return this.http.get<awakeAnswer>(`${this.baseUrl}word/wake-up`).pipe(
            tap(() => {
                this.apiIsAwake = true;
                this.wakeUpObservable = null;
            }),
            share()
        );
    }
}
