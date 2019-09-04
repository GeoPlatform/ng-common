(function(angular, Constants) {

    'use strict';


    class TopicsFilter {

        constructor ($http) {
            this.$http = $http;
        }

        $onInit () {
            this.collapse   = true;
            this.query = {
                type: 'Topic',
                sort: '_score,desc',
                size: 10
            };
            this.updateValues();
        }

        $onDestroy() {
            this.$http = null;
            this.service = null;
        }

        hasSelections () {
            let val = this.service.getTopics();
            return val && val.length;
        }

        isSelected (value) {
            let val = this.service.getTopics() || [];
            return val && val.length && ~val.indexOf(value);
        }

        toggle (value) {
            let val = this.service.getTopics() || [];
            if(!val) val = [];
            let index = val.indexOf(value);
            if(index >= 0) val.splice(index, 1);
            else val.push(value);
            this.service.setTopics(val);
        }

        clear () {
            if(!this.hasSelections())
                this.collapse = !this.collapse; //toggle collapsed state
            else this.service.setTopics([]);
        }

        getCount (value) {
            let facet = this.service.getFacet('topics');
            if(!facet) return '';
            let valObj = (facet.buckets||[]).find(function(v) { return v.label===value; });
            if(!valObj) return '';
            return valObj.count;
        }


        updateValues (keywords) {

            this.query.q = keywords;

            let params = this.query;
            params.bust = new Date().getTime();


            this.$http.get(Constants.ualUrl + '/api/items', { params: params })
            .then( (response) => {

                let total = response.data.totalResults;
                let newValues = response.data.results.slice(0);

                let selections = this.service.getTopics();
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
            }).catch( e => {
                console.log("Error fetching topics: " + e.message);
            });
        }
    }

    angular.module('gp-common').component('topicFilter', {
        bindings: {
            service: '<'
        },
        template:
        `
            <div class="card c-query-filter">
                <div class="card-title">
                    <button type="button" class="btn btn-sm btn-link"
                        title="{{$ctrl.collapse?'Expand':'Collapse'}}"
                        ng-click="$ctrl.collapse = !$ctrl.collapse">
                        <span class="gpicons"
                            ng-class="{'minus':!$ctrl.collapse,'plus':$ctrl.collapse}">
                        </span>
                        <span class="sr-only">Toggle topic filter options</span>
                    </button>
                    Filter by Topics
                </div>
                <div class="c-facets" ng-class="{'is-collapsed':$ctrl.collapse}">

                    <div class="c-facet__value">
                        <div class="input-group-slick">
                            <input name="topic-typeahead" type="text" class="form-control"
                                ng-model="$ctrl.typeaheadValue"
                                ng-change="$ctrl.updateValues($ctrl.typeaheadValue)"
                                ng-model-options="{debounce:200}"
                                placeholder="Search by name"
                                aria-label="Search topics by name">
                            <span class="gpicons times"
                                title="Clear query"
                                ng-if="$ctrl.typeaheadValue.length"
                                ng-click="$ctrl.updateValues($ctrl.typeaheadValue=null)">
                            </span>
                        </div>
                    </div>

                    <a class="c-facet__value" ng-click="$ctrl.clear()"
                        ng-class="{active:!$ctrl.hasSelections()}">
                        <span class="gpicons"
                            ng-class="{'check':!$ctrl.hasSelections(), 'square t-fg--gray-lt':$ctrl.hasSelections()}">
                        </span>
                        Any Topic
                    </a>

                    <a ng-repeat="topic in $ctrl.values track by $index"
                        class="c-facet__value"
                        ng-click="$ctrl.toggle(topic.id)"
                        ng-class="{active:$ctrl.isSelected(topic.id)}">
                        <span class="gpicons check" ng-show="$ctrl.isSelected(topic.id)"></span>
                        <span class="gpicons square t-fg--gray-lt" ng-show="!$ctrl.isSelected(topic.id)"></span>
                        <span class="badge">{{$ctrl.getCount(topic.id)}}</span>
                        {{topic.label || "Un-titled Topic"}}
                    </a>
                </div>
            </div>
        `,
        controller: TopicsFilter
    });

}) (angular, GeoPlatform);
