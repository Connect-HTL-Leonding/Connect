import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileDetailsPageRoutingModule } from './edit-profile-details-routing.module';

import { EditProfileDetailsPage } from './edit-profile-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileDetailsPageRoutingModule
  ],
  declarations: [EditProfileDetailsPage]
})
export class EditProfileDetailsPageModule {}
