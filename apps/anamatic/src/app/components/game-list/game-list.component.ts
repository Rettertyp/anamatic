import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GameListItemDto } from '@retter/api-interfaces';

@Component({
    selector: 'app-game-list',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
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
