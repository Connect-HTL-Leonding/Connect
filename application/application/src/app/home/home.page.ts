import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  navigate:any

  constructor(private menu : MenuController) {
    this.sideMenu();
  }


  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "My-Skins",
        url   : "/my-skins",
        icon  : "albums"
      },
      {
        title : "Skinselection",
        url   : "/skinselection",
        icon  : ""
      },{
        title : "Contacts",
        url : "/contactlist",
        icon : "people"
      },
      {
        title: "Profile",
        url: "/profile",
        icon: "person-circle"
      }
    ]

    console.log(this.navigate);
  }

}
