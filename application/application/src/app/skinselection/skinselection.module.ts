import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkinselectionPageRoutingModule } from './skinselection-routing.module';

import { SkinselectionPage } from './skinselection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkinselectionPageRoutingModule
  ],
  declarations: [SkinselectionPage]
})
export class SkinselectionPageModule {}
