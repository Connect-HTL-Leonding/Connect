import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from './keycloak.service';

import jwt_decode from 'jwt-decode';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(protected router: Router, public keycloakService: KeycloakService) {
  }

  //checked, ob Nutzer angemeldet ist, wenn nicht --> login
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {

      //überprüfung ob eingeloggt
      if (!this.keycloakService.isLoggedIn()) {
        console.log(this.keycloakService.authenticated)

        //falls nicht eingeloggt --> token refresh versuch
        this.keycloakService.refresh().subscribe(token => {
          this.router.navigate(["home"])
          this.keycloakService.authenticated = true;

          try {
            let tokenInfo = jwt_decode(token["access_token"])

            this.keycloakService.userid = tokenInfo["sub"];
            this.keycloakService.setSession(token);
          }
          catch (err) {
            console.error(err)
          }
          resolve(true)
        }, error => {
          console.log("ERROR" + error.message)
          this.router.navigate(["login"]);
        });

        //token refresh nicht möglich --> login page
        //this.router.navigate(["login"]);

      } else {
        resolve(true);
      }

      /*
      console.log('role restriction given at app-routing.module for this route', route.data.roles);
      console.log('User roles coming after login from keycloak :', this.keycloakService.roles);
      const requiredRoles = route.data.roles;
      //checked, ob Berechtigung stimmt

      let granted: boolean = true;
      */
      /*
      if (!requiredRoles || requiredRoles.length === 0) {
        granted = true;
      } else {
        for (const requiredRole of requiredRoles) {
          if (this.keycloakService.roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
      }
      */

      //wenn Berechtigung nicht ausreichend --> redirect an home-seite


    });
  }
}