import { Injectable } from '@angular/core';
import { User } from '../model/user'

@Injectable({
  providedIn: 'root'
})
export class ContactlistService {

  chats = 
  [
    new User(0, 'Jan','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png', 'yes ... modern problems'),
    new User(1, 'Ben','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png', 'hm okeee'),
    new User(2, 'Tristan','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png', 'oh :eyes:'),
    new User(3, 'Ibo','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png', 'apex?'),
    new User(4, 'Rafi','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png', 'funny meme')
  ];

  constructor() { }
}
