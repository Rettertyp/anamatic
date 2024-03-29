import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    ],
    imports: [
        BrowserModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        HttpClientModule,
    ],
    providers: [CharacterService],
    bootstrap: [AppComponent],
})
export class AppModule {}
