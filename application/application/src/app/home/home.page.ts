import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MapStyle} from './mapStyle';
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

    console.log(this.geolocation);

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

      console.log(MapStyle)

      const mapOptions = {
        center: location,
        zoom: 18,
        disableDefaultUI: true,
        styles: MapStyle
      };

      this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

      var canvas = document.getElementById('canvas') as
      HTMLCanvasElement;
var ctx = canvas.getContext('2d');
var image1 = '../../assets/normalguy.jpg';
var image2 = '../../assets/defaultpfp.jpg';
var image = new Image();
var compositeImage;

image.src = image1;
ctx.drawImage(image, 0, 0);

image = new Image();
image.src = image2;
ctx.drawImage(image, 0, 0);

compositeImage = canvas.toDataURL("image/png");

console.log(compositeImage);

      const icon = {
        url: compositeImage, // image url
        scaledSize: new google.maps.Size(50, 50), // scaled size
      };

      var marker = new google.maps.Marker({
        position: location,
        title: "YOU",
        icon: compositeImage
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
