import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChatAppRoutingModule } from './chat-app-routing.module';
import { ChatAppComponent } from './chat-app.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatsService } from './chats.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatAppComponent,
    ChatUsersComponent,
    ChatMessageComponent
  ],
  imports: [
    CommonModule,
    ChatAppRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    ChatsService
  ]
})
export class ChatAppModule { }
