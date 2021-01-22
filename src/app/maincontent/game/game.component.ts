import { Round } from './../../core/models/round';
import { Component, OnInit } from '@angular/core';

import { RoundResult } from '../../core/models/round-result';
import { RoundService } from '../../core/services/round.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameStarted: boolean;
  roundFinish: boolean;
  countDownChar: string;
  round: number;
  showCharComponent: boolean;
  timeResult: number;
  score: number;
  actualRound: Round;

  constructor(private readonly roundService: RoundService) {
    this.round = 0;
  }

  ngOnInit(): void {

  }

  startGame() {
    this.gameStarted = !this.gameStarted;
    this.startCountdown();
  }

  roundStatus(data: RoundResult): void{
      this.timeResult = data.time;
      this.score = data.score;
      this.roundFinish = true;
  }

  private showChar(): void {
    setTimeout(() => {
      this.actualRound = this.roundService.getLevel(this.round);
      this.showCharComponent = true;    
    }, Math.floor(Math.random() * 5) * 1000);

  }

  private startCountdown(): void {
    let counter = 3;
    const countDownInterval = setInterval(() => {
      this.countDownChar = '' + counter;
      counter--;
      if (counter < 0) {
        clearInterval(countDownInterval);
        this.countDownChar = '';
        this.showChar();
      }

    }, 1000);
  }

}
