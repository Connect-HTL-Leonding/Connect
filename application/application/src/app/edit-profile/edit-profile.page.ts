import { Component, OnInit } from '@angular/core';
import { User } from "../model/user";
import { ProfileService } from "../api/profile.service";
import {PhotoService} from "../api/photo.service";
//import { Camera } from '@ionic-native/camera';
//import { CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user: User
  nachrichten : boolean = false;
  connects : boolean = false;
  imgURL;
 image = new Image();

  constructor(ps: ProfileService, public photoService: PhotoService, 
    //private camera: Camera
    ) {
    this.user = ps.user[0];
    
  }

  slideOpts = {
    //initialSlide: 0,
   // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  loadFromStorage() {
     this.photoService.loadPfp();
     this.imgURL = this.photoService.imgURL
      /*this.camera.getPicture({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL
      }).then((res) => {
        this.imgURL = 'data:image/jpeg;base64' + res;
      }).catch(e => {
        console.log(e);
        }) */
  }

  ngOnInit() {
  }

}
