import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkinCreatorPage } from './skin-creator.page';

const routes: Routes = [
  {
    path: '',
    component: SkinCreatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkinCreatorPageRoutingModule {}
