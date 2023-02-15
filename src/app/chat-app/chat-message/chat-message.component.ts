import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit {

  @Output() public emitMessage:EventEmitter<any>; 

  public chatGroup:FormGroup;

  constructor(
    private _fb:FormBuilder
  ) { 
    this.chatGroup = this._fb.group({
      message:['',[Validators.required]]
    })
    this.emitMessage = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public onSubmit(){
    this.emitMessage.emit(this.chatGroup.value)
    this.chatGroup.reset();
  }

}
