import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
    selector: 'app-loading',
    imports: [CommonModule, SpinnerComponent],
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
    text: string = 'Der Wort-Checker Service wird gestartet. Bitte warten Sie einen Moment.';
}
