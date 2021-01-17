import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skin } from '../model/skin';
import { Category } from '../model/category';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { MySkin } from '../model/myskin';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class SkinsService {

  http: HttpClient;

  //Array an Terminen
  public skins: Array<Skin>;
  categoryService: CategoryService
  message;

  //api = "http://localhost:8080/api/skin/";

  //jan
  api = "http://192.168.1.26:8080/api/skin/";


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
    return this.http.get<Skin[]>(this.api + 'findAll', {headers: reqHeader})
  }

  //check
  check(id) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<MySkin>(this.api + 'check/' + id, {headers: reqHeader})
  }

  //update
  updateSkin(s: Skin) {
    let body = JSON.stringify(s);
    console.log(body);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.put(this.api + 'update', body, {headers: reqHeader});

  }

  //delete
  deleteSkin(index: number) {
  }

}
