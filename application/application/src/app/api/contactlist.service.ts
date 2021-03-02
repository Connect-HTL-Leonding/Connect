import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../model/room';
import { OAuthService } from 'angular-oauth2-oidc';
import { CustomUser, User } from '../model/user';
import { api } from '../app.component';
import { ProfileService } from './profile.service';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ContactlistService {

  http: HttpClient;
  public rooms: Array<Room>
  public selectedRoom:Room;
  public activeUser:User = new User();

  constructor(http: HttpClient, private oauthService : OAuthService, public ps : ProfileService) {
    this.http = http;
    this.rooms = [];
  }
  
  getUser() {
    //link zu aktuellem Nutzer
    return this.ps.getUser();
  }

  getOtherUser(roomid) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<CustomUser>(api.short + 'user/findOtherUser/' + roomid, {headers: reqHeader});
  }

  getKeyUser(u : CustomUser){
    console.log(u)
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<Object>('http://localhost:8010/auth/admin/realms/connect/users/' + u.id, {headers: reqHeader});
  }

  getOtherPfp(roomid) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.oauthService.getAccessToken(),
      }),
      responseType: 'text' as const
    };
    return this.http.get(api.short + 'user/getOtherPfp/' + roomid, httpOptions)
  }

  getChats() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<Room[]>(api.url +'chat/findAll', {headers: reqHeader})
  }
}
