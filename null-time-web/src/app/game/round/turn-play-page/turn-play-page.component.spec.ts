import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnPlayPageComponent } from './turn-play-page.component';

describe('TurnPlayPageComponent', () => {
  let component: TurnPlayPageComponent;
  let fixture: ComponentFixture<TurnPlayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnPlayPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnPlayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
