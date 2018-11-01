
(function(angular) {

    'use strict';

    const PARAMETER = 'similarTo';

    angular.module('gp-common').component('similarityFilter', {
        bindings: {

            //type of object being searched (ie, Layer, Map)
            type: '@',

            //BrowseObjectService the filter will affect
            service: "<",

            //optional, id of current map (if one exists)
            mapId: '@'
        },
        controller: function() {

            this.$onInit = function() {

                this.collapse   = true;
                this.value      = null;
                this.useMap     = false;

                let evtName     = this.service.events.SIMILARITY;
                this.applyListener   = this.service.on(evtName, (event, layer) => {
                    this.value  = layer;
                    this.service.applyOption(PARAMETER, this.value.id, true);
                });

                //listen to service for loading event so we can track if the user
                // has cleared the entire set of constraints outside of each filter
                // component
                this.checkListener = this.service.on(this.service.events.LOADING, () => {
                    let value = this.service.getQueryOption(PARAMETER);
                    if(!value) this.value = null;
                });

                if(!this.type)
                    this.type = "item";
            };

            this.$onDestroy = function() {
                this.applyListener();    //dispose of listeners
                this.checkListener();    //...
                this.collapse = null;
                this.value    = null;
                this.service  = null;
                this.mapId    = null;
            };

            this.hasSelections = function() {
                return !!this.value;
            };

            this.clearValue = function() {

                if(this.useMap) {
                    this.useMap = false;
                    this.service.applyOption(PARAMETER, this.value.id, true);
                } else {
                    this.value = null;
                    this.service.applyOption(PARAMETER, null, true);
                }

            };

            this.toggleCurrentMap = function(bool) {

                if(this.useMap) {   //if already using map, stop
                    this.useMap = false;

                    if(this.value) {
                        this.service.applyOption(PARAMETER, this.value.id, true);
                    } else {
                        this.service.applyOption(PARAMETER, false, true);
                    }

                } else {
                    this.useMap = true;
                    this.service.applyOption(PARAMETER, this.mapId, true);
                }
            };

        },
        template:
        `
            <div class="card c-query-filter" ng-if="$ctrl.value">

                <div class="card-title">Find Similar</div>
                <div class="card-content">

                    <p class="u-text--sm">Searching for {{$ctrl.type}}s similar to the following: </p>

                    <div class="c-facets">

                        <a class="c-facet__value" ng-if="$ctrl.value" ng-click="$ctrl.clearValue()">
                            <span class="glyphicon glyphicon-remove-circle"></span>
                            {{$ctrl.value.label}}
                        </a>

                        <!--
                        <a ng-if="$ctrl.mapId" class="c-facet__value"
                            ng-click="$ctrl.toggleCurrentMap()" ng-class="{active:$ctrl.useMap}">
                            <span class="glyphicon glyphicon-check" ng-show="$ctrl.useMap"></span>
                            <span class="glyphicon glyphicon-unchecked" ng-show="!$ctrl.useMap"></span>
                            Find similar to my current map
                        </a>
                        -->

                    </div>

                    <br>
                    <p class="u-text--sm">Note that query filters below are still being applied.</p>

                </div>
            </div>
        `
    });

}) (angular);
