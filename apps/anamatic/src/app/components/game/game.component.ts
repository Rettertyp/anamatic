import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [CommonModule, LettersDisplayComponent, ScoreDisplayComponent, InputComponent, WordDisplayComponent],
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
    serverIsAwake = false;

    constructor(
        private readonly apiService: ApiService,
        private readonly authService: AuthService,
        private readonly gameSessionService: GameSessionService,
        private readonly characterService: CharacterService,
        private readonly wordListService: WordListService,
        private readonly scoreService: ScoreService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {}

    async ngOnInit() {
        const gameId = this.route.snapshot.paramMap.get('gameId');

        if (this.authService.isLoggedIn) {
            if (!gameId) {
                await this.router.navigate(['/personal']);
                return;
            }
            this.gameSessionService.setGameId(gameId);
            const game = await this.apiService.getGame(gameId);
            this.characterService.setCharacterList(game.characters);
            this.wordListService.setCorrectWords(game.words);
            this.scoreService.setScore(game.totalScore);
        } else {
            this.gameSessionService.setGameId(null);
        }

        this.apiService.wakeUpServer().subscribe((answer) => {
            this.serverIsAwake = answer.awake;
        });
    }
}
