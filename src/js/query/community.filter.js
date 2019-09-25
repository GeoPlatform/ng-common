(function(angular, Constants) {

    'use strict';

    const FACET_NAME = 'usedBy.id';

    angular.module('gp-common').component('communityFilter', {
        bindings: {
            name: '@',      //name of this filter parameter,
            service: "<"
        },
        controller: function($http) {

            this.$onInit = function() {
                this.collapse   = true;
                this.updateValues();
            };

            this.$onDestroy = function() {
                this.values = null;
            };

            this.hasSelections = function() {
                return (this.service.getUsedBy() || []).length;
            };

            this.isSelected = function(value) {
                let selected =    this.service.getUsedBy() || [];
                return ~selected.indexOf(value.id);
            };

            this.toggle = function(value) {
                let selected =  this.service.getUsedBy() || [];
                let idx =       selected.indexOf(value.id);
                if(idx >= 0)    selected.splice(idx, 1);
                else            selected.push(value.id);
                this.service.setUsedBy(selected);
            };

            this.clear = function() {
                let selected = this.service.getUsedBy() || [];
                if(!selected || !selected.length)
                    this.collapse = !this.collapse; //toggle collapsed state
                else
                    this.service.setUsedBy([]);
            };

            this.getCount = function(value) {
                var facet = this.service.getFacet(FACET_NAME);
                if(!facet || !facet.buckets || !facet.buckets.length) return '';
                var valObj = facet.buckets.find(function(v) { return v.label===value.id; });
                if(!valObj) return '';
                return valObj.count;
            };

            this.updateValues = function(query) {

                return $http.get(Constants.ualUrl + '/api/communities', {
                    params: {
                        sort: '_score,desc', //DT-2461
                        q: query,
                        size: 20,
                        bust: new Date().getTime()
                    }
                }).then( (response) => {

                    let total = response.data.totalResults;
                    let newValues = response.data.results.slice(0);
                    this.additionalValueCount = total - newValues.length;

                    let selections = this.service.getUsedBy();
                    if(selections && selections.length && this.values && this.values.length) {
                        let existing = this.values.filter( v => {
                            //find existing values that are selected
                            return ~selections.indexOf(v.id) &&
                                // but not in new set of values
                                !newValues.filter( nv => nv.id === v.id).length;
                        });
                        newValues = existing.concat(newValues);
                    }

                    this.values = newValues;

                }).catch(response => {
                    console.log("(" + response.status + ") " + response.statusText);
                });
            };
        },
        template:
        `
            <div class="card o-query-filter">
                <div class="a-heading">
                    <button type="button" class="btn btn-sm btn-link"
                        title="{{$ctrl.collapse?'Expand':'Collapse'}}"
                        ng-click="$ctrl.collapse = !$ctrl.collapse">
                        <span class="gpicons" ng-class="{'minus':!$ctrl.collapse,'plus':$ctrl.collapse}"></span>
                        <span class="sr-only">Toggle community filter options</span>
                    </button>
                    <span class="flex-1">Filter by Communities</span>
                </div>
                <div class="o-facets" ng-class="{'is-collapsed':$ctrl.collapse}">

                    <div class="m-facet">
                        <div class="input-group-slick">
                            <input name="scheme-typeahead" type="text" class="form-control"
                                ng-model="$ctrl.typeaheadValue"
                                ng-change="$ctrl.updateValues($ctrl.typeaheadValue)"
                                ng-model-options="{debounce:200}"
                                placeholder="Search by name"
                                aria-label="Find a community by name">
                            <span class="gpicons times"
                                title="Clear query"
                                ng-if="$ctrl.typeaheadValue.length"
                                ng-click="$ctrl.updateValues($ctrl.typeaheadValue=null)">
                            </span>
                        </div>
                    </div>

                    <a class="m-facet" ng-click="$ctrl.clear()"
                        ng-class="{active:!$ctrl.hasSelections()}">
                        <span class="gpicons"
                            ng-class="{'check':!$ctrl.hasSelections(), 'square t-fg--gray-lt':$ctrl.hasSelections()}">
                        </span>
                        Any Community
                    </a>
                    <a  ng-repeat="value in $ctrl.values track by $index"
                        class="m-facet"
                        ng-click="$ctrl.toggle(value)"
                        ng-class="{active:$ctrl.isSelected(value)}">

                        <span class="badge pull-right">{{$ctrl.getCount(value)}}</span>
                        <span class="gpicons"
                            ng-class="{'check':$ctrl.isSelected(value),'square t-fg--gray-lt':!$ctrl.isSelected(value)}"></span>
                        {{value.label}}
                    </a>
                    <div class="m-facet disabled t-fg--gray-md"
                        ng-if="$ctrl.additionalValueCount">
                        <em>plus {{$ctrl.additionalValueCount}} more options</em>
                    </div>
                </div>
            </div>
        `
    });

}) (angular, GeoPlatform);
