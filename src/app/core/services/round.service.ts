import { Round } from './../models/round';
import { Injectable } from '@angular/core';
import { RoundResult } from '../models/round-result';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  private rounds: Round[];
  private roundsResult: RoundResult[] = [];
  constructor() {

    this.rounds = [
      new Round(800, '1234567890'),
      new Round(800, 'abcdefghijklmnopqrstuvwxz1234567890'),
      new Round(900, 'abcdefghijklmnopqrstuvwxz1234567890'),
      new Round(900, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'),
      new Round(1200, '%$&\'@,.-_/()=!<>{}[]'),
      new Round(1200, 'áéíóúÁÉÍÓÚ'),
      new Round(1200, '^¬|€Ç'),
      new Round(1200, '^¬|€Ç%$&\'@,.-_/()=!<>{}[]'),
      new Round(1000, 'áéíóúÁÉÍÓÚ^¬|€Ç%$&\'@,.-_/()=!<>{}[]'),
      new Round(700, 'estoesunarondaderegalo,disfrutala'),
      new Round(1000, 'öüëäïáéíóúÁÉÍÓÚ')
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

  finishGame(): void {
    this.roundsResult = [];
  }
}
