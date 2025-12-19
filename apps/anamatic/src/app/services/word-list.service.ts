import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { deleteWordFromArray } from '../util/deleteWordFromArray.util';
import { CorrectWord } from '../util/freqWord.util';
import { Word } from '../util/word.util';

@Injectable({
    providedIn: 'root',
})
export class WordListService {
    private pendingWordsSubject = new BehaviorSubject<Word[]>([]);
    private correctWordsSubject = new BehaviorSubject<CorrectWord[]>([]);
    private wrongWordsSubject = new BehaviorSubject<Word[]>([]);

    get pendingWords$(): Observable<Word[]> {
        return this.pendingWordsSubject.asObservable();
    }
    get correctWords$(): Observable<CorrectWord[]> {
        return this.correctWordsSubject.asObservable();
    }
    get wrongWords$(): Observable<Word[]> {
        return this.wrongWordsSubject.asObservable();
    }

    /**
     * Checks whether a word already exists in one of the lists.
     * @param word the word to check
     */
    alreadyExists(word: string): boolean {
        const allWords: string[] = [
            ...this.pendingWordsSubject.value.map((word) => word.word),
            ...this.correctWordsSubject.value.map((word) => word.word),
            ...this.wrongWordsSubject.value.map((word) => word.word),
        ];
        return allWords.includes(word);
    }

    /**
     * Adds a word to the pending array.
     * @param word the word to add to the pending list
     */
    addToPending(word: string): void {
        this.pendingWordsSubject.next([...this.pendingWordsSubject.value, new Word(word)]);
    }

    /**
     * Removes a word from the pending list (if it exists)
     * @param word the word to remove from the pending list
     */
    removeFromPending(word: string): void {
        const next = [...this.pendingWordsSubject.value];
        deleteWordFromArray(next, word);
        this.pendingWordsSubject.next(next);
    }

    /**
     * Adds a word to the correct array.
     * @param word the word to add to the correct list
     */
    addToCorrect(word: string, freq: number): void {
        this.correctWordsSubject.next([...this.correctWordsSubject.value, new CorrectWord(word, freq)]);
    }

    /**
     * Adds a word to the wrong array.
     * @param word the word to add to the wrong list
     */
    addToWrong(word: string): void {
        this.wrongWordsSubject.next([...this.wrongWordsSubject.value, new Word(word)]);
    }

    resetAll(): void {
        this.pendingWordsSubject.next([]);
        this.correctWordsSubject.next([]);
        this.wrongWordsSubject.next([]);
    }

    setCorrectWords(words: Array<{ word: string; points: number }>): void {
        this.pendingWordsSubject.next([]);
        this.wrongWordsSubject.next([]);
        this.correctWordsSubject.next(words.map((w) => new CorrectWord(w.word, w.points)));
    }
}
