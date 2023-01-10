import { ApplicationRef, Component, OnInit } from '@angular/core';
import { GameplayService } from 'src/app/services/gameplay-service';

@Component({
  selector: 'app-turn-start-page',
  templateUrl: './turn-start-page.component.html',
  styleUrls: ['./turn-start-page.component.scss']
})
export class TurnStartPageComponent implements OnInit {

  constructor(private service: GameplayService) { }
  isPlayingTurn: boolean = false;

  ngOnInit(): void {
    this.service.playTurn.subscribe(val => this.isPlayingTurn = val);
  }

  getService() {
    return this.service;
  }

  getRemainingCards() {
    return this.service.getRemainingCards();
  }

  getCurrentTeam() {
    return this.service.getCurrentTeam();
  }

  startTurn = () => {
    this.service.startTurn();
  }

  devBack = () => {
    this.isPlayingTurn = false;
  }

}
