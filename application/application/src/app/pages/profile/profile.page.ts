import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProfileService } from "../../api/profile.service";
import { User } from "../../model/user";
import { MenuController, ModalController } from '@ionic/angular';
import { PhotogalleryPage } from './photogallery/photogallery.page';
import { PhotoService } from "../../api/photo.service";
import Showcaser from 'showcaser'
import { TutorialService } from 'src/app/api/tutorial.service';
import { Router } from '@angular/router';

import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;

  // Button
  @ViewChild('change_button', { static: false }) changeButRef: ElementRef;

  // Button
  @ViewChild('profile_pic', { static: false }) profilePicRef: ElementRef;
  ownProfile = true;


  constructor(public router: Router, public ts: TutorialService, public ps: ProfileService, private keyCloakService: KeycloakService, public modalController: ModalController, public photoService: PhotoService) {

  }

  slideOpts = {
    //initialSlide: 0,
    // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };

  ngOnInit() {
    this.ownProfile = !this.ps.friendUser;
    if (this.ownProfile) {
      this.photoService.loadPfp();
      this.photoService.loadGalleryImages();
      this.user = this.keyCloakService.getKeycloakInstance().userInfo;

      this.ps.getUser().subscribe(
        data => {

          console.log(data);
          this.ps.user.custom = data;


          console.log("westrzutqjhkgizfutetdzuz")

          console.log(this.ps.user)
          this.showTutorial();


          //console.log(this.skinService);
        },
        error1 => {
          console.log('Error');
        }
      )
    }
    else {

      this.ps.friendCustomData(this.ps.user.id).subscribe(data => {
        this.photoService.loadFriendGalleryImages(data.id);
        data.profilePicture = "data:image/png;base64," + atob(data.profilePicture);
        this.ps.user.custom = data;
        console.log(this.ps.user.custom.profilePicture);
        console.log(this.ps.user);
      })
    }

  }

  dismissModal() {
    this.photoService.loadPfp();
    this.photoService.loadGalleryImages();
    this.user = this.keyCloakService.getKeycloakInstance().userInfo;

    this.ps.getUser().subscribe(
      data => {

        console.log(data);
        this.ps.user.custom = data;


        console.log("westrzutqjhkgizfutetdzuz")

        console.log(this.ps.user)



        //console.log(this.skinService);
      },
      error1 => {
        console.log('Error');
      }
    )
    if (!this.ownProfile) {
      this.modalController.dismiss();
    }

  }

  //ngAfterViewInit() {
    //this.showTutorial();
  //}

  showTutorial() {
    console.log("Profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" + this.ps.user);
    if (this.ps.user.custom.tutorialStage == 1) {
      console.log("Bruhhhhh" + this.profilePicRef.nativeElement);
      Showcaser.showcase("Das ist deine Profilseite. Stelle dich hier anderen vor!", this.profilePicRef.nativeElement, {
        buttonText: "Ok!",
        position: {
          horizontal: "center",
          vertical: "bottom"
        },
        allowSkip: false,
        close: () => {
          this.ps.updateUserTutorial(this.ps.user).subscribe(data => {
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
