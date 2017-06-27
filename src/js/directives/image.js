(function(angular, Constants) {
    
    "use strict";

    angular.module("gp-common")


    .directive('onImgFail', function() {
        return {
            restrict: "A",
            link: function($scope, $element, $attrs) {
                var jqEl = jQuery($element);
                jqEl.on('error', function() {
                    jqEl.off('error');
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
                    .then(  (m) => { 
                        if(typeof(m.thumbnail) === 'string')    //old map model
                            $element.attr('src', getUrl(m)); 
                        else 
                            buildThumbnail(m);                  //open map model
                    })
                    .catch( (e) => { $element.attr('src', null); });

                } else {
                    if(typeof(map.thumbnail) === 'string')    //old map model
                        $element.attr('src', getUrl(map));
                    else 
                        buildThumbnail(map);
                }

                function buildThumbnail(map) {
                    if(!map.thumbnail) {
                        $element.attr('src', null);

                    } else if(map.thumbnail.contentData) {
                        $element.style({
                            width: (map.thumbnail.width||'32') + 'px',
                            height: (map.thumbnail.height||'32') + 'px',
                            background: 'url(data:' + 
                                (map.thumbnail.mediaType||'image/png') + ';base64,' + 
                                map.thumbnail.contentData + ')'
                        });

                    } else if(map.thumbnail.url) {
                        $element.attr('src', map.thumbnail.url);
                    } else 
                        $element.attr('src', null);

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

}) (angular, GeoPlatform);