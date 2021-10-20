import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { api } from '../app.component';
import { CustomUser, User } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  http: HttpClient
  //aktueller User
  user : User = new User();

  //Konstruktor
  constructor(http: HttpClient) {
    this.http = http
  }
  updateUserTutorial(u: User) {
      let body = JSON.stringify(u);
      console.log(body);
      return this.http.put(api.url + 'user/updateTutorial', u);
  }
}
