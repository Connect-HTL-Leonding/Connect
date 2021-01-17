import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { api } from '../app.component';
import { MySkin } from '../model/myskin';

@Injectable({
  providedIn: 'root'
})
export class MyskinsService {

  http: HttpClient;

  //Array an Terminen
  public myskins: Array<MySkin>;
  message;


  //Konstruktor
  constructor(http: HttpClient, private oauthService : OAuthService){
    this.http = http;
    this.myskins = [];
  }

  //getAll
  getMySkins(){

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<MySkin[]>(api.url +'myskin/findAll', {headers: reqHeader})
  }

  //update
  updateSkin(s:MySkin){
    let body = JSON.stringify(s);
    console.log(body);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.put( api.url+ 'myskin/update', body, {headers: reqHeader});

  }

  addToMySkins(skin){
    var ms : MySkin = new MySkin();
    ms.skin = skin;
    console.log(ms);
    let body = JSON.stringify(ms);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post( api.url + 'myskin/create', body, {headers: reqHeader});

  }

  //delete
  deleteSkin(index: number) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.delete(api.url + 'myskin/delete/' + index, {headers: reqHeader});
  }
}
