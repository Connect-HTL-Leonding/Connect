import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { OAuthModule } from 'angular-oauth2-oidc'
import { AppAuthGuard } from './api/auth/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AppAuthGuard]
  }, {
    path: 'skinselection',
    loadChildren: () => import('./pages/skinselection/skinselection.module').then(m => m.SkinselectionPageModule),
    canActivate: [AppAuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AppAuthGuard]

  },
  {
    path: 'my-skins',
    loadChildren: () => import('./pages/my-skins/my-skins.module').then(m => m.MySkinsPageModule),
    canActivate: [AppAuthGuard]

  },
  {
    path: 'contactlist',
    loadChildren: () => import('./pages/contactlist/contactlist.module').then(m => m.ContactlistPageModule),
    canActivate: [AppAuthGuard]

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/profile/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule),
    canActivate: [AppAuthGuard]

  },
  {

    path: 'edit-profile-details',
    loadChildren: () => import('./pages/profile/edit-profile/edit-profile-details/edit-profile-details.module').then(m => m.EditProfileDetailsPageModule),
    canActivate: [AppAuthGuard]

  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule),
    canActivate: [AppAuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule),
    canActivate: [AppAuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
