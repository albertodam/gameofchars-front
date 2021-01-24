import { MainContentRoutingModule } from './maincontent-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CharForGameComponent } from './char-for-game/char-for-game.component';
import { ResultComponent } from './result/result.component';



@NgModule({
  declarations: [GameComponent, ScoreboardComponent, DashboardComponent, CharForGameComponent, ResultComponent],
  imports: [
    MainContentRoutingModule,
    CommonModule
  ]
})
export class MaincontentModule { }
