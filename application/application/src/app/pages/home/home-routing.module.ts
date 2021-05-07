import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,

  },
  {
    path: 'selected-skins',
    loadChildren: () => import('./selected-skins/selected-skins.module').then( m => m.SelectedSkinsPageModule)
  },  {
    path: 'meetup-data-show',
    loadChildren: () => import('./meetup-data-show/meetup-data-show.module').then( m => m.MeetupDataShowPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
