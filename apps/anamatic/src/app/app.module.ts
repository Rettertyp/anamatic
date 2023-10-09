import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ScoreDisplayComponent } from './score-display/score-display.component';
import { LettersDisplayComponent } from './letters-display/letters-display.component';
import { InputComponent } from './input/input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WordboxComponent } from './wordbox/wordbox.component';
import { WordDisplayComponent } from './word-display/word-display.component';
import { CharacterService } from './services/character.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScoreDisplayComponent,
    LettersDisplayComponent,
    InputComponent,
    WordboxComponent,
    WordDisplayComponent,
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
