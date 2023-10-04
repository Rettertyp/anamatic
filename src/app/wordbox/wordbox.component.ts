import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wordbox',
  templateUrl: './wordbox.component.html',
  styleUrls: ['./wordbox.component.css'],
})
export class WordboxComponent {
  @Input() color: string = 'green';

  wordlist: string[] = [
    'Hello',
    'Test',
    'Wordbox',
    'Angular',
    'Componentomatico',
    'Test2',
    'Mundo',
    'Nochmehr',
    'GIGAVIEL',
  ];

  getColorStyle() {
    return { 'border-color': this.color };
  }
}
