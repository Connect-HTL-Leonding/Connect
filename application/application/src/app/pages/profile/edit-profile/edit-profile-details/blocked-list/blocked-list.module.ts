import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockedListPageRoutingModule } from './blocked-list-routing.module';

import { BlockedListPage } from './blocked-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockedListPageRoutingModule
  ],
  declarations: [BlockedListPage]
})
export class BlockedListPageModule {}
