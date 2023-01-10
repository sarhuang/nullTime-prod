import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetRandomCardVal } from 'src/gameHelper/utils';
import { IGameCard } from 'src/gameHelper/interfaces';
import { Router } from '@angular/router';
import { GameLobbyComponent } from '../game-lobby/game-lobby.component';
import { GameJoinComponent } from '../game-join/game-join.component';
import { GameplayService } from 'src/app/services/gameplay-service';
import { DialogService } from '../services/dialog.service';

@Component({
	selector: 'app-game-card-list',
	templateUrl: './game-card-list.component.html',
	styleUrls: ['./game-card-list.component.scss'],
})
export class GameCardListComponent implements OnInit {

	@Input() canAddCards: boolean = false;
	@Input() canEditCards: boolean = false;
	@Input() showTotalCards: boolean = false;
	@Input() showAsList: boolean = true; //Setting this to true disables the game play version
	@Input() showAsTable: boolean = false; //alternative view for moderation page
	@Input() isModerating: boolean = false; //Set to true for the moderation page

	@Input() allCards: IGameCard[] = [];
	@Output() cardClickedCallback = new EventEmitter<IGameCard>();
	@Output() lastCardCallback = new EventEmitter();
	@Output() clearCardsCallback = new EventEmitter();
	currentCardIndex: number = 0; //The current card to show when not in list form
	confirm: boolean = false;

	getAllCards = () => {
		return this.allCards;
	}

	constructor(private router: Router, private service: GameplayService, private dialogService: DialogService) {
	}

	getService() {
		return this.service;
	}

	ngOnInit(): void {
	}

	addCard(): void {
		this.allCards.push({
			value: GetRandomCardVal(),
			owner: 0
		});
		GameLobbyComponent.setWordCount = 1;
	}

	clearCardList(): void {
		this.dialogService.confirmDialog({
			title: 'Are you sure you want to clear all your cards?',
			message: 'All words will be erased and you will have an empty deck.',
			confirmText: 'Confirm',
			cancelText: 'Cancel',
			answer: this.confirm}).subscribe(result => {
			  this.confirm = result;
			  if(this.confirm){
				this.service.clearCardList();
				this.confirm = false;
				if (this.clearCardsCallback !== undefined) this.clearCardsCallback.emit();
			  }
			});
	}

	back(): void{
		if(GameJoinComponent.isHost){
			this.router.navigateByUrl('game-lobby');
		}
		else{
			this.router.navigateByUrl('');
		}
	}

	incrementCardIndex = () => {
		//Use this to increment the card index, it ensures we don't go out of bounds
		if (this.currentCardIndex+1 >= this.allCards.length) {
			this.currentCardIndex = 0;
		} else {
			this.currentCardIndex++;
		}
 	}

	cardClicked = (success: boolean): void => {
		if (this.showAsList) return;

		console.log(success);
		if (success) {
			this.cardGuessed();
		} else {
			this.incrementCardIndex();
		}
	}

	cardGuessed = () => {
		//Card was guessed, remove it from the list and go to the next card
		const card = this.allCards[this.currentCardIndex];
		const index = this.allCards.findIndex(x => x.value === card.value);

		if (index === -1) {
			console.error('game-card-list.ts cardGuessed() Failed: Card ID could not be found!');
			return;
		}

		card.owner = 0; //TODO: Get the current playing team from the game manager and set this
		this.allCards.splice(index, 1);
		console.log(this.allCards.length);
		this.incrementCardIndex();
		if (this.cardClickedCallback != undefined) this.cardClickedCallback.emit(card);
		if (this.allCards.length == 0 && this.lastCardCallback != undefined) {
			console.log('Out of cards');
			this.lastCardCallback.emit();
		}
	}

	getTotalCards(): number {
		return this.allCards.length;
	}
}
