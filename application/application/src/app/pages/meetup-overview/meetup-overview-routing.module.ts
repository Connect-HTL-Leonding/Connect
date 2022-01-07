import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetupOverviewPage } from './meetup-overview.page';

const routes: Routes = [
  {
    path: '',
    component: MeetupOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetupOverviewPageRoutingModule {}
