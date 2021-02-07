import { SocketService } from './../../core/services/socket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ulid } from 'ulid';

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
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly socketService: SocketService) {

    this.messages = [];
    this.nUsers = 1;

    this.socketService.socket.on('userJoinned', (data) => {
      console.log(data);
      this.messages.push(data);
      this.nUsers = data.game.nUsers;
    });

    this.socketService.socket.on('userLeave', (data) => {
      console.log(data);
      this.messages.push(data);
      this.nUsers = data.game;
    });

    this.socketService.socket.on('startGame', (data) => {
      this.router.navigateByUrl('/game');
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
    this.gameId = gameId;
    this.socketService.socket.emit('joinGame', gameId);
  }

  private createGame(): void {
    const gameId = ulid();
    this.gameId = gameId;
    this.socketService.socket.emit('createGame', gameId);
    this.isCreator = true;
  }

}
