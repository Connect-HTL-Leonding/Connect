import { Component, OnInit } from '@angular/core';
import { ContactlistService } from '../../api/contactlist.service'
import { Room } from '../../model/room'
import { MenuController, ModalController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';
import { ChatService } from '../../api/chat.service'
import { Message } from 'src/app/model/message';
import { DetailContactlistComponent } from '../contactlist/detail-contactlist/detail-contactlist.component';
import { ProfileService } from 'src/app/api/profile.service';
import { api } from 'src/app/app.component';
import { MeetupService } from 'src/app/api/meetup.service';
import {MeetUpManagerPage} from '../meet-up-manager/meet-up-manager.page';
import { KeycloakService } from 'src/app/api/auth/keycloak.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.page.html',
  styleUrls: ['./contactlist.page.scss'],
})
export class ContactlistPage implements OnInit {

  contactService
  chatService;
  latestMessage: Message;
  modal;
  meetupPreviewBack;
  contactlistUpdate;



  constructor(cs: ContactlistService, public modalController: ModalController, chatService: ChatService,
    public profileservice: ProfileService, public meetupService: MeetupService) {
    this.contactService = cs;
    this.chatService = chatService;

    this.meetupPreviewBack = this.meetupService.meetupPreviewBackNotify.subscribe(value => {
      let r: Room = value;

      this.presentModal(r);

    });

    this.contactlistUpdate = this.contactService.contactlistUpdateNotify.subscribe(value => {
      this.reloadRooms();
    });
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
    this.profileservice.getUser().add(() => {
      this.contactService.activeUser = this.profileservice.user;
    });

    this.reloadRooms();
  }

  async presentModal(room: Room) {
    this.contactService.selectedRoom = room;
    this.chatService.inRoom = true;
    this.chatService.currentRoom = this.contactService.selectedRoom.id;
    this.modal = await this.modalController.create({
      component: ChatPage,
      id: "chatPage"
    });
    this.modal.onDidDismiss().then((data => {
      this.reloadRooms();
      this.chatService.inRoom = false;
    }))
    return await this.modal.present();
  }

  async presentMeetupModal() {
    const modal = await this.modalController.create({
      component: MeetUpManagerPage,
    });
    return await modal.present();
  }

  segmentChanged(ev: any) {
    this.contactService.type = ev.detail.value;
    this.reloadRooms();
  }

}
