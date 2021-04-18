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

//Keycloak initialisieren
function initializeKeycloak(keycloak: KeycloakService, http: HttpClient) {
  return async () => {

    //keycloak.getKeycloakInstance().clientSecret = "9c9838ca-9311-473f-8c7a-d5cef6de1a3e"
    //keycloak.updateToken(180)
    
    from(keycloak.keycloakEvents$).subscribe(event => {
      console.log(event.type)

      //Event-Type 4 --> login succesful (besser gehts nicht sry)
      if (event.type == 4) {
        console.log("success")
        var userProfile = keycloak.loadUserProfile().then(data => {
          console.log(keycloak.getKeycloakInstance().subject)
          var subject = {
            subject : keycloak.getKeycloakInstance().subject
          }

          
          const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + keycloak.getToken()
          });
          //Nutzer erstellen, wenn login erfolgreich (eigene db)
          http.get<any>(api.short + 'user/login', { headers: reqHeader }).subscribe(data => {
            console.log(data);
          })
        });


      }
    })

    

    //Keycloak-Config-Daten
    return await keycloak.init({
      config: {
        url: 'http://localhost:8010/auth',
        realm: 'connect',
        clientId: 'connect-client'
      },
      initOptions: {
//        adapter: "cordova-native",
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframeInterval: 100
        //onLoad: 'login-required',
        //checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/assets', '/clients/public']
    });
  }
}


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
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, HttpClient],
    },
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoViewer,
    AppAuthGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
