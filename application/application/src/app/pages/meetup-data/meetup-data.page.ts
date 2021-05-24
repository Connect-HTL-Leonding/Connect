import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../../app.component'
import { Meeting } from 'src/app/model/meetup';
import {ProfileService} from '../../api/profile.service';
import { MeetupPage } from '../meetup/meetup.page';
import { MeetupService } from 'src/app/api/meetup.service';
import { FriendshipService } from 'src/app/api/friendship.service';
import { User } from 'src/app/model/user';
import {ContactlistService} from '../../api/contactlist.service'


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
  fs;
  minDate: string = new Date().toISOString();
  public selectedFriends = new Array();
  public allFriends = new Array();
  public cs;
  public keyUser = {
      id: 0,
      userName: "",
      firstname: "",
      lastname: "",
      email: ""
  }

  constructor(private popoverController: PopoverController, profileservice : ProfileService, ms:MeetupService, friendshipService: FriendshipService, contactList: ContactlistService) {
    this.ms = ms;
    this.cs = contactList;
    this.fs = friendshipService;
    this.profileservice = profileservice;
   }

   @Input() otherUser;
   @Input() position;
   @Input() mp:MeetupPage;

  ngOnInit() {
    this.profileservice.getUser();
    this.fs.getBefriendedUsers(this.profileservice.user).subscribe(data=> {
      data.forEach(friendship => {
        if(friendship.user1.id!=this.profileservice.user.id) {
          this.cs.getKeyUser(friendship.user1).subscribe(data => {
            this.allFriends.push(data);
          })
         
        } else {
          this.cs.getKeyUser(friendship.user2).subscribe(data => {
            this.allFriends.push(data);
          })
       
        }
      });

     console.log(this.allFriends);
    })
  }

  setKeyUser(user) {
  
  }

  public createMeeting() {
    this.time = new Date(this.day);
    this.time.setUTCHours(new Date(this.timeOfDay).getHours());
    this.time.setUTCMinutes(new Date(this.timeOfDay).getMinutes());
    this.time.setUTCSeconds(new Date(this.timeOfDay).getSeconds());
    this.meetup = new Meeting(0, this.time, this.position);
    console.log(this.meetup);

    this.ms.createMeetup(this.meetup).subscribe(data=> {
      this.selectedFriends.forEach(friend => {
        let dataForPost = {
          meeting: data,
          user_id: friend.id,
          status: "pending",
        }
        this.ms.setOtherUser(dataForPost).subscribe(data=> {
          this.dismissAll();
        })
      });
    
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
