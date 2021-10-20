import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable()
export class HttpFilter implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthentication(request));
    }

    private addAuthentication(request: HttpRequest<any>): HttpRequest<any> {

        //nicht bei login oder token refresh
        if (!request.url.includes('/auth/realms/connect/protocol/openid-connect/token')) {
            const token =  localStorage.getItem('access_token');
            if (token) {
                request = request.clone({
                    setHeaders: {Authorization: 'Bearer ' + token}
                });
            }
        }
        return request.clone({url: `${request.url}`});


    }

}