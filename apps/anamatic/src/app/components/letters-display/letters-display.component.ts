import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';

@Component({
    selector: 'app-letters-display',
    templateUrl: './letters-display.component.html',
    styleUrls: ['./letters-display.component.css'],
})
export class LettersDisplayComponent implements OnInit {
    letters: string[] = [];

    constructor(private readonly characterService: CharacterService) {}

    ngOnInit() {
        this.letters = this.characterService.getCharacterList();
    }
}
