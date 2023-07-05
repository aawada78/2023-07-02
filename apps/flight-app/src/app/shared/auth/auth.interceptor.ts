import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { OAuthStorage } from "angular-oauth2-oidc";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    private oauthStorage = inject(OAuthStorage);
    private router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('http://www.angular.at/api')) {
            const headers = req.headers.set(
                'Authorization',
                'Bearer ' + this.oauthStorage.getItem('access_token')
            );

            req = req.clone({ headers });
        }

        return next.handle(req).pipe(
            catchError((error) => this.handleError(error))
        );
    }

    handleError(event: HttpErrorResponse) {
        if (event.status === 401 || event.status === 403) {
            this.router.navigate(['/home', { needsLogin: true }]);
        }

        return throwError(() => new Error('Not Authorized°!'));
    }
}