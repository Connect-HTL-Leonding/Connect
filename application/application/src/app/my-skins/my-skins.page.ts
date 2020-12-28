import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import {SkinsService} from '../api/skins.service';
import { Skin } from 'src/app/model/skin';
import { SkinselectionPage} from '../skinselection/skinselection.page'

@Component({
  selector: 'app-my-skins',
  templateUrl: './my-skins.page.html',
  styleUrls: ['./my-skins.page.scss'],
})
export class MySkinsPage implements OnInit {

  skinService;
  searchString: String = "";
  currentSkin : Skin;

  constructor(ks : SkinsService, public modalController : ModalController) { 
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: SkinselectionPage
    });
    return await modal.present();
  }

}
