import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IGameCard } from 'src/gameHelper/interfaces';
import { GetRandomCard } from 'src/gameHelper/utils';
import { GameCardListComponent } from '../game-card-list/game-card-list.component';
import { GameJoinComponent } from '../game-join/game-join.component';
import { DialogService } from '../services/dialog.service';
import { GameplayService } from 'src/app/services/gameplay-service'
import { closeLobby, getNewLobbyCode } from '../apiutils';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss'],
  providers: [GameplayService]
})
export class GameLobbyComponent implements OnInit {
  showAddingWords: boolean = false
  showLocalStart: boolean = false;
  showPlayingGame: boolean = false;
  cardsImported: boolean = false;
  confirm: boolean = false;
  static gameCode: string = "Loading...";
  static wordCount: number = 0;
  static gameCardList: IGameCard[] = [];
  hostEnteredGameCards: IGameCard[] = [];
  static musicButtonSrc = "";
  public gameJoinRef = GameJoinComponent;

  constructor(private router: Router, private dialogService : DialogService, private service: GameplayService) {
  }

  ngOnInit(): void {
    getNewLobbyCode().then(code => {
      GameLobbyComponent.gameCode = code;
    });
  }

  addWords = () => {
    this.showAddingWords = true;
  }

  hideAddWords = () => {
    this.showAddingWords = false;
  }

  clearCards = () => {
    GameLobbyComponent.gameCardList = [];
  }

  startGame = () => {
    this.showAddingWords = false;
    this.showPlayingGame = true;
    this.showLocalStart = false;
    console.log(this.service.getCardsAtPlay().length)
  }

  devBack = () => {
    this.showAddingWords = false;
    this.showPlayingGame = false;
  }

  createNewLobby = () => {
      this.createNewLobbyConfirm();
  }

  createNewLobbyConfirm(){
      this.dialogService.confirmDialog({
      title: 'Are you sure you want to create a new lobby?',
      message: 'All words will be erased and the Game Pin will change.',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      answer: this.confirm}).subscribe(async result => {
        this.confirm = result;
        if(this.confirm) {
          GameLobbyComponent.gameCode = await getNewLobbyCode();
          // GameLobbyComponent.gameCode = Math.floor(Math.random() * 90000) + 10000;
          GameLobbyComponent.wordCount = 0;
          GameLobbyComponent.gameCardList.splice(0);
        }
      });
  }

  getCardList = () => {
    return GameLobbyComponent.gameCardList.concat(this.hostEnteredGameCards);
  }

  getLocalCardList = () => {
    return GameLobbyComponent.gameCardList;
  }

  createLocalGame = () => {
    this.createLocalGameConfirm();
  }

   importCardsFromApi = () => {
    this.createImportCardConfirm();
  }

  createLocalGameConfirm(){
    this.dialogService.confirmDialog({
    title: 'Are you sure you want to start a local game?',
    message: 'All cards will be erased and the Game Pin will be unusable.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    answer: this.confirm}).subscribe(result => {
      this.confirm = result;
      if(this.confirm){
        closeLobby(GameLobbyComponent.gameCode);
        GameLobbyComponent.gameCode = (Math.floor(Math.random() * 90000) + 10000).toString();
        GameLobbyComponent.wordCount = 0;
        GameLobbyComponent.gameCardList.splice(0);
        this.showLocalStart = true;
        this.showAddingWords = false;
      }
    });
  }

  createImportCardConfirm(){
    this.dialogService.confirmDialog({
    title: 'Are you sure you want import all cards?',
    message: 'Doing this will close the lobby and no more cards can be added.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    answer: this.confirm}).subscribe(async result => {
      this.confirm = result;
      if(this.confirm){
        this.cardsImported = true;
        const cards = await closeLobby(GameLobbyComponent.gameCode);
        const cardsTyped: IGameCard[] = cards.map(x => ({
          owner: 0,
          value: x
        }));
        GameLobbyComponent.gameCardList = cardsTyped;
      }
    });
  }

  get getWordCount(){
    return this.getCardList().length;
  }

 static set setWordCount(value: number){
    GameLobbyComponent.wordCount += value;
  }

  get getGameCode(){
    return GameLobbyComponent.gameCode;
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

  returnHome(){
    this.router.navigateByUrl('');
  }

}
