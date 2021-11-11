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

  //Array an Skins
  public skins: Array<Skin>;
  categoryService: CategoryService
  message;


  //Konstruktor
  constructor(http: HttpClient, cs: CategoryService) {
    this.http = http;
    this.skins = [];
    this.categoryService = cs;
    //this.generateSkins();
  }

  //getAll
  getSkins() {
    return this.http.get<Skin[]>(api.url + 'skin/findAll')
  }

  //check
  check(id) {
    return this.http.get<MySkin>(api.url + 'skin/check/' + id)
  }

  //update
  updateSkin(s: Skin) {
    return this.http.put(api.url + 'skin/update', s);
  }

  //create
  createSkin(s: Skin) {
    return this.http.post(api.url + 'skin/create', s);
  }

}
