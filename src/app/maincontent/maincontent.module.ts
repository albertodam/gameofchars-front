import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharForGameComponent } from './char-for-game/char-for-game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameComponent } from './game/game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MainContentRoutingModule } from './maincontent-routing.module';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { ResultComponent } from './result/result.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ScoretableComponent } from './scoretable/scoretable.component';



@NgModule({
  declarations: [GameComponent,
    ScoreboardComponent, DashboardComponent,
    CharForGameComponent, ResultComponent,
    ScoretableComponent, MultiplayerComponent, LobbyComponent],
  imports: [
    MainContentRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class MaincontentModule { }
