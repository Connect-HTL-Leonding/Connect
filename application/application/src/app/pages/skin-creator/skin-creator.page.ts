import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/core';
import { Skin } from 'src/app/model/skin';
import { SkinsService } from 'src/app/api/skins.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skin-creator',
  templateUrl: './skin-creator.page.html',
  styleUrls: ['./skin-creator.page.scss'],
})
export class SkinCreatorPage implements OnInit {

  public image;
  public skin;
  
  constructor(public skinsService: SkinsService,private router: Router) {
    this.skin = new Skin();
    this.image = "";
   }

  ngOnInit() {
  }


  async addImage(){
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        quality: 100,
        allowEditing: true
      })
      this.image = capturedPhoto.base64String;
       
      this.skin.image = this.image;
    } catch (e) {
      }
  }

  createSkin(){
    console.log("creating skin")
    console.log(this.skin)
    this.skinsService.createSkin(this.skin).subscribe(value => {
      console.log("done creating")
      this.image="";
      this.skin = new Skin();
      this.router.navigate(["my-skins"]);
    });
  }
}
