import { Component, OnInit } from '@angular/core';
import {ContactlistService} from '../../api/contactlist.service'
import { MenuController, ModalController } from '@ionic/angular';
import { User } from '../../model/user';
import { ChatService } from '../../api/chat.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../../model/room';
import { Message } from '../../model/message';
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
  receiveMessage: Message = new Message();
  i = 0;

  public username;
  public profilePicture;
  public m = new Message();
  public otherUser;
  contactlist;
  chatservice;
  wsUri;
  oauthService;
  activeUser;
  

  constructor(public modalController:ModalController, cl:ContactlistService, cs:ChatService, os: OAuthService) {
    this.contactlist = cl;
    this.chatservice = cs;
    this.chatservice.selectedRoom = this.contactlist.selectedRoom;
    this.chatservice.activeUser = this.contactlist.activeUser;
    this.oauthService = os;
  }
  

  ngOnInit() {
    this.wsUri = 'ws://localhost:8080/chat/' + this.chatservice.selectedRoom.id + '/' + this.chatservice.activeUser.userName;
    this.chatservice.getData().subscribe(data => {
      this.chatservice.messages = data;
    });
    this.otherUser = this.getRoomName();
    this.doConnect();
  }

  yousent(message:Message) : boolean {
    return message.user.userName == this.chatservice.activeUser.userName;
  }
  

  getRoomName() {
    this.contactlist.getOtherUser(this.contactlist.selectedRoom.id).subscribe(data => {
      this.otherUser = data;
      return this.otherUser;
    })
  }

  dismissModal() {
    this.websocket.close();
    this.modalController.dismiss();
  }

  doSend(){
    if(this.sendText.trim().length > 0) {
      this.m.message = this.sendText;
      this.m.created = new Date();
      this.m.updated = new Date();
      this.chatservice.createMessage(this.m).subscribe(data => {
        this.websocket.send(this.sendText); 
        this.sendText = "";
      });
    }
  }

  doConnect(){
    this.websocket = new WebSocket(this.wsUri);
    this.websocket.onmessage = (evt) => {
      this.receiveText = evt.data +'\n';
      this.chatservice.getData().subscribe(data => {
        this.chatservice.messages = data;
      });
    } 

    
    /*
    this.websocket.onopen = (evt) => this.receiveText += 'Websocket connected\n';
    
    this.websocket.onerror = (evt) => this.receiveText += 'Error\n';
    this.websocket.onclose = (evt) => this.receiveText += 'Websocket closed\n';
    */
  }
}