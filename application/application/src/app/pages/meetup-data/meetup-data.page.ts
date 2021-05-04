import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-meetup-data',
  templateUrl: './meetup-data.page.html',
  styleUrls: ['./meetup-data.page.scss'],
})
export class MeetupDataPage implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  async dismissPopover() {
    await this.popoverController.dismiss();
      }
}
