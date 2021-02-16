import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevinfosPageRoutingModule } from './devinfos-routing.module';

import { DevinfosPage } from './devinfos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevinfosPageRoutingModule
  ],
  declarations: [DevinfosPage]
})
export class DevinfosPageModule {}
