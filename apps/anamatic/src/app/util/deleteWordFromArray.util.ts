import { Word } from './word.util';

/**
 * Deletes an element from an array.
 * @param array the array to delete elements from
 * @param elem the element to delete
 * @returns true if the deletion succeeded, false otherwise
 */
export function deleteWordFromArray<T extends Word>(array: T[], elem: string): boolean {
    const index: number = array.findIndex((other) => other.word === elem);
    if (index < 0) return false;
    array.splice(index, 1);
    return true;
}
