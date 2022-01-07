import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/api/chat.service';
import { ContactlistService } from 'src/app/api/contactlist.service';
import { MeetupService } from 'src/app/api/meetup.service';

@Component({
  selector: 'app-meetup-overview',
  templateUrl: './meetup-overview.page.html',
  styleUrls: ['./meetup-overview.page.scss'],
})
export class MeetupOverviewPage implements OnInit {

  constructor(public chatService: ChatService, public modalController: ModalController, public ms: MeetupService,
    public contactListService: ContactlistService) {
  }
  public meetup = this.chatService.selectedRoom.meeting;
  public friends = null;

  ngOnInit() {
    // gets user from the seleted meetup
    this.ms.getMeetupUser(this.meetup.id).subscribe((meetUpUsers:any) => {
      meetUpUsers.forEach((value, index) => {
        this.contactListService.getKeyUserWithId(meetUpUsers[index].user_id).subscribe((data: any) => {
          meetUpUsers[index].user = data;
        })

      });
      this.friends = meetUpUsers;
      console.log(this.friends);
    })

  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
