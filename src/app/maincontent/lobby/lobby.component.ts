import { Player } from './../../core/models/player';
import { Game } from './../../core/models/game';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ulid } from 'ulid';
import { SocketService } from './../../core/services/socket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  socket: any;
  gameId: string;
  nUsers: number;
  messages: any[];
  isCreator: boolean;
  game: Game;
  players: Player[];
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly socketService: SocketService) {

    this.nUsers = 0;

    this.socketService.socket.on('userJoinned', (game: Game) => {
      this.players = game.players;
      this.nUsers = game.players.length;
    });

    this.socketService.socket.on('userLeave', (game: Game) => {
      this.nUsers = game.players.length;
    });

    this.socketService.socket.on('startGame', (game) => {
      localStorage.setItem('game', JSON.stringify(game));
      this.router.navigateByUrl('/game?m=' + this.gameId);
    });

    this.route.queryParams.subscribe(params => {
      if (params.gameId) {
        this.joinGame(params.gameId);
      } else {
        this.createGame();
      }
    });

  }

  ngOnInit(): void {

  }

  startGame(): void {
    this.socketService.socket.emit('startingGame', this.gameId);
  }

  private joinGame(gameId: string): void {
    this.socketService.socket.emit('joinGame', this.getInfoGame(gameId));
  }

  private createGame(): void {
    const gameInfo = this.getInfoGame(ulid());
    console.log(gameInfo);
    this.socketService.socket.emit('createGame', gameInfo);
    this.isCreator = true;
  }

  private getInfoGame(gameId: string): any {
    this.gameId = gameId;

    const { username, avatar } = JSON.parse(localStorage.getItem('userInfo')) || {username:localStorage.getItem('musername'), avatar: ''};

    return {
      gameId,
      username,
      avatar
    };
  }

}
