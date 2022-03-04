import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, MenuController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { CustomUser, User } from '../../model/user';

import { ProfileService } from 'src/app/api/profile.service';
import { FriendshipService } from 'src/app/api/friendship.service';
import { MyskinsService } from 'src/app/api/myskins.service';
import { TutorialService } from 'src/app/api/tutorial.service';
import { ContactlistService } from 'src/app/api/contactlist.service';
import { KeycloakService } from 'src/app/api/auth/keycloak.service';

import { Position } from 'src/app/model/position';
import { SelectedSkinsPage } from './selected-skins/selected-skins.page';
import { ProfilePage } from '../profile/profile.page';
import { MeetupService } from 'src/app/api/meetup.service';
import { Meeting, MeetupUser } from 'src/app/model/meetup';
import { Room } from 'src/app/model/room';
import { FriendPage } from '../friend/friend.page';

import Showcaser from 'showcaser'
import { DateService } from 'src/app/api/date.service';
import { FriendPageRoutingModule } from '../friend/friend-routing.module';
import { GhostmodePage } from './ghostmode/ghostmode.page';
import { PhotoService } from 'src/app/api/photo.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  meetupMarkers = [];
  meetupPreviewMarker: google.maps.Marker;
  userDot: google.maps.Circle;
  skinRadi = [];
  friendProfile: ProfilePage;
  location: Position = new Position();
  wsUri;
  updateMeetup;
  positionUpdate;
  connectUpdate;
  mySubscription;
  meetupPreview;
  blockFriend;
  dateService;

  //map
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  // Button
  @ViewChild('connect_button', { static: false }) connectButRef: ElementRef;

  // Button
  @ViewChild('tutorial', { static: false }) tutorialRef: ElementRef;

  constructor(private menu: MenuController,
    private geolocation: Geolocation,
    public ps: ProfileService,
    public keyCloakService: KeycloakService,
    private fs: FriendshipService,
    public loadingController: LoadingController,
    private mySkinsService: MyskinsService,
    private cs: ContactlistService,
    public popoverController: PopoverController,
    public toastController: ToastController,
    public contactService: ContactlistService,
    public modalController: ModalController,
    public router: Router,
    public ts: TutorialService,
    public meetupService: MeetupService,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public profileService : ProfileService,
    public ds: DateService,
    public photoService: PhotoService,
    public sanitizer: DomSanitizer) {
    this.dateService = ds;
  }

  ngOnChanges() {
    this.showTutorial();
  }

  ngOnInit() {
    this.positionUpdate = this.meetupService.showPositionNotify.subscribe(value => {
      if (this.ps.user.custom.id != value) {
        this.displayFriends();
      }
    });

    this.blockFriend = this.fs.blockedUpdateNotify.subscribe(value => {
      this.displayFriends();
    })

    this.sideMenu();

    this.mySubscription = this.mySkinsService.mySkinUpdateNotify.subscribe(value => {

      this.createMySkinRaduis();
    });

    this.connectUpdate = this.contactService.contactlistUpdateNotify.subscribe(value => {
      if (value == "connect") {
        this.displayFriends();
      }

    });

    this.meetupPreview = this.meetupService.meetupPreviewNotify.subscribe(value => {
      let m: Meeting = value.meetup;
      let r: Room = value.originRoom;
      if (!value.meetupChat) {
        this.createMeetupPreviewMarker(m, r);
      }
      else {
        if (this.ps.user.id == m.creator.id) {
          this.meetupTeilnehmerList(null, m, null);
        } else {
          this.ps.findFriendUser(m.creator.id).subscribe(data => {
            let meetupuser = data;
            this.ps.friendCustomData(m.creator.id).subscribe(data => {
              meetupuser.custom = data;
              this.meetupTeilnehmerList(null, m, meetupuser);
            })
          })
        }
      }
      this.map.panTo(m.position);
      this.map.setZoom(18);
    });

    this.updateMeetup = this.meetupService.MeetupUpdateNotify.subscribe(value => {

      this.displayMeetups();
    });

    this.ps.getUser().add(
      () => {

        let myPos = new Position(6.935640686097218, 51.17546707292189);
        if ("lat" in this.ps.user.custom.position) {
          myPos = this.ps.user.custom.position;
        }
        this.map = new google.maps.Map(this.mapRef.nativeElement, {
          center: myPos,
          zoom: 18,
          disableDefaultUI: true,
          mapId: '2fcab7b62a0e3af9'
        });




        //angemeldeter User
        this.userDot = new google.maps.Circle({
          strokeColor: "#0eb19b",
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: "#0eb19b",
          fillOpacity: 1,
          map: this.map,
          center: myPos,
          radius: 2  //in Meter
        });


        ////DEBUGconsole.log(this.skinService);
      }
    )
  }

  ionViewDidLeave() {
    if (this.meetupPreviewMarker) {
      this.meetupPreviewMarker.setMap(null);
    }
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SelectedSkinsPage,
      cssClass: 'no-overflow',
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then(() => { this.createMySkinRaduis(); });
    return await popover.present();
  }




  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Map loading...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    //DEBUGconsole.log('Loading dismissed!');
  }


  ionViewDidEnter() {
    this.loadMap();
    //DEBUGconsole.log("LOADDDD")
  }

  //Funktion zum User Marker erstellen
  createUserMarker(user: User) {

    var exists = false
    this.friendMarkers.forEach((friend: google.maps.Marker) => {
      if (friend.getTitle() == user.id.toString()) {
        exists = true;
        friend.setPosition(user.custom.position);
      }
    })

    if (!exists) {
      var canvas = document.createElement('canvas');
      canvas.width = 35;
      canvas.height = 62;
      var ctx = canvas.getContext('2d');
      var image = new Image();
      var compositeImage;
      var url;

      if(user.custom.profilePicture!=undefined) {
        url = this.photoService.DOMSanitizer(user.custom.profilePicture);;
      } else {
        this.photoService.getDefaultPfp().subscribe(defaultPfp=> {
          url = this.photoService.DOMSanitizer(defaultPfp);
        })
      }

      image.src = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(url));

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
      ////DEBUGconsole.log(compositeImage)

      var marker = new google.maps.Marker({
        position: user.custom.position,
        title: user.id,
        map: this.map,
        icon: compositeImage
      });

      marker.addListener("click", () => {
        this.ps.findFriendUser(marker.title).subscribe(data => {
          this.presentModal(data);
        });
      });

      this.friendMarkers.push(marker);
    }

  }

  async presentModal(friendKeycloak) {
    let friend: User = friendKeycloak;
    const modal = await this.modalController.create({
      component: FriendPage,
      componentProps: {
        'contacListWebsocket': this.contactService.websocket,
        user: friend
      }
    });
    modal.onDidDismiss().then((data => {
      //DEBUGconsole.log("dismissed")
    }))
    return await modal.present();
  }


  //Funktion für Meetup marker
  createMeetupMarker(m: Meeting, mu: MeetupUser) {
    this.ps.findFriendUser(mu.user_id).subscribe(data => {
      var dummy = data;
      this.ps.getUser().add(data => {
        if (this.ps.user.id == dummy.id) {
          this.ps.findFriendUser(m.creator.id).subscribe(data => {
            var meetupuser = data;
            this.ps.friendCustomData(m.creator.id).subscribe(data => {
              meetupuser.custom = data;
              var canvas = document.createElement('canvas');
              canvas.width = 35;
              canvas.height = 62;
              var ctx = canvas.getContext('2d');
              var image1 = meetupuser.custom.profilePicture;
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
              //DEBUGconsole.log(compositeImage)

              var marker = new google.maps.Marker({
                position: m.position,
                title: mu.user_id,
                map: this.map,
                icon: compositeImage
              });

              marker.addListener("click", () => {
                this.meetupTeilnehmerList(event, m, meetupuser);
              });
              this.meetupMarkers.push(marker);
            })
          })
        }
        else {
          var meetupuser = dummy;
          this.ps.friendCustomData(mu.user_id).subscribe(data => {

            meetupuser.custom = data;

            var canvas = document.createElement('canvas');
            canvas.width = 35;
            canvas.height = 62;
            var ctx = canvas.getContext('2d');
            var image1 = meetupuser.custom.profilePicture;
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


            var marker = new google.maps.Marker({
              position: m.position,
              title: mu.user_id,
              map: this.map,
              icon: compositeImage
            });

            marker.addListener("click", () => {
              this.meetupTeilnehmerList(event, m, null);
            });
            this.meetupMarkers.push(marker);
          })
        }
      })

    })
  }

  createMeetupPreviewMarker(m: Meeting, r: Room) {



    var canvas = document.createElement('canvas');
    canvas.width = 35;
    canvas.height = 62;
    var ctx = canvas.getContext('2d');
    ctx.globalAlpha = 0.5;

    var compositeImage;



    var path = new Path2D('M17.3,0C4.9,0-3.5,13.4,1.4,25.5l14.2,35.2c0.4,0.9,1.4,1.4,2.3,1c0.5-0.2,0.8-0.5,1-1l14.2-35.2C38,13.4,29.7,0,17.3,0z M17.3,32.5c-8.2,0-14.8-6.6-14.8-14.8c0-8.2,6.6-14.8,14.8-14.8s14.8,6.6,14.8,14.8C32.1,25.9,25.4,32.5,17.3,32.5z');


    ctx.fillStyle = '#db3d3d';
    ctx.fill(path);

    compositeImage = canvas.toDataURL("image/png");

    canvas.remove();
    //DEBUGconsole.log(compositeImage)

    if (this.meetupPreviewMarker != undefined) {
      this.meetupPreviewMarker.setMap(null);

    }


    this.meetupPreviewMarker = new google.maps.Marker({
      position: m.position,
      title: "Meetup Preview",
      map: this.map,
      icon: compositeImage
    });

    this.meetupPreviewMarker.addListener("click", () => {

      this.previewMarkerOnclick(r);
    });
  }

  previewMarkerOnclick(r) {
    this.router.navigate(["contactlist"]);
    this.meetupService.meetupPreviewBackObserveable.next(r);
  }

  async presentMeetupPopover(ev: any, m: Meeting, u, buttonArray) {

    /*
({
      component: MeetupDataShowPage,
      componentProps: { meetup: m, user: u },
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    */

    let t: Date;
    let time: string;

    // ----------------------------------------------------------------------------------------------------
    time = this.dateService.returnDateWithoutTime(m) + ' at ' + this.dateService.returnTimeString(m);


    let name = ""+ m.name;
    if(!m.name) {
     name = 'Meetup ' + m.id;
    } 

    const popover = await this.actionSheetController.create({
      header: name,
      subHeader: time,
      buttons: buttonArray
    });
    return await popover.present();
  }

  async meetupTeilnehmerList(ev: any, m: Meeting, u) {
    if (u != null) {
      this.cs.getKeyUser(u.custom).subscribe(data => {
        u.id = data["id"];
        u.userName = data["username"];
        u.firstname = data["firstName"];
        u.lastname = data["lastName"];
        u.email = data["email"];


        let buttonArray: any[] = [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            //DEBUGconsole.log('Cancel clicked');
          }
        }, {
          text: u.username,
          cssClass: "accepted",
          icon: 'checkmark-circle-sharp',
          handler: () => {
            this.presentModal(u);
          }
        }];
        this.meetupService.getMeetupUser(m.id).subscribe(data => {
          let count = 0;
          data.forEach((mu, idx, array) => {
            //DEBUGconsole.log(mu.user_id)
            this.ps.findFriendUser(mu.user_id).subscribe(data => {
              let u = data;
              this.ps.friendCustomData(mu.user_id).subscribe(custom => {
                u.custom = custom;
                //DEBUGconsole.log(custom)

                this.cs.getKeyUser(u.custom).subscribe(data => {
                  u.id = data["id"];
                  u.userName = data["username"];
                  u.firstname = data["firstName"];
                  u.lastname = data["lastName"];
                  u.email = data["email"];
                  //DEBUGconsole.log(mu.status)
                  let iconname;
                  switch (mu.status) {
                    case "accepted": {
                      iconname = "checkmark-circle-sharp";
                      break;
                    }
                    case "declined": {
                      iconname = "close-circle-sharp";
                      break;
                    }
                    case "pending": {
                      iconname = "time-sharp";
                      break;
                    }
                  }

                  if (u.id != this.ps.user.id) {
                    let o = {
                      text: u.userName,
                      cssClass: mu.status,
                      icon: iconname,
                      handler: () => {
                        this.presentModal(u);
                      }
                    }
                    buttonArray.push(o);
                  }
                  count++;
                  if (count === array.length) {
                    this.presentMeetupPopover(ev, m, u, buttonArray);
                  }

                  //DEBUGconsole.log(buttonArray)
                })

              });
            });

          })
        });
      })

    } else {



      let buttonArray: any[] = [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          //DEBUGconsole.log('Cancel clicked');
        }
      }];
      this.meetupService.getMeetupUser(m.id).subscribe(data => {
        let count = 0;
        data.forEach((mu, idx, array) => {
          //DEBUGconsole.log(mu.user_id)
          this.ps.findFriendUser(mu.user_id).subscribe(data => {
            let u = data;
            this.ps.friendCustomData(mu.user_id).subscribe(custom => {
              u.custom = custom;
              //DEBUGconsole.log(custom)

              this.cs.getKeyUser(u.custom).subscribe(data => {
                u.id = data["id"];
                u.userName = data["username"];
                u.firstname = data["firstName"];
                u.lastname = data["lastName"];
                u.email = data["email"];
                //DEBUGconsole.log(mu.status)
                let iconname;
                switch (mu.status) {
                  case "accepted": {
                    iconname = "checkmark-circle-sharp";
                    break;
                  }
                  case "declined": {
                    iconname = "close-circle-sharp";
                    break;
                  }
                  case "pending": {
                    iconname = "time-sharp";
                    break;
                  }
                }

                if (u.id != this.ps.user.id) {
                  let o = {
                    text: u.userName,
                    cssClass: mu.status,
                    icon: iconname,
                    handler: () => {
                      this.presentModal(u);
                    }
                  }
                  buttonArray.push(o);
                }

                count++;
                //DEBUGconsole.log(count)
                //DEBUGconsole.log(array.length)
                if (count === array.length) {
                  this.presentMeetupPopover(ev, m, u, buttonArray);
                }

                //DEBUGconsole.log(buttonArray)
              })

            });
          });

        })

      })

    }



  }

  async presentGhostPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: GhostmodePage,
      cssClass: 'no-overflow',
      event: ev,
      translucent: true
    });
    popover.onDidDismiss().then(() => { this.profileService.updateUser(this.profileService.user.custom).subscribe(()=>{
      //DEBUGconsole.log("updated wuhu")
    }); });
    
    return await popover.present();
  }


  //Distance zwischen zwei Positionen
  calcDistance(origin1: Position, origin2: Position) {
    if (google.maps.geometry) {
      return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(origin1.lat, origin1.lng), new google.maps.LatLng(origin2.lat, origin2.lng));
    }
    return null;
  }

  displayMeetups() {
    this.meetupService.getMeetups().subscribe(data => {
      this.meetupMarkers.forEach((m: google.maps.Marker) => {
        m.setMap(null);
      })
      this.meetupMarkers.splice(0, this.meetupMarkers.length - 1)
      var meetups = data;

      meetups.forEach((m) => {
        this.meetupService.getMeetupUser(m.id).subscribe(data => {
          data.forEach((mu) => {

            this.createMeetupMarker(m, mu);
          })
        })
      })
    })
  }

  //iterate through friends in Friendship-Table
  displayFriends() {
    this.fs.getBefriendedUsers(this.ps.user).subscribe(data => {
      var friends = data;

      this.friendMarkers.forEach((marker: google.maps.Marker, index) => {
        var exists = false;
        friends.forEach((f) => {
          if (marker.getTitle() == f.user1.id.toString() || marker.getTitle() == f.user2.id.toString()) {
            exists = true;
          }
        })
        if (!exists) {
          marker.setMap(null);
          this.friendMarkers.splice(index, 1);
        }
      })

      friends.forEach((f) => {
        var u: User = new User;


        if (f.user1.id == this.ps.user.id) {
          if(!f.user2.hideLocation){
            this.cs.getKeyUser(f.user2).subscribe(data => {
              u.id = data["id"];
              u.userName = data["username"];
              u.firstname = data["firstName"];
              u.lastname = data["lastName"];
              u.email = data["email"];
              u.custom = f.user2
  
              this.createUserMarker(u);
            })
          }

        

        } else {
          if(!f.user1.hideLocation){
          this.cs.getKeyUser(f.user1).subscribe(data => {
            u.id = data["id"];
            u.userName = data["username"];
            u.firstname = data["firstName"];
            u.lastname = data["lastName"];
            u.email = data["email"];
            u.custom = f.user1

            this.createUserMarker(u);
          })
        }
        }



      })

    });

  }

  createMySkinRaduis() {
    this.mySkinsService.getMapSkins().subscribe(data => {
      this.mySkinsService.mapSkins = data;


      if (this.mySkinsService.mapSkins) {
        this.skinRadi.forEach((circle: google.maps.Circle, index) => {
          var exists = false;
          this.mySkinsService.mapSkins.forEach((myskin) => {
            if (circle.get('title') == myskin.skin.id) {
              exists = true;
            }
          })
          if (!exists) {
            circle.setMap(null);
            this.skinRadi.splice(index, 1);
          }
        })


        this.mySkinsService.mapSkins.forEach((myskin) => {

          var existingCircle: google.maps.Circle;
          this.skinRadi.forEach((circle: google.maps.Circle) => {
            if (circle.get('title') == myskin.skin.id) {
              existingCircle = circle;
            }
          });

          if (existingCircle != null && existingCircle != undefined) {

            existingCircle.setRadius(myskin.radius * 1000);
            existingCircle.setCenter(this.ps.user.custom.position);
          } else {
            //DEBUGconsole.log("seas" + this.ps.user.custom.tutorialStage)
            var newCircle = new google.maps.Circle({
              title: myskin.skin.id,
              strokeColor: "#0eb19b",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: this.intToRGB(this.hashCode(myskin.skin.title)),
              fillOpacity: 0.08,
              clickable: false,
              map: this.map,
              center: new google.maps.LatLng(this.ps.user.custom.position.lat, this.ps.user.custom.position.lng),
              radius: myskin.radius * 1000 //Umwandlung von Kilometer auf Meter
            });
            this.skinRadi.push(newCircle);
          }
        })
      } else {
        this.skinRadi.forEach((circle: google.maps.Circle) => {
          circle.setMap(null);
        });
        this.skinRadi = [];
      }
    })
    this.showTutorial();
  }

  hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    ////DEBUGconsole.log(hash)
    return hash;
  }

  intToRGB(i) {
    var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  }

  centerMap() {
    //DEBUGconsole.log(this.ps.user.custom.position);
    this.map.panTo(this.ps.user.custom.position);
    this.map.setZoom(18);

  }

  updateUserDot() {

    this.userDot.setMap(this.map);
    this.userDot.setCenter(new google.maps.LatLng(this.ps.user.custom.position.lat, this.ps.user.custom.position.lng));

  }


  //Map loading Funktion
  loadMap() {
    //show LoadingScreen BITTE NICHT ENTFERNEN! danke
    //this.presentLoading();

    // This code is necessary for browser
    /*
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBtsGRD6cmDQvehofWlUINq1SwvSK-Iq_Q',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBtsGRD6cmDQvehofWlUINq1SwvSK-Iq_Q'
    });
    */

    var id = navigator.geolocation.watchPosition(pos => {
      var crd = pos.coords;
      var updatedLocation = new Position(crd.longitude, crd.latitude);
      var distance = this.calcDistance(this.location, updatedLocation);

      if (distance > 50) {
        this.ps.updateUser(this.ps.user.custom).subscribe(data => {
          this.createMySkinRaduis();
          this.updateUserDot();
          this.meetupService.positionObservable.next("positionUpdate:" + this.ps.user.custom.id);
        })
      }

    });


    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      //dismiss loading if loading Overlay exists BITTE NICHT ENTFERNEN! danke
      //this.loadingController.getTop().then(v => v ? this.loadingController.dismiss() : null);



      this.ps.user.custom.position = new Position(resp.coords.longitude, resp.coords.latitude);
      this.location.lat = this.ps.user.custom.position.lat;
      this.location.lng = this.ps.user.custom.position.lng;
      const location = new google.maps.LatLng(this.ps.user.custom.position.lat, this.ps.user.custom.position.lng);


      this.ps.getUser().add(() => {

        this.ps.user.custom.position = new Position(resp.coords.longitude, resp.coords.latitude);
        this.ps.updateUser(this.ps.user.custom).subscribe(data => {

          this.ps.user.custom = data;


          this.createMySkinRaduis();
          this.displayFriends();
          this.displayMeetups();



          const location2 = new google.maps.LatLng(resp.coords.latitude + 0.0005, resp.coords.longitude + 0.0005);
          const location3 = new google.maps.LatLng(resp.coords.latitude - 0.0005, resp.coords.longitude - 0.0005);

          //new ClickEventHandler(this.map, location);






          this.updateUserDot();




          //this.createMeetupMarker('../../assets/normalguy.jpg',location3);

          new ClickEventHandler(this.map, location, this.ps, this, this.meetupService);
        })
      });
    }).catch((error) => {
      //DEBUGconsole.log('Error getting location', error);
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Willkommen!',
      message: 'Das erste Mal hier? <br>Möchtest Du das <strong>Tutorial</strong> starten?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //DEBUGconsole.log('Confirm Cancel: blah');
            this.ps.skipTutorial(this.ps.user.custom).subscribe(data => {
              //DEBUGconsole.log("Tutorial has been skipped")
              this.router.navigate(["home"])
            });
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.ps.getUser().add(() => {
              //DEBUGconsole.log('Confirm Okay');
              //DEBUGconsole.log(this.ps.user.custom.tutorialStage + "sdlflsajlf")
              if (this.ps.user.custom.tutorialStage == 0) {
                Showcaser.showcase("Das ist die Home Seite. Das Herzstück von Connect. Doch starten wir doch einmal mit den Basics.", null, {
                  buttonText: "OK!",
                  position: {
                    horizontal: "center",
                    vertical: "top"
                  },
                  allowSkip: false,
                  close: () => {
                    this.ps.startTutorial(this.ps.user.custom).subscribe(data => {
                      //DEBUGconsole.log("Tutorial has been started")
                      this.router.navigate(["profile"])
                    });
                  }
                });
              }
            })

          }
        }
      ]
    });

    await alert.present();
  }

  showTutorial() {
    this.ps.getUser().add(
      () => {

        if (this.ps.user.custom.tutorialStage == 0) {
          this.presentAlertConfirm();
        }

        if (this.ps.user.custom.tutorialStage == 6) {
          Showcaser.showcase("Aktiviere oben rechts den Skin!", null, {
            shape: "circle",
            buttonText: "Ok!",
            position: {
              horizontal: "center",
              vertical: "top"
            },
            allowSkip: false,
            close: () => {
              this.ps.updateUserTutorial(this.ps.user.custom).subscribe(data => {
              });
            }

          });
        }
        if (this.ps.user.custom.id == this.keyCloakService.userid && this.ps.user.custom.tutorialStage == 7) {
          Showcaser.showcase("Drück auf den Connect Button um dich zu connecten", this.connectButRef.nativeElement, {
            shape: "circle",
            buttonText: "Ok!",
            position: {
              horizontal: "center",
              vertical: "top"
            },
            allowSkip: false,
            close: () => {
              this.ps.updateUserTutorial(this.ps.user.custom).subscribe(data => {
              });
            }
          });
        }
      }
    )

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

  }




  connect() {
    if (this.mySkinsService.mapSkins != undefined && this.mySkinsService.mapSkins != null && !this.profileService.user.custom.blockConnect) {
      this.fs.connect(this.mySkinsService.mapSkins).subscribe(data => {
        if (data != null) {
          var user = new CustomUser();

          user = data;
          this.contactService.getKeyUser(user).subscribe(data => {
            this.presentToastWithOptions(data, "You connected with");
            this.contactService.contactlistObservable.next("newConnect:" + user.id + ":" + this.ps.user.id);
            this.contactService.contactlistObservable.next("contactListUpdate");
            this.displayFriends();
          })

        } else {
          //DEBUGconsole.log(data)
          this.presentToastWithOptions(data, "Zurzeit niemand in der Nähe");
        }

      })
    }
  }

  async presentToastWithOptions(data, msg) {
    var username = "";
    var buttonText = "Einstellungen ändern!"
    var header = "'Tschuldigung!"
    if (data != null) {
      //DEBUGconsole.log("yes");
      header = "Gratulation!"
      buttonText = "Schreib " + data["username"] + " an"
      username = data["username"];
    }
    const toast = await this.toastController.create({
      header: header,
      message: msg + ' ' + username,
      position: 'top',
      duration: 2000,
      buttons: [
        {
          side: 'end',
          text: buttonText,
          handler: () => {
            if (username == "") {
              this.router.navigate(["my-skins"])
            } else {
              this.router.navigate(["contactlist"])
            }
          }
        }
      ]
    });
    toast.present();
  }

}






class ClickEventHandler {
  origin;
  map: google.maps.Map;
  ps;
  hp;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  placesService: google.maps.places.PlacesService;
  infowindow: google.maps.InfoWindow;
  infowindowContent: HTMLElement;
  e1: HTMLElement;
  e2: HTMLElement;
  eb: HTMLElement;
  e3: HTMLElement;
  constructor(map: google.maps.Map, origin: any, ps: ProfileService, hp: HomePage, public meetupService: MeetupService) {
    this.origin = origin;
    this.map = map;
    this.ps = ps;
    this.hp = hp;
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
    this.infowindow.setContent(this.infowindowContent);

    // Listen for clicks on the map.
    this.map.addListener("click", this.handleClick.bind(this));
  }

  handleClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    //DEBUGconsole.log('you clicked on: ' + event.latLng.toString());
    /*
    var distance = this.hp.calcDistance(this.ps.user.custom.position, new Position(event.latLng.lng(), event.latLng.lat()));
    //DEBUGconsole.log(distance);
    if(distance > 50) {
      this.ps.user.custom.position.lat = event.latLng.lat();
      this.ps.user.custom.position.lng = event.latLng.lng();
      this.ps.updateUser(this.ps.user.custom).subscribe(data => {
        this.hp.createMySkinRaduis();
        this.hp.updateUserDot();
        this.meetupService.positionObservable.next("positionUpdate:" + this.ps.user.custom.id);
      });
    }
    */



    // If the event has a placeId, use it.
    if (this.isIconMouseEvent(event)) {
      //DEBUGconsole.log("You clicked on place:" + event.placeId);

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

