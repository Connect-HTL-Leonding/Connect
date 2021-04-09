import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { DevinfosPage } from './devinfos/devinfos.page';

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

  constructor(http: HttpClient, public keyCloakService: KeycloakService, public modalController: ModalController) {
    this.http = http;
  }

  login() { this.keyCloakService.login(); }
  logout() { this.keyCloakService.logout(); }
  refresh() { this.keyCloakService.updateToken(); }
  reload() { window.location.reload(); }
  clearStorage() { localStorage.clear(); }

  logoutExternally() {
    //window.open(this.keyCloakService.getKeycloakInstance());
  }

  get accessToken() { return this.keyCloakService.getToken(); }
  //get idToken() { return this.keyCloakService.getKeycloakInstance().idToken; }




  //info modal
  //Modal öffnen
  async presentModal() {
    console.log("Modal openeing")
    const modal = await this.modalController.create({
      component: DevinfosPage,
    });
    return await modal.present();
  }


}