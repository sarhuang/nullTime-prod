import { Component, OnInit } from '@angular/core';
import { GameplayService } from '../services/gameplay-service';

@Component({
  selector: 'app-game-score-display',
  templateUrl: './game-score-display.component.html',
  styleUrls: ['./game-score-display.component.scss']
})
export class GameScoreDisplayComponent implements OnInit {

  constructor(private service: GameplayService) { }

  ngOnInit(): void {
  }

  getTeam1Score = () => {
    return this.service.getTeam1Score().toString();
  }

  getTeam2Score = () => {
    return this.service.getTeam2Score().toString();
  }

  getCurrentTeam = () => {
    return this.service.getCurrentTeam();
  }

}
