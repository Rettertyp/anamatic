import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { BackendStatusService } from '../../services/backend-status.service';

@Component({
    selector: 'app-header',
    imports: [RouterModule, MatButtonModule, MatIconModule, MatTooltipModule, MatProgressSpinnerModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    constructor(public readonly authService: AuthService, public readonly backendStatus: BackendStatusService) {}
}
