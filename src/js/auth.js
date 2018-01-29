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
  function getJWTFromUrl() {
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
      function($q, $http, $location, $rootScope, $window, Config) {

        //extend Storage prototype
        Storage.prototype.setObject = function(key, value) {
          this.setItem(key, btoa(JSON.stringify(value)));
        };

        Storage.prototype.getObject = function(key) {
          var value = atob(this.getItem(key));
          return value && JSON.parse(value);
        };

        function User(opts) {
          for (var p in opts) {
            this[p] = opts[p];
          }
          if (!this.id && this.username)
            this.id = this.username;

          this.toJSON = function() {
            return {
              id: this.id,
              username: this.username,
              name: this.name,
              email: this.email,
              org: this.org,
              exp: this.exp
            };
          };

          this.clone = function() {
            return new User(this.toJSON());
          };

          this.compare = function(arg) {
            if (arg instanceof User) {
              return this.id === arg.id;
            } else if (typeof(arg) === 'object') {
              return typeof(arg.id) !== 'undefined' &&
                arg.id === this.id;
            }
            return false;
          };

          this.isAuthorized = function(role) {
            let env = Config.env || Config.ENV || Config.NODE_ENV;
            if(env === 'dev' || env === 'development') return true;

            return this.groups && 
                    !!this.groups
                            .map(g => g.name)
                            .filter(n => n === role)
                            .length;
          };
        }

        /**
         * Authentication Service
         */
        var Service = function() {

          var self = this;

          //$q version of getUser
          this.getUserQ = function() {
            return $q.when(self.getUser())
          };

          /**
           * Redirects the page to the login site
           */
          this.login = function() {

            //use current window
            var current = window.location.href;
            var redirect = (Config.CALLBACK) ? Config.CALLBACK : current;

            if (Config.AUTH_TYPE !== 'grant' && Config.AUTH_TYPE !== 'token') {
              //fail this request
              throw new Error("Invalid authentication request type.  Must be 'token' or 'grant'.");
            }

            //check auth type to set login URL: Implicit -> to IDP, Grant -> Resource Provider Login URL

            var loginUrl = (Config.AUTH_TYPE === 'token') 
                  ? Config.IDP_BASE_URL +
                    '/auth/authorize?client_id=' + Config.APP_ID + 
                    '&response_type=' + Config.AUTH_TYPE + 
                    '&redirect_uri=' + encodeURIComponent(redirect)
                  // NOTE: /login is the default login endpoint for node-gpoauth
                  : Config.LOGIN_URL || '/login';

            window.location = loginUrl;

            //This could be writen to use an modal / pop-up for login so you don't have to lose your current page
            //Logout already executes using a background call
          };

          /**
           * Performs background logout and requests jwt revokation
           */
          this.logout = function() {
            //implicitly remove incase the idp is down and the revoke call does not work
            self.removeAuth();

            $http.get(Config.IDP_BASE_URL + '/auth/revoke')
              .then(function(response) {
                self.removeAuth();
                //goto logout page
                if (Config.LOGOUT_URL) {
                  Config.FORCE_LOGIN = false;
                  window.location = Config.LOGOUT_URL;
                } else {
                  window.location.hash = '';
                  window.location = Config.PORTAL_URL || window.location.host;
                }
              }, function(err) {
                console.log(err);
              });
          };

          /**
           * Optional force redirect for non-public services
           */
          this.forceLogin = function() {
            self.login();
          };

          /**
           * Get protected user profile
           */
          this.getOauthProfile = function() {
            var Q = $q.defer();
            //check to make sure we can make called
            if (self.getJWT()) {
              var url = Config.IDP_BASE_URL + '/api/profile';
              $http.get(url)
                .then(function(response) {
                  //when we get it, save it so we don't have to hit the IDP so many times
                  Q.resolve(response.data);
                }, function(err) {
                  console.log(err);
                  Q.reject(err);
                });
            }
            return Q.promise;
          };

          /**
           * Unpacks JWT to see if session is valid.
           *
           * Side Effects:
           *  - Will redirect user to login url if FORCE_LOGIN is set an no valid user is found
           *
           * @return {User} - the authenticated user or undefined
           */
          this.init = function() {
            // Pull user from either LocalStorage or the JWT (or the URL)
            const jwt = self.getJWT();

            // Save JWT in Auhorization Header
            if(jwt) self.setAuth(jwt);

            // No valid userdata found
            if(!jwt) {
              // Redirect if settings set
              if(Config.FORCE_LOGIN === true) self.forceLogin();
            }

            //clean hosturl on redirect from oauth
            if (getJWTFromUrl()) {
              const current = ($window && $window.location && $window.location.hash) ? $window.location.hash : $location.url()
              var cleanUrl = current
                              .replace(/access_token=([^\&]*)/, '')
                              .replace(/token_type=[^\&]*/, '');
              $window.location = cleanUrl;
            }

            // return the user
            return self.getUserFromJWT(jwt)
          };

          /**
           * Get User object from the JWT.
           * 
           * If no JWT is provided it will be looked for at the normal JWT
           * locations (localStorage or URL queryString).
           * 
           * @param {JWT} [jwt] - the JWT to extract user from. 
           */
          this.getUserFromJWT = function(jwt) {
            if(!jwt) jwt = self.getJWT();
            const user = self.parseJwt(jwt)
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
          this.getUser = function(callback) {
            const user = self.isExpired(self.getJWT()) ? 
                          null :
                          self.getUserFromJWT();
            return callback && typeof(callback) === 'function' ?
              callback(user) :
              user;
          }

          /**
           * Check function being used by some front end apps already.
           * (wrapper for getUser)
           */
          this.check = function(){
            const jwt = self.getJWT();
            return jwt && !self.isExpired(jwt) ? 
                    $q.when(self.getUserFromJWT(jwt)) :
                    $q.reject(null);
          }

          //=====================================================

          /**
           * Extract token from current URL
           *
           * @method getJWTFromUrl
           *
           * @return {String | undefined} - JWT Token (raw string)
           */
          this.getJWTFromUrl = function(){
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
          this.getJWTfromLocalStorage = function(){
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
          this.getJWT = function(){
            const jwt = self.getJWTFromUrl() || self.getJWTfromLocalStorage()
            // Only deny implicit tokens that have expired
            if(self.isExpired(jwt) && self.isImplicitJWT(jwt)) {
              self.removeAuth();
              if(Config.FORCE_LOGIN === true) self.forceLogin();
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
          this.clearLocalStorageJWT = function(){
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
          this.isExpired = function(jwt){
            const exp = jwt && self.parseJwt(jwt).exp;
            const now = (new Date()).getTime() / 1000;
            return now > exp;
          };

          this.isImplicitJWT = function(jwt){
            return jwt && self.parseJwt(jwt).implicit;
          }

          /**
           * Unsafe (signature not checked) unpacking of JWT.
           *
           * @param {string} token - Access Token (JWT)
           *
           * @return {Object} the parsed payload in the JWT
           */
          this.parseJwt = function(token) {
            var parsed;
            if (token) {
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace('-', '+').replace('_', '/');
              parsed = JSON.parse(atob(base64));
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
          this.validateJwt = function(token) {
            var parsed = self.parseJwt(token);
            var valid = (parsed && parsed.exp && parsed.exp * 1000 > Date.now()) ? true : false;
            return valid;
          };

          /**
           * Save JWT to localStorage and in the request headers for accessing
           * protected resources.
           * 
           * @param {JWT} jwt 
           */
          this.setAuth = function(jwt) {
            window.localStorage.gpoauthJWT = jwt;
            $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
            $http.defaults.useXDomain = true;
          };

          /**
           * Purge the JWT from localStorage and authorization headers.
           */
          this.removeAuth = function() {
            delete window.localStorage.gpoauthJWT;
            delete $http.defaults.headers.common.Authorization;
            $http.defaults.useXDomain = false;
          };

          //initialize with auth check
          this.init()

        };

        return new Service();

      }
    ])

    /**
     * Interceptor that check for an updaed AccessToken coming from any request
     * and will take it and set it as the token to use in future outgoing
     * requests
     */
    .factory('ng-common-AuthenticationInterceptor', function($injector, $window){
      // Interceptor
      return {
        response: function(resp) {
          const jwt = getJWTFromUrl();
          const authHeader = resp.headers('Authorization');

          if(jwt){
            const AuthenticationService = $injector.get('AuthenticationService')
            AuthenticationService.setAuth(jwt);
          } else if (authHeader) {
            const AuthenticationService = $injector.get('AuthenticationService')
            AuthenticationService.setAuth(authHeader.replace('Bearer ',''));
          }

          return resp;
        }
      };
    })

    .config(function myAppConfig ($httpProvider) {
      $httpProvider.interceptors.push('ng-common-AuthenticationInterceptor');
    })


    .directive('gpLoginButton', ['$timeout', 'AuthenticationService', 'GPConfig',
      function($timeout, AuthenticationService, Config) {
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

            AuthenticationService.getUser(function(user) {
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

            AuthenticationService.getUser(function(user) {
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
    ])

  ;

})(angular);
