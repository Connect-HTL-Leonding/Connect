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
import { api } from 'src/app/app.component';
import { PopoverController } from '@ionic/angular';
import { MeetupDataPage } from '../meetup-data/meetup-data.page';
import { MeetupPage } from '../meetup/meetup.page';
import { Meeting } from 'src/app/model/meetup';
import { Position } from 'src/app/model/position';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProfileService } from 'src/app/api/profile.service';
import { ProfilePage } from '../profile/profile.page';
import { FriendPage } from '../friend/friend.page';
import { KeycloakService } from 'src/app/api/auth/keycloak.service';
import { concatAll, finalize, mergeAll, publish } from 'rxjs/operators';
import { DateService } from 'src/app/api/date.service';
import { AlertController } from '@ionic/angular';


declare var google: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],


})
export class ChatPage implements OnInit {


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
  dateservice;
  oauthService;
  modal;
  public allMessages;
  public seenMessages;
  public unseenMessages;
  //position of new Message Line
  public pos = 0;
  public showNewMsgLine: boolean;
  public pfp;
  public ms: MeetupService;
  public isNewMeetUp;
  public meetUps;
  public myMeetUp;
  public myMeetUpStatus;
  public myMeetUpTime;
  public meetUpsAccepted;
  public meetUpsDeclined;
  public myMeetUps;
  public getMessage;
  public getMeetups;
  roomname;




  constructor(ms: MeetupService, public ps: ProfileService,
    public modalController: ModalController, cl: ContactlistService,
    cs: ChatService, os: OAuthService, public keycloakService: KeycloakService,
    public popoverController: PopoverController, public toastController: ToastController,
    public router: Router, public dateService: DateService, public meetupService : MeetupService, 
    public alertController: AlertController) {

    this.contactlist = cl;
    this.chatservice = cs;
    this.chatservice.selectedRoom = this.contactlist.selectedRoom;
    this.oauthService = os;
    this.ms = ms;
    this.dateService = dateService;


    this.getMessage = this.chatservice.updatechatNotify.subscribe(value => {
      console.log(value);
      if (this.chatservice.selectedRoom.id == value) {
        this.init(this.contactlist.selectedRoom);
      }
    });

    this.getMeetups = this.ms.showMeetupUpdateNotify.subscribe(value => {
      if (this.chatservice.selectedRoom.id == value) {
        if (this.otherUser.custom) {
          this.ms.getMeetupsWithMe(this.otherUser.custom.id).subscribe(data => {
            this.meetUps = data;
          })
          this.ms.getMeetupsFromMeA(this.otherUser.custom.id).subscribe(data => {
            this.meetUpsAccepted = data;
            this.ms.getMeetupsFromMeD(this.otherUser.custom.id).subscribe(data => {
              this.meetUpsDeclined = data;
            })
          })
        }
      }
    })
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
        'otherUser': this.otherUser,
        'selectedRoom': this.chatservice.selectedRoom
      }
    });

    this.modal.onDidDismiss().then((data => {
    }))
    return await this.modal.present();
  }

  profileFriend(friend: User) {
    this.ps.findFriendUser(friend.id)
      .subscribe(data => {
        this.presentFriend(data);
      });
  }

  openMeetup(meetupid) {
    this.ms.getMeetupById(meetupid).subscribe(data => {
      this.showLocation(data, true);
    })
  }

  async presentFriend(friendKeycloak) {
    let friend = friendKeycloak;
    const modal = await this.modalController.create({
      component: FriendPage,
      componentProps: {
        'contacListWebsocket': this.contactlist.websocket,
        user: friend
      }
    });
    modal.onDidDismiss().then((data => {
      setTimeout(() => {
        this.dismissModal();
      }, 50);
    }))
    return await modal.present();
  }

  yousent(message: Message): boolean {
    return message.user.id == this.keycloakService.userid;
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
      if (this.otherUser.custom) {
        this.ms.getMeetupsWithMe(this.otherUser.custom.id).subscribe(data => {
          this.meetUps = data;
          console.log(data);
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
      }
      else {
        this.roomname = "meetup-chat"
      }




      /*
      this.contactlist.getOtherPfp(this.contactlist.selectedRoom.id).subscribe(data => {
        this.otherUser.custom.profilePicture = "data:image/png;base64," + data;
      });
      */
    })
  }

  showLocation(m: Meeting, isInMeetupChat) {

    this.dismissModal();
    this.router.navigate(["home"]);
    this.ms.meetupPreviewObserveable.next({ "meetup": m, "originRoom": this.contactlist.selectedRoom, "meetupChat": isInMeetupChat });
  }


  setStatusOfMeetingA(meetUp) {
    this.dismissModal();
    this.ms.setStatusAccepted(meetUp.id).subscribe(data => {
      this.chatservice.chatSendObservable.next("meetupAccepted:" + meetUp.id);
      this.ms.createMeetupObservable.next("acceptMeetup:" + this.chatservice.selectedRoom.id);
      this.contactlist.contactlistObservable.next("contactListUpdate");
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
      this.ms.createMeetupObservable.next("declineMeetup:" + this.chatservice.selectedRoom.id);
      this.contactlist.contactlistObservable.next("contactListUpdate");
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
    this.ms.setSeen(meeting, this.otherUser.custom.id).subscribe(data => {
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
        this.contactlist.contactlistObservable.next("contactListUpdate");
        this.chatservice.chatSendObservable.next("chatMessage:" + this.chatservice.selectedRoom.id);
        this.sendText = "";
      })
    });
  }


  doSend() {
    if (this.sendText.trim().length > 0) {
      this.m.message = this.ps.user.userName + ": " + this.sendText;
      this.m.created = new Date();
      this.m.updated = new Date();
      this.m.image = "";
      this.showNewMsgLine = false;

      this.chatservice.createMessage(this.m)
        .subscribe(data => {
          this.contactlist.contactlistObservable.next("contactListUpdate");
          this.chatservice.chatSendObservable.next("chatMessage:" + this.chatservice.selectedRoom.id);
          this.sendText = "";
        });
    }
  }


  init(room: Room) {
    this.showNewMsgLine = true;

    this.chatservice.getAllMessages(room).subscribe(data => {
      this.allMessages = data;
      this.chatservice.getSeenMessages(room).subscribe(data => {
        this.seenMessages = data;
        this.unseenMessages = this.allMessages - this.seenMessages;
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

  leaveMeetup(r: Room) {
    this.meetupService.removeUserFromMeetup(r).subscribe(data=> {
      console.log("user removed");
    })
  }

  // for leaving meetup
  async presentLeaveAlert(r: Room) {
    const alert = await this.alertController.create({
      header: 'Leave this Meet-Up?',
      message: 'You are about to leave this Meet-Up. Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Leave',
          handler: () => {
            this.leaveMeetup(r);
            this.dismissModal();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    
  }

   // for ending meetup
   async presentEndAlert(r: Room) {
    const alert = await this.alertController.create({
      header: 'End this Meet-Up?',
      message: 'You are about to end this Meet-Up. Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'End Meet-Up',
          handler: () => {
            this.dismissModal();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    
  }




}
