import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string = localStorage.getItem('token');
    let req = request;
    if (token) {
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    return next.handle(req);
  }
}
