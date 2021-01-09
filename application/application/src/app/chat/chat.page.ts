import { Component, OnInit } from '@angular/core';
import {ContactlistService} from '../api/contactlist.service'
import { MenuController, ModalController } from '@ionic/angular';
import { User } from '../model/user';
import { ChatService } from '../api/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public username;
  public profilePicture;
  contactlist;

  constructor(public modalController:ModalController, cl:ContactlistService) {
    this.contactlist = cl;
  }

  ngOnInit() {
    this.username = this.contactlist.selectedUser.username;
    this.profilePicture = this.contactlist.selectedUser.profilePicture;
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
