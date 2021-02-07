import { CommunicationService } from './../../core/services/communication.service';
import { UserLogged } from '../../core/models/user-logged';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userLogged: UserLogged;


  constructor(private readonly commuService: CommunicationService) {
    this.commuService.loginEvent.subscribe(() => {
      this.setUser();
    });

  }

  ngOnInit(): void {

    this.setUser();
    // this.socket.on('respuesta',(data)=>{
    //   console.log('Me han hablado desde otro lado');
    //   console.log(data);
    // })
  }


  testSocket(): void {
  //  this.socket.emit('test', 'Hola soy angular');
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
