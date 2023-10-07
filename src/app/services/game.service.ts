import { Injectable } from '@angular/core';
import { ScoreService } from './score.service';
import { WordCheckerService } from './word-checker.service';
import { WordListService } from './word-list.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private readonly scoreService: ScoreService,
    private readonly wordCheckerService: WordCheckerService,
    private readonly wordListService: WordListService
  ) {}

  /**
   * Processes the input of the user and handles it for the game.
   * @param input the word the user put in
   */
  async processInput(input: string): Promise<void> {
    if (this.wordListService.alreadyExists(input)) return;

    this.wordListService.addToPending(input);

    const isValid: boolean = await this.wordCheckerService.checkWord(input);

    this.wordListService.removeFromPending(input);

    if (isValid) {
      this.wordListService.addToCorrect(input);
      this.scoreService.addPoints(this.calculatePoints(input.length));
    } else {
      this.wordListService.addToWrong(input);
    }
  }

  /**
   * Calculates the number of points a word should give the player.
   * @param wordLength length of the word that was used
   * @returns number of points the word should give
   */
  private calculatePoints(wordLength: number): number {
    return (wordLength * (wordLength + 1)) / 2;
  }
}
