import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-menu',
    imports: [RouterModule, MatButtonModule, MatIconModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
})
export class MenuComponent {
    constructor(private readonly authService: AuthService, private readonly router: Router) {
        // if (this.authService.isLoggedIn()) {
        //     this.router.navigate(['/personal']);
        // }
    }
}
