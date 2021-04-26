import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { MyskinsService } from 'src/app/api/myskins.service';

@Component({
  selector: 'app-selected-skins',
  templateUrl: './selected-skins.page.html',
  styleUrls: ['./selected-skins.page.scss'],
})
export class SelectedSkinsPage implements OnInit {

  constructor(public popoverController: PopoverController, public mySkinsService: MyskinsService) { }

  ngOnInit() {
    this.mySkinsService.getSelectedSkins().subscribe(data => {
      this.mySkinsService.selectedMySkins = data;
    })
  }

  toggle(mySkin){
    console.log(mySkin.showInMap)
    this.mySkinsService.updateSkin(mySkin).subscribe(data => {
      //nach unpdate erneutes getAll
      this.mySkinsService.getMySkins().subscribe(
        data => {
          
          this.mySkinsService.myskins = data;
          this.mySkinsService.getCurrentSkin();


          this.mySkinsService.getMapSkins().subscribe(
            data => {
              this.mySkinsService.mapSkins = data;
            });
        },
        error1 => {
          console.log('Error');
        }
      )
    });
  }


}
