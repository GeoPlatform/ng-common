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

                        var style = 
                            'background-size:contain;' + 
                            'background-repeat:no-repeat;' + 
                            'background-image: url(data:' + 
                                (map.thumbnail.mediaType||'image/png') + ';base64,' + 
                                map.thumbnail.contentData + ');';

                        //if directive is on a responsive item (aka, in a gp-ui-card), 
                        // ignore thumbnail dimensions. Otherwise, use them
                        if($element.attr('class').indexOf('embed-responsive-item') < 0) {
                            style += 'width:' + (map.thumbnail.width||'32') + 'px;' +
                                     'height:' + (map.thumbnail.height||'32') + 'px;';
                        }

                        $element.attr('style', style);

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

    }])


    
    .directive('itemThumbnail', ['$q', function($q) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                item    : '=',
                fallback: '@',
                link:     '@'
            },
            template:
            `
                <a ng-show="hasThumbnail" class="media embed-responsive embed-responsive-16by9">
                    <img class="embed-responsive-item" on-img-error="{{fallback||'/img/img-404.jpg'}}">
                </a>
            `,
            controller: function($scope) {
                $scope.elName = 'div';

                $scope.isLink = !!$scope.link;
                if($scope.isLink) {
                    $scope.elName = 'a';
                }
            }, 
            link: function($scope, $element, $attrs) {

                let item = $scope.item;
                (item.$promise || $q.resolve(item)).then( (obj) => {

                    let url = $scope.fallback;
                
                    //maps
                    if(obj.type && obj.type === 'Map')
                        url = Constants.ualUrl + "/api/maps/" + obj.id + "/thumbnail";
                    //maps as gallery items
                    else if(obj.assetType && obj.assetType === 'Map')
                        url = Constants.ualUrl + "/api/maps/" + obj.assetId + "/thumbnail";
                    //other thumbnail'ed items with URLs
                    else if(obj.thumbnail && obj.thumbnail.url)
                        url = obj.thumbnail.url;
                    //other thumbnail'ed items with base64 content
                    else if(obj.thumbnail && obj.thumbnail.contentData) {
                        
                        var style = 
                            'background-size:contain;' + 
                            'background-repeat:no-repeat;' + 
                            'background-image: url(data:' + 
                                (obj.thumbnail.mediaType||'image/png') + ';base64,' + 
                                obj.thumbnail.contentData + ');';

                        //if directive is on a responsive item (aka, in a gp-ui-card), 
                        // ignore thumbnail dimensions. Otherwise, use them
                        if($element.attr('class').indexOf('embed-responsive-item') < 0) {
                            style += 'width:' + (obj.thumbnail.width||'32') + 'px;' +
                                     'height:' + (obj.thumbnail.height||'32') + 'px;';
                        }

                        $element.find('img').attr('style', style);
                    }
                    
                    $scope.hasThumbnail = !!url;
                    $element.find('img').attr('src', url);

                    if($scope.isLink) {
                        $element.find('.media').attr('href', $scope.link).attr('target', '_blank');
                    }
            
                })
                .catch( (e) => { 
                    $element.find('img').attr('src', $scope.fallback); 
                });
            }
        };

    }])

    ;

}) (angular, GeoPlatform);