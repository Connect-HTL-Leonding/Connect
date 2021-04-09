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
import { CustomUser, User } from '../model/user';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  http: HttpClient;

 
  public friendships: Array<Friendship>;
  userService: ProfileService;
  public user : User;


  //Konstruktor
  constructor(http: HttpClient, us: ProfileService, private keyCloakService: KeycloakService) {
    this.http = http;
    this.userService = us;
  
  }

  //getAll
  getFriendships() {
    return this.http.get<Friendship[]>(api.url + 'friendship/findAll')
  }

  getBefriendedUsers(u: User){
    return this.http.get<Friendship[]>(api.url + 'friendship/findFriendshipsOfUser/' + u.id)
  }

  createFriendship(f:Friendship) {
    return this.http.post(api.url + 'friendship/create/', f);
  }

  connect(mySkins : Array<MySkin>) {
    return this.http.post<CustomUser>(api.url + 'friendship/findRandom', mySkins);
  }

  //update
  updateFriendship(f: Friendship) {
    return this.http.put(api.url + 'friendship/update', f);

  }

}
