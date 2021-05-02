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
    this.http.get<Object>(api.ip + ':8010/auth/admin/realms/connect/users/' + this.keyCloakService.getKeycloakInstance().subject).subscribe(data => {
      this.user.id = data["id"];
      this.user.userName = data["username"];
      this.user.firstname = data["firstName"];
      this.user.lastname = data["lastName"];
      this.user.email = data["email"];
      this.user.custom.tutorialStage = data["tutorialStage"];
      console.log(data)
    });
    return this.http.get<CustomUser>(api.short + 'user/customData');

  }

  findFriendUser(id) {
    return this.http.get<User>(api.ip + ':8010/auth/admin/realms/connect/users/' + id);
  }

  friendCustomData(id) {
    return this.http.get<CustomUser>(api.short + 'user/customData/' + id);

  }

  //update aktuellen User
  updateUser(u: CustomUser) {
    console.log(u);
    return this.http.put<CustomUser>(api.short + 'user/update', u);
  }

  //update aktuellen User (Keycloak Nutzerdaten)
  updateKeycloakUser(u) {
    return this.http.post(api.ip + ':8010/auth/realms/connect/account/', u);
  }

  //nicht mehr funktionsfähig ):
  updatePassword(password) {
    var body = JSON.stringify(password)
    
    return this.http.put(api.ip + ':8010/auth/admin/realms/connect/users/' + this.keyCloakService.getKeycloakInstance().subject + '/reset-password', password);
  }
  updateUserTutorial(u: CustomUser) {
    return this.http.put(api.short + 'user/updateTutorial', u);
  }
  skipTutorial(u: CustomUser){
    return this.http.put(api.short + 'user/skipTutorial', u);
  }
}
