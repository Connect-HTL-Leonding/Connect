import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../../app.component'
import { Meeting } from 'src/app/model/meetup';
import {ProfileService} from '../../api/profile.service';
import { MeetupPage } from '../meetup/meetup.page';
import { MeetupService } from 'src/app/api/meetup.service';


@Component({
  selector: 'app-meetup-data',
  templateUrl: './meetup-data.page.html',
  styleUrls: ['./meetup-data.page.scss'],
})
export class MeetupDataPage implements OnInit {

  

  public http;
  public day = null;
  public timeOfDay = null;
  public time : Date= null;
  public meetup: Meeting;
  public profileservice;
  ms : MeetupService;

  constructor(private popoverController: PopoverController, profileservice : ProfileService, ms:MeetupService) {
    this.ms = ms;
    this.profileservice = profileservice;
   }

   @Input() otherUser;
   @Input() position;
   @Input() mp:MeetupPage;

  ngOnInit() {
    console.log(this.otherUser);
  }

  public createMeeting() {
    this.time = new Date(this.day);
    this.time.setUTCHours(new Date(this.timeOfDay).getHours());
    this.time.setUTCMinutes(new Date(this.timeOfDay).getMinutes());
    this.time.setUTCSeconds(new Date(this.timeOfDay).getSeconds());
    this.meetup = new Meeting(this.time, this.position);
    console.log(this.meetup);

    this.ms.createMeetup(this.meetup).subscribe(data=> {
      console.log(data);
      let dataForPost = {
        meeting: data,
        user_id: this.otherUser.id,
        accepted: false
      }
      this.ms.setOtherUser(dataForPost).subscribe(data=> {
        console.log(data);
        this.dismissAll();
      })
    })   
  }

  async dismissPopover() {
    await this.popoverController.dismiss();
 
  }
  async dismissAll() {
    await this.popoverController.dismiss();
    this.mp.dismissModal();
  }
}
