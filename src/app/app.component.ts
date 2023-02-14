import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  
  chatGroup:FormGroup;
  showTyping:boolean;
  chatsData:any[]

  constructor(
    private _service:SocketService,
    private _fb:FormBuilder
  ){
    this.chatGroup = this._fb.group({
      name:[''],
      message:['']
    })

    this.showTyping = false;
    this.chatsData = [];
  }

  ngOnInit(): void {
    this._service.listen('chat').subscribe((data) => this.newMessage(data))
    this._service.listen('typing').subscribe(() => {
      setTimeout(() => {
        this.showTyping = false;
      }, 2000);
      this.showTyping = true
    });

    this.chatGroup.valueChanges.subscribe((data) => this._service.emit('typing', data.message))
  }

  public onSubmit(){
    this._service.emit('chat', this.chatGroup.value)
    console.log(this.chatGroup.value);
  }

  public newMessage(chat:any){
    this.chatsData.push(chat)
  }
}
