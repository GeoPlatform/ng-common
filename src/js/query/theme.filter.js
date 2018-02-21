
(function(angular, Constants) {

    'use strict';


    /*
        <themes-filter></themes-filter>
     */

    angular.module('gp-common').component('themeFilter', {
        bindings: {
            name: '@',      //name of this filter parameter
            service: '<'
        },
        controller: function($http) {


            this.$onInit = function() {
                this.collapse   = true;
                this.updateValues();
            };

            this.$onDestroy = function() {
                this.values = null;
                this.service = null;
            };

            this.hasSelections = function() {
                return (this.service.getThemes() || []).length;
            };

            this.isSelected = function(value) {
                let themes =    this.service.getThemes() || [];
                return ~themes.indexOf(value.id);
            };

            this.toggle = function(value) {
                let themes =    this.service.getThemes() || [];
                let idx =       themes.indexOf(value.id);
                if(idx >= 0)    themes.splice(idx, 1);
                else            themes.push(value.id);
                this.service.setThemes(themes);
            };

            this.clear = function() {
                let themes =    this.service.getThemes() || [];
                if(!themes || !themes.length)
                    this.collapse = !this.collapse; //toggle collapsed state
                else
                    this.service.setThemes([]);
            };

            this.getCount = function(value) {
                var facet = this.service.getFacet('themes');
                if(!facet) return '';
                var valObj = facet.buckets.find(function(v) { return v.label===value.id; });
                if(!valObj) return '';
                return valObj.count;
            };

            this.updateValues = function(query) {

                return $http.get(Constants.ualUrl + '/api/items', {
                    params: {
                        type:'skos:Concept',
                        'scheme.label': 'NGDA Portfolio Themes',
                        fields:'scheme',
                        size: 9999,                 //must return all
                        sort: 'label,asc',
                        bust: new Date().getTime()
                    }
                }).then( (response) => {
                    // let total = response.data.totalResults;
                    this.values = response.data.results.slice(0);
                }, (response) => {
                    console.log("(" + response.status + ") " + response.statusText);
                }).catch( e => {
                    console.log("Error fetching NGDA Themes: " + e.message);
                });
            };
        },
        template:
        `
            <div class="card c-query-filter c-browse-filter">
                <h5 class="card-title">
                    <button type="button" class="btn btn-sm btn-link"
                        title="{{$ctrl.collapse?'Expand':'Collapse'}}"
                        ng-click="$ctrl.collapse = !$ctrl.collapse">
                        <span class="glyphicon" ng-class="{'glyphicon-minus':!$ctrl.collapse,'glyphicon-plus':$ctrl.collapse}"></span>
                    </button>
                    <span>Filter by NGDA Themes</span>
                </h5>
                <div class="card-content">
                    <div class="c-facets" ng-class="{'is-collapsed':$ctrl.collapse}">
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
                                {{theme.label}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `
    });

}) (angular, GeoPlatform);
