import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import Showcaser from 'showcaser';
import { ProfileService } from 'src/app/api/profile.service';
import { CategoryService } from '../../api/category.service';
import { MyskinsService } from '../../api/myskins.service';
import { SkinsService } from '../../api/skins.service';
import { Category } from '../../model/category';
import { MySkin } from '../../model/myskin';
import { Skin } from '../../model/skin';
import { Router } from '@angular/router';
import { SkinsettingsPage } from '../skin-creator/skinsettings/skinsettings.page';
import { tutorial } from 'src/app/app.component';


@Component({
  selector: 'app-skinselection',
  templateUrl: './skinselection.page.html',
  styleUrls: ['./skinselection.page.scss'],
})
export class SkinselectionPage implements OnInit {

  skinsService: SkinsService;
  categoryService: CategoryService;
  mySkinService: MyskinsService;

  currCat: Category;
  searchString = "";

  allCategory = new Category(0,'All');

  @ViewChild('skinSelection', { static: false }) skinSelectionRef: ElementRef;

  constructor(private router: Router, public ps: ProfileService, ss: SkinsService, cs: CategoryService, ms: MyskinsService, public popoverController: PopoverController, public modalCtrl: ModalController) {
    this.skinsService = ss;
    this.categoryService = cs;
    this.mySkinService = ms;
  }

  check(skin) {
    if (this.currCat ) {

      var index = -1;

      //important
      var cat_title = this.currCat.title

      var filteredObj = skin.categories.find(function (item, i) {
        if (item.title === cat_title) {
          index = i;
          return i;
        }
      });

      if ((index !== -1 || this.currCat.title=="All") && (skin.title.toUpperCase().startsWith(this.searchString.toUpperCase().trim()) || this.searchString.trim() === '') && ((this.skinsService.showVerified == true && skin.verified == true) || !this.skinsService.showVerified) && ((this.skinsService.showMature == false && skin.mature == false) || this.skinsService.showMature)) {
        return true;
      } else {
        return false;
      }


    } 
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SkinsettingsPage,
      cssClass: 'no-overflow',
      event: ev,
      translucent: true
    });
    
    return await popover.present();
  }

  ngOnInit() {
    //DEBUGconsole.log(this.skinsService);

    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryService.categories = data;
        this.skinsService.getSkins().subscribe(
          data => {
            this.skinsService.skins = data;
            //DEBUGconsole.log(this.skinsService.skins);
            this.setCurrCat(this.categoryService.findCategory("All"));
          },
          error1 => {
            //DEBUGconsole.log('Error');
          }
        )
      },
      error1 => {
        //DEBUGconsole.log('Error');
      }
    )
    this.ps.getUser().add(
      () => {
        //DEBUGconsole.log("westrzutqjhkgizfutetdzuz")
        //DEBUGconsole.log(this.ps.user)
        this.showTutorial();
      }
    )
  }

  showTutorial() {
    //DEBUGconsole.log("123111111111111111111111111111111111111111111111" + this.ps.user.custom.tutorialStage);
    if (tutorial.active && this.ps.user.custom.tutorialStage == 4) {
      Showcaser.showcase("Hier findest du alle verfügbaren Skins. Wähl am besten gleich mal einen aus der zu dir passt!", null, {
        shape: "rectangle",
        buttonText: "Ok!",
        position: {
          horizontal: "center",
          vertical: "middle"
        },
        allowSkip: false,
        close: () => {
          this.ps.updateUserTutorial(this.ps.user.custom).subscribe(data => {
            //DEBUGconsole.log("MySKINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
          });
        }
      });
    }
  }

  

  setCurrCat(c: Category) {
    //DEBUGconsole.log("Cat: " + c)
    this.currCat = c;
  }

  dismissModal(newSkin) {
    this.modalCtrl.dismiss(newSkin);
  }

  updateSkin(skin) {

    this.skinsService.updateSkin(skin).subscribe(data => {
      this.skinsService.getSkins().subscribe(
        data => {
          this.skinsService.skins = data;
        },
        error1 => {
          //DEBUGconsole.log('Error');
        }
      )
    });;
  }

  addToMySkin(skin) {
    this.mySkinService.addToMySkins(skin).subscribe(data => {
      ////DEBUGconsole.log(data);
      var newSkin = data as MySkin;

      this.skinsService.getSkins().subscribe(
        data => {
          this.skinsService.skins = data;
          this.dismissModal(newSkin);
        },
        error1 => {
          //DEBUGconsole.log('Error');
        }
      )
    })
    
  }

}
