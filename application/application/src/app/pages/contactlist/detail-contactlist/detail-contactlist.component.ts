import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContactlistService } from 'src/app/api/contactlist.service';
import { User } from 'src/app/model/user';
import { Room } from '../../../model/room'

@Component({
  selector: 'app-detail-contactlist',
  templateUrl: './detail-contactlist.component.html',
  styleUrls: ['./detail-contactlist.component.scss'],
})
export class DetailContactlistComponent implements OnInit {

  @Input() room: Room;
  public contactlist;
  public user: User = new User();
  public latestMessage: string;
  public allMessages;
  public seenMessages;
  public unseenMessages;

  constructor(public cs: ContactlistService) {
    this.contactlist = cs;

  }

  ngOnInit() {

    this.contactlist.getOtherUser(this.room.id).subscribe(data => {
      console.log(this.user)
      this.user.custom = data;
      console.log(this.user)
      this.contactlist.getKeyUser(this.user.custom).subscribe(data => {
        this.user.id = data["id"];
        this.user.userName = data["username"];
        this.user.firstname = data["firstName"];
        this.user.lastname = data["lastName"];
        this.user.email = data["email"];
        console.log(data)
      })
      console.log(this.user)
      this.contactlist.getOtherPfp(this.room.id).subscribe(data => {
        this.user.custom.profilePicture = "data:image/png;base64," + data;
      });
    })

    this.getLatestMessage(this.room);
    this.calcUnseenMessages(this.room);
  }


  getLatestMessage(room: Room) {
    this.contactlist.getLatestMessage(room).subscribe(data => {
      if (data != null) {
        console.log(data.message);
        this.latestMessage = data.message;
      }
    })
  }

  calcUnseenMessages(room: Room) {
   this.contactlist.getAllMessages(room).subscribe(data=> {
     this.allMessages = data;
     this.contactlist.getSeenMessages(room).subscribe(data=> {
       this.seenMessages = data;
       this.unseenMessages = this.allMessages - this.seenMessages;
       this.contactlist.unseenMessages = this.unseenMessages;
       this.contactlist.seenMessages = this.seenMessages;
       this.contactlist.allMessages = this.allMessages;
       console.log(this.seenMessages + " seen");
       console.log(this.allMessages + " all");
       console.log(this.unseenMessages + " unseen")
     })
   })
  }


  userExists(user: User) {
    return user != null;
  }

}
