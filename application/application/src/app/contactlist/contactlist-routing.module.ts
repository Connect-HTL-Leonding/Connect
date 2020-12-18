import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactlistPage } from './contactlist.page';

const routes: Routes = [
  {
    path: '',
    component: ContactlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactlistPageRoutingModule {}
