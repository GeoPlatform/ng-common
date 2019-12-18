
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Config } from '@geoplatform/client';
import { AuthService, GeoPlatformUser } from '@geoplatform/oauth-ng/angular';

import { AuthenticatedComponent } from './authenticated.component';
import { AppAuthService } from './auth.service';
import { logger } from '../logger';


@Component({
    selector: 'gp-login-button',
    styles: [
        `
        .btn-login.btn-link {
            padding: .375em .75em;
            border-right: none;
            margin: 0 0.5em;
            font-weight: 700;
        }
        .btn-login.btn-link:hover {
            background-color: #fff;
            text-decoration: none;
            color: #333;
        }
        .o-account-details {
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            margin-top: -0.5em;
            padding: 1em;
            background: #185b8a;
            color: #fff;
        }
        .o-account-details__avatar {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 6em;
            margin-right: 0.25em;
            padding-top: 10px;
            width: 100px;
            height: 100px;
            overflow: hidden;
            background: #fff;
            color: #777;
            border-radius: 100%;
        }
        .dropdown-menu .btn.btn-link {
            display: inline-block;
            padding: 0.375rem 0.75rem;
            border-right: none;
        }
        .dropdown-menu .btn.btn-link:after {
            content: '';
        }
        .btn.btn-logout {
            padding: 0.375rem 0.75rem;
            margin-bottom: -0.5em;
        }
        `
    ],
    template:
    `
    <div class="btn-account btn-group">
        <!-- not logged in yet -->
        <a class="btn-login btn btn-link" (click)="login()" *ngIf="!user">Sign In</a>

        <!-- logged in -->
        <button type="button" class="btn-login btn btn-link dropdown-toggle" data-toggle="dropdown"
            aria-expanded="false" *ngIf="user">
            <span class="fas fa-user"></span>
            <span class="d-xs-none">{{user?.name}}</span>
            <span class="caret"></span>
        </button>
        <div class="dropdown-menu dropdown-menu-right" role="menu" *ngIf="user">
            <div class="o-account-details">
                <div class="o-account-details__avatar">
                    <span class="fas fa-user"></span>
                </div>
                <div class="flex-1">
                    <div class="a-heading">
                        {{user?.name}}
                        <small><em>({{user?.username}})</em></small>
                    </div>
                    <div class="u-text--sm">{{user?.email}}</div>
                    <div class="u-text--sm">{{user?.org}}</div>
                </div>
            </div>
            <div class="d-flex flex-justify-around u-mg-top--sm">
                <a class="btn btn-sm btn-link" target="_blank" href="{{idpBaseUrl}}/profile">
                    <span class="fas fa-pencil-alt"></span> Edit Profile
                </a>
                <a class="btn btn-sm btn-link" target="_blank" href="{{idpBaseUrl}}/updatepw">
                    <span class="fas fa-key"></span> Change Password
                </a>
            </div>
            <div class="u-mg-top--sm">
                <a class="btn-logout btn btn-light btn-block" (click)="logout()">
                    <span class="fas fa-power-off"></span> Sign Out
                </a>
            </div>
        </div>
    </div>
    `

})
export class LoginButtonComponent extends AuthenticatedComponent implements OnInit {

    public idpBaseUrl : string = Config.IDP_BASE_URL || 'https://accounts.geoplatform.gov';
    public user : GeoPlatformUser =  null;

    constructor( authService : AppAuthService ) {
        super(authService);
    }

    ngOnInit() {
        super.ngOnInit();

        // this.authService.check();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    onUserChange(user : GeoPlatformUser) {
        super.onUserChange(user);
        logger.debug("LoginButton.onUserChange() : User is " + (user ? user.username : 'null'));
        this.user = user;
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

}









@Component({
    selector: 'gp-login-modal',
    styles: [
    `
        .gpLoginCover {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0,0,0,0.6);
            z-index: 5000;
            width: 100vw;
            height: 100vh;
        }

        .gpLoginCancelIframe {
          z-index: 5001;
          position: absolute;
          right: 0px;
        }

        .gpLoginWindow {
          top: 100px;
          height: 60%;
          width: 75%;
          margin: 0 auto;
          position: relative;
          z-index: 5001;
        	border: 5px solid #cccccc;
          border-radius: 10px;
        }

        .gpLoginWindow iframe {
          width: 100%;
          height: 100%
        }

        .gpLoginWindow .btn-cancel {
          color: white;
          background-color: red;
        }

        .gpLoginWindow .btn {
          display: inline-block;
          padding: 6px 12px;
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.42857143;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background-image: none;
          border: 1px solid transparent;
          border-radius: 4px;
        }
    `
    ],
    templateUrl: './login.html',

})
export class LoginModalComponent implements OnInit, OnDestroy {

    public showLoginModal : boolean = false;
    public forceLogin : boolean = Config.FORCE_LOGIN;

    constructor(private authService : AppAuthService) {

    }

    ngOnInit() {
        if(!this.authService) return;

        this.authService.getMessenger().subscribe(msg => {
            logger.debug("LoginModal received auth message: " + msg.name);
            switch(msg.name){
                case 'auth:requireLogin':
                    this.showLoginModal = true;   //show the modal
                    break;

                case 'userAuthenticated':
                case 'iframe:userAuthenticated':
                    this.showLoginModal = false;  //hide the modal
                    this.authService.onUserChange(msg.user);
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.showLoginModal = false;
    }

    cancel() {
        //hide the modal
        this.showLoginModal = false;
    }

}
