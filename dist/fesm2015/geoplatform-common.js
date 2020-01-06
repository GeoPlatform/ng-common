import { Config, ItemTypes, TrackingEventFactory, TrackingTypes, ItemService, TrackingService, Query, QueryParameters, QueryFacets, KGQuery, KGService, ItemTypeLabels } from '@geoplatform/client';
import { __decorate, __param } from 'tslib';
import { Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, HostBinding, ElementRef, Input, Directive, EventEmitter, Output, Pipe, NgModule } from '@angular/core';
import { Subject, BehaviorSubject, of, empty } from 'rxjs';
import { RPMService } from '@geoplatform/rpm/src/iRPMService';
import { ngGpoauthFactory } from '@geoplatform/oauth-ng/angular';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RPMServiceFactory } from '@geoplatform/rpm/dist/js/geoplatform.rpm.browser.js';

const LEVELS = [
    "error",
    "warn",
    "info",
    "debug"
];
class Logger {
    constructor() {
        this.level = 'error';
        this.setLevel(Config.logLevel || Config.LOG_LEVEL);
    }
    setLevel(level) {
        if (level && LEVELS.indexOf(level) >= 0) {
            this.level = level;
        }
        this.info("Log Level : " + this.level);
    }
    isVisible(level) {
        return LEVELS.indexOf(this.level) >= LEVELS.indexOf(level);
    }
    log(arg, ...addl) {
        let msg = this.toStr(arg);
        msg += addl.map(a => this.toStr(a)).join('');
        console.log(msg);
    }
    debug(arg, ...addl) {
        if (!this.isVisible('debug'))
            return;
        let msg = "[DEBUG] " + this.toStr(arg);
        this.log(msg, ...addl);
    }
    info(arg, ...addl) {
        if (!this.isVisible('info'))
            return;
        let msg = "[INFO] " + this.toStr(arg);
        this.log(msg, ...addl);
    }
    warn(arg, ...addl) {
        if (!this.isVisible('warn'))
            return;
        let msg = "[WARN] " + this.toStr(arg);
        this.log(msg, ...addl);
    }
    error(arg, ...addl) {
        let msg = "[ERROR] " + this.toStr(arg);
        this.log(msg, ...addl);
    }
    toStr(arg) {
        if (null === arg || typeof (arg) === 'undefined')
            return '';
        if (typeof (arg) === 'string')
            return arg;
        return JSON.stringify(arg);
    }
}
const logger = new Logger();

const EDIT_ROLE = 'gp_editor';
/**
 * Base class that can be used to hook authentication notifications into
 * Angular @Component instances.
 */
class AuthenticatedComponent {
    constructor(authService) {
        this.authService = authService;
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
        let obs = {
            next: (value) => {
                logger.debug("AuthenticatedComponent : User changed to " + (value ? value.username : 'null'));
                this.user = value;
                this.onUserChange(this.user);
            },
            error: (err) => {
                logger.error("Unable to get authenticated user info: " +
                    err.message);
            },
            complete: () => { }
        };
        this.gpAuthSubscription = this.authService.subscribe(obs);
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
        if (this.gpAuthSubscription) {
            this.gpAuthSubscription.unsubscribe();
            this.gpAuthSubscription = null;
        }
        this.user = null;
        this.authService = null;
    }
    /** @return {boolean} */
    isAuthenticated() { return !!this.user; }
    /** @return {GeoPlatformUser} */
    getUser() { return this.user; }
    /** @return {string} JWT token associated with the current user or null */
    getAuthToken() { return this.authService.getToken(); }
    /** @return Promise containing current user or null */
    checkAuth() { return this.authService.check(); }
    /**
     * @param item - optional object the user may be able to edit
     * @return boolean indicating whether user can edit the requested item or is an editor if no item was specified
     */
    canUserEdit(item) {
        if (!this.user)
            return false;
        if (this.user.isAuthorized(EDIT_ROLE))
            return true;
        return this.isAuthorOf(item);
    }
    /**
     * @param item - object the user may be the owner of
     * @return boolean indicating if the user is the associated creator/owner of the item
     */
    isAuthorOf(item) {
        if (!this.user || !item)
            return false;
        return item.createdBy && item.createdBy === this.user.username;
    }
    /**
     * @param {GeoPlatformUser} user - authenticated user object or null if not authed
     */
    onUserChange(user) { }
}

;
const AUTH_KEYS = [
    'AUTH_TYPE', 'IDP_BASE_URL', 'APP_BASE_URL', 'ALLOW_SSO_LOGIN',
    'APP_ID', 'ALLOW_IFRAME_LOGIN', 'FORCE_LOGIN', 'CALLBACK',
    'LOGIN_URL', 'LOGOUT_URL', 'ALLOW_DEV_EDITS'
];
var authService = null;
function authServiceFactory(environment) {
    //once service has been built, keep using it
    if (authService)
        return authService;
    //
    //but the first time it's requested, it has to be built using env settings
    let authSettings = {};
    let gpGlobal = window.GeoPlatform;
    if (gpGlobal && gpGlobal.config && gpGlobal.config.auth) {
        //auth library settings made available through WP via 'GeoPlatform' global
        //https://geoplatform.atlassian.net/browse/DT-2307
        authSettings = gpGlobal.config.auth;
    }
    else {
        authSettings.APP_BASE_URL = environment.wpUrl || '';
        AUTH_KEYS.forEach(key => {
            let v = environment[key];
            if (typeof (v) !== 'undefined') {
                if (~key.indexOf('ALLOW') || ~key.indexOf('FORCE')) {
                    v = (v === true || v === 'true');
                }
                authSettings[key] = v;
            }
        });
    }
    logger.info("Configuring OAuth using: ");
    logger.info(authSettings);
    authService = ngGpoauthFactory(authSettings);
    return authService;
}
;

let AppAuthService = class AppAuthService {
    constructor(rpm) {
        this.observers = {};
        this.authService = authServiceFactory(Config);
        this.rpm = rpm;
        this.init();
    }
    init() {
        this.user$ = new Subject();
        if (!this.authService)
            return;
        const sub = this.authService.getMessenger().raw();
        this.gpAuthSubscription = sub.subscribe(msg => {
            logger.debug("Received Auth Message: " + msg.name);
            switch (msg.name) {
                case 'userAuthenticated':
                    this.onUserChange(msg.user);
                    break;
                case 'userSignOut':
                    this.onUserChange(null);
                    break;
            }
        });
        this.authService.getUser().then(user => { this.onUserChange(user); });
    }
    onUserChange(user) {
        logger.debug("AuthService.onUserChange() : User is " + (user ? user.username : 'N/A'));
        this.user = user;
        // this.rpm.setUserId( user ? user.id : null);
        this.user$.next(user);
    }
    /**
     *
     */
    getMessenger() {
        return this.authService ? this.authService.getMessenger().raw() : null;
    }
    isAuthenticated() {
        return !!this.user;
    }
    getUser() {
        return this.user;
    }
    getToken() {
        return this.authService ? this.authService.getJWT() : null;
    }
    /**
     * Check the underlying authentication mechanism endpoint to validate the
     * current JWT token (if one exists) is not expired or revoked.
     * @return GeoPlatformUser or null
     */
    check() {
        if (!this.authService)
            return Promise.resolve(null);
        return this.authService.checkWithClient()
            .then(token => this.authService.getUser())
            .then(user => {
            setTimeout(() => { this.onUserChange(user); }, 100);
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
    subscribe(callback) {
        return this.user$.subscribe(callback);
    }
    dispose() {
        if (this.gpAuthSubscription) {
            this.gpAuthSubscription.unsubscribe();
            this.gpAuthSubscription = null;
        }
        this.user = null;
        this.user$ = null;
        this.observers = null;
        this.authService = null;
    }
};
AppAuthService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [RPMService,] }] }
];
AppAuthService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AppAuthService_Factory() { return new AppAuthService(ɵɵinject(RPMService)); }, token: AppAuthService, providedIn: "root" });
AppAuthService = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Inject(RPMService))
], AppAuthService);

let LoginButtonComponent = class LoginButtonComponent extends AuthenticatedComponent {
    constructor(authService) {
        super(authService);
        this.idpBaseUrl = Config.IDP_BASE_URL || 'https://accounts.geoplatform.gov';
        this.user = null;
    }
    ngOnInit() {
        super.ngOnInit();
        // this.authService.check();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    onUserChange(user) {
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
};
LoginButtonComponent.ctorParameters = () => [
    { type: AppAuthService }
];
LoginButtonComponent = __decorate([
    Component({
        selector: 'gp-login-button',
        template: `
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
    `,
        styles: [`
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
        `]
    })
], LoginButtonComponent);
let LoginModalComponent = class LoginModalComponent {
    constructor(authService) {
        this.authService = authService;
        this.showLoginModal = false;
        this.forceLogin = Config.FORCE_LOGIN;
    }
    ngOnInit() {
        if (!this.authService)
            return;
        this.authService.getMessenger().subscribe(msg => {
            logger.debug("LoginModal received auth message: " + msg.name);
            switch (msg.name) {
                case 'auth:requireLogin':
                    this.showLoginModal = true; //show the modal
                    break;
                case 'userAuthenticated':
                case 'iframe:userAuthenticated':
                    this.showLoginModal = false; //hide the modal
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
};
LoginModalComponent.ctorParameters = () => [
    { type: AppAuthService }
];
LoginModalComponent = __decorate([
    Component({
        selector: 'gp-login-modal',
        template: "<div class=\"gpLoginCover\" *ngIf=\"showLoginModal\">\n    <button class=\"btn btn-danger gpLoginCancelIframe pull-right\" *ngIf=\"!forceLogin\" (click)=\"cancel()\">\n        <span class=\"fas fa-times-circle\"></span> Cancel\n    </button>\n    <div class=\"gpLoginWindow\" *ngIf=\"showLoginModal\">\n        <iframe id=\"gpLoginIFrame\" src=\"/login?redirect_url=${encodeURIComponent(`${window.location.origin}/auth/loading?cachebuster=${(new Date()).getTime()}`)}&cachebuster=${(new Date()).getTime()}\"></iframe>\n    </div>\n</div>\n",
        styles: [`
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
    `]
    })
], LoginModalComponent);

let ListSelectDialog = class ListSelectDialog {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        //pagination
        this.currentPage = 0;
        this.totalSuggested = 0;
        this.subject = new Subject();
        this.query = data.query.clone().page(this.currentPage);
        this.subject.pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(term => {
            this.filterValues(term);
        });
    }
    onNoClick() {
        this.dialogRef.close();
    }
    onTermChange(term, immediate) {
        if (true === immediate) { //if needing to update without debounce
            this.filterValues(term);
        }
        else { //otherwise, debounce change
            this.subject.next(term);
        }
    }
    /**
     * @param {string} value - user input to filter options with
     * @return {Promise} resolving array of string options
     */
    filterValues(value) {
        this.termQuery = value;
        if (!value) { //require user to provide input before searching
            this.suggested = [];
            this.totalSuggested = 0;
            return;
        }
        this.query.q(value);
        this.isLoading = true;
        this.data.service.search(this.query)
            .then((response) => {
            let hits = response.results;
            this.suggested = hits;
            this.totalSuggested = response.totalResults;
        })
            .catch(e => {
            //display error message indicating an issue searching...
        }).finally(() => {
            this.isLoading = false;
        });
    }
    addValue(arg) {
        if (this.isSelected(arg)) { //if already selected, remove it
            this.removeValue(arg); //...
            return; //...
        }
        this.data.selected.push(arg);
    }
    removeValue(value) {
        let index = -1;
        this.data.selected.forEach((p, i) => { if (p.id === value.id) {
            index = i;
        } });
        if (index >= 0) {
            this.data.selected.splice(index, 1);
        }
    }
    isSelected(arg) {
        return this.data.selected.length > 0 &&
            !!this.data.selected.find((s) => s.id === arg.id);
    }
    /**
     * @param pageNo - new page number being requested
     */
    onPageChange(pageNo) {
        if (this.currentPage !== pageNo - 1) {
            this.query.page(pageNo - 1);
            this.filterValues(this.termQuery);
        }
    }
    getSubHeading(item) {
        let property = this.data.subHeading;
        let value = item[property];
        return this.getLabelFrom(value);
    }
    getLabelFrom(value) {
        if (value === null || typeof (value) === 'undefined')
            return '';
        if (Array.isArray(value)) {
            return value.map(v => this.getLabelFrom(v)).join(', ');
        }
        if (typeof (value) === 'object' && (value.label || value.title || value.prefLabel)) {
            return value.label || value.title || value.prefLabel;
        }
        return '';
    }
};
ListSelectDialog.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
ListSelectDialog = __decorate([
    Component({
        selector: 'gp-list-select-dialog',
        template: "<h5 mat-dialog-title>Find Items to Select</h5>\n<div mat-dialog-content>\n    <mat-form-field appearance=\"outline\">\n        <mat-label>\n            <mat-icon><span class=\"fas fa-search\"></span></mat-icon>\n            Search\n        </mat-label>\n        <input matInput\n            [(ngModel)]=\"termQuery\" (ngModelChange)=\"onTermChange($event)\"\n            placeholder=\"Enter keywords to find recommended values\">\n        <span matSuffix *ngIf=\"termQuery?.length\" (click)=\"onTermChange(null, true)\"\n            class=\"fas fa-times t-fg--gray-md\">\n        </span>\n    </mat-form-field>\n\n    <div class=\"d-flex flex-justify-between flex-align-stretch\">\n\n        <div style=\"flex: 1 0 49%; margin-right: 1%;\">\n            <div class=\"a-heading\">\n                Recommendations ({{totalSuggested||0}})\n                <span *ngIf=\"isLoading\" class=\"fas fa-spinner fa-spin\"></span>\n            </div>\n            <div class=\"m-list-section\">\n                <div class=\"list-group\">\n                    <em *ngIf=\"!suggested?.length\">Enter keywords above to receive suggested values to use.</em>\n                    <div *ngFor=\"let item of suggested\" class=\"list-group-item\"\n                        (click)=\"addValue(item)\" [ngClass]=\"{'active':isSelected(item)}\">\n                        <a>\n                            <span gpIcon [item]=\"item\"></span>\n                            {{item.label||item.title||item.prefLabel}}\n                        </a>\n                        <div *ngIf=\"data.subHeading\" class=\"u-text--sm t-fg--gray-md\">\n                            {{getSubHeading(item)}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"u-text--sm  u-mg-top--md\" *ngIf=\"totalSuggested>0\">\n                <ngb-pagination [collectionSize]=\"totalSuggested\"\n                    [pageSize]=\"12\" [maxSize]=\"2\" [size]=\"'sm'\"\n                    [rotate]=\"true\" [(page)]=\"currentPage\"\n                    (pageChange)=\"onPageChange($event)\">\n                </ngb-pagination>\n            </div>\n        </div>\n        <div style=\"flex: 1 0 50%\">\n            <div class=\"a-heading\">Selected ({{data?.selected?.length||0}})</div>\n            <div class=\"m-list-section\">\n                <div class=\"list-group\">\n                    <em *ngIf=\"!data.selected?.length\">No values selected.</em>\n                    <div *ngFor=\"let item of data?.selected\" class=\"list-group-item\">\n                        <span class=\"fas fa-times t-fg--danger\" (click)=\"removeValue(item)\"></span>&nbsp;\n                        <a>\n                            <span gpIcon [item]=\"item\"></span>\n                            {{item.label||item.title||item.prefLabel||\"Untitled Item\"}}\n                        </a>\n                        <div *ngIf=\"data.subHeading\" class=\"u-text--sm t-fg--gray-md\">\n                            {{getSubHeading(item)}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"onNoClick()\">Cancel</button>\n    <button type=\"button\" mat-flat-button color=\"primary\" [mat-dialog-close]=\"data.selected\">Ok</button>\n</div>\n",
        styles: [":host .mat-form-field{width:100%}"]
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], ListSelectDialog);

let MessageDialog = class MessageDialog {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        switch (data.type) {
            case 'error':
                this.className = 'danger';
                break;
            case 'warn':
                this.className = 'warning';
                break;
            case 'info':
                this.className = 'info';
                break;
        }
    }
    close() {
        this.dialogRef.close();
    }
    getIconClass() {
        switch (this.data.type) {
            case 'error': return "fas fa-exclamation-circle";
            case 'warn': return "fas fa-exclamation-triangle";
            case 'info': return 'fas fa-info-circle';
        }
        return '';
    }
};
MessageDialog.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
__decorate([
    HostBinding('class')
], MessageDialog.prototype, "className", void 0);
MessageDialog = __decorate([
    Component({
        selector: 'gp-message-dialog',
        template: "<div class=\"a-heading\" mat-dialog-title>\n    <span [attr.class]=\"getIconClass()\"></span>\n    {{data.label || \"Message\"}}\n</div>\n<div mat-dialog-content>\n    {{data.message}}\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"close()\">Dismiss</button>\n</div>\n",
        styles: [":host.danger .mat-dialog-title{color:#d53c37}:host.warning .mat-dialog-title{color:#b35d29}:host.info .mat-dialog-title{color:#007fa4}"]
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], MessageDialog);

let GeoPlatformIconDirective = class GeoPlatformIconDirective {
    constructor(el) {
        this.el = el;
        this.themed = true;
    }
    ngOnInit() {
        if (!this.item)
            return;
        let className = this.item.type.toLowerCase().replace(/^[a-z]+\:/, '');
        className = 'icon-' + className;
        if (this.themed) {
            className += " is-themed";
        }
        this.el.nativeElement.className = className;
    }
};
GeoPlatformIconDirective.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], GeoPlatformIconDirective.prototype, "item", void 0);
__decorate([
    Input()
], GeoPlatformIconDirective.prototype, "themed", void 0);
GeoPlatformIconDirective = __decorate([
    Directive({
        selector: '[gpIcon]'
    })
], GeoPlatformIconDirective);

let HeaderComponent = class HeaderComponent {
    constructor() {
        this.appName = "Application";
        this.class = 'o-header';
        this.portalUrl = Config.portalUrl || 'https://www.geoplatform.gov';
    }
};
__decorate([
    Input()
], HeaderComponent.prototype, "appName", void 0);
__decorate([
    HostBinding('class')
], HeaderComponent.prototype, "class", void 0);
HeaderComponent = __decorate([
    Component({
        selector: 'gp-app-header',
        template: "<div class=\"o-header__primary\" role=\"banner\">\n    <h1 class=\"a-brand\">\n        <a href=\"{{portalUrl}}\">\n            <img src=\"/assets/favicon.png\" style=\"vertical-align:top;\">\n            GeoPlatform.gov\n        </a>\n        &nbsp;\n        {{appName}}\n    </h1>\n    <nav class=\"a-nav\" role=\"navigation\" aria-label=\"top-level navigation links\">\n        <ng-content select=\"[menu]\"></ng-content>\n        <gp-login-button role=\"menuitem\">Sign In</gp-login-button>\n    </nav>\n</div>\n",
        styles: [".o-header .o-header__primary{padding:1em 1.5em}.o-header .o-header__primary .a-nav a{font-weight:700;border-right:none;padding:.375em .75em}.o-header .o-header__primary .a-nav a.active{border-bottom:1px solid #185b8a}"]
    })
], HeaderComponent);

const ASSETS = [
    ItemTypes.DATASET, ItemTypes.SERVICE, ItemTypes.LAYER, ItemTypes.MAP,
    ItemTypes.GALLERY, ItemTypes.COMMUNITY, ItemTypes.APPLICATION, ItemTypes.TOPIC,
    ItemTypes.WEBSITE
];
let ItemHelper = class ItemHelper {
    constructor() { }
    /**
     * @param {any} item - either GP item or string type
     * @return {boolean}
     */
    static isAsset(item) {
        if (!item)
            return false;
        let type = null;
        if (typeof (item) === 'string')
            type = item;
        else if (item.type)
            type = item.type;
        return type && ASSETS.indexOf(type) >= 0;
    }
    /**
     * @param {any} item - either GP item or string type
     * @return {string} url of icon for the type
     */
    static getIcon(item) {
        let type = "dataset";
        switch (item.type) {
            case ItemTypes.CONTACT:
                type = 'vcard';
                break;
            default: type = item.type.replace(/^[a-z]+\:/i, '').toLowerCase();
        }
        return 'icon-' + type;
    }
    /**
     * @param {any} item - either GP item
     * @return {string} label for the item
     */
    static getLabel(item) {
        if (!item || !item.type)
            return 'Unknown type';
        let type = item.type;
        switch (type) {
            case ItemTypes.ORGANIZATION:
                // case ItemTypes.PERSON :
                return item.label || item.name || "Un-titled resource";
            case ItemTypes.CONCEPT:
            case ItemTypes.CONCEPT_SCHEME:
                return item.label || item.prefLabel || "Un-titled resource";
            case ItemTypes.CONTACT:
                let fn = item.fullName || '';
                let pt = item.positionTitle || '';
                let on = item.orgName || '';
                let label = fn + (fn.length ? ' - ' : '') + pt + (pt.length ? ' - ' : '') + on;
                //if none of those fields have been provided, default to email or placeholder
                if (!label.length)
                    label = item.email || 'Untitled Contact';
                return label;
            default: return item.label || item.title || "Un-titled resource";
        }
    }
    /**
     * @param {any} item - either GP item or string type
     * @return {string} label for the item's type
     */
    static getTypeLabel(item) {
        if (!item)
            return 'Unknown Resource Type';
        let type = null;
        if (typeof (item) === 'string')
            type = item;
        else if (item.type)
            type = item.type;
        else
            return null;
        switch (type) {
            case ItemTypes.DATASET:
            case ItemTypes.SERVICE:
            // case ItemTypes.PERSON :
            case ItemTypes.ORGANIZATION:
            case ItemTypes.CONCEPT:
                return type.replace(/^[a-z]+\:/i, '');
            case ItemTypes.CONCEPT_SCHEME: return "Concept Scheme";
            case ItemTypes.WEBSITE: return "Website";
            case ItemTypes.CONTACT: return "Contact";
            default: return type; //remainder are unprefixed
        }
    }
    /**
     * @param {any} item - either GP item or string type
     * @return {string} key (plural) for the item's type
     */
    static getTypeKey(item) {
        if (!item)
            return null;
        let type = null;
        if (typeof (item) === 'string')
            type = item;
        else if (item.type)
            type = item.type;
        else
            return null;
        switch (type) {
            //special plurality
            case ItemTypes.GALLERY: return 'galleries';
            case ItemTypes.COMMUNITY: return 'communities';
            //different name
            case ItemTypes.CONTACT: return 'contacts'; //instead of "vcards"
            //remainder
            default: return type.replace(/^[a-z]+\:/i, '').toLowerCase() + 's';
        }
    }
    /**
     * @param {string} type - item type
     * @return {string} string path to the type's icon
     */
    static determineIconType(type) {
        let name = type.replace(/^[a-z]+\:/i, '').toLowerCase();
        return `/assets/icons/${name}.svg`;
    }
    static getItemDetailsUrl(item) {
        if (!item || !item.type || !item.id)
            return null;
        return Config.portalUrl + '/resources/' + this.getTypeKey(item) + '/' + item.id;
    }
};
ItemHelper = __decorate([
    Injectable()
], ItemHelper);

let ResourceLinkComponent = class ResourceLinkComponent {
    constructor() {
        this.external = false; //open link in new window/tab
    }
    ngOnInit() {
    }
    hasIcon() {
        // return this.icon !== null && this.icon !== undefined;
        return true;
    }
    getIcon() {
        return ItemHelper.getIcon(this.item);
    }
    getLabel() {
        return ItemHelper.getLabel(this.item);
    }
    getType() {
        return ItemHelper.getTypeKey(this.item);
    }
    getIconClass() {
        let type = ItemHelper.getTypeLabel(this.item);
        if ("Contact" === type)
            type = 'vcard';
        if ("Product" === type)
            type = 'imageproduct';
        return 'icon-' + type.toLowerCase();
    }
};
__decorate([
    Input()
], ResourceLinkComponent.prototype, "item", void 0);
__decorate([
    Input()
], ResourceLinkComponent.prototype, "icon", void 0);
__decorate([
    Input()
], ResourceLinkComponent.prototype, "external", void 0);
ResourceLinkComponent = __decorate([
    Component({
        selector: 'gp-resource-link',
        template: "<a routerLink=\"/view/{{item?.id}}\">\n    <span *ngIf=\"hasIcon()\" class=\"a-icon {{getIconClass()}}\"></span>\n    {{getLabel()}}\n</a>\n",
        styles: [""]
    })
], ResourceLinkComponent);

let SelectedItemsComponent = class SelectedItemsComponent {
    constructor() {
        this.onEvent = new EventEmitter();
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
    }
    clear() {
        this.onEvent.emit({ name: 'selected:clear' });
    }
    remove(item) {
    }
};
__decorate([
    Input()
], SelectedItemsComponent.prototype, "selected", void 0);
__decorate([
    Output()
], SelectedItemsComponent.prototype, "onEvent", void 0);
SelectedItemsComponent = __decorate([
    Component({
        selector: 'gp-selected-items',
        template: "<div class=\"o-selected-items\">\n\n    <div class=\"list-group list-group-sm u-text--sm\">\n\n        <div *ngIf=\"!selected || !selected.length\" class=\"list-group-item\">\n            <div class=\"t-fg--gray-md t-text--italic\">Nothing selected</div>\n        </div>\n\n        <div *ngFor=\"let item of selected\"\n            class=\"list-group-item d-flex flex-justify-between flex-align-center\">\n            <div class=\"flex-1\">\n                <span class=\"icon-{{item.type.toLowerCase()}} is-themed\"></span>\n                {{item.label}}\n            </div>\n            <button type=\"button\" class=\"btn btn-link u-mg-left--sm\" (click)=\"remove(item)\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n\n    </div>\n\n    <div class=\"list-group list-group-sm u-text--sm u-mg-top--md\">\n\n        <ng-content select=\"[actions]\"></ng-content>\n\n        <div class=\"list-group-item d-flex flex-justify-between flex-align-center\"\n            [ngClass]=\"{'is-faded':!selected?.length}\"\n            (click)=\"clear()\">\n            <div class=\"flex-1\">Clear Selections</div>\n            <button type=\"button\" class=\"btn btn-link\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n    </div>\n\n</div>\n",
        styles: [".o-selected-items{padding:1em}"]
    })
], SelectedItemsComponent);

let ImageFallbackDirective = class ImageFallbackDirective {
    constructor() {
        this.fallback = `/assets/img-404.png`;
    }
    onImgError() { this.src = this.fallback; }
    onImgLoad() { this.className = 'is-image-loaded'; }
};
__decorate([
    Input()
], ImageFallbackDirective.prototype, "src", void 0);
__decorate([
    Input()
], ImageFallbackDirective.prototype, "fallback", void 0);
__decorate([
    HostBinding('class')
], ImageFallbackDirective.prototype, "className", void 0);
ImageFallbackDirective = __decorate([
    Directive({
        selector: 'img[fallback]',
        host: {
            '(error)': 'onImgError()',
            '(load)': 'onImgLoad()',
            '[src]': 'src'
        }
    })
], ImageFallbackDirective);
let ThumbnailComponent = class ThumbnailComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ngOnInit() {
    }
    getThumbnailUrl() {
        if (this.item.thumbnail && this.item.thumbnail.url)
            return this.item.thumbnail.url;
        return Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
    }
    getBackgroundImage() {
        if (!this.item || !this.item.thumbnail) {
            return this.getFallbackBackgroundImage();
        }
        let thumbnail = this.item.thumbnail;
        let type = thumbnail.mediaType || 'image/png';
        if (thumbnail.contentData) {
            let content = thumbnail.contentData;
            return this.sanitizer.bypassSecurityTrustStyle(`url(data:${type};base64,${content})`);
        }
    }
    getFallbackBackgroundImage() {
        let url = this.getFallbackUrl();
        return `url(${url})`;
    }
    isEmpty() {
        return !this.item || !this.item.thumbnail ||
            (!this.item.thumbnail.url && !this.item.thumbnail.contentData);
    }
    hasURL() {
        return this.item.thumbnail && !!this.item.thumbnail.url;
    }
    hasContentData() {
        return this.item.thumbnail && !!this.item.thumbnail.contentData && !this.item.thumbnail.url;
    }
    getFallbackUrl() {
        return Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
    }
};
ThumbnailComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
__decorate([
    Input()
], ThumbnailComponent.prototype, "item", void 0);
ThumbnailComponent = __decorate([
    Component({
        selector: 'gp-item-thumbnail',
        template: "<div class=\"m-thumbnail\" style=\"position:relative\">\n\n    <!-- fallback is to use SVG for item type as its thumbnail -->\n    <div *ngIf=\"isEmpty()\" class=\"is-16x9 is-fallback\">\n        <div\n            [style.background-size]=\"'contain'\"\n            [style.background-repeat]=\"'no-repeat'\"\n            [style.background-position]=\"'50% 0'\"\n            [style.background-image]=\"getFallbackBackgroundImage()\">\n        </div>\n    </div>\n\n    <!-- if there is a thumbnail with URL -->\n    <img *ngIf=\"hasURL()\" src=\"{{item.thumbnail.url}}\" fallback=\"{{getFallbackUrl()}}\">\n\n    <!-- if there is a thumbnail with base64 data -->\n    <div *ngIf=\"hasContentData()\" class=\"is-16x9\">\n        <img\n            [style.background-size]=\"'contain'\"\n            [style.background-repeat]=\"'no-repeat'\"\n            [style.background-image]=\"getBackgroundImage()\">\n    </div>\n\n</div>\n",
        styles: [".m-thumbnail img{max-width:100%}"]
    })
], ThumbnailComponent);

/**
 *
 */
class GeoPlatformError extends Error {
    get label() { return this._label; }
    set label(value) { this._label = value; }
    get code() { return this._code; }
    set code(value) { this._code = value; }
    get item() { return this._item; }
    set item(value) { this._item = value; }
    constructor(message, label, code, item) {
        super(message);
        this.label = label;
        this.code = code;
        this.item = item;
    }
    static from(error) {
        if (error instanceof GeoPlatformError)
            return error;
        let gpe = new GeoPlatformError(error.message);
        gpe.label = "An error occurred";
        gpe.code = 500;
        return gpe;
    }
}

let GeoPlatformErrorService = class GeoPlatformErrorService {
    constructor() {
        this.updateSubject = new BehaviorSubject(null);
        this.error$ = this.updateSubject.asObservable();
    }
    setError(error) {
        let gpe = GeoPlatformError.from(error);
        this.updateSubject.next(gpe);
    }
};
GeoPlatformErrorService = __decorate([
    Injectable()
], GeoPlatformErrorService);

/**
 *
 */
const EventTypes = {
    CLOSE: Symbol("Close"),
    OPEN: Symbol("Open"),
    RESET: Symbol("Reset"),
    SELECT: Symbol("Select"),
    SELECT_NONE: Symbol("SelectNone"),
    QUERY: Symbol("Query"),
    ADDED: Symbol("Added"),
    REMOVED: Symbol("Removed"),
    CHANGED: Symbol("Changed"),
    ERROR: Symbol("Error") //
};
/**
 * Search Event
 *
 */
class SearchEvent {
    constructor(type, options) {
        this.options = {};
        this.type = type;
        if (options) {
            Object.assign(this.options, options);
        }
    }
    getType() { return this.type; }
    getOptions() { return this.options; }
}

const Visibilities = {
    PUBLIC: 'public',
    PRIVATE: 'private'
};
const Statuses = {
    SUBMITTED: 'submitted'
};
function createItem(type, opts) {
    return Object.assign({
        type: type,
        uri: null,
        label: "New Item",
        description: "This item needs a description",
        resourceTypes: [],
        createdBy: null,
        lastModifiedBy: null
    }, opts || {});
}
function createAsset(type, opts) {
    let options = Object.assign({
        keywords: [],
        alternateTitles: [],
        purpose: null,
        themes: [],
        contacts: [],
        publishers: [],
        contributors: [],
        distributions: [],
        classifiers: {},
        landingPage: null,
        status: Statuses.SUBMITTED,
        visibility: Visibilities.PUBLIC,
        identifiers: [],
        extent: { minx: -179, miny: -89, maxx: 179, maxy: 89 },
        temporal: { startDate: null, endDate: null },
        statistics: { numViews: 0, numLikes: 0 },
        usedBy: [],
        related: [],
        rights: []
    }, opts || {});
    let item = createItem(type, options);
    return item;
}
function createMap() {
    let obj = createAsset(ItemTypes.MAP, {
        layers: [],
        baseLayer: null,
        annotations: {},
        thumbnail: {
            label: null,
            url: null,
            contentData: null,
            width: 0,
            height: 0
        }
    });
    return obj;
}
function createLayer(service) {
    let services = service ? [service] : [];
    let obj = createAsset(ItemTypes.LAYER, {
        subLayers: [],
        parentLayer: null,
        services: services,
        layerName: null,
        layerType: null,
        legend: null
    });
    return obj;
}
function createService() {
    let obj = createAsset(ItemTypes.SERVICE, {
        datasets: [],
        serviceType: null,
        href: null
    });
    return obj;
}
function createDataset() {
    let obj = createAsset(ItemTypes.DATASET, { services: [] });
    return obj;
}
function createGallery() {
    let obj = createAsset(ItemTypes.GALLERY, { items: [] });
    return obj;
}
function createCommunity() {
    let obj = createAsset(ItemTypes.COMMUNITY);
    return obj;
}
function createConcept() {
    let obj = createItem(ItemTypes.CONCEPT, { scheme: null });
    return obj;
}
function createConceptScheme() {
    let obj = createItem(ItemTypes.CONCEPT_SCHEME);
    return obj;
}
function createOrg() {
    let obj = createItem(ItemTypes.ORGANIZATION, { subOrgOf: null });
    return obj;
}
function createContact() {
    let obj = createItem(ItemTypes.CONTACT, {
        fullName: null,
        email: null,
        tel: null,
        fax: null,
        address: {
            street1: null,
            street2: null,
            city: null,
            state: null,
            zip: null
        }
    });
    return obj;
}
function defaultArrayValue(item, property) {
    if (!item || !property)
        return;
    if (item[property] === null || item[property] === undefined ||
        typeof (item[property]) === 'undefined')
        item[property] = [];
}
function defaultToNullValue(item, property) {
    if (!item || !property)
        return;
    if (typeof (item[property]) === 'undefined')
        item[property] = null;
}
class ItemFactory {
    static create(type) {
        switch (type) {
            case ItemTypes.MAP: return createMap();
            case ItemTypes.LAYER: return createLayer();
            case ItemTypes.SERVICE: return createService();
            case ItemTypes.DATASET: return createDataset();
            case ItemTypes.GALLERY: return createGallery();
            case ItemTypes.COMMUNITY: return createCommunity();
            case ItemTypes.CONCEPT: return createConcept();
            case ItemTypes.CONCEPT_SCHEME: return createConceptScheme();
            case ItemTypes.ORGANIZATION: return createOrg();
            case ItemTypes.CONTACT: return createContact();
            default: return null;
        }
    }
    static fix(item) {
        defaultArrayValue(item, 'resourceTypes');
        if (ItemHelper.isAsset(item)) {
            defaultArrayValue(item, 'keywords');
            defaultArrayValue(item, 'alternateTitles');
            defaultArrayValue(item, 'themes');
            defaultArrayValue(item, 'contacts');
            defaultArrayValue(item, 'publishers');
            defaultArrayValue(item, 'contributors');
            defaultArrayValue(item, 'distributions');
            defaultArrayValue(item, 'identifiers');
            defaultArrayValue(item, 'usedBy');
            defaultArrayValue(item, 'related');
            defaultArrayValue(item, 'accessRights');
            defaultToNullValue(item, 'purpose');
            defaultToNullValue(item, 'landingPage');
            defaultToNullValue(item, 'status');
            defaultToNullValue(item, 'visibility');
            if (!item.temporal) {
                item.temporal = { startDate: null, endDate: null };
            }
            if (!item.extent) {
                item.extent = { minx: -179, miny: -89, maxx: 179, maxy: 89 };
            }
        }
    }
}

const MapTypes = {
    GeoPlatform: { label: "GeoPlatform Map", uri: 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap' },
    AGOL: { label: "AGOL Web Map", uri: 'http://www.geoplatform.gov/ont/openmap/AGOLMap' },
    WMS: { label: "WMS Map", uri: "http://www.geoplatform.gov/ont/openmap/WMSMap" },
    MapBox: { label: "Map Box Map", uri: 'http://www.geoplatform.gov/ont/openmap/MapBoxMap' }
};

let ArrayedItemsPipe = class ArrayedItemsPipe {
    transform(value, property, num) {
        let max = isNaN(num) || num > value.length ? value.length : num;
        return value.slice(0, max).map(v => v[property]).join(' ');
    }
};
ArrayedItemsPipe = __decorate([
    Pipe({ name: 'arrayedItems' })
], ArrayedItemsPipe);
/*
 * Limits an array of entries to a maximum number
 * Usage:
 *   array | limitTo:num
 * Example:
 *   {{ ['one','two','three'] | limitTo:2 }}
 */
let LimitToPipe = class LimitToPipe {
    transform(value, num, start) {
        if (value && value.length > num) {
            let st = isNaN(start) ? 0 : start;
            if (st > 0)
                num += st;
            return value.slice(st, num);
        }
        return value;
    }
};
LimitToPipe = __decorate([
    Pipe({ name: 'limitTo' })
], LimitToPipe);
/*
 *
 * Usage:
 *   array | sortBy : property
 * Example:
 *   {{ ['one','two','three'] | limitTo:2 }}
 */
let SortByPipe = class SortByPipe {
    transform(value, property) {
        return value.sort((a, b) => {
            return a[property] > b[property] ? -1 : 1;
        });
    }
};
SortByPipe = __decorate([
    Pipe({ name: 'sortBy' })
], SortByPipe);
/*
 * Formats a GeoPlatform Item's type to a friendly label
 * Usage:
 *   type | friendlyType
 * Example:
 *   {{ "dcat:Dataset" | friendlyType }}
 *   formats to: "Dataset"
*/
let FriendlyTypePipe = class FriendlyTypePipe {
    transform(value) {
        if (!value || typeof (value) !== 'string' || value.length === 0)
            return value;
        let name = value;
        let idx = value.indexOf(":");
        if (~idx)
            name = value.substring(idx + 1);
        if ('VCard' === name)
            name = 'Contact';
        return name;
    }
};
FriendlyTypePipe = __decorate([
    Pipe({ name: 'friendlyType' })
], FriendlyTypePipe);
/*
 * Replaces underscores between words with spaces
 * Usage:
 *   type | fixLabel
 * Example:
 *   {{ "One_Two_Three" | fixLabel }}
 *   formats to: "One Two Three"
*/
let FixLabelPipe = class FixLabelPipe {
    transform(value) {
        if (!value || typeof (value) !== 'string' || !value.length)
            return 'Untitled';
        let result = value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").trim();
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
};
FixLabelPipe = __decorate([
    Pipe({ name: 'fixLabel' })
], FixLabelPipe);

let ItemResolver = class ItemResolver {
    constructor(service, trackingService) {
        this.service = service;
        this.trackingService = trackingService;
    }
    resolve(route, state) {
        let id = route.paramMap.get('id');
        let opts = {};
        let version = route.paramMap.get("version");
        if (version)
            opts.version = version;
        return this.service.get(id, opts)
            .then(item => {
            if (this.trackingService) {
                let event = TrackingEventFactory(TrackingTypes.VIEWED, item);
                this.trackingService.logEvent(event);
            }
            return item;
        })
            .catch((e) => of(e));
    }
};
ItemResolver.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [TrackingService,] }] }
];
ItemResolver = __decorate([
    Injectable( /*{ providedIn: 'root' }*/),
    __param(0, Inject(ItemService)),
    __param(1, Inject(TrackingService))
], ItemResolver);
let VersionResolver = class VersionResolver {
    constructor() { }
    resolve(route, state) {
        let version = route.paramMap.get("version");
        return Promise.resolve(version || null);
    }
};
VersionResolver = __decorate([
    Injectable( /*{ providedIn: 'root' }*/)
], VersionResolver);
let NewItemResolver = class NewItemResolver {
    constructor(router) {
        this.router = router;
    }
    resolve(route, state) {
        let type = route.params.type;
        let item = ItemFactory.create(type);
        if (!item) {
            let gpe = new GeoPlatformError(`Type ${type} is unsupported`, "Unsupported Type", 400);
            // this.errorService.setError(gpe);
            this.router.navigateByUrl('error', { skipLocationChange: false });
            return empty();
        }
        else {
            return of(item);
        }
    }
};
NewItemResolver.ctorParameters = () => [
    { type: Router }
];
NewItemResolver = __decorate([
    Injectable()
], NewItemResolver);
let ErrorResolver = class ErrorResolver {
    constructor(router) {
        this.router = router;
    }
    resolve(route, state) {
        let type = route.params.type;
        let msg = "An error has occurred";
        if ("unsupported" === type)
            msg = `Type ${type} is not supported`;
        else if ("404" === type)
            msg = "Item not found";
        let error = new Error(msg);
        // error.error = "Unsupported Type";
        return of(error);
    }
};
ErrorResolver.ctorParameters = () => [
    { type: Router }
];
ErrorResolver = __decorate([
    Injectable()
], ErrorResolver);

/**
 *
 */
let SearchService = class SearchService {
    constructor(service) {
        this.service = service;
        this.selected = [];
        this.subject = new Subject();
        this.subject$ = this.subject.asObservable();
    }
    setQuery(query) {
        this.query = query ? query.clone() : new Query();
        this.subject.next({ query: this.query.clone() });
    }
    getQuery() {
        return this.query.clone();
    }
    getResults() {
        return this.results;
    }
    search(query) {
        //if a query was provided, store it and use it
        if (query)
            this.setQuery(query);
        this.service.search(this.query)
            .then((response) => {
            logger.debug('SearchService.search() - ' + response.totalResults + " results found");
            this.results = response;
            this.subject.next({ results: response });
        })
            .catch((error) => {
            logger.error(error.message);
        });
    }
    /**
     * @param item - item or array of item selected from search results
     * @param asBaseLayer - boolean indicating how to select the layer
     */
    select(item) {
        if (Array.isArray(item)) { //multiple selections
            item.forEach(it => this._toggleItem(it, false));
            this.subject.next({ selected: this.selected });
            return;
        }
        this._toggleItem(item, true);
    }
    /**
     *
     */
    _toggleItem(item, fireEvent) {
        if (!item || !item.id)
            return;
        let position = this.selected.findIndex(s => s.id === item.id);
        if (position >= 0) { //already selected, deselect it and return
            this.selected.splice(position, 1);
            if (fireEvent)
                this.subject.next({ selected: this.selected });
            return;
        }
        //new selection
        // logger.error(`Selecting ${item.label} as ${entry.type.toString()}`);
        //fetch full object and replace placeholder in selected array
        this.service.get(item.id)
            .then(fullItem => {
            this.selected.push(fullItem);
            this.selected.sort((a, b) => a.label > b.label ? 1 : -1);
            if (fireEvent)
                this.subject.next({ selected: this.selected });
        })
            .catch(e => {
            logger.error("SearchService.select() - " +
                "Error encountered fetching selected item's details: " + e.message);
        });
    }
    /**
     * @param item Item
     * @return boolean
     */
    isSelected(item) {
        return this.selected.length &&
            item && item.id &&
            this.selected.findIndex(it => it.id === item.id) >= 0;
    }
    /**
     *
     */
    hasSelected() {
        return this.selected && this.selected.length > 0;
    }
    /**
     * @return Item[]
     */
    getSelected() {
        return this.selected;
    }
    clearSelected() {
        this.selected = [];
        this.subject.next({ selected: this.selected });
    }
    subscribe(listener) {
        let obs = {
            next: (value) => {
                if (typeof (value) === 'undefined' || value === null)
                    return;
                if (value.query)
                    listener.onQueryChange(value.query);
                if (value.results)
                    listener.onResultsChange(value.results);
                if (value.selected)
                    listener.onSelectedChange(value.selected);
            },
            error: (err) => {
                console.log("[ERROR] " + err.message);
            },
            complete: () => { }
        };
        let sub = this.subject$.subscribe(obs);
        if (this.query)
            this.subject.next({ query: this.query.clone() });
        if (this.results)
            this.subject.next({ results: this.results });
        if (this.selected)
            this.subject.next({ selected: this.selected });
        return sub;
    }
};
SearchService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
];
SearchService = __decorate([
    Injectable(),
    __param(0, Inject(ItemService))
], SearchService);

let ItemFilterComponent = class ItemFilterComponent {
    constructor(service, types, label, dialog) {
        this.service = service;
        this.types = types;
        this.filterLabel = "Item";
        this.isCollapsed = true;
        this.filterLabel = label;
        if (dialog)
            this.dialog = dialog;
    }
    ngOnInit() {
        this.selected = [];
        this.initQuery();
        // this.fetchResults();
    }
    ngOnDestroy() {
        this.selected = null;
        this.choices = null;
        this.service = null;
        this.query = null;
        this.types = null;
    }
    openDialog() {
        let opts = this.getDialogOptions();
        const dialogRef = this.dialog.open(ListSelectDialog, opts);
        dialogRef.afterClosed().subscribe((results) => {
            if (results && results.length) {
                this.selected = this.selected.concat(results);
                let key = this.getKey();
                let change = {};
                change[key] = this.selected.map(s => s.id);
                change[QueryParameters.PAGE] = 0;
                let event = new SearchEvent(EventTypes.QUERY, change);
                this.notify(event);
            }
        });
    }
    /**
     * @return configuration options for the material dialog used to select new values
     */
    getDialogOptions() {
        return {
            width: '50%',
            data: {
                service: this.service,
                query: this.query,
                selected: []
            }
        };
    }
    isSupported() {
        return true;
    }
    /**
     *
     */
    initQuery() {
        this.query = new Query().fields([]).facets([]).types(this.types);
    }
    hasSelections() {
        return this.selected && this.selected.length > 0;
    }
    isSelected(arg) {
        // let id = this.getChoiceId(arg);
        return arg && this.selected.findIndex(s => s.id === arg.id) > -1;
    }
    /**
     * @param arg - item or identifier
     */
    toggle(arg) {
        if (!arg)
            return;
        // let id = this.getChoiceId(arg);
        // if(id === null) return;
        let idx = this.selected.findIndex(s => s.id === arg.id);
        if (idx < 0)
            this.selected.push(arg);
        else
            this.selected.splice(idx, 1);
        let key = this.getKey();
        let change = {};
        change[key] = this.selected.map(s => s.id);
        change[QueryParameters.PAGE] = 0;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.notify(event);
    }
    // /**
    //  * Update search results using current query
    //  */
    // fetchResults() {
    //     this.service.search(this.query).then( (response:any) => {
    //         this.choices = response.results as any[];
    //     })
    //     .catch( (e:Error) => {
    //         this.choices = [] as any[];
    //         //TODO display error to user
    //     });
    // }
    //
    // /**
    //  * @param arg - item or identifier
    //  * @return string identifier
    //  */
    // getChoiceId(arg : any) : string {
    //     let id : string = null;
    //     if('string' === typeof(arg)) {
    //         id = arg as string;
    //     } else if(arg && typeof(arg.id) !== 'undefined') {
    //         id = arg.id as string;
    //     }
    //     if(id === null || id === 'undefined') {
    //         let key = this.getKey();
    //         console.log(`[WARN] Can't determine value for filter '${key}'`);
    //         return null;
    //     }
    //     return id;
    // }
    clear() {
        if (this.hasSelections()) {
            this.selected = [];
            let key = this.getKey();
            let change = {};
            change[key] = [];
            change[QueryParameters.PAGE] = 0;
            let event = new SearchEvent(EventTypes.QUERY, change);
            this.notify(event);
        }
        else {
            this.isCollapsed = !this.isCollapsed;
        }
    }
};
ItemFilterComponent = __decorate([
    __param(0, Inject(ItemService)),
    __param(3, Inject(MatDialog))
], ItemFilterComponent);

let CommunityFilterComponent = class CommunityFilterComponent extends ItemFilterComponent {
    constructor(service, dialog) {
        super(service, ItemTypes.COMMUNITY, "Communities", dialog);
        this.key = QueryParameters.USED_BY_ID;
        this.onEvent = new EventEmitter();
    }
    getKey() {
        return this.key;
    }
    notify(event) {
        this.onEvent.emit(event);
    }
    initQuery() {
        super.initQuery();
        // this.query.fields(['subOrganizationOf']);
    }
};
CommunityFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
    { type: MatDialog }
];
__decorate([
    Input()
], CommunityFilterComponent.prototype, "key", void 0);
__decorate([
    Output()
], CommunityFilterComponent.prototype, "onEvent", void 0);
CommunityFilterComponent = __decorate([
    Component({
        selector: 'gp-community-filter',
        template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    }),
    __param(0, Inject(ItemService))
], CommunityFilterComponent);

;
let CreatedByFilterComponent = class CreatedByFilterComponent extends AuthenticatedComponent {
    constructor(authService, service) {
        super(authService);
        this.service = service;
        this.key = QueryParameters.QUERY;
        this.onEvent = new EventEmitter();
        this.typeaheadValue = null;
        this.isCollapsed = true;
        this.pagination = { page: 0, size: 10 };
        this.values = [];
        this.pagedValues = [];
        this.visibleAmount = 10;
    }
    ngOnInit() {
        super.ngOnInit();
        this.selected = null;
        this.fetchValues();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.values = null;
        this.pagedValues = null;
        this.pagination = null;
        this.selected = null;
        this.outsideSelection = null;
    }
    notify() {
        let key = this.key;
        let change = {};
        change[key] = this.selected;
        change[QueryParameters.PAGE] = 0;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
    hasSelections() {
        return this.selected && this.selected.length > 0;
    }
    isSelected(arg) {
        return this.hasSelections() && this.getIndexOf(arg) >= 0;
    }
    getIndexOf(arg) {
        if (!this.selected || !this.selected.length)
            return -1;
        return this.selected.indexOf(arg);
    }
    /**
     * @param arg - item or identifier
     */
    toggle(arg) {
        if (this.selected && this.selected === arg)
            this.selected = null;
        else
            this.selected = arg;
        this.notify();
    }
    clear() {
        if (this.hasSelections()) {
            this.selected = null;
            this.notify();
        }
        else if (this.isCollapsed) {
            this.isCollapsed = false;
        }
    }
    fetchValues() {
        let query = new Query().pageSize(1)
            .facets(QueryFacets.CREATED_BY)
            .parameter('includeFacet._createdBy.size', 1000); //TODO not use Registry name
        this.service.search(query)
            .then((response) => {
            let facet = response.facets.find(facet => facet.name === 'createdBy');
            if (!facet)
                this.values = [];
            else {
                this.values = (facet.buckets || []).map((bucket) => {
                    // Awaiting DT-1092 resolution
                    return {
                        id: bucket.label,
                        label: bucket.label,
                        count: bucket.count
                    };
                });
            }
        })
            .catch(e => { this.values = []; })
            .finally(() => {
            this.updatePagedValues();
        });
    }
    /**
     *
     */
    nextPage() {
        let numPages = Math.ceil(this.values.length / this.pagination.size);
        this.pagination.page = Math.min(numPages - 1, this.pagination.page + 1);
        this.updatePagedValues();
    }
    /**
     *
     */
    prevPage() {
        this.pagination.page = Math.max(0, this.pagination.page - 1);
        this.updatePagedValues();
    }
    /**
     * @param resetStart boolean indicating to reset pagination start
     */
    updatePagedValues(resetStart) {
        if (resetStart)
            this.pagination.page = 0;
        let values = this.values;
        if (this.typeaheadValue && this.typeaheadValue.length) {
            values = values.filter(v => v.label.indexOf(this.typeaheadValue) >= 0);
        }
        if (values.length < this.pagination.size) {
            this.pagination.page = 0; //reset current page
            this.pagedValues = values;
            console.log("Paged Values: " + JSON.stringify(this.pagedValues));
        }
        let start = this.pagination.page * this.pagination.size;
        let end = Math.min(start + this.pagination.size, values.length);
        this.pagedValues = values.slice(start, end);
        this.checkForOutsideSelections();
    }
    /**
     *
     */
    checkForOutsideSelections() {
        let selected = this.getSelection();
        if (selected && !this.pagedValues.find(v => v.id === selected)) {
            this.outsideSelection = selected;
        }
        else {
            this.outsideSelection = null;
        }
    }
    /**
     *
     */
    clearTypeAhead() {
        this.typeaheadValue = null;
        this.updatePagedValues();
    }
    /**
     *
     */
    toggleCurrentUser() {
        let username = this.getCurrentUserName();
        if (username)
            this.toggle(username);
        else {
            console.log("No user to use to filter");
        }
    }
    getCurrentUserName() {
        if (!this.isAuthenticated())
            return null;
        let user = this.getUser();
        return user ? user.username : null;
    }
    getSelection() {
        // let value = this.service.getCreatedBy();
        // if(Array.isArray(value)) return value.length ? value[0] : null;
        // return value;
        return null;
    }
};
CreatedByFilterComponent.ctorParameters = () => [
    { type: AppAuthService },
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
];
__decorate([
    Input()
], CreatedByFilterComponent.prototype, "key", void 0);
__decorate([
    Input()
], CreatedByFilterComponent.prototype, "selected", void 0);
__decorate([
    Output()
], CreatedByFilterComponent.prototype, "onEvent", void 0);
CreatedByFilterComponent = __decorate([
    Component({
        selector: 'gp-createdby-filter',
        template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Creator\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <a class=\"m-facet\" (click)=\"clear()\" [ngClass]=\"{active:!hasSelections()}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square': !hasSelections(), 'fa-square': hasSelections()}\"></span>\n            <span *ngIf=\"!hasSelections()\">Any creator</span>\n            <span *ngIf=\"hasSelections()\">Clear Selections</span>\n        </a>\n\n        <a class=\"m-facet\"\n            *ngIf=\"isAuthenticated() && !isSelected( getCurrentUserName() )\"\n            (click)=\"toggle( getCurrentUserName() )\">\n            <span class=\"fas fa-square t-fg--gray-lt\"></span>\n            Me ({{getCurrentUserName()||\"\"}})\n        </a>\n\n        <div class=\"m-facet\" *ngIf=\"values.length\">\n            <div class=\"input-group-slick\">\n                <span class=\"fas fa-search\"></span>\n                <input type=\"text\" class=\"form-control\" placeholder=\"Find creator by name\"\n                    ([ngModel])=\"typeaheadValue\" (change)=\"updatePagedValues(true)\">\n                <span class=\"fas fa-times\" *ngIf=\"typeaheadValue?.length\" (click)=\"clearTypeAhead()\"></span>\n            </div>\n        </div>\n\n        <div class=\"m-facet d-flex flex-justify-between flex-align-center\" *ngIf=\"values?.length\">\n            <button type=\"button\" class=\"btn btn-xs btn-light\" (click)=\"prevPage()\">\n                <span class=\"fas fa-backward\"></span>\n            </button>\n            <div>\n                showing {{pagedValues?.length||'0'}}\n                <span *ngIf=\"typeaheadValue?.length\">matches</span>\n                of {{values?.length||'0'}} results\n            </div>\n            <button type=\"button\" class=\"btn btn-xs btn-light\" (click)=\"nextPage()\">\n                <span class=\"fas fa-forward\"></span>\n            </button>\n        </div>\n        <div *ngFor=\"let value of pagedValues; let $index = index\" class=\"m-facet\">\n            <a  *ngIf=\"!isAuthenticated() || (value.id !== getCurrentUserName())\"\n                (click)=\"toggle(value.id)\"\n                [ngClass]=\"{active:isSelected(value.id),'is-hidden':$index>visibleAmount}\">\n                <span class=\"u-mg-right--sm far\"\n                    [ngClass]=\"{'fa-check-square': isSelected(value.id), 'fa-square': !isSelected(value.id)}\"></span>\n                <span class=\"u-mg-right--xs far fa-user\"></span>\n                <span>{{value.label}}</span>\n                <span class=\"badge badge-secondary\">{{value.count}}</span>\n            </a>\n        </div>\n        <!-- show selections that are not in the filtered values above -->\n        <hr *ngIf=\"!isCollapsed && outsideSelection\">\n        <a  *ngIf=\"outsideSelection\" class=\"m-facet\"\n            (click)=\"toggle(outsideSelection.id)\">\n            <span class=\"fas fa-check-square\"></span>\n            <span class=\"badge u-text--md t-fg--gray-md\"\n                title=\"This item is selected but not in the filtered values above\">\n                <span class=\"fas fa-info-circle\"></span>\n            </span>\n            <span class=\"u-mg-right--xs far fa-user\"></span>\n            {{outsideSelection}}\n        </a>\n    </div>\n</div>\n",
        styles: [""]
    }),
    __param(1, Inject(ItemService))
], CreatedByFilterComponent);

let KeywordFilterComponent = class KeywordFilterComponent {
    constructor() {
        this.key = QueryParameters.QUERY;
        this.placeholder = "Search GeoPlatform";
        this.onEvent = new EventEmitter();
    }
    ngOnInit() { }
    onKeyUp($event) {
        let text = $event.target.value;
        this.onValueChange(text);
    }
    onValueChange(value) {
        let change = {};
        change[this.key] = value && value.length ? value : null;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
};
__decorate([
    Input()
], KeywordFilterComponent.prototype, "key", void 0);
__decorate([
    Input()
], KeywordFilterComponent.prototype, "searchString", void 0);
__decorate([
    Input()
], KeywordFilterComponent.prototype, "placeholder", void 0);
__decorate([
    Output()
], KeywordFilterComponent.prototype, "onEvent", void 0);
KeywordFilterComponent = __decorate([
    Component({
        selector: 'gp-keywords-filter',
        template: "\n<div class=\"input-group-slick flex-1\">\n    <span class=\"fas fa-search\"></span>\n    <input type=\"text\" class=\"form-control\"\n        placeholder=\"{{placeholder}}\"\n        [(ngModel)]=\"searchString\" (keyup.enter)=\"onKeyUp($event)\">\n    <button type=\"button\" class=\"btn btn-light\" title=\"Clear keywords\"\n        *ngIf=\"searchString?.length\" (click)=\"searchString=null\">\n        <span class=\"fas fa-times\"></span>\n    </button>\n</div>\n\n<button type=\"button\" class=\"btn btn-secondary\"\n    [disabled]=\"!searchString||!searchString.length\"\n    (click)=\"onValueChange(searchString)\"\n    title=\"Search the GeoPlatform\">\n    Search\n</button>\n",
        styles: [":host{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}:host>:last-child{margin-left:1em}"]
    })
], KeywordFilterComponent);

let PublisherFilterComponent = class PublisherFilterComponent extends ItemFilterComponent {
    constructor(service, dialog) {
        super(service, ItemTypes.ORGANIZATION, "Publishers", dialog);
        this.key = QueryParameters.PUBLISHERS_ID;
        this.onEvent = new EventEmitter();
    }
    getKey() {
        return this.key;
    }
    notify(event) {
        this.onEvent.emit(event);
    }
    initQuery() {
        super.initQuery();
        this.query.fields(['subOrganizationOf']);
    }
    getDialogOptions() {
        let opts = super.getDialogOptions();
        opts.data.subHeading = "subOrganizationOf";
        return opts;
    }
};
PublisherFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
    { type: MatDialog }
];
__decorate([
    Input()
], PublisherFilterComponent.prototype, "key", void 0);
__decorate([
    Output()
], PublisherFilterComponent.prototype, "onEvent", void 0);
PublisherFilterComponent = __decorate([
    Component({
        selector: 'gp-publisher-filter',
        template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    }),
    __param(0, Inject(ItemService))
], PublisherFilterComponent);

let SchemeFilterComponent = class SchemeFilterComponent extends ItemFilterComponent {
    constructor(service, dialog) {
        super(service, ItemTypes.CONCEPT_SCHEME, "Scheme", dialog);
        //the key associated with this filter's selections
        this.key = QueryParameters.SCHEMES_ID;
        //the current set of values
        this.selected = [];
        this.onEvent = new EventEmitter();
    }
    getKey() {
        return this.key;
    }
    notify(event) {
        this.onEvent.emit(event);
    }
    isSupported() {
        if (this.query) {
            let types = this.query.getTypes();
            return types && types.length && types.indexOf(ItemTypes.CONCEPT) >= 0;
        }
        return false;
    }
};
SchemeFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
    { type: MatDialog }
];
__decorate([
    Input()
], SchemeFilterComponent.prototype, "key", void 0);
__decorate([
    Input()
], SchemeFilterComponent.prototype, "selected", void 0);
__decorate([
    Input()
], SchemeFilterComponent.prototype, "query", void 0);
__decorate([
    Output()
], SchemeFilterComponent.prototype, "onEvent", void 0);
SchemeFilterComponent = __decorate([
    Component({
        selector: 'gp-scheme-filter',
        template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    }),
    __param(0, Inject(ItemService))
], SchemeFilterComponent);

let SemanticFilterDialog = class SemanticFilterDialog {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        //pagination
        this.currentPage = 0;
        this.totalSuggested = 0;
        this.kgQuery = new KGQuery().page(this.currentPage).pageSize(12);
    }
    onNoClick() {
        this.dialogRef.close();
    }
    /**
     * @param {string} value - user input to filter options with
     * @return {Promise} resolving array of string options
     */
    filterValues(value) {
        if (!value) { //require user to provide input before searching
            this.suggested = [];
            this.totalSuggested = 0;
            return;
        }
        this.kgQuery.q(value);
        this.data.service.suggest(this.kgQuery)
            .then((response) => {
            let hits = response.results;
            // if(current && current.length) {
            //     hits = hits.filter(o => { return current.indexOf(o.uri)<0; });
            // }
            this.suggested = hits;
            this.totalSuggested = response.totalResults;
        })
            .catch(e => {
            //display error message indicating an issue searching...
        });
    }
    addValue(arg) {
        this.data.selected.push(arg);
    }
    removeValue(value) {
        let index = -1;
        this.data.selected.forEach((p, i) => { if (p.uri === value.uri) {
            index = i;
        } });
        if (index >= 0) {
            this.data.selected.splice(index, 1);
        }
    }
    isSelected(arg) {
        return this.data.selected.length > 0 &&
            !!this.data.selected.find((s) => s.uri === arg.uri);
    }
    /**
     * @param pageNo - new page number being requested
     */
    onPageChange(pageNo) {
        if (this.currentPage !== pageNo - 1) {
            this.kgQuery.page(pageNo - 1);
            this.filterValues(this.termQuery);
        }
    }
};
SemanticFilterDialog.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
SemanticFilterDialog = __decorate([
    Component({
        selector: 'gp-semantic-filter-dialog',
        template: "<h5 mat-dialog-title>Search for Concepts to Constraining Search Results</h5>\n<div mat-dialog-content>\n    <mat-form-field appearance=\"outline\">\n        <mat-label>\n            <mat-icon><span class=\"fas fa-search\"></span></mat-icon>\n            Search\n        </mat-label>\n        <input matInput [(ngModel)]=\"termQuery\" (ngModelChange)=\"filterValues($event)\"\n            placeholder=\"Enter keywords to find recommended concepts\">\n        <span matSuffix *ngIf=\"termQuery?.length\" (click)=\"termQuery=null\"\n            class=\"fas fa-times t-fg--gray-md\">\n        </span>\n    </mat-form-field>\n\n    <div class=\"a-heading d-flex flex-justify-between flex-align-center u-mg-bottom--md\">\n        Recommendations ({{totalSuggested||0}})\n        <div class=\"u-text--sm\" *ngIf=\"totalSuggested>0\">\n            <ngb-pagination [collectionSize]=\"totalSuggested\"\n                [pageSize]=\"12\" [maxSize]=\"2\" [size]=\"'sm'\"\n                [rotate]=\"true\" [(page)]=\"currentPage\"\n                (pageChange)=\"onPageChange($event)\">\n            </ngb-pagination>\n        </div>\n    </div>\n\n    <div class=\"m-list-section\">\n        <div class=\"list-group\">\n            <em *ngIf=\"!suggested?.length\">Enter keywords above to receive suggested concepts to use.</em>\n            <div *ngFor=\"let concept of suggested\" class=\"list-group-item\"\n                (click)=\"addValue(concept)\" [ngClass]=\"{'active':isSelected(concept)}\">\n                <div><a class=\"is-linkless\">{{concept.prefLabel||concept.label}}</a></div>\n                <small class=\"t-fg--gray-md\">{{concept.uri}}</small>\n            </div>\n        </div>\n    </div>\n    <hr>\n    <div class=\"a-heading\">Selected ({{data?.selected?.length||0}})</div>\n    <div class=\"m-list-section\">\n        <div class=\"list-group\">\n            <em *ngIf=\"!data.selected?.length\">No concepts selected.</em>\n            <div *ngFor=\"let concept of data?.selected\" class=\"list-group-item\">\n                <div>\n                    <span class=\"fas fa-times t-fg--danger\" (click)=\"removeValue(concept)\"></span>\n                    {{concept.prefLabel||concept.label}}\n                </div>\n                <small class=\"t-fg--gray-md\">{{concept.uri}}</small>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"onNoClick()\">Cancel</button>\n    <button type=\"button\" mat-flat-button color=\"primary\" [mat-dialog-close]=\"data.selected\" cdkFocusInitial>Ok</button>\n</div>\n",
        styles: [":host .mat-form-field{width:100%}"]
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], SemanticFilterDialog);

let SemanticFilterComponent = class SemanticFilterComponent {
    constructor(service, dialog) {
        this.service = service;
        this.dialog = dialog;
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.visibleAmount = 10;
    }
    ngOnInit() {
        this.selected = [];
    }
    openDialog() {
        const dialogRef = this.dialog.open(SemanticFilterDialog, {
            width: '50%',
            data: { service: this.service, selected: [] }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.length) {
                this.selected = this.selected.concat(result);
                this.notify();
            }
        });
    }
    getKey() {
        return this.key;
    }
    notify() {
        let key = this.key;
        let change = {};
        change[key] = this.selected.map(s => s.uri);
        change[QueryParameters.PAGE] = 0;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
    hasSelections() {
        return this.selected && this.selected.length > 0;
    }
    isSelected(arg) {
        return this.hasSelections() && this.getIndexOf(arg) >= 0;
    }
    getIndexOf(arg) {
        if (!this.selected || !this.selected.length)
            return -1;
        return this.selected.findIndex(s => s.uri === arg.uri);
    }
    /**
     * @param arg - item or identifier
     */
    toggle(arg) {
        let idx = this.getIndexOf(arg);
        if (idx >= 0)
            this.selected.splice(idx, 1); //found, remove it
        else
            this.selected.push(arg); //not found, add it
        this.notify();
    }
    clear() {
        if (this.hasSelections()) {
            this.selected = [];
            this.notify();
        }
        else if (this.isCollapsed) {
            this.isCollapsed = false;
        }
    }
};
SemanticFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [KGService,] }] },
    { type: MatDialog, decorators: [{ type: Inject, args: [MatDialog,] }] }
];
__decorate([
    Input()
], SemanticFilterComponent.prototype, "key", void 0);
__decorate([
    Output()
], SemanticFilterComponent.prototype, "onEvent", void 0);
SemanticFilterComponent = __decorate([
    Component({
        selector: 'gp-semantic-filter',
        template: "\n<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Semantic Concepts\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <a class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find Concepts...\n        </a>\n\n        <a class=\"m-facet\" (click)=\"clear()\" [ngClass]=\"{active:!hasSelections()}\">\n            <span *ngIf=\"!hasSelections()\">No concepts selected</span>\n            <span *ngIf=\"hasSelections()\">Clear Selections</span>\n        </a>\n\n        <div class=\"m-facet\" *ngFor=\"let concept of selected; let $index = index\" (click)=\"toggle(concept)\"\n            [ngClass]=\"{active:isSelected(concept),'is-hidden':$index>visibleAmount}\">\n            <span class=\"fas fa-check\" *ngIf=\"isSelected(concept)\"></span>\n            <span class=\"fas fa-square t-fg--gray-xlt\" *ngIf=\"!isSelected(concept)\"></span>\n            {{concept.prefLabel}}\n            <div class=\"u-break--all u-text--sm\">{{concept.uri}}</div>\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    }),
    __param(0, Inject(KGService)),
    __param(1, Inject(MatDialog))
], SemanticFilterComponent);

let ServiceTypeFilterComponent = class ServiceTypeFilterComponent {
    constructor(service) {
        this.service = service;
        //the key associated with this filter's selections
        this.key = QueryParameters.SERVICE_TYPES;
        //the current set of values
        this.selected = [];
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.types = [];
    }
    ngOnInit() {
        let query = new Query({
            type: 'dct:Standard',
            resourceType: 'ServiceType',
            fields: "availableVersions",
            size: 50,
            sort: 'label,asc'
        });
        this.service.search(query)
            .then((response) => {
            this.types = response.results;
        })
            .catch((error) => {
            console.log("Error loading supported service types");
        });
    }
    ngOnDestroy() {
        this.types = null;
        // this.svcQuery = null;
        // this.serviceSvc = null;
        // this.serviceTypes = null;
        // this.serviceTypesError = null;
        // this.byType = null;
    }
    hasSelections() {
        return this.selected && this.selected.length > 0;
    }
    isSelected(value) {
        return this.hasSelections() && this.selected.indexOf(value) >= 0;
    }
    getIndexOf(value) {
        return this.hasSelections() ? this.selected.indexOf(value) : -1;
    }
    isSupported() {
        if (this.query) {
            let types = this.query.getTypes();
            return types && types.length && types.indexOf(ItemTypes.SERVICE) >= 0;
        }
        return false;
    }
    toggle(value) {
        let result = this.selected.slice(0);
        let idx = this.getIndexOf(value);
        if (idx >= 0) {
            result = result.splice(idx, 1);
        }
        else {
            result.push(value);
        }
        let change = {};
        change[this.key] = result;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
    clear() {
        if (!this.hasSelections())
            this.isCollapsed = !this.isCollapsed; //toggle collapsed state
        else {
            let change = {};
            change[this.key] = null;
            let event = new SearchEvent(EventTypes.QUERY, change);
            this.onEvent.emit(event);
        }
    }
    getCount(value) {
        // var facet = this.service.getFacet("serviceTypes");
        // if(!facet) return '';
        // var valObj = facet.buckets.find(function(v) { return v.label===value; });
        // if(!valObj) return '';
        // return valObj.count;
        return 0;
    }
};
ServiceTypeFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
];
__decorate([
    Input()
], ServiceTypeFilterComponent.prototype, "key", void 0);
__decorate([
    Input()
], ServiceTypeFilterComponent.prototype, "selected", void 0);
__decorate([
    Input()
], ServiceTypeFilterComponent.prototype, "query", void 0);
__decorate([
    Output()
], ServiceTypeFilterComponent.prototype, "onEvent", void 0);
ServiceTypeFilterComponent = __decorate([
    Component({
        selector: 'gp-service-type-filter',
        template: "<div class=\"card o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"a-heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\" [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\"></span>\n        </button>\n        Filter by Service Types\n    </div>\n    <div class=\"o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">\n            <span *ngIf=\"isCollapsed\">No values selected</span>\n            <span *ngIf=\"!isCollapsed\">Any Service Type</span>\n        </a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selections</a>\n        <a *ngFor=\"let type of types\" class=\"m-facet\"\n            (click)=\"toggle(type.id)\" [ngClass]=\"{active:isSelected(type.id)}\">\n            <span class=\"fas fa-check\" *ngIf=\"isSelected(type.id)\"></span>\n            <span class=\"fas fa-square t-fg--gray-lt\" *ngIf=\"!isSelected(type.id)\"></span>\n            <span class=\"badge badge-secondary\">{{getCount(type.id)}}</span>\n            {{type.label}}\n        </a>\n    </div>\n</div>\n\n\n<!-- <div class=\"o-query-filter card\">\n    <div class=\"a-heading l-flex-container flex-justify-between flex-align-center\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\" [ngClass]=\"{'fa-minus':!isCollapsed,'fa-plus':isCollapsed}\"></span>\n        </button>\n        <span class=\"flex-1\">Filter by Service</span>\n    </div>\n    <div class=\"card-content\">\n        <div class=\"o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n            <div class=\"m-facet\">\n                <div class=\"input-group-slick\">\n                    <input name=\"scheme-typeahead\" type=\"text\" class=\"form-control\"\n                        ng-model=\"typeaheadValue\"\n                        ng-change=\"updateValues(typeaheadValue)\"\n                        ng-model-options=\"{debounce:200}\"\n                        placeholder=\"Search Services\">\n                    <span class=\"fas fa-times\"\n                        title=\"Clear query\"\n                        ng-if=\"typeaheadValue.length\"\n                        (click)=\"updateValues(typeaheadValue=null)\">\n                    </span>\n                </div>\n            </div>\n            <a class=\"m-facet\" (click)=\"clear()\"\n                [ngClass]=\"{active:!hasSelections()}\">\n                <span class=\"fas\"\n                    [ngClass]=\"{'fa-check':!hasSelections(), 'fa-square t-fg--gray-lt':hasSelections()}\">\n                </span>\n                Any Service\n            </a>\n            <a  *ngFor=\"let value of values\"\n                class=\"m-facet\"\n                (click)=\"toggle(value)\"\n                [ngClass]=\"{active:isSelected(value)}\">\n                <span class=\"fas\"\n                    [ngClass]=\"{'fa-check':isSelected(value),'fa-square t-fg--gray-lt':!isSelected(value)}\"></span>\n                {{value.label}}\n            </a>\n        </div>\n    </div>\n</div> -->\n",
        styles: [""]
    }),
    __param(0, Inject(ItemService))
], ServiceTypeFilterComponent);

let SimilarityFilterComponent = class SimilarityFilterComponent {
    constructor(service) {
        this.service = service;
        this.key = QueryParameters.SIMILAR_TO;
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        if (changes.selected) {
            let id = changes.selected.currentValue;
            if (!id)
                this.item = null;
            else {
                this.service.get(id)
                    .then((result) => { this.item = result; })
                    .catch((err) => {
                    console.log("SimilarityFilter.OnChange('selected') : ", err);
                });
            }
        }
    }
    clear() {
        let change = {};
        change[this.key] = null;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
};
SimilarityFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
];
__decorate([
    Input()
], SimilarityFilterComponent.prototype, "key", void 0);
__decorate([
    Input()
], SimilarityFilterComponent.prototype, "selected", void 0);
__decorate([
    Output()
], SimilarityFilterComponent.prototype, "onEvent", void 0);
SimilarityFilterComponent = __decorate([
    Component({
        selector: 'gp-similarity-filter',
        template: "<div class=\"m-article o-query-filter\" *ngIf=\"item\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Find Similar\n    </div>\n    <div class=\"u-text--sm\" *ngIf=\"!isCollapsed\">\n        Searching for items similar to:\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a  class=\"m-facet active\" (click)=\"clear()\">\n            <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            <span gpIcon [item]=\"item\"></span> {{item.label}}\n        </a>\n    </div>\n</div>\n",
        styles: [""]
    }),
    __param(0, Inject(ItemService))
], SimilarityFilterComponent);

let ThemeFilterComponent = class ThemeFilterComponent extends ItemFilterComponent {
    constructor(service, dialog) {
        super(service, ItemTypes.CONCEPT, "Themes", dialog);
        this.key = QueryParameters.THEMES_ID;
        this.onEvent = new EventEmitter();
    }
    getKey() {
        return this.key;
    }
    notify(event) {
        this.onEvent.emit(event);
    }
    initQuery() {
        super.initQuery();
        this.query.fields(['scheme']);
    }
    getDialogOptions() {
        let opts = super.getDialogOptions();
        opts.data.subHeading = "scheme";
        return opts;
    }
};
ThemeFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
    { type: MatDialog }
];
__decorate([
    Input()
], ThemeFilterComponent.prototype, "key", void 0);
__decorate([
    Output()
], ThemeFilterComponent.prototype, "onEvent", void 0);
ThemeFilterComponent = __decorate([
    Component({
        selector: 'gp-theme-filter',
        template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    }),
    __param(0, Inject(ItemService))
], ThemeFilterComponent);

let TopicFilterComponent = class TopicFilterComponent extends ItemFilterComponent {
    constructor(service, dialog) {
        super(service, ItemTypes.TOPIC, "Topics", dialog);
        this.key = QueryParameters.TOPIC_ID;
        this.onEvent = new EventEmitter();
    }
    getKey() {
        return this.key;
    }
    notify(event) {
        this.onEvent.emit(event);
    }
};
TopicFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
    { type: MatDialog }
];
__decorate([
    Input()
], TopicFilterComponent.prototype, "key", void 0);
__decorate([
    Output()
], TopicFilterComponent.prototype, "onEvent", void 0);
TopicFilterComponent = __decorate([
    Component({
        selector: 'gp-topic-filter',
        template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    }),
    __param(0, Inject(ItemService))
], TopicFilterComponent);

let TypeFilterComponent = class TypeFilterComponent {
    constructor() {
        this.key = QueryParameters.TYPES;
        this.selected = [];
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.visibleAmount = 10;
    }
    ngOnInit() {
        this.choices = Object.keys(ItemTypes).map(key => {
            let type = ItemTypes[key];
            if (ItemTypes.STANDARD === type || ItemTypes.RIGHTS_STATEMENT === type)
                return null;
            return { label: ItemTypeLabels[type], value: type };
        }).filter(v => !!v);
        // console.log("TypeFilter.onInit() " + JSON.stringify(this.selected));
    }
    ngOnChanges(changes) {
        if (changes.selected) {
            let value = changes.selected.currentValue;
            console.log("TypeFilter.onChanges() " + JSON.stringify(value));
            //if a selected value wasn't provided, ensure it's 'null' and not undefined
            if (value === undefined) {
                this.selected = [];
            }
            else if (typeof (value) === 'string') {
                this.selected = [value];
            }
        }
    }
    getKey() {
        return this.key;
    }
    notify(event) {
        this.onEvent.emit(event);
    }
    hasSelections() {
        return this.selected && this.selected.length > 0;
    }
    isSelected(arg) {
        return this.getIndexOf(arg) >= 0;
    }
    getIndexOf(arg) {
        return this.selected ? this.selected.indexOf(arg) : -1;
    }
    /**
     * @param arg - item or identifier
     */
    toggle(arg) {
        let idx = this.getIndexOf(arg);
        if (idx >= 0) {
            this.selected.splice(idx, 1);
        }
        else {
            this.selected.push(arg);
        }
        let key = this.getKey();
        let value = this.selected.length ? this.selected : null;
        let change = {};
        change[key] = value;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.notify(event);
    }
    clear() {
        if (this.hasSelections()) {
            this.selected = [];
            let key = this.getKey();
            let change = {};
            change[key] = null;
            let event = new SearchEvent(EventTypes.QUERY, change);
            this.notify(event);
        }
        else if (this.isCollapsed) {
            this.isCollapsed = false;
        }
    }
    getCount(value) {
        let facet = (this.facets || []).find((facet) => facet.name === this.key);
        if (!facet || !facet.buckets || !facet.buckets.length) {
            // console.log("No facet for " + this.key);
            return '';
        }
        let valObj = facet.buckets.find((v) => v.label === value);
        if (!valObj) {
            // console.log("No bucket for " + value);
            return '';
        }
        return valObj.count;
    }
};
__decorate([
    Input()
], TypeFilterComponent.prototype, "key", void 0);
__decorate([
    Input()
], TypeFilterComponent.prototype, "facets", void 0);
__decorate([
    Input()
], TypeFilterComponent.prototype, "selected", void 0);
__decorate([
    Output()
], TypeFilterComponent.prototype, "onEvent", void 0);
TypeFilterComponent = __decorate([
    Component({
        selector: 'gp-type-filter',
        template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Type\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a class=\"m-facet\" (click)=\"clear()\" [ngClass]=\"{active:!hasSelections()}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square':!hasSelections(), 'fa-square t-fg--gray-xlt':hasSelections()}\">\n            </span>\n            Any Type\n        </a>\n        <div class=\"m-facet\" *ngFor=\"let option of choices; let $index=index\"\n            (click)=\"toggle(option.value)\"\n            [ngClass]=\"{active:isSelected(option.value),'is-hidden':$index>visibleAmount}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square':isSelected(option.value),'fa-square':!isSelected(option.value)}\">\n            </span>\n            <span class=\"icon-{{option.label.toLowerCase().replace(' ','')}} is-themed\"></span>\n            {{option.label}}\n            <span class=\"badge badge-secondary\">{{getCount(option.value)}}</span>\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    })
], TypeFilterComponent);

let ModifiedFilterComponent = class ModifiedFilterComponent {
    constructor() {
        this.key = QueryParameters.MODIFIED;
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.format = 'MMM dd yyyy';
        this.debouncePromise = null;
        this.lastModifiedOptions = [
            { value: "Before", before: true },
            { value: "After", before: false }
        ];
        this.lastModifiedDir = this.lastModifiedOptions[1];
    }
    ngOnInit() {
    }
    onKeyUp($event) {
        let text = $event.target.value;
        this.onValueChange(text);
    }
    onValueChange(value) {
        let change = {};
        if (this.lastModifiedDir.before) {
            change[QueryParameters.MODIFIED_BEFORE] = value;
            change[QueryParameters.MODIFIED_AFTER] = null;
        }
        else {
            change[QueryParameters.MODIFIED_BEFORE] = null;
            change[QueryParameters.MODIFIED_AFTER] = value;
        }
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
    onDirChange() {
        this.onValueChange(this.value);
    }
    clear() {
        if (this.value) {
            this.value = null;
            this.onValueChange(this.value);
        }
        else {
            this.isCollapsed = true;
        }
    }
};
__decorate([
    Input()
], ModifiedFilterComponent.prototype, "key", void 0);
__decorate([
    Input()
], ModifiedFilterComponent.prototype, "value", void 0);
__decorate([
    Output()
], ModifiedFilterComponent.prototype, "onEvent", void 0);
ModifiedFilterComponent = __decorate([
    Component({
        selector: 'gp-modified-filter',
        template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Modified Date\n    </div>\n\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <div *ngIf=\"isCollapsed\" class=\"m-facet active\">\n            <span *ngIf=\"value\">{{lastModifiedDir.value}} {{value}}</span>\n            <span *ngIf=\"!value\">No date specified</span>\n        </div>\n\n        <div class=\"m-facet  d-flex flex-justify-between flex-align-stretch\">\n\n            <select class=\"form-control flex-1 u-mg-right--md\"\n                ([ngModel])=\"lastModifiedDir\"\n                (change)=\"onDirChange()\"\n                aria-label=\"Select before or after modification date constraint\">\n                <option *ngFor=\"let opt of lastModifiedOptions\" [value]=\"opt\">{{opt.value}}</option>\n            </select>\n\n            <div class=\"flex-2 input-group-slick\">\n                <!-- <span class=\"fas fa-calendar\"\n                    title=\"Open date picker to select a date\"\n                    (click)=\"toggle($event)\">\n                </span> -->\n                <input type=\"text\" class=\"form-control\"\n                    placeholder=\"Specify modified date\"\n                    aria-label=\"Specify modified date\"\n                    ([ngModel])=\"value\"\n                    (change)=\"onValueChange(value)\" />\n                <span class=\"fas fa-times\" title=\"Clear value\"\n                    *ngIf=\"value\" (click)=\"clear()\">\n                </span>\n            </div>\n        </div>\n\n    </div>\n</div>\n",
        styles: [""]
    })
], ModifiedFilterComponent);

let trackingServiceInst;
function TrackingServiceFactory(rpm) {
    if (!trackingServiceInst) {
        trackingServiceInst = new TrackingService({ provider: rpm });
    }
    return trackingServiceInst;
}

const ɵ0 = RPMServiceFactory(), ɵ1 = TrackingServiceFactory;
let GeoPlatformCommonModule = class GeoPlatformCommonModule {
};
GeoPlatformCommonModule = __decorate([
    NgModule({
        imports: [
            RouterModule,
            CommonModule,
            FormsModule,
            MatInputModule, MatButtonModule, MatIconModule, MatDialogModule,
            NgbModule,
        ],
        exports: [
            ListSelectDialog,
            MessageDialog,
            ImageFallbackDirective, ThumbnailComponent,
            SelectedItemsComponent,
            ResourceLinkComponent,
            LoginButtonComponent, LoginModalComponent,
            HeaderComponent,
            ArrayedItemsPipe,
            LimitToPipe,
            SortByPipe,
            FriendlyTypePipe,
            FixLabelPipe,
            GeoPlatformIconDirective,
            CommunityFilterComponent,
            CreatedByFilterComponent,
            KeywordFilterComponent,
            PublisherFilterComponent,
            SchemeFilterComponent,
            SemanticFilterComponent, SemanticFilterDialog,
            ServiceTypeFilterComponent,
            SimilarityFilterComponent,
            ThemeFilterComponent,
            TopicFilterComponent,
            TypeFilterComponent,
            ModifiedFilterComponent
        ],
        declarations: [
            ListSelectDialog,
            MessageDialog,
            ImageFallbackDirective, ThumbnailComponent,
            SelectedItemsComponent,
            ResourceLinkComponent,
            LoginButtonComponent, LoginModalComponent,
            HeaderComponent,
            ArrayedItemsPipe,
            LimitToPipe,
            SortByPipe,
            FriendlyTypePipe,
            FixLabelPipe,
            GeoPlatformIconDirective,
            CommunityFilterComponent,
            CreatedByFilterComponent,
            KeywordFilterComponent,
            PublisherFilterComponent,
            SchemeFilterComponent,
            SemanticFilterComponent, SemanticFilterDialog,
            ServiceTypeFilterComponent,
            SimilarityFilterComponent,
            ThemeFilterComponent,
            TopicFilterComponent,
            TypeFilterComponent,
            ModifiedFilterComponent
        ],
        providers: [
            AppAuthService,
            ErrorResolver,
            ItemResolver,
            NewItemResolver,
            VersionResolver,
            GeoPlatformErrorService,
            ItemHelper,
            SearchService,
            // {
            //     provide: RPMStatsService,
            //     useFactory: RPMStatsServiceFactory,
            //     deps: [ HttpClient ]
            // },
            {
                provide: RPMService,
                useValue: ɵ0
            },
            {
                provide: TrackingService,
                useFactory: ɵ1,
                deps: [RPMService]
            }
        ],
        entryComponents: [
            ListSelectDialog,
            MessageDialog
        ]
    })
], GeoPlatformCommonModule);

/*
    Version of the library exposed to consumers.
    Long-term this value should be auto-set to be whatever is set in package.json
 */
const GeoPlatformCommonVersion = "1.0.0";
// import Polyfills from "./shared/polyfills";
// Polyfills();
const DefaultSortOptions = [
    { value: "_score,desc", label: "Relevance" },
    { value: "modified,desc", label: "Most Recently Modified" },
    { value: "modified,asc", label: "Least Recently Modified" },
    { value: "label,asc", label: "Title [A-Z]" },
    { value: "label,desc", label: "Title [Z-A]" },
    { value: "reliability,asc", label: "Reliability" }
];

/**
 * Generated bundle index. Do not edit.
 */

export { AppAuthService, ArrayedItemsPipe, AuthenticatedComponent, CommunityFilterComponent, CreatedByFilterComponent, DefaultSortOptions, ErrorResolver, EventTypes, FixLabelPipe, FriendlyTypePipe, GeoPlatformCommonModule, GeoPlatformCommonVersion, GeoPlatformError, GeoPlatformErrorService, GeoPlatformIconDirective, HeaderComponent, ImageFallbackDirective, ItemFactory, ItemFilterComponent, ItemHelper, ItemResolver, KeywordFilterComponent, LimitToPipe, ListSelectDialog, LoginButtonComponent, LoginModalComponent, MapTypes, MessageDialog, ModifiedFilterComponent, NewItemResolver, PublisherFilterComponent, ResourceLinkComponent, SchemeFilterComponent, SearchEvent, SearchService, SelectedItemsComponent, SemanticFilterComponent, SemanticFilterDialog, ServiceTypeFilterComponent, SimilarityFilterComponent, SortByPipe, ThemeFilterComponent, ThumbnailComponent, TopicFilterComponent, TrackingServiceFactory, TypeFilterComponent, VersionResolver, authServiceFactory, logger, ɵ0, ɵ1, ListSelectDialog as ɵa, MessageDialog as ɵb, ImageFallbackDirective as ɵc, ThumbnailComponent as ɵd, SelectedItemsComponent as ɵe, ResourceLinkComponent as ɵf, LoginButtonComponent as ɵg, LoginModalComponent as ɵh, HeaderComponent as ɵi, GeoPlatformIconDirective as ɵj, CommunityFilterComponent as ɵk, CreatedByFilterComponent as ɵl, KeywordFilterComponent as ɵm, PublisherFilterComponent as ɵn, SchemeFilterComponent as ɵo, SemanticFilterComponent as ɵp, SemanticFilterDialog as ɵq, ServiceTypeFilterComponent as ɵr, SimilarityFilterComponent as ɵs, ThemeFilterComponent as ɵt, TopicFilterComponent as ɵu, TypeFilterComponent as ɵv, ModifiedFilterComponent as ɵw, AppAuthService as ɵx, SearchService as ɵy };
//# sourceMappingURL=geoplatform-common.js.map
