import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetupPageRoutingModule } from './meetup-routing.module';

import { MeetupPage } from './meetup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetupPageRoutingModule
  ],
  declarations: [MeetupPage]
})
export class MeetupPageModule {}
