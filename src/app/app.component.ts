import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public chatGroup: FormGroup;
  public showTyping: boolean;
  public chatsData: any[];
  public change: boolean;
  public userName: string;
  public onlineCount:number;
  public getIds:any[];
  public currentId:string

  constructor(
    private _service: SocketService,
    private _fb: FormBuilder
  ) {
    this.chatGroup = this._fb.group({
      name: [''],
      message: [''],
      id: [''],
    })
    this.change = true;
    this.showTyping = false;
    this.chatsData = [];
    this.userName = '';
    this.onlineCount = 0;
    this.getIds = [];
    this.currentId = '';
  }

  ngOnInit(): void {
    this.props();
  }

  public props() {
    // this._service.listen('chat').subscribe((data) => this.newMessage(data))
    this._service.listen('welcome').subscribe((data) => this.currentId = data.id)
    this._service.listen('typing').subscribe(() => {
      setTimeout(() => {
        this.showTyping = false;
      }, 800);
      this.showTyping = true
    });
    this._service.listen('alive').subscribe((data) => {
      this.onlineCount = data.clients_count
      this.getIds = data.sids
      let id = this.getIds.indexOf(this.currentId)
      this.getIds.splice(id, 1) 
    })
    this.chatGroup.controls['message'].valueChanges.subscribe((data) => this._service.emit('typing', data))
    this._service.listen('private').subscribe((data) => console.log(data))
  }

  public onSubmit() {
    // this._service.emit('chat', this.chatGroup.value)
    // this.chatsData.push(this.chatGroup.value)
    // if(this.chatGroup.value.id)
    // console.log(this.chatGroup.value.io);
    
    this._service.emit('private', {id:this.chatGroup.value.id, message:this.chatGroup.value.message})
    this.chatGroup.controls['message'].setValue('')
  }

  public newMessage(chat: any) {
    this.chatsData.push(chat)
  }

  public checkUser(user: string) {
    return this.chatGroup.value.name === user ? true : false
  }

  public displayTyping() {
    return 'Typing..'
  }

  public onName(data: any) {
    console.log(data);

  }
}
