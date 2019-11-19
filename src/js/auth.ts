/// <reference path="../types.d.ts" />
/// <reference path="../commonNG.ts" />


(function(angular) {

  'use strict';

  const ACCESS_TOKEN_COOKIE  = 'gpoauth-a'

  /**
   * Get token from query string
   *
   * Note:
   *  Lifted outside of any Angular service to prevent cyclical service dependencies.
   *
   * @method getJWTFromUrl
   * @returns {String} token - token in query string or undefined
   */
  function getJWTFromUrl(): string {
    var queryString = window.location.hash ? window.location.hash : window.location.href;
    var res = queryString.match(/access_token=([^\&]*)/);
    return res && res[1];
  };

  function RPMLoaded():  boolean {
   return typeof RPMService != 'undefined'
  }

  /**
   * Get an associated array of cookies.
   */
  function getCookieObject(): StringObj  {
    return document.cookie.split(';')
                          .map(c => c.trim().split('='))
                          .reduce((acc: StringObj, pair) => {
                            acc[pair[0]] = pair[1]
                            return acc
                          }, {})
  }

  /**
   * GeoPlatform Common Module Authentication Support
   *
   * Contains re-usable services, directives, and other angular components
   *
   *
   * NOTE: This module uses certain variables in $rootScope in order to
   * perform actions like authentication.  The following variables should be
   * set before using any service/directive in this file:
   *
   *   - idspUrl : the url to the identity service provider server
   *   - idmUrl : the url to the identity management server
   *   - portalUrl : the url to the main landing page of GeoPlatform (www.geoplatform.gov in production)
   */
  angular.module('gp-common')

   /**
    * Authentication Service
    *
    * Because the auth service redirects the page to the IDM portal
    * and WMV is reloaded once the login/logout processes are complete,
    * there's no need to bind listeners informing other components of
    * an auth change.
    *
    * Inside "DEV", you should close and re-open any components' widgets
    * to get current auth status.
    */
    .service('AuthenticationService', ['$q', '$http', '$location', '$rootScope', '$window', 'GPConfig',
      function($q: ng.IQService, $http: ng.IHttpService, $location: ng.ILocationService, $rootScope: ng.IRootScopeService, $window: ng.IWindowService, Config: ngcommon.GeoPlatform) {

        class User implements ngcommon.User {
          id: string
          username: string
          name: string
          email: string
          org: string
          roles: string
          groups: [{_id: string, name: string}]
          exp: number

          constructor(opts: ngcommon.JWT) {
            this.id = opts.sub
            this.username = opts.username
            this.name = opts.name
            this.email = opts.email
            this.org = opts.orgs[0] && opts.orgs[0].name
            this.groups = opts.groups
            this.roles = opts.roles
            this.exp = opts.exp
          }

          toJSON() {
            return JSON.parse(JSON.stringify(Object.assign({}, this)));
          };

          clone() {
            return Object.assign({}, this)
          };

          compare(arg: any) {
            if (arg instanceof User) {
              return this.id === arg.id;
            } else if (typeof(arg) === 'object') {
              return typeof(arg.id) !== 'undefined' &&
                arg.id === this.id;
            }
            return false;
          };

          isAuthorized(role: string) {
            let env = Config.env || Config.ENV || Config.NODE_ENV;
            if((env === 'dev' || env === 'development') &&
                typeof(Config.ALLOW_DEV_EDITS) !== 'undefined')
                return true;

            return this.groups &&
                    !!this.groups
                            .map(g => g.name)
                            .filter(n => n === role)
                            .length;
          };
        }

        type userOrNothing = User
                           | null
                           | undefined

        /**
         * Authentication Service
         */
        class AuthService implements ngcommon.AuthService {

          iframe: HTMLIFrameElement
          preveiousTokenPresentCheck: boolean

          constructor(){
            const self = this;

            // Setup general event listeners that always run
            addEventListener('message', (event: any) => {
              // Handle User Authenticated
              if(event.data === 'iframe:userAuthenticated'){
                self.init() // will broadcast to angular (side-effect)
              }

              // Handle logout event
              if(event.data === 'userSignOut'){
                self.removeAuth()
              }
            })

            // const user =
            self.init()
          }

          /**
           * Extract and decode from cookie
           *
           * @param key
           */
          getFromCookie(key: string) {
            const raw = getCookieObject()[key]
            try{
              return raw ?
                      atob(decodeURIComponent(raw)) :
                      undefined;
            } catch (e){ // Catch bad encoding or formally not encoded
              return undefined;
            }
          };


          /**
           * We keep this outside the constructor so that other services call
           * call it to trigger the side-effects.
           *
           * @method init
           */
          private init(){
            const self = this;
            // Delay init until RPMService is loaded
            if(RPMLoaded() && Config.loadRPM){
              const script = document.createElement('script');
              script.onload = function () {
                  //do stuff with the script
                  self.init();
              };
              script.src = `https://s3.amazonaws.com/geoplatform-cdn/gp.rpm/${Config.RPMVersion || 'stable'}/js/gp.rpm.browser.js`;

              document.head.appendChild(script);
              return // skip init() till RPM is loaded
            }

            const jwt = this.getJWT();

            //clean hosturl on redirect from oauth
            if (getJWTFromUrl()) {
              if(window.history && window.history.replaceState){
                window.history.replaceState( {} , 'Remove token from URL', $window.location.href.replace(/[\?\&]access_token=.*\&token_type=Bearer/, '') )
              } else {
                $window.location.search.replace(/[\?\&]access_token=.*\&token_type=Bearer/, '')
              }
            }

            // Setup active session checher
            this.preveiousTokenPresentCheck = !!jwt
            setInterval(() => { self.checkForLocalToken() }, Config.tokenCheckInterval)

            const user = this.getUserFromJWT(jwt)
            if(user)
              $rootScope.$broadcast("userAuthenticated", user)

            return user
          }

          /**
           * Checks for the presence of token in cookie. If there has been a
           * change (cookie appears or disapears) the fire event handlers to
           * notify the appliction of the event.
           */
          private checkForLocalToken(){
            const jwt = this.getJWT()
            const tokenPresent = !!jwt
            // compare with previous check
            if (tokenPresent !== this.preveiousTokenPresentCheck)
              tokenPresent ?
                $rootScope.$broadcast("userAuthenticated", this.getUserFromJWT(jwt)) :
                $rootScope.$broadcast("userSignOut");

            // update previous state for next check
            this.preveiousTokenPresentCheck = tokenPresent
          }

          /**
           * Create an invisable iframe and appends it to the bottom of the page.
           *
           * @method createIframe
           * @returns {HTMLIFrameElement}
           */
          private createIframe(url: string): HTMLIFrameElement {
            let iframe = document.createElement('iframe')

            iframe.style.display = "none";
            iframe.src = url
            document.body.appendChild(iframe);

            return iframe
          };

          /**
           * Redirects or displays login window the page to the login site
           */
          login() {
            // Check implicit we need to actually redirect them
            if(Config.AUTH_TYPE === 'token') {
              window.location.href = Config.IDP_BASE_URL +
                      `/auth/authorize?client_id=${Config.APP_ID}` +
                      `&response_type=${Config.AUTH_TYPE}` +
                      `&redirect_uri=${encodeURIComponent(Config.CALLBACK || '/login')}`

            // Otherwise pop up the login modal
            } else {
              // Iframe login
              if(Config.ALLOWIFRAMELOGIN){
                $rootScope.$broadcast('auth:requireLogin')

                // Redirect login
              } else {
                window.location.href = Config.LOGIN_URL
                                || `/login?redirect_url=${encodeURIComponent(window.location.href)}`
              }
            }
          };

          /**
           * Performs background logout and requests jwt revokation
           */
          logout() {
            const self = this;
            // Create iframe to manually call the logout and remove gpoauth cookie
            // https://stackoverflow.com/questions/13758207/why-is-passportjs-in-node-not-removing-session-on-logout#answer-33786899
            if(Config.IDP_BASE_URL)
              this.createIframe(`${Config.IDP_BASE_URL}/auth/logout`)

            // Save JWT to send with final request to revoke it
            const jwt = this.getJWT()
            self.removeAuth() // purge the JWT

            return $http({
                      method: 'GET',
                      url: `/revoke`,
                      headers: {
                        Authorization: `Bearer ${jwt}`
                      }
                    })
                    .then(() => {
                      if(Config.LOGOUT_URL) window.location.href = Config.LOGOUT_URL
                      if(Config.FORCE_LOGIN) self.forceLogin();
                    })
                    .catch((err: Error) => console.log('Error logging out: ', err));
          };

          /**
           * Optional force redirect for non-public services
           */
          forceLogin() {
            this.login();
          };

          /**
           * Get protected user profile
           */
          getOauthProfile(): ng.IPromise<ngcommon.UserProfile> {
            const Q = $q.defer<ngcommon.UserProfile>();

            //check to make sure we can make called
            if (this.getJWT()) {
              $http.get<ngcommon.UserProfile>(Config.IDP_BASE_URL + '/api/profile')
                .then(response =>  Q.resolve(response.data))
                .catch(err => Q.reject(err))
            } else {
              Q.reject(null)
            }

            return Q.promise;
          };

          /**
           * Get User object from the JWT.
           *
           * If no JWT is provided it will be looked for at the normal JWT
           * locations (cookie or URL queryString).
           *
           * @param {JWT} [jwt] - the JWT to extract user from.
           */
          getUserFromJWT(jwt: string) {
            const user = this.parseJwt(jwt)
            return user ?
                    new User(Object.assign({}, user, { id: user.sub })) :
                    null;
          }

          /**
           * If the callback parameter is specified, this method
           * will return undefined. Otherwise, it returns the user (or null).
           *
           * Side Effects:
           *  - Will redirect users if no valid JWT was found
           *
           * @param callback optional function to invoke with the user
           * @return object representing current user
           */
          getUser(callback?: (user: User) => any): User {
            const jwt = this.getJWT();
            // If callback provided we can treat async and call server
            if(callback && typeof(callback) === 'function'){
              this.check()
              .then(user => callback(user));

              // If no callback we have to provide a sync response (no network)
            } else {
              // We allow front end to get user data if grant type and expired
              // because they will recieve a new token automatically when
              // making a call to the client(application)
              return this.isImplicitJWT(jwt) && this.isExpired(jwt) ?
                      null :
                      this.getUserFromJWT(jwt);
            }
          }

          /**
           * Promise version of get user.
           *
           * Below is a table of how this function handels this method with
           * differnt configurations.
           *  - FORCE_LOGIN : Horizontal
           *  - ALLOWIFRAMELOGIN : Vertical
           *
           *
           * getUserQ | T | F (FORCE_LOGIN)
           * -----------------------------
           * T        | 1 | 2
           * F        | 3 | 4
           * (ALLOWIFRAMELOGIN)
           *
           * Cases:
           * 1. Delay resolve function till user is logged in
           * 2. Return null (if user not authorized)
           * 3. Force the redirect
           * 4. Return null (if user not authorized)
           *
           * NOTE:
           * Case 1 above will cause this method's promise to be a long stall
           * until the user completes the login process. This should allow the
           * app to forgo a reload is it should have waited till the entire
           * time till the user was successfully logged in.
           *
           * @method getUserQ
           *
           * @returns {Promise<User>} User - the authenticated user
           */
          getUserQ(): ng.IPromise<ngcommon.User | null> {
            const self = this;
            const q = $q.defer<ngcommon.User | null>()

            this.check()
              .then(user => {
                if(user) {
                  q.resolve(user)
                } else {
                  // Case 1 - ALLOWIFRAMELOGIN: true | FORCE_LOGIN: true
                  if(Config.ALLOWIFRAMELOGIN && Config.FORCE_LOGIN){
                    // Resolve with user once they have logged in
                    $rootScope.$on('userAuthenticated', (event: ng.IAngularEvent, user: User) => {
                      q.resolve(user)
                    })
                  }
                  // Case 2 - ALLOWIFRAMELOGIN: true | FORCE_LOGIN: false
                  if(Config.ALLOWIFRAMELOGIN && !Config.FORCE_LOGIN){
                    q.resolve(null)
                  }
                  // Case 3 - ALLOWIFRAMELOGIN: false | FORCE_LOGIN: true
                  if(!Config.ALLOWIFRAMELOGIN && Config.FORCE_LOGIN){
                    addEventListener('message', (event: any) => {
                      // Handle SSO login failure
                      if(event.data === 'iframe:ssoFailed'){
                        q.resolve(self.getUser())
                      }
                    })
                    q.resolve(null)
                  }
                  // Case 4 - ALLOWIFRAMELOGIN: false | FORCE_LOGIN: false
                  if(!Config.ALLOWIFRAMELOGIN && !Config.FORCE_LOGIN){
                    q.resolve(null) // or reject?
                  }
                }
              })
              .catch((err: Error) => console.log(err))

            return q.promise
          };

          check(): ng.IPromise<User>{
            const jwt = this.getJWT();

            if(!jwt) return $q.when(null);
            if(!this.isImplicitJWT(jwt)){ // Grant token
              return this.isExpired(jwt) ?
                      this.checkWithClient(jwt)
                        .then(jwt => this.getUserFromJWT(jwt)) : // Check with server
                      $q.when(this.getUserFromJWT(jwt));
            } else { // Implicit JWT
              return this.isExpired(jwt) ?
                      $q.reject(null) :
                      $q.when(this.getUserFromJWT(jwt));
            }
          }

          /**
           * Makes a call to a service hosting node-gpoauth to allow for a
           * token refresh on an expired token, or a token that has been
           * invalidated to be revoked.
           *
           * Note: Client as in hosting application:
           *    https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2
           *
           * @method checkWithClient
           * @param {jwt} - encoded accessToken/JWT
           *
           * @return {Promise<jwt>} - promise resolving with a JWT
           */
          checkWithClient(originalJWT?: string): ng.IPromise<string> {
            return Config.AUTH_TYPE === 'token' ?
                    $q.when(null) :
                    $http.get('/checktoken')
                          .then(() => this.getJWTfromLocalStorage())
          }

          //=====================================================

          /**
           * Extract token from current URL
           *
           * @method getJWTFromUrl
           *
           * @return {String | undefined} - JWT Token (raw string)
           */
          getJWTFromUrl(): string {
            const queryString = ($window && $window.location && $window.location.hash) ? $window.location.hash : $location.url();
            const res = queryString.match(/access_token=([^\&]*)/);
            return res && res[1];
          };

          /**
           * Load the JWT stored in cookie.
           *
           * @method getJWTfromCookie
           *
           * @return {JWT | undefined} An object wih the following format:
           */
          getJWTfromLocalStorage(): string {
            return this.getFromCookie(ACCESS_TOKEN_COOKIE)
          };

          /**
           * Attempt and pull JWT from the following locations (in order):
           *  - URL query parameter 'access_token' (returned from IDP)
           *  - Browser cookie (saved from previous request)
           *
           * @method getJWT
           *
           * @return {sting | undefined}
           */
          getJWT(): string {
            const jwt = this.getJWTFromUrl() || this.getJWTfromLocalStorage()
            // Only deny implicit tokens that have expired
            if(!jwt || (jwt && this.isImplicitJWT(jwt) && this.isExpired(jwt))) {
              return null;
            } else {
              return jwt;
            }
          };

          /**
           * Is a token expired.
           *
           * @method isExpired
           * @param {JWT} jwt - A JWT
           *
           * @return {boolean}
           */
          isExpired(jwt: string): boolean {
            const parsedJWT = this.parseJwt(jwt)
            if(parsedJWT){
              const now = (new Date()).getTime() / 1000;
              return now > parsedJWT.exp;
            }
            return true
          };

          /**
           * Is the JWT an implicit JWT?
           * @param jwt
           */
          isImplicitJWT(jwt: string): boolean {
            const parsedJWT = this.parseJwt(jwt)
            return parsedJWT && parsedJWT.implicit;
          }

          /**
           * Unsafe (signature not checked) unpacking of JWT.
           *
           * @param {string} token - Access Token (JWT)
           *
           * @return {Object} the parsed payload in the JWT
           */
          parseJwt(token: string): ngcommon.JWT {
            var parsed;
            if (token) {
              try {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                parsed = JSON.parse(atob(base64));
              } catch(e) { /* Don't throw parse error */ }
            }
            return parsed;
          };

          /**
           * Simple front end validion to verify JWT is complete and not
           * expired.
           *
           * Note:
           *  Signature validation is the only truly save method. This is done
           *  automatically in the node-gpoauth module.
           */
          validateJwt(token: string): boolean {
            var parsed = this.parseJwt(token);
            var valid = (parsed && parsed.exp && parsed.exp * 1000 > Date.now()) ? true : false;
            return valid;
          };

          /**
           * Removal of data when logging out.
           */
          private removeAuth(): void {
            // TODO: call to revoke endpoint
            delete $http.defaults.headers.common.Authorization;
            // Send null user as well (backwards compatability)
            $rootScope.$broadcast("userAuthenticated", null)
            $rootScope.$broadcast("userSignOut")
            // $http.defaults.useXDomain = false;
          };
        }

        return new AuthService();
      }
    ])

    /**
     * Interceptor that check for an updaed AccessToken coming from any request
     * and will take it and set it as the token to use in future outgoing
     * requests
     *
    */
    .factory('ng-common-AuthenticationInterceptor', function($injector: any, $window: ng.IWindowService){
      // Interceptors

      // Request Handler
      function requestHandler(config: ng.IRequestConfig){
        // Add the token from Local-storage to the outgoing request
        const AuthenticationService = $injector.get('AuthenticationService')
        const token = AuthenticationService.getJWT();
        config.headers['Authorization'] = token ? `Bearer ${token}` : '';

        return config;
      }

      // Apply handler to all responses (regular and error as to not miss
      // tokens passed from node-gpoauth even on 4XX and 5XX responses)
      return {
        request: requestHandler
      };
    })

    .config(function myAppConfig ($httpProvider:  ng.IHttpProvider) {
      $httpProvider.interceptors.push('ng-common-AuthenticationInterceptor');
    })


    .directive('gpLoginModal', ['$rootScope', 'AuthenticationService', 'GPConfig',
      function($rootScope, AuthenticationService, Config) {
        return {
          scope: {
            minimal: '@'
          },
          replace: true,
          template:
            `<div class="gpLoginCover" ng-show="requireLogin">

              <button class="btn btn-danger gpLoginCancelIframe pull-right"
                ng-show="!FORCE_LOGIN"
                ng-click="cancel()">
                Cancel
                <span class="gpicons times-circle"></span>
              </button>

              <!-- In order to keep the trigger in scope we use ng-show above and ng-if here -->
              <div class="gpLoginWindow" ng-if="requireLogin">
                <iframe id="gpLoginIFrame" src="/login?redirect_url=${encodeURIComponent(`${window.location.origin}/auth/loading?cachebuster=${(new Date()).getTime()}`)}&cachebuster=${(new Date()).getTime()}"></iframe>
              </div>

            </div>`,
          controller: function($scope, $element, $timeout) {
            $scope.requireLogin = false;
            $scope.FORCE_LOGIN = Config.FORCE_LOGIN;

            // Catch the request to display login modal
            $scope.$on('auth:requireLogin', function(){
              $timeout(function(){
                $scope.requireLogin = true;
                $rootScope.$broadcast('auth:iframeLoginShow')
              })
            });

            // Catch the request to display login modal
            $scope.$on('userAuthenticated', function(){
               $timeout(function(){
                $scope.requireLogin = false
                $rootScope.$broadcast('auth:iframeLoginHide')
              })
            });

            $scope.cancel = function(){
              console.log("CALLED")
              $scope.requireLogin = false
              $rootScope.$broadcast('auth:iframeLoginHide')
            }

          }
        };
      }
    ])


    .directive('gpLoginButton', ['$rootScope', '$timeout', 'AuthenticationService', 'GPConfig',
      function($rootScope, $timeout, AuthenticationService, Config) {
        return {
          scope: {
            minimal: '@'
        },
        replace: true,
        template: [

            '<div class="btn-account btn-group">' +

            //not logged in
            '  <a class="btn btn-link" ng-click="login()" ng-if="!user">Sign In</a>' +

            //logged in
            '  <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" ' +
            '   aria-expanded="false" ng-if="user">' +
            '     <span class="gpicons user"></span> ' +
            '     <span class="hidden-xs">{{::user.name}}</span> ' +
            '     <span class="caret"></span>' +
            '  </button>' +
            '  <ul class="dropdown-menu dropdown-menu-right" role="menu" ng-if="user">' +
            '    <li class="account-details">' +
            '      <div class="media">' +
            '        <div class="media-left">' +
            '          <div class="media-object">' +
            '            <span class="gpicons user u-text--xlg"></span>' +
            '          </div>' +
            '        </div>' +
            '        <div class="media-body">' +
            '          <div class="media-heading">{{::user.name}}</div>' +
            '          <div><em>{{::user.username}}</em></div>' +
            '          <div>{{::user.email}}</div>' +
            '          <div>{{::user.org}}</div>' +
            '        </div>' +
            '      </div>' +
            '    </li>' +
            '    <li class="divider"></li>' +
            '    <li><a target="_blank" href="{{::IDP_BASE_URL}}/profile">Edit Info</a></li>' +
            '    <li><a target="_blank" href="{{::IDP_BASE_URL}}/updatepw">Change Password</a></li>' +
            '    <li><a href ng-click="logout()">Sign Out</a></li>' +
            '  </ul>' +


            '</div>'
        ].join(' '),
        controller: function($scope, $rootScope, $element) {

          $scope.IDP_BASE_URL = Config.IDP_BASE_URL

          if ($scope.minimal === 'true') $scope.minimal = true;
          if ($scope.minimal !== true) $scope.minimal = false;

          $scope.user = AuthenticationService.getUser();

          $rootScope.$on('userAuthenticated', function(event: ng.IAngularEvent, user: any){
            $timeout(function(){ $scope.user = user;})
          });

          $rootScope.$on('userSignOut', function(event: ng.IAngularEvent){
            $timeout(function(){ $scope.user = null; })
          });

          $scope.login = function() { AuthenticationService.login(); };

          $scope.logout = function() { AuthenticationService.logout(); };
        }
      };
    }
    ])



.directive('gpAccountDetails', ['$timeout', 'AuthenticationService', 'GPConfig',
  function($timeout, AuthenticationService, Config) {

      return {
          scope: {},
          replace: true,
          template: [
              '<div>' +
              '  <div class="media">',
              '    <div class="media-left">',
              '        <div class="media-object">',
              '            <span class="gpicons user u-text--xlg"></span>',
              '        </div>',
              '    </div>',
              '    <div class="media-body" ng-if="user">',
              '       <div class="media-heading">{{::user.name}}</div>' +
              '       <div><small><em>{{::user.username}}</em></small></div>' +
              '       <div><small>{{::user.email}}</small></div>' +
              '       <div><small>{{::user.org}}</small></div>' +
              '    </div>',
              '    <div class="media-body" ng-if="!user">',
              '       <div class="media-heading">Please Sign In</div>' +
              '       <div><small>Sign in to your GeoPlatform account or register a new account.</small></div>' +
              '    </div>',
              '  </div>',
              '  <hr/>',
              '  <div ng-if="user">',
              '    <button type="button" class="btn btn-sm btn-accent pull-right" ng-click="logout()">Sign Out</button>' +
              '    <a class="btn btn-sm btn-default" target="_blank" href="{{::IDP_BASE_URL}}/profile">Edit Details</a>' +
              '  </div>',
              '  <div ng-if="!user">',
              '    <button type="button" class="btn btn-sm btn-accent pull-right" ng-click="login()">Sign In</button>' +
              '    <a class="btn btn-sm btn-default" target="_blank" href="{{::IDP_BASE_URL}}/register">Register</a>' +
              '  </div>',
              '</div>'
          ].join(' '),
          controller: function($scope: any, $rootScope: any, $element: ng.IRootElementService, $timeout: ng.ITimeoutService) {

            $scope.IDP_BASE_URL = Config.IDP_BASE_URL
            $scope.user = AuthenticationService.getUser();

            $rootScope.$on('userAuthenticated', function(event: ng.IAngularEvent, user: any){
              $timeout(function(){ $scope.user = user; })
            });

            $rootScope.$on('userSignOut', function(event: ng.IAngularEvent){
              $timeout(function(){ $scope.user = null; })
            });

            $scope.login = function() { AuthenticationService.login(); };

            $scope.logout = function() { AuthenticationService.logout(); };

          }
      };
    }
  ]);

})(angular);
