import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Round } from './../models/round';
import { Injectable } from '@angular/core';
import { RoundResult } from '../models/round-result';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  private rounds: Round[];
  private roundsResult: RoundResult[] = [];
  constructor(private readonly http: HttpClient) {

    this.rounds = [
      new Round(1500, '1234567890'),
      new Round(1500, 'abcdefghijklmnopqrstuvwxz1234567890'),
      new Round(1500, 'abcdefghijklmnopqrstuvwxz1234567890'),
      new Round(1700, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'),
      new Round(2000, '%$&\'@,.-_/()=!<>{}[]'),
      new Round(2000, '^¬|€Ç'),
      new Round(2200, '^¬|€Ç%$&\'@,.-_/()=!<>{}[]'),
      new Round(2200, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890^¬|€Ç%$&\'@,.-_/()=!<>{}[]'),
      new Round(1200, 'estoesunarondaderegalo,disfrutala'),
      new Round(500, 'a'),
    ];

  }

  addRoundResult(round: RoundResult): void {
    this.roundsResult.push(round);
  }

  getRoundsResult(): RoundResult[] {
    return this.roundsResult;
  }

  getRounds(): Round[] {
    return this.rounds;
  }

  getLevel(round: number): Round {
    return this.rounds[round];
  }

  finishGame(score: number): Observable<any> {
    this.roundsResult = [];
    return this.http.post(`${environment.url_backend}/game`, { score });
  }
}
