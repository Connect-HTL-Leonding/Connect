import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../model/skin';

@Injectable({
  providedIn: 'root'
})
export class MySkinsService {

  http: HttpClient;

  //Array an Terminen
  public mySkins : Array<Skin>;
  message;

  //Konstruktor
  constructor(http: HttpClient) {
    this.http = http;
    this.mySkins = [];
    this.generateSkins();
  }

  generateSkins(){
    var s = new Skin();
    
    s.id = 1;
    s.title = "Fußball";
    s.image = "../assets/connect_img/fussball.png"
    s.follower = 100;
    s.following = true;
    s.age = 20;
    s.radius = 9;
    s.niveau = 10;
    console.log(s)
    this.mySkins.push(s);

    s = new Skin();
    
    s.id = 2;
    s.title = "Ausgehen";
    s.follower = 50;
    s.following = true;
    s.age = 18;
    s.radius = 2;
    s.niveau = 10;
    console.log(s)
    this.mySkins.push(s);
  }

  getSkins() {
    
  }

  deleteSkin(index: number) {
  }

  updateSkin(t: Skin) {
  }
}
