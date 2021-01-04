import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileDetailsPage } from './edit-profile-details.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileDetailsPageRoutingModule {}
