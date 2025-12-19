import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../../services/score.service';

@Component({
    selector: 'app-score-display',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './score-display.component.html',
    styleUrls: ['./score-display.component.css'],
})
export class ScoreDisplayComponent implements OnInit {
    score: number = 0;

    constructor(private readonly scoreService: ScoreService) {}

    ngOnInit(): void {
        this.scoreService.currentScore$.subscribe((newScore) => (this.score = newScore));
    }
}
