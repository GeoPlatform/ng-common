# ng-common
Angular directives and services for GeoPlatform web applications


## Reference in Another Project

__Add as a Bower dependency__

```json
"dependencies": {

    "gp.common": "GeoPlatform/ng-common#<version number>",

}
```

Note: _version number_ should be that of the current release version of this project.  It is advised to __never__ reference any non-release tag or branch, such as "develop" or "master", when adding this project as a dependency in another.



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
Unlike the Geoplatform style project, ng-common does not compile source less into CSS, but it does concatenate the source Less files into one which can be included in other projects for compilation. **Be sure to include it after the style project's Less import(s).**

```less
@import "relative/path/to/gp.style/src/less/platform.less";
@import "relative/path/to/gp.common/dist/geoplatform.common.less";
```

__Inject the Module__

```javascript
angular.module('myModule', ['gp-common']);
```
### Configuration

The folling are values that can/should be set in the GeoPlatform global namespace:

| property | required | description | values | default
|---|---|---|---|---|
| portalUrl | yes | FQDN of GeoPlatform portal URL | N/A | N/A |
|env \| ENV \| NODE_ENV | yes | Enviroment flag to run ng-common with. Some features (like authentication) may be disabled or preform differently in a development vs production enviroment | dev, development, prod, prd, sit, test | N/A |

> See additonal configurations in the Authentication section

<br><br>
## Authentication
ng-common has an interface for authenticating and verifying user identitiy against gpoauth OAuth service. Ng-common will automatically direct a user to the oauth provider and then back to the application with an accessToken/JWT. The recieved JWT will be sent with all subsequent requests and should allow users to access resources avaliable to them.

There are two major types of authentication:
#### token (implicit)
Token or implicit type authentication does not require or use a back end service for authentication. The entire authentication process will be handled between the Oauth provider and front end application hosting ng-common.

#### grant
Grant type authentiction require a back end service (like node-gpoauth) to handle recieving JWT and related tokens from the OAuth provider.
<br><br>

### iFrame Authentication
Apps have the abilility to allow for authentication via iframe and keep the user from having to redirect to the oauth page for authentication. In the event that an app allows for iframe authentication it will need to implement handlers for login events. These events are fired from $rootScope for the application.

**Events related to a user authenticating are:**

| name | description | args |
|---|---|---|
| userAuthenticated | Is called when a user has authenticated and the iframe authenticaiton window is closed | event: the event, <br>user: the User object <br>(see: https://github.com/GeoPlatform/ng-common/blob/feature/gpoauth-iframe-authentication/src/js/auth.ts#L70-L117|

**Example:**
```javascript
    angular.module('myModule', [])
    /**
     * Rrefresh page when user is logged in. This will allow the init process
     * to run to completion with the user already loaded.
     */
    .run(function ($rootScope) {
        $rootScope.$on('userAuthenticated', (event, user) => {
          $rootScope.user = user
          // - or -
          window.location.reload();
        })
    });
```
<br><br>

### Autentication Configuration
The following are property that sould be found at the top level of the GeoPlatorm namespace:

| property | required | description | values | default
|---|---|---|---|---|
| ALLOWIFRAMELOGIN | no | Allow ng-common to use an ifame instead of redirect for authenticating a user. This will allow users to retain their in-memory edits while authenticating. | true, false | false |
| AUTH_TYPE | no | Type of token to request from gpoauth.  | token, grant | grant |
| FORCE_LOGIN | no | Should user be forced to redirct or show login screen when its detected that they are unauthenticated | true, false | false |
| CALLBACK | no | URL to call back when re-directed from oauth authentication loop. | N/A | /login |
| IDP_BASE_URL | yes* | URL of the Oauth serice. | N/A | N/A |
| APP_ID | yes* | Id (client_id) of appliction registerd with the Oauth service provider. | N/A | N/A |
| LOGIN_URL | no | URL to redirect browser to when auth type is 'token'. | N/A | /login |
| LOGOUT_URL | no | Url to redirec user to when they preform the logout action. | N/A | (will redirect to the portalUrl or root of application) |

\* : indicates required configuration when authorization is type 'token'.

<br><br>
## Directives

### Header

Contents of the `gp-header` element will be transcluded into the menu generated by the directive.  In the example below, the two links supplied will be inserted into a `.header__menu` containing a home link and a sign in button.

```html
<div gp-header brand="App Title" show-home-link="true">
  <li><a href="#/page1">Page 1</a></li>
  <li><a href="#/page2">Page 2</a></li>
</div>
```

**Note:** Any class names set upon the `gp-header` element will be automatically applied to the resulting HTML generated by the directive (useful when implementing fixed headers using `.navbar-fixed`).


### Header Menu
This is used by `gp-header` but can also be used separately.  Watches route changes and sets 'active' class on links for the currently-loaded page.

```html
<ul role="menu" class="header__menu" gp-header-menu>
  <li><a href="#/page1">Page 1</a></li>
  <li><a href="#/page2">Page 2</a></li>
</ul>
```

**Note:** Only works when applied to a `UL` element.


### Sign In Button
Uses the Authentication Service and displays either a "Sign In" button or a button-triggered dropdown menu containing user details in the header.

```html
<span gp-login-button></span>
`



### Resize Helper

Will resize the element to fill the page minus the `header` element's height.

```html
<body>
  <header>...</header>
  <div class="myClass" gp-resize></div>
</body>
```

**Note:** Does not support `footer` element's heights at this time.


### Responsive Helper

Will append sizing classes based upon the size of the window, which can be used to alter elements using CSS.

```html
<div gp-responsive></div>
```

**Classes:**
+ `.gp-responsive-xs` - less than 768px
+ `.gp-responsive-sm` - between 768px and 992px
+ `.gp-responsive-md` - between 992px and 1200px
+ `.gp-responsive-lg` - larger than 1200px


**Example CSS:**
```css
.gp-responsive-xs { width: 100%; }
.gp-responsive-sm { width:  75%; }
.gp-responsive-md { width:  50%; }
.gp-responsive-lg { width:  25%; }
```


## Services

The following services can be injected into your Angular modules for usage.

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

Displays Growl-like messages in the lower-right (customizable using CSS) of the screen.

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

'facets' : returns an array of values for facets with a given prefix.

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


## Knowledge Graph Support

Include the KG module as a dependency.

```javascript
angular.module('myModule', ['gp-common-kg']);
```

### Recommender Service

Angular $resource-based service for communicating with UAL's recommender endpoints.

### Section Editor

The Section Editor is how you display and manipulate Knowledge Graph property values.

```html
<kg-section
    ng-model="$ctrl.item.knowledgeGraph.places"
    on-change="$ctrl.onChange('places', values)"
    type="Place"
    label="Places"
    description="The central place (location) associated with this item">
</kg-section>
```


