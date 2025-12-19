import { Injectable, signal, computed } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ScoreService {
    currentScore = signal<number>(0);

    /**
     * Adds a certain amount of points to the current score.
     * @param points number of points to add
     */
    addPoints(points: number): void {
        this.currentScore.update((score) => score + points);
    }

    /**
     * Resets the current score to 0.
     */
    reset(): void {
        this.currentScore.set(0);
    }

    setScore(score: number): void {
        this.currentScore.set(score);
    }
}
