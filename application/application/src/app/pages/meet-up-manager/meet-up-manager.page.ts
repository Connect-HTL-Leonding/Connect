import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { MeetupService } from '../../api/meetup.service';
import {ContactlistService} from '../../api/contactlist.service';
import { CustomUser, User } from '../../model/user';
import { DateService } from 'src/app/api/date.service';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-meet-up-manager',
  templateUrl: './meet-up-manager.page.html',
  styleUrls: ['./meet-up-manager.page.scss'],
})
export class MeetUpManagerPage implements OnInit {

  meetups = [];
  friends = [];
  public ms;
  public dateService;

  constructor(public modalController: ModalController, ms: MeetupService, 
    public contactListService : ContactlistService, public ds:DateService,
    public alertController: AlertController) {
    this.ms = ms;
    this.dateService = ds;
  }

  ngOnInit() {
    let username;
    this.ms.getMeetupsFromMe().subscribe(meetups => {
      this.meetups = meetups;
      meetups.forEach((meetup) => {
        this.ms.getMeetupUser(meetup.id).subscribe(meetUpUsers => {
         meetUpUsers.forEach((value,index) => {
          this.contactListService.getKeyUserWithId(meetUpUsers[index].user_id).subscribe(data => {
            meetUpUsers[index].seen = data;
            this.friends[meetup.id] = meetUpUsers;
            console.log(this.friends[meetup.id]);
          })
           
         });
         
        })
      })
    })
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  endMeetup(r: Room) {
    this.ms.endMeetup(r).subscribe(data=> {
      console.log("meetup terminated");
    })
  }

   // for ending meetup
   async presentEndAlert(r) {
     console.log(r);
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
            //this.endMeetup(r);
            console.log(r);
            this.dismissModal();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    
  }
}
