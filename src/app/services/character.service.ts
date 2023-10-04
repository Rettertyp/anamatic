import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  characterList: string[] = [];
  numberOfCharacters: number = 5;

  constructor() {
    this.characterList = this.generateCharacterList();
  }

  getCharacterList(): string[] {
    return this.characterList;
  }

  // function that generates a random list of uppercase characters, half of them are consonants, the other half are vowels
  generateCharacterList(): string[] {
    const characterList: string[] = [];

    const vowels: string[] = ['A', 'E', 'I', 'O', 'U', 'Y'];
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
      'Z',
    ];

    for (let i = 0; i < this.numberOfCharacters; i++) {
      const randomConsonant: string =
        consonants[Math.floor(Math.random() * consonants.length)];
      const randomVowel: string =
        vowels[Math.floor(Math.random() * vowels.length)];
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
