import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { MeetupService } from '../../api/meetup.service';
import {ContactlistService} from '../../api/contactlist.service';
import { CustomUser, User } from '../../model/user';
import { DateService } from 'src/app/api/date.service';

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

  constructor(public modalController: ModalController, ms: MeetupService, public contactListService : ContactlistService, public ds:DateService) {
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



  test() {
    console.log("test");
  }

}
