import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordboxComponent } from './wordbox.component';

describe('WordboxComponent', () => {
  let component: WordboxComponent;
  let fixture: ComponentFixture<WordboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
