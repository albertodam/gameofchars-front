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
      new Round(1000, 'abcdefghijklmnopqrstuvwxz1234567890'),
      // new Round(2000, 'abcdefghijklmnopqrstuvwxz1234567890'),
      // new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      // new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      // new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      // new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      // new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      // new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      // new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      // new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>')
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
