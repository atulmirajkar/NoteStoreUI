import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public UserName: string;
  public Password: string;
  private _loginService;

  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }

  ngOnInit() {
  }

  onLogin(submittedForm) {
    this._loginService.Login(submittedForm.value.emailInput, submittedForm.value.passwordInput)
    .subscribe(body => console.log(body));

  }
}
