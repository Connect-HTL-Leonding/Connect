import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { SkinsService } from '../api/skins.service';
import { Skin } from 'src/app/model/skin';
import { SkinselectionPage } from '../skinselection/skinselection.page'
import { MySkin } from '../model/myskin';
import { MyskinsService } from '../api/myskins.service';

@Component({
  selector: 'app-my-skins',
  templateUrl: './my-skins.page.html',
  styleUrls: ['./my-skins.page.scss'],
})
export class MySkinsPage implements OnInit {

  //Service
  mySkinService;

  //Suchbegriff
  searchString: String = "";

  //Ausgewählter Skin
  currentSkin: MySkin;

  //Konstruktor
  constructor(ks: MyskinsService, public modalController: ModalController) {
    this.mySkinService = ks;
  }

  ngOnInit() {
    //async Skin loading
    this.mySkinService.getMySkins().subscribe(
      data => {

        console.log(data);
        this.mySkinService.myskins = data;

        console.log(this.mySkinService.myskins)
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
  matchesFilter(s: MySkin) {
    return s.skin.title.toUpperCase().indexOf(this.searchString.toUpperCase()) == 0
  }

  //ausgewählter Skin änder bei klick
  changeSelection(s: MySkin) {
    this.currentSkin = s;
  }

  //ausgewählter Skin ändern - dynamisch
  selectSkin() {
    if(this.mySkinService.myskins){
      this.mySkinService.myskins.forEach(element => {
        this.currentSkin = element;
      });
    }else {
      this.currentSkin = null;
    }

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

  //Event bei Skin updaten
  updateSkin(s: MySkin) {
    this.mySkinService.updateSkin(s).subscribe(data => {
      //nach unpdate erneutes getAll
      this.mySkinService.getMySkins().subscribe(
        data => {
          this.mySkinService.myskins = data;
          this.selectSkin();
          
        },
        error1 => {
          console.log('Error');
        }
      )
    });;
  }

  //Event bei Skin entfernen
  deleteSkin(s: MySkin) {
    this.mySkinService.deleteSkin(s.id).subscribe(data => {
      //nach unpdate erneutes getAll
      this.mySkinService.getMySkins().subscribe(
        data => {
          this.mySkinService.myskins = data;
          this.currentSkin = null;
          this.selectSkin();
        },
        error1 => {
          console.log('Error');
        }
      )
    });;
  }
}
