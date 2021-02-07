import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;

  constructor() {
    console.log("iniciando socket");
    this.socket = io("http://localhost:3000");
   }
}
