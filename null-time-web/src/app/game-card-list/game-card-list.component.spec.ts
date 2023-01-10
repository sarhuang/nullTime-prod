import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardListComponent } from './game-card-list.component';

describe('GameCardListComponent', () => {
	let component: GameCardListComponent;
	let fixture: ComponentFixture<GameCardListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GameCardListComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(GameCardListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
