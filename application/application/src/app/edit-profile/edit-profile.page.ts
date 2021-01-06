import { Component, OnInit } from '@angular/core';
import { User } from "../model/user";
import { ProfileService } from "../api/profile.service";
import {PhotoService} from "../api/photo.service";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user: User
  nachrichten : boolean = false;
  connects : boolean = false;


  constructor(ps: ProfileService, public photoService: PhotoService) {
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


  ngOnInit() {
  }

}
