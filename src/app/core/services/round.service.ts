import { Round } from './../models/round';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  rounds: Round[];

  constructor() { 

    this.rounds = [
      new Round(1000, 'abcdefghijklmnopqrstuvwxz1234567890'),
      new Round(2000, 'abcdefghijklmnopqrstuvwxz1234567890'),
      new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'),
      new Round(3000, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>')
    ]

  }

  getLevel(round: number): Round {
    return this.rounds[round];
  }
}
