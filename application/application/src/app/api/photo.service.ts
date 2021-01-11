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
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // adding the captured photo to the photo array
    this.photos.unshift({
      filepath: "",
      webviewPath: capturedPhoto.webPath
    });
  }

  public async loadPfp() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    
    this.imgURL = image.webPath
  }
  
}

export interface Photo {
  filepath: string;
  webviewPath: string;
}
