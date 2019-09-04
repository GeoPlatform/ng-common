
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

            //listen to service for loading event so we can track if the user
            // has cleared the entire set of constraints outside of each filter
            // component
            this.listener = this.service.on(this.service.events.LOADING, () => {
                let value = this.service.getQueryOption(PARAMETER);
                if(!value || !value.length) this.values = [];
                else {
                    if(typeof(value.push) === 'undefined')
                        value = value.split(',');
                    if(value.length !== this.values.length) {
                        console.log("[WARN] RecommendedTermFilter - service and filter " +
                            "have differing numbers of selected terms (" +
                            value.length + " vs " + this.values.length + ")");
                    }
                }
            });
        }

        $onDestroy () {
            this.listener();
            this.listener       = null;
            this.$timeout       = null;
            this.displayOpts    = null;
            this.values         = null;
            this.suggested      = null;
            this.service        = null;
            this.termService    = null;
            this.termQuery      = null;
            this.paging         = null;
            this.eventHandlers  = null;
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
            let found = this.values.find( it => it.uri === item.uri );
            if(!found) {
                item._selected = true;  //update status to show it's already _selected
                this.values.push(item); //append selection to list
                this.update();          //update overall browse query with new selection
            }
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
            <div class="card c-query-filter c-filter__recommended-terms">

                <div class="card-title">
                    <button type="button" class="btn btn-sm btn-link"
                        title="{{$ctrl.displayOpts.collapse?'Expand':'Collapse'}}"
                        aria-label="Toggle collapsed state of this filter"
                        ng-click="$ctrl.displayOpts.collapse = !$ctrl.displayOpts.collapse">
                        <span class="gpicons"
                            ng-class="{'minus':!$ctrl.displayOpts.collapse,'plus':$ctrl.displayOpts.collapse}"></span>
                            <span class="sr-only">Toggle semantic filter options</span>
                    </button>
                    <span>Filter using Semantic Concepts</span>
                </div>

                <div class="c-facets" ng-class="{'is-collapsed':$ctrl.displayOpts.collapse}">

                    <div ng-hide="$ctrl.displayOpts.collapse">

                        <div class="input-group-slick">
                            <span class="gpicons"
                                ng-class="{'search':!$ctrl.displayOpts.fetching, 'hourglass spin':$ctrl.displayOpts.fetching}"></span>
                            <input type="text" class="form-control"
                                ng-model="$ctrl.termQuery"
                                ng-model-options="{ debounce: 250 }"
                                ng-change="$ctrl.getOptions()"
                                placeholder="Find concepts"
                                aria-label="Find concepts">
                            <span class="gpicons times" ng-if="$ctrl.displayOpts.suggest"
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

                    </div>


                    <!-- selected terms -->
                    <div ng-repeat="term in $ctrl.values track by $index" class="c-facet__value active"
                        title="Remove this term from the query"
                        ng-click="$ctrl.removeValue($index)">

                        <div class="u-break--all t-text--strong u-pd-bottom--sm">
                            <button type="button" class="btn btn-sm btn-link pull-right">
                                <span class="gpicons times t-fg--danger"></span>
                            </button>
                            <span class="gpicons check"></span>
                            {{term.prefLabel}}
                        </div>
                        <div class="u-break--all u-text--sm t-text--italic">{{term.uri}}</div>
                    </div>

                </div>

            </div>
        `
    });

}) (angular);
