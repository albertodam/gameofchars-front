import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoundResult } from '../../core/models/round-result';
import { RoundService } from '../../core/services/round.service';
import { Game } from './../../core/models/game';
import { Round } from './../../core/models/round';
import { SocketService } from './../../core/services/socket.service';

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
  allPlayerFinished: boolean;
  trap: any;
  alreadyUsed: boolean;

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
    private readonly router: Router,
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

        this.socketService.socket.on('finishGame', canFinishGame => {
          console.log('ha terminado todo el mundo');
          this.allPlayerFinished = canFinishGame;
        });


        this.socketService.socket.on('finishGameAllPlayer', (result: Game) => {
          const path = `/result?mr=${btoa(JSON.stringify(result))}`;
          this.router.navigateByUrl(path);
        });

        this.socketService.socket.on('playerFinishedRound', (game: Game) => {
          this.players = game.players.sort((player1, player2) => {
            return player1.score > player2.score ? -1 : 1;
          });
        });


        this.socketService.socket.on('sendTrapToPlayer', trap => {
          this.trap = trap;
        });

      }
    });
  }

  ngOnInit(): void {
    this.gameStarted = !this.gameStarted;
    this.startCountdown();
  }


  sendTrap(): void {
    this.alreadyUsed = true;
    this.socketService.socket.emit('sendTrap', this.multiplayer.id);
  }

  roundStatus(data: RoundResult): void {
    if (this.isLastRound()) {
      this.gameFinished = true;

      if (this.multiplayer) {
        this.socketService.socket.emit('playerFinishGame', this.multiplayer.id);
      }
    }

    this.trap = false;
    this.alreadyUsed = false;
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

  finishGame(): void {
    if (this.multiplayer) {
      this.socketService.socket.emit('notifyAllUserFinishGame', this.multiplayer.id);
    } else {
      this.router.navigateByUrl('/result');
    }

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
