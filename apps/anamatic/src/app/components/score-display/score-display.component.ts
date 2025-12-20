import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../../services/score.service';

@Component({
    selector: 'app-score-display',
    imports: [CommonModule],
    templateUrl: './score-display.component.html',
    styleUrls: ['./score-display.component.css'],
})
export class ScoreDisplayComponent {
    score = this.scoreService.currentScore;

    constructor(private readonly scoreService: ScoreService) {}
}
