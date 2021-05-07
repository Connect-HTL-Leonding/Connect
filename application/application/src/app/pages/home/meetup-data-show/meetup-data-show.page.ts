import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Meeting, MeetupUser } from 'src/app/model/meetup';
import { User } from 'src/app/model/user';

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

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
    this.t = this.meetup.time.toString().split(",");
    for(var i = 0;i<this.t.length;i++) {
      if(this.t[i].length == 1) {
        this.t[i] = '0' + this.t[i];
      }
    }
    this.time = this.t[2] + '.' + this.t[1] + '.' + this.t[0] + ' um ' + this.t[3] + ':' + this.t[4];
  }

}
