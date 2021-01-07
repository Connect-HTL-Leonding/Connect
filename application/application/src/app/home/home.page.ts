import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
/*
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps/ngx';
*/

declare var google: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //map: GoogleMap;
  navigate: any;
  map: any;

  //map
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(private menu: MenuController, private geolocation: Geolocation) {
    this.sideMenu();
  }


  /*
  async ngOnInit() {
    this.loadMap();
  }
  */

  ionViewDidEnter() {
    this.loadMap();
    console.log("jfsaldfjkd");
  }

  async loadMap() {

    console.log("jasljfds");

    // This code is necessary for browser
    /*
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBtsGRD6cmDQvehofWlUINq1SwvSK-Iq_Q',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBtsGRD6cmDQvehofWlUINq1SwvSK-Iq_Q'
    });
    */

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude + " " + resp.coords.longitude)
      const location = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      const mapOptions = {
        center: location,
        zoom: 18,
        disableDefaultUI: true
      };

      this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

      var marker = new google.maps.Marker({
        position: location,
        title: "YOU",
        //icon: "../../assets/normalguy.jpg"
      });

      // To add the marker to the map, call setMap();
      marker.setMap(this.map);

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    //this.map = GoogleMaps.create('map_canvas', mapOptions);
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

  sideMenu() {
    this.navigate =
      [
        {
          title: "Home",
          url: "/home",
          icon: "home"
        },
        {
          title: "My-Skins",
          url: "/my-skins",
          icon: "albums"
        },
        {
          title: "Skinselection",
          url: "/skinselection",
          icon: ""
        }, {
          title: "Contacts",
          url: "/contactlist",
          icon: "people"
        },
        {
          title: "Profile",
          url: "/profile",
          icon: "person-circle"
        },
        {
          title: "Profile-Details",
          url: "/edit-profile-details",
          icon: ""
        }
      ]

    console.log(this.navigate);
  }

}
