import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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

imageReady = "";

  constructor() { }

  ngOnInit() {
    if(this.myskin.skin.image.startsWith("Li4")){
  this.imageReady=atob(this.myskin.skin.image);
    }else{
 this.imageReady='data:image/png;base64,'+this.myskin.skin.image;
    }
    
    console.log(this.current)
  }

}
