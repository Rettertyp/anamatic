import { Routes } from '@angular/router';

import { GameComponent } from './components/game/game.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PersonalComponent } from './components/personal/personal.component';

export const routes: Routes = [
    { path: '', component: MenuComponent },
    { path: 'login', component: LoginComponent },
    { path: 'game', component: GameComponent },
    { path: 'game/:gameId', component: GameComponent },
    { path: 'personal', component: PersonalComponent },
    { path: 'leaderboard', component: LeaderboardComponent },
];
