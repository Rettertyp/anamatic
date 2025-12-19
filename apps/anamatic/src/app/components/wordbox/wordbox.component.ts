import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Printable } from '../../util/printable.util';

@Component({
    selector: 'app-wordbox',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wordbox.component.html',
    styleUrls: ['./wordbox.component.css'],
    animations: [
        trigger('fadeInAndScale', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(0.5)' }),
                animate('500ms ease-in-out', style({ opacity: 1, transform: 'scale(1)' })),
            ]),
            transition(':leave', [animate('500ms ease-in-out', style({ opacity: 0, transform: 'scale(0.5)' }))]),
        ]),
    ],
})
export class WordboxComponent<T extends Printable> {
    @Input() color: string = '0, 128, 0';

    @Input() wordlist: T[] = [];

    getBorderColorStyle() {
        return { 'border-color': `rgb(${this.color})` };
    }

    getBackgroundColorStyle() {
        return { 'background-color': `rgba(${this.color}, 0.3)` };
    }
}
