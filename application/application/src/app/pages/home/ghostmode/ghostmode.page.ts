import { Component, OnInit } from '@angular/core';
import { FriendshipService } from 'src/app/api/friendship.service';
import { MeetupService } from 'src/app/api/meetup.service';
import { ProfileService } from 'src/app/api/profile.service';

@Component({
  selector: 'app-ghostmode',
  templateUrl: './ghostmode.page.html',
  styleUrls: ['./ghostmode.page.scss'],
})
export class GhostmodePage implements OnInit {

  constructor(public profileservice : ProfileService, public meetupService: MeetupService) { }

  ngOnInit() {
  }

  hidePosition(){
    if(!this.profileservice.user.custom.hideLocation) {
      this.meetupService.positionObservable.next("hideLocation:" + this.profileservice.user.custom.id);
    }
    else {
      this.meetupService.positionObservable.next("unhideLocation:" + this.profileservice.user.custom.id);
    }
    
  }

  blockConnect(){
  
    
  }
}
