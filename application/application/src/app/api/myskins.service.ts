import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MySkin } from '../model/myskin';

@Injectable({
  providedIn: 'root'
})
export class MyskinsService {

  http: HttpClient;

  //Array an Terminen
  public myskins: Array<MySkin>;
  message;

  //api = "http://localhost:8080/api/myskin/";

  //jan
  api = "http://192.168.1.26:8080/api/myskin/";

  //Konstruktor
  constructor(http: HttpClient, ) {
    this.http = http;
    this.myskins = [];
  }

  //getAll
  getMySkins(){
    return this.http.get<MySkin[]>(this.api +'findAll')
  }

  //update
  updateSkin(s:MySkin){
    let body = JSON.stringify(s);
    console.log(body);
    return this.http.put( this.api + 'update', body, {'headers': {'Content-Type': 'application/json'}});

  }

  addToMySkins(skin){
    var ms : MySkin = new MySkin();
    ms.skin = skin;
    console.log(ms);
    let body = JSON.stringify(ms);
    return this.http.post( this.api + 'create', body, {'headers': {'Content-Type': 'application/json'}});

  }

  //delete
  deleteSkin(index: number) {
    return this.http.delete(this.api + 'delete/' + index);
  }
}
