import { Injectable } from '@angular/core';
import { CharacterService } from './character.service';
import { dwdsAnswer } from '../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WordCheckerService {
  constructor(
    private readonly characterService: CharacterService,
    private readonly apiService: ApiService
  ) {
    console.log('WordCheckerService created');
    this.main();
  }

  async main() {
    console.log(await this.checkWord('Gurke'));
  }

  /**
   * Checks whether a word consists only of the legal characters and is actually a german word.
   * @param word the word to check
   * @returns
   */
  async checkWord(word: string): Promise<boolean> {
    const charList: string[] = this.characterService
      .getCharacterList()
      .concat(['G', 'U', 'R', 'K', 'E']);

    // check whether the word is made up of legal characters
    for (const char of word) {
      if (charList.includes(char)) {
        this.deleteFromArray(charList, char);
      } else if (charList.includes(char.toUpperCase())) {
        this.deleteFromArray(charList, char.toUpperCase());
      } else return false;
    }

    console.log('passed first check');

    // check the word in the DWDS API
    const wordInfo: dwdsAnswer = await this.apiService.getWord(word);

    return !!wordInfo.lemma;
  }

  /**
   * Deletes an element from an array.
   * @param array the array to delete elements from
   * @param elem the element to delete
   * @returns true if the deletion succeeded, false otherwise
   */
  private deleteFromArray<T>(array: T[], elem: T): boolean {
    const index: number = array.findIndex((other) => other === elem);
    if (index < 0) return false;
    array.splice(index, 1);
    return true;
  }
}
