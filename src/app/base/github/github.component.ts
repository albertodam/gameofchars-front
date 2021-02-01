import { CommunicationService } from './../../core/services/communication.service';
import { UserLogged } from './../../core/models/user-logged';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent {

  constructor(
    private readonly commuService: CommunicationService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.getToken(params.code);
    });

  }

  private getToken(code: string): void {

    this.authService.githubLogin(code)
      .subscribe((res) => {
        const { avatar_url, login, id, token } = res;
        localStorage.setItem('userInfo', JSON.stringify(new UserLogged(login, avatar_url, id)));
        localStorage.setItem('token', token);
        this.commuService.loginEvent.emit();
        this.router.navigateByUrl('/');
      }, err => console.error(err));

  }


}
