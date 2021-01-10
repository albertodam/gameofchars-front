import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor() { }

  getLevel(level: number): string {

    const levelDefinitions = {
      1: 'abcdefghijklmnopqrstuvwxz1234567890',
      2: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,.-/()=!<>'
    };

    return levelDefinitions[level];

  }
}
