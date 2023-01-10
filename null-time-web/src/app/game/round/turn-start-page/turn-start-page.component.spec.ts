import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnStartPageComponent } from './turn-start-page.component';

describe('TurnStartPageComponent', () => {
  let component: TurnStartPageComponent;
  let fixture: ComponentFixture<TurnStartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnStartPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
