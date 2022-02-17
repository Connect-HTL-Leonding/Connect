import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GhostmodePage } from './ghostmode.page';

const routes: Routes = [
  {
    path: '',
    component: GhostmodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GhostmodePageRoutingModule {}
