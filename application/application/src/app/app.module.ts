import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CoreModule } from './api/auth/core.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CoreModule.forRoot(),

    HttpClientJsonpModule,
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
