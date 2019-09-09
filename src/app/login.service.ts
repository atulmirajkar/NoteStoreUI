import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService{
  private readonly _loginEndpoint = 'https://localhost:5001/api/v1/identity/login';
  private _http: HttpClient;
  public Token: Token;

  constructor(http: HttpClient) {
    this._http = http;
  }


  Login(userName: string, password: string): Observable<Token> {
    const headers =  new HttpHeaders({
      'Content-Type':   'application/json'});


    return this._http.post<Token>(this._loginEndpoint, {'Email': userName, 'Password': password}, {headers: headers});
  }
}

interface Token {
  token: string;
  refreshToken: string;
}
