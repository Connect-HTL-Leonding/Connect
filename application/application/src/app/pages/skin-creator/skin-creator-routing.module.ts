import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkinCreatorPage } from './skin-creator.page';

const routes: Routes = [
  {
    path: '',
    component: SkinCreatorPage
  },
  {
    path: 'skinsettings',
    loadChildren: () => import('./skinsettings/skinsettings.module').then( m => m.SkinsettingsPageModule)
  },
  {
    path: 'skinsettings',
    loadChildren: () => import('./skinsettings/skinsettings.module').then( m => m.SkinsettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkinCreatorPageRoutingModule {}
