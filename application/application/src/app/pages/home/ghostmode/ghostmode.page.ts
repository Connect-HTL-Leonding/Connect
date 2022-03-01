import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/api/profile.service';

@Component({
  selector: 'app-ghostmode',
  templateUrl: './ghostmode.page.html',
  styleUrls: ['./ghostmode.page.scss'],
})
export class GhostmodePage implements OnInit {

  constructor(public profileservice : ProfileService) { }

  ngOnInit() {
  }

  hidePosition(){
     
  }

  blockConnect(){
  
    
  }
}
