import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oauthService: OAuthService
  ) {
    this.initializeApp();
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // optional
    this.oauthService.setupAutomaticSilentRefresh();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8010/auth/realms/connect',
  redirectUri: 'http://localhost:8100/login',
  clientId: 'connect-client',
  //responseType: 'code',
  scope: 'roles web-origins',
  showDebugInformation: true,
  requireHttps: false
};

export const api = {
  url: "http://localhost:8080/api/"
}
