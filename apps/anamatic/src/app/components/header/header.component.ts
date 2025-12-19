import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    constructor(public readonly authService: AuthService) {}
}

