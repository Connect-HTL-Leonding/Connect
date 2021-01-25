import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../model/message';
import { api } from '../app.component';
import {ContactlistService} from './contactlist.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  http: HttpClient;
  public messages: Array<Message>
  contactlist;

  constructor(http: HttpClient, cs: ContactlistService) {
    this.http = http;
    this.messages = [];
    this.contactlist = cs;
  }

  getData() {
    return this.http.get<Message[]>(api.url +'/messages' + this.contactlist.selectedRoom.id).subscribe(data => {
      this.messages = data;
      console.log(this.messages);
    })
  }
}
