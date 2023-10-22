import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../environment/environment';
import { awakeAnswer, wordAnswer } from '../types';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly baseUrl = environment.production ? 'https://anamatic.onrender.com/api/' : '/api/';

    constructor(private readonly http: HttpClient) {}

    /**
     * Checks a word on the DWDS API and returns the servers response.
     * @param word the word to check on the API
     * @returns the response object from the API
     */
    getWord(word: string): Promise<wordAnswer> {
        return lastValueFrom(this.http.get<wordAnswer>(`${this.baseUrl}${word}`));
    }

    /**
     * Wakes up the server to prevent cold starts.
     * @returns whether the server is awake
     */
    wakeUpServer(): Observable<awakeAnswer> {
        return this.http.get<awakeAnswer>(`${this.baseUrl}wake-up`);
    }
}
