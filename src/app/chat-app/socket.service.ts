import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable()
export class SocketService {

  socket = io('ws://anonychat.onrender.com:2121')
  
  constructor() {
  }
  
  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data:any) => {
        subscriber.next(data);
      })
    })
  }
  
  emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
  }
}
