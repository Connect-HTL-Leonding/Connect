import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { KeycloakService } from "./keycloak.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private keycloak: KeycloakService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const access_token = localStorage.getItem("access_token");

        if (access_token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + access_token)
            });

            return next.handle(cloned).pipe(
                catchError(response => {
                    if (response.status === 401) {
                        this.keycloak.refresh().add(() => {
                            return next.handle(cloned.clone({
                                setHeaders: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
                            }));
                        })
                    }
                    return throwError(response);
                })
            )
        }
        else {
            return next.handle(req);
        }
    }
}