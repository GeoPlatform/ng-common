

( function(angular, Constants) {

    'use strict';


    const CONCEPT = 'skos:Concept';


    class SectionController {

        constructor($timeout /*, RecommenderService */) {
            'ngInject';

            this.$timeout = $timeout;
            // this.service = RecommenderService;
        }

        $onInit () {
            this.noResults = false;
            this.query = '';
            this.displayOptions = {
                fetching: false,
                showSuggested: false,
                showCustom : false
            };
            this.paging = {
                start: 0,
                size: 5,
                sizeOptions: [5, 10, 20]
            };
            this.updateCache();

            //default section description if one was not provided
            if(!this.description)
                this.description = '<em>No description provided</em>';

            if(!this.service) {
                console.log("[WARN] KG Section was not provided a service");
            }
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
            // if(this.forType)
            //     params['for'] = this.forType;

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

        /**
         *
         */
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
         * @param index - integer position in selected array of item removed
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
         * @param value - item being checked for selection
         * @return boolean
         */
        isSelected (value) {
            return value._selected || ~this.selected.indexOf( value.uri );
        }

        /**
         * @param value - item being selected
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

        /**
         *
         */
        updateCache () {
            this.selected = (this.ngModel || []).map( o => o.uri );
        }

        /**
         * @param open - boolean
         */
        onDropdownToggled (open) {
            if(!open) this.clearOptions();
        }

        /**
         * @param item GeoPlatform Concept resource
         * @return string URL to access resource
         */
        getLinkTo( item ) {
            let uri = item.uri;
            if(!uri) return '#';

            const GP_URI_PATTERN = new RegExp('^http(s)?\:\/\/www\.geoplatform\.gov\/id\/metadata\-codelists','i');
            if(GP_URI_PATTERN.test(uri)) {
                let baseHref = this.getPortalHref();
                return baseHref + '/resources/concepts/' + item.id;
            }
            return uri;
        }

        /**
         * @return string URL to Portal in same environment as this deployed code
         */
        getPortalHref() {
            let url = Constants.portalUrl;
            if(!url) {
                url = Constants.ualUrl;
                if(!url) return '';
                if(url.indexOf("-ual.")) return url.replace('-ual', '');
                else return url.replace('ual', 'www');
            }
            return url;
        }

        /**
         *
         */
        toggleCreateCustom($event) {
            this.displayOptions.showCustom = !this.displayOptions.showCustom;
            if(!this.displayOptions.showCustom) {
                this.customLabel = '';
                this.customError = null;
            }

            if($event && $event.stopPropagation) {
                $event.stopPropagation();
            }
        }

        createCustom($event) {
            let obj = {
                type     : CONCEPT,
                label    : this.customLabel,
                prefLabel: this.customLabel
            };

            this.service.getCustomUri(obj).$promise
            .then( response => {
                obj.uri = response.uri;
                return this.service.createCustom(obj).$promise;
            })
            .then( result => {
                this.selectValue(result);   //add it to the selected list
                this.toggleCreateCustom();
            })
            .catch( err => {
                if(err.status === 409) {
                    //Tell user their label is not unique enough...
                    this.customError = "Your custom classifier's name is already taken";
                } else {
                    this.customError = err.message;
                }
            });

            if($event && $event.stopPropagation) {
                $event.stopPropagation();
            }
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
            service: '<',       //recommender service instance to use
            label: '@',
            description: '@',
            type: '@',          //type of KG property
            onChange: '&?',     //fire when value(s) change
            onActivate: '&?'    //fire when selected value link is clicked
        },

        controller: SectionController,

        template:
        `
            <div class="a-heading">{{$ctrl.label}}</div>
            <p class="u-text--sm" ng-bind-html="$ctrl.description"></p>

            <div class="list-group list-group-sm">
                <div ng-repeat="item in $ctrl.ngModel track by $index" class="list-group-item">
                    <button type="button" class="btn btn-link" ng-click="$ctrl.remove($index)">
                        <span class="gpicons times-circle t-fg--danger"></span>
                        <span class="sr-only">Deselect this item</span>
                    </button>
                    <div class="flex-1 u-pd--xs">
                        <div class="t-text--strong">
                            <a ng-click="$ctrl.activate(item)" ng-if="$ctrl.onActivate"
                                 class="u-break--all">{{item.label}}</a>
                            <span ng-if="!$ctrl.onActivate">{{item.label}}</span>
                        </div>
                        <div class="u-text--sm t-text--italic">
                            <a href="{{$ctrl.getLinkTo(item)}}" target="_blank" class="u-break--all"
                                title="Open source info in new window">{{$ctrl.getLinkTo(item)}}</a>
                        </div>
                        <div class="description" ng-if="item.description" ng-bind-html="item.description"></div>
                    </div>
                </div>
            </div>

            <div class="t-fg--gray-md" ng-if="!$ctrl.ngModel.length"><em>No values specified</em></div>

            <hr>

            <div uib-dropdown is-open="$ctrl.displayOptions.showSuggested"
                auto-close="outsideClick" on-toggle="$ctrl.onDropdownToggled(open)">

                <div class="l-flex-container flex-justify-between flex-align-center">
                    <div class="input-group-slick flex-1">
                        <span class="gpicons"
                            ng-class="{'search':!$ctrl.displayOptions.fetching, 'hourglass u-spin':$ctrl.displayOptions.fetching}"></span>
                        <input type="text" class="form-control"
                            ng-model="$ctrl.query"
                            ng-model-options="{ debounce: 250 }"
                            ng-change="$ctrl.fetchOptions($ctrl.query)"
                            placeholder="Find values to add..."
                            aria-label="Find values to add">
                    </div>
                </div>

                <div class="dropdown-menu" uib-dropdown-menu>

                    <div ng-if="!$ctrl.displayOptions.showCustom">

                        <div class="form-group l-flex-container flex-justify-between flex-align-center">
                            <div class="input-group-slick flex-1">
                                <span class="gpicons"
                                    ng-class="{'search':!$ctrl.displayOptions.fetching, 'hourglass u-spin':$ctrl.displayOptions.fetching}"></span>
                                <input type="text" class="form-control"
                                    ng-model="$ctrl.query"
                                    ng-model-options="{ debounce: 250 }"
                                    ng-change="$ctrl.fetchOptions($ctrl.query)"
                                    placeholder="Find values to add..."
                                    aria-label="Find values to add">
                                <span class="gpicons times"
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
                                    <span class="gpicons check t-fg--gray-md" ng-show="item._selected"></span>
                                    <span class="gpicons plus-circle t-fg--success" ng-show="!item._selected"></span>
                                    <span class="sr-only">Select or deselect this item</span>
                                </button>
                                <div class="flex-1 u-pd--xs">
                                    <div class="u-break--all t-text--strong">{{item.prefLabel}}</div>
                                    <a href="{{item.uri}}" target="_blank"
                                        class="u-break--all u-text--sm t-text--italic"
                                        title="Open source info in new window">
                                        {{item.uri}}
                                    </a>
                                    <div class="description">{{item.description||"No description provided"}}</div>
                                </div>
                            </div>
                            <div ng-if="!$ctrl.suggested.length" class="list-group-item disabled u-pd--md">
                                No results match your query
                            </div>

                            <!-- create custom
                            <div class="list-group-item">
                                <button type="button" class="btn btn-link" ng-click="$ctrl.toggleCreateCustom($event)"
                                    ng-class="{disabled:item._selected}">
                                    <span class="gpicons plus-circle t-fg--success" ng-show="!item._selected"></span>
                                    <span class="sr-only">Toggle custom creation fields</span>
                                </button>
                                <div class="flex-1 u-pd--xs">
                                    <div class="t-text--strong">New custom classifier</div>
                                    <div class="description">create a custom classifier to enrich this item</div>
                                </div>
                            </div>
                            -->

                        </div>

                    </div>

                    <div ng-if="$ctrl.displayOptions.showCustom">
                        <div>
                            Provide the name of the custom classifier and then a unique URI for it.
                        </div>
                        <div class="u-mg-top--sm>
                            <label for="{{$ctrl.type}}CustomLabel">Name</label>
                            <input type="text" class="form-control" id="{{$ctrl.type}}CustomLabel"
                                ng-model="$ctrl.customLabel" placeholder="Name the classifier">
                        </div>
                        <div class="u-mg-top--sm">
                            <button type="button" class="btn btn-sm btn-secondary"
                                ng-click="$ctrl.toggleCreateCustom($event)">
                                cancel
                            </button>
                            <button type="button" class="btn btn-sm btn-success"
                                ng-click="$ctrl.createCustom($event)"
                                ng-disabled="!$ctrl.customLabel.length">
                                create
                            </button>
                        </div>
                        <div ng-if="$ctrl.customError">
                            $ctrl.customError
                        </div>
                    </div>

                </div>
            </div>
        `
    });

}) (angular, GeoPlatform);
