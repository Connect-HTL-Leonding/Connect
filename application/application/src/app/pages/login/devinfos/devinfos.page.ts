import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-devinfos',
  templateUrl: './devinfos.page.html',
  styleUrls: ['./devinfos.page.scss'],
})
export class DevinfosPage {

  http: HttpClient;

  constructor(http: HttpClient, public keyCloakService : KeycloakService, public modalController: ModalController) {
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

  get hasValidToken() { return this.keyCloakService.getToken() }
  get accessToken() { return this.keyCloakService.getToken() }
  get identityClaims() { return this.keyCloakService.loadUserProfile(); }
  //get idToken() { return this.keyCloakService.getKeycloakInstance().idToken; }

  dismissModal() {
    this.modalController.dismiss();
  }

}
