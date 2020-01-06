(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@geoplatform/client'), require('@angular/core'), require('rxjs'), require('@geoplatform/rpm/src/iRPMService'), require('@geoplatform/oauth-ng/angular'), require('@angular/material/dialog'), require('rxjs/operators'), require('@angular/platform-browser'), require('@angular/router'), require('@angular/common'), require('@angular/forms'), require('@angular/material'), require('@ng-bootstrap/ng-bootstrap'), require('@geoplatform/rpm/dist/js/geoplatform.rpm.browser.js')) :
    typeof define === 'function' && define.amd ? define('@geoplatform/common', ['exports', '@geoplatform/client', '@angular/core', 'rxjs', '@geoplatform/rpm/src/iRPMService', '@geoplatform/oauth-ng/angular', '@angular/material/dialog', 'rxjs/operators', '@angular/platform-browser', '@angular/router', '@angular/common', '@angular/forms', '@angular/material', '@ng-bootstrap/ng-bootstrap', '@geoplatform/rpm/dist/js/geoplatform.rpm.browser.js'], factory) :
    (global = global || self, factory((global.geoplatform = global.geoplatform || {}, global.geoplatform.common = {}), global.geoplatform.client, global.ng.core, global.rxjs, global.RPMService, global.geoplatform['oauth-ng'], global.ng.material.dialog, global.rxjs.operators, global.ng.platformBrowser, global.ng.router, global.ng.common, global.ng.forms, global.ng.material, global.ngBootstrap, global.geoplatform.rpm));
}(this, (function (exports, client, core, rxjs, iRPMService, angular, dialog, operators, platformBrowser, router, common, forms, material, ngBootstrap, geoplatform_rpm_browser_js) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var LEVELS = [
        "error",
        "warn",
        "info",
        "debug"
    ];
    var Logger = /** @class */ (function () {
        function Logger() {
            this.level = 'error';
            this.setLevel(client.Config.logLevel || client.Config.LOG_LEVEL);
        }
        Logger.prototype.setLevel = function (level) {
            if (level && LEVELS.indexOf(level) >= 0) {
                this.level = level;
            }
            this.info("Log Level : " + this.level);
        };
        Logger.prototype.isVisible = function (level) {
            return LEVELS.indexOf(this.level) >= LEVELS.indexOf(level);
        };
        Logger.prototype.log = function (arg) {
            var _this = this;
            var addl = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                addl[_i - 1] = arguments[_i];
            }
            var msg = this.toStr(arg);
            msg += addl.map(function (a) { return _this.toStr(a); }).join('');
            console.log(msg);
        };
        Logger.prototype.debug = function (arg) {
            var addl = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                addl[_i - 1] = arguments[_i];
            }
            if (!this.isVisible('debug'))
                return;
            var msg = "[DEBUG] " + this.toStr(arg);
            this.log.apply(this, __spread([msg], addl));
        };
        Logger.prototype.info = function (arg) {
            var addl = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                addl[_i - 1] = arguments[_i];
            }
            if (!this.isVisible('info'))
                return;
            var msg = "[INFO] " + this.toStr(arg);
            this.log.apply(this, __spread([msg], addl));
        };
        Logger.prototype.warn = function (arg) {
            var addl = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                addl[_i - 1] = arguments[_i];
            }
            if (!this.isVisible('warn'))
                return;
            var msg = "[WARN] " + this.toStr(arg);
            this.log.apply(this, __spread([msg], addl));
        };
        Logger.prototype.error = function (arg) {
            var addl = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                addl[_i - 1] = arguments[_i];
            }
            var msg = "[ERROR] " + this.toStr(arg);
            this.log.apply(this, __spread([msg], addl));
        };
        Logger.prototype.toStr = function (arg) {
            if (null === arg || typeof (arg) === 'undefined')
                return '';
            if (typeof (arg) === 'string')
                return arg;
            return JSON.stringify(arg);
        };
        return Logger;
    }());
    var logger = new Logger();

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
                    logger.debug("AuthenticatedComponent : User changed to " + (value ? value.username : 'null'));
                    _this.user = value;
                    _this.onUserChange(_this.user);
                },
                error: function (err) {
                    logger.error("Unable to get authenticated user info: " +
                        err.message);
                },
                complete: function () { }
            };
            this.gpAuthSubscription = this.authService.subscribe(obs);
            //for components that initialize AFTER a user has changed auth state,
            // we need to fetch the current user details
            this.user = this.authService.getUser();
            this.onUserChange(this.user);
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
        logger.info("Configuring OAuth using: ");
        logger.info(authSettings);
        authService = angular.ngGpoauthFactory(authSettings);
        return authService;
    }
    ;

    var AppAuthService = /** @class */ (function () {
        function AppAuthService(rpm) {
            this.observers = {};
            this.authService = authServiceFactory(client.Config);
            this.rpm = rpm;
            this.init();
        }
        AppAuthService.prototype.init = function () {
            var _this = this;
            this.user$ = new rxjs.Subject();
            if (!this.authService)
                return;
            var sub = this.authService.getMessenger().raw();
            this.gpAuthSubscription = sub.subscribe(function (msg) {
                logger.debug("Received Auth Message: " + msg.name);
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
            logger.debug("AuthService.onUserChange() : User is " + (user ? user.username : 'N/A'));
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
            { type: undefined, decorators: [{ type: core.Inject, args: [iRPMService.RPMService,] }] }
        ]; };
        AppAuthService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AppAuthService_Factory() { return new AppAuthService(core.ɵɵinject(iRPMService.RPMService)); }, token: AppAuthService, providedIn: "root" });
        AppAuthService = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(0, core.Inject(iRPMService.RPMService))
        ], AppAuthService);
        return AppAuthService;
    }());

    var LoginButtonComponent = /** @class */ (function (_super) {
        __extends(LoginButtonComponent, _super);
        function LoginButtonComponent(authService) {
            var _this = _super.call(this, authService) || this;
            _this.idpBaseUrl = client.Config.IDP_BASE_URL || 'https://accounts.geoplatform.gov';
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
            logger.debug("LoginButton.onUserChange() : User is " + (user ? user.username : 'null'));
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
            core.Component({
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
            this.forceLogin = client.Config.FORCE_LOGIN;
        }
        LoginModalComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (!this.authService)
                return;
            this.authService.getMessenger().subscribe(function (msg) {
                logger.debug("LoginModal received auth message: " + msg.name);
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
            core.Component({
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
            this.subject = new rxjs.Subject();
            this.query = data.query.clone().page(this.currentPage);
            this.subject.pipe(operators.debounceTime(300), operators.distinctUntilChanged())
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
            { type: dialog.MatDialogRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
        ]; };
        ListSelectDialog = __decorate([
            core.Component({
                selector: 'gp-list-select-dialog',
                template: "<h5 mat-dialog-title>Find Items to Select</h5>\n<div mat-dialog-content>\n    <mat-form-field appearance=\"outline\">\n        <mat-label>\n            <mat-icon><span class=\"fas fa-search\"></span></mat-icon>\n            Search\n        </mat-label>\n        <input matInput\n            [(ngModel)]=\"termQuery\" (ngModelChange)=\"onTermChange($event)\"\n            placeholder=\"Enter keywords to find recommended values\">\n        <span matSuffix *ngIf=\"termQuery?.length\" (click)=\"onTermChange(null, true)\"\n            class=\"fas fa-times t-fg--gray-md\">\n        </span>\n    </mat-form-field>\n\n    <div class=\"d-flex flex-justify-between flex-align-stretch\">\n\n        <div style=\"flex: 1 0 49%; margin-right: 1%;\">\n            <div class=\"a-heading\">\n                Recommendations ({{totalSuggested||0}})\n                <span *ngIf=\"isLoading\" class=\"fas fa-spinner fa-spin\"></span>\n            </div>\n            <div class=\"m-list-section\">\n                <div class=\"list-group\">\n                    <em *ngIf=\"!suggested?.length\">Enter keywords above to receive suggested values to use.</em>\n                    <div *ngFor=\"let item of suggested\" class=\"list-group-item\"\n                        (click)=\"addValue(item)\" [ngClass]=\"{'active':isSelected(item)}\">\n                        <a>\n                            <span gpIcon [item]=\"item\"></span>\n                            {{item.label||item.title||item.prefLabel}}\n                        </a>\n                        <div *ngIf=\"data.subHeading\" class=\"u-text--sm t-fg--gray-md\">\n                            {{getSubHeading(item)}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"u-text--sm  u-mg-top--md\" *ngIf=\"totalSuggested>0\">\n                <ngb-pagination [collectionSize]=\"totalSuggested\"\n                    [pageSize]=\"12\" [maxSize]=\"2\" [size]=\"'sm'\"\n                    [rotate]=\"true\" [(page)]=\"currentPage\"\n                    (pageChange)=\"onPageChange($event)\">\n                </ngb-pagination>\n            </div>\n        </div>\n        <div style=\"flex: 1 0 50%\">\n            <div class=\"a-heading\">Selected ({{data?.selected?.length||0}})</div>\n            <div class=\"m-list-section\">\n                <div class=\"list-group\">\n                    <em *ngIf=\"!data.selected?.length\">No values selected.</em>\n                    <div *ngFor=\"let item of data?.selected\" class=\"list-group-item\">\n                        <span class=\"fas fa-times t-fg--danger\" (click)=\"removeValue(item)\"></span>&nbsp;\n                        <a>\n                            <span gpIcon [item]=\"item\"></span>\n                            {{item.label||item.title||item.prefLabel||\"Untitled Item\"}}\n                        </a>\n                        <div *ngIf=\"data.subHeading\" class=\"u-text--sm t-fg--gray-md\">\n                            {{getSubHeading(item)}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"onNoClick()\">Cancel</button>\n    <button type=\"button\" mat-flat-button color=\"primary\" [mat-dialog-close]=\"data.selected\">Ok</button>\n</div>\n",
                styles: [":host .mat-form-field{width:100%}"]
            }),
            __param(1, core.Inject(dialog.MAT_DIALOG_DATA))
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
            { type: dialog.MatDialogRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
        ]; };
        __decorate([
            core.HostBinding('class')
        ], MessageDialog.prototype, "className", void 0);
        MessageDialog = __decorate([
            core.Component({
                selector: 'gp-message-dialog',
                template: "<div class=\"a-heading\" mat-dialog-title>\n    <span [attr.class]=\"getIconClass()\"></span>\n    {{data.label || \"Message\"}}\n</div>\n<div mat-dialog-content>\n    {{data.message}}\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"close()\">Dismiss</button>\n</div>\n",
                styles: [":host.danger .mat-dialog-title{color:#d53c37}:host.warning .mat-dialog-title{color:#b35d29}:host.info .mat-dialog-title{color:#007fa4}"]
            }),
            __param(1, core.Inject(dialog.MAT_DIALOG_DATA))
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
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], GeoPlatformIconDirective.prototype, "item", void 0);
        __decorate([
            core.Input()
        ], GeoPlatformIconDirective.prototype, "themed", void 0);
        GeoPlatformIconDirective = __decorate([
            core.Directive({
                selector: '[gpIcon]'
            })
        ], GeoPlatformIconDirective);
        return GeoPlatformIconDirective;
    }());

    var HeaderComponent = /** @class */ (function () {
        function HeaderComponent() {
            this.appName = "Application";
            this.class = 'o-header';
            this.portalUrl = client.Config.portalUrl || 'https://www.geoplatform.gov';
        }
        __decorate([
            core.Input()
        ], HeaderComponent.prototype, "appName", void 0);
        __decorate([
            core.HostBinding('class')
        ], HeaderComponent.prototype, "class", void 0);
        HeaderComponent = __decorate([
            core.Component({
                selector: 'gp-app-header',
                template: "<div class=\"o-header__primary\" role=\"banner\">\n    <h1 class=\"a-brand\">\n        <a href=\"{{portalUrl}}\">\n            <img src=\"/assets/favicon.png\" style=\"vertical-align:top;\">\n            GeoPlatform.gov\n        </a>\n        &nbsp;\n        {{appName}}\n    </h1>\n    <nav class=\"a-nav\" role=\"navigation\" aria-label=\"top-level navigation links\">\n        <ng-content select=\"[menu]\"></ng-content>\n        <gp-login-button role=\"menuitem\">Sign In</gp-login-button>\n    </nav>\n</div>\n",
                styles: [".o-header .o-header__primary{padding:1em 1.5em}.o-header .o-header__primary .a-nav a{font-weight:700;border-right:none;padding:.375em .75em}.o-header .o-header__primary .a-nav a.active{border-bottom:1px solid #185b8a}"]
            })
        ], HeaderComponent);
        return HeaderComponent;
    }());

    var ASSETS = [
        client.ItemTypes.DATASET, client.ItemTypes.SERVICE, client.ItemTypes.LAYER, client.ItemTypes.MAP,
        client.ItemTypes.GALLERY, client.ItemTypes.COMMUNITY, client.ItemTypes.APPLICATION, client.ItemTypes.TOPIC,
        client.ItemTypes.WEBSITE
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
                case client.ItemTypes.CONTACT:
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
                case client.ItemTypes.ORGANIZATION:
                    // case ItemTypes.PERSON :
                    return item.label || item.name || "Un-titled resource";
                case client.ItemTypes.CONCEPT:
                case client.ItemTypes.CONCEPT_SCHEME:
                    return item.label || item.prefLabel || "Un-titled resource";
                case client.ItemTypes.CONTACT:
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
                case client.ItemTypes.DATASET:
                case client.ItemTypes.SERVICE:
                // case ItemTypes.PERSON :
                case client.ItemTypes.ORGANIZATION:
                case client.ItemTypes.CONCEPT:
                    return type.replace(/^[a-z]+\:/i, '');
                case client.ItemTypes.CONCEPT_SCHEME: return "Concept Scheme";
                case client.ItemTypes.WEBSITE: return "Website";
                case client.ItemTypes.CONTACT: return "Contact";
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
                case client.ItemTypes.GALLERY: return 'galleries';
                case client.ItemTypes.COMMUNITY: return 'communities';
                //different name
                case client.ItemTypes.CONTACT: return 'contacts'; //instead of "vcards"
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
            return client.Config.portalUrl + '/resources/' + this.getTypeKey(item) + '/' + item.id;
        };
        ItemHelper = __decorate([
            core.Injectable()
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
            core.Input()
        ], ResourceLinkComponent.prototype, "item", void 0);
        __decorate([
            core.Input()
        ], ResourceLinkComponent.prototype, "icon", void 0);
        __decorate([
            core.Input()
        ], ResourceLinkComponent.prototype, "external", void 0);
        ResourceLinkComponent = __decorate([
            core.Component({
                selector: 'gp-resource-link',
                template: "<a routerLink=\"/view/{{item?.id}}\">\n    <span *ngIf=\"hasIcon()\" class=\"a-icon {{getIconClass()}}\"></span>\n    {{getLabel()}}\n</a>\n",
                styles: [""]
            })
        ], ResourceLinkComponent);
        return ResourceLinkComponent;
    }());

    var SelectedItemsComponent = /** @class */ (function () {
        function SelectedItemsComponent() {
            this.onEvent = new core.EventEmitter();
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
            core.Input()
        ], SelectedItemsComponent.prototype, "selected", void 0);
        __decorate([
            core.Output()
        ], SelectedItemsComponent.prototype, "onEvent", void 0);
        SelectedItemsComponent = __decorate([
            core.Component({
                selector: 'gp-selected-items',
                template: "<div class=\"o-selected-items\">\n\n    <div class=\"list-group list-group-sm u-text--sm\">\n\n        <div *ngIf=\"!selected || !selected.length\" class=\"list-group-item\">\n            <div class=\"t-fg--gray-md t-text--italic\">Nothing selected</div>\n        </div>\n\n        <div *ngFor=\"let item of selected\"\n            class=\"list-group-item d-flex flex-justify-between flex-align-center\">\n            <div class=\"flex-1\">\n                <span class=\"icon-{{item.type.toLowerCase()}} is-themed\"></span>\n                {{item.label}}\n            </div>\n            <button type=\"button\" class=\"btn btn-link u-mg-left--sm\" (click)=\"remove(item)\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n\n    </div>\n\n    <div class=\"list-group list-group-sm u-text--sm u-mg-top--md\">\n\n        <ng-content select=\"[actions]\"></ng-content>\n\n        <div class=\"list-group-item d-flex flex-justify-between flex-align-center\"\n            [ngClass]=\"{'is-faded':!selected?.length}\"\n            (click)=\"clear()\">\n            <div class=\"flex-1\">Clear Selections</div>\n            <button type=\"button\" class=\"btn btn-link\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n    </div>\n\n</div>\n",
                styles: [".o-selected-items{padding:1em}"]
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
            core.Input()
        ], ImageFallbackDirective.prototype, "src", void 0);
        __decorate([
            core.Input()
        ], ImageFallbackDirective.prototype, "fallback", void 0);
        __decorate([
            core.HostBinding('class')
        ], ImageFallbackDirective.prototype, "className", void 0);
        ImageFallbackDirective = __decorate([
            core.Directive({
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
            return client.Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
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
            return client.Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
        };
        ThumbnailComponent.ctorParameters = function () { return [
            { type: platformBrowser.DomSanitizer }
        ]; };
        __decorate([
            core.Input()
        ], ThumbnailComponent.prototype, "item", void 0);
        ThumbnailComponent = __decorate([
            core.Component({
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
            this.updateSubject = new rxjs.BehaviorSubject(null);
            this.error$ = this.updateSubject.asObservable();
        }
        GeoPlatformErrorService.prototype.setError = function (error) {
            var gpe = GeoPlatformError.from(error);
            this.updateSubject.next(gpe);
        };
        GeoPlatformErrorService = __decorate([
            core.Injectable()
        ], GeoPlatformErrorService);
        return GeoPlatformErrorService;
    }());

    /**
     *
     */
    var EventTypes = {
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
    var SearchEvent = /** @class */ (function () {
        function SearchEvent(type, options) {
            this.options = {};
            this.type = type;
            if (options) {
                Object.assign(this.options, options);
            }
        }
        SearchEvent.prototype.getType = function () { return this.type; };
        SearchEvent.prototype.getOptions = function () { return this.options; };
        return SearchEvent;
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
        var obj = createAsset(client.ItemTypes.MAP, {
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
        var obj = createAsset(client.ItemTypes.LAYER, {
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
        var obj = createAsset(client.ItemTypes.SERVICE, {
            datasets: [],
            serviceType: null,
            href: null
        });
        return obj;
    }
    function createDataset() {
        var obj = createAsset(client.ItemTypes.DATASET, { services: [] });
        return obj;
    }
    function createGallery() {
        var obj = createAsset(client.ItemTypes.GALLERY, { items: [] });
        return obj;
    }
    function createCommunity() {
        var obj = createAsset(client.ItemTypes.COMMUNITY);
        return obj;
    }
    function createConcept() {
        var obj = createItem(client.ItemTypes.CONCEPT, { scheme: null });
        return obj;
    }
    function createConceptScheme() {
        var obj = createItem(client.ItemTypes.CONCEPT_SCHEME);
        return obj;
    }
    function createOrg() {
        var obj = createItem(client.ItemTypes.ORGANIZATION, { subOrgOf: null });
        return obj;
    }
    function createContact() {
        var obj = createItem(client.ItemTypes.CONTACT, {
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
                case client.ItemTypes.MAP: return createMap();
                case client.ItemTypes.LAYER: return createLayer();
                case client.ItemTypes.SERVICE: return createService();
                case client.ItemTypes.DATASET: return createDataset();
                case client.ItemTypes.GALLERY: return createGallery();
                case client.ItemTypes.COMMUNITY: return createCommunity();
                case client.ItemTypes.CONCEPT: return createConcept();
                case client.ItemTypes.CONCEPT_SCHEME: return createConceptScheme();
                case client.ItemTypes.ORGANIZATION: return createOrg();
                case client.ItemTypes.CONTACT: return createContact();
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
            core.Pipe({ name: 'arrayedItems' })
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
                return value.slice(st, num);
            }
            return value;
        };
        LimitToPipe = __decorate([
            core.Pipe({ name: 'limitTo' })
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
            core.Pipe({ name: 'sortBy' })
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
            core.Pipe({ name: 'friendlyType' })
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
            core.Pipe({ name: 'fixLabel' })
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
                    var event_1 = client.TrackingEventFactory(client.TrackingTypes.VIEWED, item);
                    _this.trackingService.logEvent(event_1);
                }
                return item;
            })
                .catch(function (e) { return rxjs.of(e); });
        };
        ItemResolver.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [client.ItemService,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [client.TrackingService,] }] }
        ]; };
        ItemResolver = __decorate([
            core.Injectable( /*{ providedIn: 'root' }*/),
            __param(0, core.Inject(client.ItemService)),
            __param(1, core.Inject(client.TrackingService))
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
            core.Injectable( /*{ providedIn: 'root' }*/)
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
                return rxjs.empty();
            }
            else {
                return rxjs.of(item);
            }
        };
        NewItemResolver.ctorParameters = function () { return [
            { type: router.Router }
        ]; };
        NewItemResolver = __decorate([
            core.Injectable()
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
            return rxjs.of(error);
        };
        ErrorResolver.ctorParameters = function () { return [
            { type: router.Router }
        ]; };
        ErrorResolver = __decorate([
            core.Injectable()
        ], ErrorResolver);
        return ErrorResolver;
    }());

    /**
     *
     */
    var SearchService = /** @class */ (function () {
        function SearchService(service) {
            this.service = service;
            this.selected = [];
            this.subject = new rxjs.Subject();
            this.subject$ = this.subject.asObservable();
        }
        SearchService.prototype.setQuery = function (query) {
            this.query = query ? query.clone() : new client.Query();
            this.subject.next({ query: this.query.clone() });
        };
        SearchService.prototype.getQuery = function () {
            return this.query.clone();
        };
        SearchService.prototype.getResults = function () {
            return this.results;
        };
        SearchService.prototype.search = function (query) {
            var _this = this;
            //if a query was provided, store it and use it
            if (query)
                this.setQuery(query);
            this.service.search(this.query)
                .then(function (response) {
                logger.debug('SearchService.search() - ' + response.totalResults + " results found");
                _this.results = response;
                _this.subject.next({ results: response });
            })
                .catch(function (error) {
                logger.error(error.message);
            });
        };
        /**
         * @param item - item or array of item selected from search results
         * @param asBaseLayer - boolean indicating how to select the layer
         */
        SearchService.prototype.select = function (item) {
            var _this = this;
            if (Array.isArray(item)) { //multiple selections
                item.forEach(function (it) { return _this._toggleItem(it, false); });
                this.subject.next({ selected: this.selected });
                return;
            }
            this._toggleItem(item, true);
        };
        /**
         *
         */
        SearchService.prototype._toggleItem = function (item, fireEvent) {
            var _this = this;
            if (!item || !item.id)
                return;
            var position = this.selected.findIndex(function (s) { return s.id === item.id; });
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
                .then(function (fullItem) {
                _this.selected.push(fullItem);
                _this.selected.sort(function (a, b) { return a.label > b.label ? 1 : -1; });
                if (fireEvent)
                    _this.subject.next({ selected: _this.selected });
            })
                .catch(function (e) {
                logger.error("SearchService.select() - " +
                    "Error encountered fetching selected item's details: " + e.message);
            });
        };
        /**
         * @param item Item
         * @return boolean
         */
        SearchService.prototype.isSelected = function (item) {
            return this.selected.length &&
                item && item.id &&
                this.selected.findIndex(function (it) { return it.id === item.id; }) >= 0;
        };
        /**
         *
         */
        SearchService.prototype.hasSelected = function () {
            return this.selected && this.selected.length > 0;
        };
        /**
         * @return Item[]
         */
        SearchService.prototype.getSelected = function () {
            return this.selected;
        };
        SearchService.prototype.clearSelected = function () {
            this.selected = [];
            this.subject.next({ selected: this.selected });
        };
        SearchService.prototype.subscribe = function (listener) {
            var obs = {
                next: function (value) {
                    if (typeof (value) === 'undefined' || value === null)
                        return;
                    if (value.query)
                        listener.onQueryChange(value.query);
                    if (value.results)
                        listener.onResultsChange(value.results);
                    if (value.selected)
                        listener.onSelectedChange(value.selected);
                },
                error: function (err) {
                    console.log("[ERROR] " + err.message);
                },
                complete: function () { }
            };
            var sub = this.subject$.subscribe(obs);
            if (this.query)
                this.subject.next({ query: this.query.clone() });
            if (this.results)
                this.subject.next({ results: this.results });
            if (this.selected)
                this.subject.next({ selected: this.selected });
            return sub;
        };
        SearchService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [client.ItemService,] }] }
        ]; };
        SearchService = __decorate([
            core.Injectable(),
            __param(0, core.Inject(client.ItemService))
        ], SearchService);
        return SearchService;
    }());

    var ItemFilterComponent = /** @class */ (function () {
        function ItemFilterComponent(service, types, label, dialog) {
            this.service = service;
            this.types = types;
            this.filterLabel = "Item";
            this.isCollapsed = true;
            this.filterLabel = label;
            if (dialog)
                this.dialog = dialog;
        }
        ItemFilterComponent.prototype.ngOnInit = function () {
            this.selected = [];
            this.initQuery();
            // this.fetchResults();
        };
        ItemFilterComponent.prototype.ngOnDestroy = function () {
            this.selected = null;
            this.choices = null;
            this.service = null;
            this.query = null;
            this.types = null;
        };
        ItemFilterComponent.prototype.openDialog = function () {
            var _this = this;
            var opts = this.getDialogOptions();
            var dialogRef = this.dialog.open(ListSelectDialog, opts);
            dialogRef.afterClosed().subscribe(function (results) {
                if (results && results.length) {
                    _this.selected = _this.selected.concat(results);
                    var key = _this.getKey();
                    var change = {};
                    change[key] = _this.selected.map(function (s) { return s.id; });
                    change[client.QueryParameters.PAGE] = 0;
                    var event_1 = new SearchEvent(EventTypes.QUERY, change);
                    _this.notify(event_1);
                }
            });
        };
        /**
         * @return configuration options for the material dialog used to select new values
         */
        ItemFilterComponent.prototype.getDialogOptions = function () {
            return {
                width: '50%',
                data: {
                    service: this.service,
                    query: this.query,
                    selected: []
                }
            };
        };
        ItemFilterComponent.prototype.isSupported = function () {
            return true;
        };
        /**
         *
         */
        ItemFilterComponent.prototype.initQuery = function () {
            this.query = new client.Query().fields([]).facets([]).types(this.types);
        };
        ItemFilterComponent.prototype.hasSelections = function () {
            return this.selected && this.selected.length > 0;
        };
        ItemFilterComponent.prototype.isSelected = function (arg) {
            // let id = this.getChoiceId(arg);
            return arg && this.selected.findIndex(function (s) { return s.id === arg.id; }) > -1;
        };
        /**
         * @param arg - item or identifier
         */
        ItemFilterComponent.prototype.toggle = function (arg) {
            if (!arg)
                return;
            // let id = this.getChoiceId(arg);
            // if(id === null) return;
            var idx = this.selected.findIndex(function (s) { return s.id === arg.id; });
            if (idx < 0)
                this.selected.push(arg);
            else
                this.selected.splice(idx, 1);
            var key = this.getKey();
            var change = {};
            change[key] = this.selected.map(function (s) { return s.id; });
            change[client.QueryParameters.PAGE] = 0;
            var event = new SearchEvent(EventTypes.QUERY, change);
            this.notify(event);
        };
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
        ItemFilterComponent.prototype.clear = function () {
            if (this.hasSelections()) {
                this.selected = [];
                var key = this.getKey();
                var change = {};
                change[key] = [];
                change[client.QueryParameters.PAGE] = 0;
                var event_2 = new SearchEvent(EventTypes.QUERY, change);
                this.notify(event_2);
            }
            else {
                this.isCollapsed = !this.isCollapsed;
            }
        };
        ItemFilterComponent = __decorate([
            __param(0, core.Inject(client.ItemService)),
            __param(3, core.Inject(dialog.MatDialog))
        ], ItemFilterComponent);
        return ItemFilterComponent;
    }());

    var CommunityFilterComponent = /** @class */ (function (_super) {
        __extends(CommunityFilterComponent, _super);
        function CommunityFilterComponent(service, dialog) {
            var _this = _super.call(this, service, client.ItemTypes.COMMUNITY, "Communities", dialog) || this;
            _this.key = client.QueryParameters.USED_BY_ID;
            _this.onEvent = new core.EventEmitter();
            return _this;
        }
        CommunityFilterComponent.prototype.getKey = function () {
            return this.key;
        };
        CommunityFilterComponent.prototype.notify = function (event) {
            this.onEvent.emit(event);
        };
        CommunityFilterComponent.prototype.initQuery = function () {
            _super.prototype.initQuery.call(this);
            // this.query.fields(['subOrganizationOf']);
        };
        CommunityFilterComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [client.ItemService,] }] },
            { type: dialog.MatDialog }
        ]; };
        __decorate([
            core.Input()
        ], CommunityFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Output()
        ], CommunityFilterComponent.prototype, "onEvent", void 0);
        CommunityFilterComponent = __decorate([
            core.Component({
                selector: 'gp-community-filter',
                template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
                styles: [""]
            }),
            __param(0, core.Inject(client.ItemService))
        ], CommunityFilterComponent);
        return CommunityFilterComponent;
    }(ItemFilterComponent));

    ;
    var CreatedByFilterComponent = /** @class */ (function (_super) {
        __extends(CreatedByFilterComponent, _super);
        function CreatedByFilterComponent(authService, service) {
            var _this = _super.call(this, authService) || this;
            _this.service = service;
            _this.key = client.QueryParameters.QUERY;
            _this.onEvent = new core.EventEmitter();
            _this.typeaheadValue = null;
            _this.isCollapsed = true;
            _this.pagination = { page: 0, size: 10 };
            _this.values = [];
            _this.pagedValues = [];
            _this.visibleAmount = 10;
            return _this;
        }
        CreatedByFilterComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this.selected = null;
            this.fetchValues();
        };
        CreatedByFilterComponent.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this.values = null;
            this.pagedValues = null;
            this.pagination = null;
            this.selected = null;
            this.outsideSelection = null;
        };
        CreatedByFilterComponent.prototype.notify = function () {
            var key = this.key;
            var change = {};
            change[key] = this.selected;
            change[client.QueryParameters.PAGE] = 0;
            var event = new SearchEvent(EventTypes.QUERY, change);
            this.onEvent.emit(event);
        };
        CreatedByFilterComponent.prototype.hasSelections = function () {
            return this.selected && this.selected.length > 0;
        };
        CreatedByFilterComponent.prototype.isSelected = function (arg) {
            return this.hasSelections() && this.getIndexOf(arg) >= 0;
        };
        CreatedByFilterComponent.prototype.getIndexOf = function (arg) {
            if (!this.selected || !this.selected.length)
                return -1;
            return this.selected.indexOf(arg);
        };
        /**
         * @param arg - item or identifier
         */
        CreatedByFilterComponent.prototype.toggle = function (arg) {
            if (this.selected && this.selected === arg)
                this.selected = null;
            else
                this.selected = arg;
            this.notify();
        };
        CreatedByFilterComponent.prototype.clear = function () {
            if (this.hasSelections()) {
                this.selected = null;
                this.notify();
            }
            else if (this.isCollapsed) {
                this.isCollapsed = false;
            }
        };
        CreatedByFilterComponent.prototype.fetchValues = function () {
            var _this = this;
            var query = new client.Query().pageSize(1)
                .facets(client.QueryFacets.CREATED_BY)
                .parameter('includeFacet._createdBy.size', 1000); //TODO not use Registry name
            this.service.search(query)
                .then(function (response) {
                var facet = response.facets.find(function (facet) { return facet.name === 'createdBy'; });
                if (!facet)
                    _this.values = [];
                else {
                    _this.values = (facet.buckets || []).map(function (bucket) {
                        // Awaiting DT-1092 resolution
                        return {
                            id: bucket.label,
                            label: bucket.label,
                            count: bucket.count
                        };
                    });
                }
            })
                .catch(function (e) { _this.values = []; })
                .finally(function () {
                _this.updatePagedValues();
            });
        };
        /**
         *
         */
        CreatedByFilterComponent.prototype.nextPage = function () {
            var numPages = Math.ceil(this.values.length / this.pagination.size);
            this.pagination.page = Math.min(numPages - 1, this.pagination.page + 1);
            this.updatePagedValues();
        };
        /**
         *
         */
        CreatedByFilterComponent.prototype.prevPage = function () {
            this.pagination.page = Math.max(0, this.pagination.page - 1);
            this.updatePagedValues();
        };
        /**
         * @param resetStart boolean indicating to reset pagination start
         */
        CreatedByFilterComponent.prototype.updatePagedValues = function (resetStart) {
            var _this = this;
            if (resetStart)
                this.pagination.page = 0;
            var values = this.values;
            if (this.typeaheadValue && this.typeaheadValue.length) {
                values = values.filter(function (v) { return v.label.indexOf(_this.typeaheadValue) >= 0; });
            }
            if (values.length < this.pagination.size) {
                this.pagination.page = 0; //reset current page
                this.pagedValues = values;
                console.log("Paged Values: " + JSON.stringify(this.pagedValues));
            }
            var start = this.pagination.page * this.pagination.size;
            var end = Math.min(start + this.pagination.size, values.length);
            this.pagedValues = values.slice(start, end);
            this.checkForOutsideSelections();
        };
        /**
         *
         */
        CreatedByFilterComponent.prototype.checkForOutsideSelections = function () {
            var selected = this.getSelection();
            if (selected && !this.pagedValues.find(function (v) { return v.id === selected; })) {
                this.outsideSelection = selected;
            }
            else {
                this.outsideSelection = null;
            }
        };
        /**
         *
         */
        CreatedByFilterComponent.prototype.clearTypeAhead = function () {
            this.typeaheadValue = null;
            this.updatePagedValues();
        };
        /**
         *
         */
        CreatedByFilterComponent.prototype.toggleCurrentUser = function () {
            var username = this.getCurrentUserName();
            if (username)
                this.toggle(username);
            else {
                console.log("No user to use to filter");
            }
        };
        CreatedByFilterComponent.prototype.getCurrentUserName = function () {
            if (!this.isAuthenticated())
                return null;
            var user = this.getUser();
            return user ? user.username : null;
        };
        CreatedByFilterComponent.prototype.getSelection = function () {
            // let value = this.service.getCreatedBy();
            // if(Array.isArray(value)) return value.length ? value[0] : null;
            // return value;
            return null;
        };
        CreatedByFilterComponent.ctorParameters = function () { return [
            { type: AppAuthService },
            { type: undefined, decorators: [{ type: core.Inject, args: [client.ItemService,] }] }
        ]; };
        __decorate([
            core.Input()
        ], CreatedByFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Input()
        ], CreatedByFilterComponent.prototype, "selected", void 0);
        __decorate([
            core.Output()
        ], CreatedByFilterComponent.prototype, "onEvent", void 0);
        CreatedByFilterComponent = __decorate([
            core.Component({
                selector: 'gp-createdby-filter',
                template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Creator\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <a class=\"m-facet\" (click)=\"clear()\" [ngClass]=\"{active:!hasSelections()}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square': !hasSelections(), 'fa-square': hasSelections()}\"></span>\n            <span *ngIf=\"!hasSelections()\">Any creator</span>\n            <span *ngIf=\"hasSelections()\">Clear Selections</span>\n        </a>\n\n        <a class=\"m-facet\"\n            *ngIf=\"isAuthenticated() && !isSelected( getCurrentUserName() )\"\n            (click)=\"toggle( getCurrentUserName() )\">\n            <span class=\"fas fa-square t-fg--gray-lt\"></span>\n            Me ({{getCurrentUserName()||\"\"}})\n        </a>\n\n        <div class=\"m-facet\" *ngIf=\"values.length\">\n            <div class=\"input-group-slick\">\n                <span class=\"fas fa-search\"></span>\n                <input type=\"text\" class=\"form-control\" placeholder=\"Find creator by name\"\n                    ([ngModel])=\"typeaheadValue\" (change)=\"updatePagedValues(true)\">\n                <span class=\"fas fa-times\" *ngIf=\"typeaheadValue?.length\" (click)=\"clearTypeAhead()\"></span>\n            </div>\n        </div>\n\n        <div class=\"m-facet d-flex flex-justify-between flex-align-center\" *ngIf=\"values?.length\">\n            <button type=\"button\" class=\"btn btn-xs btn-light\" (click)=\"prevPage()\">\n                <span class=\"fas fa-backward\"></span>\n            </button>\n            <div>\n                showing {{pagedValues?.length||'0'}}\n                <span *ngIf=\"typeaheadValue?.length\">matches</span>\n                of {{values?.length||'0'}} results\n            </div>\n            <button type=\"button\" class=\"btn btn-xs btn-light\" (click)=\"nextPage()\">\n                <span class=\"fas fa-forward\"></span>\n            </button>\n        </div>\n        <div *ngFor=\"let value of pagedValues; let $index = index\" class=\"m-facet\">\n            <a  *ngIf=\"!isAuthenticated() || (value.id !== getCurrentUserName())\"\n                (click)=\"toggle(value.id)\"\n                [ngClass]=\"{active:isSelected(value.id),'is-hidden':$index>visibleAmount}\">\n                <span class=\"u-mg-right--sm far\"\n                    [ngClass]=\"{'fa-check-square': isSelected(value.id), 'fa-square': !isSelected(value.id)}\"></span>\n                <span class=\"u-mg-right--xs far fa-user\"></span>\n                <span>{{value.label}}</span>\n                <span class=\"badge badge-secondary\">{{value.count}}</span>\n            </a>\n        </div>\n        <!-- show selections that are not in the filtered values above -->\n        <hr *ngIf=\"!isCollapsed && outsideSelection\">\n        <a  *ngIf=\"outsideSelection\" class=\"m-facet\"\n            (click)=\"toggle(outsideSelection.id)\">\n            <span class=\"fas fa-check-square\"></span>\n            <span class=\"badge u-text--md t-fg--gray-md\"\n                title=\"This item is selected but not in the filtered values above\">\n                <span class=\"fas fa-info-circle\"></span>\n            </span>\n            <span class=\"u-mg-right--xs far fa-user\"></span>\n            {{outsideSelection}}\n        </a>\n    </div>\n</div>\n",
                styles: [""]
            }),
            __param(1, core.Inject(client.ItemService))
        ], CreatedByFilterComponent);
        return CreatedByFilterComponent;
    }(AuthenticatedComponent));

    var KeywordFilterComponent = /** @class */ (function () {
        function KeywordFilterComponent() {
            this.key = client.QueryParameters.QUERY;
            this.placeholder = "Search GeoPlatform";
            this.onEvent = new core.EventEmitter();
        }
        KeywordFilterComponent.prototype.ngOnInit = function () { };
        KeywordFilterComponent.prototype.onKeyUp = function ($event) {
            var text = $event.target.value;
            this.onValueChange(text);
        };
        KeywordFilterComponent.prototype.onValueChange = function (value) {
            var change = {};
            change[this.key] = value && value.length ? value : null;
            var event = new SearchEvent(EventTypes.QUERY, change);
            this.onEvent.emit(event);
        };
        __decorate([
            core.Input()
        ], KeywordFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Input()
        ], KeywordFilterComponent.prototype, "searchString", void 0);
        __decorate([
            core.Input()
        ], KeywordFilterComponent.prototype, "placeholder", void 0);
        __decorate([
            core.Output()
        ], KeywordFilterComponent.prototype, "onEvent", void 0);
        KeywordFilterComponent = __decorate([
            core.Component({
                selector: 'gp-keywords-filter',
                template: "\n<div class=\"input-group-slick flex-1\">\n    <span class=\"fas fa-search\"></span>\n    <input type=\"text\" class=\"form-control\"\n        placeholder=\"{{placeholder}}\"\n        [(ngModel)]=\"searchString\" (keyup.enter)=\"onKeyUp($event)\">\n    <button type=\"button\" class=\"btn btn-light\" title=\"Clear keywords\"\n        *ngIf=\"searchString?.length\" (click)=\"searchString=null\">\n        <span class=\"fas fa-times\"></span>\n    </button>\n</div>\n\n<button type=\"button\" class=\"btn btn-secondary\"\n    [disabled]=\"!searchString||!searchString.length\"\n    (click)=\"onValueChange(searchString)\"\n    title=\"Search the GeoPlatform\">\n    Search\n</button>\n",
                styles: [":host{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}:host>:last-child{margin-left:1em}"]
            })
        ], KeywordFilterComponent);
        return KeywordFilterComponent;
    }());

    var PublisherFilterComponent = /** @class */ (function (_super) {
        __extends(PublisherFilterComponent, _super);
        function PublisherFilterComponent(service, dialog) {
            var _this = _super.call(this, service, client.ItemTypes.ORGANIZATION, "Publishers", dialog) || this;
            _this.key = client.QueryParameters.PUBLISHERS_ID;
            _this.onEvent = new core.EventEmitter();
            return _this;
        }
        PublisherFilterComponent.prototype.getKey = function () {
            return this.key;
        };
        PublisherFilterComponent.prototype.notify = function (event) {
            this.onEvent.emit(event);
        };
        PublisherFilterComponent.prototype.initQuery = function () {
            _super.prototype.initQuery.call(this);
            this.query.fields(['subOrganizationOf']);
        };
        PublisherFilterComponent.prototype.getDialogOptions = function () {
            var opts = _super.prototype.getDialogOptions.call(this);
            opts.data.subHeading = "subOrganizationOf";
            return opts;
        };
        PublisherFilterComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [client.ItemService,] }] },
            { type: dialog.MatDialog }
        ]; };
        __decorate([
            core.Input()
        ], PublisherFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Output()
        ], PublisherFilterComponent.prototype, "onEvent", void 0);
        PublisherFilterComponent = __decorate([
            core.Component({
                selector: 'gp-publisher-filter',
                template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
                styles: [""]
            }),
            __param(0, core.Inject(client.ItemService))
        ], PublisherFilterComponent);
        return PublisherFilterComponent;
    }(ItemFilterComponent));

    var SchemeFilterComponent = /** @class */ (function (_super) {
        __extends(SchemeFilterComponent, _super);
        function SchemeFilterComponent(service, dialog) {
            var _this = _super.call(this, service, client.ItemTypes.CONCEPT_SCHEME, "Scheme", dialog) || this;
            //the key associated with this filter's selections
            _this.key = client.QueryParameters.SCHEMES_ID;
            //the current set of values
            _this.selected = [];
            _this.onEvent = new core.EventEmitter();
            return _this;
        }
        SchemeFilterComponent.prototype.getKey = function () {
            return this.key;
        };
        SchemeFilterComponent.prototype.notify = function (event) {
            this.onEvent.emit(event);
        };
        SchemeFilterComponent.prototype.isSupported = function () {
            if (this.query) {
                var types = this.query.getTypes();
                return types && types.length && types.indexOf(client.ItemTypes.CONCEPT) >= 0;
            }
            return false;
        };
        SchemeFilterComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [client.ItemService,] }] },
            { type: dialog.MatDialog }
        ]; };
        __decorate([
            core.Input()
        ], SchemeFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Input()
        ], SchemeFilterComponent.prototype, "selected", void 0);
        __decorate([
            core.Input()
        ], SchemeFilterComponent.prototype, "query", void 0);
        __decorate([
            core.Output()
        ], SchemeFilterComponent.prototype, "onEvent", void 0);
        SchemeFilterComponent = __decorate([
            core.Component({
                selector: 'gp-scheme-filter',
                template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
                styles: [""]
            }),
            __param(0, core.Inject(client.ItemService))
        ], SchemeFilterComponent);
        return SchemeFilterComponent;
    }(ItemFilterComponent));

    var SemanticFilterDialog = /** @class */ (function () {
        function SemanticFilterDialog(dialogRef, data) {
            this.dialogRef = dialogRef;
            this.data = data;
            //pagination
            this.currentPage = 0;
            this.totalSuggested = 0;
            this.kgQuery = new client.KGQuery().page(this.currentPage).pageSize(12);
        }
        SemanticFilterDialog.prototype.onNoClick = function () {
            this.dialogRef.close();
        };
        /**
         * @param {string} value - user input to filter options with
         * @return {Promise} resolving array of string options
         */
        SemanticFilterDialog.prototype.filterValues = function (value) {
            var _this = this;
            if (!value) { //require user to provide input before searching
                this.suggested = [];
                this.totalSuggested = 0;
                return;
            }
            this.kgQuery.q(value);
            this.data.service.suggest(this.kgQuery)
                .then(function (response) {
                var hits = response.results;
                // if(current && current.length) {
                //     hits = hits.filter(o => { return current.indexOf(o.uri)<0; });
                // }
                _this.suggested = hits;
                _this.totalSuggested = response.totalResults;
            })
                .catch(function (e) {
                //display error message indicating an issue searching...
            });
        };
        SemanticFilterDialog.prototype.addValue = function (arg) {
            this.data.selected.push(arg);
        };
        SemanticFilterDialog.prototype.removeValue = function (value) {
            var index = -1;
            this.data.selected.forEach(function (p, i) { if (p.uri === value.uri) {
                index = i;
            } });
            if (index >= 0) {
                this.data.selected.splice(index, 1);
            }
        };
        SemanticFilterDialog.prototype.isSelected = function (arg) {
            return this.data.selected.length > 0 &&
                !!this.data.selected.find(function (s) { return s.uri === arg.uri; });
        };
        /**
         * @param pageNo - new page number being requested
         */
        SemanticFilterDialog.prototype.onPageChange = function (pageNo) {
            if (this.currentPage !== pageNo - 1) {
                this.kgQuery.page(pageNo - 1);
                this.filterValues(this.termQuery);
            }
        };
        SemanticFilterDialog.ctorParameters = function () { return [
            { type: dialog.MatDialogRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
        ]; };
        SemanticFilterDialog = __decorate([
            core.Component({
                selector: 'gp-semantic-filter-dialog',
                template: "<h5 mat-dialog-title>Search for Concepts to Constraining Search Results</h5>\n<div mat-dialog-content>\n    <mat-form-field appearance=\"outline\">\n        <mat-label>\n            <mat-icon><span class=\"fas fa-search\"></span></mat-icon>\n            Search\n        </mat-label>\n        <input matInput [(ngModel)]=\"termQuery\" (ngModelChange)=\"filterValues($event)\"\n            placeholder=\"Enter keywords to find recommended concepts\">\n        <span matSuffix *ngIf=\"termQuery?.length\" (click)=\"termQuery=null\"\n            class=\"fas fa-times t-fg--gray-md\">\n        </span>\n    </mat-form-field>\n\n    <div class=\"a-heading d-flex flex-justify-between flex-align-center u-mg-bottom--md\">\n        Recommendations ({{totalSuggested||0}})\n        <div class=\"u-text--sm\" *ngIf=\"totalSuggested>0\">\n            <ngb-pagination [collectionSize]=\"totalSuggested\"\n                [pageSize]=\"12\" [maxSize]=\"2\" [size]=\"'sm'\"\n                [rotate]=\"true\" [(page)]=\"currentPage\"\n                (pageChange)=\"onPageChange($event)\">\n            </ngb-pagination>\n        </div>\n    </div>\n\n    <div class=\"m-list-section\">\n        <div class=\"list-group\">\n            <em *ngIf=\"!suggested?.length\">Enter keywords above to receive suggested concepts to use.</em>\n            <div *ngFor=\"let concept of suggested\" class=\"list-group-item\"\n                (click)=\"addValue(concept)\" [ngClass]=\"{'active':isSelected(concept)}\">\n                <div><a class=\"is-linkless\">{{concept.prefLabel||concept.label}}</a></div>\n                <small class=\"t-fg--gray-md\">{{concept.uri}}</small>\n            </div>\n        </div>\n    </div>\n    <hr>\n    <div class=\"a-heading\">Selected ({{data?.selected?.length||0}})</div>\n    <div class=\"m-list-section\">\n        <div class=\"list-group\">\n            <em *ngIf=\"!data.selected?.length\">No concepts selected.</em>\n            <div *ngFor=\"let concept of data?.selected\" class=\"list-group-item\">\n                <div>\n                    <span class=\"fas fa-times t-fg--danger\" (click)=\"removeValue(concept)\"></span>\n                    {{concept.prefLabel||concept.label}}\n                </div>\n                <small class=\"t-fg--gray-md\">{{concept.uri}}</small>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"onNoClick()\">Cancel</button>\n    <button type=\"button\" mat-flat-button color=\"primary\" [mat-dialog-close]=\"data.selected\" cdkFocusInitial>Ok</button>\n</div>\n",
                styles: [":host .mat-form-field{width:100%}"]
            }),
            __param(1, core.Inject(dialog.MAT_DIALOG_DATA))
        ], SemanticFilterDialog);
        return SemanticFilterDialog;
    }());

    var SemanticFilterComponent = /** @class */ (function () {
        function SemanticFilterComponent(service, dialog) {
            this.service = service;
            this.dialog = dialog;
            this.onEvent = new core.EventEmitter();
            this.isCollapsed = true;
            this.visibleAmount = 10;
        }
        SemanticFilterComponent.prototype.ngOnInit = function () {
            this.selected = [];
        };
        SemanticFilterComponent.prototype.openDialog = function () {
            var _this = this;
            var dialogRef = this.dialog.open(SemanticFilterDialog, {
                width: '50%',
                data: { service: this.service, selected: [] }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result && result.length) {
                    _this.selected = _this.selected.concat(result);
                    _this.notify();
                }
            });
        };
        SemanticFilterComponent.prototype.getKey = function () {
            return this.key;
        };
        SemanticFilterComponent.prototype.notify = function () {
            var key = this.key;
            var change = {};
            change[key] = this.selected.map(function (s) { return s.uri; });
            change[client.QueryParameters.PAGE] = 0;
            var event = new SearchEvent(EventTypes.QUERY, change);
            this.onEvent.emit(event);
        };
        SemanticFilterComponent.prototype.hasSelections = function () {
            return this.selected && this.selected.length > 0;
        };
        SemanticFilterComponent.prototype.isSelected = function (arg) {
            return this.hasSelections() && this.getIndexOf(arg) >= 0;
        };
        SemanticFilterComponent.prototype.getIndexOf = function (arg) {
            if (!this.selected || !this.selected.length)
                return -1;
            return this.selected.findIndex(function (s) { return s.uri === arg.uri; });
        };
        /**
         * @param arg - item or identifier
         */
        SemanticFilterComponent.prototype.toggle = function (arg) {
            var idx = this.getIndexOf(arg);
            if (idx >= 0)
                this.selected.splice(idx, 1); //found, remove it
            else
                this.selected.push(arg); //not found, add it
            this.notify();
        };
        SemanticFilterComponent.prototype.clear = function () {
            if (this.hasSelections()) {
                this.selected = [];
                this.notify();
            }
            else if (this.isCollapsed) {
                this.isCollapsed = false;
            }
        };
        SemanticFilterComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [client.KGService,] }] },
            { type: dialog.MatDialog, decorators: [{ type: core.Inject, args: [dialog.MatDialog,] }] }
        ]; };
        __decorate([
            core.Input()
        ], SemanticFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Output()
        ], SemanticFilterComponent.prototype, "onEvent", void 0);
        SemanticFilterComponent = __decorate([
            core.Component({
                selector: 'gp-semantic-filter',
                template: "\n<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Semantic Concepts\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <a class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find Concepts...\n        </a>\n\n        <a class=\"m-facet\" (click)=\"clear()\" [ngClass]=\"{active:!hasSelections()}\">\n            <span *ngIf=\"!hasSelections()\">No concepts selected</span>\n            <span *ngIf=\"hasSelections()\">Clear Selections</span>\n        </a>\n\n        <div class=\"m-facet\" *ngFor=\"let concept of selected; let $index = index\" (click)=\"toggle(concept)\"\n            [ngClass]=\"{active:isSelected(concept),'is-hidden':$index>visibleAmount}\">\n            <span class=\"fas fa-check\" *ngIf=\"isSelected(concept)\"></span>\n            <span class=\"fas fa-square t-fg--gray-xlt\" *ngIf=\"!isSelected(concept)\"></span>\n            {{concept.prefLabel}}\n            <div class=\"u-break--all u-text--sm\">{{concept.uri}}</div>\n        </div>\n    </div>\n</div>\n",
                styles: [""]
            }),
            __param(0, core.Inject(client.KGService)),
            __param(1, core.Inject(dialog.MatDialog))
        ], SemanticFilterComponent);
        return SemanticFilterComponent;
    }());

    var ServiceTypeFilterComponent = /** @class */ (function () {
        function ServiceTypeFilterComponent(service) {
            this.service = service;
            //the key associated with this filter's selections
            this.key = client.QueryParameters.SERVICE_TYPES;
            //the current set of values
            this.selected = [];
            this.onEvent = new core.EventEmitter();
            this.isCollapsed = true;
            this.types = [];
        }
        ServiceTypeFilterComponent.prototype.ngOnInit = function () {
            var _this = this;
            var query = new client.Query({
                type: 'dct:Standard',
                resourceType: 'ServiceType',
                fields: "availableVersions",
                size: 50,
                sort: 'label,asc'
            });
            this.service.search(query)
                .then(function (response) {
                _this.types = response.results;
            })
                .catch(function (error) {
                console.log("Error loading supported service types");
            });
        };
        ServiceTypeFilterComponent.prototype.ngOnDestroy = function () {
            this.types = null;
            // this.svcQuery = null;
            // this.serviceSvc = null;
            // this.serviceTypes = null;
            // this.serviceTypesError = null;
            // this.byType = null;
        };
        ServiceTypeFilterComponent.prototype.hasSelections = function () {
            return this.selected && this.selected.length > 0;
        };
        ServiceTypeFilterComponent.prototype.isSelected = function (value) {
            return this.hasSelections() && this.selected.indexOf(value) >= 0;
        };
        ServiceTypeFilterComponent.prototype.getIndexOf = function (value) {
            return this.hasSelections() ? this.selected.indexOf(value) : -1;
        };
        ServiceTypeFilterComponent.prototype.isSupported = function () {
            if (this.query) {
                var types = this.query.getTypes();
                return types && types.length && types.indexOf(client.ItemTypes.SERVICE) >= 0;
            }
            return false;
        };
        ServiceTypeFilterComponent.prototype.toggle = function (value) {
            var result = this.selected.slice(0);
            var idx = this.getIndexOf(value);
            if (idx >= 0) {
                result = result.splice(idx, 1);
            }
            else {
                result.push(value);
            }
            var change = {};
            change[this.key] = result;
            var event = new SearchEvent(EventTypes.QUERY, change);
            this.onEvent.emit(event);
        };
        ServiceTypeFilterComponent.prototype.clear = function () {
            if (!this.hasSelections())
                this.isCollapsed = !this.isCollapsed; //toggle collapsed state
            else {
                var change = {};
                change[this.key] = null;
                var event_1 = new SearchEvent(EventTypes.QUERY, change);
                this.onEvent.emit(event_1);
            }
        };
        ServiceTypeFilterComponent.prototype.getCount = function (value) {
            // var facet = this.service.getFacet("serviceTypes");
            // if(!facet) return '';
            // var valObj = facet.buckets.find(function(v) { return v.label===value; });
            // if(!valObj) return '';
            // return valObj.count;
            return 0;
        };
        ServiceTypeFilterComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [client.ItemService,] }] }
        ]; };
        __decorate([
            core.Input()
        ], ServiceTypeFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Input()
        ], ServiceTypeFilterComponent.prototype, "selected", void 0);
        __decorate([
            core.Input()
        ], ServiceTypeFilterComponent.prototype, "query", void 0);
        __decorate([
            core.Output()
        ], ServiceTypeFilterComponent.prototype, "onEvent", void 0);
        ServiceTypeFilterComponent = __decorate([
            core.Component({
                selector: 'gp-service-type-filter',
                template: "<div class=\"card o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"a-heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\" [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\"></span>\n        </button>\n        Filter by Service Types\n    </div>\n    <div class=\"o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">\n            <span *ngIf=\"isCollapsed\">No values selected</span>\n            <span *ngIf=\"!isCollapsed\">Any Service Type</span>\n        </a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selections</a>\n        <a *ngFor=\"let type of types\" class=\"m-facet\"\n            (click)=\"toggle(type.id)\" [ngClass]=\"{active:isSelected(type.id)}\">\n            <span class=\"fas fa-check\" *ngIf=\"isSelected(type.id)\"></span>\n            <span class=\"fas fa-square t-fg--gray-lt\" *ngIf=\"!isSelected(type.id)\"></span>\n            <span class=\"badge badge-secondary\">{{getCount(type.id)}}</span>\n            {{type.label}}\n        </a>\n    </div>\n</div>\n\n\n<!-- <div class=\"o-query-filter card\">\n    <div class=\"a-heading l-flex-container flex-justify-between flex-align-center\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\" [ngClass]=\"{'fa-minus':!isCollapsed,'fa-plus':isCollapsed}\"></span>\n        </button>\n        <span class=\"flex-1\">Filter by Service</span>\n    </div>\n    <div class=\"card-content\">\n        <div class=\"o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n            <div class=\"m-facet\">\n                <div class=\"input-group-slick\">\n                    <input name=\"scheme-typeahead\" type=\"text\" class=\"form-control\"\n                        ng-model=\"typeaheadValue\"\n                        ng-change=\"updateValues(typeaheadValue)\"\n                        ng-model-options=\"{debounce:200}\"\n                        placeholder=\"Search Services\">\n                    <span class=\"fas fa-times\"\n                        title=\"Clear query\"\n                        ng-if=\"typeaheadValue.length\"\n                        (click)=\"updateValues(typeaheadValue=null)\">\n                    </span>\n                </div>\n            </div>\n            <a class=\"m-facet\" (click)=\"clear()\"\n                [ngClass]=\"{active:!hasSelections()}\">\n                <span class=\"fas\"\n                    [ngClass]=\"{'fa-check':!hasSelections(), 'fa-square t-fg--gray-lt':hasSelections()}\">\n                </span>\n                Any Service\n            </a>\n            <a  *ngFor=\"let value of values\"\n                class=\"m-facet\"\n                (click)=\"toggle(value)\"\n                [ngClass]=\"{active:isSelected(value)}\">\n                <span class=\"fas\"\n                    [ngClass]=\"{'fa-check':isSelected(value),'fa-square t-fg--gray-lt':!isSelected(value)}\"></span>\n                {{value.label}}\n            </a>\n        </div>\n    </div>\n</div> -->\n",
                styles: [""]
            }),
            __param(0, core.Inject(client.ItemService))
        ], ServiceTypeFilterComponent);
        return ServiceTypeFilterComponent;
    }());

    var SimilarityFilterComponent = /** @class */ (function () {
        function SimilarityFilterComponent(service) {
            this.service = service;
            this.key = client.QueryParameters.SIMILAR_TO;
            this.onEvent = new core.EventEmitter();
            this.isCollapsed = true;
        }
        SimilarityFilterComponent.prototype.ngOnInit = function () { };
        SimilarityFilterComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (changes.selected) {
                var id = changes.selected.currentValue;
                if (!id)
                    this.item = null;
                else {
                    this.service.get(id)
                        .then(function (result) { _this.item = result; })
                        .catch(function (err) {
                        console.log("SimilarityFilter.OnChange('selected') : ", err);
                    });
                }
            }
        };
        SimilarityFilterComponent.prototype.clear = function () {
            var change = {};
            change[this.key] = null;
            var event = new SearchEvent(EventTypes.QUERY, change);
            this.onEvent.emit(event);
        };
        SimilarityFilterComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [client.ItemService,] }] }
        ]; };
        __decorate([
            core.Input()
        ], SimilarityFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Input()
        ], SimilarityFilterComponent.prototype, "selected", void 0);
        __decorate([
            core.Output()
        ], SimilarityFilterComponent.prototype, "onEvent", void 0);
        SimilarityFilterComponent = __decorate([
            core.Component({
                selector: 'gp-similarity-filter',
                template: "<div class=\"m-article o-query-filter\" *ngIf=\"item\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Find Similar\n    </div>\n    <div class=\"u-text--sm\" *ngIf=\"!isCollapsed\">\n        Searching for items similar to:\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a  class=\"m-facet active\" (click)=\"clear()\">\n            <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            <span gpIcon [item]=\"item\"></span> {{item.label}}\n        </a>\n    </div>\n</div>\n",
                styles: [""]
            }),
            __param(0, core.Inject(client.ItemService))
        ], SimilarityFilterComponent);
        return SimilarityFilterComponent;
    }());

    var ThemeFilterComponent = /** @class */ (function (_super) {
        __extends(ThemeFilterComponent, _super);
        function ThemeFilterComponent(service, dialog) {
            var _this = _super.call(this, service, client.ItemTypes.CONCEPT, "Themes", dialog) || this;
            _this.key = client.QueryParameters.THEMES_ID;
            _this.onEvent = new core.EventEmitter();
            return _this;
        }
        ThemeFilterComponent.prototype.getKey = function () {
            return this.key;
        };
        ThemeFilterComponent.prototype.notify = function (event) {
            this.onEvent.emit(event);
        };
        ThemeFilterComponent.prototype.initQuery = function () {
            _super.prototype.initQuery.call(this);
            this.query.fields(['scheme']);
        };
        ThemeFilterComponent.prototype.getDialogOptions = function () {
            var opts = _super.prototype.getDialogOptions.call(this);
            opts.data.subHeading = "scheme";
            return opts;
        };
        ThemeFilterComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [client.ItemService,] }] },
            { type: dialog.MatDialog }
        ]; };
        __decorate([
            core.Input()
        ], ThemeFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Output()
        ], ThemeFilterComponent.prototype, "onEvent", void 0);
        ThemeFilterComponent = __decorate([
            core.Component({
                selector: 'gp-theme-filter',
                template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
                styles: [""]
            }),
            __param(0, core.Inject(client.ItemService))
        ], ThemeFilterComponent);
        return ThemeFilterComponent;
    }(ItemFilterComponent));

    var TopicFilterComponent = /** @class */ (function (_super) {
        __extends(TopicFilterComponent, _super);
        function TopicFilterComponent(service, dialog) {
            var _this = _super.call(this, service, client.ItemTypes.TOPIC, "Topics", dialog) || this;
            _this.key = client.QueryParameters.TOPIC_ID;
            _this.onEvent = new core.EventEmitter();
            return _this;
        }
        TopicFilterComponent.prototype.getKey = function () {
            return this.key;
        };
        TopicFilterComponent.prototype.notify = function (event) {
            this.onEvent.emit(event);
        };
        TopicFilterComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [client.ItemService,] }] },
            { type: dialog.MatDialog }
        ]; };
        __decorate([
            core.Input()
        ], TopicFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Output()
        ], TopicFilterComponent.prototype, "onEvent", void 0);
        TopicFilterComponent = __decorate([
            core.Component({
                selector: 'gp-topic-filter',
                template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
                styles: [""]
            }),
            __param(0, core.Inject(client.ItemService))
        ], TopicFilterComponent);
        return TopicFilterComponent;
    }(ItemFilterComponent));

    var TypeFilterComponent = /** @class */ (function () {
        function TypeFilterComponent() {
            this.key = client.QueryParameters.TYPES;
            this.selected = [];
            this.onEvent = new core.EventEmitter();
            this.isCollapsed = true;
            this.visibleAmount = 10;
        }
        TypeFilterComponent.prototype.ngOnInit = function () {
            this.choices = Object.keys(client.ItemTypes).map(function (key) {
                var type = client.ItemTypes[key];
                if (client.ItemTypes.STANDARD === type || client.ItemTypes.RIGHTS_STATEMENT === type)
                    return null;
                return { label: client.ItemTypeLabels[type], value: type };
            }).filter(function (v) { return !!v; });
            // console.log("TypeFilter.onInit() " + JSON.stringify(this.selected));
        };
        TypeFilterComponent.prototype.ngOnChanges = function (changes) {
            if (changes.selected) {
                var value = changes.selected.currentValue;
                console.log("TypeFilter.onChanges() " + JSON.stringify(value));
                //if a selected value wasn't provided, ensure it's 'null' and not undefined
                if (value === undefined) {
                    this.selected = [];
                }
                else if (typeof (value) === 'string') {
                    this.selected = [value];
                }
            }
        };
        TypeFilterComponent.prototype.getKey = function () {
            return this.key;
        };
        TypeFilterComponent.prototype.notify = function (event) {
            this.onEvent.emit(event);
        };
        TypeFilterComponent.prototype.hasSelections = function () {
            return this.selected && this.selected.length > 0;
        };
        TypeFilterComponent.prototype.isSelected = function (arg) {
            return this.getIndexOf(arg) >= 0;
        };
        TypeFilterComponent.prototype.getIndexOf = function (arg) {
            return this.selected ? this.selected.indexOf(arg) : -1;
        };
        /**
         * @param arg - item or identifier
         */
        TypeFilterComponent.prototype.toggle = function (arg) {
            var idx = this.getIndexOf(arg);
            if (idx >= 0) {
                this.selected.splice(idx, 1);
            }
            else {
                this.selected.push(arg);
            }
            var key = this.getKey();
            var value = this.selected.length ? this.selected : null;
            var change = {};
            change[key] = value;
            var event = new SearchEvent(EventTypes.QUERY, change);
            this.notify(event);
        };
        TypeFilterComponent.prototype.clear = function () {
            if (this.hasSelections()) {
                this.selected = [];
                var key = this.getKey();
                var change = {};
                change[key] = null;
                var event_1 = new SearchEvent(EventTypes.QUERY, change);
                this.notify(event_1);
            }
            else if (this.isCollapsed) {
                this.isCollapsed = false;
            }
        };
        TypeFilterComponent.prototype.getCount = function (value) {
            var _this = this;
            var facet = (this.facets || []).find(function (facet) { return facet.name === _this.key; });
            if (!facet || !facet.buckets || !facet.buckets.length) {
                // console.log("No facet for " + this.key);
                return '';
            }
            var valObj = facet.buckets.find(function (v) { return v.label === value; });
            if (!valObj) {
                // console.log("No bucket for " + value);
                return '';
            }
            return valObj.count;
        };
        __decorate([
            core.Input()
        ], TypeFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Input()
        ], TypeFilterComponent.prototype, "facets", void 0);
        __decorate([
            core.Input()
        ], TypeFilterComponent.prototype, "selected", void 0);
        __decorate([
            core.Output()
        ], TypeFilterComponent.prototype, "onEvent", void 0);
        TypeFilterComponent = __decorate([
            core.Component({
                selector: 'gp-type-filter',
                template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Type\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a class=\"m-facet\" (click)=\"clear()\" [ngClass]=\"{active:!hasSelections()}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square':!hasSelections(), 'fa-square t-fg--gray-xlt':hasSelections()}\">\n            </span>\n            Any Type\n        </a>\n        <div class=\"m-facet\" *ngFor=\"let option of choices; let $index=index\"\n            (click)=\"toggle(option.value)\"\n            [ngClass]=\"{active:isSelected(option.value),'is-hidden':$index>visibleAmount}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square':isSelected(option.value),'fa-square':!isSelected(option.value)}\">\n            </span>\n            <span class=\"icon-{{option.label.toLowerCase().replace(' ','')}} is-themed\"></span>\n            {{option.label}}\n            <span class=\"badge badge-secondary\">{{getCount(option.value)}}</span>\n        </div>\n    </div>\n</div>\n",
                styles: [""]
            })
        ], TypeFilterComponent);
        return TypeFilterComponent;
    }());

    var ModifiedFilterComponent = /** @class */ (function () {
        function ModifiedFilterComponent() {
            this.key = client.QueryParameters.MODIFIED;
            this.onEvent = new core.EventEmitter();
            this.isCollapsed = true;
            this.format = 'MMM dd yyyy';
            this.debouncePromise = null;
            this.lastModifiedOptions = [
                { value: "Before", before: true },
                { value: "After", before: false }
            ];
            this.lastModifiedDir = this.lastModifiedOptions[1];
        }
        ModifiedFilterComponent.prototype.ngOnInit = function () {
        };
        ModifiedFilterComponent.prototype.onKeyUp = function ($event) {
            var text = $event.target.value;
            this.onValueChange(text);
        };
        ModifiedFilterComponent.prototype.onValueChange = function (value) {
            var change = {};
            if (this.lastModifiedDir.before) {
                change[client.QueryParameters.MODIFIED_BEFORE] = value;
                change[client.QueryParameters.MODIFIED_AFTER] = null;
            }
            else {
                change[client.QueryParameters.MODIFIED_BEFORE] = null;
                change[client.QueryParameters.MODIFIED_AFTER] = value;
            }
            var event = new SearchEvent(EventTypes.QUERY, change);
            this.onEvent.emit(event);
        };
        ModifiedFilterComponent.prototype.onDirChange = function () {
            this.onValueChange(this.value);
        };
        ModifiedFilterComponent.prototype.clear = function () {
            if (this.value) {
                this.value = null;
                this.onValueChange(this.value);
            }
            else {
                this.isCollapsed = true;
            }
        };
        __decorate([
            core.Input()
        ], ModifiedFilterComponent.prototype, "key", void 0);
        __decorate([
            core.Input()
        ], ModifiedFilterComponent.prototype, "value", void 0);
        __decorate([
            core.Output()
        ], ModifiedFilterComponent.prototype, "onEvent", void 0);
        ModifiedFilterComponent = __decorate([
            core.Component({
                selector: 'gp-modified-filter',
                template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Modified Date\n    </div>\n\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <div *ngIf=\"isCollapsed\" class=\"m-facet active\">\n            <span *ngIf=\"value\">{{lastModifiedDir.value}} {{value}}</span>\n            <span *ngIf=\"!value\">No date specified</span>\n        </div>\n\n        <div class=\"m-facet  d-flex flex-justify-between flex-align-stretch\">\n\n            <select class=\"form-control flex-1 u-mg-right--md\"\n                ([ngModel])=\"lastModifiedDir\"\n                (change)=\"onDirChange()\"\n                aria-label=\"Select before or after modification date constraint\">\n                <option *ngFor=\"let opt of lastModifiedOptions\" [value]=\"opt\">{{opt.value}}</option>\n            </select>\n\n            <div class=\"flex-2 input-group-slick\">\n                <!-- <span class=\"fas fa-calendar\"\n                    title=\"Open date picker to select a date\"\n                    (click)=\"toggle($event)\">\n                </span> -->\n                <input type=\"text\" class=\"form-control\"\n                    placeholder=\"Specify modified date\"\n                    aria-label=\"Specify modified date\"\n                    ([ngModel])=\"value\"\n                    (change)=\"onValueChange(value)\" />\n                <span class=\"fas fa-times\" title=\"Clear value\"\n                    *ngIf=\"value\" (click)=\"clear()\">\n                </span>\n            </div>\n        </div>\n\n    </div>\n</div>\n",
                styles: [""]
            })
        ], ModifiedFilterComponent);
        return ModifiedFilterComponent;
    }());

    var trackingServiceInst;
    function TrackingServiceFactory(rpm) {
        if (!trackingServiceInst) {
            trackingServiceInst = new client.TrackingService({ provider: rpm });
        }
        return trackingServiceInst;
    }

    var ɵ0 = geoplatform_rpm_browser_js.RPMServiceFactory(), ɵ1 = TrackingServiceFactory;
    var GeoPlatformCommonModule = /** @class */ (function () {
        function GeoPlatformCommonModule() {
        }
        GeoPlatformCommonModule = __decorate([
            core.NgModule({
                imports: [
                    router.RouterModule,
                    common.CommonModule,
                    forms.FormsModule,
                    material.MatInputModule, material.MatButtonModule, material.MatIconModule, material.MatDialogModule,
                    ngBootstrap.NgbModule,
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
                        provide: iRPMService.RPMService,
                        useValue: ɵ0
                    },
                    {
                        provide: client.TrackingService,
                        useFactory: ɵ1,
                        deps: [iRPMService.RPMService]
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
    // import Polyfills from "./shared/polyfills";
    // Polyfills();
    var DefaultSortOptions = [
        { value: "_score,desc", label: "Relevance" },
        { value: "modified,desc", label: "Most Recently Modified" },
        { value: "modified,asc", label: "Least Recently Modified" },
        { value: "label,asc", label: "Title [A-Z]" },
        { value: "label,desc", label: "Title [Z-A]" },
        { value: "reliability,asc", label: "Reliability" }
    ];

    exports.AppAuthService = AppAuthService;
    exports.ArrayedItemsPipe = ArrayedItemsPipe;
    exports.AuthenticatedComponent = AuthenticatedComponent;
    exports.CommunityFilterComponent = CommunityFilterComponent;
    exports.CreatedByFilterComponent = CreatedByFilterComponent;
    exports.DefaultSortOptions = DefaultSortOptions;
    exports.ErrorResolver = ErrorResolver;
    exports.EventTypes = EventTypes;
    exports.FixLabelPipe = FixLabelPipe;
    exports.FriendlyTypePipe = FriendlyTypePipe;
    exports.GeoPlatformCommonModule = GeoPlatformCommonModule;
    exports.GeoPlatformCommonVersion = GeoPlatformCommonVersion;
    exports.GeoPlatformError = GeoPlatformError;
    exports.GeoPlatformErrorService = GeoPlatformErrorService;
    exports.GeoPlatformIconDirective = GeoPlatformIconDirective;
    exports.HeaderComponent = HeaderComponent;
    exports.ImageFallbackDirective = ImageFallbackDirective;
    exports.ItemFactory = ItemFactory;
    exports.ItemFilterComponent = ItemFilterComponent;
    exports.ItemHelper = ItemHelper;
    exports.ItemResolver = ItemResolver;
    exports.KeywordFilterComponent = KeywordFilterComponent;
    exports.LimitToPipe = LimitToPipe;
    exports.ListSelectDialog = ListSelectDialog;
    exports.LoginButtonComponent = LoginButtonComponent;
    exports.LoginModalComponent = LoginModalComponent;
    exports.MapTypes = MapTypes;
    exports.MessageDialog = MessageDialog;
    exports.ModifiedFilterComponent = ModifiedFilterComponent;
    exports.NewItemResolver = NewItemResolver;
    exports.PublisherFilterComponent = PublisherFilterComponent;
    exports.ResourceLinkComponent = ResourceLinkComponent;
    exports.SchemeFilterComponent = SchemeFilterComponent;
    exports.SearchEvent = SearchEvent;
    exports.SearchService = SearchService;
    exports.SelectedItemsComponent = SelectedItemsComponent;
    exports.SemanticFilterComponent = SemanticFilterComponent;
    exports.SemanticFilterDialog = SemanticFilterDialog;
    exports.ServiceTypeFilterComponent = ServiceTypeFilterComponent;
    exports.SimilarityFilterComponent = SimilarityFilterComponent;
    exports.SortByPipe = SortByPipe;
    exports.ThemeFilterComponent = ThemeFilterComponent;
    exports.ThumbnailComponent = ThumbnailComponent;
    exports.TopicFilterComponent = TopicFilterComponent;
    exports.TrackingServiceFactory = TrackingServiceFactory;
    exports.TypeFilterComponent = TypeFilterComponent;
    exports.VersionResolver = VersionResolver;
    exports.authServiceFactory = authServiceFactory;
    exports.logger = logger;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵa = ListSelectDialog;
    exports.ɵb = MessageDialog;
    exports.ɵc = ImageFallbackDirective;
    exports.ɵd = ThumbnailComponent;
    exports.ɵe = SelectedItemsComponent;
    exports.ɵf = ResourceLinkComponent;
    exports.ɵg = LoginButtonComponent;
    exports.ɵh = LoginModalComponent;
    exports.ɵi = HeaderComponent;
    exports.ɵj = GeoPlatformIconDirective;
    exports.ɵk = CommunityFilterComponent;
    exports.ɵl = CreatedByFilterComponent;
    exports.ɵm = KeywordFilterComponent;
    exports.ɵn = PublisherFilterComponent;
    exports.ɵo = SchemeFilterComponent;
    exports.ɵp = SemanticFilterComponent;
    exports.ɵq = SemanticFilterDialog;
    exports.ɵr = ServiceTypeFilterComponent;
    exports.ɵs = SimilarityFilterComponent;
    exports.ɵt = ThemeFilterComponent;
    exports.ɵu = TopicFilterComponent;
    exports.ɵv = TypeFilterComponent;
    exports.ɵw = ModifiedFilterComponent;
    exports.ɵx = AppAuthService;
    exports.ɵy = SearchService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=geoplatform-common.umd.js.map
