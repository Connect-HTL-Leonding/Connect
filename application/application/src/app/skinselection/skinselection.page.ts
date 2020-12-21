import { Component, OnInit } from '@angular/core';
import { SkinsService } from '../api/skins.service';

@Component({
  selector: 'app-skinselection',
  templateUrl: './skinselection.page.html',
  styleUrls: ['./skinselection.page.scss'],
})
export class SkinselectionPage implements OnInit {

  skinsService;

  constructor(ss: SkinsService) {
    this.skinsService = ss;
   }

  

  ngOnInit() {
  }

}
