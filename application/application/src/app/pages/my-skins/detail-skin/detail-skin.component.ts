import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(public router: Router, public ps: ProfileService) { }

  ngOnInit() { }

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

}
