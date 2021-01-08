import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { SkinsService } from '../api/skins.service';
import { Skin } from 'src/app/model/skin';
import { SkinselectionPage } from '../skinselection/skinselection.page'

@Component({
  selector: 'app-my-skins',
  templateUrl: './my-skins.page.html',
  styleUrls: ['./my-skins.page.scss'],
})
export class MySkinsPage implements OnInit {

  skinService;
  searchString: String = "";
  currentSkin: Skin;

  constructor(ks: SkinsService, public modalController: ModalController) {
    this.skinService = ks;
  }

  ngOnInit() {
    //async
    this.skinService.getSkins().subscribe(
      data => {
        this.skinService.skins = data;
        /*
        var i = 0;
        while(!this.skinService.skins[i].following){
          i++;
        }
        this.currentSkin = this.skinService.skins[i];
        */
        console.log(this.skinService);
      },
      error1 => {
        console.log('Error');
      }
    )
    //this.currentSkin = this.skinService.skins[0];
    //console.log(this.currentSkin);
    console.log(this.skinService);
  }

  matchesFilter(s: Skin) {
    return s.title.toUpperCase().indexOf(this.searchString.toUpperCase()) == 0
  }

  changeSelection(s: Skin) {
    this.currentSkin = s;
  }

  async presentModal() {
    console.log("lsafkdjslkf")
    const modal = await this.modalController.create({
      component: SkinselectionPage
    });
    return await modal.present();
  }

  deleteupdateSkin(s : Skin){
    this.skinService.updateSkin(s);

  }

}
