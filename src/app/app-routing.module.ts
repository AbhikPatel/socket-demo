import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { UserNameGuard } from './core/user-name.guard';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  { 
    path: 'chat', 
    loadChildren: () => import('./chat-app/chat-app.module').then(m => m.ChatAppModule),
    canActivate:[UserNameGuard],
  },
  {
    path:'**',
    redirectTo:'/login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
