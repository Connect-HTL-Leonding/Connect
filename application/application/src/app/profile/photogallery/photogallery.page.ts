import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photogallery',
  templateUrl: './photogallery.page.html',
  styleUrls: ['./photogallery.page.scss'],
})
export class PhotogalleryPage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }
  
  dismissModal() {
    this.modalController.dismiss();
  }
}
