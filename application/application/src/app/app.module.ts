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

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { KeycloakAngularModule, KeycloakAuthGuard, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';
import { AppAuthGuard } from './api/auth/auth.guard';
import { AuthInterceptor } from './api/auth/authInterceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    HttpClientJsonpModule,
    HttpClientModule,
    OAuthModule.forRoot(),

    ReactiveFormsModule,
    FormsModule,

    KeycloakAngularModule
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
      useClass: AuthInterceptor, 
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
