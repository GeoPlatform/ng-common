(function() {

    "use strict";

    if(typeof(Array.prototype.find) === 'undefined') {
        Array.prototype.find = function(callback) {
            for(var i=0; i<this.length; ++i) {
                if(callback(this[i], i, this))
                    return this[i];
            }
            return null;
        };
    }
    if(typeof(Array.prototype.filter) === 'undefined') {
        Array.prototype.filter = function(callback) {
            var results = [];
            for(var i=0; i<this.length; ++i) {
                if(callback(this[i], i, this))
                    results.push(this[i]);
            }
            return results;
        };
    }
    if(typeof(Array.prototype.each) === 'undefined') {
        Array.prototype.each = function(callback) {
            for(var i=0; i<this.length; ++i) {
                callback(this[i], i, this);
            }
        };
    }
    if(typeof(String.prototype.startsWith) === 'undefined') {
        String.prototype.startsWith = function(value) {
            var str = this;
            if(!str.length)     return false;
            if(!value.length)   return false;
            if(str.length < value.length) return false;
            return str.indexOf(value) === 0;
        };
    }
    if(typeof(String.prototype.endsWith) === 'undefined') {
        String.prototype.endsWith = function(value) {
            var str = this;
            if(!str.length)     return false;
            if(!value.length)   return false;
            if(str.length < value.length) return false;
            var substr = str.substring(
                str.length - value.length,
                str.length
            );
            return substr == value;
        };
    }




    if(typeof(Date.prototype.plus) === 'undefined') {
        Date.prototype.plus = function(offset) {
            
            var type = typeof(offset);
            if(type === 'undefined') return this;

            var offsetMS = 0;
            if(type === 'string') {
                switch(offset) {
                    case 'hour':    offsetMS = 1000*60*60; break;
                    case 'day':     offsetMS = 1000*60*60*24; break;
                    case 'week':    offsetMS = 1000*60*60*24*7; break;
                    case 'month':   offsetMS = 1000*60*60*24*31; break;
                    case 'year':    offsetMS = 1000*60*60*24*365; break;
                }
            } else if(type === 'number') {
                offsetMS = offset;
            } else return this;

            var d = this;
            return new Date(d.getTime() + offsetMS);
        };
    }

    if(typeof(Date.prototype.random) === 'undefined') {
        Date.prototype.random = function(threshold) {

            var type = typeof(threshold);
            if(type === 'undefined') return this;

            var offsetMS = 0;
            if(type === 'string') {
                switch(threshold) {
                    case 'hour':    offsetMS = 1000*60*60; break;
                    case 'day':     offsetMS = 1000*60*60*24; break;
                    case 'week':    offsetMS = 1000*60*60*24*7; break;
                    case 'month':   offsetMS = 1000*60*60*24*31; break;
                    case 'year':    offsetMS = 1000*60*60*24*365; break;
                }
            } else if(type === 'number') {
                offsetMS = threshold;
            } else return this;

            var d = this;
            return new Date(d.getTime() + Math.floor(Math.random()*offsetMS));
        };
    }

})();
;
(function(jQuery, angular) {
    
    "use strict"; 
    
    angular.module("gp-common", [])

    //Assumes a global has been set
    // Don't use these... deprecated
    .constant('idspBaseUrl', GeoPlatform.idspUrl)
    .constant('idmBaseUrl', GeoPlatform.idmUrl)

    //Assumes a global object containing configuration values for GeoPlatform exists 
    // prior to this module being declared
    // (using 'value' since config might change)
    .value('GPConfig', GeoPlatform)

    ;

})(jQuery, angular);
;
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
 .service('AuthenticationService', ['$q', '$http', '$location', '$rootScope', '$window', 'GPConfig', function($q, $http, $location, $rootScope, $window, Config) {

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

     var _user = null;

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

             //use current window
             var current = window.location.href;

             window.location = Config.IDP_BASE_URL + '/auth/authorize?client_id=' +
               Config.APP_ID + '&response_type=' +
               Config.AUTH_TYPE + '&redirect_uri=' + encodeURIComponent(current);

             //This could be writen to use an modal / pop-up for login so you don't have to lose your current page
             //Logout already executes using a background call
         };

         /**
          * Performs background logout and requests jwt revokation
          */
         this.logout = function() {

             var url = Config.IDP_BASE_URL + '/auth/revoke';
             $http.get(url)
             .then(function(response) {
               $http.defaults.useXDomain = false;
               delete $http.defaults.headers.common.Authorization;
               _user = null;
             }, function(err){
                console.log(err);
              });
         };

         /**
          * Queries oauth if the current session is authenticated
          * @return promise - then(function(user) {}, function(response){})
          */
         this.check = function() {

             var deferred = $q.defer();

             self.status = STATUS.INITIALIZING;

             var params = $location.hash();
             var accessToken;
             if(params){
                accessToken = params.split('&')[0]
                                    .split('=')[1];
              //  console.log(params);
              //  console.log(accessToken);
               ///or localstorage
               //$window.localstorage['accessToken'] = accessToken;
             }
             var user = self.parseJwt(accessToken);
             _user = (user) ?
                     new User({
                         id       : user.sub,
                         username : user.username,
                         email    : user.email,
                         name     : user.name,
                         org      : user.org,
                         exp      : user.exp
                     })
                     :
                     null;

             if(_user){
               $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
               $http.defaults.useXDomain = true;

             }else{
               try{
                 delete $http.defaults.headers.common.Authorization;
               }catch(e){
                 console.log(e);
               }
             }

             //clean hosturl on redirect from oauth
             var regex = new RegExp('access_token=.*type=Bearer', 'g');
             var dirtyUrl = $window.location.href;
             if(regex.test(dirtyUrl)){
               var cleanUrl = dirtyUrl.replace(regex, '');
               console.log("Clean URL: ", cleanUrl);
               $window.location = cleanUrl;
             }
             deferred.resolve(_user);
             return deferred.promise;
         };

         //=====================================================

         //unpack jwt
         this.parseJwt = function(token) {
           var parsed;
           if(token){
             var base64Url = token.split('.')[1];
             var base64 = base64Url.replace('-', '+').replace('_', '/');
             parsed = JSON.parse($window.atob(base64));
           }
           return parsed;
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

;
(function(jQuery, angular) {
    
    'use strict';

    angular.module('gp-common').directive('gpDatePicker', ['$timeout', function($timeout) {

        return {
            scope: {
                label: '@',
                format: '@',
                date: '=',
                onChange: '&?'
            },
            template: [
                '<div class="input-group-slick">',
                '    <input type="text" class="form-control" placeholder="{{::label}}"',
                '        datepicker-popup="{{format}}" ng-model="date" is-open="opened" />',
                '    <span class="glyphicon glyphicon-calendar" ng-click="toggle($event)"></span>',
                '</div>',
                '<p class="help-block"><small><em>Ex: "2015-01-31" or "Jan 31 2015"</em></small></p>'
            ].join(' '),

            controller: function($scope, $element, $attrs) {

                //toggle date picker
                $scope.toggle = function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.opened = !this.opened;
                };

                if(!$scope.format)
                    $scope.format = 'MMM dd yyyy';

                var promise = null;

                $scope.debounce = function() {
                    if(promise) $timeout.cancel(promise);
                    promise = $timeout(function() { 
                        promise = null;
                        if($scope.onChange)
                            $scope.onChange();
                    }, 200);
                };

                $scope.$watch('date', function() {
                    $scope.debounce();
                });

                var listener = $scope.$on('$destroy', function() {
                    
                    listener();             //deregister listener
                    
                    if(promise) $timeout.cancel(promise);
                    promise = null;

                    $scope.opened = false;    //close picker if open
                    $scope.onChange = null;
                    $scope.format = null;
                    $scope.debounce = null;
                });

            }
        };

    }]);

})(jQuery, angular);
;
(function(jQuery, angular) {
    
    "use strict"; 
    
    angular.module("gp-common")

    /**
     * Geolocation directive
     */
    .directive('gpGeolocation', ['$window',function ($window) {
        
        var defaultBtnLabel = "Locate";

        return {
            scope: {
                label: '=?'
            },
            restrict: "EA",
            template: [
                '<a class="btn btn-primary" ng-click="geolocate()" ng-if="available">',
                '  <span class="glyphicon glyphicon-screenshot" ng-if="!loading"></span>',
                '  <span class="glyphicon glyphicon-hourglass glyphicon-spin" ng-if="loading"></span>',
                '  {{btnLabel}}',
                '</a>',
                '<div ng-if="error">{{error}}</div>'
            ].join(' '),
            controller: function($scope) {

                $scope.btnLabel = $scope.label || defaultBtnLabel;
                $scope.loading = false;
                $scope.available = ($window.navigator && $window.navigator.geolocation);

                if(!$scope.available) 
                    $scope.error = "Your browser does not support determining location";

                $scope.geolocate = function() {

                    $scope.loading = true;
                    $window.navigator.geolocation.getCurrentPosition(function(position){

                        $scope.$apply(function() {$scope.loading = false;});
                        $scope.$emit('map:geolocation', position.coords.latitude, position.coords.longitude);

                    }, function(error) {
                        switch (error.code) {
                          case 1:
                            $scope.error = "Permission was denied while attempting to determine location";
                            break;
                          case 2:
                            $scope.error = "Unable to determine your location";
                            break;
                          case 3:
                            $scope.error = "Unable to determine location in a reasonable amount of time";
                            break;
                        }
                    });
                }; 
            }
        };

    }])

    ;

})(jQuery, angular);
;
(function(jQuery, angular) {
    
    "use strict"; 
    
    angular.module("gp-common")


    /**
     * Header directive for GeoPlatform Angular-based web applications
     * 
     * Uses transclusion to inject links into the nav-menu which floats to the right.
     * The menu already provides a "Home" link (to app home) and Sign In/User Info button.
     * The home link is not enabled by default but can be shown using 'show-home-link="true"' 
     * parameter on the directive.
     *
     * Note: any links transcluded should reference '$parent.user' to access authenticated user info
     * 
     * ex:
     * 
     *   <div gp-header brand="Map Manager" show-home-link="true" class="navbar-fixed-top">
     *     <li><a href="#/maps">Maps</a></li>
     *     <li><a href="#/galleries">Galleries</a></li>
     *     <li><a ng-if="$parent.user!==null" href="#/agol">AGOL</a></li>
     *     <li><a href="#/help">Help</a></li>
     *   </div>
     */
    .directive('gpHeader', ['GPConfig', 'AuthenticationService', function(Config, AuthenticationService) {

        return {

            scope: {
                brand: "@",
                showHomeLink: "@"
            },
            restrict: "AE",
            transclude: true,
            replace: true,
            template: [
                '<header>',
                '  <div class="container-fluid">',
                '    <div class="row">',
                '      <div class="col-md-12">',
                '        <ul role="menu" class="header__menu" gp-header-menu>',
                '          <li ng-if="showHomeLink">',
                '            <a href="#/goHome">',
                '                <span class="glyphicon glyphicon-home"></span> ',
                '                <span class="hidden-xs hidden-sm">Home</span>',
                '            </a>',
                '          </li>',
                '          <div class="transcluded"></div>',
                '          <li><span gp-login-button></span></li>',
                '        </ul>',
                '        <h4 class="brand">',
                '          <a href="{{portalUrl}}" title="Go to the GeoPlatform Home Page">',
                '            <span class="icon-gp"></span>',
                '            <span class="hidden-xs">GeoPlatform</span>',
                '          </a>',
                '          {{brand}}',
                '        </h4>',
                '      </div>',
                '    </div>',
                '  </div>',
                '</header>'
            ].join(' '),

            // controller: function($rootScope, $scope, $element) {
            //     $scope.portalUrl = $rootScope.portalUrl;
            // }, 

            link: function($scope, $element, $attrs, ctrl, transcludeFn) {

                $scope.showHomeLink = $scope.showHomeLink === 'true' || false;

                $scope.portalUrl = Config.portalUrl;

                AuthenticationService.getUserQ().then(function(user) {
                    $scope.user = user;    
                });
                
                $element.find('.transcluded').replaceWith(transcludeFn());
            }            

        };

    }])


    
    /**
     * Header Menu
     *
     * Monitors the current page URL and updates the header links 
     * to highlight whichever one is associated with the current page
     *
     * Usage: 
     *
     *  <ul role="menu" class="header__menu" gp-header-menu>
     *      <li><a href="#/maps">Maps</a></li>
     *      <li><a href="#/galleries">Galleries</a></li>
     *      ...
     *  </ul>
     *
     */
    .directive('gpHeaderMenu', ['$location', function($location) {

        //default href for "home" link in header__menu
        //uses 'goHome' to avoid angular-route issues with empty hash not 
        // triggering a page reload. Relies upon the "otherwise" condition
        // being configured inside a routeProvider within the application.
        var homeLink = 'goHome';

        function update($element) {

            var path = $location.path();
            
            if(path === '/' || path === '/#' || path === '/#/')
                path = homeLink;

            if(path[0] === '/') 
                path = path.substring(1);

            var menu = $element;
            menu.find('li.active').removeClass('active');
            
            var link = menu.find('li > a[href="#/' + path + '"]');
            if(link.length) {
                //check if link is within a dropdown in the header menu
                var dd = link.closest('.dropdown-menu');
                if(dd.length) {
                    //find next ancestor that is a list element and mark it active
                    dd.closest('li').addClass('active');
                } else {
                    //not in a dropdown, mark this link active
                    link.parent().addClass('active');
                }
            }
            
            menu.find('li > a').each(function(i,a) {
                var $a = $(a), href = $a.attr('href');
                if(!href) return;
                href = href.replace('#/', '');
                if(path.indexOf(href) === 0)
                    $a.parent().addClass('active');
            });
        }

        return {
            scope: {
                homeHref: '@'
            },
            restrict: "A",
            
            controller: function($rootScope, $scope, $element) {
                if($scope.homeHref)
                    homeLink = $scope.homeHref;
            },

            link: function($scope, $element) {

                update($element);

                $scope.$root.$on('$locationChangeSuccess', function() {
                    update($element);
                });

            }
        };
    }]);

})(jQuery, angular);

;
(function(angular) {


    "use strict";

    angular.module('gp-common').directive('iframeOnload', function(){
        return {
            scope: {
                callback: '&iframeOnload'
            },
            link: function(scope, element, attrs){
                element.on('load', function(event){
                    element.off('load');
                    return scope.callback(event);
                });
            }
        };
    });

}) (angular);
;
(function(angular) {
    
    "use strict";

    angular.module("gp-common").directive('onImgFail', function() {
        return {
            scope: {
                onImgFail: '@'
            },
            link: function($scope, $element) {
                var jqEl = jQuery($element);
                jqEl.on('error', function() {
                    jqEl.attr('src', $scope.onImgFail);
                });
            }
        };
    });

}) (angular);
;
(function(angular) {
    
    "use strict";


    angular.module('gp-common')


    //
    .service('NotificationService', ['$rootScope', function($rootScope) {
        var Service = function() {
            this.items = [];
        };
        Service.prototype = {
            getItems: function() { return this.items; },
            /**
             * @param item object
             * @return function to cancel the notification
             */
            addItem: function(item) { 
                this.items.push(item); 
                $rootScope.$broadcast('gp:notifications:new', item);

                var fn = function(item) { this.removeItem(item); };
                return fn.bind(this, item);
            },
            removeItem: function(item) {
                var index = this.items.indexOf(item);
                if(index >= 0)
                    return this.items.splice(index, 1);
                return null;
            },
            error: function(label, msg, dismiss) { 
                return this.addItem({ type: 'error', label: label, message: msg, canDismiss: dismiss });
            },
            success: function(label, msg, dismiss) { 
                return this.addItem({ type: 'success', label: label, message: msg, canDismiss: dismiss });
            },
            info: function(label, msg, dismiss) { 
                return this.addItem({ type: 'info', label: label, message: msg, canDismiss: dismiss });
            }
        };
        return new Service();
    }])


    // Usage: <gp-notifications />
    .directive('gpNotifications', ['$timeout', 'NotificationService', function($timeout, NotificationService) {
        return {
            scope: {
                expiration: '@'
            },
            template: [
                '<div class="notifications ng-hide" ng-show="items.length">',
                '  <div class="notification" ng-repeat="item in items"',
                '    ng-class="{\'notification--success\':item.type===\'success\', \'notification--error\':item.type===\'error\', \'notification--info\':item.type===\'info\'}">',
                '    <h5 class="notification__title">',
                '        <span class="pull-right glyphicon" ',
                '            ng-class="{\'glyphicon-ok-sign\':item.type===\'success\',\'glyphicon-exclamation-sign\':item.type===\'error\',\'glyphicon-info-sign\':item.type===\'info\'}">',
                '        </span>',
                '        {{item.label}}',
                '    </h5>',
                '    <p class="notification__content" ng-bind-html="item.message"></p>',
                '    <div class="notification__actions" ng-if="item.canDismiss">',
                '        <button type="button" class="btn btn-link" ng-click="dismiss(item)">dismiss</button>',
                '    </div>',
                '  </div>',
                '</div>'
            ].join(' '),

            link: function($scope, $element, $attrs) {

                $scope.expiration = ($scope.expiration || 2000)*1;

                $scope.items = [];


                function update() {
                    $scope.items = NotificationService.getItems();

                    //if updated before timer expired, reset timer
                    if($scope.timer) {
                        $timeout.cancel($scope.timer);
                        $scope.timer = null;
                    }

                    //set timer to kill earliest item after time
                    $scope.timer = $timeout(function() {
                        $scope.timer = null;
                        //will ultimately call update() and thus trigger timeout again
                        $scope.removeOldest();
                    }, $scope.expiration);
                }
                update();

                $scope.removeOldest = function() {
                    //find oldest that can be removed
                    var oldest = $scope.items.find(function(item) {return item.canDismiss;});
                    if(oldest)
                        NotificationService.removeItem(oldest);
                };

                $scope.dismiss = function(item) {
                    //remove item using service
                    NotificationService.removeItem(item);
                };

                $scope.$watchCollection(function() {
                    return NotificationService.getItems();
                }, update);

                // $scope.$on('gp:notifications:new', function(event, item) { update(); });

            }
        };
    }]);


})(angular);
;
(function(jQuery, angular) {
    
    "use strict";

    angular.module('gp-common').directive('gpPagination', function() {


        function Controller($scope, $element) {

            if(!$scope.pageSizeOpts) {
                $scope.pageSizeOpts = [5, 10, 25, 50];
            }
            if($scope.pageSize && $scope.pageSizeOpts.indexOf($scope.pageSize*1)<0) {
                $scope.pageSizeOpts.push($scope.pageSize*1).sort();
            }

            $scope.previous = function() { 
                $scope.start = Math.max(0, $scope.start*1 - $scope.pageSize*1);
                $scope.$emit('pagination:change', $scope.start, $scope.pageSize);
            };

            $scope.next = function() {
                $scope.start = Math.min($scope.total, $scope.start*1 + $scope.pageSize*1);
                $scope.$emit('pagination:change', $scope.start, $scope.pageSize);
            };

            $scope.setPage = function(arg) {
                var page = arg*1;
                $scope.start = (page-1) * ($scope.pageSize*1);
                $scope.$emit('pagination:change', $scope.start, $scope.pageSize);
            };

            $scope.setPageSize = function(size) {

                $scope.pageSize = size*1;
                //move start cursor to beginning of new current page based on updated pagesize
                var currentPage = Math.floor($scope.start / $scope.pageSize) + 1;
                $scope.setPage(currentPage);
            };

            $scope.hasPrevious = function() {
                return $scope.start > 0;
            };

            $scope.hasNext = function() {
                return ($scope.start+$scope.pageSize) < $scope.total;
            };


            function update() {
            
                var ostart = $scope.start*1;
                var osize = $scope.pageSize*1;
                
                //calculate # of pages needed
                var pages = [];
                var maxPagination = 5;
                var maxPaginationMidPoint = ((maxPagination % 2) !== 0) ? Math.ceil(maxPagination / 2) : maxPagination / 2;

                if($scope.total > 0) {
                    
                    var numPages = Math.ceil($scope.total / osize);
                    var currentPage = Math.floor(ostart / osize);

                    var s = 0;
                    if(currentPage > Math.floor(maxPagination/2)) {     //  1 2 '3' 4 5
                        s = currentPage-Math.floor(maxPagination/2);    //  1 2 3 '4' 5
                                                                        //  ...

                    } else {                                            //  '1' 2 3 4 5
                        s = 0;                                          //  1 '2' 3 4 5
                                                                        //  ...
                    }

                    var e = Math.min(s+maxPagination, numPages);

                    //ensure at least <maxPagination> # of page links are shown
                    // even if near the end of the results
                    while(s>0 && ((e-s) < maxPagination))
                        s-=1;

                    for(var i=s; i<e; ++i) {
                        var pageStart = (i*osize)+1;
                        var pageEnd = Math.min(pageStart + osize - 1, $scope.total);
                        pages.push({
                            label: (i+1)+"",
                            tooltip: "Results " + pageStart + "-" + pageEnd
                        });
                        if(i == currentPage)
                            pages[pages.length-1].active = true;
                    }

                }

                $scope.pages = pages;

            }

            update();

            $scope.$watch('start',      update);
            $scope.$watch('pageSize',   update);
            $scope.$watch('total',      update);

        }



        return {

            scope: {
                start: '=',
                pageSize: '=',
                total: '=',
                pageSizeOpts: '='
            },
            replace: true,
            template: [
                '<div>',
                '  <div class="visible-xs row">',
                '    <div class="col-xs-6">{{total}} results</div>',
                '    <div class="col-xs-6">',
                '      <select class="form-control" ng-model="pageSize">',
                '        <option ng-repeat="ps in pageSizeOpts" ',
                '          ng-selected="pageSize===ps" ',
                '          value="{{ps}}">{{ps}} per page</option>',
                '      </select>',
                '    </div>',
                '  </div>',
                '  <ul class="pagination">',
                '    <li class="info hidden-xs">',
                '      <a>{{total}} results</a>',
                '    </li>',
                '    <li class="pagination-control hidden-xs" ng-if="total>0">',
                '      <span uib-dropdown>',
                '        <a href="" uib-dropdown-toggle title="Change the number of results returned">',
                '          {{pageSize}} per page <span class="caret"></span>',
                '        </a>',
                '        <ul class="dropdown-menu" role="menu">',
                '          <li ng-repeat="ps in pageSizeOpts"><a ng-click="setPageSize(ps)">{{ps}} per page</a></li>',
                '        </ul>',
                '      </span>',
                '    </li>',
                '    <li class="separator hidden-xs"></li>',
                '    <li ng-if="hasPrevious()">',
                '      <a ng-click="previous()">',
                '        <span class="glyphicon glyphicon-backward"></span>',
                '      </a>',
                '    </li>',
                '    <li ng-repeat="page in pages" ng-class="{active:page.active,disabled:page.disabled}">',
                '      <a ng-click="setPage(page.label)" title="{{::page.tooltip}}">{{::page.label}}</a>',
                '    </li>',
                '    <li ng-if="hasNext()">',
                '      <a ng-click="next()">',
                '        <span class="glyphicon glyphicon-forward"></span>',
                '      </a>',
                '    </li>',
                '  </ul>',
                '</div>'
            ].join(' '),

            controller: Controller

        };

    });


})(jQuery, angular);
;
(function(jQuery, angular) {

    "use strict";


    angular.module('gp-common')


    //helper to determine size of window for responsive breakpoint purposes
    .provider('responsiveHelper', ["$windowProvider", function ($windowProvider) {
        
        var $window  = $windowProvider.$get();

        function Helper($window) {
            this.window = $window;
        }
        Helper.prototype = {
            getWidth: function() { return $window.innerWidth || $window.outerWidth; },
            isXS: function () { var width = this.getWidth(); return width < 768; },
            isSM: function () { var width = this.getWidth(); return width >= 768 && width < 992; },
            isMD: function () { var width = this.getWidth(); return width >= 992 && width < 1200; },
            isLG: function () { var width = this.getWidth(); return width >= 1200; }
        };

        var helper = new Helper($window);

        this.$get = function() {
            return helper;
        };
    }])


    //directive which appends appropriate responsive breakpoint classNames to the element
    // on which it's set
    .directive('gpResponsive', ['$window', 'responsiveHelper', function($window, responsiveHelper) {

        return {
            restrict: "A",
            link: function($scope, $element, $attrs) {

                function update(el, helper) {
                    if(helper.isXS())
                        el.addClass('gp-responsive-xs');
                    else
                        el.removeClass('gp-responsive-xs');

                    if(helper.isSM())
                        el.addClass('gp-responsive-sm');
                    else 
                        el.removeClass('gp-responsive-sm');

                    if(helper.isMD())
                        el.addClass('gp-responsive-md');
                    else 
                        el.removeClass('gp-responsive-md');

                    if(helper.isLG())
                        el.addClass('gp-responsive-lg');
                    else 
                        el.removeClass('gp-responsive-lg');
                }

                update($element, responsiveHelper);

                var resizeFn = function() {
                    update($element, responsiveHelper);
                };

                var w = angular.element($window);
                var listener = w.on('resize', resizeFn);

                $scope.$on('$destroy', function() {
                    w.off('resize', resizeFn);
                });

            }
        };

    }])


    .directive('gpResize', function($window, $timeout) {
        return function($scope, $element, $attr) {

            var resizeFn = function() {
                var hh = jQuery('header')[0].offsetHeight;
                // var fh = jQuery('footer')[0].offsetHeight;
                // console.log('hh & fh', hh, fh);                    

                var tp = hh + 2;
                // var bt = fh + 2;
                // console.log('tp & bt', tp, bt);                
                
                var changes = {
                    // bottom: bt + 'px',
                    top: tp + 'px',
                };
                $element.css(changes);
                $scope.$apply();
            };

            var w = angular.element($window);
            w.on('resize', resizeFn);

            $timeout(resizeFn, 200);

            $scope.$on('$destroy', function() {
                w.off('resize', resizeFn);
            });

        };
    });

})(jQuery, angular);
;
(function(jQuery, angular) {
    
    "use strict";



    function inputLinkFunction($scope, $element, $attrs, ngModelController, $timeout) {

        if(!$scope.type) $scope.type = "text";
        if($scope.required === 'true')
            $scope.required = true;
        else $scope.required = false;

        $scope.elId = 'input_' + Math.ceil(Math.random()*9999);
        $scope.size = $scope.size || 'medium';
        $scope.type = $scope.type || 'text';



        //listen for changes to the inner value by way of the form-control
        $element.find('.form-control').on('change', function onChange() { 
            validate($scope.innerValue); 
        });
        
        

        /* ------------- private methods --------------- */

        function validate() {

            //check form-control for ng-invalid
            var input = $element.find('.form-control');

            $scope.isDirty = input.hasClass('ng-dirty');

            if(input.hasClass('ng-invalid')) {
                if(input.hasClass("ng-empty"))
                    $scope.error = "This field requires a value";
                else
                    $scope.error = "Invalid value provided";
            } else
                $scope.error = null;

        }

        function update(newValue) {
            // call $parsers pipeline then update $modelValue
            ngModelController.$setViewValue(newValue);
            // update the local view
            ngModelController.$render();
        }



        // when model change, update our view (just update the div content)
        ngModelController.$render = function() {
                
            var value = ngModelController.$viewValue;

            //create copy of passed in model value that can be used
            // by the controls here allowing us to cancel and 
            // commit changes at our own leisure
            $scope.innerValue = value;
            
            $scope.displayValue = value || $scope.placeholder || "No value provided";

            validate(value);
        };


        /* ------------- private methods --------------- */

        $scope.isReadOnly = function() {
            var t = typeof(this.readOnly);
            if(t === 'undefined') return false;
            if(t === 'string') return this.readOnly.toLowerCase() === 'true';
            if(t === 'number') return this.readOnly === 1;
            if(t === 'boolean') return this.readOnly;
            return false;
        };

        //enter edit mode
        $scope.edit = function() {
            if($scope.isReadOnly()) return;
            $scope.editing=true;
            //auto-focus on form-control when entering edit mode
            $timeout(function() { $element.find('.form-control').focus().select(); }, 200);
        };
        //leave edit mode (regardless of save() or cancel())
        $scope.done = function() {
            $scope.editing=false;
            $scope.error = null;
        };


        $scope.save = function() {
            //update display with new value
            update($scope.innerValue);
            $scope.done();
        };
        $scope.cancel = function() {
            //reset inner value
            $scope.innerValue = ngModelController.$viewValue;
            $scope.done();
        };


        $scope.onKeyPress = function($event, code) {
            // console.log("Pressed " + code);
            if((code === undefined || code === 0) && $event.which !== undefined)
                code = $event.which;
            if($scope.type === 'number') {
                
                //NOTE: Chrome does not catch Backspace onKeyPress, so it 
                // skips this handler. FF does, so we need to watch for 
                // backspace, delete, and numbers

                if (code === 8  ||   //backspace
                    code === 46 ||  //delete  
                    (code >= 44 && code <= 57))    //comma, hyphen, period and numbers (0-9)
                    return;
                
                //NOTE: keyPress period is 46. keyDown it is 190

                $event.preventDefault();
                return false;               //ignore key
            }
        };
        $scope.onKeyUp = function($event, code) {
            // console.log("Up " + code);
            if((code === undefined || code === 0) && $event.which !== undefined)
                code = $event.which;
            if(code === 13 && !$scope.error) $scope.done();  //enter
            else if(code === 27)             $scope.cancel();//esc
            else {
            
                if(code !== 8 &&                //backspace
                    code !== 46 &&              //delete
                    code !== 190 &&             //period
                    (code < 48 || code > 90) && //letters and numbers (a-z, 0-9)
                    (code < 106 || code > 111) && 
                    (code < 186)) 
                    return;

                validate();
            }
        };


        $scope.$destroy = function() {
            $element.off('change');
        };
    }



    angular.module("gp-common")

    .directive('gpSlickFormInput', ['$timeout', function($timeout) {

        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                label: "@",
                placeholder: '@',
                help: '=',
                // validator: '&',
                // validationExpr: '@',
                type: '@',
                pattern: "@",
                required: '@',
                readOnly: '@',
                size: '@',
                icon: '@'
            },
            template: INPUT_TEMPLATE,
            link: function($scope, $element, $attrs, ngModelController) {
                inputLinkFunction($scope, $element, $attrs, ngModelController, $timeout);
            }
        };

    }])


    .directive('gpSlickFormTextarea', ['$timeout', function($timeout) {

        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                label: "@",
                placeholder: '@',
                help: "@",
                readOnly: "@",
                size: "@",
                icon: "@"
            },
            template: TEXTAREA_TEMPLATE,
            link: function($scope, $element, $attrs, ngModelController) {
                inputLinkFunction($scope, $element, $attrs, ngModelController, $timeout);
            }
        };

    }])


    /**
     *
     * Notes:
     *  - use 'form form-inline' classes for editable date so the field doesn't take up whole line
     */
    .directive('gpSlickFormDate', ['$timeout', '$filter', function($timeout, $filter) {

        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                label: "@",
                format: "@",
                placeholder: '@',
                required: "@",
                readOnly: "@",
                size: '@',
                icon: '@'
            },
            template: DATE_TEMPLATE,

            controller: function($scope, $element) {
                if(!$scope.format || $scope.format.length < 3) $scope.format = "mediumDate";
                $scope.inline = $element.hasClass("inline");
            },

            /**
             *
             */
            link: function($scope, $element, $attrs, ngModelController) {

                if($scope.required === 'true')
                    $scope.required = true;
                else $scope.required = false;
                
                $scope.elId = 'input_' + Math.ceil(Math.random()*9999);
                $scope.size = $scope.size || 'medium';
                $scope.type = $scope.type || 'text';


                function validate(value) {
                    // console.log("Validating '" + value + "'");

                    //check form-control for ng-invalid
                    var input = $element.find('.form-control');
                    if(input.hasClass('ng-invalid')) {
                        if(input.hasClass("ng-empty"))
                            $scope.error = "This field requires a value";
                        else
                            $scope.error = "Invalid value provided";
                    } else
                        $scope.error = null;
                }

                function update(newValue) {
                    // call $parsers pipeline then update $modelValue
                    ngModelController.$setViewValue(newValue);
                    // update the local view
                    ngModelController.$render();
                }


                // when model change, update our view (just update the div content)
                ngModelController.$render = function() {

                    var value = ngModelController.$viewValue;

                    //create copy of passed in model value that can be used
                    // by the controls here allowing us to cancel and 
                    // commit changes at our own leisure
                    $scope.innerValue = value;
                    
                    $scope.displayValue = value ? $filter('date')(ngModelController.$modelValue, $scope.format) :
                        $scope.placeholder || "No value provided";

                    validate(value);

                };




                $scope.isReadOnly = function() {
                    var t = typeof(this.readOnly);
                    if(t === 'undefined') return false;
                    if(t === 'string') return this.readOnly.toLowerCase() === 'true';
                    if(t === 'number') return this.readOnly === 1;
                    if(t === 'boolean') return this.readOnly;
                    return false;
                };


                //enter edit mode
                $scope.edit = function() {
                    if($scope.isReadOnly()) return;
                    
                    $scope.editing=true;
                    
                    //auto-focus on form-control when entering edit mode
                    // $timeout(function() { $element.find('.form-control').focus().select(); }, 200);
                };
                //leave edit mode (regardless of save() or cancel())
                $scope.done = function() {
                    $scope.opened = false;
                    $scope.editing=false;
                    $scope.error = null;
                };


                $scope.save = function() {
                    //update display with new value
                    update($scope.innerValue);
                    $scope.done();
                };
                $scope.cancel = function() {
                    //reset inner value
                    $scope.innerValue = angular.copy(ngModelController.$modelValue);
                    $scope.done();
                };


                
                

                $scope.open = function() {
                    //must wrap 'opened' variable in an object for 
                    // angular to properly track its value changes
                    // from within children scope (ie, the date picker)
                    if (typeof($scope.uibopts) === 'undefined'){
                       $scope.uibopts = {};
                    }
                    $scope.uibopts.opened = true;
                };

                $scope.onKeyUp = function(code) {
                    if(code === 13) {   //enter
                        $scope.done();
                    } else if(code === 27) {    //esc
                        $scope.cancel();
                    }
                };
                $scope.onChange = function(date) {
                    if(isNaN(ngModelController.$modelValue) && $scope.required) {
                        $scope.error = "This field requires a value";
                    } else $scope.error = null;
                };
            }
        };

    }])



    .directive('gpSlickFormSelect', ['$timeout', function($timeout) {

        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                label: "@",
                codeList: "=",
                help: '=',
                required: "@",
                readOnly: "@",
                size: '@',
                icon: '@'
            },
            template: SELECT_TEMPLATE,
            link: function($scope, $element, $attrs, ngModelController) {

                if(!$scope.type) $scope.type = "text";
                if($scope.required === 'true')
                    $scope.required = true;
                else $scope.required = false;

                $scope.elId = 'input_' + Math.ceil(Math.random()*9999);
                $scope.size = $scope.size || 'medium';
                $scope.type = $scope.type || 'text';

                var $select = null;

                function getSelect() {
                    if(!$select || !$select.length)
                        $select = $element.find('.form-control');
                    return $select;
                }


                if($scope.codeList) {
                    $scope.selectOptions = $scope.codeList.map(function(item) {
                        if(typeof(item) !== 'object' || !item.value)
                            return {value: item, label: item};
                        else if(!item.label)
                            return {value: item.value, label: item.value};
                        return item;
                    });
                } else 
                    $scope.selectOptions = [];



                //listen for changes to the inner value by way of the form-control
                // $element.find('.form-control').on('change', function onChange() { 
                //     validate($scope.innerValue); 
                // });
                
                

                /* ------------- private methods --------------- */

                function validate() {

                    //check form-control for ng-invalid
                    var select = getSelect();

                    $scope.isDirty = select.hasClass('ng-dirty');

                    if(select.hasClass('ng-invalid')) {
                        if(select.hasClass("ng-empty"))
                            $scope.error = "This field requires a value";
                        else
                            $scope.error = "Invalid value provided";
                    } else
                        $scope.error = null;

                }

                function update(newValue) {
                    // call $parsers pipeline then update $modelValue
                    ngModelController.$setViewValue(newValue);
                    // update the local view
                    ngModelController.$render();
                }



                // when model change, update our view (just update the div content)
                ngModelController.$render = function() {
                        
                    var value = ngModelController.$viewValue;

                    //@see https://github.com/angular/angular.js/commit/7fda214c4f65a6a06b25cf5d5aff013a364e9cef

                    //create copy of passed in model value that can be used
                    // by the controls here allowing us to cancel and 
                    // commit changes at our own leisure
                    $scope.innerValue = value;

                    $scope.displayValue = $scope.placeholder || "No value provided";

                    if(value) {
                        //values are objects, not literals
                        var opt = $scope.selectOptions.find(function(o){return o.value==value;});
                        $scope.displayValue = opt.label;
                    }
                    
                    validate();
                };


                /* ------------- private methods --------------- */

                $scope.onChange = function(value) {
                    
                    // console.log("Changing value " + value + " vs " + $scope.innerValue);
                    $scope.innerValue = value;                
                    $timeout(function() { validate(); }, 200);

                };

                $scope.onTypeaheadSelection = function($item, $model, $label, $event) {

                    $scope.innerValue = $item ? $item.value : null;
                    $timeout(function() { validate(); }, 200);

                };

                $scope.isReadOnly = function() {
                    var t = typeof(this.readOnly);
                    if(t === 'undefined') return false;
                    if(t === 'string') return this.readOnly.toLowerCase() === 'true';
                    if(t === 'number') return this.readOnly === 1;
                    if(t === 'boolean') return this.readOnly;
                    return false;
                };

                //enter edit mode
                $scope.edit = function() {
                    if($scope.isReadOnly()) return;
                    $scope.editing=true;
                    //auto-focus on form-control when entering edit mode
                    $timeout(function() { $select.focus().select(); }, 200);
                };
                //leave edit mode (regardless of save() or cancel())
                $scope.done = function() {
                    $scope.editing=false;
                    $scope.error = null;
                };


                $scope.save = function() {
                    //update display with new value
                    update($scope.innerValue);
                    $scope.done();
                };
                $scope.cancel = function() {
                    //reset inner value
                    $scope.innerValue = ngModelController.$viewValue;
                    $scope.done();
                };

                $scope.onKeyUp = function(code) {
                    if(code === 13 && !$scope.error) {   //enter
                        $scope.save();
                    } else if(code === 27) {    //esc
                        $scope.cancel();
                    }
                };

                $scope.onTypeaheadKeyUp = function(code) {
                    validate();
                };


                $scope.$destroy = function() {
                    // $element.off('change');
                };
            }
        };

    }])



    ;


    var INPUT_TEMPLATE = [
        
        '<div class="form-group form-group-slick">',
        
        '   <label for="{{::elId}}" class="control-label">{{::label}}</label>',
        
        '   <div class="input__display" ',
        '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error,\'text-lg\':size===\'large\'}" ',
        '       ng-show="!editing" ng-click="edit()" ',
        '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">',
        '      {{displayValue}}',
        '   </div>',
        
        '   <div ng-show="editing">',
        '      <div class="input-group" ng-class="{\'input-group-lg\':size===\'large\'}">',
        '           <div class="input-group-slick" ng-class="{\'input-group-slick--lg\':size===\'large\'}">',
        
        '               <span ng-if="icon" class="{{::icon}}"></span>',
        
        '               <input id="{{::elId}}" type="{{::type}}" class="form-control" ',
        '                   pattern="{{pattern}}" ',
        '                   ng-model="innerValue" ',
        '                   ng-required="{{required}}" ',
        '                   ng-keypress="onKeyPress($event, $event.keyCode)" ',
        '                   ng-keyup="onKeyUp($event, $event.keyCode)" >',
        
        '               <span class="indicators">',
        '                   <span class="is-valid glyphicon glyphicon-ok-sign"></span>',
        '                  <span class="is-invalid glyphicon glyphicon-exclamation-sign"></span>',
        '              </span>',
        
        '           </div>',
        
        '          <span class="input-group-btn">',
        
        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{\'btn-lg\':size===\'large\'}"' ,
        '                   ng-click="cancel()" title="Cancel changes">',
        '                   <span class="glyphicon glyphicon-ban-circle"></span>',
        '              </button>',
        
        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{disabled:!!error||!isDirty,\'btn-lg\':size===\'large\'}"' ,
        '                   ng-disabled="{{!!error}}" ',
        '                   ng-click="save()" title="Save changes">',
        '                  <span class="glyphicon glyphicon-ok"></span>',
        '               </button>',
        
        '           </span>',
        
        '       </div>', 

        '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>',
        '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>',
        
        '   </div>',
        
        '</div>'

    ].join(' ');

    var TEXTAREA_TEMPLATE = [
        '<div class="form-group form-group-slick">',
        
        '   <label for="{{::elId}}" class="control-label">{{::label}}</label>',
        
        '   <div class="input__display" ',
        '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error,\'text-lg\':size===\'large\'}" ',
        '       ng-show="!editing" ng-click="edit()" ',
        '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">',
        '      {{displayValue}}',
        '   </div>',
        
        '   <div ng-show="editing">',
        '      <div class="input-group" ng-class="{\'input-group-lg\':size===\'large\'}">',
        '           <div class="input-group-slick" ng-class="{\'input-group-slick--lg\':size===\'large\'}">',
        
        '               <span ng-if="icon" class="{{::icon}}"></span>',
        
        '               <textarea rows="3" id="{{::elId}}" class="form-control" ',
        '                   ng-required="{{required}}" ng-model="innerValue"',
        '                   ng-keypress="onKeyPress($event, $event.keyCode)" ',
        '                   ng-keyup="onKeyUp($event, $event.keyCode)"></textarea>',
        
        '               <span class="indicators">',
        '                   <span class="is-valid glyphicon glyphicon-ok-sign"></span>',
        '                  <span class="is-invalid glyphicon glyphicon-exclamation-sign"></span>',
        '              </span>',
        
        '           </div>',
        
        '          <span class="input-group-btn">',
        
        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{\'btn-lg\':size===\'large\'}"' ,
        '                   ng-click="cancel()" title="Cancel changes">',
        '                   <span class="glyphicon glyphicon-ban-circle"></span>',
        '              </button>',
        
        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{disabled:!!error||!isDirty,\'btn-lg\':size===\'large\'}"' ,
        '                   ng-disabled="{{!!error}}" ',
        '                   ng-click="save()" title="Save changes">',
        '                  <span class="glyphicon glyphicon-ok"></span>',
        '               </button>',
        
        '           </span>',
        
        '       </div>', 

        '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>',
        '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>',
        
        '   </div>',
        
        '</div>'
    ].join(' ');

    var DATE_TEMPLATE = [

        
        '<div class="form-group form-group-slick">',
        
        '   <label for="{{::elId}}" class="control-label">{{::label}}</label>',

        '   <div class="input__display" ',
        '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error}" ',
        '       ng-show="!editing" ng-click="edit()" ',
        '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">',
        '      {{displayValue}}',
        '   </div>',
        
        '   <div ng-show="editing">',
        '       <div uib-datepicker ng-required="{{required}}" ng-model="innerValue" datepicker-options="{showWeeks:false}"></div>',
        
        '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>',
        '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>',
        
        '       <button type="button" class="btn btn-default" ',
        '           ng-class="{\'btn-lg\':size===\'large\'}"' ,
        '           ng-click="cancel()" title="Cancel changes">',
        '           <span class="glyphicon glyphicon-ban-circle"></span>',
        '      </button>',
        
        '      <button type="button" class="btn btn-default" ',
        '           ng-class="{disabled:!!error,\'btn-lg\':size===\'large\'}"' ,
        '          ng-disabled="{{!!error}}" ',
        '           ng-click="save()" title="Save changes">',
        '           <span class="glyphicon glyphicon-ok"></span>',
        '      </button>',

        '   </div>',

        '</div>'

    ].join(' ');

    var SELECT_TEMPLATE = [
        
        '<div class="form-group form-group-slick">',
        
        '   <label for="{{::elId}}" class="control-label">{{::label}}</label>',
        
        '   <div class="input__display" ',
        '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error}" ',
        '       ng-show="!editing" ng-click="edit()" ',
        '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">',
        '      {{displayValue}}',
        '   </div>',
        
        '   <div ng-show="editing">',

        '      <div class="input-group" ng-class="{\'input-group-lg\':size===\'large\'}">',
        
        '           <div class="input-group-slick" ng-class="{\'input-group-slick--lg\':size===\'large\'}">',
        
        '               <span ng-if="icon" class="{{::icon}}"></span>',
        
        '               <select class="form-control input__field" ',
        '                   ng-if="codeList.length<=12" ',
        '                   ng-model="innerValue" ',
        '                   ng-options="opt.value as opt.label for opt in selectOptions" ',
        '                   ng-required="{{required}}" ',
        '                   ng-change="onChange(innerValue)" ',
        '                   ng-keyUp="onKeyUp($event.keyCode)" >',
        '                   <option value="">Select One</option>',
        '               </select>',

        '               <input type="text" class="form-control input__field" ng-if="codeList.length>12" ',
        '                   ng-model="innerValue" ',
        '                   ng-required="{{required}}" ',
        '                   ng-keyUp="onTypeaheadKeyUp($event.keyCode)" ',
        '                   typeahead-on-select="onTypeaheadSelection($item, $model, $label, $event)" ',
        '                   uib-typeahead="opt.value as opt.label for opt in selectOptions | filter:{value:$viewValue} | limitTo:12" ',
        '                   typeahead-min-length="0" ',
        '                   typeahead-editable="false">',
        
        '               <span class="indicators">',
        '                   <span class="is-valid glyphicon glyphicon-ok-sign"></span>',
        '                  <span class="is-invalid glyphicon glyphicon-exclamation-sign"></span>',
        '              </span>',
        
        '           </div>',
        
        '          <span class="input-group-btn">',
        
        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{\'btn-lg\':size===\'large\'}"' ,
        '                   ng-click="cancel()" title="Cancel changes">',
        '                   <span class="glyphicon glyphicon-ban-circle"></span>',
        '              </button>',
        
        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{disabled:!!error||!isDirty,\'btn-lg\':size===\'large\'}"' ,
        '                   ng-disabled="{{!!error}}" ',
        '                   ng-click="save()" title="Save changes">',
        '                  <span class="glyphicon glyphicon-ok"></span>',
        '               </button>',
        
        '           </span>',
        
        '       </div>',
        
        '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>',
        '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>',
        
        '   </div>',
        
        '</div>'

    ].join(' ');

})(jQuery, angular);
;
(function(angular) {
    
    "use strict";

    angular.module("gp-common").directive('gpTweetButton', ['$timeout', function($timeout) {
        
        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }

        return {
            link: function(scope, element, attr) {

                if(typeof(twttr) === 'undefined') {
                    element.className += ' disabled';
                    return;
                }

                var renderTwitterButton = debounce(function() {
                    if (attr.url) {
                        $timeout(function() {
                            element[0].innerHTML = '';
                            twttr.widgets.createShareButton(
                                attr.url,
                                element[0],
                                function() {}, {
                                    count: attr.count,
                                    text: attr.text,
                                    via: attr.via,
                                    size: attr.size,
                                    hashtags: attr.hashtags,
                                    dnt: attr.dnt
                                }
                            );
                        });
                    }
                }, 75);
                attr.$observe('url', renderTwitterButton);
                attr.$observe('text', renderTwitterButton);
            }
        };
    }]);

}) (angular);
;
(function(angular) {

    "use strict";

    angular.module("gp-common").directive('sortOrder', function() {
        return {
            
            replace: true,
            require: 'ngModel',
            
            template: [
                '<div>',
                '<a class="btn btn-default" title="Click to sort in ascending order" href ng-if="value===\'dsc\'" ng-click="toggle()">',
                '    <span class="glyphicon glyphicon-sort-by-attributes-alt"></span>',
                '</a>',
                '<a class="btn btn-default" title="Click to sort in descending order" href ng-if="value===\'asc\'" ng-click="toggle()">',
                '    <span class="glyphicon glyphicon-sort-by-attributes"></span>',
                '</a>',
                '</div>'
            ].join(' '),

            link: function($scope, element, attrs, ngModel) {
                ngModel.$viewChangeListeners.push(function() {
                    $scope.$eval(attrs.ngChange);
                });
                ngModel.$render = function() {
                    $scope.value = ngModel.$modelValue;
                };
                $scope.toggle = function() {
                    $scope.value = $scope.value === 'asc' ? 'dsc' : 'asc';
                    ngModel.$setViewValue($scope.value);
                };
            }
        };
    });

})(angular);
;
(function(jQuery, angular) {
    
    "use strict"; 
    
    angular.module("gp-common")

    /**
     * Custom filter to make label values visually helpful by 
     * replacing bad characters with spaces or meaningful equivalents
     */
    .filter('fixLabel', function() {
        return function(input) {
            input = input || '';
            return input.replace(/_/g,' ');
        };
    })

    .filter('pluralize', function() {
        return function(text) {
            if(!text || !text.length) return "";
            if(text.endsWith('ss')) return text + 'es'; //classes, etc
            if(text.endsWith('s')) return text;         //already plural
            return text + 's';
            //TODO support irregular words like "foot" -> "feet"
            // and words that need duplicate letters: "quiz" -> "quizzes"
        };
    })    

    .filter('capitalize', function() {
        return function(text) {
            return text[0].toUpperCase() + text.substring(1);
        };
    })


    .filter('facets', function() {

        return function(arr,facetName) {
            if(!facetName) return arr;
            if(!arr || !arr.length) return [];
            return arr.filter(function(f){return f.toLowerCase().startsWith(facetName + ":");})
                .map(function(f) {return f.substring(f.indexOf(':')+1, f.length);});
        };

    })

    .filter('joinBy', function () {
        return function (input,delimiter,emptyValue) {
            if(input.length) return input.join(delimiter || ', ');
            else             return emptyValue || '';
        };
    })



    .filter('defaultValue', function() {
        return function(text, defVal) {
            if(typeof(text)==='undefined' || !text.length) return defVal;
            return text;
        };
    })

    .filter('count', function() {
        return function(input) {
            if(typeof(input) !== 'undefined') {
                if(typeof(input.push) === 'function') 
                    return input.length;
                if(typeof(input) === 'object') {
                    if(typeof(Object.keys) !== 'undefined') {
                        return Object.keys(input);
                    }
                }
            }
            return 0;
        };
    })

    ;

})(jQuery, angular);