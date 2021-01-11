import { Injectable } from '@angular/core';
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';


const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];
  public profilePicture: Photo;
  public imgURL = "../../assets/defaultpfp.jpg";

  constructor() { }

  public async addNewToGallery() {
    // Take a photo
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        quality: 100,
        allowEditing: true
      })
      this.photos.unshift({
        filepath: "",
        webviewPath: capturedPhoto.webPath
      });
    } catch(e) {
    }
   

    // adding the captured photo to the photo array
   
  }

  public async loadPfp() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Uri
      })
      
      this.imgURL = image.webPath
    } catch(e) {
    }
   
  }
  
}

export interface Photo {
  filepath: string;
  webviewPath: string;
}
