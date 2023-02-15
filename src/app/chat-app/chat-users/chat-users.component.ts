import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html'
})
export class ChatUsersComponent implements OnInit {

  @Input() public users:any

  public userName:any;

  constructor() { 
    
  }
  
  ngOnInit(): void {
    this.userName = localStorage.getItem('name')
  }

  public onChat(){
    
  }

}
