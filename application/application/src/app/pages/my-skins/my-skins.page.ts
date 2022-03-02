import { Component, ElementRef, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { SkinsService } from '../../api/skins.service';
import { Skin } from 'src/app/model/skin';
import { SkinselectionPage } from '../skinselection/skinselection.page'
import { MySkin } from '../../model/myskin';
import { MyskinsService } from '../../api/myskins.service';
import Showcaser from 'showcaser';
import { TutorialService } from 'src/app/api/tutorial.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/api/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-skins',
  templateUrl: './my-skins.page.html',
  styleUrls: ['./my-skins.page.scss'],
})
export class MySkinsPage implements OnInit {

  // Button
  @ViewChild('add_skin_circle', { static: false }) addSkinButRef: ElementRef;
  //Suchbegriff
  searchString: String = "";
  bruh: object;

  //Ausgewählter Skin
  currentSkin: MySkin;

  //Konstruktor
  constructor(public ps: ProfileService, public ts: TutorialService, public mySkinService: MyskinsService, private router: Router, public modalController: ModalController, public toastController: ToastController) {
  }

  ngOnInit() {
    //async Skin loading
    this.mySkinService.getMySkins().subscribe(
      data => {

        //DEBUGconsole.log(data);
        this.mySkinService.myskins = data;

        //DEBUGconsole.log(this.mySkinService.current)
        //Skin wird selektiert
        this.mySkinService.getCurrentSkin();
        //DEBUGconsole.log(this.mySkinService.current)


        ////DEBUGconsole.log(this.skinService);
      },
      error1 => {
        //DEBUGconsole.log('Error');
      }
    )

    this.ps.getUser().add(
      data => {
        this.showTutorial();
      }
    )
  }

  /*ngAfterViewInit() {
    this.showTutorial();
  }*/

  showTutorial() {
    //DEBUGconsole.log("123111111111111111111111111111111111111111111111" + this.ps.user.custom.tutorialStage);
    if (this.ps.user.custom.tutorialStage == 2) {
      Showcaser.showcase("Hier siehst du deine ausgewählten Skins. Skins sind wichtig, um andere Menschen zu finden.", null, {
        shape: "circle",
        buttonText: "Ok!",
        position: {
          horizontal: "center",
          vertical: "middle"
        },
        allowSkip: false,
        close: () => {
          this.ps.updateUserTutorial(this.ps.user.custom).subscribe(data => {
            this.ngOnInit();
          });
        }
      });
    }
    if (this.ps.user.custom.tutorialStage == 3) {
      Showcaser.showcase("Füge gleich einen <br>neuen Skin zu <br>deiner Sammlung hinzu!", this.addSkinButRef.nativeElement, {
        shape: "circle",
        buttonText: "Ok!",
        position: {
          horizontal: "right",
          vertical: "middle"
        },
        allowSkip: false,
        close: () => {
          this.ps.updateUserTutorial(this.ps.user.custom).subscribe(data => {

          });
        }
      });
    }
  }
  //check
  matchesFilter(s: MySkin) {
    return s.skin.title.toUpperCase().indexOf(this.searchString.toUpperCase()) == 0
  }

  //ausgewählter Skin änder bei klick
  changeSelection(ms: MySkin) {
    this.mySkinService.current = ms;
    //DEBUGconsole.log(this.mySkinService.current.id + " jladsflsjkdflkj");

  }

  //Modal öffnen
  async presentModal() {
    //DEBUGconsole.log("Modal openeing")
    const modal = await this.modalController.create({
      component: SkinselectionPage,
    });
    //Event bei Modal schließen
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        //DEBUGconsole.log(data);
        var newMySkin = data.data as MySkin;
        //DEBUGconsole.log(newMySkin);
        this.ngOnInit();
        //this.presentToast();

        this.presentToastWithOptions(newMySkin, "added");
      }

    });
    return await modal.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    //DEBUGconsole.log("fjdlsjdlkdf")
    toast.present();
  }

  async presentToastWithOptions(newMySkin: MySkin, msg) {
    const toast = await this.toastController.create({
      header: 'Skin ' + newMySkin.skin.title + ' ' + msg,
      message: 'Tap to close',
      position: 'top',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            //DEBUGconsole.log('Cancel clicked');
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
          this.mySkinService.getCurrentSkin();
          //DEBUGconsole.log(this.mySkinService.current)
          this.mySkinService.getSelectedSkins().subscribe(data => {
            this.mySkinService.selectedMySkins = data;
            this.mySkinService.getMapSkins().subscribe(data => {
              this.mySkinService.mapSkins = data;
              this.mySkinService.mySkinObserveable.next(data);
              //DEBUGconsole.log(this.ps.user.custom.tutorialStage)
              this.ps.getUser().add(() => {
                if(this.ps.user.custom.tutorialStage == 6){
                  this.router.navigate(["home"])
                }
              })

            })
          })
        },
        error1 => {
          //DEBUGconsole.log('Error');
        }
      )
    });
  }

  //Event bei Skin entfernen
  deleteSkin(s: MySkin) {
    this.mySkinService.deleteSkin(s.id).subscribe(data => {
      //nach unpdate erneutes getAll
      //DEBUGconsole.log(data);
      var deletedSkin = data as MySkin;
      this.mySkinService.getMySkins().subscribe(
        data => {
          this.mySkinService.myskins = data;
          this.currentSkin = null;
          this.mySkinService.getCurrentSkin();
          this.presentToastWithOptions(deletedSkin, "gelöscht");
        },
        error1 => {
          //DEBUGconsole.log('Error');
        }
      )
    });;
  }
}
