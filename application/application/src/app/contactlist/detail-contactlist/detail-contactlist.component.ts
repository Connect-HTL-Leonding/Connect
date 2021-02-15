import { Component, OnInit, Input } from '@angular/core';
import { ContactlistService } from 'src/app/api/contactlist.service';
import { User } from 'src/app/model/user';
import { Room } from '../../model/room'

@Component({
  selector: 'app-detail-contactlist',
  templateUrl: './detail-contactlist.component.html',
  styleUrls: ['./detail-contactlist.component.scss'],
})
export class DetailContactlistComponent implements OnInit {

  @Input() room: Room;
  public contactlist;
  public user: User;

  constructor(public cs: ContactlistService) {
    this.contactlist = cs;
  }

  ngOnInit() {
    this.contactlist.getOtherUser(this.room.id).subscribe(data => {
      this.user = data;
    })
  }

  userExists(user:User) {
    return user != null;
  }

}
