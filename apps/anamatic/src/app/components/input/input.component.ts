import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
})
export class InputComponent {
    inputValue: string = '';

    constructor(private readonly gameService: GameService) {}

    onEnter(): void {
        this.gameService.processInput(this.inputValue.trim());
        this.inputValue = '';
    }
}
