import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ScoreDisplayComponent } from './components/score-display/score-display.component';
import { LettersDisplayComponent } from './components/letters-display/letters-display.component';
import { InputComponent } from './components/input/input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WordboxComponent } from './components/wordbox/wordbox.component';
import { WordDisplayComponent } from './components/word-display/word-display.component';
import { CharacterService } from './services/character.service';
import { LoadingComponent } from './components/loading/loading.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { GameComponent } from './components/game/game.component';
import { MenuComponent } from './components/menu/menu.component';
import { PersonalComponent } from './components/personal/personal.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: MenuComponent },
    { path: 'game', component: GameComponent },
    { path: 'personal', component: PersonalComponent, children: [] },
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ScoreDisplayComponent,
        LettersDisplayComponent,
        InputComponent,
        WordboxComponent,
        WordDisplayComponent,
        SpinnerComponent,
        LoadingComponent,
        GameComponent,
        MenuComponent,
        PersonalComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        HttpClientModule,
        RouterModule,
    ],
    providers: [CharacterService, provideRouter(routes)],
    bootstrap: [AppComponent],
})
export class AppModule {}
