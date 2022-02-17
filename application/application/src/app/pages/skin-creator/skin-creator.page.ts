import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/core';
import { Skin } from 'src/app/model/skin';
import { SkinsService } from 'src/app/api/skins.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/api/category.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-skin-creator',
  templateUrl: './skin-creator.page.html',
  styleUrls: ['./skin-creator.page.scss'],
})
export class SkinCreatorPage implements OnInit {

  public image;
  public skin;
  
  constructor(public skinsService: SkinsService,public cs: CategoryService,private router: Router, public toastController: ToastController) {
    this.skin = new Skin();
    this.image = "";
   }
   ngOnInit() {
    console.log(this.skinsService);

    this.cs.getCategories().subscribe(
      data => {
        this.cs.categories = data;
      
      },
      error1 => {
        console.log('Error');
      }
    )
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Make sure you choose an image, title and description!',
      duration: 2000
    });
  
    toast.present();
  }

  async addImage(){
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        quality: 100,
        allowEditing: true
      })
      this.image = capturedPhoto.base64String.toString();
       
      this.skin.image = this.image;
    } catch (e) {
      }
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Sorry, there was an Error. Try again later.',
      duration: 4000
    });
    console.log("fjdlsjdlkdf")
    toast.present();
  }

  createSkin(){

    if(this.image=='' || this.skin.title=='' || this.skin.description==''){
      this.presentToast();
    }else{
      console.log("creating skin")
      console.log(this.skin.id + "AMOGUS")
      this.skinsService.createSkin(this.skin).subscribe(value => {
        console.log("done creating")
        console.log(this.image)
        this.image="";
        this.skin = new Skin();
        this.router.navigate(["my-skins"]);
      },
      err => {
  this.presentErrorToast();
      });
    }
    }
   
}
