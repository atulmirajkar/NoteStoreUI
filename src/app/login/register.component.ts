import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Token } from '../model/Token';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from '../Utils/ErrorHandling';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public UserName: string;
  public Password: string;
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }


  ngOnInit() {
  }

  onRegister(submittedForm) {
    this._authService.Register(submittedForm.value.emailInput, submittedForm.value.passwordInput)
    .pipe<Token>(catchError(ErrorHandler.handle))
    .subscribe(tokenObj => {
      this._authService.Token = tokenObj;
      console.log(tokenObj);
    });

  }

}
