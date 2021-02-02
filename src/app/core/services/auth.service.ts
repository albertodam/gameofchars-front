import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  githubLogin(code: string): Observable<any> {
    return this.http.post(`${environment.url_backend}/auth/github`, { code });
  }

  anonymousToken(): Observable<any> {
    return this.http.post(`${environment.url_backend}/auth/anonymous`,{});
  }

}
