import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly router: Router, private readonly roundService: RoundService) { }

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
    this.roundService.finishGame();
  }

}
