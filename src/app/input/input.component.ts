import { Component } from '@angular/core';
import { WordCheckerService } from '../services/word-checker.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  inputValue: string = '';

  constructor(private readonly wordCheckerService: WordCheckerService) {}
}
