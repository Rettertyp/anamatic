import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordListService } from '../../services/word-list.service';
import { CorrectWord } from '../../util/freqWord.util';
import { Word } from '../../util/word.util';
import { WordboxComponent } from '../wordbox/wordbox.component';

@Component({
    selector: 'app-word-display',
    standalone: true,
    imports: [CommonModule, WordboxComponent],
    templateUrl: './word-display.component.html',
    styleUrls: ['./word-display.component.css'],
})
export class WordDisplayComponent implements OnInit {
    pendingWords: Word[] = [];
    correctWords: CorrectWord[] = [];
    wrongWords: Word[] = [];

    constructor(private readonly wordListService: WordListService, private readonly cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.wordListService.pendingWords$.subscribe((newWords) => {
            this.pendingWords = newWords;
            this.cdr.detectChanges();
        });
        this.wordListService.correctWords$.subscribe((newWords) => {
            this.correctWords = newWords;
            this.cdr.detectChanges();
        });
        this.wordListService.wrongWords$.subscribe((newWords) => {
            this.wrongWords = newWords;
            this.cdr.detectChanges();
        });
    }
}
