import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameService } from '../../services/game.service';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
})
export class InputComponent {
    inputValue: string = '';

    constructor(private readonly gameService: GameService) {}

    async onEnter(): Promise<void> {
        void this.gameService.processInput(this.inputValue.trim());
        this.inputValue = '';
    }
}
