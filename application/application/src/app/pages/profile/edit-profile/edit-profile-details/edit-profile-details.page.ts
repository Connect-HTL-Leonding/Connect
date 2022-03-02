import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/api/auth/keycloak.service';
import { ProfileService } from '../../../../api/profile.service';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-edit-profile-details',
  templateUrl: './edit-profile-details.page.html',
  styleUrls: ['./edit-profile-details.page.scss'],
})
export class EditProfileDetailsPage implements OnInit {

  //passwort: FormGroup;
  nachrichten: boolean = false;
  connects: boolean = false;
  password: string | undefined

  //Konstruktor
  constructor(public ps: ProfileService, private keyCloakService: KeycloakService, private router: Router, private fb: FormBuilder) {
    /*
    this.passwort = this.fb.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.minLength(8),
        // Validators.maxLength(20),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')
      ])),
      newPassword: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.minLength(8),
        // Validators.maxLength(20),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')
      ])),
      confirmation: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.minLength(8),
        // Validators.maxLength(20),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')
      ])),
    });
    */
  }

  //init
  ngOnInit() {
    //getCurrentUser
    this.password = ""
    this.ps.getUser().add(
      () => {
        //DEBUGconsole.log(this.ps.user)
        
      }
    )
  }

  //User Logout
  logout() {
    //logout
    this.keyCloakService.logout();
    //redirect to login, weil autamtischer redirect nicht immer funktioniert
    //bessere Lösung ist willkommen
    //this.router.navigate(["home"]);
  }

  updateUser(u: User) {

    //Json der von keycloak benötigt wird
    var json = {
      "username": u.userName,
      "firstName": u.firstname,
      "lastName": u.lastname,
      "email": u.email,
      "emailVerified": false,
      "attributes": {}
    }

    //Update von Keycloak Daten
    this.ps.updateKeycloakUser(json).subscribe(data => {
      //Update von eigener Datenbank
      this.ps.updateUser(u.custom).subscribe(data => {
        //return ist aktualisierter User
        //DEBUGconsole.log(data)

        if (this.password) {
          this.keyCloakService.getAdminToken().subscribe(data_access => {
            //DEBUGconsole.log(data_access)
            this.keyCloakService.changePassword(u.custom, data_access["access_token"], this.password).subscribe(data_password => {
              //DEBUGconsole.log(data_password)
            }, error => {
              //DEBUGconsole.log(error)
            }, () => {
              this.ngOnInit();
              //DEBUGconsole.log("reset");
              
            })
          })
        } else {
          this.ngOnInit();
        }
      });
    },
      error => {
        //DEBUGconsole.log('HTTP Error', error);
      });


  }

  /*
  updatePasswort() {
    if (this.passwort) {
      //DEBUGconsole.log("Form Submitted!");
      //{ "type": "password", "temporary": false, "value": "my-new-password" }
      var json = {
        "type": "password",
        "temporary": false,
        "value": this.passwort
      }

      //DEBUGconsole.log(json)

      //Update von Keycloak Daten
      this.ps.updatePassword(json).subscribe();
    }
  }
  */

}
