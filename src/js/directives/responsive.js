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