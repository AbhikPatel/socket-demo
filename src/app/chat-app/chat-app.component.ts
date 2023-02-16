import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html'
})
export class ChatAppComponent implements OnInit {

  public chatGroup:FormGroup;
  public liveUser:any[];

  constructor(
    private _service:SocketService,
    private _fb:FormBuilder
  ) { 
    this.chatGroup = this._fb.group({
      id:[''],
      message:['',[Validators.required]],
    })
    this.liveUser = []
  }

  ngOnInit(): void {
    let userName = localStorage.getItem('name')
    this._service.emit('setUserName', userName)
    this._service.listen('welcome').subscribe((data) => console.log(data));
    this._service.listen('alive').subscribe((data) => console.log(data));
    // console.log(this.liveUser);
    
  }

  public onSubmit(){
    if(this.chatGroup.valid){

    }
  }

}
