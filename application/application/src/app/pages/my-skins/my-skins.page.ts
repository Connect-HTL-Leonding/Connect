import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { SkinsService } from '../../api/skins.service';
import { Skin } from 'src/app/model/skin';
import { SkinselectionPage } from '../skinselection/skinselection.page'
import { MySkin } from '../../model/myskin';
import { MyskinsService } from '../../api/myskins.service';

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
  constructor(ks: MyskinsService, public modalController: ModalController, public toastController: ToastController) {
    this.mySkinService = ks;
  }

  ngOnInit() {
    //async Skin loading
    this.mySkinService.getMySkins().subscribe(
      data => {

        console.log(data);
        this.mySkinService.myskins = data;

        console.log(this.mySkinService.current)
        //Skin wird selektiert
        this.selectSkin();
        console.log(this.mySkinService.current)


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
  changeSelection(ms: MySkin) {
    this.mySkinService.current = ms;
  }

  //ausgewählter Skin ändern - dynamisch
  selectSkin() {
    if (this.mySkinService.current == null) {
      console.log("jsaldfja")
      if (this.mySkinService.myskins) {
        this.mySkinService.myskins.forEach(element => {
          this.mySkinService.current = element;
        });
      } else {
        this.mySkinService.current = null;
      }
    }

    console.log(this.mySkinService.current)
  }

  //Modal öffnen
  async presentModal() {
    console.log("Modal openeing")
    const modal = await this.modalController.create({
      component: SkinselectionPage,
    });
    //Event bei Modal schließen
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log(data);
        var newMySkin = data.data as MySkin;
        console.log(newMySkin);
        this.ngOnInit();
        //this.presentToast();

        this.presentToastWithOptions(newMySkin, "hinzugefügt");
      }

    });
    return await modal.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    console.log("fjdlsjdlkdf")
    toast.present();
  }

  async presentToastWithOptions(newMySkin: MySkin, msg) {
    const toast = await this.toastController.create({
      header: 'Skin ' + newMySkin.skin.title + ' ' + msg,
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  //Event bei Skin updaten
  updateSkin(s: MySkin) {
    this.mySkinService.updateSkin(s).subscribe(data => {
      //nach unpdate erneutes getAll
      this.mySkinService.getMySkins().subscribe(
        data => {
          this.mySkinService.myskins = data;
          this.selectSkin();
          console.log(this.mySkinService.current)
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
      console.log(data);
      var deletedSkin = data as MySkin;
      this.mySkinService.getMySkins().subscribe(
        data => {
          this.mySkinService.myskins = data;
          this.currentSkin = null;
          this.selectSkin();
          this.presentToastWithOptions(deletedSkin, "gelöscht");
        },
        error1 => {
          console.log('Error');
        }
      )
    });;
  }
}
