import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GameListItemDto } from '@retter/api-interfaces';

@Component({
    selector: 'app-game-list',
    imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './game-list.component.html',
    styleUrl: './game-list.component.css',
})
export class GameListComponent {
    title = input.required<string>();
    games = input<GameListItemDto[] | undefined>(undefined);

    resume = output<string>();
    delete = output<string>();

    onResumeGame(gameId: string): void {
        this.resume.emit(gameId);
    }

    onDeleteGame(gameId: string): void {
        this.delete.emit(gameId);
    }
}
