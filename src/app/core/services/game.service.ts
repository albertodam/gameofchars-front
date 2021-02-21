import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private readonly http: HttpClient) { }

  getScores(nScores = 15): Observable<Score[]> {
    return this.http.get<Score[]>(`${environment.url_backend}/game?nScores=${nScores}`);
  }
}
