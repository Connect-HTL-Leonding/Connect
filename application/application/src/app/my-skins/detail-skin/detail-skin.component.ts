import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { SkinsService } from 'src/app/api/skins.service';
import { Skin } from 'src/app/model/skin';

@Component({
  selector: 'detail-skin',
  templateUrl: './detail-skin.component.html',
  styleUrls: ['./detail-skin.component.scss'],
})
export class DetailSkinComponent implements OnInit {

  @Input() skin: Skin;
  @Output() updated: EventEmitter<Skin> = new EventEmitter<Skin>();

  constructor() { }

  ngOnInit() {
    //console.log(this.skin)
  }

  
  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['skin']) {
      console.log("fjldsj")
    }
  }
  

  //Event wenn Skin löschen
  removeSkin() {
    this.skin.following = false;
    this.updated.emit();
  }

  change(e){
    console.log(this.skin)
    this.updated.emit();
  }

}
