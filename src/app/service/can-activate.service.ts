import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class CanActivateGuard implements CanActivate {
  private _authService: AuthService;
  private _router: Router;

  constructor(authService: AuthService, router: Router) {
    this._authService = authService;
    this._router = router;
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (this._authService.getJWTToken() === null) {
    //const token = localStorage.getItem('token');
    //const refreshToken = localStorage.getItem('refreshToken');
    //if (!token || !refreshToken) {
      this._router.navigate(['/login']);
      return of(false);
    } else {
      return of(true);
    }
  }

}
