import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../model/skin';

@Injectable({
  providedIn: 'root'
})
export class SkinsService {

  http: HttpClient;

  //Array an Terminen
  public skins : Array<Skin>;
  message;

  //Konstruktor
  constructor(http: HttpClient) {
    this.http = http;
    this.skins = [];
    this.generateSkins();
  }

  generateSkins(){
    var s = new Skin();
    
    s.id = 1;
    s.title = "Fußball";
    s.description ="Du magst Fußball? Cool! Das ist der Fußbal Skin. Komm doch vorbei!"
    s.image = "../assets/connect_img/square/fussball_square.png"
    s.category.push("Sport")
    s.follower = 100;
    s.following = true;
    s.age = 20;
    s.radius = 9;
    s.niveau = 10;
    console.log(s)
    this.skins.push(s);

    s = new Skin();
    
    s.id = 2;
    s.title = "Ausgehen";
    s.description ="Du magst Ausgehen? Cool! Das ist der Ausgehen Skin. Komm doch vorbei!"
    s.category.push("Freizeit")
    s.follower = 50;
    s.following = true;
    s.age = 18;
    s.radius = 2;
    s.niveau = 10;
    console.log(s)
    this.skins.push(s);

    s = new Skin();
    
    s.id = 3;
    s.title = "Basketball";
    s.description ="Du magst Basketball? Cool! Das ist der Basketball Skin. Komm doch vorbei!"
    s.image = "../assets/connect_img/square/basketball_square.png";
    s.category.push("Sport")
    s.follower = 40;
    s.following = true;
    s.age = 20;
    s.radius = 3;
    s.niveau = 10;
    console.log(s)
    this.skins.push(s);

    s = new Skin();
    
    s.id = 4;
    s.title = "Schwimmen";
    s.description ="Du magst Schwimmen? Cool! Das ist der Schwimmen Skin. Komm doch vorbei!"
    s.image = "../assets/connect_img/square/schwimmen_square.png";
    s.category.push("Sport")
    s.follower = 20;
    s.following = true;
    s.age = 30;
    s.radius = 1;
    s.niveau = 10;
    console.log(s)
    this.skins.push(s);

    s = new Skin();
    
    s.id = 5;
    s.title = "Tennis";
    s.description ="Du magst Tennis? Cool! Das ist der Tennis Skin. Komm doch vorbei!"
    s.image = "../assets/connect_img/square/tennis_square.png";
    s.category.push("Sport")
    s.follower = 400;
    s.following = true;
    s.age = 18;
    s.radius = 2;
    s.niveau = 10;
    console.log(s)
    this.skins.push(s);

    s = new Skin();
    
    s.id = 6;
    s.title = "Golf";
    s.description ="Du magst Golf? Cool! Das ist der Golf Skin. Komm doch vorbei!"
    s.image = "../assets/connect_img/square/golf_square.png";
    s.category.push("Sport")
    s.follower = 200;
    s.following = true;
    s.age = 17;
    s.radius = 9;
    s.niveau = 1;
    console.log(s)
    this.skins.push(s);

    s = new Skin();
    
    s.id = 7;
    s.title = "Volleyball";
    s.description ="Du magst Volleyball? Cool! Das ist der Volleyball Skin. Komm doch vorbei!"
    s.image = "../assets/connect_img/square/volleyball_square.png";
    s.category.push("Sport")
    s.follower = 300;
    s.following = true;
    s.age = 28;
    s.radius = 4;
    s.niveau = 12;
    console.log(s)
    this.skins.push(s);
  }

  getSkins() {
    
  }

  deleteSkin(index: number) {
  }

  updateSkin(t: Skin) {
  }
}
