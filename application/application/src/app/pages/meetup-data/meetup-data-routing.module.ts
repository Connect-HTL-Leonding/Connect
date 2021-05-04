import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetupDataPage } from './meetup-data.page';

const routes: Routes = [
  {
    path: '',
    component: MeetupDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetupDataPageRoutingModule {}
