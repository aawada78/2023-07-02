import { Injectable, inject } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private oAuthService = inject(OAuthService);

    get userName(): string {
        const claims = this.oAuthService.getIdentityClaims();
        return claims ? claims['given_name'] : '';
    }

    login() {
        this.oAuthService.initCodeFlow();
    }

    logout() {
        this.oAuthService.logOut();
    }


}