import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { api } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  http: HttpClient;

  //Array an Terminen
  public categories : Array<Category>;
  message;


  //Konstruktor
  constructor(http: HttpClient) {
    this.http = http;
    this.categories = [];
  }

  //Findet Kategorie anhand des Suchbegriffs im Suchfeld
  findCategory(s: string): any{
    let foundCat = this.categories[0];

    //DEBUGconsole.log(this.categories)

    this.categories.forEach(c =>{
      
      if(c.title ==s){
        foundCat = c
      }
    })

    return foundCat;
  }

  getCategories() : Observable<any>{
    return this.http.get<Category[]>(api.url+ 'category/findAll')
  }

  deleteCategory(index: number) {
  }

  updateCategory(t: Category) {
  }
}
