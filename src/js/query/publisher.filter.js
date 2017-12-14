(function(angular, Constants) {

    'use strict';

    const PUBLISHER_FACET = 'publishers';

    angular.module('gp-common').component('publisherFilter', {
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
                return (this.service.getAgencies() || []).length;
            };

            this.isSelected = function(value) {
                let selected =    this.service.getAgencies() || [];
                return ~selected.indexOf(value.id);
            };

            this.toggle = function(value) {
                let selected =  this.service.getAgencies() || [];
                let idx =       selected.indexOf(value.id);
                if(idx >= 0)    selected.splice(idx, 1);
                else            selected.push(value.id);
                this.service.setAgencies(selected);
            };

            this.clear = function() {
                let selected = this.service.getAgencies() || [];
                if(!selected || !selected.length)
                    this.collapse = !this.collapse; //toggle collapsed state
                else
                    this.service.setAgencies([]);
            };

            this.getCount = function(value) {
                var facet = this.service.getFacet(PUBLISHER_FACET);
                if(!facet) return '';
                var valObj = facet.buckets.find(function(v) { return v.label===value.id; });
                if(!valObj) return '';
                return valObj.count;
            };

            this.updateValues = function(query) {

                return $http.get(Constants.ualUrl + '/api/items', {
                    params: {
                        type:'org:Organization',
                        sort: 'label,asc',
                        q: query,
                        size: 20,
                        bust: new Date().getTime()
                    }
                }).then( (response) => {

                    let total = response.data.totalResults;
                    let newValues = response.data.results.slice(0);
                    this.additionalValueCount = total - newValues.length;

                    let selections = this.service.getAgencies();
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

                }, (response) => {
                    console.log("(" + response.status + ") " + response.statusText);
                });
            };
        },
        template:
        `
            <div class="card">
                <h5 class="card-title l-flex-container flex-justify-between flex-align-center">
                    <span class="flex-1">Filter by Publisher(s)</span>
                    <button type="button" class="btn btn-sm btn-link"
                        title="{{$ctrl.collapse?'Expand':'Collapse'}}"
                        ng-click="$ctrl.collapse = !$ctrl.collapse">
                        <span class="glyphicon" ng-class="{'glyphicon-chevron-up':!$ctrl.collapse,'glyphicon-chevron-down':$ctrl.collapse}"></span>
                    </button>
                </h5>
                <div class="card-content">
                    <div class="c-facets" ng-class="{'is-collapsed':$ctrl.collapse}">

                        <div class="c-facet__value">
                            <div class="input-group-slick">
                                <input name="scheme-typeahead" type="text" class="form-control"
                                    ng-model="$ctrl.typeaheadValue"
                                    ng-change="$ctrl.updateValues($ctrl.typeaheadValue)"
                                    ng-model-options="{debounce:200}"
                                    placeholder="Search by name">
                                <span class="glyphicon glyphicon-remove"
                                    title="Clear query"
                                    ng-if="$ctrl.typeaheadValue.length"
                                    ng-click="$ctrl.updateValues($ctrl.typeaheadValue=null)">
                                </span>
                            </div>
                        </div>

                        <a class="c-facet__value" ng-click="$ctrl.clear()"
                            ng-class="{active:!$ctrl.hasSelections()}">
                            <span class="glyphicon"
                                ng-class="{'glyphicon-check':!$ctrl.hasSelections(), 'glyphicon-unchecked t-fg--gray-lt':$ctrl.hasSelections()}">
                            </span>
                            Any Publisher
                        </a>
                        <a  ng-repeat="value in $ctrl.values track by $index"
                            class="c-facet__value"
                            ng-click="$ctrl.toggle(value)"
                            ng-class="{active:$ctrl.isSelected(value)}">

                            <span class="badge pull-right">{{$ctrl.getCount(value)}}</span>
                            <span class="glyphicon"
                                ng-class="{'glyphicon-check':$ctrl.isSelected(value),'glyphicon-unchecked t-fg--gray-lt':!$ctrl.isSelected(value)}"></span>
                            {{value.label}}
                        </a>
                        <div class="c-facet__value t-fg--gray-md"
                            ng-if="$ctrl.additionalValueCount">
                            <em>plus {{$ctrl.additionalValueCount}} more options</em>
                        </div>
                    </div>
                </div>
            </div>
        `
    });

}) (angular, GeoPlatform);