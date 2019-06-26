(function(jQuery, angular) {

    'use strict';

    angular.module('gp-common').directive('gpDatePicker', ['$timeout', function($timeout) {

        return {
            scope: {
                label: '@',
                format: '@',
                date: '=',
                onChange: '&?'
            },
            template: [
                '<div class="input-group-slick">',
                '    <input type="text" class="form-control" placeholder="{{::label}}"',
                '        datepicker-popup="{{format}}" ng-model="date" is-open="opened" />',
                '    <span class="gpicons calendar" ng-click="toggle($event)"></span>',
                '</div>',
                '<p class="help-block"><small><em>Ex: "2015-01-31" or "Jan 31 2015"</em></small></p>'
            ].join(' '),

            controller: function($scope, $element, $attrs) {

                //toggle date picker
                $scope.toggle = function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.opened = !this.opened;
                };

                if(!$scope.format)
                    $scope.format = 'MMM dd yyyy';

                var promise = null;

                $scope.debounce = function() {
                    if(promise) $timeout.cancel(promise);
                    promise = $timeout(function() {
                        promise = null;
                        if($scope.onChange)
                            $scope.onChange();
                    }, 200);
                };

                $scope.$watch('date', function() {
                    $scope.debounce();
                });

                var listener = $scope.$on('$destroy', function() {

                    listener();             //deregister listener

                    if(promise) $timeout.cancel(promise);
                    promise = null;

                    $scope.opened = false;    //close picker if open
                    $scope.onChange = null;
                    $scope.format = null;
                    $scope.debounce = null;
                });

            }
        };

    }]);

})(jQuery, angular);
