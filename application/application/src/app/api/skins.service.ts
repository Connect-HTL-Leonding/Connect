import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skin } from '../model/skin';
import { Category } from '../model/category';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { MySkin } from '../model/myskin';
import { OAuthService } from 'angular-oauth2-oidc';
import { api } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SkinsService {

  http: HttpClient;

  //Array an Terminen
  public skins: Array<Skin>;
  categoryService: CategoryService
  message;


  //Konstruktor
  constructor(http: HttpClient, cs: CategoryService, private oauthService: OAuthService) {
    this.http = http;
    this.skins = [];
    this.categoryService = cs;
    //this.generateSkins();
  }

  //getAll
  getSkins() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<Skin[]>(api.url + 'skin/findAll', {headers: reqHeader})
  }

  //check
  check(id) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<MySkin>(api.url + 'skin/check/' + id, {headers: reqHeader})
  }

  //update
  updateSkin(s: Skin) {
    let body = JSON.stringify(s);
    console.log(body);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.put(api.url + 'skin/update', body, {headers: reqHeader});

  }

  //delete
  deleteSkin(index: number) {
  }

}
