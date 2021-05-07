import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetupDataShowPage } from './meetup-data-show.page';

const routes: Routes = [
  {
    path: '',
    component: MeetupDataShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetupDataShowPageRoutingModule {}
