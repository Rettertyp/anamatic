import { Injectable } from '@angular/core';
import { CharacterService } from './character.service';
import { dwdsAnswer } from '../types';
import { ApiService } from './api.service';
import { deleteFromArray } from '../util/deleteFromArray.util';

@Injectable({
    providedIn: 'root',
})
export class WordCheckerService {
    constructor(private readonly characterService: CharacterService, private readonly apiService: ApiService) {}

    /**
     * Checks whether a word consists only of the legal characters and is actually a german word.
     * @param word the word to check
     * @returns
     */
    async checkWord(word: string): Promise<boolean> {
        const charList: string[] = this.characterService.getCharacterList();

        // check whether the word is made up of legal characters
        for (const char of word) {
            if (charList.includes(char)) {
                deleteFromArray(charList, char);
            } else if (charList.includes(char.toUpperCase())) {
                deleteFromArray(charList, char.toUpperCase());
            } else return false;
        }

        // check the word in the DWDS API
        const wordExists: boolean = await this.apiService.getWord(word);

        return wordExists;
    }
}