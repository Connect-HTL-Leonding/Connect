import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  // Button
  @ViewChild('selectedBut', { static: false }) selectedRef: ElementRef;

  constructor(public router: Router, public ps: ProfileService) { }

  ngOnInit() {
    this.ps.getUser().subscribe(
      data => {
        console.log(data);
        this.ps.user.custom = data;
        console.log("westrzutqjhkgizfutetdzuz")
        console.log(this.ps.user)
        this.showTutorial();
      },
      error1 => {
        console.log('Error');
      }
    )
   }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['skin']) {
      console.log("fjldsj")
    }
  }

  //Event wenn Skin löschen
  removeSkin() {
    this.deleted.emit();
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
  showTutorial(){
    console.log(this.ps.user.custom.tutorialStage)
    if(this.ps.user.custom.tutorialStage == 5){
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
