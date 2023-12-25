import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'anamatic';

    constructor(private readonly apiService: ApiService) {}

    ngOnInit() {
        this.apiService.wakeUpServer();
    }
}
