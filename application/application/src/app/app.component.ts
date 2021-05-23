import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { LoginPage } from './pages/login/login.page';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ProfileService } from './api/profile.service';
import { HomePage } from './pages/home/home.page';
import { MeetupService } from './api/meetup.service';
import { ChatService } from './api/chat.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  private loginPage = false;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  websocket: WebSocket;
  wsUri;
  getMessage

  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public keycloak: KeycloakService,
    public ps: ProfileService,
    public ms: MeetupService,
    public cs: ChatService
  ) {
    this.initializeApp();
    //this.oauthService.configure(authCodeFlowConfig);
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // optional
    //this.oauthService.setupAutomaticSilentRefresh();

    this.getMessage = this.cs.chatSendUpdateNotify.subscribe(value => {
      this.doSend(value);
    });
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
      this.ps.getUser().subscribe(data => {
        this.ps.user.custom = data;
        this.wsUri = 'ws://localhost:8080/websocket/' + this.ps.user.id;
      this.doConnect();
      })
      
    }
  }

  

  doConnect() {
    this.websocket = new WebSocket(this.wsUri);
    this.websocket.onmessage = (evt) => {
      var msg:string = evt.data;
      var message = msg.split(":");
      switch(message[0]) {
        case("meetupAccepted"): this.ms.meetupObservable.next(message[1]);
        break;
        case("chatMessage"): this.cs.updateChatObservable.next(message[1]);
                             if(!this.cs.inRoom || this.cs.currentRoom != message[1]) {
                               alert("messageify in roomify: " + message[1]);
                             }
        break;
        case("positionUpdate"):
      }
      
    }

    


    /*
    this.websocket.onopen = (evt) => this.receiveText += 'Websocket connected\n';
    
    this.websocket.onerror = (evt) => this.receiveText += 'Error\n';
    this.websocket.onclose = (evt) => this.receiveText += 'Websocket closed\n';
    */
  }
  
  doSend(msg) {
    this.websocket.send(msg);
  }

}

//Zentrale Variablen
export const api = {
  url: "http://localhost:8080/api/",
  short: "http://localhost:8080/",
  ip: "http://localhost",
  ws: "ws://localhost:8080"
}
