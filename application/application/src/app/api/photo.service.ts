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
  public profilePicture: Photo;
  public imgURL;
  http : HttpClient;

  constructor(private ps: ProfileService, http: HttpClient, private oauthService: OAuthService, private sanitizer: DomSanitizer) {
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
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
      });
      this.http.post(api.url + 'image/saveImage', body, {headers: reqHeader}).subscribe(data=> {
      });

      if(this.photos.length = 4) {
        this.photos.splice(-1,1);
      }
      
      this.photos.unshift({
        filepath: "",
        webviewPath: "data:image/png;base64," + capturedPhoto.base64String,
        id: ""
      });
    } catch (e) {
    }



  }

 
  public loadPfp() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.oauthService.getAccessToken(),
      }),
      responseType: 'text' as const
    };

    this.http.get(api.url + 'image/getPfp',httpOptions).subscribe(data => {
      
      this.imgURL = "data:image/png;base64," +  data;
    })
  }


  public loadGalleryImages() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    this.http.get(api.url + 'image/getImages',{headers: reqHeader}).subscribe(data => {
      this.photos = [];
     /* var URLs : any = []
      URLs = data;
     for(var i = 0;i<=URLs.length; i++) {
      if(URLs[i]!=null) {
        this.photos.unshift({
          filepath: "",
          webviewPath: "data:image/png;base64," + URLs[i]
        }) 
       
      } else {
       
      }
    } */

    var images : any = [];
    images = data;
    for(var i = 0;i<=images.length; i++) {
      if(images[i]!=null) {
        this.photos.unshift({
          filepath: "",
          webviewPath: "data:image/png;base64," + atob(atob(images[i].img)),
          id: images.Id
        }) 
       
      } else {
       
      }
    }
    }) 
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

      
     
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.oauthService.getAccessToken(),
        
      });
      this.http.put(api.url + 'image/setPfp', image.base64String, { headers: reqHeader }).subscribe(data => {
        this.ps.getUser().subscribe(data => {
          this.ps.user = data;
          this.loadPfp();
        })

      })

    } catch (e) {
    }

  }



}



export interface Photo {
  filepath: string;
  webviewPath: string;
  id : string
}
