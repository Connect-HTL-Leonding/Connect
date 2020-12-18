import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkinselectionPage } from './skinselection.page';

const routes: Routes = [
  {
    path: '',
    component: SkinselectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkinselectionPageRoutingModule {}
