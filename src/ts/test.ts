(function(angular) {

  'use strict';

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
    .service('TestService', ['$q', '$http', '$location', '$rootScope', '$window', 'GPConfig',
      function($q, $http, $location, $rootScope, $window, Config) {

        let a: string;
        
        a = "somthing"
        
        
        return {};
        
      }
    ]);

    console.log("TypeScript TEST")

})(angular);
