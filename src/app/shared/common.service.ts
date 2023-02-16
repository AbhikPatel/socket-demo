import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public userName$:BehaviorSubject<string>
  constructor() { 
    this.userName$ = new BehaviorSubject('')
  }

  public checkUser(){
    let user;
    this.userName$.subscribe((data) => user = data)
    return user ? true : false
  }
}
