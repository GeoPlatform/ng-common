(function(angular) {
    
    "use strict";

    angular.module("gp-common")


    .directive('onImgFail', function() {
        return {
            restrict: "A",
            link: function($scope, $element, $attrs) {
                var jqEl = jQuery($element);
                jqEl.on('error', function() {
                    jqEl.attr('src', $attrs.onImgFail);
                });
            }
        };
    })


    .directive('mapThumbnail', [function() {
        return {
            restrict: "A",
            scope: {
                mapThumbnail: '='
            },
            link: function($scope, $element, $attrs) {

                let map = $scope.mapThumbnail;

                if(map.$promise && !map.$resolved) {

                    map.$promise
                    .then(  (m) => { $element.attr('src', getUrl(m)); })
                    .catch( (e) => { $element.attr('src', null); });

                } else {
                    $element.attr('src', getUrl(map));
                }

                function getUrl(map) {
                    var url = map.thumbnail;
                    if(!url || !url.length)
                        url = Constants.ualUrl + '/api/maps/' + map.id + '/thumbnail';
                    else if(url.indexOf("http") !== 0) {
                        if(url[0] !== '/')
                            url = Constants.ualUrl + '/' + url;
                        else 
                            url = Constants.ualUrl + url;
                    }
                    return url;
                }
            }
        };

    }]);

}) (angular);