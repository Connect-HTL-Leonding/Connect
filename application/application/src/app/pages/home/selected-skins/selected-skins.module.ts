import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedSkinsPageRoutingModule } from './selected-skins-routing.module';

import { SelectedSkinsPage } from './selected-skins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedSkinsPageRoutingModule
  ],
  declarations: [SelectedSkinsPage]
})
export class SelectedSkinsPageModule {}
