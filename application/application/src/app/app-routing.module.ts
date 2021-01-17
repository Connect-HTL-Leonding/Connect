import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { OAuthModule } from 'angular-oauth2-oidc'
import { AuthGuard } from './api/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  }, {
    path: 'skinselection',
    loadChildren: () => import('./skinselection/skinselection.module').then(m => m.SkinselectionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'my-skins',
    loadChildren: () => import('./my-skins/my-skins.module').then(m => m.MySkinsPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'contactlist',
    loadChildren: () => import('./contactlist/contactlist.module').then(m => m.ContactlistPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule),
    canActivate: [AuthGuard]

  },
  {

    path: 'edit-profile-details',
    loadChildren: () => import('./edit-profile-details/edit-profile-details.module').then(m => m.EditProfileDetailsPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
