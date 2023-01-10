import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameplayService } from 'src/app/services/gameplay-service';
import { IGameCard, RoundState } from 'src/gameHelper/interfaces';

@Component({
  selector: 'app-round-page',
  templateUrl: './round-page.component.html',
  styleUrls: ['./round-page.component.scss'],
  providers: [ GameplayService ]
})
export class RoundPageComponent implements OnInit {
  @Input() allCardsRef : IGameCard[] = [];
  currentRoundPhase: RoundState = RoundState.Intro;

  constructor(private service: GameplayService, private router: Router) { }

  ngOnInit(): void {
    this.service.setAllCardsRef(this.allCardsRef);
    this.service.currentRoundPhase.subscribe(val => this.currentRoundPhase = val);
    this.service.gameInit();
  }

  getService() {
    return this.service;
  }

  getCardList = () => {
    this.service.getAllCardsRef();
  }

  startTurnPhase = () => {
    //this.service.startTurn();
    this.service.startTurnPhase();
  }

  startNextRound = () => {
    this.service.startRound();
  }

  backToMainMenu = () => {
    this.router.navigateByUrl('/');
  }

  getRoundDiagram(){
    if(this.service.getCurrentRound() == 1){
        return "./assets/images/round1.png";
    }
    else if(this.service.getCurrentRound() == 2){
      return "./assets/images/round2.png";
    }
    else{
      return "./assets/images/round3.png";
    }
  }
}
