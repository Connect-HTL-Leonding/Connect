import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { api } from '../app.component';
import { CustomUser, User } from "../model/user";
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  http: HttpClient
  //aktueller User
  user : User = new User();

  //Konstruktor
  constructor(http: HttpClient, public keycloakService: KeycloakService) {
    this.http = http
  }

  getUser() {    
    return this.http.get<Object>('http://localhost:8010/auth/admin/realms/connect/users/' + this.keycloakService.getKeycloakInstance().subject)
  }
  updateUserTutorial(u: User) {
      let body = JSON.stringify(u);
      console.log(body);
      return this.http.put(api.short + 'user/updateTutorial', u);
  }
}
