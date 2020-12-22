import { Injectable } from '@angular/core';
import { Chat } from '../model/chat'

@Injectable({
  providedIn: 'root'
})
export class ContactlistService {

  chats = 
  [
    new Chat(0, 'Jan','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png', 'yes ... modern problems', 1),
    new Chat(1, 'Ben','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png', 'hm okeee', 0),
    new Chat(2, 'Tristan','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png', 'oh :eyes:', 0),
    new Chat(3, 'Ibo','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png', 'apex?', 0),
    new Chat(4, 'Rafi','http://www.lexxmuseum.com/gallery/albums/userpics/10001/test.png', 'funny meme', 0)
  ];

  constructor() { }
}
