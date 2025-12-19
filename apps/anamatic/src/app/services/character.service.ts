import { Injectable } from '@angular/core';
import { nChars } from '@retter/api-interfaces';

enum CharStrategy {
    Dice,
    CharProb,
}

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    private characterList: string[] = [];
    private readonly numberOfCharacters: number = nChars;

    constructor() {
        this.characterList = this.generateCharacterList(this.numberOfCharacters, CharStrategy.Dice);
    }

    /**
     * Returns a copy of the current character list.
     * @returns copy of the character list
     */
    getCharacterList(): string[] {
        return [...this.characterList];
    }

    setCharacterList(chars: string[]): void {
        this.characterList = [...chars];
    }

    generateNewCharacterList(): string[] {
        const chars = this.generateCharacterList(this.numberOfCharacters, CharStrategy.Dice);
        this.characterList = [...chars];
        return this.getCharacterList();
    }

    /**
     * Returns a list of random uppercase characters, chosen by the given strategy.
     * @param numberOfChars number of characters to generate
     * @param strategy strategy to use
     * @returns list of random uppercase characters
     */
    private generateCharacterList(numberOfChars: number, strategy: CharStrategy): string[] {
        switch (strategy) {
            case CharStrategy.Dice:
                return this.generateCharacterListByDice();
            case CharStrategy.CharProb:
                return this.generateCharacterListByCharProb(numberOfChars);
        }
    }

    /**
     * Returns a list of random uppercase characters, by rolling 9 dice.
     * @returns list of random uppercase characters
     */
    private generateCharacterListByDice(): string[] {
        const dice: string[][] = [
            ['E', 'E', 'I', 'I', 'Ä', 'O'],
            ['R', 'N', 'E', 'M', 'S', 'T'],
            ['D', 'I', 'F', 'E', 'Ü', 'H'],
            ['E', 'E', 'U', 'P', 'T', 'Ö'],
            ['E', 'E', 'Y', 'E', 'A', 'A'],
            ['G', 'N', 'N', 'D', 'T', 'R'],
            ['L', 'N', 'Q', 'U', 'B', 'R'],
            ['X', 'W', 'Z', 'K', 'J', 'V'],
            ['A', 'C', 'I', 'L', 'O', 'S'],
        ];

        const res = dice.map((die) => die[Math.floor(Math.random() * die.length)]);

        return res;
    }

    /**
     * Returns a list of random uppercase characters, so that the probability of obtaining a char ist the same as the relative frequency in the german language.
     * @param numberOfChars number of characters to generate
     * @returns list of random uppercase characters
     */
    private generateCharacterListByCharProb(numberOfChars: number): string[] {
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
