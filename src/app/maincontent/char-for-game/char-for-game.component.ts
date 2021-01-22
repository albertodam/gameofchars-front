import { RoundResult } from './../../core/models/round-result';
import { RoundService } from '../../core/services/round.service';
import { EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Round } from 'src/app/core/models/round';

@Component({
  selector: 'app-char-for-game',
  templateUrl: './char-for-game.component.html',
  styleUrls: ['./char-for-game.component.scss']
})
export class CharForGameComponent implements OnInit {
  charForGame: string;
  fail: boolean;
  success: boolean;
  startTime: number;
  roundResult: RoundResult;
  @Output() roundStatus = new EventEmitter<RoundResult>();
  @Input() actualRound: Round;
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    
    if(this.success){
      return;
    }

    if(this.charForGame === event.key) {
      const time = Date.now() - this.startTime
      this.roundResult.time = time/1000;
      this.roundResult.score = this.actualRound.startScore - time;
      this.success = true;
      this.fail = false;
      this.roundStatus.emit(this.roundResult);
    }else{
      console.log("Fallaste!")
      this.fail = true;
    }

  }
  constructor(private readonly levelService: RoundService) {

  }

  ngOnInit(): void {
    this.roundResult = new RoundResult();
    const randomChar = Math.floor(Math.random() * this.actualRound.chars.length);
    this.charForGame = this.actualRound.chars[randomChar];
    this.startTime = Date.now();
  }

}
