import { Component, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ProfileService } from './api/profile.service';
import { MeetupService } from './api/meetup.service';
import { ChatService } from './api/chat.service';
import { ContactlistService } from './api/contactlist.service';
import { KeycloakService } from './api/auth/keycloak.service';

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

    //IONIC Setup
    this.initializeApp();

    //OLD!
    //this.oauthService.configure(authCodeFlowConfig);
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // optional
    //this.oauthService.setupAutomaticSilentRefresh();


    //WEBSOCKETS
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

  //IONIC Setup
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  //Login bei Seiten-laden
  public ngOnInit() {
    //DEBUGconsole.log("CHECK if logged in")
    ////DEBUGconsole.log(this.keycloak.userid)

    //überprüfen, ob eingeloggt
    if (this.keycloak.userid === undefined || !this.keycloak.userid || !this.keycloak.userid.length) {
      //Falls nicht bereits eingeloggt --> Token Refresh
      this.keycloak.refresh().subscribe(token => {
        //Benutzer nach Token refresh anmelden
        this.keycloak.authenticated = true;

        try {
          //Userid aus JWT Token extrahieren
          let tokenInfo = jwt_decode(token["access_token"])
          this.keycloak.userid = tokenInfo["sub"];

          //Access und Refresh Token abspeichern
          this.keycloak.setSession(token);

          //Websocket-Connections herstellen
          this.makeWebsocket()
        }
        catch (err) {
          console.error(err)
        }
      })
    } else {

      //Benutzer bereits eingeloggt
      //Websocket-Connections herstellen
      this.makeWebsocket()
    }
  }

  //Websocket-Connection erstellen
  makeWebsocket() {
    if (this.keycloak.userid !== undefined && this.keycloak.userid && this.keycloak.userid.length) {

      //Aktuell angemeldeten User holen (aus eigener Datenbank)
      this.ps.getUser().add(() => {

        //Websocket-Connection mit Userid erstellen
        if (this.keycloak.userid) {
          this.wsUri = api.ws + '/websocket/' + this.keycloak.userid;
          //DEBUGconsole.log(this.wsUri)

          //Websocket-Connection erstellen
          this.doConnect();
        }
      })
    }
  }



  doConnect() {

    //Websocket-Connection erstellen (mit Uri /websocket/userid)
    this.websocket = new WebSocket(this.wsUri);

    //Websocket onmessage
    this.websocket.onmessage = (evt) => {

      var msg: string = evt.data;

      var message = msg.split(":");

      switch (message[0]) {
        case ("meetupAccepted"): this.ms.meetupObservable.next(message[1]);
          this.ms.showMeetupObservable.next(message[1]);
          break;

        case ("chatMessage"):
          //DEBUGconsole.log(msg);
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

        case ("positionUpdate"): console.log(message[1])
        this.ms.showPositionObservable.next(message[1]);
          break;

        case ("newMeetup"): this.ms.showMeetupObservable.next(message[1]);
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
          //DEBUGconsole.log(message[2]);
          this.ps.findFriendUser(message[2]).subscribe(data => {
            this.presentToastWithOptions(data["username"] + " hat sich mit dir connected!");
          })
          break;

        case ("blocked"): this.fs.blockedUpdateObservable.next("blocked");
      }
    }

    //Websocket-onerror
    this.websocket.onerror = (evt) => {
      //DEBUGconsole.log(evt.AT_TARGET);
    };

    //Aktuell nicht in Verwendung
    /*
    this.websocket.onopen = (evt) => this.receiveText += 'Websocket connected\n';
    
    
    this.websocket.onclose = (evt) => this.receiveText += 'Websocket closed\n';
    */
  }

  //Bei Erhalten einer neuen Chatnachricht wird oben ein neuer Toast erstellt mit der Nachricht
  //"CHAT NOW"
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

  //Nachricht mittels Websocket schicken
  doSend(msg) {
    this.websocket.send(msg);
  }

}

//Zentrale Tutorial Variable
export const tutorial = {
  active: false
}

//Zentrale URL Variablen lokal

export const api = {
  url: "http://localhost:8080/api/",
  short: "http://localhost:8080/",
  ip: "http://localhost:8010",
  ws: "ws://localhost:8080"
}

//Zentrale URL Variablen prod
/*
export const api = {
  url: "https://oracle.connecttheapp.com/api/",
  short: "http://localhost:8080/",
  ip: "https://oracle.connecttheapp.com",
  ws: "wss://oracle.connecttheapp.com"
}
*/
