import { CommunicationService } from './../../core/services/communication.service';
import { UserLogged } from '../../core/models/user-logged';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userLogged: UserLogged;
  socket: any;

  constructor(private readonly commuService: CommunicationService) {
    this.commuService.loginEvent.subscribe(() => {
      this.setUser();
    });

    this.socket = io("http://localhost:3000");

  }

  ngOnInit(): void {

    this.setUser();

  }

  setUser(): void {
    try {
      const { username, avatar, id } = JSON.parse(localStorage.getItem('userInfo'));
      this.userLogged = new UserLogged(username, avatar, id);
    } catch (err) {

    }

  }

  logout(): void {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    this.userLogged = null;
  }

  loginGithub(): void {
    window.open(`https://github.com/login/oauth/authorize?client_id=${environment.client_id}&redirect_url=${environment.github_redirect_url}&scope=read:user`, '_self');
  }

}
