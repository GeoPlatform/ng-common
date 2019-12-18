import { Inject, Injectable } from '@angular/core';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { Config } from '@geoplatform/client';
import { RPMService } from '@geoplatform/rpm/src/iRPMService'

import {
    ngGpoauthFactory, AuthService, GeoPlatformUser
} from '@geoplatform/oauth-ng/angular';

import { authServiceFactory } from './auth.factory';


@Injectable({providedIn: 'root'})
export class AppAuthService {

    private user : GeoPlatformUser;
    private user$ : Subject<GeoPlatformUser>;
    private observers : { [key:string]: Observer<GeoPlatformUser> } =
        {} as { [key:string]: Observer<GeoPlatformUser> };
    private gpAuthSubscription : Subscription;
    private authService : AuthService;
    private rpm: RPMService;



    constructor( @Inject(RPMService) rpm : RPMService ) {
        this.authService = authServiceFactory(Config);
        this.rpm = rpm;
        this.init();
    }


    init() {

        this.user$ = new Subject<GeoPlatformUser>();

        if(!this.authService) return;

        const sub = this.authService.getMessenger().raw();
        this.gpAuthSubscription = sub.subscribe(msg => {
            // console.log("Received Auth Message: " + msg.name);
            switch(msg.name){
                case 'userAuthenticated': this.onUserChange(msg.user); break;
                case 'userSignOut': this.onUserChange(null); break;
            }
        });

        this.authService.getUser().then( user => { this.onUserChange(user); });

    }

    onUserChange(user : GeoPlatformUser) {
        console.log("AuthService.onUserChange() : User is " + (user ? user.username : 'N/A'));
        this.user = user;
        // this.rpm.setUserId( user ? user.id : null);
        this.user$.next(user);
    }

    /**
     *
     */
    getMessenger() : Subject<any>{
        return this.authService ? this.authService.getMessenger().raw() : null;
    }


    isAuthenticated() : boolean {
        return !!this.user;
    }

    getUser() : GeoPlatformUser {
        return this.user;
    }

    getToken() : string {
        return this.authService ? this.authService.getJWT() : null;
    }

    /**
     * Check the underlying authentication mechanism endpoint to validate the
     * current JWT token (if one exists) is not expired or revoked.
     * @return GeoPlatformUser or null
     */
    check() : Promise<GeoPlatformUser> {
        if(!this.authService) return Promise.resolve(null);
        return this.authService.checkWithClient()
        .then( token => this.authService.getUser() )
        .then( user => {
            setTimeout( () => { this.onUserChange(user); },100 );
            return user;
        });
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    /**
     *
     */
    subscribe( callback : Observer<GeoPlatformUser> ) : Subscription {
        return this.user$.subscribe( callback );
    }


    dispose() {
        if(this.gpAuthSubscription) {
            this.gpAuthSubscription.unsubscribe();
            this.gpAuthSubscription = null;
        }
        this.user = null;
        this.user$ = null;
        this.observers = null;
        this.authService = null;
    }
}
