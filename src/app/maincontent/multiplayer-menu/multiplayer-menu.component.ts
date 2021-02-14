import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ulid } from 'ulid';

@Component({
  selector: 'app-multiplayer-menu',
  templateUrl: './multiplayer-menu.component.html',
  styleUrls: ['./multiplayer-menu.component.scss']
})
export class MultiplayerMenuComponent {
  gameId: string;
  username: string;
  constructor(private readonly router: Router) { }

  createGame(): void {
    localStorage.setItem('musername', this.username);
    this.router.navigateByUrl('/lobby');
  }

  joinGame(): void {
    localStorage.setItem('musername', this.username);
    this.router.navigateByUrl('/lobby?gameId=' + this.gameId);
  }

}
