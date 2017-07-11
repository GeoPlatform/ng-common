(function(angular) {
    
    'use strict';

    /** 
     * directive used in conjunction with ng-model to map arrays of strings
     * to form field controls for editing.
     *
     * Usage:  <input ng-model="arrOfStr" string-array-input></input>
     *
     */
    angular.module('gp-common').directive('stringArrayInput', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attr, ngModel) {
                
                function fromInput(text) {
                    let result = null;
                    if(text && text.length)
                        result = text.split(',').map( i => i.trim() );
                    return result;
                }

                function toInput(arr) {
                    let result = null;
                    if(arr && typeof(arr.push) !== 'undefined')
                        result = arr.join(', ');
                    return result;
                }

                ngModel.$parsers.push(fromInput);
                ngModel.$formatters.push(toInput);

            }
        };
    });

}) (angular);