
(function(angular, Constants) {

    'use strict';


    class ThemesFilter {

        constructor($element, $http) {
            this.$el = $element;
            this.$http = $http;
        }

        $onInit() {
            this.collapse = true;
            this.query = {
                type:'skos:Concept',
                fields:'scheme',
                size: 20,
                sort: 'label,asc'
            };
            this.updateValues();
        }

        $onDestroy() {
            this.values = null;
            this.service = null;
            this.$el = null;
            this.$http = null;
        }

        /**
         * @return {array[object]} currently selected themes
         */
        getSelected() { return this.service.getThemes() || []; }

        /**
         * @return {boolean} true if any themes are selected
         */
        hasSelections() { return this.getSelected().length; }

        /**
         * @param {object} value - theme being checked
         * @return {boolean} true if specified theme is selected
         */
        isSelected(value) { return ~this.getSelected().indexOf(value.id); }

        /**
         * @param {object} value - theme being toggled selected/unselected
         */
        toggle(value) {
            let themes =    this.getSelected();
            let idx =       themes.indexOf(value.id);
            if(idx >= 0)    themes.splice(idx, 1);
            else            themes.push(value.id);
            this.service.setThemes(themes);
        }

        /**
         * @param {object} value - theme being toggled selected/unselected
         */
        deselectOutside(value) {
            //remove selected item that is outside current filtered set of options
            this.outsideResults = (this.outsideResults || []).filter( v => v.id !== value.id );
            this.toggle(value);
        }

        /**
         * Remove all selected themes
         */
        clear() {
            let themes = this.getSelected();
            if(!themes || !themes.length)
                this.collapse = !this.collapse; //toggle collapsed state
            else
                this.service.setThemes([]);
        }

        /**
         * @param {object} value - theme
         * @return {integer} facet count for specified theme
         */
        getCount(value) {
            var facet = this.service.getFacet('themes');
            if(!facet || !facet.buckets || !facet.buckets.length) return '';
            var valObj = facet.buckets.find(function(v) { return v.label===value.id; });
            if(!valObj) return '';
            return valObj.count;
        }

        /**
         * @param {object} scheme - concept scheme to constrain theme options using
         */
        onSchemeChange(scheme) {
            if(scheme) this.query['scheme.id'] = scheme.id;
            else delete this.query['scheme.id'];
            this.updateValues();
        }

        /**
         * @param {string} keywords - text query to constrain theme options using
         */
        onKeywordsChange(keywords) {
            if(keywords && keywords.length) this.query.q = keywords;
            else delete this.query.q;
            this.updateValues();
        }

        /**
         *
         */
        updateValues() {

            let params = this.query;
            params.bust = new Date().getTime();

            return this.$http.get(Constants.ualUrl + '/api/items', { params: params })
            .then( (response) => {

                let total = response.data.totalResults;
                let newValues = response.data.results.slice(0);
                this.additionalValueCount = total - newValues.length;

                let selections = this.getSelected();
                this.outsideResults = (this.values||[]).filter( v => {
                    //find existing values that are selected
                    return ~selections.indexOf(v.id) &&
                        // but not in new set of values
                        !newValues.filter( nv => nv.id === v.id).length;
                });

                this.values = newValues;

            }, (response) => {
                console.log("(" + response.status + ") " + response.statusText);
            }).catch( e => {
                console.log("Error fetching NGDA Themes: " + e.message);
            });
        }

        /**
         *
         */
        updateSchemes() {
            this.fetchSchemes()
            .then( (schemes) => { this.conceptSchemes = schemes; })
            .catch( e => {
                console.log("Error loading available concept schemes " + e.message);
            });
        }

        /**
         * @param {string} q - query to constrain schemes using
         */
        fetchSchemes(q) {
            this.areSchemesLoading = true;
            let params = { type: 'skos:ConceptScheme', size: 12, sort: 'label,asc' };
            if(q && q.length) params.q = q;
            return this.$http.get(Constants.ualUrl + '/api/items', { params: params })
            .then( response => {
                let hits = response.data.results;
                this.noSchemeResults = !hits.length;
                return hits;
            })
            .finally( () => { this.areSchemesLoading = false; });
        }

        /**
         * @param {object} $item - scheme selected
         * @param {object} $model - scheme selected
         * @param {string} $label -
         * @param {object} $event - selection event
         */
        onSchemeSelection($item, $model, $label, $event) {
            this.onSchemeChange($item);
            this.$el.find('input[name="theme-filter-schemes"]').blur();
        }

    }

    angular.module('gp-common').component('themeFilter', {
        bindings: {
            name: '@',      //name of this filter parameter
            service: '<'
        },
        controller: ThemesFilter,
        template:
        `
            <div class="card c-query-filter c-browse-filter">
                <div class="card-title">
                    <button type="button" class="btn btn-sm btn-link"
                        title="{{$ctrl.collapse?'Expand':'Collapse'}}"
                        ng-click="$ctrl.collapse = !$ctrl.collapse">
                        <span class="glyphicon" ng-class="{'glyphicon-minus':!$ctrl.collapse,'glyphicon-plus':$ctrl.collapse}"></span>
                    </button>
                    <span>Filter by Themes</span>
                </div>
                <div class="card-content">
                    <div class="c-facets" ng-class="{'is-collapsed':$ctrl.collapse}">

                        <div class="c-facet__value">
                            <div class="input-group-slick">
                                <input name="theme-filter-schemes" type="text" class="form-control"
                                    ng-model="$ctrl.scheme"
                                    typeahead-on-select="$ctrl.onSchemeSelection($item, $model, $label, $event)"
                                    uib-typeahead="opt as opt.label for opt in $ctrl.fetchSchemes($viewValue)"
                                    typeahead-loading="$ctrl.areSchemesLoading"
                                    typeahead-no-results="$ctrl.noSchemeResults"
                                    ng-model-options="{ debounce: 250 }"
                                    typeahead-min-length="2"
                                    typeahead-editable="false"
                                    placeholder="Filter Themes by Scheme..."
                                    aria-label="Find scheme by name to filter theme options">
                                <span class="glyphicon glyphicon-remove"
                                    title="Clear selected Scheme"
                                    ng-if="$ctrl.scheme"
                                    ng-click="$ctrl.onSchemeChange($ctrl.scheme=null)">
                                </span>
                            </div>
                        </div>

                        <div class="c-facet__value">
                            <div class="input-group-slick">
                                <input name="scheme-typeahead" type="text" class="form-control"
                                    ng-model="$ctrl.typeaheadValue"
                                    ng-change="$ctrl.onKeywordsChange($ctrl.typeaheadValue)"
                                    ng-model-options="{debounce:200}"
                                    placeholder="Find a Theme by name..."
                                    aria-label="Find a theme by name">
                                <span class="glyphicon glyphicon-remove"
                                    title="Clear query"
                                    ng-if="$ctrl.typeaheadValue.length"
                                    ng-click="$ctrl.onKeywordsChange($ctrl.typeaheadValue=null)">
                                </span>
                            </div>
                        </div>

                        <a class="c-facet__value" ng-click="$ctrl.clear()"
                            ng-class="{active:!$ctrl.hasSelections()}">
                            <span class="glyphicon"
                                ng-class="{'glyphicon-check':!$ctrl.hasSelections(), 'glyphicon-unchecked t-fg--gray-lt':$ctrl.hasSelections()}">
                            </span>
                            Any Theme
                        </a>
                        <a ng-repeat="theme in $ctrl.values track by $index"
                            class="c-facet__value" ng-click="$ctrl.toggle(theme)"
                            ng-class="{active:$ctrl.isSelected(theme)}">
                            <span class="badge pull-right">{{$ctrl.getCount(theme)}}</span>
                            <span class="glyphicon"
                                ng-class="{'glyphicon-check':$ctrl.isSelected(theme),'glyphicon-unchecked t-fg--gray-lt':!$ctrl.isSelected(theme)}"></span>
                            {{theme.label || "Untitled Theme"}}
                        </a>

                        <div class="c-facet__value disabled t-fg--gray-md"
                            ng-if="$ctrl.additionalValueCount">
                            <em>
                                plus {{$ctrl.additionalValueCount}} more options;
                                use search box to limit options
                            </em>
                        </div>


                        <div class="c-facet__value disabled" ng-if="$ctrl.outsideResults.length">
                            <em>The following selections are not in the above results</em>
                        </div>

                        <a ng-repeat="theme in $ctrl.outsideResults track by $index"
                            class="c-facet__value active" ng-click="$ctrl.deselectOutside(theme)">
                            <span class="badge pull-right">{{$ctrl.getCount(theme)}}</span>
                            <span class="glyphicon glyphicon-check"></span>
                            {{theme.label || "Untitled Theme"}}
                        </a>

                    </div>
                </div>
            </div>
        `
    });


}) (angular, GeoPlatform);
