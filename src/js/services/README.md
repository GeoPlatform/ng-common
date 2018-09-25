# Services
NgCommon provides services to more easily provide application-level functionality.


## Browse Objects Service

This AngularJS service searches the GeoPlatform portfolio.


### Usage

```javascript
angular.module('my-app', ['ngResource', 'ng-common']).component('mySearchComp', {
    bindings: {},
    controller: function($rootScope, $timeout, $resource, BrowseServiceFactory) {

        this.$onInit = function() {

            //create instance
            this.searchService = BrowseServiceFactory($rootScope, $timeout, $resource, {
                /*
                key: 'myKey',           //custom key for namespacing events
                url: 'api/proxySearch', //override default search endpoint
                sort: 'label,asc',      //set initial sorting
                size: 24,               //set initial page size,
                pageSizeBase: 12,       //set page size base (10, 12, etc)
                fields: [ ... ],        //specify fields to request on each result
                facets: [ ... ],        //specify facets to aggregate
                onSelect: function(id, callback) { ... } //callback fn when results are selected
                */
            });

            this.searchService.on(this.searchService.events.LOADING, (event) => { /* ... */ });

            this.searchService.on(this.searchService.events.RESULTS, (event) => { /* ... */ });

            this.searchService.on(this.searchService.events.ERROR, (event, err) => { /* ... */ });

            this.searchService.on(this.searchService.events.CONSTRAINT, (event, change) => { /* ... */ });

        };
        this.$onDestroy = function() {
            this.searchService = null;
        };
    }
})
```
