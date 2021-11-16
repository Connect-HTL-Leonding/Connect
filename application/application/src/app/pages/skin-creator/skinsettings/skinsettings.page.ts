import { Component, OnInit } from '@angular/core';
import { SkinsService } from 'src/app/api/skins.service';

@Component({
  selector: 'app-skinsettings',
  templateUrl: './skinsettings.page.html',
  styleUrls: ['./skinsettings.page.scss'],
})
export class SkinsettingsPage implements OnInit {


    

  constructor(public skinsService: SkinsService) { }

  ngOnInit() {
  }

}
