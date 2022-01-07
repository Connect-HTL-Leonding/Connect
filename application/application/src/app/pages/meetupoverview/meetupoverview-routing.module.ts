import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetupoverviewPage } from './meetupoverview.page';

const routes: Routes = [
  {
    path: '',
    component: MeetupoverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetupoverviewPageRoutingModule {}
