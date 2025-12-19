import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';

@Component({
    selector: 'app-letters-display',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './letters-display.component.html',
    styleUrls: ['./letters-display.component.css'],
})
export class LettersDisplayComponent {
    letters = this.characterService.characterList;

    constructor(private readonly characterService: CharacterService) {}
}
