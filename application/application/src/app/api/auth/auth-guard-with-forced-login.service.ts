import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

//thx to https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards
@Injectable()
export class AuthGuardWithForcedLogin implements CanActivate {


  constructor(
    private authService: AuthService, private router: Router
  ) {
  }

  /*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    console.log(state.url)
    console.log(this.authService.isAuthenticated$ || this.authService.login(state.url))
    console.log(this.authService.isDoneLoading$.pipe(
      filter(isDone => isDone),
      switchMap(_ => this.authService.isAuthenticated$),
      tap(isAuthenticated => isAuthenticated || this.authService.login(state.url)),
    ));
    return this.authService.isDoneLoading$.pipe(
      filter(isDone => isDone),
      switchMap(_ => this.authService.isAuthenticated$),
      tap(isAuthenticated => isAuthenticated || this.authService.login(state.url)),
    );
  }*/

  canActivate(route: ActivatedRouteSnapshot, state:
    RouterStateSnapshot): Observable<boolean
      | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.hasValidToken()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
