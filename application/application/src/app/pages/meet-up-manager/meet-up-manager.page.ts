import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { MeetupService } from '../../api/meetup.service';

@Component({
  selector: 'app-meet-up-manager',
  templateUrl: './meet-up-manager.page.html',
  styleUrls: ['./meet-up-manager.page.scss'],
})
export class MeetUpManagerPage implements OnInit {

  meetups;

  constructor( public modalController: ModalController, public meetupService : MeetupService) { }

  ngOnInit() {
    this.meetupService.getMeetupsFromMe().subscribe(data=> {
      this.meetups = data;
      console.log(this.meetups);
    })
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
