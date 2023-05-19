import { Component } from '@angular/core';

@Component({
  selector: 'app-score-display',
  templateUrl: './score-display.component.html',
  styleUrls: ['./score-display.component.css'],
})
export class ScoreDisplayComponent {
  score: number = 0;
}
