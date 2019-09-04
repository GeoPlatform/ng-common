
(function(angular) {

    'use strict';

    class CreatedBy extends GeoPlatform.AuthenticatedComponent {

        constructor($rootScope, AuthenticationService) {
            super($rootScope, AuthenticationService);
        }

        $onInit () {
            super.$onInit();

            this.value = null;
            this.collapse    = true;    //hide show controls
            this.limitToUser = false;   //filter using current user
            this.modelOptions = {
                'updateOn': 'default blur',
                'debounce': {
                  'default': 250,
                  'blur': 0
                }
            };

            this.listener = this.service.on(this.service.events.LOADING, () => {
                if(this.value !== this.service.getCreatedBy()) {
                    this.value = this.service.getCreatedBy();
                    this.limitToUser = false;   //toggle "mine" off
                }
            });
        }

        $onDestroy () {
            super.$onDestroy();
            this.listener();
            this.listener    = null;
            this.value       = null;
            this.collapse    = null;
            this.limitToUser = null;
            this.username    = null;
        }

        onAuthEvent(event, user) {
            super.onAuthEvent(event, user);
            //if user logged out but was still constrained to their items,
            // refresh without that filter
            if(!user && this.limitToUser) {
                this.limitToUser = null;
                this.filter();
            }
        }

        filter () {
            let value = (this.limitToUser) ? this.authState.user.username : this.value;
            if(typeof(value) !== 'undefined' && value !== null && value.trim().length === 0)
                value = null;    //don't accept empty strings
            this.service.setCreatedBy(value, true);
        }

        toggleLimitToUser () {
            this.limitToUser = !this.limitToUser;
            this.filter();
        }

        clear () {
            this.value = null;
            this.filter();
        }

    }

    angular.module('gp-common').component('createdByFilter', {

        bindings: {
            service: '<'   //service filtering by
        },

        controller: CreatedBy,
        template:
        `
            <div class="card o-query-filter">
                <div class="a-heading">
                    <button type="button" class="btn btn-sm btn-link"
                        title="{{$ctrl.collapse?'Expand':'Collapse'}}"
                        ng-click="$ctrl.collapse = !$ctrl.collapse">
                        <span class="gpicons" ng-class="{'minus':!$ctrl.collapse,'plus':$ctrl.collapse}"></span>
                        <span class="sr-only">Toggle created by filter options</span>
                    </button>
                    <span class="flex-1">Filter by Author</span>
                </div>

                    <div class="o-facets" ng-hide="$ctrl.collapse">

                        <div class="m-facet">
                            <div class="input-group-slick">
                                <span class="gpicons user"></span>
                                <input type="text" class="form-control" placeholder="Specify author username"
                                    ng-disabled="$ctrl.limitToUser"
                                    ng-model="$ctrl.value"
                                    ng-model-options="$ctrl.modelOptions"
                                    ng-change="$ctrl.filter()"
                                    aria-label="Search authors">
                                <span class="gpicons times" title="Clear author"
                                    ng-if="$ctrl.value.length&&!$ctrl.limitToUser" ng-click="$ctrl.clear()"></span>
                            </div>

                            <label class="control-label u-text--sm text-muted u-pd-top--sm" ng-if="$ctrl.isAuthenticated()">
                                <input type="checkbox" ng-model="$ctrl.limitToUser" ng-change="$ctrl.filter()">
                                Only show my items
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        `
    });

}) (angular);
