import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    private characterList: string[] = [];
    private numberOfCharacters: number = 7;

    constructor() {
        this.characterList = this.generateCharacterList();
    }

    /**
     * Returns a copy of the current character list.
     * @returns copy of the character list
     */
    getCharacterList(): string[] {
        return [...this.characterList];
    }

    /**
     * Returns a list of random uppercase characters, half of them consonants, half of them vowels.
     * @returns list of random uppercase characters
     */
    private generateCharacterList(): string[] {
        const characterList: string[] = [];

        const vowels: string[] = ['A', 'E', 'I', 'O', 'U'];
        const consonants: string[] = [
            'B',
            'C',
            'D',
            'F',
            'G',
            'H',
            'J',
            'K',
            'L',
            'M',
            'N',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'V',
            'W',
            'X',
            'Y',
            'Z',
        ];

        for (let i = 0; i < this.numberOfCharacters; i++) {
            const randomConsonant: string = consonants[Math.floor(Math.random() * consonants.length)];
            const randomVowel: string = vowels[Math.floor(Math.random() * vowels.length)];
            characterList.push(randomConsonant);
            characterList.push(randomVowel);
        }

        // shuffle the list
        for (let i = characterList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = characterList[i];
            characterList[i] = characterList[j];
            characterList[j] = temp;
        }

        return characterList;
    }
}
