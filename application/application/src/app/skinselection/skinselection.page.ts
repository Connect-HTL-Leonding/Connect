import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(ss: SkinsService, cs: CategoryService, public modalCtrl: ModalController) {
    this.skinsService = ss;
    this.categoryService = cs;


    this.setCurrCat(this.categoryService.findCategory("All"));

  }

  check(skin) {
    var index = -1;

    //important
    var cat_title = this.currCat.title

    var filteredObj = skin.categories.find(function (item, i) {
      if (item.title === cat_title) {
        index = i;
        return i;
      }
    });

    if (index !== -1 && (skin.title.toUpperCase().startsWith(this.searchString.toUpperCase().trim()) || this.searchString.trim() === '')) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    console.log(this.skinsService);
    this.skinsService.getSkins().subscribe(
      data => {
        this.skinsService.skins = data;
      },
      error1 => {
        console.log('Error');
      }
    )

  }

  setCurrCat(c: Category) {
    console.log("Cat: " + c)
    this.currCat = c;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  updateSkin(skin){
    this.skinsService.updateSkin(skin);
  }

}
