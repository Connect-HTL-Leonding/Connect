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
        resultType: CameraResultType.Uri,
        quality: 100,
        allowEditing: true
      })
      this.photos.unshift({
        filepath: "",
        webviewPath: capturedPhoto.webPath
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
}
