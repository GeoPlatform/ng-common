import { __decorate, __param, __extends } from 'tslib';
import { Inject, Injectable, Component, HostBinding, ElementRef, Input, Directive, EventEmitter, Output, Pipe, NgModule } from '@angular/core';
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

var EDIT_ROLE = 'gp_editor';
/**
 * Base class that can be used to hook authentication notifications into
 * Angular @Component instances.
 */
var AuthenticatedComponent = /** @class */ (function () {
    function AuthenticatedComponent(authService) {
        this.authService = authService;
    }
    //facade methods to mimic @Component lifecycle methods in case sub-classes
    // want to use consistent names
    AuthenticatedComponent.prototype.ngOnInit = function () { this.init(); };
    AuthenticatedComponent.prototype.ngOnDestroy = function () { this.destroy(); };
    /**
     * Sub-classes must invoke this method in order to register listeners
     * for authentication events
     */
    AuthenticatedComponent.prototype.init = function () {
        var _this = this;
        var obs = {
            next: function (value) {
                console.log("AuthenticatedComponent : User changed to " + (value ? value.username : 'null'));
                _this.user = value;
                _this.onUserChange(_this.user);
            },
            error: function (err) {
                console.log("Unable to get authenticated user info: " +
                    err.message);
            },
            complete: function () { }
        };
        this.gpAuthSubscription = this.authService.subscribe(obs);
    };
    /**
     * Sub-classes must invoke this method in order to de-register listeners
     * for authentication events and clean up internals
     */
    AuthenticatedComponent.prototype.destroy = function () {
        if (this.gpAuthSubscription) {
            this.gpAuthSubscription.unsubscribe();
            this.gpAuthSubscription = null;
        }
        this.user = null;
        this.authService = null;
    };
    /** @return {boolean} */
    AuthenticatedComponent.prototype.isAuthenticated = function () { return !!this.user; };
    /** @return {GeoPlatformUser} */
    AuthenticatedComponent.prototype.getUser = function () { return this.user; };
    /** @return {string} JWT token associated with the current user or null */
    AuthenticatedComponent.prototype.getAuthToken = function () { return this.authService.getToken(); };
    /** @return Promise containing current user or null */
    AuthenticatedComponent.prototype.checkAuth = function () { return this.authService.check(); };
    /**
     * @param item - optional object the user may be able to edit
     * @return boolean indicating whether user can edit the requested item or is an editor if no item was specified
     */
    AuthenticatedComponent.prototype.canUserEdit = function (item) {
        if (!this.user)
            return false;
        if (this.user.isAuthorized(EDIT_ROLE))
            return true;
        return this.isAuthorOf(item);
    };
    /**
     * @param item - object the user may be the owner of
     * @return boolean indicating if the user is the associated creator/owner of the item
     */
    AuthenticatedComponent.prototype.isAuthorOf = function (item) {
        if (!this.user || !item)
            return false;
        return item.createdBy && item.createdBy === this.user.username;
    };
    /**
     * @param {GeoPlatformUser} user - authenticated user object or null if not authed
     */
    AuthenticatedComponent.prototype.onUserChange = function (user) { };
    return AuthenticatedComponent;
}());

;
var AUTH_KEYS = [
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
    var authSettings = {};
    var gpGlobal = window.GeoPlatform;
    if (gpGlobal && gpGlobal.config && gpGlobal.config.auth) {
        //auth library settings made available through WP via 'GeoPlatform' global
        //https://geoplatform.atlassian.net/browse/DT-2307
        authSettings = gpGlobal.config.auth;
    }
    else {
        authSettings.APP_BASE_URL = environment.wpUrl || '';
        AUTH_KEYS.forEach(function (key) {
            var v = environment[key];
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

var AppAuthService = /** @class */ (function () {
    function AppAuthService(rpm) {
        this.observers = {};
        this.authService = authServiceFactory(Config);
        this.rpm = rpm;
        this.init();
    }
    AppAuthService.prototype.init = function () {
        var _this = this;
        this.user$ = new Subject();
        if (!this.authService)
            return;
        var sub = this.authService.getMessenger().raw();
        this.gpAuthSubscription = sub.subscribe(function (msg) {
            // console.log("Received Auth Message: " + msg.name);
            switch (msg.name) {
                case 'userAuthenticated':
                    _this.onUserChange(msg.user);
                    break;
                case 'userSignOut':
                    _this.onUserChange(null);
                    break;
            }
        });
        this.authService.getUser().then(function (user) { _this.onUserChange(user); });
    };
    AppAuthService.prototype.onUserChange = function (user) {
        console.log("AuthService.onUserChange() : User is " + (user ? user.username : 'N/A'));
        this.user = user;
        // this.rpm.setUserId( user ? user.id : null);
        this.user$.next(user);
    };
    /**
     *
     */
    AppAuthService.prototype.getMessenger = function () {
        return this.authService ? this.authService.getMessenger().raw() : null;
    };
    AppAuthService.prototype.isAuthenticated = function () {
        return !!this.user;
    };
    AppAuthService.prototype.getUser = function () {
        return this.user;
    };
    AppAuthService.prototype.getToken = function () {
        return this.authService ? this.authService.getJWT() : null;
    };
    /**
     * Check the underlying authentication mechanism endpoint to validate the
     * current JWT token (if one exists) is not expired or revoked.
     * @return GeoPlatformUser or null
     */
    AppAuthService.prototype.check = function () {
        var _this = this;
        if (!this.authService)
            return Promise.resolve(null);
        return this.authService.checkWithClient()
            .then(function (token) { return _this.authService.getUser(); })
            .then(function (user) {
            setTimeout(function () { _this.onUserChange(user); }, 100);
            return user;
        });
    };
    AppAuthService.prototype.login = function () {
        this.authService.login();
    };
    AppAuthService.prototype.logout = function () {
        this.authService.logout();
    };
    /**
     *
     */
    AppAuthService.prototype.subscribe = function (callback) {
        return this.user$.subscribe(callback);
    };
    AppAuthService.prototype.dispose = function () {
        if (this.gpAuthSubscription) {
            this.gpAuthSubscription.unsubscribe();
            this.gpAuthSubscription = null;
        }
        this.user = null;
        this.user$ = null;
        this.observers = null;
        this.authService = null;
    };
    AppAuthService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [RPMService,] }] }
    ]; };
    AppAuthService = __decorate([
        Injectable(),
        __param(0, Inject(RPMService))
    ], AppAuthService);
    return AppAuthService;
}());

var LoginButtonComponent = /** @class */ (function (_super) {
    __extends(LoginButtonComponent, _super);
    function LoginButtonComponent(authService) {
        var _this = _super.call(this, authService) || this;
        _this.idpBaseUrl = Config.IDP_BASE_URL || 'https://accounts.geoplatform.gov';
        _this.user = null;
        return _this;
    }
    LoginButtonComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        // this.authService.check();
    };
    LoginButtonComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    LoginButtonComponent.prototype.onUserChange = function (user) {
        _super.prototype.onUserChange.call(this, user);
        console.log("LoginButton.onUserChange() : User is " + (user ? user.username : 'null'));
        this.user = user;
    };
    LoginButtonComponent.prototype.login = function () {
        this.authService.login();
    };
    LoginButtonComponent.prototype.logout = function () {
        this.authService.logout();
    };
    LoginButtonComponent.ctorParameters = function () { return [
        { type: AppAuthService }
    ]; };
    LoginButtonComponent = __decorate([
        Component({
            selector: 'gp-login-button',
            template: "\n    <div class=\"btn-account btn-group\">\n        <!-- not logged in yet -->\n        <a class=\"btn-login btn btn-link\" (click)=\"login()\" *ngIf=\"!user\">Sign In</a>\n\n        <!-- logged in -->\n        <button type=\"button\" class=\"btn-login btn btn-link dropdown-toggle\" data-toggle=\"dropdown\"\n            aria-expanded=\"false\" *ngIf=\"user\">\n            <span class=\"fas fa-user\"></span>\n            <span class=\"d-xs-none\">{{user?.name}}</span>\n            <span class=\"caret\"></span>\n        </button>\n        <div class=\"dropdown-menu dropdown-menu-right\" role=\"menu\" *ngIf=\"user\">\n            <div class=\"o-account-details\">\n                <div class=\"o-account-details__avatar\">\n                    <span class=\"fas fa-user\"></span>\n                </div>\n                <div class=\"flex-1\">\n                    <div class=\"a-heading\">\n                        {{user?.name}}\n                        <small><em>({{user?.username}})</em></small>\n                    </div>\n                    <div class=\"u-text--sm\">{{user?.email}}</div>\n                    <div class=\"u-text--sm\">{{user?.org}}</div>\n                </div>\n            </div>\n            <div class=\"d-flex flex-justify-around u-mg-top--sm\">\n                <a class=\"btn btn-sm btn-link\" target=\"_blank\" href=\"{{idpBaseUrl}}/profile\">\n                    <span class=\"fas fa-pencil-alt\"></span> Edit Profile\n                </a>\n                <a class=\"btn btn-sm btn-link\" target=\"_blank\" href=\"{{idpBaseUrl}}/updatepw\">\n                    <span class=\"fas fa-key\"></span> Change Password\n                </a>\n            </div>\n            <div class=\"u-mg-top--sm\">\n                <a class=\"btn-logout btn btn-light btn-block\" (click)=\"logout()\">\n                    <span class=\"fas fa-power-off\"></span> Sign Out\n                </a>\n            </div>\n        </div>\n    </div>\n    ",
            styles: ["\n        .btn-login.btn-link {\n            padding: .375em .75em;\n            border-right: none;\n            margin: 0 0.5em;\n            font-weight: 700;\n        }\n        .btn-login.btn-link:hover {\n            background-color: #fff;\n            text-decoration: none;\n            color: #333;\n        }\n        .o-account-details {\n            display: flex;\n            justify-content: space-between;\n            align-items: stretch;\n            margin-top: -0.5em;\n            padding: 1em;\n            background: #185b8a;\n            color: #fff;\n        }\n        .o-account-details__avatar {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            font-size: 6em;\n            margin-right: 0.25em;\n            padding-top: 10px;\n            width: 100px;\n            height: 100px;\n            overflow: hidden;\n            background: #fff;\n            color: #777;\n            border-radius: 100%;\n        }\n        .dropdown-menu .btn.btn-link {\n            display: inline-block;\n            padding: 0.375rem 0.75rem;\n            border-right: none;\n        }\n        .dropdown-menu .btn.btn-link:after {\n            content: '';\n        }\n        .btn.btn-logout {\n            padding: 0.375rem 0.75rem;\n            margin-bottom: -0.5em;\n        }\n        "]
        })
    ], LoginButtonComponent);
    return LoginButtonComponent;
}(AuthenticatedComponent));
var LoginModalComponent = /** @class */ (function () {
    function LoginModalComponent(authService) {
        this.authService = authService;
        this.showLoginModal = false;
        this.forceLogin = Config.FORCE_LOGIN;
    }
    LoginModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.authService)
            return;
        this.authService.getMessenger().subscribe(function (msg) {
            // console.log("Received Auth Message: " + msg.name);
            switch (msg.name) {
                case 'auth:requireLogin':
                    _this.showLoginModal = true; //show the modal
                    break;
                case 'userAuthenticated':
                case 'iframe:userAuthenticated':
                    _this.showLoginModal = false; //hide the modal
                    _this.authService.onUserChange(msg.user);
                    break;
            }
        });
    };
    LoginModalComponent.prototype.ngOnDestroy = function () {
        this.showLoginModal = false;
    };
    LoginModalComponent.prototype.cancel = function () {
        //hide the modal
        this.showLoginModal = false;
    };
    LoginModalComponent.ctorParameters = function () { return [
        { type: AppAuthService }
    ]; };
    LoginModalComponent = __decorate([
        Component({
            selector: 'gp-login-modal',
            template: "<div class=\"gpLoginCover\" *ngIf=\"showLoginModal\">\n    <button class=\"btn btn-danger gpLoginCancelIframe pull-right\" *ngIf=\"!forceLogin\" (click)=\"cancel()\">\n        <span class=\"fas fa-times-circle\"></span> Cancel\n    </button>\n    <div class=\"gpLoginWindow\" *ngIf=\"showLoginModal\">\n        <iframe id=\"gpLoginIFrame\" src=\"/login?redirect_url=${encodeURIComponent(`${window.location.origin}/auth/loading?cachebuster=${(new Date()).getTime()}`)}&cachebuster=${(new Date()).getTime()}\"></iframe>\n    </div>\n</div>\n",
            styles: ["\n        .gpLoginCover {\n            position: absolute;\n            top: 0;\n            left: 0;\n            bottom: 0;\n            right: 0;\n            background: rgba(0,0,0,0.6);\n            z-index: 5000;\n            width: 100vw;\n            height: 100vh;\n        }\n\n        .gpLoginCancelIframe {\n          z-index: 5001;\n          position: absolute;\n          right: 0px;\n        }\n\n        .gpLoginWindow {\n          top: 100px;\n          height: 60%;\n          width: 75%;\n          margin: 0 auto;\n          position: relative;\n          z-index: 5001;\n        \tborder: 5px solid #cccccc;\n          border-radius: 10px;\n        }\n\n        .gpLoginWindow iframe {\n          width: 100%;\n          height: 100%\n        }\n\n        .gpLoginWindow .btn-cancel {\n          color: white;\n          background-color: red;\n        }\n\n        .gpLoginWindow .btn {\n          display: inline-block;\n          padding: 6px 12px;\n          margin-bottom: 0;\n          font-size: 14px;\n          font-weight: 400;\n          line-height: 1.42857143;\n          text-align: center;\n          white-space: nowrap;\n          vertical-align: middle;\n          -ms-touch-action: manipulation;\n          touch-action: manipulation;\n          cursor: pointer;\n          -webkit-user-select: none;\n          -moz-user-select: none;\n          -ms-user-select: none;\n          user-select: none;\n          background-image: none;\n          border: 1px solid transparent;\n          border-radius: 4px;\n        }\n    "]
        })
    ], LoginModalComponent);
    return LoginModalComponent;
}());

var ListSelectDialog = /** @class */ (function () {
    function ListSelectDialog(dialogRef, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        //pagination
        this.currentPage = 0;
        this.totalSuggested = 0;
        this.subject = new Subject();
        this.query = data.query.clone().page(this.currentPage).pageSize(12);
        this.subject.pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(function (term) {
            _this.filterValues(term);
        });
    }
    ListSelectDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ListSelectDialog.prototype.onTermChange = function (term, immediate) {
        if (true === immediate) { //if needing to update without debounce
            this.filterValues(term);
        }
        else { //otherwise, debounce change
            this.subject.next(term);
        }
    };
    /**
     * @param {string} value - user input to filter options with
     * @return {Promise} resolving array of string options
     */
    ListSelectDialog.prototype.filterValues = function (value) {
        var _this = this;
        this.termQuery = value;
        if (!value) { //require user to provide input before searching
            this.suggested = [];
            this.totalSuggested = 0;
            return;
        }
        this.query.q(value);
        this.isLoading = true;
        this.data.service.search(this.query)
            .then(function (response) {
            var hits = response.results;
            _this.suggested = hits;
            _this.totalSuggested = response.totalResults;
        })
            .catch(function (e) {
            //display error message indicating an issue searching...
        }).finally(function () {
            _this.isLoading = false;
        });
    };
    ListSelectDialog.prototype.addValue = function (arg) {
        if (this.isSelected(arg)) { //if already selected, remove it
            this.removeValue(arg); //...
            return; //...
        }
        this.data.selected.push(arg);
    };
    ListSelectDialog.prototype.removeValue = function (value) {
        var index = -1;
        this.data.selected.forEach(function (p, i) { if (p.id === value.id) {
            index = i;
        } });
        if (index >= 0) {
            this.data.selected.splice(index, 1);
        }
    };
    ListSelectDialog.prototype.isSelected = function (arg) {
        return this.data.selected.length > 0 &&
            !!this.data.selected.find(function (s) { return s.id === arg.id; });
    };
    /**
     * @param pageNo - new page number being requested
     */
    ListSelectDialog.prototype.onPageChange = function (pageNo) {
        if (this.currentPage !== pageNo - 1) {
            this.query.page(pageNo - 1);
            this.filterValues(this.termQuery);
        }
    };
    ListSelectDialog.prototype.getSubHeading = function (item) {
        var property = this.data.subHeading;
        var value = item[property];
        return this.getLabelFrom(value);
    };
    ListSelectDialog.prototype.getLabelFrom = function (value) {
        var _this = this;
        if (value === null || typeof (value) === 'undefined')
            return '';
        if (Array.isArray(value)) {
            return value.map(function (v) { return _this.getLabelFrom(v); }).join(', ');
        }
        if (typeof (value) === 'object' && (value.label || value.title || value.prefLabel)) {
            return value.label || value.title || value.prefLabel;
        }
        return '';
    };
    ListSelectDialog.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    ListSelectDialog = __decorate([
        Component({
            selector: 'gp-list-select-dialog',
            template: "<h5 mat-dialog-title>Find Items to Select</h5>\n<div mat-dialog-content>\n    <mat-form-field appearance=\"outline\">\n        <mat-label>\n            <mat-icon><span class=\"fas fa-search\"></span></mat-icon>\n            Search\n        </mat-label>\n        <input matInput\n            [(ngModel)]=\"termQuery\" (ngModelChange)=\"onTermChange($event)\"\n            placeholder=\"Enter keywords to find recommended values\">\n        <span matSuffix *ngIf=\"termQuery?.length\" (click)=\"onTermChange(null, true)\"\n            class=\"fas fa-times t-fg--gray-md\">\n        </span>\n    </mat-form-field>\n\n    <div class=\"d-flex flex-justify-between flex-align-stretch\">\n\n        <div style=\"flex: 1 0 49%; margin-right: 1%;\">\n            <div class=\"a-heading\">\n                Recommendations ({{totalSuggested||0}})\n                <span *ngIf=\"isLoading\" class=\"fas fa-spinner fa-spin\"></span>\n            </div>\n            <div class=\"m-list-section\">\n                <div class=\"list-group\">\n                    <em *ngIf=\"!suggested?.length\">Enter keywords above to receive suggested values to use.</em>\n                    <div *ngFor=\"let item of suggested\" class=\"list-group-item\"\n                        (click)=\"addValue(item)\" [ngClass]=\"{'active':isSelected(item)}\">\n                        <a>\n                            <span gpIcon [item]=\"item\"></span>\n                            {{item.label||item.title||item.prefLabel}}\n                        </a>\n                        <div *ngIf=\"data.subHeading\" class=\"u-text--sm t-fg--gray-md\">\n                            {{getSubHeading(item)}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"u-text--sm  u-mg-top--md\" *ngIf=\"totalSuggested>0\">\n                <ngb-pagination [collectionSize]=\"totalSuggested\"\n                    [pageSize]=\"12\" [maxSize]=\"2\" [size]=\"'sm'\"\n                    [rotate]=\"true\" [(page)]=\"currentPage\"\n                    (pageChange)=\"onPageChange($event)\">\n                </ngb-pagination>\n            </div>\n        </div>\n        <div style=\"flex: 1 0 50%\">\n            <div class=\"a-heading\">Selected ({{data?.selected?.length||0}})</div>\n            <div class=\"m-list-section\">\n                <div class=\"list-group\">\n                    <em *ngIf=\"!data.selected?.length\">No values selected.</em>\n                    <div *ngFor=\"let item of data?.selected\" class=\"list-group-item\">\n                        <span class=\"fas fa-times t-fg--danger\" (click)=\"removeValue(item)\"></span>&nbsp;\n                        <a>\n                            <span gpIcon [item]=\"item\"></span>\n                            {{item.label||item.title||item.prefLabel||\"Untitled Item\"}}\n                        </a>\n                        <div *ngIf=\"data.subHeading\" class=\"u-text--sm t-fg--gray-md\">\n                            {{getSubHeading(item)}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"onNoClick()\">Cancel</button>\n    <button type=\"button\" mat-flat-button color=\"primary\" [mat-dialog-close]=\"data.selected\">Ok</button>\n</div>\n",
            styles: [":host .mat-form-field{width:100%}"]
        }),
        __param(1, Inject(MAT_DIALOG_DATA))
    ], ListSelectDialog);
    return ListSelectDialog;
}());

var MessageDialog = /** @class */ (function () {
    function MessageDialog(dialogRef, data) {
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
    MessageDialog.prototype.close = function () {
        this.dialogRef.close();
    };
    MessageDialog.prototype.getIconClass = function () {
        switch (this.data.type) {
            case 'error': return "fas fa-exclamation-circle";
            case 'warn': return "fas fa-exclamation-triangle";
            case 'info': return 'fas fa-info-circle';
        }
        return '';
    };
    MessageDialog.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
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
    return MessageDialog;
}());

var GeoPlatformIconDirective = /** @class */ (function () {
    function GeoPlatformIconDirective(el) {
        this.el = el;
        this.themed = true;
    }
    GeoPlatformIconDirective.prototype.ngOnInit = function () {
        if (!this.item)
            return;
        var className = this.item.type.toLowerCase().replace(/^[a-z]+\:/, '');
        className = 'icon-' + className;
        if (this.themed) {
            className += " is-themed";
        }
        this.el.nativeElement.className = className;
    };
    GeoPlatformIconDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return GeoPlatformIconDirective;
}());

var ASSETS = [
    ItemTypes.DATASET, ItemTypes.SERVICE, ItemTypes.LAYER, ItemTypes.MAP,
    ItemTypes.GALLERY, ItemTypes.COMMUNITY, ItemTypes.APPLICATION, ItemTypes.TOPIC,
    ItemTypes.WEBSITE
];
var ItemHelper = /** @class */ (function () {
    function ItemHelper() {
    }
    /**
     * @param {any} item - either GP item or string type
     * @return {boolean}
     */
    ItemHelper.isAsset = function (item) {
        if (!item)
            return false;
        var type = null;
        if (typeof (item) === 'string')
            type = item;
        else if (item.type)
            type = item.type;
        return type && ASSETS.indexOf(type) >= 0;
    };
    /**
     * @param {any} item - either GP item or string type
     * @return {string} url of icon for the type
     */
    ItemHelper.getIcon = function (item) {
        var type = "dataset";
        switch (item.type) {
            case ItemTypes.CONTACT:
                type = 'vcard';
                break;
            default: type = item.type.replace(/^[a-z]+\:/i, '').toLowerCase();
        }
        return 'icon-' + type;
    };
    /**
     * @param {any} item - either GP item
     * @return {string} label for the item
     */
    ItemHelper.getLabel = function (item) {
        if (!item || !item.type)
            return 'Unknown type';
        var type = item.type;
        switch (type) {
            case ItemTypes.ORGANIZATION:
                // case ItemTypes.PERSON :
                return item.label || item.name || "Un-titled resource";
            case ItemTypes.CONCEPT:
            case ItemTypes.CONCEPT_SCHEME:
                return item.label || item.prefLabel || "Un-titled resource";
            case ItemTypes.CONTACT:
                var fn = item.fullName || '';
                var pt = item.positionTitle || '';
                var on = item.orgName || '';
                var label = fn + (fn.length ? ' - ' : '') + pt + (pt.length ? ' - ' : '') + on;
                //if none of those fields have been provided, default to email or placeholder
                if (!label.length)
                    label = item.email || 'Untitled Contact';
                return label;
            default: return item.label || item.title || "Un-titled resource";
        }
    };
    /**
     * @param {any} item - either GP item or string type
     * @return {string} label for the item's type
     */
    ItemHelper.getTypeLabel = function (item) {
        if (!item)
            return 'Unknown Resource Type';
        var type = null;
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
    };
    /**
     * @param {any} item - either GP item or string type
     * @return {string} key (plural) for the item's type
     */
    ItemHelper.getTypeKey = function (item) {
        if (!item)
            return null;
        var type = null;
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
    };
    /**
     * @param {string} type - item type
     * @return {string} string path to the type's icon
     */
    ItemHelper.determineIconType = function (type) {
        var name = type.replace(/^[a-z]+\:/i, '').toLowerCase();
        return "/assets/icons/" + name + ".svg";
    };
    ItemHelper.getItemDetailsUrl = function (item) {
        if (!item || !item.type || !item.id)
            return null;
        return Config.portalUrl + '/resources/' + this.getTypeKey(item) + '/' + item.id;
    };
    ItemHelper = __decorate([
        Injectable()
    ], ItemHelper);
    return ItemHelper;
}());

var ResourceLinkComponent = /** @class */ (function () {
    function ResourceLinkComponent() {
        this.external = false; //open link in new window/tab
    }
    ResourceLinkComponent.prototype.ngOnInit = function () {
    };
    ResourceLinkComponent.prototype.hasIcon = function () {
        // return this.icon !== null && this.icon !== undefined;
        return true;
    };
    ResourceLinkComponent.prototype.getIcon = function () {
        return ItemHelper.getIcon(this.item);
    };
    ResourceLinkComponent.prototype.getLabel = function () {
        return ItemHelper.getLabel(this.item);
    };
    ResourceLinkComponent.prototype.getType = function () {
        return ItemHelper.getTypeKey(this.item);
    };
    ResourceLinkComponent.prototype.getIconClass = function () {
        var type = ItemHelper.getTypeLabel(this.item);
        if ("Contact" === type)
            type = 'vcard';
        if ("Product" === type)
            type = 'imageproduct';
        return 'icon-' + type.toLowerCase();
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
    return ResourceLinkComponent;
}());

var SelectedItemsComponent = /** @class */ (function () {
    function SelectedItemsComponent() {
        this.onEvent = new EventEmitter();
    }
    SelectedItemsComponent.prototype.ngOnInit = function () {
    };
    SelectedItemsComponent.prototype.ngOnChanges = function (changes) {
    };
    SelectedItemsComponent.prototype.clear = function () {
        this.onEvent.emit({ name: 'selected:clear' });
    };
    SelectedItemsComponent.prototype.remove = function (item) {
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
    return SelectedItemsComponent;
}());

var ImageFallbackDirective = /** @class */ (function () {
    function ImageFallbackDirective() {
        this.fallback = "/assets/img-404.png";
    }
    ImageFallbackDirective.prototype.onImgError = function () { this.src = this.fallback; };
    ImageFallbackDirective.prototype.onImgLoad = function () { this.className = 'is-image-loaded'; };
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
    return ImageFallbackDirective;
}());
var ThumbnailComponent = /** @class */ (function () {
    function ThumbnailComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ThumbnailComponent.prototype.ngOnInit = function () {
    };
    ThumbnailComponent.prototype.getThumbnailUrl = function () {
        if (this.item.thumbnail && this.item.thumbnail.url)
            return this.item.thumbnail.url;
        return Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
    };
    ThumbnailComponent.prototype.getBackgroundImage = function () {
        if (!this.item || !this.item.thumbnail) {
            return this.getFallbackBackgroundImage();
        }
        var thumbnail = this.item.thumbnail;
        var type = thumbnail.mediaType || 'image/png';
        if (thumbnail.contentData) {
            var content = thumbnail.contentData;
            return this.sanitizer.bypassSecurityTrustStyle("url(data:" + type + ";base64," + content + ")");
        }
    };
    ThumbnailComponent.prototype.getFallbackBackgroundImage = function () {
        var url = this.getFallbackUrl();
        return "url(" + url + ")";
    };
    ThumbnailComponent.prototype.isEmpty = function () {
        return !this.item || !this.item.thumbnail ||
            (!this.item.thumbnail.url && !this.item.thumbnail.contentData);
    };
    ThumbnailComponent.prototype.hasURL = function () {
        return this.item.thumbnail && !!this.item.thumbnail.url;
    };
    ThumbnailComponent.prototype.hasContentData = function () {
        return this.item.thumbnail && !!this.item.thumbnail.contentData && !this.item.thumbnail.url;
    };
    ThumbnailComponent.prototype.getFallbackUrl = function () {
        return Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
    };
    ThumbnailComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
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
    return ThumbnailComponent;
}());

/**
 *
 */
var GeoPlatformError = /** @class */ (function (_super) {
    __extends(GeoPlatformError, _super);
    function GeoPlatformError(message, label, code, item) {
        var _this = _super.call(this, message) || this;
        _this.label = label;
        _this.code = code;
        _this.item = item;
        return _this;
    }
    Object.defineProperty(GeoPlatformError.prototype, "label", {
        get: function () { return this._label; },
        set: function (value) { this._label = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeoPlatformError.prototype, "code", {
        get: function () { return this._code; },
        set: function (value) { this._code = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeoPlatformError.prototype, "item", {
        get: function () { return this._item; },
        set: function (value) { this._item = value; },
        enumerable: true,
        configurable: true
    });
    GeoPlatformError.from = function (error) {
        if (error instanceof GeoPlatformError)
            return error;
        var gpe = new GeoPlatformError(error.message);
        gpe.label = "An error occurred";
        gpe.code = 500;
        return gpe;
    };
    return GeoPlatformError;
}(Error));

var GeoPlatformErrorService = /** @class */ (function () {
    function GeoPlatformErrorService() {
        this.updateSubject = new BehaviorSubject(null);
        this.error$ = this.updateSubject.asObservable();
    }
    GeoPlatformErrorService.prototype.setError = function (error) {
        var gpe = GeoPlatformError.from(error);
        this.updateSubject.next(gpe);
    };
    GeoPlatformErrorService = __decorate([
        Injectable()
    ], GeoPlatformErrorService);
    return GeoPlatformErrorService;
}());

var Visibilities = {
    PUBLIC: 'public',
    PRIVATE: 'private'
};
var Statuses = {
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
    var options = Object.assign({
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
    var item = createItem(type, options);
    return item;
}
function createMap() {
    var obj = createAsset(ItemTypes.MAP, {
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
    var services = service ? [service] : [];
    var obj = createAsset(ItemTypes.LAYER, {
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
    var obj = createAsset(ItemTypes.SERVICE, {
        datasets: [],
        serviceType: null,
        href: null
    });
    return obj;
}
function createDataset() {
    var obj = createAsset(ItemTypes.DATASET, { services: [] });
    return obj;
}
function createGallery() {
    var obj = createAsset(ItemTypes.GALLERY, { items: [] });
    return obj;
}
function createCommunity() {
    var obj = createAsset(ItemTypes.COMMUNITY);
    return obj;
}
function createConcept() {
    var obj = createItem(ItemTypes.CONCEPT, { scheme: null });
    return obj;
}
function createConceptScheme() {
    var obj = createItem(ItemTypes.CONCEPT_SCHEME);
    return obj;
}
function createOrg() {
    var obj = createItem(ItemTypes.ORGANIZATION, { subOrgOf: null });
    return obj;
}
function createContact() {
    var obj = createItem(ItemTypes.CONTACT, {
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
var ItemFactory = /** @class */ (function () {
    function ItemFactory() {
    }
    ItemFactory.create = function (type) {
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
    };
    ItemFactory.fix = function (item) {
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
    };
    return ItemFactory;
}());

var MapTypes = {
    GeoPlatform: { label: "GeoPlatform Map", uri: 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap' },
    AGOL: { label: "AGOL Web Map", uri: 'http://www.geoplatform.gov/ont/openmap/AGOLMap' },
    WMS: { label: "WMS Map", uri: "http://www.geoplatform.gov/ont/openmap/WMSMap" },
    MapBox: { label: "Map Box Map", uri: 'http://www.geoplatform.gov/ont/openmap/MapBoxMap' }
};

var ArrayedItemsPipe = /** @class */ (function () {
    function ArrayedItemsPipe() {
    }
    ArrayedItemsPipe.prototype.transform = function (value, property, num) {
        var max = isNaN(num) || num > value.length ? value.length : num;
        return value.slice(0, max).map(function (v) { return v[property]; }).join(' ');
    };
    ArrayedItemsPipe = __decorate([
        Pipe({ name: 'arrayedItems' })
    ], ArrayedItemsPipe);
    return ArrayedItemsPipe;
}());
/*
 * Limits an array of entries to a maximum number
 * Usage:
 *   array | limitTo:num
 * Example:
 *   {{ ['one','two','three'] | limitTo:2 }}
 */
var LimitToPipe = /** @class */ (function () {
    function LimitToPipe() {
    }
    LimitToPipe.prototype.transform = function (value, num, start) {
        if (value && value.length > num) {
            var st = isNaN(start) ? 0 : start;
            if (st > 0)
                num += st;
            console.log("Slicing from " + st + " to " + num);
            return value.slice(st, num);
        }
        return value;
    };
    LimitToPipe = __decorate([
        Pipe({ name: 'limitTo' })
    ], LimitToPipe);
    return LimitToPipe;
}());
/*
 *
 * Usage:
 *   array | sortBy : property
 * Example:
 *   {{ ['one','two','three'] | limitTo:2 }}
 */
var SortByPipe = /** @class */ (function () {
    function SortByPipe() {
    }
    SortByPipe.prototype.transform = function (value, property) {
        return value.sort(function (a, b) {
            return a[property] > b[property] ? -1 : 1;
        });
    };
    SortByPipe = __decorate([
        Pipe({ name: 'sortBy' })
    ], SortByPipe);
    return SortByPipe;
}());
/*
 * Formats a GeoPlatform Item's type to a friendly label
 * Usage:
 *   type | friendlyType
 * Example:
 *   {{ "dcat:Dataset" | friendlyType }}
 *   formats to: "Dataset"
*/
var FriendlyTypePipe = /** @class */ (function () {
    function FriendlyTypePipe() {
    }
    FriendlyTypePipe.prototype.transform = function (value) {
        if (!value || typeof (value) !== 'string' || value.length === 0)
            return value;
        var name = value;
        var idx = value.indexOf(":");
        if (~idx)
            name = value.substring(idx + 1);
        if ('VCard' === name)
            name = 'Contact';
        return name;
    };
    FriendlyTypePipe = __decorate([
        Pipe({ name: 'friendlyType' })
    ], FriendlyTypePipe);
    return FriendlyTypePipe;
}());
/*
 * Replaces underscores between words with spaces
 * Usage:
 *   type | fixLabel
 * Example:
 *   {{ "One_Two_Three" | fixLabel }}
 *   formats to: "One Two Three"
*/
var FixLabelPipe = /** @class */ (function () {
    function FixLabelPipe() {
    }
    FixLabelPipe.prototype.transform = function (value) {
        if (!value || typeof (value) !== 'string' || !value.length)
            return 'Untitled';
        var result = value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").trim();
        return result.charAt(0).toUpperCase() + result.slice(1);
    };
    FixLabelPipe = __decorate([
        Pipe({ name: 'fixLabel' })
    ], FixLabelPipe);
    return FixLabelPipe;
}());

var ItemResolver = /** @class */ (function () {
    function ItemResolver(service, trackingService) {
        this.service = service;
        this.trackingService = trackingService;
    }
    ItemResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var id = route.paramMap.get('id');
        var opts = {};
        var version = route.paramMap.get("version");
        if (version)
            opts.version = version;
        return this.service.get(id, opts)
            .then(function (item) {
            if (_this.trackingService) {
                var event_1 = TrackingEventFactory(TrackingTypes.VIEWED, item);
                _this.trackingService.logEvent(event_1);
            }
            return item;
        })
            .catch(function (e) { return of(e); });
    };
    ItemResolver.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [TrackingService,] }] }
    ]; };
    ItemResolver = __decorate([
        Injectable( /*{ providedIn: 'root' }*/),
        __param(0, Inject(ItemService)),
        __param(1, Inject(TrackingService))
    ], ItemResolver);
    return ItemResolver;
}());
var VersionResolver = /** @class */ (function () {
    function VersionResolver() {
    }
    VersionResolver.prototype.resolve = function (route, state) {
        var version = route.paramMap.get("version");
        return Promise.resolve(version || null);
    };
    VersionResolver = __decorate([
        Injectable( /*{ providedIn: 'root' }*/)
    ], VersionResolver);
    return VersionResolver;
}());
var NewItemResolver = /** @class */ (function () {
    function NewItemResolver(router) {
        this.router = router;
    }
    NewItemResolver.prototype.resolve = function (route, state) {
        var type = route.params.type;
        var item = ItemFactory.create(type);
        if (!item) {
            var gpe = new GeoPlatformError("Type " + type + " is unsupported", "Unsupported Type", 400);
            // this.errorService.setError(gpe);
            this.router.navigateByUrl('error', { skipLocationChange: false });
            return empty();
        }
        else {
            return of(item);
        }
    };
    NewItemResolver.ctorParameters = function () { return [
        { type: Router }
    ]; };
    NewItemResolver = __decorate([
        Injectable()
    ], NewItemResolver);
    return NewItemResolver;
}());
var ErrorResolver = /** @class */ (function () {
    function ErrorResolver(router) {
        this.router = router;
    }
    ErrorResolver.prototype.resolve = function (route, state) {
        var type = route.params.type;
        var msg = "An error has occurred";
        if ("unsupported" === type)
            msg = "Type " + type + " is not supported";
        else if ("404" === type)
            msg = "Item not found";
        var error = new Error(msg);
        // error.error = "Unsupported Type";
        return of(error);
    };
    ErrorResolver.ctorParameters = function () { return [
        { type: Router }
    ]; };
    ErrorResolver = __decorate([
        Injectable()
    ], ErrorResolver);
    return ErrorResolver;
}());

var trackingServiceInst;
function TrackingServiceFactory(rpm) {
    if (!trackingServiceInst) {
        trackingServiceInst = new TrackingService({ provider: rpm });
    }
    return trackingServiceInst;
}
var ɵ0 = RPMServiceFactory();
var GeoPlatformCommonModule = /** @class */ (function () {
    function GeoPlatformCommonModule() {
    }
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
    return GeoPlatformCommonModule;
}());

/*
    Version of the library exposed to consumers.
    Long-term this value should be auto-set to be whatever is set in package.json
 */
var GeoPlatformCommonVersion = "1.0.0";

/**
 * Generated bundle index. Do not edit.
 */

export { AppAuthService, ArrayedItemsPipe, AuthenticatedComponent, ErrorResolver, FixLabelPipe, FriendlyTypePipe, GeoPlatformCommonModule, GeoPlatformCommonVersion, GeoPlatformError, GeoPlatformErrorService, GeoPlatformIconDirective, ImageFallbackDirective, ItemFactory, ItemHelper, ItemResolver, LimitToPipe, ListSelectDialog, LoginButtonComponent, LoginModalComponent, MapTypes, MessageDialog, NewItemResolver, ResourceLinkComponent, SelectedItemsComponent, SortByPipe, ThumbnailComponent, TrackingServiceFactory, VersionResolver, authServiceFactory, ɵ0, ListSelectDialog as ɵa, MessageDialog as ɵb, ImageFallbackDirective as ɵc, ThumbnailComponent as ɵd, SelectedItemsComponent as ɵe, ResourceLinkComponent as ɵf, LoginButtonComponent as ɵg, LoginModalComponent as ɵh, GeoPlatformIconDirective as ɵi, AppAuthService as ɵj };
//# sourceMappingURL=geoplatform-common.js.map
