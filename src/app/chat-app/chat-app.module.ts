import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatAppRoutingModule } from './chat-app-routing.module';
import { ChatAppComponent } from './chat-app.component';
import { SocketService } from './socket.service';


@NgModule({
  declarations: [
    ChatAppComponent
  ],
  imports: [
    CommonModule,
    ChatAppRoutingModule
  ],
  providers:[
    SocketService
  ]
})
export class ChatAppModule { }
