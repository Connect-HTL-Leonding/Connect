import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetUpManagerPage } from './meet-up-manager.page';

const routes: Routes = [
  {
    path: '',
    component: MeetUpManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetUpManagerPageRoutingModule {}
