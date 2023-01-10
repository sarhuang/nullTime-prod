import { Component, OnInit, Input } from '@angular/core';
import { IGameCard } from 'src/gameHelper/interfaces'
import { GameplayService } from 'src/app/services/gameplay-service';
import { GameLobbyComponent } from 'src/app/game-lobby/game-lobby.component'

@Component({
  selector: 'app-moderation-page',
  templateUrl: './moderation-page.component.html',
  styleUrls: ['./moderation-page.component.scss']
})
export class ModerationPageComponent implements OnInit {
  @Input() cardList: IGameCard[] = [];

  constructor(private service: GameplayService) { }

  ngOnInit(): void {
  }

  getCardList = () => {
    return this.service.getAllCardsRef();
  }

}
