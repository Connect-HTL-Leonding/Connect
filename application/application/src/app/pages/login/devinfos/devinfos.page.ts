import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/api/auth/auth.service';
@Component({
  selector: 'app-devinfos',
  templateUrl: './devinfos.page.html',
  styleUrls: ['./devinfos.page.scss'],
})
export class DevinfosPage {

  http: HttpClient;


  isAuthenticated: Observable<boolean>;
  isDoneLoading: Observable<boolean>;
  canActivateProtectedRoutes: Observable<boolean>;

  constructor(http: HttpClient, private authService: AuthService, public modalController: ModalController) {
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

  dismissModal(newSkin) {
    this.modalController.dismiss(newSkin);
  }

  get hasValidToken() { return this.authService.hasValidToken(); }
  get accessToken() { return this.authService.accessToken; }
  get refreshToken() { return this.authService.refreshToken; }
  get identityClaims() { return this.authService.identityClaims; }
  get idToken() { return this.authService.idToken; }

}
