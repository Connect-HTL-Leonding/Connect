import { Component, OnInit } from '@angular/core';
import { User } from "../../../model/user";
import { ProfileService } from "../../../api/profile.service";
import { PhotoService } from "../../../api/photo.service";
import { MenuController, ModalController } from '@ionic/angular';
import { PhotogalleryPage } from '../photogallery/photogallery.page';
import { KeycloakService } from 'keycloak-angular';
//import { Camera } from '@ionic-native/camera';
//import { CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  imgURL;
  changes = true;

  noImgs: boolean;

  constructor(public ps: ProfileService, public modalController: ModalController, public photoService: PhotoService, public keycloakService: KeycloakService) { }



  slideOpts = {
    //initialSlide: 0,
    // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };

  colorButton(){
    console.log(this.changes)
    this.changes = false;
  }

  addPhotoToGallery() {
    try {
      this.photoService.addNewToGallery();
    } catch (e) {

    }
  }

  loadFromStorage() {
    this.photoService.updatePfp();
  }


  ngOnInit() {

    this.changes = true;

    this.ps.getUser().subscribe(
      data => {

        console.log(data);
        this.ps.user.custom = data;



        this.photoService.loadPfp();
        this.photoService.loadGalleryImages();
        console.log("Images loaded.")

        console.log(this.ps.user)



        //console.log(this.skinService);
      },
      error1 => {
        console.log('Error');
      }
    )
  }


  updateUser(u: User) {
    //u.username = document.getElementById("username").innerText;
    //console.log(u.desc)
    //u.desc = document.getElementById("desc").innerText;
    console.log(u.custom.description)
    this.ps.updateUser(u.custom).subscribe(data => {
      //nach unpdate erneutes getAll
      this.ngOnInit();
    });
  }

  async presentModal() {

    const modal = await this.modalController.create({
      component: PhotogalleryPage
    });
    return await modal.present();
  }


}
