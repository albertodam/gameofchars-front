import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ulid } from 'ulid';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']
})
export class MultiplayerComponent {
  gameId: string;

  constructor(private readonly router: Router) { }

  createGame(): void {
    this.router.navigateByUrl('/lobby');
  }

  joinGame(): void {

    this.router.navigateByUrl('/lobby?gameId=' + this.gameId);
  }

}
