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
        }

        var _user = null;

        /**
         * Authentication Service
         */
        var Service = function() {

          var self = this;


          // this.status = STATUS.NONE;

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
            var loginUrl = (Config.AUTH_TYPE === 'token') ? Config.IDP_BASE_URL +
              '/auth/authorize?client_id=' + Config.APP_ID + '&response_type=' +
              Config.AUTH_TYPE + '&redirect_uri=' + encodeURIComponent(redirect) : Config.LOGIN_URL;

            window.location = loginUrl;

            //This could be writen to use an modal / pop-up for login so you don't have to lose your current page
            //Logout already executes using a background call
          };

          /**
           * Performs background logout and requests jwt revokation
           */
          this.logout = function() {
            //implicitly remove incase the idp is down and the revoke call does not work
            _user = null;
            self.clearLocalStorageJWT();

            $http.get(Config.IDP_BASE_URL + '/auth/revoke')
              .then(function(response) {
                self.removeAuth();
                //goto logout page
                if (Config.LOGOUT_URL) {
                  Config.FORCE_LOGIN = false;
                  window.location = Config.LOGOUT_URL;
                } else {
                  window.location = Config.PORTAL_URL || "https://www.geoplatform.gov";
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
            if (self.getJWTfromLocalStorage()) {
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

          /*
           * Set the _user property in this scope
           */ 
          this.setUser = function(user){ _user = user }

          /**
           * Unpacks JWT to see if session is valid.
           * 
           * Side Effects: 
           *  - Sets the _user property
           *  - Sets the Authorize header if valid user found (this.setAuth)
           *  - Will redirect user to login url if FORCE_LOGIN is set an no valid user is found
           * 
           * @return {User} - the authenticated user or undefined
           */
          this.check = function() {
            // Pull user from either LocalStorage or the JWT (or the URL)
            const jwt = self.getJWT();

            // Save JWT in Auhorization Header
            if(jwt && !self.isExpired(jwt)){
              self.setAuth(jwt); 
              const user = self.parseJwt(jwt);
              // slightly differnet mapping ;)
              self.setUser(new User({
                id: user.sub,
                username: user.username,
                email: user.email,
                name: user.name,
                org: user.org,
                exp: user.exp
              }))

              //clean hosturl on redirect from oauth
              const current = ($window && $window.location && $window.location.hash) ? $window.location.hash : $location.url()
              if (self.getJWTFromUrl()) {
                var cleanUrl = current.replace(/access_token=([^\&]*)/, '');
                $window.location = cleanUrl;
              }

            // No valid userdata found
            } else { 
              self.removeAuth(); 
              // Redirect if settings set
              if(Config.FORCE_LOGIN === true) self.forceLogin();
            }

            // return the user
            return _user
          };

          /**
           * If the callback parameter is specified, this method
           * will return undefined. Otherwise, it returns the user (or null).
           * 
           * Side Effects: 
           *  - This property sets the _user property for the enclosing scope
           *  - Will redirect users if no valid JWT was found
           *
           * @param callback optional function to invoke with the user
           * @return object representing current user
           */
          this.getUser = function(callback) {
            // better check 'em first
            self.check(); // Sideffects will redirect browser if JWT invalid

            return callback && typeof(callback) === 'function' ?
              callback(_user) :
              _user;
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
           * @method getJWT 
           * 
           * @return {JWT | undefined} 
           */
          this.getJWT = function(){
            return self.getJWTFromUrl() || self.getJWTfromLocalStorage()
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
            return exp > now;
          };

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
           * 
           */
          this.validateJwt = function(token) {
            var parsed = self.parseJwt(token);
            var valid = (parsed && parsed.exp && parsed.exp * 1000 > Date.now()) ? true : false;
            //TODO: chk jwt signature too
            return valid;
          };

          this.setAuth = function(jwt) {
            window.localStorage.gpoauthJWT = jwt;
            $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
            $http.defaults.useXDomain = true;
            return;
          };

          this.removeAuth = function() {
            _user = null;
            delete window.localStorage.gpoauthJWT;
            delete $http.defaults.headers.common.Authorization;
            $http.defaults.useXDomain = false;
            return;
          };

          //initialize with auth check
          this.check()

        };

        return new Service();

      }
    ])

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

            $scope.$on('$destroy', function() {
              watcher(); //destroy watcher
            });
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

            $scope.$on('$destroy', function() {
              watcher(); //destroy watcher
            });

          }
        };
      }
    ])

  ;

})(angular);
