import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { dwdsAnswer } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL: string = 'https://www.dwds.de/api/';
  private header = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  });

  constructor(private readonly http: HttpClient) {}

  /**
   * Checks a word on the DWDS API and returns the servers response.
   * @param word the word to check on the API
   * @returns the response object from the API
   */
  getWord(word: string): Promise<dwdsAnswer> {
    return lastValueFrom(
      this.http.get<dwdsAnswer>(`${this.apiURL}wb/snippet/`, {
        params: { q: word },
        headers: this.header,
      })
    );
  }
}
