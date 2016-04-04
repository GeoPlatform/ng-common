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