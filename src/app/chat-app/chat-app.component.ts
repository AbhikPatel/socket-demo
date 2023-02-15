import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatsService } from './chats.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html'
})
export class ChatAppComponent implements OnInit {

  public users:any;

  constructor(
    private _service:ChatsService
  ) { 
    // this.users = new BehaviorSubject('');
  }

  ngOnInit(): void {
    this.props();
  }

  public props(){
    this._service.listen('welcome').subscribe((data) => console.log(data))
    this._service.listen('alive').subscribe((data) => this.users = data.sids)
    this._service.listen('chat').subscribe((data) => console.log(data))
    this._service.emit('setUserName', localStorage.getItem('name'))
  }

  public getMessage(message:any){
    let userName = localStorage.getItem('name')
    this._service.emit('chat', Object.assign({name:userName}, message))
  }

}
