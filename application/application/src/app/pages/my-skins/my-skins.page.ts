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

        console.log(data);
        this.mySkinService.myskins = data;

        console.log(this.mySkinService.current)
        //Skin wird selektiert
        this.mySkinService.getCurrentSkin();
        console.log(this.mySkinService.current)


        //console.log(this.skinService);
      },
      error1 => {
        console.log('Error');
      }
    )

    this.ps.getUser().subscribe(
      data => {
        console.log(data);
        this.ps.user.custom = data;
        console.log("westrzutqjhkgizfutetdzuz")
        console.log(this.ps.user)
        this.showTutorial();
      },
      error1 => {
        console.log('Error');
      }
    )
  }

  /*ngAfterViewInit() {
    this.showTutorial();
  }*/

  showTutorial() {
    console.log("123111111111111111111111111111111111111111111111" + this.ps.user.custom.tutorialStage);
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
    console.log(this.mySkinService.current.id + " jladsflsjkdflkj");

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
      message: 'Zum Schließen Klicken',
      position: 'top',
      buttons: [
        {
          text: 'Close',
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
          this.mySkinService.getCurrentSkin();
          console.log(this.mySkinService.current)
          this.mySkinService.getSelectedSkins().subscribe(data => {
            this.mySkinService.selectedMySkins = data;
            this.mySkinService.getMapSkins().subscribe(data => {
              this.mySkinService.mapSkins = data;
              this.mySkinService.mySkinObserveable.next(data);
              console.log(this.ps.user.custom.tutorialStage)
              this.ps.getUser().subscribe(data => {
                this.ps.user.custom = data;
                if(this.ps.user.custom.tutorialStage == 6){
                  this.router.navigate(["home"])
                }
              })

            })
          })
        },
        error1 => {
          console.log('Error');
        }
      )
    });
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
          this.mySkinService.getCurrentSkin();
          this.presentToastWithOptions(deletedSkin, "gelöscht");
        },
        error1 => {
          console.log('Error');
        }
      )
    });;
  }
}
