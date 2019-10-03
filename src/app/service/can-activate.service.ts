import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class CanActivateGuard implements CanActivate {
  private _authService: AuthService;
  constructor(authService: AuthService) {
    this._authService = authService;
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (!this._authService.isLoggedIn || this._authService.getJWTToken() === null) {
      return of(false);
    } else {
      return of(true);
    }
  }

}
