import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../model/room';
import { OAuthService } from 'angular-oauth2-oidc';
import { CustomUser, User } from '../model/user';
import { api } from '../app.component';
import { Message } from '../model/message';
import { ProfileService } from './profile.service';
import { ThrowStmt } from '@angular/compiler';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class ContactlistService {

  http: HttpClient;
  public rooms: Array<Room>
  public selectedRoom: Room;
  public unseenMessages = 0;
  public seenMessages = 0;
  public allMessages = 0;
  public counter = 0;
  public activeUser;
  websocket;

  constructor(http: HttpClient, public ps: ProfileService, public keyCloakService : KeycloakService) {
    this.http = http;
    this.rooms = [];
  }

  getUser() {
    //link zu aktuellem Nutzer
    return this.ps.getUser();
  }

  getOtherUser(roomid) {
    return this.http.get<CustomUser>(api.short + 'user/findOtherUser/' + roomid);
  }

  getKeyUser(u: CustomUser) {
    console.log(u)
    return this.http.get<Object>(api.ip + ':8010/auth/admin/realms/connect/users/' + u.id);
  }

  getOtherPfp(roomid) {
    return this.http.get(api.short + 'user/getOtherPfp/' + roomid)
  }

  getChats() {
    return this.http.get<Room[]>(api.url + 'chat/findAll')
  }

  getLatestMessage(room: Room) {
    return this.http.get<Message>(api.url + 'message/findLatestMessage/' + room.id);
  }

  getSeenMessages(room: Room) {
    return this.http.get(api.url + 'message/getSeenMessages/' + room.id);
  }

  getAllMessages(room: Room) {
    return this.http.get(api.url + 'message/getAllMessages/' + room.id);
  }
}
