(function(angular) {
    
    "use strict";

    angular.module("gp-common").directive('onImgFail', function() {
        return {
            link: function($scope, $element, $attrs) {
                var jqEl = jQuery($element);
                jqEl.on('error', function() {
                    jqEl.attr('src', $attrs.onImgFail);
                });
            }
        };
    });

}) (angular);