import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service'
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';
import { MySkin } from '../model/myskin';
import { OAuthService } from 'angular-oauth2-oidc';
import { api } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Image } from '../model/image';


const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];
  public galleryPhotos: Photo[] = [];
  public profilePicture: Photo;
  public imgURL;
  http : HttpClient;

  constructor(private ps: ProfileService, http: HttpClient, private sanitizer: DomSanitizer) {
    this.http = http;
  }

  public async addNewToGallery() {
    // Take a photo

    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        quality: 100,
        allowEditing: true
      })

      let body = capturedPhoto.base64String;
      this.http.post(api.url + 'image/saveImage', body).subscribe(data=> {
      });

      if(this.photos.length >= 4) {
        this.photos.splice(-1,1);
      }
      
      this.photos.unshift({
        webviewPath: "data:image/png;base64," + capturedPhoto.base64String,
        id: ""
      });
    } catch (e) {
    }
  }

 
  public loadPfp() {
    const httpOptions = {
      responseType: 'text' as const
    };

    this.http.get(api.url + 'image/getPfp', httpOptions).subscribe(data => {
      this.imgURL = "data:image/png;base64," + data;
    })
  }


  public loadGalleryImages() {
    this.http.get(api.url + 'image/getImages').subscribe(data => {
      this.photos = [];
      var images : any = [];
    images = data;
    for(var i = 0;i<=images.length; i++) {
      if(images[i]!=null) {
        this.photos.unshift({
          webviewPath: "data:image/png;base64," + atob(atob(images[i].img)),
          id: images[i].Id
        }) 
       
      } else {
       
      }
      console.log(images);
      //for(let photo of this.photos) {
        //console.log(photo.id);
      //}
    }
    }) 
  }

  public loadFriendGalleryImages(id) {
    this.http.get(api.url + 'image/getFriendImages/' + id).subscribe(data => {
      this.photos = [];
      var images : any = [];
    images = data;
    for(var i = 0;i<=images.length; i++) {
      if(images[i]!=null) {
        this.photos.unshift({
          webviewPath: "data:image/png;base64," + atob(atob(images[i].img)),
          id: images[i].Id
        }) 
       
      } else {
       
      }
      console.log(images);
      //for(let photo of this.photos) {
        //console.log(photo.id);
      //}
    }
    }) 
  }

  public loadAllGalleryImages()  : Photo[] {
    this.galleryPhotos = [];
    this.http.get(api.url + 'image/getAllImages').subscribe(data => {
      var images : any = [];
    images = data;
    for(var i = 0;i<=images.length; i++) {
      if(images[i]!=null) {
        this.galleryPhotos.unshift({
          webviewPath: "data:image/png;base64," + atob(atob(images[i].img)),
          id: images[i].Id
         }) 
       
      } else {
       
      }
    }
   
    }) 
    return this.galleryPhotos;
  }



  

  public async updatePfp() {
    try {
      var base64data;
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Base64
      })
      

      // base64string into blob
     /* const rawData = atob(image.base64String);
      const bytes = new Array(rawData.length);
      for (var x = 0; x < rawData.length; x++) {
        bytes[x] = rawData.charCodeAt(x);
      }
      const arr = new Uint8Array(bytes);
      const blob = new Blob([arr], { type: 'image/png' });
      const formData = new FormData();
      formData.append('file',blob)
      console.log(image.base64String);
    */


      // blob into base64string
   /*   let mySrc;
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = (e:any) => {
        // result includes identifier 'data:image/png;base64,' plus the base64 data
        mySrc = reader.result;
        this.imgURL = mySrc
      } */

      console.log(image.base64String.toString())
      this.http.put(api.url + 'image/setPfp', image.base64String.toString()).subscribe(data => {
        this.ps.getUser().subscribe(data => {
          this.ps.user.custom = data;
          this.loadPfp();
        })

      })

    } catch (e) {
    }

  }



}



export interface Photo {
  webviewPath: string;
  id : string
}
