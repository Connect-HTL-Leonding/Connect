import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient
  user : User[]

  api = "http://localhost:3000"

  constructor(http: HttpClient) {
    this.http = http
   }

   getUser(){
    return this.http.get<User[]>(this.api +'/profile')
  }

  generateUser() : void {
    var u = new User()

    u.id = 2
    u.username = "Jens"
    u.desc = "Hallo! Mein Name ist Jens Jensenbauer ich bin 23 Jahre alt. Zu meinen Stärken zählt meine Teamfähigkeit."
    u.latestMessage = "Hey Bro"
    u.instagram = "DerJens"
    u.facebook = "Jensinger"
    u.twitter = "JensAmTweeten"
    u.linkedIn = "Jenus"
    u.gender = "M"
    u.questions = {
      q1: "Ich bin sehr intelligent.",
      q2: "Ich liebe Hunde",
      q3: "Tanzen, singen"
    }
    u.password = "jensPass1234"
    u.email = "jens@gmail.com"
  }


 
}
