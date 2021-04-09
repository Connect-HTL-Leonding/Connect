import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { LoginPage } from './pages/login/login.page';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  private loginPage = false;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public keycloak: KeycloakService
  ) {
    this.initializeApp();
    //this.oauthService.configure(authCodeFlowConfig);
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // optional
    //this.oauthService.setupAutomaticSilentRefresh();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  
  //Login bei Seiten-laden
  public async ngOnInit() {
    //überprüfen, ob eingeloggt
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    //wenn eingeloggt, dann Nutzerprofil laden
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      console.log(this.userProfile)
    }
  }
  
}

//Zentrale Variablen
export const api = {
  url: "http://localhost:8080/api/",
  short: "http://localhost:8080/",
  ip: "http://localhost"
}
