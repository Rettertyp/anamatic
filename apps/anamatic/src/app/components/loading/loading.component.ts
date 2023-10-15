import { Component } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
    text: string = 'Der Wort-Checker Service wird gestartet. Bitte warten Sie einen Moment.';
}
