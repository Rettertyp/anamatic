import { Printable } from './printable.util';

export class Word implements Printable {
    readonly word: string;

    constructor(word: string) {
        this.word = word;
    }

    print(): string {
        return this.word;
    }
}
