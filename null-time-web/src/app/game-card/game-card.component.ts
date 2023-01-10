import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameplayService } from 'src/app/services/gameplay-service';
import { IGameCard } from 'src/gameHelper/interfaces';

@Component({
	selector: 'app-game-card',
	templateUrl: './game-card.component.html',
	styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {

	//The @Input() decorator tells Angular that the given component can expect 'card' as a given property
	@Input() card: IGameCard | null;
	@Input() canEdit: boolean = false;
	@Input() isModerating: boolean = false;
	@Output() handleClick = new EventEmitter<boolean>();

	isEditing: boolean = false;

	constructor(private service: GameplayService) {
		this.card = null;
	}

	getService() {
		return this.service;
	}

	getCard() {
			return this.card;
	}

	toggleEdit = () => {
		if (this.canEdit) {
			this.isEditing = !this.isEditing;
		}
	}

	cardSuccess = () => {
		//This runs when a person guesses the card
		this.handleClick.emit(true);
	}

	cardFail = () => {
		//This runs when a person skips a card
		this.handleClick.emit(false);
	}

	ngOnInit(): void {
	}

	doesTeam1OwnCard = () => {
		return !!this.service.getCurrentRoundObject()?.team1ScoredCards?.find(element => element == this.card?.value);
	}

	doesTeam2OwnCard = () => {
		return !!this.service.getCurrentRoundObject()?.team2ScoredCards?.find(element => element == this.card?.value);
	}
}
