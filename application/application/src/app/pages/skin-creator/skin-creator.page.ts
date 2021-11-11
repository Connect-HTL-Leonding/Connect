import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/core';
import { Skin } from 'src/app/model/skin';
import { SkinsService } from 'src/app/api/skins.service';

@Component({
  selector: 'app-skin-creator',
  templateUrl: './skin-creator.page.html',
  styleUrls: ['./skin-creator.page.scss'],
})
export class SkinCreatorPage implements OnInit {

  public image;
  public skin;
  
  constructor(public skinsService: SkinsService) {
    this.skin = new Skin();
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
    } catch (e) {
      }
  }

  createSkin(){

    console.log(this.skin)
    this.skinsService.createSkin(this.skin);
  }
}
