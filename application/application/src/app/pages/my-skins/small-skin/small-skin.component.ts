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

  constructor() { }

  ngOnInit() {
    console.log(this.current)
  }

}
