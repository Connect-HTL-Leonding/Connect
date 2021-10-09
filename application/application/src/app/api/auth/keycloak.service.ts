import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakProfile, KeycloakRoles } from 'keycloak-js';
import { api } from 'src/app/app.component';
import { ProfileService } from '../profile.service';

import jwt_decode from 'jwt-decode';

import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  public authenticated: boolean = false;
  public roles: KeycloakRoles;
  public user: KeycloakProfile
  public userid: String

  constructor(private http: HttpClient) { }

  //direct grant flow with password
  login() {

    //body
    let body = new URLSearchParams();
    body.set('client_id', "connect-frontend");
    body.set('client_secret', "");
    body.set('grant_type', "password");
    body.set('scope', "openid");

    body.set('username', "jan");
    body.set('password', "geheim");

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

        console.log(tokenInfo)
        this.userid = tokenInfo["sub"];
        this.setSession(data)
        //this.getUser(data);

        //OLD
        //this.getAccount(data)
      }
      catch (Error) {

      }
    });
  }

    //direct grant flow with refresh token
    refresh() {

      /*
      Method: POST
URL: https://keycloak.example.com/auth/realms/myrealm/protocol/openid-connect/token
Body type: x-www-form-urlencoded
Form fields:    
client_id : <my-client-name>
grant_type : refresh_token
refresh_token: <my-refresh-token>
*/

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
      
      .subscribe(data => {
  
        this.authenticated = true;
  
        try {
          console.log("LOGGED IN" + this.authenticated)
          let tokenInfo = jwt_decode(data["access_token"])
  
          console.log(tokenInfo)
          this.userid = tokenInfo["sub"];
          this.setSession(data)
          //this.getUser(data);
  
          //OLD
          //this.getAccount(data)
        }
        catch (Error) {
  
        }
        
  
      });
      
      
    }

  private setSession(authResult) {
    console.log(authResult)
    const expires_in = moment().add(authResult.expires_in, 'second');

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    localStorage.setItem("expires_in", JSON.stringify(expires_in.valueOf()));
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
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
