import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Showcaser from 'showcaser';
import { ProfileService } from 'src/app/api/profile.service';
import { CategoryService } from '../../api/category.service';
import { MyskinsService } from '../../api/myskins.service';
import { SkinsService } from '../../api/skins.service';
import { Category } from '../../model/category';
import { MySkin } from '../../model/myskin';
import { Skin } from '../../model/skin';

@Component({
  selector: 'app-skinselection',
  templateUrl: './skinselection.page.html',
  styleUrls: ['./skinselection.page.scss'],
})
export class SkinselectionPage implements OnInit {

  skinsService: SkinsService;
  categoryService: CategoryService;
  mySkinService : MyskinsService

  currCat: Category;
  searchString = "";

  @ViewChild('skinSelection', { static: false }) skinSelectionRef: ElementRef;

  constructor(public ps: ProfileService, ss: SkinsService, cs: CategoryService, ms: MyskinsService, public modalCtrl: ModalController) {
    this.skinsService = ss;
    this.categoryService = cs;
    this.mySkinService = ms;
  }

  check(skin) {
    if (this.currCat) {
      var index = -1;

      //important
      var cat_title = this.currCat.title

      var filteredObj = skin.categories.find(function (item, i) {
        if (item.title === cat_title) {
          index = i;
          return i;
        }
      });

      if (index !== -1 && (skin.title.toUpperCase().startsWith(this.searchString.toUpperCase().trim()) || this.searchString.trim() === '')) {
        return true;
      } else {
        return false;
      }
    }
  }

  ngOnInit() {
    console.log(this.skinsService);

    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryService.categories = data;
        this.skinsService.getSkins().subscribe(
          data => {
            this.skinsService.skins = data;
            console.log(this.skinsService.skins);
            this.setCurrCat(this.categoryService.findCategory("All"));
          },
          error1 => {
            console.log('Error');
          }
        )
      },
      error1 => {
        console.log('Error');
      }
    )
    this.ps.getUser().subscribe(
      data => {
        console.log(data);
        this.ps.user.custom = data;
        console.log("westrzutqjhkgizfutetdzuz")
        console.log(this.ps.user)
        this.showTutorial();
      },
      error1 => {
        console.log('Error');
      }
    )
  }

  showTutorial(){
    console.log("123111111111111111111111111111111111111111111111" + this.ps.user.custom.tutorialStage);
    if (this.ps.user.custom.tutorialStage == 4) {
      Showcaser.showcase("Das hier sind deine Skins", this.skinSelectionRef.nativeElement, {
        shape: "rectangle",
        buttonText: "Ok!",
        position: {
          horizontal: "center",
          vertical: "middle"
        },
        allowSkip: false,
        close: () => {
          this.ps.updateUserTutorial(this.ps.user).subscribe(data => {
            console.log("MySKINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
          });
        }
      });
    }
  }

  setCurrCat(c: Category) {
    console.log("Cat: " + c)
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
          console.log('Error');
        }
      )
    });;
  }

  addToMySkin(skin) {
    this.mySkinService.addToMySkins(skin).subscribe( data => {
      //console.log(data);
      var newSkin = data as MySkin;
      
      this.skinsService.getSkins().subscribe(
        data => {
          this.skinsService.skins = data;
          this.dismissModal(newSkin);
        },
        error1 => {
          console.log('Error');
        }
      )
    })
  }

}
