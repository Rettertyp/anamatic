import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordListService } from '../../services/word-list.service';
import { WordboxComponent } from '../wordbox/wordbox.component';

@Component({
    selector: 'app-word-display',
    imports: [CommonModule, WordboxComponent],
    templateUrl: './word-display.component.html',
    styleUrls: ['./word-display.component.css'],
})
export class WordDisplayComponent {
    pendingWords = this.wordListService.pendingWords;
    correctWords = this.wordListService.correctWords;
    wrongWords = this.wordListService.wrongWords;

    constructor(private readonly wordListService: WordListService) {}
}
