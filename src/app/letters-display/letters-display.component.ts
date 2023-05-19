import { Component } from '@angular/core';

@Component({
  selector: 'app-letters-display',
  templateUrl: './letters-display.component.html',
  styleUrls: ['./letters-display.component.css'],
})
export class LettersDisplayComponent {
  letters: string[] = ['A', 'B', 'C', 'D', 'E'];
}
