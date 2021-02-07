import { SocketService } from './../../core/services/socket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private readonly route: ActivatedRoute,
    private readonly socketService: SocketService) {

    this.messages = [];
    this.nUsers = 1;

    this.socketService.socket.on('userJoinned', (data) => {
      console.log(data);
      this.messages.push(data);
      this.nUsers = data.game;
    });

    this.socketService.socket.on('userLeave', (data) => {
      console.log(data);
      this.messages.push(data);
      this.nUsers = data.game;
    });

    this.route.queryParams.subscribe(params => {
      if (params.gameId) {
        //TODO join game
        this.joinGame(params.gameId);
      } else {
        this.createGame();
      }
      console.log(params.gameId);
    });

  }

  ngOnInit(): void {

  }


  private joinGame(gameId: string): void {
    this.gameId = gameId;
    this.socketService.socket.emit('joinGame', gameId);
  }

  private createGame(): void {
    const gameId = ulid();
    this.gameId = gameId;
    this.socketService.socket.emit('createGame', gameId);
  }

}
