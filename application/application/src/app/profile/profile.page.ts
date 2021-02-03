import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth/auth.service';
import { ProfileService } from "../api/profile.service";
import { User } from "../model/user";
import { MenuController, ModalController } from '@ionic/angular';
import { PhotogalleryPage } from './photogallery/photogallery.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;

  constructor(public ps: ProfileService, private authService: AuthService, public modalController: ModalController) {

  }

  slideOpts = {
    //initialSlide: 0,
    // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };

  ngOnInit() {
    this.user = this.authService.getUserInfo();

    this.ps.getUser().subscribe(
      data => {

        console.log(data);
        this.ps.user = data;

        console.log(this.ps.user)



        //console.log(this.skinService);
      },
      error1 => {
        console.log('Error');
      }
    )
  }

  async presentModal() {
    
    const modal = await this.modalController.create({
      component: PhotogalleryPage
    });
    return await modal.present();
  }

}
