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
  nRound: number;
  showCharComponent: boolean;
  timeResult: number;
  score: number;
  actualRound: Round;
  rounds: Round[];
  gameFinished: boolean;
  roundResult: RoundResult[] = [];
  constructor(private readonly roundService: RoundService) {
    this.nRound = 0;
    this.rounds = this.roundService.getRounds();
  }

  ngOnInit(): void {

  }

  startGame(): void {
    this.gameStarted = !this.gameStarted;
    this.startCountdown();
  }

  roundStatus(data: RoundResult): void {
    if (this.isLastRound()) {
      this.gameFinished = true;
    }
    this.roundService.addRoundResult(data);
    this.timeResult = data.time;
    this.score = data.score;
    this.roundFinish = true;
  }

  nextLevel(): void {
    if (this.isLastRound()) {
      return;
    }
    this.nRound++;
    this.roundFinish = false;
    this.showCharComponent = false;
    this.startCountdown();
  }

  private showChar(): void {
    setTimeout(() => {
      this.actualRound = this.roundService.getLevel(this.nRound);
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

  private isLastRound(): boolean{
    return this.nRound === (this.rounds.length - 1);
  }

}
