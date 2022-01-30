import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Showcaser from 'showcaser';
import { ProfileService } from 'src/app/api/profile.service';
import { SkinsService } from 'src/app/api/skins.service';
import { MySkin } from 'src/app/model/myskin';
import { Skin } from 'src/app/model/skin';

@Component({
  selector: 'detail-skin',
  templateUrl: './detail-skin.component.html',
  styleUrls: ['./detail-skin.component.scss'],
})
export class DetailSkinComponent implements OnInit {

  @Input() myskin: MySkin;
  @Output() updated: EventEmitter<Skin> = new EventEmitter<Skin>();
  @Output() deleted: EventEmitter<Skin> = new EventEmitter<Skin>();

  imageReady="";

  // Button
  @ViewChild('selectedBut', { static: false }) selectedRef: ElementRef;

  constructor(public router: Router, public ps: ProfileService, public alertController: AlertController) { }

  ngOnInit() {

    if(this.myskin.skin.image.startsWith("Li4")){
  this.imageReady=atob(this.myskin.skin.image);
    }else{
 this.imageReady='data:image/png;base64,'+this.myskin.skin.image;
    }

    this.ps.getUser().add(
      () => {
        console.log("westrzutqjhkgizfutetdzuz")
        console.log(this.ps.user.custom.id)
        this.showTutorial();
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['skin']) {
    
      console.log("fjldsj")
    }
  }

  myAtob(string){
    return atob(string);
  }

  async presentAlertConfirm(myskin : MySkin) {
    const alert = await this.alertController.create({
      cssClass: 'confirm-delete',
      header: 'Achtung!',
      message: 'Willst du wirklich <strong>' + myskin.skin.title + '</strong> <strong>löschen</strong>?<br>Alle Daten sind danach verloren!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Confirm Cancel: yes');
          }
        }, {
          text: 'Delete',
          cssClass: 'secondary',
          handler: () => {
            console.log('Delete Okay');
            this.deleted.emit();
          }
        }
      ]
    });

    await alert.present();
  }

  //Event wenn Skin löschen
  removeSkin() {
    this.presentAlertConfirm(this.myskin);
  }

  //Change-Event
  change(e) {
    //console.log(this.skin)
    this.updated.emit();
  }

  //Select-Event
  selected() {
    this.myskin.selected = !this.myskin.selected;
    this.updated.emit();
  }
  showTutorial() {
    console.log(this.ps.user.custom.tutorialStage)
    if (this.ps.user.custom.tutorialStage == 5) {
      console.log("Bruhhh")
      Showcaser.showcase("Klick auf einen Skin und mach ihn dann mit dem Herz zum Favoriten", this.selectedRef.nativeElement, {
        shape: "circle",
        buttonText: "Ok!",
        position: {
          horizontal: "left",
          vertical: "middle"
        },
        allowSkip: false,
        close: () => {
          this.ps.updateUserTutorial(this.ps.user.custom).subscribe(data => {
            console.log("finished")
          });
        }
      });
    }
  }

}
