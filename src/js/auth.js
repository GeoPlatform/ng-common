(function(angular) {
    
    'use strict';

    //flag on whether we're in dev env
    function isDEV() {
        return "localhost" === window.location.hostname || 
            ~window.location.hostname.indexOf("192.168")||
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

        // console.log("IDSP Base Url: " + Config.idspBaseUrl);

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
                if(isDEV()) {
                    _user = TEST_USER.clone();
                    return _user;
                }
                var current = window.location.href;
                window.location = Config.idspBaseUrl + '/module.php/core/as_login.php?AuthId=geosaml&ReturnTo=' + encodeURIComponent(current);
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
                window.location = Config.idspBaseUrl + '/module.php/core/as_logout.php?AuthId=geosaml&ReturnTo=' + encodeURIComponent(current);
            };


            /**
             * Queries simplesamlphp if the current session is authenticated
             * @return promise - then(function(user) {}, function(response){})
             */
            this.check = function() {
                
                var deferred = $q.defer();
                
                if(isDEV()) {
                    setTimeout(function() {
                        deferred.resolve(_user);
                    }, 1000);
                    return deferred.promise;
                }

                self.status = STATUS.INITIALIZING;

                //check authentication on load
                $http.get(Config.idspBaseUrl + '/authenticategeosaml.php?as=geosaml')
                .success(function(response) {
                    
                    if(response.Success) {  //authenticated
                        _user = new User({
                            id       : response.name[0],
                            username : response.name[0],
                            email    : response.mail[0],
                            name     : response.first_name[0] + ' ' + response.last_name[0],
                            org      : response.organization[0]
                        });
                    } else {
                        _user = null;       //not authenticated
                    }

                    deferred.resolve(_user);
                    
                }).error(function(data, status, headers) {   // failed check
                    console.log("Authentication call failed");
                    deferred.reject(data);
                });

                return deferred.promise;
            };

            //=====================================================

            //initialize with auth check
            this.check().then(function(user) {
                self.status = STATUS.INITIALIZED;
            }, function(err) {
                self.status = STATUS.INITIALIZED;
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
            template: [

                //not logged in
                '<div class="btn-account btn-group" ng-if="!user" >' + 
                '    <a class="hidden-xs btn btn-link" ng-click="login()">' + 
                '        <span class="glyphicon glyphicon-user"></span>' + 
                '        Sign In' + 
                '    </a>' + 
                '    <button type="button" class="visible-xs btn btn-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' + 
                '        <span class="glyphicon glyphicon-user"></span>' + 
                '        <span class="caret"></span>' + 
                '    </button>' + 
                '    <ul class="dropdown-menu dropdown-menu-right" role="menu">' + 
                '        <li><a ng-click="login()">Sign In</a></li>' + 
                '    </ul>' + 
                '</div>' + 

                //logged in
                '<div class="btn-account btn-group" ng-if="user" >' + 
                '  <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' + 
                '     <span class="glyphicon glyphicon-user"></span> ' +
                '     <span class="hidden-xs">{{::user.name}}</span> ' + 
                '     <span class="caret"></span>' + 
                '  </button>' + 
                '  <ul class="dropdown-menu dropdown-menu-right" role="menu">' + 
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

                $scope.idpUrl = Config.idmBaseUrl;
                // console.log("IDM Base Url: " + Config.idmBaseUrl);
                
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
                
                $scope.idpUrl = Config.idmBaseUrl;

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