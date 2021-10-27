import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProfileService } from "../../api/profile.service";
import { User } from "../../model/user";
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { PhotoService } from "../../api/photo.service";
import Showcaser from 'showcaser'
import { TutorialService } from 'src/app/api/tutorial.service';
import { Router } from '@angular/router';

import { PhotogalleryPage } from '../profile/photogallery/photogallery.page';
import { FriendshipService } from 'src/app/api/friendship.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage implements OnInit {

  user;
  profilePictureReady;

  // Button
  @ViewChild('change_button', { static: false }) changeButRef: ElementRef;

  // Button
  @ViewChild('profile_pic', { static: false }) profilePicRef: ElementRef;
  ownProfile = true;


  constructor(public router: Router,
    public ts: TutorialService,
    public ps: ProfileService,
    public modalController: ModalController,
    public photoService: PhotoService,
    public alertController: AlertController,
    public friendshipService: FriendshipService) {

  }

  slideOpts = {
    //initialSlide: 0,
    // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };

  ngOnInit() {
    console.log(this.user)
    this.ps.friendCustomData(this.user.id).subscribe(data => {
      this.photoService.loadFriendGalleryImages(data.id);
      this.profilePictureReady = "data:image/png;base64," + atob(data.profilePicture);
      this.user.custom = data;
    })

  }

  dismissModal() {
    console.log("dismiss")
    this.modalController.dismiss();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'confirm-delete',
      header: 'Achtung!',
      message: 'Willst du wirklich <strong>' + this.user.username + '</strong> <strong>blockieren</strong>?<br>Damit ist die Freundschaft beendet!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Confirm Cancel: yes');
          }
        }, {
          text: 'Blockieren',
          cssClass: 'secondary',
          handler: () => {
            console.log('Delete Okay');
            //blockieren Funktion ...
            this.friendshipService.blockFriendship(this.user.custom).subscribe(data => {
              console.log("blocked")
            })

          }
        }
      ]
    });

    await alert.present();
  }

  block() {
    this.presentAlertConfirm();
  }

  async presentModal() {

    const modal = await this.modalController.create({
      component: PhotogalleryPage
    });
    return await modal.present();
  }

}
