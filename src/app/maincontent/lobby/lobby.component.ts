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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly socketService: SocketService) {
    const gameId = ulid();
    socketService.socket.emit('createGame', gameId);

    this.route.queryParams.subscribe(params => {
      console.log(params.gameId);   
    });

  }

  ngOnInit(): void {

  }

}
