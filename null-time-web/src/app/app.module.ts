import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCardListComponent } from './game-card-list/game-card-list.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { GameJoinComponent } from './game-join/game-join.component';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { RoundPageComponent } from './game/round/round-page/round-page.component';
import { TurnStartPageComponent } from './game/round/turn-start-page/turn-start-page.component';
import { TurnPlayPageComponent } from './game/round/turn-play-page/turn-play-page.component';
import { CardComponent } from './card/card.component';
import { ModerationPageComponent } from './game/round/moderation-page/moderation-page.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { MessageComponent } from './dialogs/message/message.component';
import { GameScoreDisplayComponent } from './game-score-display/game-score-display.component';


@NgModule({
	declarations: [
		AppComponent,
  		GameCardListComponent,
    	GameCardComponent,
     	GameLobbyComponent,
      	GameJoinComponent,
     AppWrapperComponent,
     RoundPageComponent,
     TurnStartPageComponent,
     TurnPlayPageComponent,
     CardComponent,
     ModerationPageComponent,
	 ConfirmComponent,
  MessageComponent,
  GameScoreDisplayComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
  		BrowserAnimationsModule,
		MatCardModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
