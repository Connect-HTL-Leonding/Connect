import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { AuthService } from '../api/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  http: HttpClient;

  isAuthenticated: Observable<boolean>;
  isDoneLoading: Observable<boolean>;
  canActivateProtectedRoutes: Observable<boolean>;

  constructor(http: HttpClient, private authService: AuthService) {
    this.http = http;
    this.isAuthenticated = this.authService.isAuthenticated$;
    this.isDoneLoading = this.authService.isDoneLoading$;
    this.canActivateProtectedRoutes = this.authService.canActivateProtectedRoutes$;
    console.log("login page")
    this.authService.runInitialLoginSequence();
  }

  login() { this.authService.login(); }
  logout() { this.authService.logout(); }
  refresh() { this.authService.refresh(); }
  reload() { window.location.reload(); }
  clearStorage() { localStorage.clear(); }

  logoutExternally() {
    window.open(this.authService.logoutUrl);
  }

  get hasValidToken() { return this.authService.hasValidToken(); }
  get accessToken() { return this.authService.accessToken; }
  get refreshToken() { return this.authService.refreshToken; }
  get identityClaims() { return this.authService.identityClaims; }
  get idToken() { return this.authService.idToken; }


}