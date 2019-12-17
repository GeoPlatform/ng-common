import { Observer, Subject, Subscription } from 'rxjs';
import { RPMService } from '@geoplatform/rpm/src/iRPMService';
import { GeoPlatformUser } from '@geoplatform/oauth-ng/angular';
export declare class AppAuthService {
    private user;
    private user$;
    private observers;
    private gpAuthSubscription;
    private authService;
    private rpm;
    constructor(rpm: RPMService);
    init(): void;
    onUserChange(user: GeoPlatformUser): void;
    /**
     *
     */
    getMessenger(): Subject<any>;
    isAuthenticated(): boolean;
    getUser(): GeoPlatformUser;
    getToken(): string;
    /**
     * Check the underlying authentication mechanism endpoint to validate the
     * current JWT token (if one exists) is not expired or revoked.
     * @return GeoPlatformUser or null
     */
    check(): Promise<GeoPlatformUser>;
    login(): void;
    logout(): void;
    /**
     *
     */
    subscribe(callback: Observer<GeoPlatformUser>): Subscription;
    dispose(): void;
}
