import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {io} from 'socket.io-client';
import { Socket } from 'socket.io-client/build/esm/socket';

@Injectable()

export class SocketService {

  
  socket = io('http://172.16.3.107:1234')
  
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
