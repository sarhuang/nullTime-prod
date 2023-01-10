import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { GameCardListComponent } from './game-card-list/game-card-list.component';
import { GameJoinComponent } from './game-join/game-join.component';

const routes: Routes = [
	{path: '', component: GameJoinComponent},
	{path: 'game-lobby', component: GameLobbyComponent},
	{path: 'game-card-list', component: GameCardListComponent}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
