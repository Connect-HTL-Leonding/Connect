import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { EMPTY } from 'rxjs';
import { api } from '../app.component';
import { CustomUser, User } from "../model/user";
import { KeycloakService } from './auth/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient
  //aktueller User
  user: User = new User();
  friendUser: boolean = false



  //Konstruktor
  constructor(http: HttpClient, private keycloak: KeycloakService) {
    this.http = http
  }

  getUser() {
    //Get Userinfo über aktuellen Nutzer (live)
    if (this.keycloak.userid) {
      this.http.get<Object>(api.ip + '/auth/admin/realms/connect/users/' + this.keycloak.userid).subscribe(data => {
        this.user.id = data["id"];
        this.user.userName = data["username"];
        this.user.firstname = data["firstName"];
        this.user.lastname = data["lastName"];
        this.user.email = data["email"];
      });
      return this.http.get<CustomUser>(api.url + 'user/customData').subscribe(data => {
        this.user.custom = data;
      }, error => {
        //DEBUGconsole.log(error)
      });
    }
  }

  findFriendUser(id) {
    return this.http.get<User>(api.ip + '/auth/admin/realms/connect/users/' + id);
  }

  friendCustomData(id) {
    return this.http.get<CustomUser>(api.url + 'user/customData/' + id);

  }

  //update aktuellen User
  updateUser(u: CustomUser) {
    //DEBUGconsole.log("updating: ")
    //DEBUGconsole.log(u)
    return this.http.put<CustomUser>(api.url + 'user/update', u);
  }

  //update aktuellen User (Keycloak Nutzerdaten)
  updateKeycloakUser(u) {
    return this.http.post(api.ip + '/auth/realms/connect/account/', u);
  }

  //nicht mehr funktionsfähig ):
  updatePassword(password) {
    var body = JSON.stringify(password)

    return this.http.put(api.ip + '/auth/admin/realms/connect/users/' + this.keycloak.userid + '/reset-password', password);
  }
  updateUserTutorial(u: CustomUser) {
    return this.http.put(api.url + 'user/updateTutorial', u);
  }
  skipTutorial(u: CustomUser) {
    return this.http.put(api.url + 'user/skipTutorial', u);
  }
  startTutorial(u: CustomUser) {
    return this.http.put(api.url + 'user/startTutorial', u);
  }
}
