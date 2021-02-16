import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-photogallery',
  templateUrl: './photogallery.page.html',
  styleUrls: ['./photogallery.page.scss'],
})
export class PhotogalleryPage implements OnInit {

  
  pathToAssets = "../../assets/test_for_photogallery/";
  images = [this.pathToAssets + "cat.jpg",
   this.pathToAssets + "iceland.jpg",
    this.pathToAssets + "mountains.jpg",
     this.pathToAssets + "reflection.jpg",
      this.pathToAssets + "silhouette.jpg"];

  constructor(public modalController:ModalController, private PhotoViewer: PhotoViewer) { }

  ngOnInit() {
  }

  test() {
    this.PhotoViewer.show(this.pathToAssets + "cat.jpg");
  }
  
  dismissModal() {
    this.modalController.dismiss();
  }
}
