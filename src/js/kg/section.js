

( function(angular, Constants) {
    
    'use strict';


    class SectionController {

        constructor($timeout, RecommenderService) {
            'ngInject';
            
            this.$timeout = $timeout;
            this.service = RecommenderService;
        }

        $onInit () {
            this.noResults = false;
            this.query = '';
            this.displayOptions = {
                fetching: false,
                showSuggested: false
            };
            this.paging = {
                start: 0,
                size: 5,
                sizeOptions: [5, 10, 20]
            };
            this.updateCache();
        }

        /**
         * Update cache when bound 'ngModel' is actually assigned in the component lifecycle
         */
        $onChanges () {
            this.updateCache();
        }

        $onDestroy() {
            this.eventHandlers = null;
            this.clearOptions();
            this.selected = null;
            this.service = null;
            this.$timeout = null;
        }

        /**
         * 
         * @param {object} item - selected value being activated (clicked on for navigation)
         */
        activate(item) {
            if(this.onActivate)
                this.onActivate({value: item});
        }

        on (event, callback) {
            this.eventHandlers = this.eventHandlers || {};
            this.eventHandlers[event] = this.eventHandlers[event] || [];
            this.eventHandlers[event].push(callback);
        }

        notify(event, data) {
            if(!this.eventHandlers || !this.eventHandlers[event]) return;
            angular.forEach(this.eventHandlers[event], (handler) => { 
                try { handler(data); } catch(e) { } 
            });
        }


        /**
         * @param {string} query - keywords provided by user input
         * @return {Promise} resolving an array of results
         */
        fetchOptions (query) {
            
            //need this timeout or else 'this.query' isn't being 
            // seen as having the same value as 'query'
            this.$timeout( () => { this.query = query; }, 10);

            this.displayOptions.fetching = true;
            let params = {
                type:   this.type,
                q:      query,
                page:   Math.floor(this.paging.start/this.paging.size),
                size:   this.paging.size
            };

            return this.service.query(params).$promise
            .then(  response => {
                this.paging.total = response.totalResults;
                this.notify('gp:browse:suggestions:pagination', this.paging);
                this.suggested = response.results.map( result => {
                    result._selected = this.isSelected(result);
                    return result;
                });
                this.displayOptions.showSuggested = true;
                return this.suggested;
            })
            .catch( e        => { 
                this.paging.total = 0;
                this.notify('gp:browse:suggestions:pagination', this.paging);
                this.suggested = [];
                return this.suggested;
            })
            .finally( ()     => this.displayOptions.fetching = false );
        }

        clearQuery () {
            this.query='';
            this.fetchOptions(this.query);
        }

        clearOptions () {

            //clear query and available options
            this.query='';
            this.suggested = null;

            //reset paging
            this.paging.start = 0;
            this.paging.total = 0;
            // this.notify('gp:browse:suggestions:pagination', this.paging);

            //hide available options
            this.displayOptions.showSuggested = false;
        }
        
        /**
         * @param {integer} index - position in selected array of item removed
         */
        remove (index) {
            
            let removed = this.ngModel[index].uri;
            this.ngModel.splice(index, 1);

            //remove from suggested list if one is populated (being shown)
            if(this.suggested && this.suggested.length) {
                let found = this.suggested.find( it => it.uri === removed );
                if(found) found._selected = false;
            }
            this.updateCache();                       //update cache of selected ids
            
            if(this.onChange)
                this.onChange({values: this.ngModel});  //notify others of change
        }

        /**
         * @param {object} value - item being checked for selection
         * @return {boolean}
         */
        isSelected (value) {
            return value._selected || ~this.selected.indexOf( value.uri );
        }

        /**
         * @param {object} value - item being selected
         */
        selectValue (value) {
            if(value._selected) return; //already selected

            value._selected = true;

            this.ngModel = this.ngModel || [];
            this.ngModel.push(value);
            this.updateCache();

            if(this.onChange)
                this.onChange({values: this.ngModel});

        }

        updateCache () {
            this.selected = (this.ngModel || []).map( o => o.uri );
        }

        onDropdownToggled (open) {
            if(!open) this.clearOptions();
        }


        /* -------- pagination methods ----------- */

        getPagination () {
            return this.paging;
        }

        start (index) {
            this.paging.start = index;
            this.fetchOptions(this.query);
        }

        size (value) {
            this.paging.size = value;
            this.fetchOptions(this.query);
        }
        
    }




    angular.module('gp-common-kg').component('kgSection', {

        bindings: {
            ngModel: '<',
            label: '@',
            description: '@',
            type: '@',
            onChange: '&?',
            onActivate: '&?'
        },

        controller: SectionController,

        template: 
        `
            <h5>{{$ctrl.label}}</h5>
            <p>{{$ctrl.description}}</p>

            <div class="list-group list-group-sm">
                <div ng-repeat="item in $ctrl.ngModel track by $index" class="list-group-item">
                    <button type="button" class="btn btn-link" ng-click="$ctrl.remove($index)">
                        <span class="glyphicon glyphicon-remove-circle t-fg--danger"></span> 
                    </button>
                    <div class="flex-1 u-pd--md">
                        <div class="u-pd-bottom--sm t-text--strong">
                            <a ng-click="$ctrl.activate(item)" ng-if="$ctrl.onActivate">{{item.label}}</a>
                            <span ng-if="!$ctrl.onActivate">{{item.label}}</span>
                        </div>
                        <div class="u-text--sm t-text--italic">
                            <a href="{{item.uri}}" target="_blank" title="Open source info in new window">{{item.uri}}</a>
                        </div>
                        <div class="description">{{item.description||"No description provided"}}</div>
                    </div>
                </div>
            </div>

            <div class="t-fg--gray-md" ng-if="!$ctrl.ngModel.length"><em>No values specified</em></div>            

            <hr>

            <div uib-dropdown is-open="$ctrl.displayOptions.showSuggested" 
                auto-close="outsideClick" on-toggle="$ctrl.onDropdownToggled(open)">

                <div class="l-flex-container flex-justify-between flex-align-center">
                    <div class="input-group-slick flex-1">
                        <span class="glyphicon"
                            ng-class="{'glyphicon-search':!$ctrl.displayOptions.fetching, 'glyphicon-hourglass spin':$ctrl.displayOptions.fetching}"></span>
                        <input type="text" class="form-control" 
                            ng-model="$ctrl.query" 
                            ng-model-options="{ debounce: 250 }"
                            ng-change="$ctrl.fetchOptions($ctrl.query)"
                            placeholder="Find values to add...">
                    </div>
                </div>
                
                <div class="dropdown-menu" uib-dropdown-menu>
                    
                    <div class="form-group l-flex-container flex-justify-between flex-align-center">
                        <div class="input-group-slick flex-1">
                            <span class="glyphicon"
                                ng-class="{'glyphicon-search':!$ctrl.displayOptions.fetching, 'glyphicon-hourglass spin':$ctrl.displayOptions.fetching}"></span>
                            <input type="text" class="form-control" 
                                ng-model="$ctrl.query" 
                                ng-model-options="{ debounce: 250 }"
                                ng-change="$ctrl.fetchOptions($ctrl.query)"
                                placeholder="Find values to add...">
                            <span class="glyphicon glyphicon-remove"
                                ng-if="$ctrl.query.length"
                                ng-click="$event.stopPropagation();$ctrl.clearQuery()"></span>
                        </div>
                        <button type="button" class="btn btn-info u-mg-left--xlg animated-show"
                            ng-click="$ctrl.clearOptions();">
                            Done
                        </button>
                    </div>
                    
                    <gp-pagination service="$ctrl" event-key="suggestions" use-select="true"></gp-pagination>

                    <div class="list-group list-group-sm u-text--sm">
                        <div ng-repeat="item in $ctrl.suggested track by $index" class="list-group-item">
                            <button type="button" class="btn btn-link" ng-click="$ctrl.selectValue(item)"
                                ng-class="{disabled:item._selected}">
                                <span class="glyphicon glyphicon-ok t-fg--gray-md" ng-show="item._selected"></span> 
                                <span class="glyphicon glyphicon-plus-sign t-fg--success" ng-show="!item._selected"></span> 
                            </button>
                            <div class="flex-1 u-pd--md">
                                <div class="t-text--strong u-pd-bottom--sm">{{item.prefLabel}}</div>
                                <a href="{{item.uri}}" target="_blank" class="u-text--sm t-text--italic"
                                    title="Open source info in new window">
                                    {{item.uri}}
                                </a>
                                <span class="description">{{item.description||"No description provided"}}</span>
                            </div>
                        </div>
                        <div ng-if="!$ctrl.suggested.length" class="list-group-item disabled u-pd--md">
                            No results match your query
                        </div>
                    </div>
                </div>
            </div>
        `
    });

}) (angular, GeoPlatform);

