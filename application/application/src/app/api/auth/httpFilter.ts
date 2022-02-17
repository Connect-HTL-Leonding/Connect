import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable()
export class HttpFilter implements HttpInterceptor {

    //Request unterbrechen
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Barrier-Token in Request einsetzen
        return next.handle(this.addAuthentication(request));
    }

    //Barrier Token einsetzen
    private addAuthentication(request: HttpRequest<any>): HttpRequest<any> {

        //nicht bei login oder token refresh --> noch kein Token vorhanden --> Endlosschleife
        if (!request.url.includes('/auth/realms/connect/protocol/openid-connect/token')) {

            //Token aus LocalStorage holen
            const token = localStorage.getItem('access_token');

            //Request klonen und Barrier-Token einsetzen
            if (token) {
                request = request.clone({
                    setHeaders: {Authorization: 'Bearer ' + token}
                });
            }
        }

        //geklonten Request weiterschicken
        return request.clone({url: `${request.url}`});
    }
}