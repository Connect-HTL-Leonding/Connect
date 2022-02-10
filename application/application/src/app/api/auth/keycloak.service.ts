import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakProfile, KeycloakRoles } from 'keycloak-js';
import { api } from 'src/app/app.component';

import jwt_decode from 'jwt-decode';

import * as moment from "moment";
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  //Boolean true, wenn Benutzer angemeldet
  public authenticated: boolean = false;

  //Benutzer-ID
  public userid: String

  //Keycloak
  public roles: KeycloakRoles;
  public user: KeycloakProfile

  //Konstruktor
  constructor(private http: HttpClient, public router: Router) { }


  //direct grant flow with password
  //Keycloak über REST-API ansprechen
  login(username, password) {

    //body bauen
    //Aufbau in offizieller Keycloak-Doku zu finden
    let body = new URLSearchParams();
    body.set('client_id', "connect-frontend");
    body.set('client_secret', "");
    body.set('grant_type', "password");
    body.set('scope', "openid");

    //Übergebene User-Credentials in Body einbauen
    body.set('username', username);
    body.set('password', password);

    //x-www-form-urlencoded
    //Keycloak verlangt danach
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    //direct grant url
    return this.http.post<Object>(api.ip + '/auth/realms/connect/protocol/openid-connect/token', body.toString(), options)
  }

  //UMA Permission Token!
  //grant-type: urn:ietf:params:oauth:grant-type:uma-ticket
  //audience: connect-client
  //zuvor geholtes access-token wird verwendet um weiteres access-token zu holen
  //wird für quarkus-keycloak maven plugin benötigt
  //https://stackoverflow.com/questions/64073855/how-to-get-requesting-party-token-rpt-by-api-in-keycloak
  uma(token) {

    //body
    let body = new URLSearchParams();
    body.set('audience', "connect-client");
    body.set('grant_type', "urn:ietf:params:oauth:grant-type:uma-ticket");

    //x-www-form-urlencoded + Bearer Token
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', `Bearer ${token}`)
    };

    //direct grant url
    return this.http.post<Object>(api.ip + '/auth/realms/connect/protocol/openid-connect/token', body.toString(), options)

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
  refresh() {

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
    return this.http.post<Object>(api.ip + '/auth/realms/connect/protocol/openid-connect/token', body.toString(), options)
  }

  //Admin-Token holen für zB. Passwort ändern
  getAdminToken() {

    //body
    let body = new URLSearchParams();
    body.set('client_id', "admin-cli");
    body.set('client_secret', "d98ff697-a5aa-4e21-a1ce-c038108d5891");
    body.set('grant_type', "client_credentials");


    //x-www-form-urlencoded
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<Object>(api.ip + '/auth/realms/connect/protocol/openid-connect/token', body.toString(), options);
  }

  //Passwort ändern
  changePassword(keycloakUser, accessToken, password) {

    //Body Aufbau in offizieller Keycloak-Doku zu finden
    let body = {
      "type": "password",
      "temporary": false,
      "value": password
    }

    //console.log(accessToken)

    let optionss = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${accessToken}`)
    };

    return this.http.put(api.ip + '/auth/admin/realms/connect/users/' + keycloakUser.id + '/reset-password', body, optionss);
  }

  //Keycloak-User erstellen
  createUser(keycloakUser, accessToken) {

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${accessToken}`)
    };

    return this.http.post<Object>(api.ip + '/auth/admin/realms/connect/users', keycloakUser, options);
  }

  //Session erstellen
  //Access + Refresh Token setzen
  //+ Exipre-Date
  setSession(authResult) {
    console.log("TOKEN SET")
    const expires_in = moment().add(authResult.expires_in, 'second');

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    localStorage.setItem("expires_in", JSON.stringify(expires_in.valueOf()));

  }

  //Session beenden
  //Tokens löschen
  //Windows reloaden um App zurückzusetzen
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
    this.authenticated = false;
    this.router.navigate(["home"]).then(() => {
      window.location.reload();
    });
  }

  //Überprüfen ob Token abgelaufen ist
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
