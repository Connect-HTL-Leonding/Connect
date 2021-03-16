import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MapStyle } from './mapStyle';
import { User } from '../../model/user';

import { ProfileService } from 'src/app/api/profile.service';
import { AuthService } from 'src/app/api/auth/auth.service';
import { FriendshipService } from 'src/app/api/friendship.service';

import { MySkinsPageRoutingModule } from '../my-skins/my-skins-routing.module';
import { MyskinsService } from 'src/app/api/myskins.service';
import { Friendship } from 'src/app/model/friendship';
import { ContactlistService } from 'src/app/api/contactlist.service';
import { Position } from 'src/app/model/position';


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
export class HomePage implements OnInit {
  //map: GoogleMap;
  navigate: any;
  map: any;
  friendMarkers = [];
  

  //map
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;


  constructor(private menu: MenuController, private geolocation: Geolocation, public ps: ProfileService, private authService: AuthService, private fs : FriendshipService, public loadingController: LoadingController, private mySkinsService : MyskinsService, private cs : ContactlistService) {

    this.sideMenu();

    this.ps.getUser().subscribe(
      data => {

        console.log(data);
        this.ps.user.custom = data;

      

        console.log("Current User:")
        console.log(this.ps.user)



        //console.log(this.skinService);
      },
      error1 => {
        console.log('Error');
      }
    )
  }


  ngOnInit() {

    this.mySkinsService.getSelectedSkins().subscribe(data => {
      console.log(data);
    })
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Map loading...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }




  ionViewDidEnter() {
    this.loadMap();
    console.log("jfsaldfjkd");
  }

  createUserMarker(user: User) {
    console.log("Create Marker " + user.userName +":");
   console.log(user);

   

    var canvas = document.createElement('canvas');
    canvas.width = 35;
    canvas.height = 62;
    var ctx = canvas.getContext('2d');
    var image1 = "data:image/png;base64," + atob(user.custom.profilePicture);
    var image = new Image();
    var compositeImage;



    image.src = image1;

    ctx.drawImage(image, 2.4725, 2.9421, 29.6, 29.6);



    // only draw image where mask is
    ctx.globalCompositeOperation = 'destination-in';

    // draw our circle mask
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(
      14.8 + 2.4725,          // x
      14.8 + 2.9421,          // y
      14.8,          // radius
      0,                  // start angle
      2 * Math.PI         // end angle
    );
    ctx.fill();

    // restore to default composite operation (is draw over current image)
    ctx.globalCompositeOperation = 'source-over';


    var path = new Path2D('M17.3,0C4.9,0-3.5,13.4,1.4,25.5l14.2,35.2c0.4,0.9,1.4,1.4,2.3,1c0.5-0.2,0.8-0.5,1-1l14.2-35.2C38,13.4,29.7,0,17.3,0z M17.3,32.5c-8.2,0-14.8-6.6-14.8-14.8c0-8.2,6.6-14.8,14.8-14.8s14.8,6.6,14.8,14.8C32.1,25.9,25.4,32.5,17.3,32.5z');


    ctx.fillStyle = '#0eb19b';
    ctx.fill(path);

    compositeImage = canvas.toDataURL("image/png");

    canvas.remove();
   //console.log(compositeImage)

   
  

var marker = new google.maps.Marker({
  position: user.custom.position,
  title: user.id,
  map: this.map,
  icon: compositeImage
});

this.friendMarkers.push(marker);
console.log(this.friendMarkers);

  }
  createMeetupMarker(source, origin) {
    var canvas = document.createElement('canvas');
    canvas.width = 35;
    canvas.height = 62;
    var ctx = canvas.getContext('2d');
    var image1 = source;
    var image = new Image();
    var compositeImage;



    image.src = image1;

    ctx.drawImage(image, 2.4725, 2.9421, 29.6, 29.6);



    // only draw image where mask is
    ctx.globalCompositeOperation = 'destination-in';

    // draw our circle mask
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(
      14.8 + 2.4725,          // x
      14.8 + 2.9421,          // y
      14.8,          // radius
      0,                  // start angle
      2 * Math.PI         // end angle
    );
    ctx.fill();

    // restore to default composite operation (is draw over current image)
    ctx.globalCompositeOperation = 'source-over';


    var path = new Path2D('M17.3,0C4.9,0-3.5,13.4,1.4,25.5l14.2,35.2c0.4,0.9,1.4,1.4,2.3,1c0.5-0.2,0.8-0.5,1-1l14.2-35.2C38,13.4,29.7,0,17.3,0z M17.3,32.5c-8.2,0-14.8-6.6-14.8-14.8c0-8.2,6.6-14.8,14.8-14.8s14.8,6.6,14.8,14.8C32.1,25.9,25.4,32.5,17.3,32.5z');


    ctx.fillStyle = '#db3d3d';
    ctx.fill(path);

    compositeImage = canvas.toDataURL("image/png");

    canvas.remove();
    console.log(compositeImage)

    var marker = new google.maps.Marker({
      position: origin,
      title: "Jan",
      map: this.map,
      icon: compositeImage
    });


  }

  calcDistance(origin1: Position, origin2:Position){
    return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(origin1.lat, origin1.lng),new google.maps.LatLng(origin2.lat, origin2.lng))
  }

 goThroughFriends(friends : Friendship[]){
 
  friends.forEach((f) => {
    var u : User = new User;
   console.log("Distance")
    if(f.user1.id == this.ps.user.id){
     
      this.cs.getKeyUser(f.user2).subscribe(data => {
        u.id = data["id"];
        u.userName = data["username"];
        u.firstname = data["firstName"];
        u.lastname = data["lastName"];
        u.email = data["email"];
        u.custom = f.user2
       console.log(this.calcDistance(u.custom.position,this.ps.user.custom.position));
        this.createUserMarker(u);
      })
     
      
    
    }else{
      this.cs.getKeyUser(f.user1).subscribe(data => {
        u.id = data["id"];
        u.userName = data["username"];
        u.firstname = data["firstName"];
        u.lastname = data["lastName"];
        u.email = data["email"];
        u.custom = f.user1
        console.log(this.calcDistance(u.custom.position,this.ps.user.custom.position));
        this.createUserMarker(u);
      })
      
    }
   
   
    
   })
 }

  async loadMap() {
    //show LoadingScreen BITTE NICHT ENTFERNEN! danke
    //this.presentLoading();


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

      //dismiss loading if loading Overlay exists BITTE NICHT ENTFERNEN! danke
      //this.loadingController.getTop().then(v => v ? this.loadingController.dismiss() : null);

      console.log(resp.coords.latitude + " " + resp.coords.longitude)

      this.ps.user.custom.position.lat = resp.coords.latitude;
      this.ps.user.custom.position.lng = resp.coords.longitude;
      this.ps.updateUser(this.ps.user.custom);
    

      this.fs.getBefriendedUsers(this.ps.user).subscribe( data => {
       this.goThroughFriends(data);
       
      });
     

      const location = new google.maps.LatLng(this.ps.user.custom.position.lat, this.ps.user.custom.position.lng);
      const location2 = new google.maps.LatLng(resp.coords.latitude+0.0005, resp.coords.longitude+0.0005);
      const location3 = new google.maps.LatLng(resp.coords.latitude-0.0005, resp.coords.longitude-0.0005);
      
      // new ClickEventHandler(this.map, location);

      console.log(MapStyle)

      const mapOptions = {
        center: location,
        zoom: 18,
        disableDefaultUI: true,
        mapId: '2fcab7b62a0e3af9'
      };

      this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

   
   //this.createMeetupMarker('../../assets/normalguy.jpg',location3);

      new ClickEventHandler(this.map, location);








      const userDot = new google.maps.Circle({
        strokeColor: "#0eb19b",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#0eb19b",
        fillOpacity: 1,
        map: this.map,
        center: new google.maps.LatLng(this.ps.user.custom.position.lat, this.ps.user.custom.position.lng),
        radius: 2 //in Meter
      });

      const radiusCircle = new google.maps.Circle({
        strokeColor: "#0eb19b",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0eb19b",
        fillOpacity: 0.05,
        clickable: false,
        map: this.map,
        center: new google.maps.LatLng(this.ps.user.custom.position.lat, this.ps.user.custom.position.lng),
        radius: 100 //in Meter
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






class ClickEventHandler {
  origin;
  map: google.maps.Map;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  placesService: google.maps.places.PlacesService;
  infowindow: google.maps.InfoWindow;
  infowindowContent: HTMLElement;
  constructor(map: google.maps.Map, origin: any) {
    this.origin = origin;
    this.map = map;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    this.placesService = new google.maps.places.PlacesService(map);
    this.infowindow = new google.maps.InfoWindow();
    this.infowindowContent = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;
    console.log(this.infowindowContent);
    this.infowindow.setContent(this.infowindowContent);

    // Listen for clicks on the map.
    this.map.addListener("click", this.handleClick.bind(this));
  }

  handleClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    console.log("You clicked on: " + event.latLng);

    // If the event has a placeId, use it.
    if (this.isIconMouseEvent(event)) {
      console.log("You clicked on place:" + event.placeId);

      // Calling e.stop() on the event prevents the default info window from
      // showing.
      // If you call stop here when there is no placeId you will prevent some
      // other map click event handlers from receiving the event.
      event.stop();

      if (event.placeId) {

        this.getPlaceInformation(event.placeId);
      }
    }
  }

  isIconMouseEvent(
    e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
  ): e is google.maps.IconMouseEvent {
    return "placeId" in e;
  }

  calculateAndDisplayRoute(placeId: string) {
    const me = this;
    this.directionsService.route(
      {
        origin: this.origin,
        destination: { placeId: placeId },
        travelMode: google.maps.TravelMode.WALKING,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }


  getPlaceInformation(placeId: string) {
    const me = this;
    this.placesService.getDetails(
      { placeId: placeId },
      (
        place: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (
          status === "OK" &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          me.infowindow.close();
          me.infowindow.setPosition(place.geometry.location);
          (me.infowindowContent.children[
            "place-icon"
          ] as HTMLImageElement).src = place.icon as string;

          (me.infowindowContent.children[
            "place-name"
          ] as HTMLElement).textContent = place.name!;

          (me.infowindowContent.children[
            "place-address"
          ] as HTMLElement).textContent = place.formatted_address as string;
          me.infowindow.open(me.map);
        }
      }
    );
  }
}

