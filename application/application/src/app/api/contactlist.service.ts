import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../model/room';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '../model/user';
import { api } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class ContactlistService {

  http: HttpClient;
  public rooms: Array<Room>
  public selectedRoom:Room;

  constructor(http: HttpClient, private oauthService : OAuthService) {
    this.http = http;
    this.rooms = [];
  }

  getChats() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<Room[]>(api.url +'chat/findAll', {headers: reqHeader})
  }
}
