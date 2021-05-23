import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../model/message';
import { Room } from '../model/room';
import { User } from '../model/user';
import { api } from '../app.component';
import {ContactlistService} from './contactlist.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Camera, CameraResultType } from '@capacitor/core';
import { Subject } from 'rxjs';
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
  public inRoom: boolean = false;
  public currentRoom;

  public chatSendObservable = new Subject<any>();
  chatSendUpdateNotify = this.chatSendObservable.asObservable();

  public updateChatObservable = new Subject<any>();
  updatechatNotify = this.updateChatObservable.asObservable();
  

  constructor(http: HttpClient, cs: ContactlistService, private oauthService : OAuthService) {
    this.http = http;
    this.messages = [];
    this.contactlist = cs;
  }

  getData() {
    return this.http.get<Message[]>(api.url +'message/findAll/' + this.selectedRoom.id);
  }

  createMessage(m:Message) {
    return this.http.post(api.url + 'message/create/' + this.selectedRoom.id, m);
  }

  public async addImage(m:Message) {
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
  

  getSeenMessages(room: Room) {
    return this.http.get(api.url + 'message/getSeenMessages/' + room.id);
  }

  getAllMessages(room: Room) {
    return this.http.get(api.url + 'message/getAllMessages/' + room.id);
  }
}
