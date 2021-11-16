import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkinsettingsPageRoutingModule } from './skinsettings-routing.module';

import { SkinsettingsPage } from './skinsettings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkinsettingsPageRoutingModule
  ],
  declarations: [SkinsettingsPage]
})
export class SkinsettingsPageModule {}
