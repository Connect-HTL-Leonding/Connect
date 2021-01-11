import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../model/message';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  http: HttpClient;
  public messages: Array<Message>
  api = "http://localhost:3000";

  constructor(http: HttpClient) {
    this.http = http;
    this.messages = [];
  }

  getData() {
    return this.http.get<Message[]>(this.api +'/messages').subscribe(data => {
      this.messages = data;
      console.log(this.messages);
    })
  }
}
