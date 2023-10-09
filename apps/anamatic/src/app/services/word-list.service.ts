import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { deleteFromArray } from '../util/deleteFromArray.util';

@Injectable({
  providedIn: 'root',
})
export class WordListService {
  private pendingWordsSubject = new BehaviorSubject<string[]>([]);
  private correctWordsSubject = new BehaviorSubject<string[]>([]);
  private wrongWordsSubject = new BehaviorSubject<string[]>([]);

  get pendingWords$(): Observable<string[]> {
    return this.pendingWordsSubject.asObservable();
  }
  get correctWords$(): Observable<string[]> {
    return this.correctWordsSubject.asObservable();
  }
  get wrongWords$(): Observable<string[]> {
    return this.wrongWordsSubject.asObservable();
  }

  /**
   * Checks whether a word already exists in one of the lists.
   * @param word the word to check
   */
  alreadyExists(word: string): boolean {
    const allWords: string[] = [
      ...this.pendingWordsSubject.value,
      ...this.correctWordsSubject.value,
      ...this.wrongWordsSubject.value,
    ];
    return allWords.includes(word);
  }

  /**
   * Adds a word to the pending array.
   * @param word the word to add to the pending list
   */
  addToPending(word: string): void {
    this.pendingWordsSubject.value.push(word);
  }

  /**
   * Removes a word from the pending list (if it exists)
   * @param word the word to remove from the pending list
   */
  removeFromPending(word: string): void {
    deleteFromArray(this.pendingWordsSubject.value, word);
  }

  /**
   * Adds a word to the correct array.
   * @param word the word to add to the correct list
   */
  addToCorrect(word: string): void {
    this.correctWordsSubject.value.push(word);
  }

  /**
   * Adds a word to the wrong array.
   * @param word the word to add to the wrong list
   */
  addToWrong(word: string): void {
    this.wrongWordsSubject.value.push(word);
  }
}
