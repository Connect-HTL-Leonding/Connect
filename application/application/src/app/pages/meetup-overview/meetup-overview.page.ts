import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/api/chat.service';
import { ContactlistService } from 'src/app/api/contactlist.service';
import { DateService } from 'src/app/api/date.service';
import { MeetupService } from 'src/app/api/meetup.service';
import { ProfileService } from 'src/app/api/profile.service';
import { Room } from 'src/app/model/room';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-meetup-overview',
  templateUrl: './meetup-overview.page.html',
  styleUrls: ['./meetup-overview.page.scss'],
})
export class MeetupOverviewPage implements OnInit {

  constructor(public chatService: ChatService, public modalController: ModalController, public ms: MeetupService,
    public contactListService: ContactlistService, public dateService: DateService, public meetupService: MeetupService
    , public alertController: AlertController, public ps : ProfileService, public contactlist : ContactlistService, public router : Router) {
  }
  public meetup = this.chatService.selectedRoom.meeting;
  public room = this.chatService.selectedRoom;
  public friends = null;
  public creator;
  public activeUser;

  ngOnInit() {
    // gets user from the seleted meetup
    this.ms.getMeetupUser(this.meetup.id).subscribe((meetUpUsers: any) => {
      meetUpUsers.forEach((value, index) => {
        this.contactListService.getKeyUserWithId(meetUpUsers[index].user_id).subscribe((data: any) => {
          meetUpUsers[index].user = data;
        })

      });
      this.friends = meetUpUsers;
      console.log(this.friends);
    })

    this.ms.getCreatorOfMeetup(this.meetup.id).subscribe((data: User)=> {
     this.contactListService.getKeyUserWithId(data.id).subscribe(data=> {
        this.creator = data;
       this.activeUser= this.contactListService.activeUser;
     })
    })

  }

  dismissModal() {
    this.modalController.dismiss();
  }

  leaveMeetup(r: Room) {
    this.meetupService.removeUserFromMeetup(r).subscribe(data => {
      this.ms.meetupObservable.next("")
      console.log("user removed");
    })
  }

  endMeetup(r: Room) {

    this.chatService.chatSendObservable.next("meetupEnded:" + r.meeting.id);

    console.log("meetup terminated");

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
          cssClass: 'secondary'
        }, {
          text: 'Leave',
          handler: () => {
            this.leaveMeetup(r);
            this.dismissModal();
            this.modalController.dismiss(null,null,"chatPage");
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
            this.endMeetup(r);
            this.dismissModal();
            this.modalController.dismiss(null,null,"chatPage");

          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }

  showOnMap() {
    this.dismissModal();
    this.modalController.dismiss(null,null,"chatPage");
    this.router.navigate(["home"]);
    this.ms.meetupPreviewObserveable.next({ "meetup": this.meetup, "originRoom": this.chatService.selectedRoom, "meetupChat": true });
  }

}

