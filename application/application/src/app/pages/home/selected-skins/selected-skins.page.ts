import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { MyskinsService } from 'src/app/api/myskins.service';

@Component({
  selector: 'app-selected-skins',
  templateUrl: './selected-skins.page.html',
  styleUrls: ['./selected-skins.page.scss'],
})
export class SelectedSkinsPage implements OnInit {

  scroll: boolean = false;


  constructor(public popoverController: PopoverController, public mySkinsService: MyskinsService) { }

  ngOnInit() {

    //Selektierte (Herz-Symbol) Skins werden geholt
    this.mySkinsService.getSelectedSkins().subscribe(data => {
      this.mySkinsService.selectedMySkins = data;
    })
  }

  myAtob(string) {
    return atob(string);
  }

  //User will, dass Skin auf der Map angezeigt wird, oder eben nicht mehr
  toggle(mySkin) {
    //DEBUGconsole.log(mySkin.showInMap)
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
          //DEBUGconsole.log('Error');
        }
      )
    });
  }


}
