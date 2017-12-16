
(function(angular) {

    'use strict';


    const PARAMETER = "terms";

    class RecommendedTermFilter {

        constructor(RecommenderService) {
            'ngInject';
            this.termService = RecommenderService;
        }

        $onInit () {
            this.isFetching = false;
            this.isEmpty    = false;
            this.collapse   = false;
            this.values     = [];
            this.termQuery  = null;
        }

        $onDestroy () {
            this.collapse   = null;
            this.values     = null;
            this.service    = null;
            this.termService = null;
            this.termQuery  = null;
            this.isFetching = false;
            this.isEmpty    = false;
        }

        onKeyUp (keyCode) {

        }

        onSelection ($item, $model, $label, $event) {
            this.values.push($model);   //append selection to list
            this.termQuery = null;      //clear the typeahead field
            this.update();
        }

        getOptions (text) {

            this.isFetching = true;
            this.isEmpty = false;

            let params = {
                q:text,
                size:12
            };
            if(this.type)
                params['for'] = this.type;

            return this.termService.query(params).$promise
            .then( response => {
                let results = response.results;
                this.isEmpty = !results.length;
                return results;
            })
            .catch( e => {
                this.isEmpty = true;
                console.log("Error finding semantic terms: " + e.message);
            })
            .finally( () => {
                this.isFetching = false;
            });
        }

        hasSelections () {
            return this.values.length;
        }

        removeValue (index) {
            if(this.values.length >= index) {
                this.values.splice(index, 1);
                this.update();
            }
        }

        clear () {
            this.values = [];
            this.update();
        }

        update () {
            let value = this.values.length ? this.values.map( v => v.uri ) : null;
            this.service.applyOption(PARAMETER, value, true);
        }
    }


    angular.module('gp-common').component('recommendedTermFilter', {
        bindings: {

            //type of object being searched (ie, Layer, Map)
            type: '@',

            //BrowseObjectService the filter will affect
            service: "<"
        },

        controller: RecommendedTermFilter,

        template:
        `
            <div class="card c-filter__recommended-terms">

                <h5 class="card-title l-flex-container flex-justify-between flex-align-center">

                    Filter using Semantic Concepts

                    <button type="button" class="btn btn-sm btn-link"
                        title="{{$ctrl.collapse?'Expand':'Collapse'}}"
                        ng-click="$ctrl.collapse = !$ctrl.collapse">
                        <span class="glyphicon"
                            ng-class="{'glyphicon-chevron-up':!$ctrl.collapse,'glyphicon-chevron-down':$ctrl.collapse}"></span>
                    </button>
                </h5>

                <div class="c-facets" ng-class="{'is-collapsed':$ctrl.collapse}">

                    <div class="c-facet__value">

                        <div class="input-group-slick">
                            <input name="termQuery" type="text" class="form-control"
                              ng-model="$ctrl.termQuery"
                              typeahead-on-select="$ctrl.onSelection($item, $model, $label, $event)"
                              uib-typeahead="opt as opt.label for opt in $ctrl.getOptions($viewValue)"
                              typeahead-loading="$ctrl.isFetching"
                              typeahead-no-results="$ctrl.isEmpty"
                              ng-model-options="{ debounce: 250 }"
                              typeahead-min-length="2"
                              typeahead-editable="false"
                              placeholder="Find a concept">
                            <span class="glyphicon glyphicon-hourglass spin" ng-if="$ctrl.isFetching"></span>
                        </div>

                        <div ng-show="$ctrl.isEmpty">No Results Found</div>

                    </div>

                    <a ng-repeat="term in $ctrl.values" class="c-facet__value active"
                        title="Remove this term from the query"
                        ng-click="$ctrl.removeValue($index)">
                        <span class="glyphicon glyphicon-check"></span>
                        {{term.label}}
                    </a>

                </div>

            </div>
        `
    });

}) (angular);
