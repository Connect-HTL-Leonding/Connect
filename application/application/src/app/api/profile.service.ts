import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { api } from '../app.component';
import { User } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient
  //aktueller User
  user;

  //Konstruktor
  constructor(http: HttpClient, private oauthService: OAuthService) {
    this.http = http
  }

  //get aktuellen User
  getUser() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<User[]>(api.short + 'user/customData', {headers: reqHeader});
  }

  //update aktuellen User
  updateUser(u: User) {
    let body = JSON.stringify(u);
    console.log(body);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.put(api.short + 'user/update', body, {headers: reqHeader});

  }

  //update aktuellen User (Keycloak Nutzerdaten)
  updateKeycloakUser(u) {
    let body = JSON.stringify(u);
    console.log(body);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post(api.ip + ':8010/auth/realms/connect/account/', body, {headers: reqHeader});
  }

  updatePassword(password) {
    let body = JSON.stringify(password);
    console.log(body);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post(api.ip + ':8010/auth/realms/connect/account/credentials/password/', body, {headers: reqHeader});
  }



}
