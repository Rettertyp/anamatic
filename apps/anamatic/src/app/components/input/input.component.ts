import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameService } from '../../services/game.service';

@Component({
    selector: 'app-input',
    imports: [FormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
})
export class InputComponent implements AfterViewInit {
    inputValue: string = '';

    @ViewChild('wordInput') wordInput!: ElementRef<HTMLInputElement>;

    constructor(private readonly gameService: GameService) {}

    ngAfterViewInit(): void {
        // Automatically focus the input field when component loads
        this.wordInput.nativeElement.focus();
    }

    async onEnter(): Promise<void> {
        void this.gameService.processInput(this.inputValue.trim());
        this.inputValue = '';
    }
}
