import { TestBed } from '@angular/core/testing';

import { WordCheckerService } from './word-checker.service';

describe('WordCheckerService', () => {
  let service: WordCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
