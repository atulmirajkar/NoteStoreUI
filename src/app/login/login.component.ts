import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ErrorHandler } from '../Utils/ErrorHandling';
import { catchError } from 'rxjs/operators';
import { Token } from '../model/Token';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public UserName: string;
  public Password: string;
  private _authService: AuthService;
  private _router: Router;

  constructor(authService: AuthService, router: Router) {
    this._authService = authService;
    this._router = router;
  }

  ngOnInit() {
  }

  onLogin(submittedForm) {
    this._authService.Login(submittedForm.value.emailInput, submittedForm.value.passwordInput)
      .pipe<Token>(catchError(ErrorHandler.handle))
      .subscribe(tokenObj => {

        this._authService.isLoggedIn = true;
        localStorage.setItem("token", tokenObj.token);
        localStorage.setItem("refreshToken", tokenObj.refreshToken);

        console.log(tokenObj);
        this._router.navigate(['list']);

      });

  }
}
