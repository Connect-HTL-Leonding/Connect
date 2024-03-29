import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { api, AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient, HttpClientJsonpModule, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { OAuthModule } from 'angular-oauth2-oidc';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { from } from 'rxjs';
import { AppAuthGuard } from './api/auth/auth.guard';
import { HomePage } from './pages/home/home.page';
import { HomePageModule } from './pages/home/home.module';
import { HttpFilter } from './api/auth/httpFilter';
import { HttpErrorFilter } from './api/auth/httpErrorFilter';


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    HttpClientJsonpModule,
    HttpClientModule,
    OAuthModule.forRoot(),

    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoViewer,
    AppAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorFilter,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpFilter,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
