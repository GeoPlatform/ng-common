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