import { Component, Input, OnInit } from '@angular/core';
import { Skin } from 'src/app/model/skin';

@Component({
  selector: 'small-skin',
  templateUrl: './small-skin.component.html',
  styleUrls: ['./small-skin.component.scss'],
})
export class SmallSkinComponent implements OnInit {

  @Input() skin: Skin;

  constructor() { }

  ngOnInit() {}

}
