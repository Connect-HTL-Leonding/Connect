import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../model/chat';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class ContactlistService {

  http: HttpClient;
  public chats: Array<Chat>
  api = "http://localhost:3000";
  public selectedUser:User;

  constructor(http: HttpClient) {
    this.http = http;
    this.chats = [];
  }

  getChats() {
    return this.http.get<Chat[]>(this.api +'/chats').subscribe(data => {
      this.chats = data;
    })
  }
}
