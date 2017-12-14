
(function(angular) {

    'use strict';

    angular.module('gp-common').component('createdByFilter', {

        bindings: {
            service: '<'   //service filtering by
        },

        controller: function(AuthenticationService) {

            this.$onInit = function() {
                this.value       = null;    //input from user for "created by" value
                this.collapse    = true;    //hide show controls
                this.limitToUser = false;   //filter using current user
                this.modelOptions = {
                    'updateOn': 'default blur',
                    'debounce': {
                      'default': 250,
                      'blur': 0
                    }
                };

                AuthenticationService.getUserQ().then( user => {
                    this.username = user ? user.username : null;
                });
            };

            this.$onDestroy = function() {
                this.value       = null;
                this.collapse    = null;
                this.limitToUser = null;
                this.username    = null;
            };

            this.filter = function() {
                let value = (this.limitToUser) ? this.username : this.value;
                if(typeof(value) !== 'undefined' && value !== null && value.trim().length === 0)
                    value = null;    //don't accept empty strings
                this.service.setCreatedBy(value, true);
            };

            this.toggleLimitToUser = function() {
                this.limitToUser = !this.limitToUser;
                this.filter();
            };

            this.clear = function() {
                this.value = null;
                this.filter();
            };

        },
        template:
        `
            <div class="card">
                <h5 class="card-title l-flex-container flex-justify-between flex-align-center">
                    <span class="flex-1">Filter by Author</span>
                    <button type="button" class="btn btn-sm btn-link"
                        title="{{$ctrl.collapse?'Expand':'Collapse'}}"
                        ng-click="$ctrl.collapse = !$ctrl.collapse">
                        <span class="glyphicon" ng-class="{'glyphicon-chevron-up':!$ctrl.collapse,'glyphicon-chevron-down':$ctrl.collapse}"></span>
                    </button>
                </h5>
                <div class="card-content" ng-hide="$ctrl.collapse">

                    <div class="input-group-slick">
                        <span class="glyphicon glyphicon-user"></span>
                        <input type="text" class="form-control" placeholder="Specify author username"
                            ng-disabled="$ctrl.limitToUser"
                            ng-model="$ctrl.value"
                            ng-model-options="$ctrl.modelOptions"
                            ng-change="$ctrl.filter()">
                        <span class="glyphicon glyphicon-remove" title="Clear author"
                            ng-if="$ctrl.value.length&&!$ctrl.limitToUser" ng-click="$ctrl.clear()"></span>
                    </div>

                    <label class="control-label u-text--sm text-muted u-pd-top--sm" ng-if="$ctrl.username">
                        <input type="checkbox" ng-model="$ctrl.limitToUser" ng-change="$ctrl.filter()">
                        Only show my maps
                    </label>
                </div>
            </div>
        `
    });

}) (angular);
