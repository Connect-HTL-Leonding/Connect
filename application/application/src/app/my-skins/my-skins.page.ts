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

  //Service
  skinService;

  //Suchbegriff
  searchString: String = "";

  //Ausgewählter Skin
  currentSkin: Skin;

  //Konstruktor
  constructor(ks: SkinsService, public modalController: ModalController) {
    this.skinService = ks;
  }

  ngOnInit() {
    //async Skin loading
    this.skinService.getSkins().subscribe(
      data => {
        this.skinService.skins = data;

        console.log(this.skinService.skins)
        //Skin wird selektiert
        this.selectSkin();

        

        //console.log(this.skinService);
      },
      error1 => {
        console.log('Error');
      }
    )
  }

  //check
  matchesFilter(s: Skin) {
    return s.title.toUpperCase().indexOf(this.searchString.toUpperCase()) == 0
  }

  //ausgewählter Skin änder bei klick
  changeSelection(s: Skin) {
    this.currentSkin = s;
  }

  //ausgewählter Skin ändern - dynamisch
  selectSkin() {
    this.skinService.skins.some(element => {
        this.currentSkin = element;
        return true;
    });
  }

  //Modal öffnen
  async presentModal() {
    console.log("Modal openeing")
    const modal = await this.modalController.create({
      component: SkinselectionPage,
    });
    //Event bei Modal schließen
    modal.onDidDismiss().then(() => {
      this.ngOnInit();
    });
    return await modal.present();
  }

  //Event bei Skin entfernen
  updateSkin(s: Skin) {
    this.skinService.updateSkin(s).subscribe(data => {
      //nach unpdate erneutes getAll
      this.skinService.getSkins().subscribe(
        data => {
          this.skinService.skins = data;
          this.selectSkin();
        },
        error1 => {
          console.log('Error');
        }
      )
    });;
  }
}
