import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkinCreatorPageRoutingModule } from './skin-creator-routing.module';

import { SkinCreatorPage } from './skin-creator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkinCreatorPageRoutingModule
  ],
  declarations: [SkinCreatorPage]
})
export class SkinCreatorPageModule {}
