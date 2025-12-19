import { Injectable } from '@angular/core';
import { wordAnswer } from '@retter/api-interfaces';
import { checkWordConsistsOfChars } from '@retter/util';
import { CharacterService } from './character.service';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { GameSessionService } from './game-session.service';

@Injectable({
    providedIn: 'root',
})
export class WordCheckerService {
    constructor(
        private readonly characterService: CharacterService,
        private readonly apiService: ApiService,
        private readonly authService: AuthService,
        private readonly gameSessionService: GameSessionService
    ) {}

    /**
     * Checks whether a word consists only of the legal characters and is actually a german word.
     * @param word the word to check
     * @returns
     */
    async checkWord(word: string): Promise<wordAnswer> {
        const charList: string[] = this.characterService.getCharacterList();

        const wordConsistsOfChars = checkWordConsistsOfChars(word, charList);

        if (!wordConsistsOfChars) {
            return { wordExists: false };
        }

        // check the word in the DWDS API
        if (this.authService.isLoggedIn) {
            const gameId = this.gameSessionService.gameId;
            if (gameId) {
                return await this.apiService.getWordForGame(word, gameId);
            }
        }

        return await this.apiService.getWordPublic(word);
    }
}
