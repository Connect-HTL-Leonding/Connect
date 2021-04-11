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
  constructor(http: HttpClient, private oauthService: OAuthService) {
    this.http = http
  }

  getUser() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    
    return this.http.get<Object>('http://localhost:8010/auth/admin/realms/connect/users/' + this.oauthService.getIdentityClaims()["sub"], {headers: reqHeader})
  }
  updateUser(u: User) {
      let body = JSON.stringify(u);
      console.log(body);
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
      });
      return this.http.put(api.short + 'user/update', body, {headers: reqHeader});

  }
}
