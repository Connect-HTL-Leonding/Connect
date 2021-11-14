import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkinsService } from '../../../api/skins.service';
import { MySkin } from '../../../model/myskin';
import { Skin } from '../../../model/skin';

@Component({
  selector: 'app-skinselection-card',
  templateUrl: './skinselection-card.component.html',
  styleUrls: ['./skinselection-card.component.scss'],
})
export class SkinselectionCardComponent implements OnInit {
  @Input() skin: Skin;
  following: boolean;
  @Output() added: EventEmitter<Skin> = new EventEmitter<Skin>();

  imageReady="";

  constructor(public s: SkinsService) {
    
   }

  ngOnInit() { 
    if(this.skin.image.startsWith("Li4")){
  this.imageReady=atob(this.skin.image);
    }else{
 this.imageReady='data:image/png;base64,'+this.skin.image;
    }
   
    console.log(this.imageReady);
    this.checkFollowing();
  }

  addToMySkin() {
    if (!this.following) {
      this.added.emit();
    }
  }

  checkFollowing() {
    if (this.following == null) {
      this.s.check(this.skin.id).subscribe(data => {
        var ms: MySkin = data;
        console.log(ms);
        if(ms){
          this.following = true;
        }else {
          this.following = false;
        }
      })
    }else {
      this.following = false;
    }

  }

}
