import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  reg_first: String;
  reg_last: String;
  reg_username: String;
  reg_email: String;
  reg_password: String;

  login_toggle: boolean = true

  constructor(public http: HttpClient,
    public keycloak: KeycloakService,
    public modalController: ModalController,
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

  }

  toggleLogin() {
    this.login_toggle = !this.login_toggle
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