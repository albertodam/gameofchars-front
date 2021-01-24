import { ResultComponent } from './result/result.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './../maincontent/game/game.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'game', component: GameComponent},
  {path: 'scoreboard', component: ScoreboardComponent},
  {path: 'result', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
