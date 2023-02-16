import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginGroup:FormGroup;

  constructor(
    private _fb:FormBuilder,
    private _route:Router,
    private _service:CommonService
  ) { 
    this.loginGroup = this._fb.group({
      name:['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  /**
   * @name onSubmit
   * @description This method is called when submit
   */
  public onSubmit(){
    if(this.loginGroup.valid){
      this._service.userName$.next(this.loginGroup.value.name)
      this._route.navigateByUrl('/chat')
    }
    this._service.checkUser();
  }
}
