import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContactlistService } from 'src/app/api/contactlist.service';
import { MeetupService } from 'src/app/api/meetup.service';
import { User } from 'src/app/model/user';
import { Room } from '../../../model/room';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FriendshipService } from 'src/app/api/friendship.service';
import { ProfileService } from 'src/app/api/profile.service';
import { Friendship } from 'src/app/model/friendship';
import { Skin } from 'src/app/model/skin';
import { PhotoService } from 'src/app/api/photo.service';

@Component({
  selector: 'app-detail-contactlist',
  templateUrl: './detail-contactlist.component.html',
  styleUrls: ['./detail-contactlist.component.scss'],
  providers: [DatePipe]
})
export class DetailContactlistComponent implements OnInit {

  @Input() room: Room;
  public contactlist;
  public user: User = new User();
  public latestMessage: string;
  public latestMessageCreated: Date;
  public pfp;
  public allMessages;
  public seenMessages;
  public unseenMessages;
  public datePipe: DatePipe;
  public array = [];
  timeDisplayArr = [];
  timeDisplay: string = "";
  public newMeetUp: boolean = false;
  public ms;
  public myMeetUp: boolean = false;
  public myMeetUpStatus;
  public meetUpAccepted;


  constructor(public cs: ContactlistService, datePipe: DatePipe, ms: MeetupService, private friendService: FriendshipService,
    private profileService: ProfileService, public photoService: PhotoService) {
    this.contactlist = cs;
    this.datePipe = datePipe;
    this.ms = ms;
    this.newMeetUp = false;
    this.myMeetUp = false;
  }

  ngOnInit() {

    this.contactlist.getOtherUser(this.room.id).subscribe(data => {

      this.user.custom = data;
      if (this.user.custom) {
        this.getLatestMessage(this.room);
        this.calcUnseenMessages(this.room);


        this.photoService.getFriendPfp(this.user.custom.id).subscribe(data=> {
          if(data!=undefined) {
            this.pfp = this.photoService.DOMSanitizer(data);
          } else {
            this.photoService.getDefaultPfp().subscribe(defaultPfp=> {
              this.pfp = this.photoService.DOMSanitizer(defaultPfp);
            })
          }
        })

        this.ms.getMeetupsWithMe(this.user.custom.id).subscribe(data => {
          if (data.length != 0) {
            this.newMeetUp = true;
          }
        })

        this.ms.getMeetupsFromMeA(this.user.custom.id).subscribe(data => {
          this.meetUpAccepted = data;
          if (this.meetUpAccepted.length != 0) {
            this.myMeetUp = true;
            this.myMeetUpStatus = 'akzeptiert';
          }
          this.ms.getMeetupsFromMeD(this.user.custom.id).subscribe(data => {

            if (data.length != 0) {

              if (this.meetUpAccepted[this.meetUpAccepted.length - 1] !== undefined) {
                if (data[data.length - 1].id > this.meetUpAccepted[this.meetUpAccepted.length - 1].id) {
                  this.myMeetUp = true;
                  this.myMeetUpStatus = "abgelehnt";
                }
              } else {
                this.myMeetUp = true;
                this.myMeetUpStatus = "abgelehnt";
              }


            }

          })
        })

        this.contactlist.getKeyUser(this.user.custom).subscribe(data => {
          this.user.id = data["id"];
          this.user.userName = data["username"];
          this.user.firstname = data["firstName"];
          this.user.lastname = data["lastName"];
          this.user.email = data["email"];
        })


        /*
        //DEBUGconsole.log(atob(this.user.custom.profilePicture));
        this.contactlist.getOtherPfp(this.room.id).subscribe(data => {
          this.user.custom.profilePicture = "data:image/png;base64," + data;
        });
        */


      }
    })
  }


  getLatestMessage(room: Room) {
    this.contactlist.getLatestMessage(room).subscribe(data => {
      if (data != null) {
        this.latestMessage = data.message;
        this.latestMessageCreated = data.created;
        this.calcTimeDisplayed(new Date(data.created));
      }
    })
  }

  calcTimeDisplayed(messageDate: Date) {
    // time right now
    let dateNow = new Date();
    // get time difference in ms, convert it to minutes, round it off 
    let minDiff = Math.floor(((dateNow.getTime() - messageDate.getTime()) / 1000) / 60);
    if (minDiff < 1) {
      this.timeDisplay = "Just now";
    }
    if (minDiff < 60 && minDiff >= 1) {
      if (minDiff == 1) {
        this.timeDisplay = minDiff + " minute ago";
      } else {
        this.timeDisplay = minDiff + " minutes ago";
      }
    }
    if (minDiff >= 60) {
      let hourDiff = Math.floor(minDiff / 60);
      if (hourDiff == 1) {
        this.timeDisplay = hourDiff + " hour ago";
      } else {
        this.timeDisplay = hourDiff + " hours ago";
      }
    }
    if (minDiff >= 1440) {
      let dayDiff = Math.floor(minDiff / 1440);
      if (dayDiff == 1) {
        this.timeDisplay = dayDiff + " day ago";
      } else {
        this.timeDisplay = dayDiff + " days ago";
      }
    }
  }

  calcUnseenMessages(room: Room) {
    this.contactlist.getAllMessages(room).subscribe(data => {
      this.allMessages = data;
      this.contactlist.getSeenMessages(room).subscribe(data => {
        this.seenMessages = data;
        this.unseenMessages = this.allMessages - this.seenMessages;
        this.contactlist.unseenMessages = this.unseenMessages;
        this.contactlist.seenMessages = this.seenMessages;
        this.contactlist.allMessages = this.allMessages;
      })
    })
  }


  userExists(user: User) {
    return user != null;
  }

}
