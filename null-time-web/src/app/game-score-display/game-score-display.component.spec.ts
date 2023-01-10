import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreDisplayComponent } from './game-score-display.component';

describe('GameScoreDisplayComponent', () => {
  let component: GameScoreDisplayComponent;
  let fixture: ComponentFixture<GameScoreDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameScoreDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameScoreDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
