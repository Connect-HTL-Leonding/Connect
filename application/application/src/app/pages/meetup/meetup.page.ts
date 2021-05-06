import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ProfileService } from 'src/app/api/profile.service';
import { User } from 'src/app/model/user';
import { ChatPage } from '../chat/chat.page';
import { MeetupDataPage } from '../meetup-data/meetup-data.page';
declare var google: any;

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.page.html',
  styleUrls: ['./meetup.page.scss'],
})
export class MeetupPage implements OnInit {

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  map: any;
  @Input() otherUser : User;
  userDot;
  meetupMarker: google.maps.Marker;
  

  constructor(public modalController:ModalController, public popoverController: PopoverController, public ps:ProfileService) {
    
  }

  ionViewDidEnter() {
    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      center: this.ps.user.custom.position,
      zoom: 18,
      disableDefaultUI: true,
      mapId: '2fcab7b62a0e3af9'
    });

    this.userDot = new google.maps.Circle({
      strokeColor: "#0eb19b",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#0eb19b",
      fillOpacity: 1,
      map: this.map,
      center: this.ps.user.custom.position,
      radius: 2  //in Meter
    });

    this.createMeetupMarker(this.ps.user.custom.position);

    new ClickEventHandler(this.map, location, this.ps, this);

    console.log(this.map);
  }

  centerMap() {
    console.log("centermap");
    console.log(this.ps.user.custom.position);
    this.map.panTo(this.ps.user.custom.position);
    this.map.setZoom(18);

  }

  updateMarker(origin) {
    this.meetupMarker.setPosition(origin);
  }

  createMeetupMarker(origin) {
    var canvas = document.createElement('canvas');
    canvas.width = 35;
    canvas.height = 62;
    var ctx = canvas.getContext('2d');
    var image1 = this.otherUser.custom.profilePicture;
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

    this.meetupMarker = new google.maps.Marker({
      position: origin,
      title: "Jan",
      map: this.map,
      icon: compositeImage
    });


  }

  ngOnInit() {
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MeetupDataPage,
      componentProps: {otherUser: this.otherUser, position: this.meetupMarker.getPosition(), mp: this},
      cssClass : "fullscreen",
      event: ev,
      translucent: true
    });
    await popover.present();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}

class ClickEventHandler {
  origin;
  map: google.maps.Map;
  ps;
  mp;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  placesService: google.maps.places.PlacesService;
  infowindow: google.maps.InfoWindow;
  infowindowContent: HTMLElement;
  e1: HTMLElement;
  e2: HTMLElement;
  eb: HTMLElement;
  e3: HTMLElement;
  constructor(map: google.maps.Map, origin: any, ps: ProfileService, mp: MeetupPage) {
    this.origin = origin;
    this.map = map;
    this.ps = ps;
    this.mp = mp
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    this.placesService = new google.maps.places.PlacesService(map);
    this.infowindow = new google.maps.InfoWindow();
    this.infowindowContent = document.getElementById(
      "infowindow-content"
    ) as HTMLElement;
    /*
    this.infowindowContent = document.createElement("div");
    this.infowindowContent.classList.add("infowindow-content");
    this.e1 = document.createElement("img");
    this.e1.classList.add("place-icon");
    this.e1.setAttribute("src","");
    this.e2 = document.createElement("span");
    this.e1.classList.add("place-name");
    this.eb = document.createElement("br");
    this.e3 = document.createElement("span");
    this.e1.classList.add("place-address");
    this.infowindowContent.append(this.e1);
    this.infowindowContent.append(this.e2);
    this.infowindowContent.append(this.eb);
    this.infowindowContent.append(this.e3);
    */
    console.log(this.infowindowContent);
    this.infowindow.setContent(this.infowindowContent);

    // Listen for clicks on the map.
    this.map.addListener("click", this.handleClick.bind(this));
  }

  handleClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    console.log('you clicked on: ' + event.latLng.toString());
    this.mp.updateMarker(event.latLng);

    


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



          me.infowindow.open(me.map);
        }
      }
    );
  }
}
