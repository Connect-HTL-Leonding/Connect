import { Component, OnInit } from '@angular/core';
import { FriendshipService } from 'src/app/api/friendship.service';
import { ProfileService } from 'src/app/api/profile.service';

@Component({
  selector: 'app-blocked-list',
  templateUrl: './blocked-list.page.html',
  styleUrls: ['./blocked-list.page.scss'],
})
export class BlockedListPage implements OnInit {

  public blockedFriendships;
  public ps : ProfileService
  public fs: FriendshipService
  public userList = [];

  constructor(fs: FriendshipService, ps:ProfileService) { 
    this.ps = ps;
    this.fs = fs;
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
