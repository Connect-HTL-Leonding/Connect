import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MeetupService } from 'src/app/api/meetup.service';
import { ProfileService } from 'src/app/api/profile.service';
import { Meeting, MeetupUser } from 'src/app/model/meetup';
import { CustomUser, User } from 'src/app/model/user';

@Component({
  selector: 'app-meetup-data-show',
  templateUrl: './meetup-data-show.page.html',
  styleUrls: ['./meetup-data-show.page.scss'],
})
export class MeetupDataShowPage implements OnInit {

  @Input() meetup: Meeting;
  @Input() user: User;

  t:String[]
  time: String
  users:User[] = [];

  constructor(public popoverController: PopoverController, public ms: MeetupService, public ps: ProfileService) { }

  ngOnInit() {
    this.t = this.meetup.time.toString().split(",");
    for(var i = 0;i<this.t.length;i++) {
      if(this.t[i].length == 1) {
        this.t[i] = '0' + this.t[i];
      }
    }
    this.time = this.t[2] + '.' + this.t[1] + '.' + this.t[0] + ' um ' + this.t[3] + ':' + this.t[4];

    this.ms.getMeetupUser(this.meetup.id).subscribe(data => {
  
      data.forEach(mu =>{
        console.log(mu.user_id)
       this.pushPersonInArray(mu.user_id)
      
      })
    });

   

  }

  async pushPersonInArray(muid){
  this.ps.findFriendUser(muid).subscribe(data => {
    let u = data;
    this.ps.friendCustomData(muid).subscribe(custom => {
      u.custom=custom;
      console.log(custom)
       this.users.push(u);
       console.log(this.users)
     });
   });
   
  }

}
