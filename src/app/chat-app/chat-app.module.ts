import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatAppRoutingModule } from './chat-app-routing.module';
import { ChatAppComponent } from './chat-app.component';
import { SocketService } from './socket.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatAppComponent
  ],
  imports: [
    CommonModule,
    ChatAppRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    SocketService
  ]
})
export class ChatAppModule { }
