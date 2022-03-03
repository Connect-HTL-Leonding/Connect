import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProfileService } from "../../api/profile.service";
import { User } from "../../model/user";
import { MenuController, ModalController } from '@ionic/angular';
import { PhotogalleryPage } from './photogallery/photogallery.page';
import { PhotoService } from "../../api/photo.service";
import Showcaser from 'showcaser'
import { TutorialService } from 'src/app/api/tutorial.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/api/auth/keycloak.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;
  public imgURL;

  // Button
  @ViewChild('change_button', { static: false }) changeButRef: ElementRef;

  // Button
  @ViewChild('profile_pic', { static: false }) profilePicRef: ElementRef;


  constructor(public router: Router, public ts: TutorialService, public ps: ProfileService, private keyCloakService: KeycloakService, public modalController: ModalController, public photoService: PhotoService
    , private sanitizer: DomSanitizer) {

  }

  loadPfp() {
    this.photoService.loadPfp();
  }

  slideOpts = {
    //initialSlide: 0,
    // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };

  ionViewWillEnter(){
    this.loadPfp();
    this.photoService.loadGalleryImages();
   }


  ngOnInit() {
    this.loadPfp();
    this.photoService.loadGalleryImages();
    this.user = this.keyCloakService.user;

    this.ps.getUser().add(
      () => {

        //DEBUGconsole.log(this.ps.user)
        this.showTutorial();


        ////DEBUGconsole.log(this.skinService);
      }
    )

  }

  dismissModal() {
    this.photoService.loadPfp();
    this.photoService.loadGalleryImages();
    this.user = this.keyCloakService.user;

    this.ps.getUser().add(
      () => {


        //DEBUGconsole.log("westrzutqjhkgizfutetdzuz")

        //DEBUGconsole.log(this.ps.user)



        ////DEBUGconsole.log(this.skinService);
      }
    )

  }

  //ngAfterViewInit() {
  //this.showTutorial();
  //}

  showTutorial() {
    //DEBUGconsole.log("Profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" + this.ps.user);
    if (this.ps.user.custom.tutorialStage == 1) {
      //DEBUGconsole.log("Bruhhhhh" + this.profilePicRef.nativeElement);
      Showcaser.showcase("Das hier ist dein Profil. Zurzeit noch ein bisschen leer. Du kannst etwas über dich erzählen oder Bilder hochladen. Aber wirklich nur so viel wie du willst!", this.profilePicRef.nativeElement, {
        buttonText: "Ok!",
        position: {
          horizontal: "center",
          vertical: "bottom"
        },
        allowSkip: false,
        close: () => {
          this.ps.updateUserTutorial(this.ps.user.custom).subscribe(data => {
            this.router.navigate(["my-skins"])
          });
        }
      });
    }
  }
  async presentModal() {

    const modal = await this.modalController.create({
      component: PhotogalleryPage
    });
    return await modal.present();
  }

}
