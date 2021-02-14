import { GameComponent } from './game/game.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MultiplayerMenuComponent } from './multiplayer-menu/multiplayer-menu.component';
import { ResultComponent } from './result/result.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { SingleGameComponent } from './single-game/single-game.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'single-game', component: SingleGameComponent},
  {path: 'multiplayer-menu', component: MultiplayerMenuComponent},
  {path: 'game', component: GameComponent},
  {path: 'lobby', component: LobbyComponent},
  {path: 'scoreboard', component: ScoreboardComponent},
  {path: 'result', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
