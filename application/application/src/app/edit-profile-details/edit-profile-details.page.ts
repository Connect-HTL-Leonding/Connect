import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../api/profile.service';

@Component({
  selector: 'app-edit-profile-details',
  templateUrl: './edit-profile-details.page.html',
  styleUrls: ['./edit-profile-details.page.scss'],
})
export class EditProfileDetailsPage implements OnInit {

  constructor(public ps: ProfileService) { }

  ngOnInit() {
  }

}
