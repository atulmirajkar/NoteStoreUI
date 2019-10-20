import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoggedIn: boolean;
  authService: AuthService;
  _router: Router;
  public isNavbarCollapsed: boolean;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this._router = router;
    this.isNavbarCollapsed = false;
  }

  logout() {
    this.authService.Logout()
      .subscribe(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        this.authService.isLoggedIn = false;

      });
    this._router.navigate(['login']);

  }

  toggleNavbarCollapse() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

}
