import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySkinsPageRoutingModule } from './my-skins-routing.module';

import { MySkinsPage } from './my-skins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySkinsPageRoutingModule
  ],
  declarations: [MySkinsPage]
})
export class MySkinsPageModule {}
