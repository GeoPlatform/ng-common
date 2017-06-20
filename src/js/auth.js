(function(angular) {

    'use strict';

    //flag on whether we're in dev env
    function isDEV() {
        return "localhost" === window.location.hostname ||
            ~window.location.hostname.indexOf("192.168")||
            ~window.location.hostname.indexOf("localhost")||
            ~window.location.hostname.indexOf("10.0");
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
    .service('AuthenticationService', ['$q', '$http', 'GPConfig', function($q, $http, Config) {

        // console.log("IDSP Base Url: " + Config.idspUrl);

        //decode jwt here

        function User(opts) {
            for(var p in opts) {
                this[p] = opts[p];
            }
            if(!this.id && this.username)
                this.id = this.username;

            this.toJSON = function() {
                return {
                    id: this.id,
                    username: this.username,
                    name: this.name,
                    email: this.email,
                    org: this.org
                };
            };
            this.clone = function() {
                return new User(this.toJSON());
            };
            this.compare = function(arg) {
                if(arg instanceof User) {
                    return this.id === arg.id;
                } else if(typeof(arg) === 'object') {
                    return typeof(arg.id) !== 'undefined' &&
                        arg.id === this.id;
                }
                return false;
            };
        }

        var TEST_USER = new User({
            id: "tester",
            username: "tester",
            email: "tester@geoplatform.us",
            name: "John Test",
            org: "Other"
        });

        var _user = null;

        if(isDEV()) {

            /*
             * If testing when user is not logged in, inject the following before
             *  this ng-common library is included in the page:
             *
             *     GeoPlatform.TEST_NO_AUTH = true;
             *
             *  but be sure to inject AFTER the GeoPlatform configuration object exists!
             */
            if(GeoPlatform && GeoPlatform.TEST_NO_AUTH)
                _user = null;
            else
                _user = TEST_USER.clone();
        }

        var STATUS = {
            NONE: 0,
            INITIALIZING: -1,   //auth check in progress
            INITIALIZED: 1      //auth check completed
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
                this.getUser(function(user) { deferred.resolve(user); });
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
                if(callback && typeof(callback) === 'function') {

                    // console.log("Getting user info: " + self.status + ", " + JSON.stringify(_user||{empty:true}));

                    //if already checked, return what we have
                    if(self.status === STATUS.INITIALIZED)
                        callback(_user);
                    //if not in process of checking, check
                    else if(self.status !== STATUS.INITIALIZING) {
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
            this.login = function () {
                // if(isDEV() && !(GeoPlatform && GeoPlatform.TEST_NO_AUTH)) {
                //     _user = TEST_USER.clone();
                //     return _user;
                // }
                //use current window
                var current = window.location.href;
                //client id, returnto url
                //http://localhost:8889/auth/authorize?client_id=101&response_type=token&redirect_uri=http://localhost/implicit&scope=read,edit
                //can return to jwt processing url
                window.location = Config.IDP_BASE_URL + '/auth/authorize?client_id=' +
                  Config.APP_ID + '&response_type=' +
                  Config.AUTH_TYPE + '&redirect_uri=' + encodeURIComponent(current);

                //use modal pop-up
            };

            /**
             * Redirects the page to the logout site
             */
            this.logout = function() {
                if(isDEV()) {
                    _user = null;
                    return _user;
                }
                var current = window.location.href;
                window.location = Config.idspUrl + '/module.php/core/as_logout.php?AuthId=geosaml&ReturnTo=' + encodeURIComponent(current);
            };


            /**
             * Queries simplesamlphp if the current session is authenticated
             * @return promise - then(function(user) {}, function(response){})
             */
            this.check = function() {

                var deferred = $q.defer();

                if(isDEV()) {
                    // console.log("Dev env");
                    setTimeout(function() {
                        deferred.resolve(_user);
                    }, 1000);
                    return deferred.promise;
                }

                self.status = STATUS.INITIALIZING;

                //check authentication on load
                var promise = $http.get(Config.idspUrl + '/authenticategeosaml.php?as=geosaml');
                promise.then(function(response) {

                    var content = response.data ? response.data : response;

                    // console.log("Received from SP: " + content);
                    if(typeof(content) === 'string') {
                        try {
                            content = JSON.parse(content);
                        } catch(e) {
                            deferred.reject(e);
                            return;
                        }
                    }

                    if(content.Success) {  //authenticated
                        _user = new User({
                            id       : content.name[0],
                            username : content.name[0],
                            email    : content.mail[0],
                            name     : content.first_name[0] + ' ' + content.last_name[0],
                            org      : content.organization[0]
                        });
                        // console.log("Authenticated user: " + JSON.stringify(_user));

                    } else {
                        _user = null;       //not authenticated
                        // console.log("Failed to authenticate user");
                    }

                    deferred.resolve(_user);

                }, function(data, status, headers) {   // failed check
                    // console.log("Authentication call failed");
                    deferred.reject(data);
                }).catch(function(e) {
                    // console.log("Authentication check caught an error: " + e.message);
                    deferred.reject(e.message);
                });

                return deferred.promise;
            };

            //=====================================================

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

                if($scope.minimal === 'true') $scope.minimal = true;
                if($scope.minimal !== true) $scope.minimal = false;

                $scope.idpUrl = Config.idmUrl;
                // console.log("IDM Base Url: " + Config.idmUrl);

                AuthenticationService.getUser(function(user) {
                    $timeout(function() {
                        $scope.user = user;
                    },100);
                });

                $scope.login = function() {
                    $scope.user = AuthenticationService.login();
                };

                $scope.logout = function() {
                    $scope.user = AuthenticationService.logout();
                };

                //watch user for changes (timeouts)
                var watcher = $scope.$watch(function() { return AuthenticationService.getUser(); }, function(newUser) {
                    $scope.user = newUser;
                });

                $scope.$on('$destroy', function() {
                    watcher();  //destroy watcher
                });
            }
        };
    }])



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
                    },100);
                });

                $scope.login = function() {
                    $scope.user = AuthenticationService.login();
                };

                $scope.logout = function() {
                    $scope.user = AuthenticationService.logout();
                };

                //watch user for changes (timeouts)
                var watcher = $scope.$watch(function() { return AuthenticationService.getUser(); }, function(newUser) {
                    $scope.user = newUser;
                });

                $scope.$on('$destroy', function() {
                    watcher();  //destroy watcher
                });

            }
        };
    }])

;

})(angular);
