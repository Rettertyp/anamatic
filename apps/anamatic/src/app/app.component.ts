import { Component, OnInit, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BackendStatusService } from './services/backend-status.service';
import { AuthService } from './services/auth.service';
import { GameService } from './services/game.service';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'anamatic';

    constructor(
        private readonly backendStatus: BackendStatusService,
        private readonly authService: AuthService,
        private readonly gameService: GameService
    ) {
        // Effect to handle backend wake up
        effect(() => {
            if (this.backendStatus.isAwake()) {
                this.onBackendAwake();
            }
        });
    }

    ngOnInit() {
        // Start checking backend status
        this.backendStatus.startChecking();
    }

    /**
     * Called when the backend becomes awake.
     * Handles authentication check and game sync.
     */
    private async onBackendAwake(): Promise<void> {
        try {
            // Try to refresh the access token (check if user is logged in)
            await this.authService.refreshAccessToken();

            // User is logged in, check if there's a current game to sync
            await this.gameService.syncCurrentGame();
        } catch {
            // User is not logged in, nothing to do
        }
    }
}
