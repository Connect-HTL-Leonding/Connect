import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skin } from '../model/skin';

@Component({
  selector: 'app-skinselection-card',
  templateUrl: './skinselection-card.component.html',
  styleUrls: ['./skinselection-card.component.scss'],
})
export class SkinselectionCardComponent implements OnInit {
  @Input() skin: Skin;
  @Output() updated: EventEmitter<Skin> = new EventEmitter<Skin>();

  constructor() { }

  ngOnInit() { }

  updateSkin() {
    if(!this.skin.following){
    this.skin.following = true;
    this.updated.emit();
    }
  }

}
