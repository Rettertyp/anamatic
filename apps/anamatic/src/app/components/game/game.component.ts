import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
    serverIsAwake = false;

    constructor(private readonly apiService: ApiService) {}

    ngOnInit() {
        this.apiService.wakeUpServer().subscribe((answer) => {
            this.serverIsAwake = answer.awake;
        });
    }
}
