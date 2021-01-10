import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './../maincontent/game/game.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';


const routes: Routes = [
  {path: '', component: GameComponent},
  {path: 'scoreboard', component: ScoreboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
