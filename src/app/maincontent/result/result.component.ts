import { CommunicationService } from './../../core/services/communication.service';
import { UserLogged } from './../../core/models/user-logged';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoundResult } from './../../core/models/round-result';
import { RoundService } from './../../core/services/round.service';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  roundsResult: RoundResult[];
  scoreTotal: number;
  message: string;

  constructor(
    private readonly commuService: CommunicationService,
    private readonly authService: AuthService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router, private readonly roundService: RoundService) { }

  ngOnInit(): void {
    this.roundsResult = this.roundService.getRoundsResult();
    if (this.roundsResult.length === 0) {
      this.router.navigate(['/']);
    }
    this.scoreTotal = this.roundsResult
      .map((round: RoundResult) => round.score)
      .reduce((valorAnterior, valorActual) => valorAnterior + valorActual);

    const message = `He conseguido una puntación de ${this.scoreTotal} puntos en #gameofchars⚔️. Entra e intenta superarme! https://gameofchars.netlify.app`;
    this.message = encodeURIComponent(message);
    const tokenPrevious = localStorage.getItem('token');
    if (tokenPrevious) {
      this.sendScore();
    } else {
      this.authService.anonymousToken().subscribe(res => {
        const { avatar_url, login, id, token } = res;
        localStorage.setItem('userInfo', JSON.stringify(new UserLogged(login, avatar_url, id)));
        localStorage.setItem('token', token);
        this.commuService.loginEvent.emit();
        this.sendScore();
      });
    }
  }

  private sendScore(): void {
    this.roundService.finishGame(this.scoreTotal).subscribe(() => {
      console.log('Puntuación guardada');
    }, err => console.log);
  }


  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
