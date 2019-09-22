import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { pipe } from 'rxjs';
import { ErrorHandler } from '../Utils/ErrorHandling';
import { catchError } from 'rxjs/operators';
import {Token} from '../model/Token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public UserName: string;
  public Password: string;
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  ngOnInit() {
  }

  onLogin(submittedForm) {
    this._authService.Login(submittedForm.value.emailInput, submittedForm.value.passwordInput)
    .pipe<Token>(catchError(ErrorHandler.handle))
    .subscribe(tokenObj => {
      this._authService.Token = tokenObj;
      console.log(tokenObj);
    });

  }
}
