import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySkinsPageRoutingModule } from './my-skins-routing.module';

import { MySkinsPage } from './my-skins.page';
import { SmallSkinComponent } from './small-skin/small-skin.component';
import { DetailSkinComponent } from './detail-skin/detail-skin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySkinsPageRoutingModule
  ],
  declarations: [
    MySkinsPage,
    SmallSkinComponent,
    DetailSkinComponent
  ]
})
export class MySkinsPageModule {}
