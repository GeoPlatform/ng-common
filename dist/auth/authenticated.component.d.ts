import { GeoPlatformUser } from '@geoplatform/oauth-ng/angular';
import { AppAuthService } from './auth.service';
/**
 * Base class that can be used to hook authentication notifications into
 * Angular @Component instances.
 */
export declare abstract class AuthenticatedComponent {
    protected authService: AppAuthService;
    user: GeoPlatformUser;
    private gpAuthSubscription;
    constructor(authService: AppAuthService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Sub-classes must invoke this method in order to register listeners
     * for authentication events
     */
    init(): void;
    /**
     * Sub-classes must invoke this method in order to de-register listeners
     * for authentication events and clean up internals
     */
    destroy(): void;
    /** @return {boolean} */
    isAuthenticated(): boolean;
    /** @return {GeoPlatformUser} */
    getUser(): GeoPlatformUser;
    /** @return {string} JWT token associated with the current user or null */
    getAuthToken(): string;
    /** @return Promise containing current user or null */
    checkAuth(): Promise<GeoPlatformUser>;
    /**
     * @param item - optional object the user may be able to edit
     * @return boolean indicating whether user can edit the requested item or is an editor if no item was specified
     */
    canUserEdit(item?: any): boolean;
    /**
     * @param item - object the user may be the owner of
     * @return boolean indicating if the user is the associated creator/owner of the item
     */
    isAuthorOf(item?: any): boolean;
    /**
     * @param {GeoPlatformUser} user - authenticated user object or null if not authed
     */
    protected onUserChange(user: GeoPlatformUser): void;
}
