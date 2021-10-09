import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const access_token = localStorage.getItem("access_token");

        if (access_token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + access_token)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}