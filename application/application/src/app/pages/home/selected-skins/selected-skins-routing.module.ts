import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedSkinsPage } from './selected-skins.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedSkinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedSkinsPageRoutingModule {}
