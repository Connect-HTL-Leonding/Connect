import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: GoogleMap;
  navigate:any

  constructor(private menu : MenuController) {
    this.sideMenu();
  }

  async ngOnInit(){
    this.loadMap();
  }

loadMap() {
 
  // This code is necessary for browser
  Environment.setEnv({
    'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBtsGRD6cmDQvehofWlUINq1SwvSK-Iq_Q',
    'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBtsGRD6cmDQvehofWlUINq1SwvSK-Iq_Q'
  });

  let mapOptions: GoogleMapOptions = {
    camera: {
       target: {
         lat: 43.0741904,
         lng: -89.3809802
       },
       zoom: 18,
       tilt: 30
     }
  };

  this.map = GoogleMaps.create('map_canvas', mapOptions);
/*
  let marker: Marker = this.map.addMarkerSync({
    title: 'Ionic',
    icon: 'blue',
    animation: 'DROP',
    position: {
      lat: 43.0741904,
      lng: -89.3809802
    }
  });
  marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    alert('clicked');
  });
  */
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
