
(function(angular) {

    'use strict';


    const PARAMETER = "concepts";

    class RecommendedTermFilter {

        constructor($timeout, RecommenderService) {
            'ngInject';
            this.termService = RecommenderService;
            this.$timeout = $timeout;
        }

        $onInit () {
            this.displayOpts = {
                fetching : false,
                empty    : false,
                collapse : false,
                suggest  : false
            };
            this.values     = [];
            this.suggested  = [];
            this.termQuery  = null;
            this.paging = {
                start: 0,
                size: 5,
                sizeOptions: [5, 10, 20]
            };
        }

        $onDestroy () {
            this.$timeout = null;
            this.displayOpts = null;
            this.values     = null;
            this.suggested  = null;
            this.service    = null;
            this.termService = null;
            this.termQuery  = null;
            this.paging     = null;
            this.eventHandlers = null;
        }


        /* ----------------- typeahead methods ------------------ */
        // onSelection ($item, $model, $label, $event) {
        //     this.values.push($model);   //append selection to list
        //     this.termQuery = null;      //clear the typeahead field
        //     this.update();
        // }
        //
        // getOptions (text) {
        //
        //     this.displayOpts.fetching = true;
        //     this.displayOpts.empty = false;
        //
        //     let params = {
        //         q:text,
        //         size:12
        //     };
        //     if(this.type)
        //         params['for'] = this.type;
        //
        //     return this.termService.query(params).$promise
        //     .then( response => {
        //         let results = response.results;
        //         this.displayOpts.empty = !results.length;
        //         return results;
        //     })
        //     .catch( e => {
        //         this.displayOpts.empty = true;
        //         console.log("Error finding semantic terms: " + e.message);
        //     })
        //     .finally( () => {
        //         this.displayOpts.fetching = false;
        //     });
        // }


        hideSuggested () {
            this.displayOpts.suggest = this.displayOpts.fetching =
                this.displayOpts.empty = false;
            this.termQuery = null;
            this.suggested = [];
            this.paging.start = this.paging.total = 0;
        }

        select (item) {
            item._selected = true;  //update status to show it's already _selected
            this.values.push(item); //append selection to list
            this.update();          //update overall browse query with new selection
        }

        getOptions () {

            let text = this.termQuery;
            // console.log("Querying using '" + text + "'");

            //if empty value was provided, don't search.
            if(!text || !text.length) {
                this.suggested = [];
                // this.suggestedTotal = this.suggestedCount = 0;
                this.paging.start = this.paging.total = 0;
                this.notify('gp:browse:suggestions:pagination', this.paging);
                // this.displayOpts.suggest = false;
                return;
            }

            //reset variables
            this.suggested = [];
            // this.suggestedTotal = this.suggestedCount = 0;
            this.displayOpts.suggest = true;
            this.displayOpts.fetching = true;
            this.displayOpts.empty = false;

            let params = {
                q:text,
                page: Math.floor(this.paging.start/this.paging.size),
                size: this.paging.size
            };
            if(this.type)
                params['for'] = this.type;

            this.termService.query(params).$promise
            .then( response => {
                let results = response.results;
                this.displayOpts.empty = !results.length;
                this.suggested = results.map( result => {
                    result._selected = this.isSelected(result);
                    return result;
                });
                this.paging.total = response.totalResults;
                this.notify('gp:browse:suggestions:pagination', this.paging);
            })
            .catch( e => {
                this.displayOpts.empty = true;
                this.suggested = [];
                this.paging.total = 0;
                this.notify('gp:browse:suggestions:pagination', this.paging);
                console.log("Error finding semantic terms: " + e.message);
            })
            .finally( () => {
                this.displayOpts.fetching = false;
                // this.displayOpts.suggest = true;
            });
        }

        hasSelections () {
            return this.values.length;
        }

        isSelected (item) {
            return this.values.filter( v => v.uri === item.uri ).length;
        }

        removeValue (index) {
            if(this.values.length >= index) {
                let removed = this.values.splice(index, 1)[0];   //remove from selected
                this.update();     //update overall browse query

                //update associated item in suggested list (if visible)
                if(this.suggested.length) {
                    let match = this.suggested.find( i => i.uri === removed.uri );
                    if(match) match._selected = false;
                }
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


        /* -------- pagination methods ----------- */

        on (event, callback) {
            this.eventHandlers = this.eventHandlers || {};
            this.eventHandlers[event] = this.eventHandlers[event] || [];
            this.eventHandlers[event].push(callback);
        }

        notify(event, data) {
            if(!this.$timeout || !this.eventHandlers || !this.eventHandlers[event]) return;
            this.$timeout( () => {
                angular.forEach(this.eventHandlers[event], (handler) => {
                    try { handler(data); } catch(e) { }
                });
            }, 100);
        }

        getPagination () {
            return this.paging;
        }

        start (index) {
            this.paging.start = index;
            this.getOptions();
        }

        size (value) {
            this.paging.size = value;
            this.getOptions();
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

                <div class="c-facets" ng-hide="$ctrl.collapse">

                    <!--
                    <div class="c-facet__value">

                        <div class="input-group-slick">
                            <input name="termQuery" type="text" class="form-control"
                              ng-model="$ctrl.termQuery"
                              typeahead-on-select="$ctrl.onSelection($item, $model, $label, $event)"
                              uib-typeahead="opt as ' (' + opt.context + ') ' + opt.label for opt in $ctrl.getOptions($viewValue)"
                              typeahead-loading="$ctrl.displayOpts.fetching"
                              typeahead-no-results="$ctrl.displayOpts.empty"
                              ng-model-options="{ debounce: 250 }"
                              typeahead-min-length="2"
                              typeahead-editable="false"
                              placeholder="Find a concept">
                            <span class="glyphicon glyphicon-hourglass spin" ng-if="$ctrl.displayOpts.fetching"></span>
                        </div>

                        <div ng-show="$ctrl.displayOpts.empty">No Results Found</div>

                    </div>
                    -->

                    <div class="input-group-slick">
                        <span class="glyphicon"
                            ng-class="{'glyphicon-search':!$ctrl.displayOpts.fetching, 'glyphicon-hourglass spin':$ctrl.displayOpts.fetching}"></span>
                        <input type="text" class="form-control"
                            ng-model="$ctrl.termQuery"
                            ng-model-options="{ debounce: 250 }"
                            ng-change="$ctrl.getOptions()"
                            placeholder="Find concepts">
                        <span class="glyphicon glyphicon-remove" ng-if="$ctrl.displayOpts.suggest"
                            ng-click="$ctrl.hideSuggested()"></span>
                    </div>

                    <gp-pagination service="$ctrl" event-key="suggestions" use-select="true"
                        ng-if="$ctrl.displayOpts.suggest">
                    </gp-pagination>

                    <div class="list-group list-group-sm u-text--sm"
                        ng-if="$ctrl.displayOpts.suggest && !$ctrl.displayOpts.fetching">

                        <a ng-repeat="item in $ctrl.suggested track by $index"
                            class="list-group-item"
                            ng-class="{disabled:item._selected}"
                            ng-click="$ctrl.select(item)">
                            <span class="u-break--all t-text--strong u-pd-bottom--sm">{{item.prefLabel}}</span>
                            <br>
                            <span class="u-break--all u-text--sm t-text--italic">{{item.uri}}</span>
                        </a>

                        <div ng-if="$ctrl.displayOpts.empty" class="list-group-item disabled u-pd--md">
                            No concepts found
                        </div>

                    </div>

                
                    <!-- selected terms -->
                    <a ng-repeat="term in $ctrl.values" class="c-facet__value active"
                        title="Remove this term from the query"
                        ng-click="$ctrl.removeValue($index)">
                        <span class="glyphicon glyphicon-check"></span>
                        {{term.context}} {{term.label}}
                    </a>

                </div>

            </div>
        `
    });

}) (angular);
