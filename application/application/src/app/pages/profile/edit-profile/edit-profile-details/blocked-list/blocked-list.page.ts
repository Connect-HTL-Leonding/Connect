import { Component, OnInit } from '@angular/core';
import { ContactlistService } from 'src/app/api/contactlist.service';
import { FriendshipService } from 'src/app/api/friendship.service';
import { ProfileService } from 'src/app/api/profile.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-blocked-list',
  templateUrl: './blocked-list.page.html',
  styleUrls: ['./blocked-list.page.scss'],
})
export class BlockedListPage implements OnInit {

  public blockedFriendships;
  public ps : ProfileService
  public fs: FriendshipService
  public cs: ContactlistService
  public userList = [];

  constructor(fs: FriendshipService, ps:ProfileService, cs:ContactlistService) { 
    this.ps = ps;
    this.fs = fs;
    this.cs = cs;
  }

  unblockUser(u:User) {
    this.ps.friendCustomData(u.id).subscribe(data => {
      //DEBUGconsole.log(data)
      this.fs.unblockFriendship(data).subscribe(data => {
        this.userList = []
        this.cs.contactlistObservable.next("contactListUpdate");
        this.fs.blockedObservable.next("blocked");
        this.fs.getBlockedUser(this.ps.user.id).subscribe(data => {
          this.blockedFriendships = data;
          this.blockedFriendships.forEach(f => {
            if(f.user1.id != this.ps.user.id) {
              this.ps.findFriendUser(f.user1.id).subscribe(data=> {
                this.userList.push(data);
              })
            }
            else {
              this.ps.findFriendUser(f.user2.id).subscribe(data=> {
                this.userList.push(data);
              })
            }
          });
        }) 
      })
    })
    
  }

  ngOnInit() {
    this.fs.getBlockedUser(this.ps.user.id).subscribe(data => {
      this.blockedFriendships = data;
      this.blockedFriendships.forEach(f => {
        if(f.user1.id != this.ps.user.id) {
          this.ps.findFriendUser(f.user1.id).subscribe(data=> {
            this.userList.push(data);
          })
        }
        else {
          this.ps.findFriendUser(f.user2.id).subscribe(data=> {
            this.userList.push(data);
          })
        }
      });
    }) 
  }
 
}
