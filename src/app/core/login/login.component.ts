import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _route: Router
  ) {
    this.loginGroup = this._fb.group({
      name: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.loginGroup.valid) {
      localStorage.setItem('name', this.loginGroup.value.name)
      this._route.navigateByUrl('/chat')
    }
  }

}
