import { __decorate, __param } from 'tslib';
import { Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, HostBinding, ElementRef, Input, Directive, EventEmitter, Output, Pipe, NgModule } from '@angular/core';
import { Subject, BehaviorSubject, of, empty } from 'rxjs';
import { Config, ItemTypes, TrackingEventFactory, TrackingTypes, ItemService, TrackingService } from '@geoplatform/client';
import { RPMService } from '@geoplatform/rpm/src/iRPMService';
import { ngGpoauthFactory } from '@geoplatform/oauth-ng/angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RPMServiceFactory } from '@geoplatform/rpm/dist/js/geoplatform.rpm.browser.js';

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
                console.log("AuthenticatedComponent : User changed to " + (value ? value.username : 'null'));
                this.user = value;
                this.onUserChange(this.user);
            },
            error: (err) => {
                console.log("Unable to get authenticated user info: " +
                    err.message);
            },
            complete: () => { }
        };
        this.gpAuthSubscription = this.authService.subscribe(obs);
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
    // console.log("Configuring OAuth using: ");
    // console.log(authSettings);
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
            // console.log("Received Auth Message: " + msg.name);
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
        console.log("AuthService.onUserChange() : User is " + (user ? user.username : 'N/A'));
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
        console.log("LoginButton.onUserChange() : User is " + (user ? user.username : 'null'));
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
            // console.log("Received Auth Message: " + msg.name);
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
        this.query = data.query.clone().page(this.currentPage).pageSize(12);
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
        template: "<div class=\"o-selected-items\">\n\n    <div class=\"list-group list-group-sm u-text--sm\">\n\n        <div *ngIf=\"!selected || !selected.length\" class=\"list-group-item\">\n            <div class=\"t-fg--gray-md t-text--italic\">Nothing selected</div>\n        </div>\n\n        <div *ngFor=\"let item of selected\"\n            class=\"list-group-item d-flex flex-justify-between flex-align-center\">\n            <div class=\"flex-1\">\n                <span class=\"icon-{{item.type.toLowerCase()}} is-themed\"></span>\n                {{item.label}}\n            </div>\n            <button type=\"button\" class=\"btn btn-link u-mg-left--sm\" (click)=\"remove(item)\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n\n    </div>\n\n    <div class=\"list-group list-group-sm u-text--sm u-mg-top--md\">\n\n        <!-- <div class=\"list-group-item d-flex flex-justify-between flex-align-center\"\n            [ngClass]=\"{'is-faded':!isAuthenticated()||!selected?.length}\">\n\n            <div class=\"flex-1\">\n                <span class=\"icon-gallery\"></span>\n                Add Selected to a Gallery\n            </div>\n            <button type=\"button\" class=\"btn btn-link\"\n                (click))=\"openDialog()\"\n                [disabled]=\"!isAuthenticated()\">\n                <span class=\"gpicons plus-circle t-fg--success\"></span>\n            </button>\n        </div> -->\n\n        <div class=\"list-group-item d-flex flex-justify-between flex-align-center\"\n            [ngClass]=\"{'is-faded':!selected?.length}\"\n            (click)=\"clear()\">\n            <div class=\"flex-1\">Clear Selections</div>\n            <button type=\"button\" class=\"btn btn-link\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n    </div>\n\n</div>\n",
        styles: [""]
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
            console.log("Slicing from " + st + " to " + num);
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

let trackingServiceInst;
function TrackingServiceFactory(rpm) {
    if (!trackingServiceInst) {
        trackingServiceInst = new TrackingService({ provider: rpm });
    }
    return trackingServiceInst;
}
const ɵ0 = RPMServiceFactory();
let GeoPlatformCommonModule = class GeoPlatformCommonModule {
};
GeoPlatformCommonModule = __decorate([
    NgModule({
        imports: [
            RouterModule,
            CommonModule,
            FormsModule,
            MatInputModule, MatButtonModule, MatIconModule, MatDialogModule,
            NgbModule
        ],
        exports: [
            ListSelectDialog,
            MessageDialog,
            ImageFallbackDirective, ThumbnailComponent,
            SelectedItemsComponent,
            ResourceLinkComponent,
            LoginButtonComponent, LoginModalComponent,
            ArrayedItemsPipe,
            LimitToPipe,
            SortByPipe,
            FriendlyTypePipe,
            FixLabelPipe,
            GeoPlatformIconDirective
        ],
        declarations: [
            ListSelectDialog,
            MessageDialog,
            ImageFallbackDirective, ThumbnailComponent,
            SelectedItemsComponent,
            ResourceLinkComponent,
            LoginButtonComponent, LoginModalComponent,
            ArrayedItemsPipe,
            LimitToPipe,
            SortByPipe,
            FriendlyTypePipe,
            FixLabelPipe,
            GeoPlatformIconDirective
        ],
        providers: [
            AppAuthService,
            ErrorResolver,
            ItemResolver,
            NewItemResolver,
            VersionResolver,
            GeoPlatformErrorService,
            ItemHelper,
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
                useFactory: TrackingServiceFactory,
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

/**
 * Generated bundle index. Do not edit.
 */

export { AppAuthService, ArrayedItemsPipe, AuthenticatedComponent, ErrorResolver, FixLabelPipe, FriendlyTypePipe, GeoPlatformCommonModule, GeoPlatformCommonVersion, GeoPlatformError, GeoPlatformErrorService, GeoPlatformIconDirective, ImageFallbackDirective, ItemFactory, ItemHelper, ItemResolver, LimitToPipe, ListSelectDialog, LoginButtonComponent, LoginModalComponent, MapTypes, MessageDialog, NewItemResolver, ResourceLinkComponent, SelectedItemsComponent, SortByPipe, ThumbnailComponent, TrackingServiceFactory, VersionResolver, authServiceFactory, ɵ0, ListSelectDialog as ɵa, MessageDialog as ɵb, ImageFallbackDirective as ɵc, ThumbnailComponent as ɵd, SelectedItemsComponent as ɵe, ResourceLinkComponent as ɵf, LoginButtonComponent as ɵg, LoginModalComponent as ɵh, GeoPlatformIconDirective as ɵi, AppAuthService as ɵj };
//# sourceMappingURL=geoplatform-common.js.map
