import { Component, Input, OnInit } from '@angular/core';
import { Skin } from '../model/skin';

@Component({
  selector: 'app-skinselection-card',
  templateUrl: './skinselection-card.component.html',
  styleUrls: ['./skinselection-card.component.scss'],
})
export class SkinselectionCardComponent implements OnInit {
@Input() skin :Skin;

  constructor() { }

  ngOnInit() {}

}
