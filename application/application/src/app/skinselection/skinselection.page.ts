import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../api/category.service';
import { SkinsService } from '../api/skins.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-skinselection',
  templateUrl: './skinselection.page.html',
  styleUrls: ['./skinselection.page.scss'],
})
export class SkinselectionPage implements OnInit {

  skinsService: SkinsService;
  categoryService: CategoryService;

  currCat: Category;
  searchString = "";

  constructor(ss: SkinsService, cs: CategoryService) {
    this.skinsService = ss;
    this.categoryService = cs;
    
   
   this.setCurrCat(this.categoryService.findCategory("All"));
   
   }

  

  ngOnInit() {
    
  }

  setCurrCat(c: Category){
    console.log("Cat: "+c)
      this.currCat = c;
  }

}
