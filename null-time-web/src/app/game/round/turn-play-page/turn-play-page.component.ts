import { Component, OnInit, Input } from '@angular/core';
import { IGameCard } from 'src/gameHelper/interfaces'
import { GameLobbyComponent } from 'src/app/game-lobby/game-lobby.component'
import { GameplayService } from 'src/app/services/gameplay-service';

@Component({
  selector: 'app-turn-play-page',
  templateUrl: './turn-play-page.component.html',
  styleUrls: ['./turn-play-page.component.scss']
})
export class TurnPlayPageComponent implements OnInit {
  @Input() cardList: IGameCard[] = GameLobbyComponent.gameCardList;

  constructor(private service: GameplayService) { }

  ngOnInit(): void {
  }

  getService() {
    return this.service;
  }

  getCardList = () => {
    return this.service.getCardsAtPlay();
  }

  getTimeRemaining = () => {
    return this.service.getTimeRemaining();
  }
}
