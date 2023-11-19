import { Component, OnInit } from '@angular/core';
import { WordListService } from '../../services/word-list.service';
import { CorrectWord } from '../../util/freqWord.util';
import { Word } from '../../util/word.util';

@Component({
    selector: 'app-word-display',
    templateUrl: './word-display.component.html',
    styleUrls: ['./word-display.component.css'],
})
export class WordDisplayComponent implements OnInit {
    pendingWords: Word[] = [];
    correctWords: CorrectWord[] = [];
    wrongWords: Word[] = [];

    constructor(private readonly wordListService: WordListService) {}

    ngOnInit(): void {
        this.wordListService.pendingWords$.subscribe((newWords) => {
            this.pendingWords = newWords;
        });
        this.wordListService.correctWords$.subscribe((newWords) => {
            this.correctWords = newWords;
        });
        this.wordListService.wrongWords$.subscribe((newWords) => {
            this.wrongWords = newWords;
        });
    }
}
