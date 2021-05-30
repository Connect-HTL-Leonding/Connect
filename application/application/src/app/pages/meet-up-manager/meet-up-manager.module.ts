import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetUpManagerPageRoutingModule } from './meet-up-manager-routing.module';

import { MeetUpManagerPage } from './meet-up-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetUpManagerPageRoutingModule
  ],
  declarations: [MeetUpManagerPage]
})
export class MeetUpManagerPageModule {}
