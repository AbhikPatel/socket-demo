import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  { 
    path: 'chat', 
    loadChildren: () => import('./chat-app/chat-app.module').then(m => m.ChatAppModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
