/// <reference path="../types.ts" />

(function(angular) {

  'use strict';

  //flag on whether we're in dev env
  // function isDEV() {
  //     return "localhost" === window.location.hostname ||
  //         ~window.location.hostname.indexOf("192.168")||
  //         ~window.location.hostname.indexOf("localhost")||
  //         ~window.location.hostname.indexOf("10.0");
  // }

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
      function($q: ng.IQService, $http: ng.IHttpService, $location: ng.ILocationService, $rootScope: ng.IRootScopeService, $window: ng.IWindowService, Config: GeoPlatform) {

        //extend Storage prototype
        Storage.prototype.setObject = function(key: string, value: any) {
          this.setItem(key, btoa(JSON.stringify(value)));
        };

        Storage.prototype.getObject = function(key: string) {
          var value = atob(this.getItem(key));
          return value && JSON.parse(value);
        };

        class User {
          id: string
          username: string
          name: string
          email: string
          org: string
          groups: orgGroupArray
          exp: number

          constructor(opts: JWT) {
            this.id = opts.sub
            this.username = opts.username
            this.name = opts.name
            this.email = opts.email
            this.org = opts.orgs[0] && opts.orgs[0].name
            this.groups = opts.groups
            this.exp = opts.exp
          }

          toJSON() {
            return JSON.parse(JSON.stringify(this));
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
            if(env === 'dev' || env === 'development') return true;

            return this.groups &&
                    !!this.groups
                            .map(g => g.name)
                            .filter(n => n === role)
                            .length;
          };
        }

        type userOrNothin = User | null | undefined

        /**
         * Authentication Service
         */
        class AuthService {

          constructor(){ this.init(); }

          /**
           * Redirects or displays login window the page to the login site
           */
          login() {
            // Check implicit we need to actually redirect them
            if(Config.AUTH_TYPE === 'token') {
              window.location.href = Config.IDP_BASE_URL +
                      '/auth/authorize?client_id=' + Config.APP_ID +
                      '&response_type=' + Config.AUTH_TYPE +
                      '&redirect_uri=' + encodeURIComponent(Config.CALLBACK || '/login')

            // Otherwise pop up the login modal
            } else {
              // Iframe login
              if(Config.ALLOWIFRAMELOGIN === true || Config.ALLOWIFRAMELOGIN === 'true' ){
                $rootScope.$broadcast('auth:requireLogin')

                // Redirect login
              } else {
                window.location.href = Config.LOGIN_URL || `/login` +
                                    `?redirect_url=${encodeURIComponent(window.location.href)}`
              }
            }
          };

          /**
           * Performs background logout and requests jwt revokation
           */
          logout() {
            const self = this;

            $http.get(Config.IDP_BASE_URL + '/auth/revoke')
            .then(response => {
              window.location.href = Config.LOGOUT_URL ?
                                      Config.LOGOUT_URL :
                                      window.location.host
            })
            .catch((err: Error) => console.log(err))
            //implicitly remove incase the idp is down and the revoke call does not work
            .finally(() => self.removeAuth());
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
          getOauthProfile() {
            const Q = $q.defer();

            //check to make sure we can make called
            if (this.getJWT()) {
              $http.get(Config.IDP_BASE_URL + '/api/profile')
                .then(response =>  Q.resolve(response))
                .catch(err => Q.reject(err))
            } else {
              Q.reject(null)
            }

            return Q.promise
          };

          /**
           * Unpacks JWT to see if session is valid.
           *
           * Side Effects:
           *  - Will redirect user to login url if FORCE_LOGIN is set an no valid user is found
           *
           * @return {User} - the authenticated user or undefined
           */
          init(): User {
            const jwt = this.getJWT();
            if(jwt){
               this.setAuth(jwt); // Save JWT in Auhorization Header

            // No valid userdata found
            } else {
              // Redirect if settings set
              if(Config.FORCE_LOGIN === true) this.forceLogin();
            }

            //clean hosturl on redirect from oauth
            if (getJWTFromUrl()) {
              if(window.history && window.history.replaceState){
                window.history.replaceState( {} , 'Remove token from URL', $window.location.href.replace(/[\?\&\%3F]access_token=[^\&]*\&token_type=Bearer/, '') )
              } else {
                $window.location.search.replace(/[\?\&]access_token=[^\&]*\&token_type=Bearer/, '')
              }
            }

            // return the user
            return this.getUserFromJWT(jwt)
          };

          /**
           * Get User object from the JWT.
           *
           * If no JWT is provided it will be looked for at the normal JWT
           * locations (localStorage or URL queryString).
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
          getUser(callback?: (user: User) => undefined): userOrNothin {
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

          //$q version of getUser
          getUserQ() {
            return this.check();
          };

          /**
           * Check function being used by some front end apps already.
           * (wrapper for getUser)
           *
           * @method check
           * @returns {User} - ng-common user object or null
           */
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
          checkWithClient(originalJWT: string){
            return $http.get('/checktoken')
                    .then(resp => {
                      const header = resp.headers('Authorization')
                      const newJWT = header && header.replace('Bearer ','')
                      if(newJWT) this.setAuth(newJWT);

                      return newJWT ? newJWT : originalJWT;
                    })
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
           * Load the JWT stored in local storage.
           *
           * @method getJWTfromLocalStorage
           *
           * @return {JWT | undefined} An object wih the following format:
           */
          getJWTfromLocalStorage(): string{
            return window.localStorage.gpoauthJWT
          };

          /**
           * Attempt and pull JWT from the following locations (in order):
           *  - URL query parameter 'access_token' (returned from IDP)
           *  - Browser local storage (saved from previous request)
           *
           * NOTE:
           *  This call will redirect user to login if the Config.FORCE_LOGIN
           *  option is set to true.
           *
           * @method getJWT
           *
           * @return {JWT | undefined}
           */
          getJWT(): string {
            const jwt = this.getJWTFromUrl() || this.getJWTfromLocalStorage()
            // Only deny implicit tokens that have expired
            if(!jwt || (jwt && this.isExpired(jwt) && this.isImplicitJWT(jwt))) {
              this.removeAuth();
              if(Config.FORCE_LOGIN === true) this.forceLogin();
              return null;

            } else {
              return jwt;
            }
          };

          /**
           * Remove the JWT saved in local storge.
           *
           * @method clearLocalStorageJWT
           *
           * @return  {undefined}
           */
          clearLocalStorageJWT(){
            delete window.localStorage.gpoauthJWT;
          };

          /**
           * Is a token expired.
           *
           * @method isExpired
           * @param {JWT} jwt - A JWT
           *
           * @return {boolean}
           */
          isExpired(jwt: string){
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
          isImplicitJWT(jwt: string){
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
          parseJwt(token: string): JWT {
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
          validateJwt(token: string) {
            var parsed = this.parseJwt(token);
            var valid = (parsed && parsed.exp && parsed.exp * 1000 > Date.now()) ? true : false;
            return valid;
          };

          /**
           * Save JWT to localStorage and in the request headers for accessing
           * protected resources.
           *
           * @param {JWT} jwt
           */
          setAuth(jwt: string) {
            window.localStorage.gpoauthJWT = jwt;
            $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
            // $http.defaults.useXDomain = true;
          };

          /**
           * Purge the JWT from localStorage and authorization headers.
           */
          removeAuth() {
            delete window.localStorage.gpoauthJWT;
            delete $http.defaults.headers.common.Authorization;
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
     */
    .factory('ng-common-AuthenticationInterceptor', function($injector: any, $window: ng.IWindowService){
      // Interceptor
      return {
        response: function(resp: ng.IHttpResponse<any>) {
          const jwt = getJWTFromUrl();
          const authHeader = resp.headers('Authorization');

          if(jwt){
            const AuthenticationService = $injector.get('AuthenticationService')
            AuthenticationService.setAuth(jwt);
          } else if (authHeader) {
            const AuthenticationService = $injector.get('AuthenticationService')
            const token = authHeader.replace('Bearer', '').trim();
            AuthenticationService.setAuth(token);
          }

          return resp;
        }
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
          template: [
            '<div class="gpLoginCover" ng-if="requireLogin">' +
            '   <div class="gpLoginWindow">'  +
            '     <iframe src="/login"></iframe>' +
            '   </div>' +
            '</div>'
          ].join(' '),
          controller: function($scope, $element) {
            $scope.requireLogin = false;

            function startAuthIntervalCheck(delay: number){
              // Setup check for localstorage set and close iframe when set
              const timeout = setInterval(function(){
                AuthenticationService.check()
                .then((user: any) => {
                  if(user){
                    // close iframe
                    $scope.requireLogin = false;
                    $rootScope.$broadcast("userAuthenticated", user)
                    clearTimeout(timeout) // All Done here
                    AuthenticationService.init()
                  }
                })
              }, delay)
            }

            // Catch the request to display login modal
            $scope.$on('auth:requireLogin', function(){
              $scope.requireLogin = true;
              startAuthIntervalCheck(500);
            });
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
            '     <span class="glyphicon glyphicon-user"></span> ' +
            '     <span class="hidden-xs">{{::user.name}}</span> ' +
            '     <span class="caret"></span>' +
            '  </button>' +
            '  <ul class="dropdown-menu dropdown-menu-right" role="menu" ng-if="user">' +
            '    <li class="account-details">' +
            '      <div class="media">' +
            '        <div class="media-left">' +
            '          <div class="media-object">' +
            '            <span class="glyphicon glyphicon-user glyphicon-xlg"></span>' +
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
            '    <li><a href="{{::idpUrl}}/modifyuser.html">Edit Info</a></li>' +
            '    <li><a href="{{::idpUrl}}/changepassword.html">Change Password</a></li>' +
            '    <li><a href ng-click="logout()">Sign Out</a></li>' +
            '  </ul>' +


            '</div>'
        ].join(' '),
        controller: function($scope, $element) {

            if ($scope.minimal === 'true') $scope.minimal = true;
            if ($scope.minimal !== true) $scope.minimal = false;

            $scope.idpUrl = Config.idmUrl;
            // console.log("IDM Base Url: " + Config.idmUrl);

            AuthenticationService.getUser(function(user: any) {
              $timeout(function() {
                $scope.user = user;
              }, 100);
            });

            $scope.login = function() {
                $scope.user = AuthenticationService.login();
            };

            $scope.logout = function() {
                $scope.user = AuthenticationService.logout();
            };

            $rootScope.$on('userAuthenticated', (event: Event, user: any) => {
              $scope.user = user;
            })
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
              '            <span class="glyphicon glyphicon-user glyphicon-xlg"></span>',
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
              '    <a class="btn btn-sm btn-default" href="{{::idpUrl}}/modifyuser.html">Edit Details</a>' +
              '  </div>',
              '  <div ng-if="!user">',
              '    <button type="button" class="btn btn-sm btn-accent pull-right" ng-click="login()">Sign In</button>' +
              '    <a class="btn btn-sm btn-default" href="{{::idpUrl}}/registeruser.html">Register</a>' +
              '  </div>',
              '</div>'
          ].join(' '),
          controller: function($scope, $element) {

              $scope.idpUrl = Config.idmUrl;

              AuthenticationService.getUser(function(user: any /* TODO: lift User */) {
                $timeout(function() {
                  $scope.user = user;
                }, 100);
              });

              $scope.login = function() {
                  $scope.user = AuthenticationService.login();
              };

              $scope.logout = function() {
                  $scope.user = AuthenticationService.logout();
              };

          }
      };
    }
  ]);

})(angular);
