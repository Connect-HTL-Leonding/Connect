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
  user;


  constructor(http: HttpClient, private oauthService: OAuthService) {
    this.http = http
  }

  getUser() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<User[]>(api.short + 'user/customData', {headers: reqHeader});
  }
/*
  generateUser(): void {
    var u = new User()

    u.id = 2
    u.username = "Jens"
    u.desc = "Hallo! Mein Name ist Jens Jensenbauer ich bin 23 Jahre alt. Zu meinen Stärken zählt meine Teamfähigkeit."
    u.latestMessage = "Hey Bro"
    u.instagram = "DerJens"
    u.facebook = "Jensinger"
    u.twitter = "JensAmTweeten"
    u.linkedIn = "Jenus"
    u.gender = "M"
    u.questions = {
      q1: "Ich bin sehr intelligent.",
      q2: "Ich liebe Hunde",
      q3: "Tanzen, singen"
    }
    u.password = "jensPass1234"
    u.email = "jens@gmail.com"
  }
  */

  //update
  updateUser(u: User) {
    let body = JSON.stringify(u);
    console.log(body);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.put(api.short + 'user/update' , body, {headers: reqHeader});

  }



}
