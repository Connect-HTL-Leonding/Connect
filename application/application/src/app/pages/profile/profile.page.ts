import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/auth/auth.service';
import { ProfileService } from "../../api/profile.service";
import { User } from "../../model/user";
import { MenuController, ModalController } from '@ionic/angular';
import { PhotogalleryPage } from './photogallery/photogallery.page';
import { PhotoService } from "../../api/photo.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;
 
  

  constructor(public ps: ProfileService, private authService: AuthService, public modalController: ModalController, public photoService: PhotoService) {
   
  }

  slideOpts = {
    //initialSlide: 0,
    // spaceBetween: "-550",
    slidesPerView: 1,
    speed: 400
  };

  ngOnInit() {
    this.photoService.loadPfp();
    this.photoService.loadGalleryImages();
    this.user = this.authService.getUserInfo();

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
  }

  async presentModal() {
    
    const modal = await this.modalController.create({
      component: PhotogalleryPage
    });
    return await modal.present();
  }

}
