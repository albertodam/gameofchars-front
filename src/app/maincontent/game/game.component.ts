import { Game } from './../../core/models/game';
import { SocketService } from './../../core/services/socket.service';
import { Round } from './../../core/models/round';
import { Component, OnInit, HostListener } from '@angular/core';

import { RoundResult } from '../../core/models/round-result';
import { RoundService } from '../../core/services/round.service';
import { ActivatedRoute } from '@angular/router';

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
  multiplayer: { id: any; };
  players: any;


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if (!this.roundFinish) {
      return;
    }
    console.log(event.key);
    if (event.key === 'Enter') {
      this.nextLevel();
    }

  }


  constructor(
    private readonly socketService: SocketService,
    private readonly route: ActivatedRoute,
    private readonly roundService: RoundService
  ) {
    this.nRound = 0;
    this.rounds = this.roundService.getRounds();
    this.route.queryParams.subscribe(params => {
      if (params.m) {
        this.multiplayer = {
          id: params.m
        };
        this.players = JSON.parse(localStorage.getItem('game')).players;

        this.socketService.socket.on('playerFinishedRound', (game: Game) => {
          console.log(game);
          this.players = game.players.sort((player1, player2) => {
            return player1.score > player2.score ? -1 : 1;
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.gameStarted = !this.gameStarted;
    this.startCountdown();
  }

  startGame(): void {

  }

  roundStatus(data: RoundResult): void {
    if (this.isLastRound()) {
      this.gameFinished = true;
    }

    if (this.multiplayer) {
      const finishRound = {
        gameId: this.multiplayer.id,
        score: data.score
      };
      this.socketService.socket.emit('finishPlayerRound', finishRound);
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

  private isLastRound(): boolean {
    return this.nRound === (this.rounds.length - 1);
  }

}
