import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { KeycloakService } from 'src/app/api/auth/keycloak.service';
import { api, AppComponent } from 'src/app/app.component';
import { HomePage } from '../home/home.page';
import { DevinfosPage } from './devinfos/devinfos.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: String;
  password: String;

  login_toggle: boolean = true

  constructor(public http: HttpClient,
    public keycloak: KeycloakService,
    public modalController: ModalController,
    public toastController: ToastController,
    public router: Router,
    public app: AppComponent) {

  }

  login() {
    if (this.username && this.password) {
      console.log("LOGIN VERSUCH")
      this.keycloak.login(this.username, this.password).add(() => {
        this.username = "";
        this.password = "";
        this.http.get<any>(api.url + 'user/login').subscribe(data => {
          console.log("LOGIN: " + data);
          this.router.navigate(["home"]).then(() => {
            //window.location.reload();
            this.app.ngOnInit();
          });
          //this.app.ngOnInit();
        })
      });

    }
  }

  regis(ngForm: NgForm) {
    console.log(ngForm.value)
    //http://localhost:8010/auth/admin/realms/connect/users
    this.keycloak.getAdminToken().subscribe(data => {
      var body = {
        "firstName": ngForm.value["reg_first"],
        "lastName": ngForm.value["reg_last"],
        "email": ngForm.value["reg_email"],
        "enabled": true,
        "username": ngForm.value["reg_username"],
        "credentials": [{
          "type": "password",
          "temporary": false,
          "value": ngForm.value["reg_password"]
        }]
      }

      console.log(body)

      this.keycloak.createUser(body, data["access_token"]).subscribe(data => {
        console.log(data)
        console.log(body.username)
        this.username = ngForm.value["reg_username"]
        this.password = ngForm.value["reg_password"]
        ngForm.reset()
        this.login()

      }, error => {
        console.log(error)
        console.log(error.error.errorMessage)
        if (error.status == 409) {
          this.presentToast(error.error.errorMessage)
        }
      })
    })
  }

  toggleLogin() {
    this.login_toggle = !this.login_toggle
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      color: "danger"
    });
    toast.present();
  }


  //info modal
  //Modal öffnen
  async presentModal() {
    console.log("Modal openeing")
    const modal = await this.modalController.create({
      component: DevinfosPage,
    });
    return await modal.present();
  }


}