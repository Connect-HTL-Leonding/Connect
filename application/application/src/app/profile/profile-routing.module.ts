import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'photogallery',
    loadChildren: () => import('./photogallery/photogallery.module').then( m => m.PhotogalleryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
