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

createMarker(source, hex){
  var canvas = document.createElement('canvas');
  canvas.width = 35;
  canvas.height = 62;
var ctx = canvas.getContext('2d');
var image1 = source;
var image = new Image();
var compositeImage;



image.src = image1;


ctx.drawImage(image, 2.4725 , 2.9421  , 29.6, 29.6);


// only draw image where mask is
ctx.globalCompositeOperation = 'destination-in';

// draw our circle mask
ctx.fillStyle = '#000';
ctx.beginPath();
ctx.arc(
 14.8+2.4725,          // x
 14.8+2.9421,          // y
 14.8,          // radius
 0,                  // start angle
 2 * Math.PI         // end angle
);
ctx.fill();

// restore to default composite operation (is draw over current image)
ctx.globalCompositeOperation = 'source-over';


var path = new Path2D('M17.3,0C4.9,0-3.5,13.4,1.4,25.5l14.2,35.2c0.4,0.9,1.4,1.4,2.3,1c0.5-0.2,0.8-0.5,1-1l14.2-35.2C38,13.4,29.7,0,17.3,0z M17.3,32.5c-8.2,0-14.8-6.6-14.8-14.8c0-8.2,6.6-14.8,14.8-14.8s14.8,6.6,14.8,14.8C32.1,25.9,25.4,32.5,17.3,32.5z');

ctx.fillStyle = hex;
ctx.fill(path);

compositeImage = canvas.toDataURL("image/png");

canvas.remove();

return compositeImage;
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

   var compositeImage = this.createMarker('../../assets/normalguy.jpg','#0eb19b');



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

      const cityCircle = new google.maps.Circle({
        strokeColor: "#0eb19b",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0eb19b",
        fillOpacity: 0.05,
        map: this.map,
        center: location,
        radius: 100,
      });
  

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
