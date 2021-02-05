import { Component, OnInit } from '@angular/core';
import {ContactlistService} from '../api/contactlist.service'
import { MenuController, ModalController } from '@ionic/angular';
import { User } from '../model/user';
import { ChatService } from '../api/chat.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../model/room';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  sendText = '';
  receiveText = '';
  websocket : WebSocket;

  public username;
  public profilePicture;
  contactlist;
  chatservice;
  wsUri;
  oauthService;

  constructor(public modalController:ModalController, cl:ContactlistService, cs:ChatService, os: OAuthService) {
    this.contactlist = cl;
    this.chatservice = cs;
    this.oauthService = os;
  }
  

  ngOnInit() {
    this.wsUri = 'ws://localhost:8080/chat/' + this.contactlist.selectedRoom.id;
    //this.chatservice.getData();
    this.doConnect();
  }

  dismissModal() {
    this.websocket.close();
    this.modalController.dismiss();
  }

  doSend(){
    this.websocket.send(this.sendText);
  }

  doConnect(){
    this.websocket = new WebSocket(this.wsUri);

    this.websocket.onopen = (evt) => this.receiveText += 'Websocket connected\n';
    this.websocket.onmessage = (evt) => this.receiveText += evt.data+'\n';
    this.websocket.onerror = (evt) => this.receiveText += 'Error\n';
    this.websocket.onclose = (evt) => this.receiveText += 'Websocket closed\n';

  }
}
