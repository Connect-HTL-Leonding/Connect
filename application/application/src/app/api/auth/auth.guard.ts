import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(protected router: Router, public keycloakService: KeycloakService) {
  }

  //checked, ob Nutzer angemeldet ist, wenn nicht --> login
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {

      //wenn nicht eingeloggt --> einlogg versuch
      if (!this.keycloakService.authenticated) {
        console.log(this.keycloakService.authenticated)
        this.keycloakService.login();
        return;
      }

      console.log('role restriction given at app-routing.module for this route', route.data.roles);
      console.log('User roles coming after login from keycloak :', this.keycloakService.roles);
      const requiredRoles = route.data.roles;
      //checked, ob Berechtigung stimmt

      let granted: boolean = true;
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
      if (!granted) {
        console.log("sjklfdkj")
        this.router.navigate(['/']);
      }
      resolve(granted);

    });
  }
}