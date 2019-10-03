import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { Token } from "../model/Token";
import { catchError, map, switchMap, filter, take, tap } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  _authService: AuthService;
  _isRefreshing: boolean;
  _refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(authService: AuthService) {
    this._authService = authService;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this._authService.getJWTToken();
    // add token to request
    if (jwtToken) {
      req = this.addTokenToRequest(req, jwtToken);
    }

    return next.handle(req)
      .pipe(catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Status(req, next);
        } else {
          console.log('Server side error', err.message);
          return throwError('There was a problem with the server. Please try again later');
        }

      }));
  }

  addTokenToRequest(req: HttpRequest<any>, jwtToken: Token): HttpRequest<any> {
    const header = req.headers.set('Authorization', 'Bearer ' + jwtToken.token);
    return req.clone({ headers: header });
  }

  handle401Status(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject.next(null);

      return this._authService.Refresh()
        .pipe(
          filter(jwtToken => jwtToken != null)
          , tap(jwtToken => {
            this._authService.setJWTToken(jwtToken);
          })
          , switchMap(jwtToken => {
            this._isRefreshing = false;
            this._refreshTokenSubject.next(jwtToken.token);
            return next.handle(this.addTokenToRequest(req, jwtToken));
          })
        );
    } else {
      return this._refreshTokenSubject.
        pipe(filter(jwtToken => jwtToken != null)
          , take(1)
          , switchMap(jwtToken => {
            return next.handle(this.addTokenToRequest(req, jwtToken));
          })
        );

    }
  }



