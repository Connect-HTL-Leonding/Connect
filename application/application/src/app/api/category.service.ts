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
  constructor(http: HttpClient, private oauthService: OAuthService) {
    this.http = http;
    this.categories = [];
    //this.generateCategories();
  }

  generateCategories(){

    c = new Category();
    c.id = 0;
    c.title = "All";
    
    console.log(c)
    this.categories.push(c);

    var c = new Category();
    
    c.id = 1;
    c.title = "Sport";
    
    console.log(c)
    this.categories.push(c);

    c = new Category();
    
    c.id = 2;
    c.title = "Freizeit";
    
    console.log(c)
    this.categories.push(c);
    
  }

  findCategory(s: string): any{
    let foundCat = this.categories[0];

    console.log(this.categories)

    this.categories.forEach(c =>{
      
      if(c.title ==s){
        foundCat = c
      }
    })

    return foundCat;
  }

  getCategories() : Observable<any>{
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<Category[]>(api.url+ 'category/findAll', {headers: reqHeader})
  }

  deleteCategory(index: number) {
  }

  updateCategory(t: Category) {
  }
}
