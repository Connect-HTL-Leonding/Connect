import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';

import jwt_decode from 'jwt-decode';

//THX to https://stackoverflow.com/questions/54104995/angular-7-error-interceptor-problem-with-original-call
//bin zu blöd für sowas
@Injectable()
export class HttpErrorFilter implements HttpInterceptor {

    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private keycloak: KeycloakService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: any) => {
                // status code 0 kann bei keycloak vorkommen (Cors Error wird ausgelöst --> code 0; ka wieso)
                if (error.status === 401 || (error.status === 0 && (request.url.includes("/auth/admin/realms/connect/users/") || request.url.includes("auth/realms/connect/account/")))) {
                    return this.handle401Error(request, next);
                }
                return throwError(error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

        //Ausnahme bei login oder Token refresh (401 bedeutet kein korrektor login --> logout)
        if (request.url.includes('/auth/realms/connect/protocol/openid-connect/token')) {
            this.isRefreshingToken = false;
            return of(<any>this.keycloak.logout());
        }
        //Token-Refresh
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.tokenSubject.next(null);

            //pipe und switchmap, damit original subscribe nochmals aufgerufen wird
            return this.keycloak.refresh().pipe(switchMap(token => {
                console.log("TOKEN REFRESH")

                //einloggen
                this.keycloak.authenticated = true;

                try {
                    let tokenInfo = jwt_decode(token["access_token"])
                    this.keycloak.userid = tokenInfo["sub"];
                    this.keycloak.setSession(token)
                }
                catch (err) {
                    console.error(err)
                }

                if (token) {
                    this.tokenSubject.next(token["access_token"]);
                    return next.handle(request);
                }
                return of(<any>this.keycloak.logout());
            }),
                catchError(err => {
                    this.keycloak.logout();
                    return throwError(err.error);
                }),
                finalize(() => {
                    this.isRefreshingToken = false;
                }));
        } else {
            this.isRefreshingToken = false;

            return this.tokenSubject
                .pipe(filter(token => token != null),
                    take(1),
                    switchMap(token => {
                        return next.handle(request);
                    }));
        }
    }
}