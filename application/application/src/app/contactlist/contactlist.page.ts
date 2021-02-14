import { Component, OnInit } from '@angular/core';
import {ContactlistService} from '../api/contactlist.service'
import { Room } from '../model/room'
import { MenuController, ModalController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.page.html',
  styleUrls: ['./contactlist.page.scss'],
})
export class ContactlistPage implements OnInit {

  contactService
  
  constructor(cs : ContactlistService, public modalController: ModalController) { 
    this.contactService = cs;
  }

  ngOnInit() {
    this.contactService.getUser().subscribe(data => {
      this.contactService.activeUser = data;
    })
    this.contactService.getChats().subscribe(
      data => {
        this.contactService.rooms = data;
        console.log(this.contactService.rooms);
      }
    )
  }

  async presentModal(room:Room) {
    this.contactService.selectedRoom = room;
    const modal = await this.modalController.create({
      component: ChatPage
    });
    return await modal.present();
  }

}
