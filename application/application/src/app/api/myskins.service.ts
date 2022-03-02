import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';
import { api } from '../app.component';
import { MySkin } from '../model/myskin';

@Injectable({
  providedIn: 'root'
})
export class MyskinsService {

  http: HttpClient;

  //Array an Terminen
  public myskins: Array<MySkin>;
  public current: MySkin = null;
  public selectedMySkins: Array<MySkin>;
  public mapSkins: Array<MySkin>;
  public mySkinObserveable = new Subject<any>();
  mySkinUpdateNotify = this.mySkinObserveable.asObservable();
  message;


  //Konstruktor
  constructor(http: HttpClient) {
    this.http = http;
    this.myskins = [];
  }

  //ausgewählter Skin ändern - dynamisch
  selectSkin() {
    if (this.current == null) {
      //DEBUGconsole.log("jsaldfja")
      if (this.myskins) {
        this.myskins.forEach(element => {
          this.current = element;
        });
      } else {
        this.current = null;
      }
    }

    //DEBUGconsole.log(this.current)
  }

  //Getter Aktuell Ausgewählten Skin
  getCurrentSkin() {
    return new Promise((resolve) => {
      //DEBUGconsole.log(this.current + " jsdlfasjdflsj")
      if (this.current == null) {
        this.getMySkins().subscribe(
          data => {
            this.myskins = data;

            //Skin wird selektiert
            this.selectSkin();
            resolve(this.current);
          },
          error1 => {
            //DEBUGconsole.log('Error');
          }
        )
      } else {
        resolve(this.current);
      }
    });

  }

  //getAll
  getSelectedSkins() {
    return this.http.get<MySkin[]>(api.url + 'myskin/findSelected')
  }

  getMapSkins() {
    return this.http.get<MySkin[]>(api.url + 'myskin/findMapSkins')
  }

  //getAll
  getMySkins() {
    return this.http.get<MySkin[]>(api.url + 'myskin/findAll')
  }

  //update
  updateSkin(s: MySkin) {
    return this.http.put(api.url + 'myskin/update', s);

  }

  addToMySkins(skin) {
    var ms: MySkin = new MySkin();
    ms.skin = skin;
    //DEBUGconsole.log(ms);
    let body = JSON.stringify(ms);
    //DEBUGconsole.log(body)
    return this.http.post(api.url + 'myskin/create', ms);

  }

  //delete
  deleteSkin(index: number) {
    if (index == this.current.id) {
      this.current = null;
    }
    return this.http.delete(api.url + 'myskin/delete/' + index,);
  }
}
