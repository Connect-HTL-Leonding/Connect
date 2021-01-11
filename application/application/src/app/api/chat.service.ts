import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../model/chat';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  http: HttpClient;
  public chats: Array<Chat>
  api = "http://localhost:3000";

  constructor(http: HttpClient) {
    this.http = http;
    this.chats = [];
  }
}
