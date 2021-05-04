import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetupDataPageRoutingModule } from './meetup-data-routing.module';

import { MeetupDataPage } from './meetup-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetupDataPageRoutingModule
  ],
  declarations: [MeetupDataPage]
})
export class MeetupDataPageModule {}
