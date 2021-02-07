import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;

  constructor() {
    console.log("iniciando socket");
    this.socket = io(environment.url_backend);
   }
}
