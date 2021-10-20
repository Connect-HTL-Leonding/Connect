import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/core';

@Component({
  selector: 'app-skin-creator',
  templateUrl: './skin-creator.page.html',
  styleUrls: ['./skin-creator.page.scss'],
})
export class SkinCreatorPage implements OnInit {

  public image;
  constructor() { }

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
}
