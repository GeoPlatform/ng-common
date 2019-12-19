import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { AuthService, GeoPlatformUser } from '@geoplatform/oauth-ng/angular';

import { AppAuthService } from './auth.service';
import { logger } from '../logger';

const EDIT_ROLE = 'gp_editor';


/**
 * Base class that can be used to hook authentication notifications into
 * Angular @Component instances.
 */
export abstract class AuthenticatedComponent {

    public user : GeoPlatformUser;
    private gpAuthSubscription : Subscription;

    constructor(protected authService : AppAuthService) {
    }

    //facade methods to mimic @Component lifecycle methods in case sub-classes
    // want to use consistent names
    ngOnInit() { this.init(); }
    ngOnDestroy() { this.destroy(); }

    /**
     * Sub-classes must invoke this method in order to register listeners
     * for authentication events
     */
    init() {

        let obs : Observer<GeoPlatformUser> = {
            next : (value: GeoPlatformUser) => {
                logger.debug("AuthenticatedComponent : User changed to " + (value ? value.username : 'null'));
                this.user = value;
                this.onUserChange(this.user);
            },
            error : (err: any) => {
                logger.error("Unable to get authenticated user info: " +
                    (err as Error).message);
            },
            complete : () => { }
        };

        this.gpAuthSubscription = this.authService.subscribe( obs );

        //for components that initialize AFTER a user has changed auth state,
        // we need to fetch the current user details
        this.user = this.authService.getUser();
        this.onUserChange(this.user);
    }

    /**
     * Sub-classes must invoke this method in order to de-register listeners
     * for authentication events and clean up internals
     */
    destroy() {
        if(this.gpAuthSubscription) {
            this.gpAuthSubscription.unsubscribe();
            this.gpAuthSubscription = null;
        }
        this.user = null;
        this.authService = null;
    }

    /** @return {boolean} */
    public isAuthenticated() : boolean { return !!this.user; }

    /** @return {GeoPlatformUser} */
    public getUser() : GeoPlatformUser { return this.user; }

    /** @return {string} JWT token associated with the current user or null */
    public getAuthToken() : string { return this.authService.getToken(); }

    /** @return Promise containing current user or null */
    public checkAuth() : Promise<GeoPlatformUser> { return this.authService.check(); }

    /**
     * @param item - optional object the user may be able to edit
     * @return boolean indicating whether user can edit the requested item or is an editor if no item was specified
     */
    public canUserEdit(item ?: any) : boolean {
        if(!this.user) return false;
        if(this.user.isAuthorized(EDIT_ROLE)) return true;
        return this.isAuthorOf(item);
    }

    /**
     * @param item - object the user may be the owner of
     * @return boolean indicating if the user is the associated creator/owner of the item
     */
    public isAuthorOf(item ?: any) : boolean {
        if(!this.user || !item) return false;
        return item.createdBy && item.createdBy === this.user.username;
    }

    /**
     * @param {GeoPlatformUser} user - authenticated user object or null if not authed
     */
    protected onUserChange(user : GeoPlatformUser) { /* implement in sub-classes */ }


}
