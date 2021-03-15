import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../model/message';
import { Room } from '../model/room';
import { User } from '../model/user';
import { api } from '../app.component';
import {ContactlistService} from './contactlist.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Camera, CameraResultType } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public http: HttpClient;
  public messages: Array<Message>
  public contactlist;
  public selectedRoom: Room;
  public activeUser: User;
  public m: Message;
  

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
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post(api.url + 'message/create/' + this.selectedRoom.id, body, {headers: reqHeader});
  }

  /*public async createImageMessage(m:Message) {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        quality: 100,
        allowEditing: true
      })
      this.m = m;
      this.m.image = capturedPhoto.base64String;
      return this.m
    } catch (e) {
      }
  }
  */

  getSeenMessages(room: Room) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get(api.url + 'message/getSeenMessages/' + room.id, { headers: reqHeader });
  }

  getAllMessages(room: Room) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get(api.url + 'message/getAllMessages/' + room.id, { headers: reqHeader });
  }
}
