import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skin } from '../model/skin';
import { Category } from '../model/category';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { MySkin } from '../model/myskin';
import { OAuthService } from 'angular-oauth2-oidc';
import { api } from '../app.component';
import { ProfileService } from './profile.service';
import { Friendship } from '../model/friendship';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  http: HttpClient;

 
  public friendships: Array<Friendship>;
  userService: ProfileService;
  public user : User;


  //Konstruktor
  constructor(http: HttpClient, us: ProfileService, private oauthService: OAuthService) {
    this.http = http;
    this.userService = us;
  
  }

  //getAll
  getFriendships() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<Friendship[]>(api.url + 'friendship/findAll', {headers: reqHeader})
  }

  getBefriendedUsers(u: User){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<Friendship[]>(api.url + 'friendship/findFriendshipsOfUser/' + u.id, {headers: reqHeader})
  }

  createFriendship(f:Friendship) {
    let body = JSON.stringify(f);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post(api.url + 'friendship/create/', body, {headers: reqHeader});
  }

  connect(mySkins : Array<MySkin>) {
    let body = JSON.stringify(mySkins);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post(api.url + 'friendship/findRandom', body, {headers: reqHeader});
  }

  

  //update
  updateFriendship(f: Friendship) {
    let body = JSON.stringify(f);
    console.log(body);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.put(api.url + 'friendship/update', body, {headers: reqHeader});

  }

  //delete
  deleteSkin(index: number) {
  }

}
