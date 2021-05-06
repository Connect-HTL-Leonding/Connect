import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetupPage } from './meetup.page';

const routes: Routes = [
  {
    path: '',
    component: MeetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetupPageRoutingModule {}
