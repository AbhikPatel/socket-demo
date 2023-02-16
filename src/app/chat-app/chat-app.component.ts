import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html'
})
export class ChatAppComponent implements OnInit {

  constructor(
    private _service:SocketService
  ) { }

  ngOnInit(): void {
    this._service.listen('welcome').subscribe((data) => console.log(data))
  }

}
