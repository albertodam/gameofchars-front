import { LevelService } from './../../core/services/level.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameStarted: boolean;
  charForGame: string;

  constructor(private readonly levelService: LevelService) { }

  ngOnInit(): void {
  }

  selectLevel(level: number){
    const levelSelected = this.levelService.getLevel(level);
    const randomChar = Math.floor(Math.random() * levelSelected.length);
    this.charForGame = levelSelected[randomChar]; 
  }

  startGame(){
    this.gameStarted = !this.gameStarted;
  }

}
