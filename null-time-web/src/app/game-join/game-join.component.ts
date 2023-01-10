import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameLobbyComponent } from '../game-lobby/game-lobby.component';
import { GetRandomCard } from 'src/gameHelper/utils';
import { DialogService } from '../services/dialog.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GameplayService } from '../services/gameplay-service';
import { pingLobby, submitCards } from '../apiutils';
import { IGameCard } from 'src/gameHelper/interfaces';

@Component({
  selector: 'app-game-join',
  templateUrl: './game-join.component.html',
  styleUrls: ['./game-join.component.scss'],
  providers: [GameplayService]
})
export class GameJoinComponent implements OnInit {
  static isHost = false;
  showAddWords: boolean = false;
  code = "";
  confirm: boolean = false;
  static audio = new Audio();  
  static musicPlaying: boolean = false;
  static musicLoaded: boolean = false;
  static musicButtonSrc = "../assets/images/sound_off.png";
  public gameJoinRef = GameJoinComponent;
  showCreds: boolean = false;
  cards: string[] = [];
  iGameCard: IGameCard[] = [];

  constructor(private router: Router, private dialogService : DialogService) { 
  }

  ngOnInit(): void {  
    GameJoinComponent.musicButtonSrc = "../assets/images/sound_off.png";  
  }

  disableJoinGame() {
    return this.code.trim().length < 1;
  }

  joinGame = async () => {
    const input = this.code;
    if(await pingLobby(input))
      this.showAddWords = true;
  else
      this.showErrorMessage();
  }

  submit(){
    this.submitCardsConfirm();
  }

  getCardList = () => {
    return GameLobbyComponent.gameCardList;
  }

  clearCards = () => {
    GameLobbyComponent.gameCardList = [];
  }

  hostGame = () => {
    GameJoinComponent.isHost = true;
    GameLobbyComponent.wordCount = 0;
    this.router.navigateByUrl('game-lobby')
  }

  get getWordCount(){
    return GameLobbyComponent.gameCardList.length;
  }

  showErrorMessage(){
    this.dialogService.messageDialog({
      title: 'Incorrect Game Pin!',
      message: 'Please try a different Game Pin.'});
  }

  submitCardsConfirm(){
    this.dialogService.confirmDialog({
    title: 'Are you sure you want to submit your cards?',
    message: 'All cards will be submitted.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    answer: this.confirm}).subscribe(async result => {
      this.confirm = result;
      if(this.confirm) {
        this.iGameCard = this.getCardList();
        for(let i=0; i < this.iGameCard.length; i++){
          this.cards.push(this.iGameCard[i].value);
        }
        submitCards(this.code, this.cards);
        this.showAddWords = false;
      }
    });
}

  playLobbyMusic(){
    //Music is turned on for first time
    if(GameJoinComponent.musicPlaying == false && GameJoinComponent.musicLoaded == false){
      GameJoinComponent.audio.src = "../assets/music/intrigue_fun.mp3";
      GameJoinComponent.audio.load();
      GameJoinComponent.audio.play();
      GameJoinComponent.audio.loop = true;
      GameJoinComponent.musicLoaded = true;
      GameJoinComponent.musicPlaying = true;
      GameJoinComponent.musicButtonSrc = "../assets/images/sound_on.png";
    }
    //Music is turned off
    else if(GameJoinComponent.musicPlaying == true && GameJoinComponent.musicLoaded == true){ 
      GameJoinComponent.audio.pause();
      GameJoinComponent.musicPlaying = false;
      GameJoinComponent.musicButtonSrc = "../assets/images/sound_off.png";
    }
    //Music is turned back on
    else if(GameJoinComponent.musicPlaying == false && GameJoinComponent.musicLoaded == true){
      GameJoinComponent.audio.play();
      GameJoinComponent.musicPlaying = true;
      GameJoinComponent.musicButtonSrc = "../assets/images/sound_on.png";
    }
  }

  static get getMusicButtonSrc(){
    return GameJoinComponent.musicButtonSrc;
  }

  showCredits(){
    if(this.showCreds == false){
      this.showCreds = true;
    }
    else{
      this.showCreds = false;
    }

  }
}
