import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../model/skin';
import { Category } from '../model/category';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { MySkin } from '../model/myskin';

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
  constructor(http: HttpClient, cs: CategoryService) {
    this.http = http;
    this.skins = [];
    this.categoryService = cs;
    //this.generateSkins();
  }

  //getAll
  getSkins() {
    return this.http.get<Skin[]>(this.api + 'findAll')
  }

  //check
  check(id) {
    return this.http.get<MySkin>(this.api + 'check/' + id)
  }

  //update
  updateSkin(s: Skin) {
    let body = JSON.stringify(s);
    console.log(body);
    return this.http.put(this.api + 'update', body, { 'headers': { 'Content-Type': 'application/json' } });

  }

  //delete
  deleteSkin(index: number) {
  }

}
