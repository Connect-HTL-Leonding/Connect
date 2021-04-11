import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from 'keycloak-angular';
import { api } from '../app.component';
import { CustomUser, User } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient
  //aktueller User
  user: User = new User();
  friendUser: boolean = false

  //Konstruktor
  constructor(http: HttpClient, private keyCloakService: KeycloakService) {
    this.http = http
  }

  //get aktuellen User
  getUser() {
    //Get Userinfo über aktuellen Nutzer (live)
    this.http.get<Object>('http://localhost:8010/auth/admin/realms/connect/users/' + this.keyCloakService.getKeycloakInstance().subject).subscribe(data => {
      console.log(data);
      this.user.id = data["id"];
      this.user.userName = data["username"];
      this.user.firstname = data["firstName"];
      this.user.lastname = data["lastName"];
      this.user.email = data["email"];
      console.log(data)
    });
    return this.http.get<CustomUser>(api.short + 'user/customData');

  }

  findFriendUser(id) {
    return this.http.get<User>('http://localhost:8010/auth/admin/realms/connect/users/' + id);
  }

  friendCustomData(id) {
    return this.http.get<CustomUser>(api.short + 'user/customData/' + id);

  }

  //update aktuellen User
  updateUser(u: CustomUser) {
    console.log(u);
    return this.http.put(api.short + 'user/update', u);
  }

  //update aktuellen User (Keycloak Nutzerdaten)
  updateKeycloakUser(u) {
    let body = JSON.stringify(u);
    console.log(body);

    return this.http.post(api.ip + ':8010/auth/realms/connect/account/', body);
  }

  updatePassword(password) {
    let body = JSON.stringify(password);
    console.log(body);

    return this.http.post(api.ip + ':8010/auth/realms/connect/account/credentials/password/', body);
  }
}
