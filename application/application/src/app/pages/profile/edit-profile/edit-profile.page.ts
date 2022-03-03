import { Component, OnInit } from '@angular/core';
import { User } from "../../../model/user";
import { ProfileService } from "../../../api/profile.service";
import { PhotoService } from "../../../api/photo.service";
import { MenuController, ModalController } from '@ionic/angular';
import { PhotogalleryPage } from '../photogallery/photogallery.page';
//import { Camera } from '@ionic-native/camera';
//import { CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  imgURL;
  changes = true;

  noImgs: boolean;

  constructor(public ps: ProfileService, public modalController: ModalController, public photoService: PhotoService,
    private sanitizer: DomSanitizer) { }



  slideOpts = {
    //initialSlide: 0,
    // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };

  colorButton(){
    //DEBUGconsole.log(this.changes)
    this.changes = false;
  }

  addPhotoToGallery() {
    try {
      this.photoService.addNewToGallery();
    } catch (e) {

    }
  }

  async updatePfp() {
    (await this.photoService.updatePfp()).subscribe(data=>{
      this.loadPfp();
    });
  }

  loadPfp() {
    this.photoService.loadPfp();
  }


  ngOnInit() {

    this.changes = true;

    this.ps.getUser().add(
      () => {
        this.loadPfp();
        this.photoService.loadGalleryImages();
        //DEBUGconsole.log("Images loaded.")

        //DEBUGconsole.log(this.ps.user)
        ////DEBUGconsole.log(this.skinService);
      }
    )
  }


  updateUser(u: User) {
    //u.username = document.getElementById("username").innerText;
    ////DEBUGconsole.log(u.desc)
    //u.desc = document.getElementById("desc").innerText;
    //DEBUGconsole.log(u.custom.description)
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
