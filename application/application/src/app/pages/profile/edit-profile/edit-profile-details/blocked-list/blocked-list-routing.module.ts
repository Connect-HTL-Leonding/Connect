import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockedListPage } from './blocked-list.page';

const routes: Routes = [
  {
    path: '',
    component: BlockedListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockedListPageRoutingModule {}
