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
        };

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