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
  constructor(public ps: ProfileService, public ts: TutorialService, public mySkinService: MyskinsService,private router: Router, public modalController: ModalController, public toastController: ToastController) {
  }

  ngOnInit() {
    //async Skin loading
    /*
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
    */
  }

  ngAfterViewInit(){
    this.showTutorial();
  }
  
  showTutorial(){
    console.log("123111111111111111111111111111111111111111111111")
    this.ts.getUser().subscribe(
      data => {
          this.ts.user.id = data["id"];
          this.ts.user.userName = data["username"];
          this.ts.user.firstname = data["firstName"];
          this.ts.user.lastname = data["lastName"];
          this.ts.user.email = data["email"];
          this.ts.user.custom.finishedTutorial = data["finishedTutorial"];
          console.log("fkdsjflkjdslkfjdslkfjöldskjflkdsöfljdsöfljfdsjdsf" + this.ts.user);
          console.log(data)

          if(!this.ts.user.custom.finishedTutorial){
            Showcaser.showcase("Das hier sind deine Skins", this.addSkinButRef.nativeElement, {
              shape: "circle",
              buttonText: "Ok!",
              position: {
                horizontal: "center",
                vertical: "middle"
              },
              allowSkip: false,
              close: () => {
                this.ts.user.custom.finishedTutorial = true;
                this.ts.updateUserTutorial(this.ts.user);
                console.log(this.ts.user.custom.finishedTutorial + "Yeahhh les go");
              }
          });      
        }
          
        console.log("1231231231231232132131323123")
        console.log(this.ts.user);


        //console.log(this.skinService);
      });
    
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
          this.mySkinService.getCurrentSkin();
          console.log(this.mySkinService.current)
          this.mySkinService.getSelectedSkins().subscribe(data => {
            this.mySkinService.selectedMySkins = data;
            this.mySkinService.getMapSkins().subscribe(data => {
              this.mySkinService.mapSkins = data;
              this.mySkinService.mySkinObserveable.next(data);
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
