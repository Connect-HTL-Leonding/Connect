import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { PhotoService } from 'src/app/api/photo.service';

@Component({
  selector: 'app-photogallery',
  templateUrl: './photogallery.page.html',
  styleUrls: ['./photogallery.page.scss'],
})
export class PhotogalleryPage implements OnInit {

  public photos: Photo[] = [];
  pathToAssets = "../../assets/test_for_photogallery/";
  images = [this.pathToAssets + "cat.jpg",
   this.pathToAssets + "iceland.jpg",
    this.pathToAssets + "mountains.jpg",
     this.pathToAssets + "reflection.jpg",
      this.pathToAssets + "silhouette.jpg"];

  constructor(public modalController:ModalController, private PhotoViewer: PhotoViewer, public photoService : PhotoService) { }

  loadImages() {
    this.photos = this.photoService.loadAllGalleryImages();
  }

  ngOnInit() {
    this.loadImages();
  }

  show(URL : string) {
    this.PhotoViewer.show(URL);
  }
  
  dismissModal() {
    this.modalController.dismiss();
  }
}

export interface Photo {
  webviewPath: string;
  id : string
}
