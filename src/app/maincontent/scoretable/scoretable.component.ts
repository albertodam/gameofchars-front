import { GameService } from './../../core/services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoretable',
  templateUrl: './scoretable.component.html',
  styleUrls: ['./scoretable.component.scss']
})
export class ScoretableComponent implements OnInit {
  scores: any;
  scoresDefault: { name: string; }[];

  constructor(private readonly gameService: GameService) {
    this.scoresDefault = [
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
      { name: '_' },
    ];

    this.gameService.getScores().subscribe(scores => {
      this.scores = scores;
      console.log(scores);
      this.fillScores();
    });
  }

  ngOnInit(): void {
  }

  private fillScores(): void {
    const diff = 15 - this.scores.length;
    if (diff > 0) {
      this.scores = this.scores.concat(this.scoresDefault.slice(0, diff));
    }
  }
}
