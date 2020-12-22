import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../api/profile.service";
import { User } from "../model/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User

  constructor(ps: ProfileService) {
    this.user = ps.user[0];
  }

  slideOpts = {
    //initialSlide: 0,
   // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };



  ngOnInit() {

  }

}
