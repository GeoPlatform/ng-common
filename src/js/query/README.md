# Query Filters
NgCommon provides a set of query filters to use in AngularJS applications to allow users to constrain searches against the GeoPlatform portfolio.

## Requirements
These filters work best with [BrowseObjectsService](../services/browse.service.js). Pass the service to the filters using the `service` binding parameter.  It is possible to provide your own custom service, but it must support relevant methods and events in order to work with the filters.

## Usage

```javascript
angular.module('my-app', ['ngResource', 'ng-common']).component('mySearchComp', {
    bindings: {},
    controller: function($rootScope, $timeout, $resource, BrowseServiceFactory) {

        this.$onInit = function() {
            this.searchService = BrowseServiceFactory($rootScope, $timeout, $resource, {/*... add'l options...*/});
            //...listen to service events...
        };
        this.$onDestroy = function() {
            this.searchService = null;
        };
    }
})
```

```html
<div class="c-my-app__filters>">
    <h4>Filter Search</h4>
    <theme-filter service="$ctrl.searchService"></theme-filter>
    <publisher-filter service="$ctrl.searchService"></publisher-filter>
</div>
```

## Available Filters

 - [Theme Filter](./theme.filter.js) - constrain results to those referencing specific Themes (Concepts)
 - [Publisher Filter](./publisher.filter.js) - constrain results to those referencing specific Publishers (Organizations)
 - [Created By Filter](./createdBy.filter.js) - constrain results to those created by specific GeoPlatform users
 - [Community Filter](./community.filter.js) - constrain results to those referencing specific Communities
 - [Similarity Filter](./similarity.filter.js) - constrain results to those which are semantically similar to a selected item
 - [Recommended Terms Filter](./recommended.term.filter.js) - constrain results to those referencing specific Concepts
