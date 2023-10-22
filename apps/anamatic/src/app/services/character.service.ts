import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    private characterList: string[] = [];
    private readonly numberOfCharacters: number = 10;

    constructor() {
        this.characterList = this.generateCharacterList(this.numberOfCharacters);
    }

    /**
     * Returns a copy of the current character list.
     * @returns copy of the character list
     */
    getCharacterList(): string[] {
        return [...this.characterList];
    }

    /**
     * Returns a list of random uppercase characters, so that the probability of obtaining a char ist the same as the relative frequency in the german language.
     * @returns list of random uppercase characters
     */
    private generateCharacterList(numberOfChars: number): string[] {
        const charProbMap = new Map<string, number>([
            ['A', 558],
            ['A', 54],
            ['B', 196],
            ['C', 316],
            ['D', 498],
            ['E', 1693],
            ['F', 149],
            ['G', 302],
            ['H', 498],
            ['I', 802],
            ['J', 24],
            ['K', 132],
            ['L', 360],
            ['M', 255],
            ['N', 1053],
            ['O', 224],
            ['Ö', 30],
            ['P', 67],
            ['Q', 2],
            ['R', 689],
            ['S', 700],
            ['T', 579],
            ['U', 383],
            ['Ü', 65],
            ['V', 84],
            ['W', 178],
            ['X', 5],
            ['Y', 5],
            ['Z', 121],
        ]);

        // add up the probabilities
        let probSum: number = 0;
        for (const prob of charProbMap.values()) {
            probSum += prob;
        }

        const resChars: string[] = [];

        outerCharLoop: for (let i = 0; i < numberOfChars; i++) {
            const threshold: number = Math.floor(Math.random() * probSum);

            // look which char should get returned based on the threshold
            let cumulativeSum: number = 0;
            for (const [char, prob] of charProbMap) {
                cumulativeSum += prob;
                if (threshold < cumulativeSum) {
                    resChars.push(char);
                    continue outerCharLoop;
                }
            }
        }

        return resChars;
    }
}
