import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GhostmodePageRoutingModule } from './ghostmode-routing.module';

import { GhostmodePage } from './ghostmode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GhostmodePageRoutingModule
  ],
  declarations: [GhostmodePage]
})
export class GhostmodePageModule {}
