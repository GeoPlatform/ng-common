(function(angular, Constants) {

    'use strict';

    const PUBLISHER_FACET = 'publishers';

    class PublisherFilter {

        constructor($http) {
            this.$http = $http;
        }

        $onInit () {
            this.collapse = true;
            this.updateValues();
        }

        $onDestroy () {
            this.values = null;
            this.$http = null;
        }

        getSelected() { return this.service.getAgencies() || []; }

        hasSelections () { return this.getSelected().length; }

        isSelected (value) { return ~this.getSelected().indexOf(value.id); }

        toggle (value) {
            let selected =  this.getSelected();
            let idx =       selected.indexOf(value.id);
            if(idx >= 0)    selected.splice(idx, 1);
            else            selected.push(value.id);
            this.service.setAgencies(selected);
        }

        /**
         * @param {object} value - publisher being toggled selected/unselected
         */
        deselectOutside (value) {
            //remove selected item that is outside current filtered set of options
            this.outsideResults = (this.outsideResults || []).filter( v => v.id !== value.id );
            this.toggle(value);
        }

        clear () {
            let selected = this.getSelected();
            if(!selected || !selected.length)
                this.collapse = !this.collapse; //toggle collapsed state
            else
                this.service.setAgencies([]);
        }

        getCount (value) {
            var facet = this.service.getFacet(PUBLISHER_FACET);
            if(!facet || !facet.buckets || !facet.buckets.length) return '';
            var valObj = facet.buckets.find(function(v) { return v.label===value.id; });
            if(!valObj) return '';
            return valObj.count;
        }

        updateValues (query) {

            let params = {
                type:'org:Organization',
                sort: '_score,desc',     //DT-2461
                q: query,
                size: 20,
                bust: new Date().getTime()
            };
            return this.$http.get(Constants.ualUrl + '/api/items', { params: params })
            .then( (response) => {

                let total = response.data.totalResults;
                let newValues = response.data.results.slice(0);
                this.additionalValueCount = total - newValues.length;

                let selections = this.getSelected();
                if(selections.length) {
                    this.outsideResults = (this.values||[]).filter( v => {
                        //find existing values that are selected
                        return ~selections.indexOf(v.id) &&
                            // but not in new set of values
                            !newValues.filter( nv => nv.id === v.id).length;
                    });
                }

                this.values = newValues;

            }, (response) => {
                console.log("(" + response.status + ") " + response.statusText);
            })
            .catch( arg => {
                let e = (arg.data) ? arg.data : arg;
                let code = (arg.status) ? arg.status : 500;
                console.log("(" + code + ") " + e.message);
            });
        }
    }

    angular.module('gp-common').component('publisherFilter', {
        bindings: {
            name: '@',      //name of this filter parameter,
            service: "<"
        },
        controller: PublisherFilter,
        template:
        `
            <div class="card o-query-filter">
                <div class="a-heading">
                    <button type="button" class="btn btn-sm btn-link"
                        title="{{$ctrl.collapse?'Expand':'Collapse'}}"
                        ng-click="$ctrl.collapse = !$ctrl.collapse">
                        <span class="gpicons" ng-class="{'minus':!$ctrl.collapse,'plus':$ctrl.collapse}"></span>
                        <span class="sr-only">Toggle publisher filter options</span>
                    </button>
                    <span class="flex-1">Filter by Publishers</span>
                </div>
                <div class="o-facets" ng-class="{'is-collapsed':$ctrl.collapse}">

                    <div class="m-facet">
                        <div class="input-group-slick">
                            <input name="publisher-typeahead" type="text" class="form-control"
                                ng-model="$ctrl.typeaheadValue"
                                ng-change="$ctrl.updateValues($ctrl.typeaheadValue)"
                                ng-model-options="{debounce:200}"
                                placeholder="Find a Publisher by name..."
                                aria-label="Find a publisher by name">
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
                        Any Publisher
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



                    <div class="m-facet disabled" ng-if="$ctrl.outsideResults.length">
                        <em>The following selections are not in the above results</em>
                    </div>

                    <a ng-repeat="pub in $ctrl.outsideResults track by $index"
                        class="m-facet active" ng-click="$ctrl.deselectOutside(pub)">
                        <span class="badge pull-right">{{$ctrl.getCount(pub)}}</span>
                        <span class="gpicons check"></span>
                        {{pub.label || "Untitled Organization"}}
                    </a>

                </div>
            </div>
        `
    });

}) (angular, GeoPlatform);
