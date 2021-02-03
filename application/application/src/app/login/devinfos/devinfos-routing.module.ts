import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevinfosPage } from './devinfos.page';

const routes: Routes = [
  {
    path: '',
    component: DevinfosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevinfosPageRoutingModule {}
