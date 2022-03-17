import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PhotoService } from 'src/app/api/photo.service';
import { SkinsService } from 'src/app/api/skins.service';
import { MySkin } from 'src/app/model/myskin';
import { Skin } from 'src/app/model/skin';

@Component({
  selector: 'small-skin',
  templateUrl: './small-skin.component.html',
  styleUrls: ['./small-skin.component.scss'],
})
export class SmallSkinComponent implements OnInit {

  @Input() myskin: MySkin;
  @Input() current: MySkin;
  @Input() selected: MySkin;

imageReady;

  constructor(public skinService : SkinsService, public photoService : PhotoService) { }

  ngOnInit() {
    
    this.skinService.getSkinImage(this.myskin.skin.id).subscribe(data=> {
      if(this.myskin.skin.withPath) {
        this.imageReady=atob(this.myskin.skin.image);
      } else {
        this.imageReady = this.photoService.DOMSanitizer(data);
      }
    })
    //DEBUGconsole.log(this.current)
  }

}