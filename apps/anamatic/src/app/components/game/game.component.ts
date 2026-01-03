import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CharacterService } from '../../services/character.service';
import { GameSessionService } from '../../services/game-session.service';
import { ScoreService } from '../../services/score.service';
import { WordListService } from '../../services/word-list.service';
import { LettersDisplayComponent } from '../letters-display/letters-display.component';
import { ScoreDisplayComponent } from '../score-display/score-display.component';
import { InputComponent } from '../input/input.component';
import { WordDisplayComponent } from '../word-display/word-display.component';
import { GameService } from '../../services/game.service';
import { BackendStatusService } from '../../services/backend-status.service';

@Component({
    selector: 'app-game',
    imports: [CommonModule, LettersDisplayComponent, ScoreDisplayComponent, InputComponent, WordDisplayComponent],
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
    serverIsAwake = this.backendStatusService.isAwake;

    constructor(
        private readonly authService: AuthService,
        private readonly gameSessionService: GameSessionService,
        private readonly characterService: CharacterService,
        private readonly route: ActivatedRoute,
        private readonly gameService: GameService,
        private readonly backendStatusService: BackendStatusService
    ) {}

    async ngOnInit() {
        const gameId = this.route.snapshot.paramMap.get('gameId') || this.gameSessionService.gameId;

        if (this.backendStatusService.isAwake() && this.authService.isLoggedIn()) {
            if (!gameId) {
                await this.gameService.newGame();
            } else {
                await this.gameService.resumeGame(gameId);
            }
        } else {
            this.gameSessionService.setGameId(null);
            this.characterService.generateNewCharacterList();
        }
    }
}
