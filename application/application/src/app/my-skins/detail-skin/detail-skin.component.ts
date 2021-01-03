import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { SkinsService } from 'src/app/api/skins.service';
import { Skin } from 'src/app/model/skin';

@Component({
  selector: 'detail-skin',
  templateUrl: './detail-skin.component.html',
  styleUrls: ['./detail-skin.component.scss'],
})
export class DetailSkinComponent implements OnInit {

  @Input() skin : Skin;
  
  constructor() { }

  ngOnInit() {
    console.log(this.skin)
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['skin']) {
        
    }
}

}
