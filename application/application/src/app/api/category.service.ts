import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';
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
    this.generateCategories();
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

    this.categories.forEach(c =>{
      
      if(c.title ==s){
        foundCat = c
       
      }
    })

    return foundCat;
  }

  getCategories() {
    
  }

  deleteCategory(index: number) {
  }

  updateCategory(t: Category) {
  }
}
