import { Injectable } from '@angular/core';
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  user = 
  [
    new User(0, 'Jan','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png','f','Hallo mein Name ist Jan Donnerbauer und ich bin 17 Jahre alt. Zu meinen Stärken zählen meine Teamfähigkeit.'),
    new User(1, 'Ben','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png','f','f'),
    new User(2, 'Tristan','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png','f','f'),
    new User(3, 'Ibo','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png','f','f'),
    new User(4, 'Rafi','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png','f','f')
  ];

  constructor() { }
}
