import { Injectable, signal } from '@angular/core';
import { deleteWordFromArray } from '../util/deleteWordFromArray.util';
import { CorrectWord } from '../util/freqWord.util';
import { Word } from '../util/word.util';

@Injectable({
    providedIn: 'root',
})
export class WordListService {
    pendingWords = signal<Word[]>([]);
    correctWords = signal<CorrectWord[]>([]);
    wrongWords = signal<Word[]>([]);

    /**
     * Checks whether a word already exists in one of the lists.
     * @param word the word to check
     */
    alreadyExists(word: string): boolean {
        const allWords: string[] = [
            ...this.pendingWords().map((word) => word.word),
            ...this.correctWords().map((word) => word.word),
            ...this.wrongWords().map((word) => word.word),
        ];
        return allWords.includes(word);
    }

    /**
     * Adds a word to the pending array.
     * @param word the word to add to the pending list
     */
    addToPending(word: string): void {
        this.pendingWords.update((words) => [...words, new Word(word)]);
    }

    /**
     * Removes a word from the pending list (if it exists)
     * @param word the word to remove from the pending list
     */
    removeFromPending(word: string): void {
        this.pendingWords.update((words) => {
            const next = [...words];
            deleteWordFromArray(next, word);
            return next;
        });
    }

    /**
     * Adds a word to the correct array.
     * @param word the word to add to the correct list
     */
    addToCorrect(word: string, freq: number): void {
        this.correctWords.update((words) => [...words, new CorrectWord(word, freq)]);
    }

    /**
     * Adds a word to the wrong array.
     * @param word the word to add to the wrong list
     */
    addToWrong(word: string): void {
        this.wrongWords.update((words) => [...words, new Word(word)]);
    }

    resetAll(): void {
        this.pendingWords.set([]);
        this.correctWords.set([]);
        this.wrongWords.set([]);
    }

    setCorrectWords(words: Array<{ word: string; points: number }>): void {
        this.pendingWords.set([]);
        this.wrongWords.set([]);
        this.correctWords.set(words.map((w) => new CorrectWord(w.word, w.points)));
    }
}
