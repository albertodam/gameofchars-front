import { MainContentRoutingModule } from './maincontent-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';



@NgModule({
  declarations: [GameComponent, ScoreboardComponent],
  imports: [
    MainContentRoutingModule,
    CommonModule
  ]
})
export class MaincontentModule { }
