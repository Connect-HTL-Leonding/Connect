import { Component, OnInit } from '@angular/core';
import { FriendshipService } from 'src/app/api/friendship.service';

@Component({
  selector: 'app-blocked-list',
  templateUrl: './blocked-list.page.html',
  styleUrls: ['./blocked-list.page.scss'],
})
export class BlockedListPage implements OnInit {

  constructor(public fs: FriendshipService) { }

  ngOnInit() {
  }

}
