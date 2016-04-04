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