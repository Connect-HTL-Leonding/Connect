import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../model/message';
import { Room } from '../model/room';
import { api } from '../app.component';
import {ContactlistService} from './contactlist.service';
import { OAuthService } from 'angular-oauth2-oidc';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public http: HttpClient;
  public messages: Array<Message>
  public contactlist;
  public selectedRoom: Room;
  

  constructor(http: HttpClient, cs: ContactlistService, private oauthService : OAuthService) {
    this.http = http;
    this.messages = [];
    this.contactlist = cs;
  }

  getData() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<Message[]>(api.url +'message/findAll/' + this.selectedRoom.id, {headers: reqHeader});
  }

  createMessage(m:Message) {
    let body = JSON.stringify(m);
    console.log(body);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post(api.url + 'message/create/' + this.selectedRoom.id, body, {headers: reqHeader});
  }
}
