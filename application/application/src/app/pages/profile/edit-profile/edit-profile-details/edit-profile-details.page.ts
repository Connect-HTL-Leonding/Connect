import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ProfileService } from '../../../../api/profile.service';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-edit-profile-details',
  templateUrl: './edit-profile-details.page.html',
  styleUrls: ['./edit-profile-details.page.scss'],
})
export class EditProfileDetailsPage implements OnInit {

  passwort: FormGroup;
  nachrichten: boolean = false;
  connects: boolean = false;

  //Konstruktor
  constructor(public ps: ProfileService, private keyCloakService : KeycloakService, private router: Router, private fb: FormBuilder) {
    this.passwort = this.fb.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        //Validators.minLength(8),
        // Validators.maxLength(20),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')
      ])),
      newPassword: new FormControl('', Validators.compose([
        Validators.required,
        //Validators.minLength(8),
        // Validators.maxLength(20),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')
      ])),
      confirmation: new FormControl('', Validators.compose([
        Validators.required,
        //Validators.minLength(8),
        // Validators.maxLength(20),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')
      ])),
    });
  }

  //init
  ngOnInit() {
    //getCurrentUser
    this.ps.getUser().subscribe(
      data => {
        //console.log(data);
        this.ps.user.custom = data;
        console.log(this.ps.user)
      },
      error => {
        console.log('HTTP Error', error);
      }
    )
  }

  //User Logout
  logout() {
    //logout
    this.keyCloakService.logout();
    //redirect to login, weil autamtischer redirect nicht immer funktioniert
    //bessere Lösung ist willkommen
    this.router.navigate(["/login"]);
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
        console.log(data)
        this.ngOnInit();
      });
    },
      error => {
        console.log('HTTP Error', error);
      });
  }

  updatePasswort() {
    if (this.passwort.valid) {
      console.log("Form Submitted!");
      //{ "type": "password", "temporary": false, "value": "my-new-password" }
      var json = {
        "type": "password",
        "temporary": false,
        "value": this.passwort.get("confirmation").value
      }

      console.log(json)

      //Update von Keycloak Daten
      this.ps.updatePassword(json).subscribe();
    }


  }

}
