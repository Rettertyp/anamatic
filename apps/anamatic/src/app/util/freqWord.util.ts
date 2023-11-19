import { Word } from './word.util';

export class CorrectWord extends Word {
    readonly freq: number;

    constructor(word: string, freq: number) {
        super(word);
        this.freq = freq;
    }

    override print(): string {
        return `${super.print()} | ${this.freq}`;
    }
}
