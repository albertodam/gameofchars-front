import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  loginEvent: EventEmitter<void> =  new EventEmitter();

  constructor() { }
}
