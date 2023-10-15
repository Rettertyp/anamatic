import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly baseUrl = environment.production ? 'https://anamatic.onrender.com/' : '';
    private readonly port = environment.production ? ':3000' : '';

    constructor(private readonly http: HttpClient) {}

    /**
     * Checks a word on the DWDS API and returns the servers response.
     * @param word the word to check on the API
     * @returns the response object from the API
     */
    getWord(word: string): Promise<boolean> {
        return lastValueFrom(this.http.get<boolean>(`${this.baseUrl}/api/${word}${this.port}`));
    }
}
