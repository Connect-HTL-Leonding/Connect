import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetupoverviewPageRoutingModule } from './meetupoverview-routing.module';

import { MeetupoverviewPage } from './meetupoverview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetupoverviewPageRoutingModule
  ],
  declarations: [MeetupoverviewPage]
})
export class MeetupoverviewPageModule {}
