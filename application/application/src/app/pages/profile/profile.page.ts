import { Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { AuthService } from '../../api/auth/auth.service';
import { ProfileService } from "../../api/profile.service";
import { User } from "../../model/user";
import { MenuController, ModalController } from '@ionic/angular';
import { PhotogalleryPage } from './photogallery/photogallery.page';
import { PhotoService } from "../../api/photo.service";
import Showcaser  from 'showcaser'
import { TutorialService } from 'src/app/api/tutorial.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;

  // Button
   @ViewChild('change_button', { static: false }) changeButRef: ElementRef;

  // Button
  @ViewChild('profile_pic', { static: false }) profilePicRef: ElementRef;
  constructor(public ts: TutorialService, public ps: ProfileService,private router: Router, private authService: AuthService, public modalController: ModalController, public photoService: PhotoService) {
   
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
        //console.log(this.skinService);
      },
      error1 => {
        console.log('Error');
      }
    )
  }

  ngAfterViewInit(){
    this.showTutorial();
  }
  
  showTutorial(){
    this.ts.getUser().subscribe(
      data => {

        console.log(data);
        this.ts.user.custom = data;

        console.log("1231231231231232132131323123")
        console.log(this.ts.user.custom)
        console.log(this.profilePicRef.nativeElement);



        //console.log(this.skinService);
      });
    if(!this.ts.user.finishedTutorial){
      console.log("Bruhhhhh" + this.profilePicRef.nativeElement);
      Showcaser.showcase("Das ist deine Profilseite. Diese Seite können andere User von dir sehen", this.changeButRef.nativeElement, {
        shape: "circle",
        buttonText: "Ok!",
        position: {
          horizontal: "center",
          vertical: "middle"
        },
        allowSkip: false,
        close: () => {
            
        }
      });
    }
  }
  async presentModal() {
    
    const modal = await this.modalController.create({
      component: PhotogalleryPage
    });
    return await modal.present();
  }

}
