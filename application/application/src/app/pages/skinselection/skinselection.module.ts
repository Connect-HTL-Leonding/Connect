import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkinselectionPageRoutingModule } from './skinselection-routing.module';

import { SkinselectionPage } from './skinselection.page';

import { SkinselectionCardComponent } from './skinselection-card/skinselection-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkinselectionPageRoutingModule
  ],
  declarations: [SkinselectionPage,
    SkinselectionCardComponent]
})
export class SkinselectionPageModule {}
