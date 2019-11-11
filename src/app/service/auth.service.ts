import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../model/Token';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private readonly _endPoint = environment.baseURL + 'api/v1/identity';
  private _http: HttpClient;
  public isLoggedIn: boolean;
  private _headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(http: HttpClient) {
    this._http = http;

    //check if tokens present
    if (this.getJWTToken() != null) {
      this.isLoggedIn = true;
    }
  }

  Logout() {
    this.isLoggedIn = false;
    const jwtToken = this.getJWTToken();

    if (jwtToken === null) {
      return;
    }

    return this._http.post<string>(this._endPoint + '/logout', { 'token': jwtToken.token }, { headers: this._headers });
  }

  Login(userName: string, password: string): Observable<Token> {

    const loginRequest: LoginRequest = {
      Email: userName,
      Password: password
    };


    return this._http.post<Token>(this._endPoint + '/login', loginRequest, { headers: this._headers });

  }

  Refresh(): Observable<Token> {
    const jwtToken = this.getJWTToken();
    return this._http.post<Token>(this._endPoint + '/refresh', jwtToken, { headers: this._headers });
  }


  Register(userName: string, password: string): Observable<Token> {
    const registerRequest: RegisterRequest = {
      Email: userName,
      Password: password
    };


    return this._http.post<Token>(this._endPoint + '/register', registerRequest, { headers: this._headers });

  }

  getJWTToken(): Token {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
      return null;
    }
    return {
      token: token,
      refreshToken: refreshToken
    };
  }

  setJWTToken(jwtToken: Token) {
    localStorage.removeItem('token');
    localStorage.setItem('token', jwtToken.token);

    localStorage.removeItem('refreshToken');
    localStorage.setItem('refreshToken', jwtToken.refreshToken);
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
