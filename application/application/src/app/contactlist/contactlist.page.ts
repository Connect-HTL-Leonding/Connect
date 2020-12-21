import { Component, OnInit } from '@angular/core';
import {ContactlistService} from '../api/contactlist.service'
import { User } from '../model/user'

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.page.html',
  styleUrls: ['./contactlist.page.scss'],
})
export class ContactlistPage implements OnInit {

  contactService
  
  constructor(cs : ContactlistService) { 
    this.contactService = cs;
  }

  ngOnInit() {
  }

  selectChat(u:User) {
    console.log(u);
  }

}
