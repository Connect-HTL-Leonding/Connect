import { Component, OnInit } from '@angular/core';
import {ContactlistService} from '../api/contactlist.service'
import { User } from '../model/user'
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
    this.contactService.getChats();
  }

  async presentModal(user:User) {
    this.contactService.selectedUser = user;
    const modal = await this.modalController.create({
      component: ChatPage
    });
    return await modal.present();
  }

}
