import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkinsettingsPage } from './skinsettings.page';

const routes: Routes = [
  {
    path: '',
    component: SkinsettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkinsettingsPageRoutingModule {}
