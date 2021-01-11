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

  constructor(public ps: ProfileService, public photoService: PhotoService, 
    //private camera: Camera
    ) {
    
    
  }

  slideOpts = {
    //initialSlide: 0,
   // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };

  addPhotoToGallery() {
    try {
      this.photoService.addNewToGallery();
    } catch(e) {
      
    }
    
  }

  loadFromStorage() {
      this.photoService.loadPfp();
      this.imgURL = this.photoService.imgURL
  }

  ngOnInit() {
    this.ps.getUser().subscribe(
      data => {
        this.ps.user = data;
        this.user = this.ps.user[0]
      },
      error1 => {
        console.log('Error');
      }
    )
  }

  updateUser(u: User) {
    u.username = document.getElementById("username").innerText;
    u.desc = document.getElementById("desc").innerText;

    this.ps.updateUser(u).subscribe(data => {
      //nach unpdate erneutes getAll
      this.ngOnInit();
    });;
  }

}
