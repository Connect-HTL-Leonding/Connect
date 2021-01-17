import { Component, OnInit } from '@angular/core';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private oauthService: OAuthService) {}

  login() {
    console.log('calling login...');
    
    /*
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin().then(()=> {
        if(!this.oauthService.hasValidAccessToken()){
          this.oauthService.initImplicitFlow();
        }else {
          const claims = this.oauthService.getIdentityClaims();
          console.log(claims);
        }
      })
    })
    */
    
    this.oauthService.initLoginFlow();
  }

  logout() {
    
    this.oauthService.logOut();
  }

  isLoggedIn() {
    console.log(this.oauthService.hasValidIdToken())
    //console.log(this.oauthService.hasValidIdToken())
    //console.log(this.oauthService.checkSession())
    //this.oauthService.loadDiscoveryDocument
    return this.oauthService.hasValidIdToken();

    /*
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin().then(()=> {
        return this.oauthService.hasValidIdToken();
      })
    })
    */
  }

  givenName() {
    if (!this.isLoggedIn()) {
      return '';
    }
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims.given_name;
  }

}
