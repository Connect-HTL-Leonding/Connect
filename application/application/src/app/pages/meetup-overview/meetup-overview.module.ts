import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetupOverviewPageRoutingModule } from './meetup-overview-routing.module';

import { MeetupOverviewPage } from './meetup-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetupOverviewPageRoutingModule
  ],
  declarations: [MeetupOverviewPage]
})
export class MeetupOverviewPageModule {}
