import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySkinsPage } from './my-skins.page';

const routes: Routes = [
  {
    path: '',
    component: MySkinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySkinsPageRoutingModule {}
