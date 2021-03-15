import { Component, OnInit } from '@angular/core';
import {ContactlistService} from '../../api/contactlist.service'
import { Room } from '../../model/room'
import { MenuController, ModalController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';
import {ChatService} from '../../api/chat.service'
import { Message } from 'src/app/model/message';
import {DetailContactlistComponent} from '../contactlist/detail-contactlist/detail-contactlist.component';
import { ProfileService } from 'src/app/api/profile.service';

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

  constructor(cs : ContactlistService, public modalController: ModalController, chatService : ChatService, public profileservice: ProfileService) { 
    this.contactService = cs;
    this.chatService = chatService;
  }

  ngOnInit() {
    this.contactService.getUser().subscribe(data => {
      console.log(data);
      this.contactService.activeUser.custom = data;
    });
    this.contactService.getChats().subscribe(
      data => {
        this.contactService.rooms = data;
        console.log(this.contactService.rooms);
      }
    )
  }

  async presentModal(room:Room) {
    this.contactService.selectedRoom = room;
    this.modal = await this.modalController.create({
      component: ChatPage
    });
    this.modal.onDidDismiss().then((data => {
     this.ngOnInit();
    }))
    return await this.modal.present();
  }
}
