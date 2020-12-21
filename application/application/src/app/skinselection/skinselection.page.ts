import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skinselection',
  templateUrl: './skinselection.page.html',
  styleUrls: ['./skinselection.page.scss'],
})
export class SkinselectionPage implements OnInit {

  constructor() { }

  items = ["../../assets/connect_img/fussball.png","../../assets/connect_img/basketball.png","../../assets/connect_img/golf.png","../../assets/connect_img/schwimmen.png"];

  ngOnInit() {
  }

}
