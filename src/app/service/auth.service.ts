import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Token} from '../model/Token';

@Injectable()
export class AuthService {
  private readonly _loginEndpoint = 'https://localhost:5001/api/v1/identity/login';
  private _http: HttpClient;
  public Token: Token;

  constructor(http: HttpClient) {
    this._http = http;
  }


  Login(userName: string, password: string): Observable<Token> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const loginRequest: LoginRequest = {
      Email: userName,
      Password: password
    };


    return this._http.post<Token>(this._loginEndpoint, loginRequest, { headers: headers });

  }


}



export interface ErrorArr {
  errors: string[];
}

interface LoginRequest {
  Email: string;
  Password: string;
}


