import { Component, Input, OnInit } from '@angular/core';
import { Skin } from 'src/app/model/skin';

@Component({
  selector: 'detail-skin',
  templateUrl: './detail-skin.component.html',
  styleUrls: ['./detail-skin.component.scss'],
})
export class DetailSkinComponent implements OnInit {

  @Input() skin : Skin;
  
  constructor() { }

  ngOnInit() {}

}
