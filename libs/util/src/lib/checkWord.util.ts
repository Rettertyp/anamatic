import { deleteFromArray } from './deleteFromArray.util';

/**
 * Checks whether the word is made up of legal characters only.
 * @param word The word to check.
 * @param charList The list of legal characters.
 * @returns Whether the word is made up of legal characters only.
 */
export function checkWordConsistsOfChars(word: string, charList: string[]): boolean {
    // make a copy of the charList, so that the original is not modified
    charList = [...charList];

    for (const char of word) {
        if (charList.includes(char)) {
            deleteFromArray(charList, char);
        } else if (charList.includes(char.toUpperCase())) {
            deleteFromArray(charList, char.toUpperCase());
        } else return false;
    }

    return true;
}
