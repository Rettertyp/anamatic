import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LeaderboardEntryDto } from '@retter/api-interfaces';

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
    leaderboard: LeaderboardEntryDto[] = [];
    loading = true;
    error: string | null = null;

    constructor(private apiService: ApiService, private router: Router) {}

    ngOnInit(): void {
        this.loadLeaderboard();
    }

    loadLeaderboard(): void {
        this.loading = true;
        this.error = null;

        this.apiService.getLeaderboard().subscribe({
            next: (data) => {
                this.leaderboard = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Failed to load leaderboard';
                this.loading = false;
                console.error('Error loading leaderboard:', err);
            },
        });
    }

    goBack(): void {
        this.router.navigate(['/']);
    }
}
