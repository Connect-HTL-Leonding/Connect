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
import { ContactlistService } from 'src/app/api/contactlist.service';
import { Friendship } from 'src/app/model/friendship';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage implements OnInit {

  user;
  friendship:Friendship = null;
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
    public friendshipService: FriendshipService,
    public cs:ContactlistService,
    public fs:FriendshipService) {

  }

  slideOpts = {
    //initialSlide: 0,
    // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };

  ngOnInit() {
    //DEBUGconsole.log(this.user)
    this.ps.friendCustomData(this.user.id).subscribe(data => {
      this.photoService.loadFriendGalleryImages(data.id);
      this.profilePictureReady = "data:image/png;base64," + atob(data.profilePicture);
      this.user.custom = data;

      this.ps.getUser().add(() => {
        this.fs.getFriendshipsWithUsers(this.ps.user.id, this.user.id).subscribe((data: Friendship) => {
          console.log(data)
          this.friendship = data
        })
      })
    })

  }

  dismissModal() {
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
            //DEBUGconsole.log('Confirm Cancel: yes');
          }
        }, {
          text: 'Blockieren',
          cssClass: 'secondary',
          handler: () => {
            //DEBUGconsole.log('Delete Okay');
            //blockieren Funktion ...
            this.friendshipService.blockFriendship(this.user.custom).subscribe(data => {
              this.friendshipService.blockedObservable.next('blocked:' + this.ps.user.id + ':' + this.user.id)
              this.cs.contactlistObservable.next('contactListUpdate');
              this.dismissModal();
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
