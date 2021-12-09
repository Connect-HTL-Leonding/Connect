import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakProfile, KeycloakRoles } from 'keycloak-js';
import { api } from 'src/app/app.component';
import { ProfileService } from '../profile.service';

import jwt_decode from 'jwt-decode';

import * as moment from "moment";
import { EMPTY, Observable, of } from 'rxjs';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  public authenticated: boolean = false;
  public roles: KeycloakRoles;
  public user: KeycloakProfile
  public userid: String

  constructor(private http: HttpClient, public router: Router) { }

  //direct grant flow with password
  login(username, password) {

    //body
    let body = new URLSearchParams();
    body.set('client_id', "connect-frontend");
    body.set('client_secret', "");
    body.set('grant_type', "password");
    body.set('scope', "openid");

    body.set('username', username);
    body.set('password', password);

    //x-www-form-urlencoded
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    //direct grant url
    return this.http.post<Object>(api.ip + ':8010/auth/realms/connect/protocol/openid-connect/token', body.toString(), options)

      .subscribe(data => {

        this.authenticated = true;

        try {
          console.log("LOGGED IN" + this.authenticated)
          let tokenInfo = jwt_decode(data["access_token"])

          this.userid = tokenInfo["sub"];
          this.setSession(data)
        }
        catch (Error) {

        }
      });
  }

  //direct grant flow with refresh token
  refresh() /*: Observable<string>*/ {

    //body
    let body = new URLSearchParams();
    body.set('client_id', "connect-frontend");
    body.set('client_secret', "");
    body.set('grant_type', "refresh_token");
    body.set('refresh_token', localStorage.getItem("refresh_token"));


    //x-www-form-urlencoded
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    //direct grant url
    return this.http.post<Object>(api.ip + ':8010/auth/realms/connect/protocol/openid-connect/token', body.toString(), options)
  }

  getAdminToken() {
    //keycloak
    /*
    this.http.get<any>(api.url + 'keycloak/adminToken').subscribe(data => {
      console.log(data)
    })
    */
    //body
    let body = new URLSearchParams();
    body.set('client_id', "admin-cli");
    body.set('client_secret', "d98ff697-a5aa-4e21-a1ce-c038108d5891");
    body.set('grant_type', "client_credentials");


    //x-www-form-urlencoded
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<Object>(api.ip + ':8010/auth/realms/connect/protocol/openid-connect/token', body.toString(), options);
  }

  createUser(keycloakUser, accessToken) {

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${accessToken}`)
    };

    return this.http.post<Object>(api.ip + ':8010/auth/admin/realms/connect/users', keycloakUser, options);
  }

  setSession(authResult) {
    console.log("TOKEN SET")
    const expires_in = moment().add(authResult.expires_in, 'second');

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    localStorage.setItem("expires_in", JSON.stringify(expires_in.valueOf()));

  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
    this.authenticated = false;
    this.router.navigate(["login"]).then(() => {
      window.location.reload();
    });

  }

  public isLoggedIn() {
    return this.userid != null && moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_in");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
