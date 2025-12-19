import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    username = '';
    password = '';
    error: string | null = null;

    constructor(private readonly authService: AuthService, private readonly router: Router) {}

    async submit(): Promise<void> {
        this.error = null;
        try {
            await this.authService.login(this.username, this.password);
            await this.router.navigate(['/personal']);
        } catch {
            this.error = 'Login fehlgeschlagen';
        }
    }
}
