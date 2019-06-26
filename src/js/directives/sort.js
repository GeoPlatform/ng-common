(function(angular) {

    "use strict";

    angular.module("gp-common").directive('sortOrder', function() {
        return {

            replace: true,
            require: 'ngModel',

            template: [
                '<div>',
                '<a class="btn btn-default" title="Click to sort in ascending order" href ng-if="value===\'dsc\'" ng-click="toggle()">',
                '    <span class="gpicons sort-asc"></span>',
                '</a>',
                '<a class="btn btn-default" title="Click to sort in descending order" href ng-if="value===\'asc\'" ng-click="toggle()">',
                '    <span class="gpicons sort"></span>',
                '</a>',
                '</div>'
            ].join(' '),

            link: function($scope, element, attrs, ngModel) {
                ngModel.$viewChangeListeners.push(function() {
                    $scope.$eval(attrs.ngChange);
                });
                ngModel.$render = function() {
                    $scope.value = ngModel.$modelValue;
                };
                $scope.toggle = function() {
                    $scope.value = $scope.value === 'asc' ? 'dsc' : 'asc';
                    ngModel.$setViewValue($scope.value);
                };
            }
        };
    });

})(angular);
