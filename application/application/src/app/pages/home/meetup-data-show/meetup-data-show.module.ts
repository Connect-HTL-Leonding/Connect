import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetupDataShowPageRoutingModule } from './meetup-data-show-routing.module';

import { MeetupDataShowPage } from './meetup-data-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetupDataShowPageRoutingModule
  ],
  declarations: [MeetupDataShowPage]
})
export class MeetupDataShowPageModule {}
