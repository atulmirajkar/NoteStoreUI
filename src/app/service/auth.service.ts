import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../model/Token';

@Injectable()
export class AuthService {
  private readonly _endPoint = 'https://localhost:5001/api/v1/identity';
  private _http: HttpClient;
  public Token: Token;
  private _headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(http: HttpClient) {
    this._http = http;
  }


  Login(userName: string, password: string): Observable<Token> {

    const loginRequest: LoginRequest = {
      Email: userName,
      Password: password
    };


    return this._http.post<Token>(this._endPoint + '/login', loginRequest, { headers: this._headers });

  }

  Register(userName: string, password: string): Observable<Token> {
    const registerRequest: RegisterRequest = {
      Email: userName,
      Password: password
    };


    return this._http.post<Token>(this._endPoint + '/register', registerRequest, { headers: this._headers });

  }

}



export interface ErrorArr {
  errors: string[];
}

interface LoginRequest {
  Email: string;
  Password: string;
}

interface RegisterRequest {
  Email: string;
  Password: string;
}
