import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html'
})
export class ChatAppComponent implements OnInit {

  public chatGroup: FormGroup;
  public liveUser: any;
  public chatsData: any[];
  public userName: any;
  public showTyping: boolean;
  public typingUser: string;

  constructor(
    private _service: SocketService,
    private _fb: FormBuilder,
    private _commonService: CommonService,
    private _route: Router
  ) {
    this.chatGroup = this._fb.group({
      id: [''],
      message: ['', [Validators.required]],
    })
    this.chatsData = [];
    this.liveUser = [];
    this.showTyping = false;
    this.typingUser = ''
  }

  ngOnInit(): void {
    this.props();
  }

  public props() {
    this.chatGroup.controls['id'].setValue('Group')
    this._commonService.userName$.subscribe((data) => this.userName = data)
    this._service.emit('setUserName', this.userName)
    this._service.listen('welcome').subscribe((data) => console.log(data));
    this._service.listen('alive').subscribe((data) => {
      this.liveUser = ['Group'].concat(Object.keys(data.users))
    });
    this._service.listen('connect_error').subscribe(() => {
      alert('Username already exists')
      this._route.navigateByUrl('/login')
    });
    this._service.listen('open_chat').subscribe((data) => this.chatsData.push(data.message));
    this._service.listen('chat').subscribe((item) => {
      alert('New Message from ' + item.data.name)
      this.chatGroup.controls['id'].setValue(item.data.name)
      this.chatsData.push(item.data) 
    })

    this._service.listen('typing').subscribe((data) => {
      this.showTyping = true;
      this.typingUser = data
      setTimeout(() => {
          this.showTyping = false
      }, 800);
    })

    this.chatGroup.controls['id'].valueChanges.subscribe(() => this.chatsData = [])
    this.chatGroup.controls['message'].valueChanges.subscribe(() => this._service.emit('typing', this.userName))
  }

  public onSubmit() {
    if (this.chatGroup.valid) {
      let messageObj = {
        name: this.userName,
        message: this.chatGroup.value.message,
      }
      if(this.chatGroup.value.id === 'Group'){
        this._service.emit('open_chat', messageObj) 
        this.chatsData.push(messageObj)
      }else{
        let adding = Object.assign(messageObj, {receiver:this.chatGroup.value.id})
        this._service.emit('chat', adding)
        this.chatsData.push(adding)
      }
    }
    this.chatGroup.controls['message'].setValue('');
  }
}
