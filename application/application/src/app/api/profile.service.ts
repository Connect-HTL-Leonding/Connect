import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { api } from '../app.component';
import { CustomUser, User } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient
  //aktueller User
  user : User = new User();

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

    //Get Userinfo über aktuellen Nutzer (live)
    this.http.get<Object>('http://localhost:8010/auth/admin/realms/connect/users/' + this.oauthService.getIdentityClaims()["sub"], {headers: reqHeader}).subscribe(data => {
      this.user.id = data["id"];
      this.user.userName = data["username"];
      this.user.firstname = data["firstName"];
      this.user.lastname = data["lastName"];
      this.user.email = data["email"];
      console.log(data)
    });


    return this.http.get<CustomUser>(api.short + 'user/customData', {headers: reqHeader});

  }

  //update aktuellen User
  updateUser(u: CustomUser) {
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
