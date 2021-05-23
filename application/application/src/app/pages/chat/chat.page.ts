import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ContactlistService } from '../../api/contactlist.service'
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { User } from '../../model/user';
import { ChatService } from '../../api/chat.service';
import { MeetupService } from '../../api/meetup.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../../model/room';
import { Message } from '../../model/message';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from 'keycloak-angular';
import { api } from 'src/app/app.component';
import { PopoverController } from '@ionic/angular';
import { MeetupDataPage } from '../meetup-data/meetup-data.page';
import { MeetupPage } from '../meetup/meetup.page';
import { Meeting } from 'src/app/model/meetup';
import { Position } from 'src/app/model/position';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


declare var google: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],


})
export class ChatPage implements OnInit {

  @Input() contacListWebsocket: any;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  map: any;

  sendText = '';
  receiveText = '';
  receiveMessage: Message = new Message();
  i = 0;

  public username;
  public profilePicture;
  public m = new Message();
  public otherUser: User = new User();
  contactlist;
  chatservice;
  oauthService;
  modal;
  public allMessages;
  public seenMessages;
  public unseenMessages;
  //position of new Message Line
  public pos = 0;
  public showNewMsgLine: boolean;
  public pfp;
  public ms;
  public isNewMeetUp;
  public meetUps;
  public myMeetUp;
  public myMeetUpStatus;
  public myMeetUpTime;
  public meetUpsAccepted;
  public meetUpsDeclined;
  public myMeetUps;
  public getMessage;




  constructor(ms: MeetupService, public modalController: ModalController, cl: ContactlistService, cs: ChatService, os: OAuthService, public keycloakService: KeycloakService, public popoverController: PopoverController, public toastController: ToastController, public router: Router) {
    this.contactlist = cl;
    this.chatservice = cs;
    this.chatservice.selectedRoom = this.contactlist.selectedRoom;
    this.oauthService = os;
    this.ms = ms;

    console.log(this.mapRef);

    this.getMessage = this.chatservice.updatechatNotify.subscribe(value => {
      console.log("testify 2");
      console.log(value);
      if(this.chatservice.selectedRoom.id == value) {
        this.init(this.contactlist.selectedRoom);
      }  
    });
  }


  ngOnInit() {
    this.init(this.contactlist.selectedRoom);

    this.getRoomName();

    /* Maybe Map idk it dont work
    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      center: new Position(),
      zoom: 18,
      disableDefaultUI: true,
      mapId: '2fcab7b62a0e3af9'
    });
    */

  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: MeetupPage,
      componentProps: {
        'otherUser': this.otherUser
      }
    });

    this.modal.onDidDismiss().then((data => {
    }))
    return await this.modal.present();
  }

  yousent(message: Message): boolean {
    return message.user.id == this.keycloakService.getKeycloakInstance().subject;
  }

  imageIsNotNull(message: Message): boolean {
    if (message.image != null && message.image != "") {
      return true;
    }
    else {
      return false;
    }
  }

  messageIsNotNull(message: Message): boolean {
    if (message.message != null && message.message != "") {
      return true;
    }
    else {
      return false;
    }
  }


  getRoomName() {
    this.contactlist.getOtherUser(this.contactlist.selectedRoom.id).subscribe(data => {
      this.otherUser.custom = data;
      this.ms.getMeetupsWithMe(this.otherUser.custom.id).subscribe(data => {
        this.meetUps = data;
      })
      this.ms.getMeetupsFromMeA(this.otherUser.custom.id).subscribe(data => {
        this.meetUpsAccepted = data;
        this.ms.getMeetupsFromMeD(this.otherUser.custom.id).subscribe(data => {
          this.meetUpsDeclined = data;
        })
      })


      this.pfp = "data:image/png;base64," + atob(this.otherUser.custom.profilePicture);
      this.contactlist.getKeyUser(this.otherUser.custom).subscribe(data => {
        this.otherUser.id = data["id"];
        this.otherUser.userName = data["username"];
        this.otherUser.firstname = data["firstName"];
        this.otherUser.lastname = data["lastName"];
        this.otherUser.email = data["email"];
        console.log(data)
      })
      /*
      this.contactlist.getOtherPfp(this.contactlist.selectedRoom.id).subscribe(data => {
        this.otherUser.custom.profilePicture = "data:image/png;base64," + data;
      });
      */
    })
  }

  showLocation(m: Meeting) {

    this.dismissModal();
    this.router.navigate(["home"]);
    this.ms.meetupPreviewObserveable.next({ "meetup": m, "originRoom": this.contactlist.selectedRoom });
  }


  setStatusOfMeetingA(meetUp) {
    this.dismissModal();
    this.ms.setStatusAccepted(meetUp.id).subscribe(data => {
      this.chatservice.chatSendObservable.next("meetupAccepted:" + meetUp.id);
      console.log("status set to accepted");
      if (this.meetUps.length < 1) {
        this.isNewMeetUp = false;
      }
      this.presentToastWithOptions("MeetUp accepted! Check your map!");
    });

  }

  setStatusOfMeetingD(meetUp) {
    this.dismissModal();
    this.ms.setStatusDeclined(meetUp.id).subscribe(data => {
      if (this.meetUps.length < 1) {
        this.isNewMeetUp = false;
      }
      this.presentToastWithOptions("MeetUp declined");
    });
  }

  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      header: msg,
      
      position: 'top',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  setSeen(meeting) {
    this.ms.setSeen(meeting,this.otherUser.custom.id).subscribe(data => {
      this.ms.getMeetupsFromMeA(this.otherUser.custom.id).subscribe(data => {
        this.meetUpsAccepted = data;
        this.ms.getMeetupsFromMeD(this.otherUser.custom.id).subscribe(data => {
          this.meetUpsDeclined = data;
        })
      })
    })
  }

  dismissModal() {
    this.modalController.dismiss();
  }


  doSendImage() {
    this.m.message = this.sendText;
    this.m.created = new Date();
    this.m.updated = new Date();
    this.m.image = "";
    this.chatservice.addImage(this.m).then(data => {
      console.log(data);
      this.chatservice.createMessage(data).subscribe(data => {
        this.chatservice.chatSendObservable.next("chatMessage:" + this.chatservice.selectedRoom.id);
        this.sendText = "";
      })
    });
  }


  doSend() {
    if (this.sendText.trim().length > 0) {
      this.m.message = this.sendText;
      this.m.created = new Date();
      this.m.updated = new Date();
      this.m.image = "";
      this.showNewMsgLine = false;
      this.contacListWebsocket.send(this.sendText);
      this.chatservice.createMessage(this.m).subscribe(data => {
        this.chatservice.chatSendObservable.next("chatMessage:" + this.chatservice.selectedRoom.id);
        this.sendText = "";
      });
    }
  }

  

  convert(date: number[]): string {
    let hours = "";
    let minutes = "";
    if (date[3] <= 9) {
      hours = "0"
    }
    if (date[4] <= 9) {
      minutes = "0";
    }
    return `${hours}${date[3]}:${minutes}${date[4]}`;
  }

  init(room: Room) {
    this.showNewMsgLine = true;

    this.chatservice.getAllMessages(room).subscribe(data => {
      this.allMessages = data;
      this.chatservice.getSeenMessages(room).subscribe(data => {
        this.seenMessages = data;
        this.unseenMessages = this.allMessages - this.seenMessages;
        console.log(this.seenMessages + " seen");
        console.log(this.allMessages + " all");
        console.log(this.unseenMessages + " unseen")
        this.chatservice.getData().subscribe(data => {
          this.chatservice.messages = data;
          this.pos = this.chatservice.messages.length - this.unseenMessages;

        })
      })
    })
  }


  newDay(message: Message, olderMessage: Message): boolean {
    let newDay = false;
    if (message == undefined) {
      return false;
    }
    if (olderMessage == undefined) {
      return true;
    }
    if (message.created[2] != olderMessage.created[2]) {
      newDay = true;
    }
    return newDay;
  }




}
