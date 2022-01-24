import { Component, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { LoginPage } from './pages/login/login.page';
import { Router } from '@angular/router';
import { KeycloakProfile } from 'keycloak-js';
import { ProfileService } from './api/profile.service';
import { HomePage } from './pages/home/home.page';
import { MeetupService } from './api/meetup.service';
import { ChatService } from './api/chat.service';
import { Location } from '@angular/common';
import { ContactlistService } from './api/contactlist.service';
import { KeycloakService } from './api/auth/keycloak.service';
import { switchMap } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';
import { FriendshipService } from './api/friendship.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  websocket: WebSocket;
  wsUri;
  getMessage;
  newMeetup;
  positionUpdate;
  updateContactlist;
  block;



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public keycloak: KeycloakService,
    public ps: ProfileService,
    public ms: MeetupService,
    public cs: ChatService,
    public fs: FriendshipService,
    public contactlistService: ContactlistService,
    public toastController: ToastController
  ) {
    this.initializeApp();
    //this.oauthService.configure(authCodeFlowConfig);
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // optional
    //this.oauthService.setupAutomaticSilentRefresh();

    this.block = this.fs.blockNotify.subscribe(value => {
      this.doSend(value);
    })

    this.getMessage = this.cs.chatSendUpdateNotify.subscribe(value => {
      this.doSend(value);
    });

    this.updateContactlist = this.contactlistService.contactlistNotify.subscribe(value => {
      this.doSend(value);
    });

    this.newMeetup = this.ms.createMeetupUpdateNotify.subscribe(value => {
      this.doSend(value);
    });

    this.positionUpdate = this.ms.positionNotify.subscribe(value => {
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
  public ngOnInit() {
    console.log("CHECK")
    //überprüfen, ob eingeloggt
    console.log(this.keycloak.userid)
    if (this.keycloak.userid === undefined || !this.keycloak.userid || !this.keycloak.userid.length) {
      this.keycloak.refresh().subscribe(token => {
        this.keycloak.authenticated = true;

        try {
          let tokenInfo = jwt_decode(token["access_token"])

          this.keycloak.userid = tokenInfo["sub"];
          this.keycloak.setSession(token);
          this.makeWebsocket()
        }
        catch (err) {
          console.error(err)
        }
      })
    } else {

      this.makeWebsocket()
    }
  }

  makeWebsocket() {
    if (this.keycloak.userid !== undefined && this.keycloak.userid && this.keycloak.userid.length) {
      this.ps.getUser().add(() => {
        if (this.keycloak.userid) {
          this.wsUri = api.ws + '/websocket/' + this.keycloak.userid;
          console.log(this.wsUri)
          this.doConnect();
        }
      })
    }
  }



  doConnect() {
    this.websocket = new WebSocket(this.wsUri);
    this.websocket.onmessage = (evt) => {
      var msg: string = evt.data;
      var message = msg.split(":");
      switch (message[0]) {
        case ("meetupAccepted"): this.ms.meetupObservable.next(message[1]);
          this.ms.showMeetupObservable.next(message[1]);
          break;
        case ("chatMessage"):
          console.log(msg);
          this.cs.updateChatObservable.next(message[1]);
          if (!this.cs.inRoom || this.cs.currentRoom != message[1]) {
            this.contactlistService.getOtherUser(message[1]).subscribe(data => {
              if (data) {
                this.ps.findFriendUser(data.id).subscribe(data => {
                  this.presentToastWithOptions("neue Nachricht von " + data["username"]);
                })
              }
            })
          }
          break;
        case ("positionUpdate"): console.log(message[1]); this.ms.showPositionObservable.next(message[1]);
          break;
        case ("newMeetup"): console.log(message[1]); this.ms.showMeetupObservable.next(message[1]);
          if (!this.cs.inRoom || this.cs.currentRoom != message[1]) {
            this.contactlistService.getOtherUser(message[1]).subscribe(data => {
              this.ps.findFriendUser(data.id).subscribe(data => {
                this.presentToastWithOptions(data["username"] + " will sich treffen!");
              })
            })
          }
          break;
        case ("acceptMeetup"): this.ms.showMeetupObservable.next(message[1]);
          if (!this.cs.inRoom || this.cs.currentRoom != message[1]) {
            this.contactlistService.getOtherUser(message[1]).subscribe(data => {
              this.ps.findFriendUser(data.id).subscribe(data => {
                this.presentToastWithOptions(data["username"] + " hat dein Meeting akzeptiert!");
              })
            })
          }
          break;
        case ("declineMeetup"): this.ms.showMeetupObservable.next(message[1]);
          if (!this.cs.inRoom || this.cs.currentRoom != message[1]) {
            this.contactlistService.getOtherUser(message[1]).subscribe(data => {
              this.ps.findFriendUser(data.id).subscribe(data => {
                this.presentToastWithOptions(data["username"] + " hat dein Meeting abgelehnt!");
              })
            })
          }
          break;
        case ("contactListUpdate"): this.contactlistService.contactlistUpdateObservable.next("update");
          break;
        case ("newConnect"): this.contactlistService.contactlistUpdateObservable.next("connect");
          console.log(message[2]);
          this.ps.findFriendUser(message[2]).subscribe(data => {
            this.presentToastWithOptions(data["username"] + " hat sich mit dir connected!");
          })
          break;
        case ("blocked"): this.fs.blockedUpdateObservable.next("blocked");
      }

    }





    this.websocket.onerror = (evt) => {
      console.log(evt.AT_TARGET);
    };
    /*
    this.websocket.onopen = (evt) => this.receiveText += 'Websocket connected\n';
    
    
    this.websocket.onclose = (evt) => this.receiveText += 'Websocket closed\n';
    */
  }

  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      header: "Message",
      message: msg,
      position: 'top',
      duration: 2000,
      buttons: [
        {
          side: 'end',
          text: "Chat now",
          handler: () => {
            this.router.navigate(["contactlist"])
          }
        }
      ]
    });
    toast.present();
  }

  doSend(msg) {
    this.websocket.send(msg);
  }

}

//Zentrale Variablen lokal

export const api = {
  url: "http://localhost:8080/api/",
  short: "http://localhost:8080/",
  ip: "http://localhost:8010",
  ws: "ws://localhost:8080"
}


//Zentrale Variablen prod
/*
export const api = {
  url: "https://oracle.connecttheapp.com/api/",
  short: "http://localhost:8080/",
  ip: "https://oracle.connecttheapp.com",
  ws: "wss://oracle.connecttheapp.com"
}
*/