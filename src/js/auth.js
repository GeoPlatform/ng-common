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
      function($q, $http, $location, $route, $rootScope, $window, Config) {

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

      var STATUS = {
        NONE: 0,
        INITIALIZING: -1, //auth check in progress
        INITIALIZED: 1 //auth check completed
      };


      /**
       * Authentication Service
       */
      var Service = function() {

        var self = this;


        this.status = STATUS.NONE;

        //$q version of getUser
        this.getUserQ = function() {
          var deferred = $q.defer();
          this.getUser(function(user) {
            deferred.resolve(user);
          });
          return deferred.promise;
        };

        /**
         * If the callback parameter is specified, this method
         * will return undefined. Otherwise, it returns the user (or null).
         *
         * @param callback optional function to invoke with the user
         * @return object representing current user
         */
        this.getUser = function(callback) {
          if (callback && typeof(callback) === 'function') {

            // console.log("Getting user info: " + self.status + ", " + JSON.stringify(_user||{empty:true}));

            //if already checked, return what we have
            if (self.status === STATUS.INITIALIZED)
              callback(_user);
            //if not in process of checking, check
            else if (self.status !== STATUS.INITIALIZING) {
              //if hasn't been checked for auth yet, do that now
              self.check().then(function(_user) {
                self.status = STATUS.INITIALIZED;
                callback(_user);
              }, function() {
                self.status = STATUS.INITIALIZED;
                callback(null);
              });
            }
            //if in process of checking, wait until it finishes
            else {
              setTimeout(function() {
                self.getUser(callback);
              }, 500);
            }
            return;
          }
          return _user;
        };

        /**
         * Redirects the page to the login site
         */
        this.login = function() {

          //use current window
          var current = window.location.href;
          var redirect = (Config.CALLBACK) ? Config.CALLBACK : current;

          //check auth type to set login URL: Implicit -> to IDP, Grant -> Resource Provider Login URL
          var loginUrl = (Config.AUTH_TYPE === 'implicit') ? Config.IDP_BASE_URL +
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
          delete window.localStorage.sub;
          delete window.localStorage.at;
          _user = null;
          var url = Config.IDP_BASE_URL + '/auth/revoke';
          $http.get(url)
            .then(function(response) {
              self.removeAuth();
              self.forceLogin();
            }, function(err) {
              console.log(err);
            });
        };

        /**
         * Optional force redirect for non-public services
         */
        this.forceLogin = function(){
          if(Config.FORCE_LOGIN && Config.LOGIN_URL){
            window.location = Config.LOGIN_URL;
          }
          return;
        };

        /**
         * Get protected user profile
         */
        this.getOauthProfile = function() {
          var Q = $q.defer();
          //check to make sure we can make called
          if (window.localStorage.at && window.localStorage.sub) {
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
         * Queries oauth if the current session is authenticated
         * @return promise - then(function(user) {}, function(response){})
         */
        this.check = function() {

          var deferred = $q.defer();

          self.status = STATUS.INITIALIZING;

          var regex = new RegExp('access_token=.*type=Bearer', 'g'),
            hashParams = $location.hash(),
            accessToken,
            current = ($window && $window.location && $window.location.hash)? $window.location.hash : $location.url(),
            getParams = current.match(regex);

          if (getParams) {
            var tokenString = getParams[0];
            accessToken = tokenString.split('&')[0]
              .split('=')[1];
          }

          var user = self.parseJwt(accessToken);
          _user = (user) ?
            new User({
              id: user.sub,
              username: user.username,
              email: user.email,
              name: user.name,
              org: user.org,
              exp: user.exp
            }) :
            null;

          if (_user) {
            self.setAuth(_user, accessToken);
          } else if (window.localStorage.sub && window.localStorage.at && self.validateJwt(window.localStorage.at)) {
            self.setAuth(window.localStorage.getObject('sub'), window.localStorage.at);
          } else {
            self.removeAuth();
          }

          //clean hosturl on redirect from oauth
          if (regex.test(current)) {
            var cleanUrl = current.replace(regex, '');
            $window.location = cleanUrl;
          }

          deferred.resolve(_user);
          return deferred.promise;

        };

        //=====================================================

        //unpack jwt
        this.parseJwt = function(token) {
          var parsed;
          if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            parsed = JSON.parse(atob(base64));
          }
          return parsed;
        };

        this.validateJwt = function(token) {
          var parsed = self.parseJwt(token);
          var valid = (parsed && parsed.exp && parsed.exp * 1000 > Date.now()) ? true : false;
          //TODO: chk jwt signature too
          return valid;
        };

        this.setAuth = function(user, accessToken){
          _user = user;
          window.localStorage.setObject('sub', user);
          window.localStorage.at = accessToken;
          $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
          $http.defaults.useXDomain = true;
          return;
        };

        this.removeAuth = function(){
          delete window.localStorage.sub;
          delete window.localStorage.at;
          _user = null;
          $http.defaults.useXDomain = false;
          delete $http.defaults.headers.common.Authorization;
          return;
        };

        //initialize with auth check
        this.check().then(function(user) {
          self.status = STATUS.INITIALIZED;
        }, function(err) {
          self.status = STATUS.INITIALIZED;
        }).catch(function(e) {
          // console.log("Initial auth check errored");
        });

      };

      return new Service();

    }])

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

            //watch user for changes (timeouts)
            var watcher = $scope.$watch(function() {
              return AuthenticationService.getUser();
            }, function(newUser) {
              $scope.user = newUser;
            });

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

            //watch user for changes (timeouts)
            var watcher = $scope.$watch(function() {
              return AuthenticationService.getUser();
            }, function(newUser) {
              $scope.user = newUser;
            });

            $scope.$on('$destroy', function() {
              watcher(); //destroy watcher
            });

          }
        };
      }
    ])

  ;

})(angular);
