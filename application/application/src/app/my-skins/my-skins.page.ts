import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {SkinsService} from '../api/skins.service';
import { Skin } from 'src/app/model/skin';

@Component({
  selector: 'app-my-skins',
  templateUrl: './my-skins.page.html',
  styleUrls: ['./my-skins.page.scss'],
})
export class MySkinsPage implements OnInit {

  skinService;
  searchString: String = "";
  currentSkin : Skin;

  constructor(ks : SkinsService) { 
    this.skinService = ks;
  }

  ngOnInit() {
    this.currentSkin = this.skinService.skins[0];
    console.log(this.currentSkin);
  }

  matchesFilter(s:Skin) {
    return s.title.toUpperCase().indexOf(this.searchString.toUpperCase()) == 0
  }

  changeSelection(s:Skin){
    this.currentSkin = s;
  }

}
