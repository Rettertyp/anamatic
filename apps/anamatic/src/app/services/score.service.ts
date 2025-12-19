import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private _currentScore: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  /**
   * Gets the current score.
   * @returns the current number of points
   */
  get currentScore(): number {
    return this._currentScore.value;
  }

  /**
   * Returns the observable that represents the current score.
   */
  get currentScore$(): Observable<number> {
    return this._currentScore.asObservable();
  }

  /**
   * Adds a certain amount of points to the current score.
   * @param points number of points to add
   */
  addPoints(points: number): void {
    const oldScore: number = this._currentScore.value;
    this._currentScore.next(oldScore + points);
  }

  /**
   * Resets the current score to 0.
   */
  reset(): void {
    this._currentScore.next(0);
  }

  setScore(score: number): void {
    this._currentScore.next(score);
  }
}
