# ng-common
Angular directives and services for GeoPlatform web applications


## Reference in Another Project

__Add as a Bower dependency__

```json 
"dependencies": {
    
    "gp.common": "GeoPlatform/ng-common#<BRANCH_OR_VERSION>",

}
```

__Include the JavaScript__

```html
<!doctype html>
<html ng="app">
  <head>
    <!-- head contents -->
  </head>
  <body>
    <!-- body contents -->

    <!-- JS dependencies 
    ...
    ...
    ...
    -->

    <script>
        GeoPlatform = {
            portalUrl: "https://...",
            idspUrl: "https://...",
            idmUrl: "https://..."
        };
    </script>

    <script src="/path/to/gp.common/dist/geoplatform.common.min.js"></script>
    
  </body>
</html>
```

*Note: Environment configuration for the IDM/IDP and Portal URLs must be in place before including this JS file, encapsulated within a 'GeoPlatform' object (see above).*

__Include the Less__

```less
@import "relative/path/to/gp.style/src/less/platform.less";
@import "relative/path/to/gp.common/dist/geoplatform.common.less";
```

__Inject the Module__

```javascript
angular.module('myModule', ['gp-common']);
```


## Directives

### Header

Contents of the `gp-header` element will be transcluded into the menu generated by the directive.  In the example below, the two links supplied will be inserted into a `.header__menu` containing a home link and a sign in button.

```html
<div gp-header brand="App Title" show-home-link="true">
  <li><a href="#/page1">Page 1</a></li>
  <li><a href="#/page2">Page 2</a></li>
</div>
```

### Header Menu
This is used by `gp-header` but can also be used separately.  Watches route changes and sets 'active' class on links for the currently-loaded page.

```html
<ul role="menu" class="header__menu" gp-header-menu>
  <li><a href="#/page1">Page 1</a></li>
  <li><a href="#/page2">Page 2</a></li>
</ul>
```

### Sign In Button
`<span gp-login-button></span>`


### Resize Helper

Will resize the element to fill the page minus the `<header></header>` height.

```html
<div class="myClass" gp-resize></div>
```

### Responsive Helper

Will append sizing classes based upon the size of the window.

```html
<div gp-responsive></div>
```

less than 768px : `.gp-responsive-xs`

between 768px and 992px: `.gp-responsive-sm`

between 992px and 1200px: `.gp-responsive-md`

larger than 1200px: `.gp-responsive-lg`


## Services

### Authentication Service

```javascript

//using callback
AuthenticationService.getUser(function(user) {
    
});

//or with Q deferred
AuthenticationService.getUserQ().then(function(user) {
    
});

```

### Notification Service

```javascript

//info
var hook1 = NotificationService.info("This is an information message", true);

//success
var hook2 = NotificationService.success("Item saved!", true);

//error
var hook3 = NotificationService.error("Error Querying Data Layers and Projects",response.data);

hook1();    //dismiss early
hook2();    //dismiss early
hook3();    //dismiss

```

## Filters

'fixLabel' : replaces underscores ('_') in text with spaces.

'pluralize' : returns plural version of a word

'joinBy' : joins an array's values into a string, delimiter parameter optional.

'facets' : returns an array of values for facets with a given name. 

Given
```json
{
    "facets": ["keyword:Keyword1", "keyword:Keyword2", "keyword:Keyword3", "type:Test"]
}
```

the following:

```html
<div>{{item.facets | facets:"keyword" | joinBy}}</div>
```

renders:

```
<div>Keyword1, Keyword2, Keyword3</div>

```


## Language Extensions

```javascript

//Arrays
var arr = [];

var hit = arr.find(function(item, idx, ar) {...});

var hits = arr.filter(function(item, idx, ar) {...});

arr.each(function(item, idx, ar) { ... });


//Strings
var bool = "Test".startsWith("Te");

bool = "Test".endsWith("st");


//Dates

var date1 = new Date();

//  'hour', 'day', 'week', 'month', 'year', or any number (milliseconds)
var date2 = date1.plus('hour');

//generate random date between now and date in the future determined by argument
//  'hour', 'day', 'week', 'month', 'year', or any number (milliseconds)
var date3 = date1.random('year');

```

