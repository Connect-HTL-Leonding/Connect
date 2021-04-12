import { Component, OnInit } from '@angular/core';
import {ContactlistService} from '../../api/contactlist.service'
import { Room } from '../../model/room'
import { MenuController, ModalController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';
import {ChatService} from '../../api/chat.service'
import { Message } from 'src/app/model/message';
import {DetailContactlistComponent} from '../contactlist/detail-contactlist/detail-contactlist.component';
import { ProfileService } from 'src/app/api/profile.service';
import { KeycloakService } from 'keycloak-angular';
import { api } from 'src/app/app.component';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.page.html',
  styleUrls: ['./contactlist.page.scss'],
})
export class ContactlistPage implements OnInit {

  contactService
  chatService;
  latestMessage : Message;
  modal;
  wsUri;
  websocket;

  constructor(cs : ContactlistService, public modalController: ModalController, chatService : ChatService, 
    public profileservice: ProfileService, public keyCloakService : KeycloakService) { 
    this.contactService = cs;
    this.chatService = chatService;
<<<<<<< HEAD
    console.log(this.contactService.activeUser);
    this.wsUri = api.ws + '/contactListSocket/' + keyCloakService.getKeycloakInstance().subject;
=======
    this.wsUri = 'ws://localhost:8080/contactListSocket/' + keyCloakService.getKeycloakInstance().subject;
>>>>>>> ce92c4673249ff3be98f919d92549af9becae2ec
  }

  reloadRooms() {
    this.contactService.getChats().subscribe(
      data => {
        this.contactService.rooms = data;
        console.log(this.contactService.rooms);
      }
    )
  }

  ngOnInit() {
    this.doConnect();
    this.profileservice.getUser();
    this.contactService.activeUser = this.profileservice.user;
    this.reloadRooms();
  }

  async presentModal(room:Room) {
    this.contactService.selectedRoom = room;
    this.modal = await this.modalController.create({
      component: ChatPage,
      componentProps: {
        'contacListWebsocket': this.contactService.websocket
      }
    });
    this.modal.onDidDismiss().then((data => {
     this.reloadRooms();
    }))
    return await this.modal.present();
  }

  doConnect(){
    console.log(this.wsUri)
    this.contactService.websocket = new WebSocket(this.wsUri);
    this.contactService.websocket.onerror = (evt) => {
      console.log(evt.error);
    }
    this.contactService.websocket.onmessage = (evt) => {
     this.reloadRooms();
    } 

  }
}
