import { Component, Input, OnInit } from '@angular/core';
import {ContactlistService} from '../../api/contactlist.service'
import { MenuController, ModalController } from '@ionic/angular';
import { User } from '../../model/user';
import { ChatService } from '../../api/chat.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../../model/room';
import { Message } from '../../model/message';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from 'keycloak-angular';
import { api } from 'src/app/app.component';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
 
  
})
export class ChatPage implements OnInit {

  @Input() contacListWebsocket : any;

  sendText = '';
  receiveText = '';
  websocket : WebSocket;
  receiveMessage: Message = new Message();
  i = 0;

  public username;
  public profilePicture;
  public m = new Message();
  public otherUser : User = new User();
  contactlist;
  chatservice;
  wsUri;
  oauthService;
  public allMessages;
  public seenMessages;
  public unseenMessages;
  //position of new Message Line
  public pos = 0;
  public showNewMsgLine : boolean;
  public pfp;

  

  constructor(public modalController:ModalController, cl:ContactlistService, cs:ChatService, os: OAuthService, public keycloakService : KeycloakService) {
    this.contactlist = cl;
    this.chatservice = cs;
    this.chatservice.selectedRoom = this.contactlist.selectedRoom;
    this.oauthService = os;
  }
  

  ngOnInit() {
    console.log(this.keycloakService.getUsername());
    this.wsUri = api.ws + '/chat/' + this.chatservice.selectedRoom.id + '/' + this.keycloakService.getKeycloakInstance().subject;
    this.init(this.contactlist.selectedRoom);
   
    this.getRoomName();
    this.doConnect();    
  
  }

  yousent(message:Message) : boolean {
    return message.user.id == this.keycloakService.getKeycloakInstance().subject;
  }

  imageIsNotNull(message:Message) : boolean {
    if(message.image != null && message.image != "" ){
      return true;
    }
    else {
      return false;
    }
  }

  messageIsNotNull(message:Message) :boolean {
    if(message.message != null && message.message != "") {
      return true;
    } 
    else {
      return false;
    }
  }
  

  getRoomName() {
    this.contactlist.getOtherUser(this.contactlist.selectedRoom.id).subscribe(data => {
      this.otherUser.custom = data;
      this.pfp = "data:image/png;base64,"+atob(this.otherUser.custom.profilePicture);
      this.contactlist.getKeyUser(this.otherUser.custom).subscribe(data => {
        this.otherUser.id = data["id"];
        this.otherUser.userName = data["username"];
        this.otherUser.firstname = data["firstName"];
        this.otherUser.lastname = data["lastName"];
        this.otherUser.email = data["email"];
        console.log(data)
      })
      /*
      this.contactlist.getOtherPfp(this.contactlist.selectedRoom.id).subscribe(data => {
        this.otherUser.custom.profilePicture = "data:image/png;base64," + data;
      });
      */
    })
  }

  dismissModal() {
    this.websocket.close();
    this.modalController.dismiss();
  }

  
  doSendImage() {
      this.m.message = this.sendText;
      this.m.created = new Date();
      this.m.updated = new Date();
      this.m.image = "";
      this.chatservice.addImage(this.m).then(data => {
        console.log(data);
        this.chatservice.createMessage(data).subscribe(data => {
          this.websocket.send(this.sendText);
          this.sendText = "";
        })
      });
  }
  

  doSend(){
    if(this.sendText.trim().length > 0) {
      this.m.message = this.sendText;
      this.m.created = new Date();
      this.m.updated = new Date();
      this.m.image = "";
      this.showNewMsgLine = false;
      this.contacListWebsocket.send(this.sendText);
      this.chatservice.createMessage(this.m).subscribe(data => {
        this.websocket.send(this.sendText); 
        this.sendText = "";
      });
    }
  }

  doConnect(){
    this.websocket = new WebSocket(this.wsUri);
    console.log(this.websocket);
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

  convert(date: number[]): string {
    let hours = "";
    let minutes = "";
    if(date[3]<=9) {
      hours = "0"
    }
    if(date[4]<=9) {
      minutes = "0";
    }
    return `${hours}${date[3]}:${minutes}${date[4]}`;
  }

  init(room: Room) {
    this.showNewMsgLine = true;
    this.chatservice.getAllMessages(room).subscribe(data=> {
      this.allMessages = data;
      this.chatservice.getSeenMessages(room).subscribe(data=> {
        this.seenMessages = data;
        this.unseenMessages = this.allMessages - this.seenMessages;
        console.log(this.seenMessages + " seen");
        console.log(this.allMessages + " all");
        console.log(this.unseenMessages + " unseen")
        this.chatservice.getData().subscribe(data => {
          this.chatservice.messages = data;
          console.log(this.convert(this.chatservice.messages[0].created));
          console.log(this.chatservice.messages.length);
          this.pos = this.chatservice.messages.length - this.unseenMessages;
          
        })
      })
    })
   }

 
 
}
