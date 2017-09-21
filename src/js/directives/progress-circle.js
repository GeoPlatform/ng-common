(function(angular) {
    
    "use strict";


    /**
     * Usage: 
     *  <gp-progress-circle ng-model="$ctrl.amount"></gp-progress-circle>
     */
    angular.module('gp-common').component('gpProgressCircle', {

        bindings: {
            ngModel: '<'    //amount out of 100
        },

        controller: function() {

            this.$onInit = function() {
                this.dashArray = 2 * Math.PI * 45 /*radius*/;
                if(!this.ngModel)
                    this.ngModel = 0;
                this.update();
            };

            this.$onChanges = function(changes) {
                if(changes.ngModel)
                    this.update();
            };

            this.update = function() {
                let offset = 2 * Math.PI * 45 * (1 - ( this.ngModel / 100) );
                this.value = offset;
            };

        },

        template: 
        `
            <svg class="c-progress--circle" viewBox="0 0 100 100">
                <circle class="c-progress__meter" cx="50" cy="50" r="45" stroke-width="10" />
                <circle class="c-progress__value" cx="50" cy="50" r="45" stroke-width="10" 
                    stroke-dasharray="{{$ctrl.dashArray}}" stroke-dashoffset="{{$ctrl.value}}"/>
                <text class="c-progress__label" x="50" y="-40" text-anchor="middle">{{$ctrl.ngModel}}%</text>
            </svg>
        `
    });


}) (angular);