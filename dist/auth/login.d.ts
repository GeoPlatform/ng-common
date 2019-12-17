import { OnInit, OnDestroy } from '@angular/core';
import { GeoPlatformUser } from '@geoplatform/oauth-ng/angular';
import { AuthenticatedComponent } from './authenticated.component';
import { AppAuthService } from './auth.service';
export declare class LoginButtonComponent extends AuthenticatedComponent implements OnInit {
    idpBaseUrl: string;
    user: GeoPlatformUser;
    constructor(authService: AppAuthService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onUserChange(user: GeoPlatformUser): void;
    login(): void;
    logout(): void;
}
export declare class LoginModalComponent implements OnInit, OnDestroy {
    private authService;
    showLoginModal: boolean;
    forceLogin: boolean;
    constructor(authService: AppAuthService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    cancel(): void;
}
