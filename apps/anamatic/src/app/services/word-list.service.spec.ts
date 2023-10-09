import { TestBed } from '@angular/core/testing';

import { WordListService } from './word-list.service';

describe('WordListService', () => {
  let service: WordListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
