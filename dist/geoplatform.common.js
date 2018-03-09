"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/// <reference path="../types.ts" />
(function (jQuery, angular) {
    "use strict";

    angular.module("gp-common", []).constant('GPConfig', function () {
        // throw error if field missing
        function missing(field) {
            throw "ng.common: Required field in GeoPlatform is missing: " + field + "\n" + "Please see https://github.com/GeoPlatform/ng-common/tree/develop for configuration details";
        }
        // throw error if field invalid
        function invalid(value, expected) {
            throw "ng.common: A field you provided has an invalid value: " + value + "\n" + ("Expected value was: " + expected) + "Please see https://github.com/GeoPlatform/ng-common/tree/develop for configuration details";
        }
        // General
        if (!GeoPlatform.env && !GeoPlatform.ENV && !GeoPlatform.NODE_ENV) {
            missing("\"env\", \"ENV\", or \"NODE_ENV\"");
        }
        // Auth Settings
        if (!GeoPlatform.IDP_BASE_URL) {
            missing("\"IDP_BASE_URL\"");
        }
        if (GeoPlatform.AUTH_TYPE && ['token', 'grant'].indexOf(GeoPlatform.AUTH_TYPE) === -1) {
            // Not set is ok as well
            invalid(GeoPlatform.AUTH_TYPE, 'token | grant');
        }
        if (GeoPlatform.AUTH_TYPE === 'token') {
            if (!GeoPlatform.APP_ID) missing('APP_ID');
        }
        // Convert boolean implicits
        // All because !!'false' === true (WAT typing!!!)
        function toREALBoolean(val) {
            return JSON.parse(val);
        }
        GeoPlatform.ALLOWIFRAMELOGIN = toREALBoolean(GeoPlatform.ALLOWIFRAMELOGIN || false);
        GeoPlatform.FORCE_LOGIN = toREALBoolean(GeoPlatform.FORCE_LOGIN || false);
        return GeoPlatform;
    }());
})(jQuery, angular);

/**
 *
 * KnowledgeGraph property on RIM Asset renamed to Classifiers
 *
 */
(function (jQuery, angular, Constants) {
    'use strict';

    angular.module('gp-common-kg', []).constant('KGFields', ['purposes', 'functions', 'primaryTopics', 'secondaryTopics', 'primarySubjects', 'secondarySubjects', 'communities', 'audiences', 'places', 'categories']).service('KGHelper', ['KGFields', 'RecommenderServiceFactory', function (KGFields, RecommenderServiceFactory) {
        return {
            calculate: function calculate(kg) {
                if (!kg) return 0;
                var result = 0;
                angular.forEach(KGFields, function (prop) {
                    if (kg[prop] && kg[prop].length) result += 7 + Math.floor((kg[prop].length - 1) / 2);
                    // result += kg[prop] ? kg[prop].length*5 : 0;
                });
                return result;
            },
            getService: function getService(type) {
                return RecommenderServiceFactory(type);
            }
        };
    }]).service("RecommenderService", ["$resource", function ($resource) {
        var baseUrl = Constants.ualUrl + '/api/recommender';
        return $resource(baseUrl, {}, {
            query: {
                url: baseUrl + '/suggest',
                isArray: false
            },
            queryTypes: {
                url: baseUrl + '/types',
                isArray: false
            },
            querySources: {
                url: baseUrl + '/sources',
                isArray: false
            }
        });
    }]).factory("RecommenderServiceFactory", ["$resource", function ($resource) {
        return function (type) {
            var baseUrl = Constants.ualUrl + '/api/recommender';
            return $resource(baseUrl, { 'for': type }, {
                query: {
                    url: baseUrl + '/suggest',
                    isArray: false
                },
                queryTypes: {
                    url: baseUrl + '/types',
                    isArray: false
                },
                querySources: {
                    url: baseUrl + '/sources',
                    isArray: false
                }
            });
        };
    }]).component('kgCompletionDisplay', {
        bindings: {
            ngModel: '<' // the Asset containing the knowledge graph ('classifiers') property
        },
        controller: ["$rootScope", "KGHelper", function controller($rootScope, KGHelper) {
            this.$onInit = function () {
                var _this = this;
                this.update();
                this.listener = $rootScope.$on('gp:kg:updated', function (event, item) {
                    if (item && item.id === _this.id) {
                        //in case kg didn't exist, 
                        if (!_this.ngModel.classifiers) _this.ngModel.classifiers = item.classifiers;
                        _this.value = KGHelper.calculate(_this.ngModel.classifiers);
                    }
                });
            };
            this.$onChanges = function () {
                this.update();
            };
            this.$onDestroy = function () {
                this.listener();
                this.listener = null;
            };
            this.update = function () {
                var _this = this;
                if (this.ngModel.$promise && !this.ngModel.$resolved) {
                    this.ngModel.$promise.then(function (model) {
                        _this.update();
                    });
                    return;
                }
                this.id = this.ngModel ? this.ngModel.id : null;
                this.value = KGHelper.calculate(this.ngModel.classifiers);
            };
        }],
        template: "\n            <span>{{$ctrl.value||0}}%</span>\n            <span class=\"glyphicon glyphicon-dashboard\"></span>\n        "
    });
})(jQuery, angular, GeoPlatform);

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([], function () {
            if (!GeoPlatform) {
                throw new Error("AuthenticatedComponent - 'GeoPlatform' global not defined!");
            }
            return GeoPlatform.AuthenticatedComponent = root.AuthenticatedComponent = factory();
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.AuthenticatedComponent = factory();
    } else {
        GeoPlatform.AuthenticatedComponent = factory();
    }
})(undefined || window, function () {
    var EDIT_ROLE = 'gp_editor';
    /**
     *
     * base class for Angular components that need to be notified
     * when the user's authentication status changes (ie, log in or log out).
     *
     */
    var AuthenticatedComponent = /** @class */function () {
        function AuthenticatedComponent($rootScope, AuthenticationService) {
            //NOTE: do not use ngInject 'annotation' here or else it will munge
            // the constructor arguments of any sub-class.
            var _this = this;
            this.authState = { user: null, authorized: false };
            this.authService = AuthenticationService;
            this.authListener = $rootScope.$on('userAuthenticated', function (event, user) {
                _this.onAuthEvent(event, user);
            });
        }
        AuthenticatedComponent.prototype.$onInit = function () {
            var _this = this;
            this.authService.getUser(function (user) {
                _this.onAuthEvent(null, user);
            });
        };
        AuthenticatedComponent.prototype.$onDestroy = function () {
            this.authListener();
            this.authListener = null;
            this.authService = null;
            this.authState = null;
        };
        /**
         * Triggered whenever the user logs in or out of the app
         * @param {Object} event
         * @param {Object} user
         */
        AuthenticatedComponent.prototype.onAuthEvent = function (event, user) {
            this.authState.user = user;
            this.authState.authorized = user && user.isAuthorized(EDIT_ROLE);
        };
        AuthenticatedComponent.prototype.isAuthenticated = function () {
            return !!this.authState.user;
        };
        AuthenticatedComponent.prototype.canUserEdit = function (item) {
            if (!this.authState.user) return false;
            if (!item) return this.authState.authorized;
            return this.isAuthorOf(item) || this.authState.authorized;
        };
        AuthenticatedComponent.prototype.isAuthorOf = function (item) {
            if (!this.authState.user) return false;
            if (!item) return false;
            return item.createdBy && item.createdBy === this.authState.user.username;
        };
        return AuthenticatedComponent;
    }();
    return AuthenticatedComponent;
});

(function (angular) {
    "use strict";

    var ACTIVATORS_HTML = "\n            <div class=\"gp-ui-card__details-activator--left\" title=\"Show previous details\"\n                ng-class=\"{disabled:!hasPrevious()}\" ng-click=\"previousDetails()\">\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\n            </div>\n            <div class=\"gp-ui-card__details-activator--right\" title=\"Show next details\"\n                ng-class=\"{disabled:!hasNext()}\" ng-click=\"nextDetails()\">\n                <span class=\"glyphicon glyphicon-chevron-right\"></span>\n            </div>\n        ";
    /*
     * Appends carousel-like activators onto a card section
     * Usage:
     *
     *  <div class="text--supporting" card-details-carousel-activator>
     *      <div class="gp-ui-card__details active" id="description">...</div>
     *      <div class="gp-ui-card__details" id="author">...</div>
     *  </div>
     */
    angular.module("gp-common").directive('cardDetailsCarouselActivator', function () {
        return {
            compile: function compile($element) {
                $element.append(ACTIVATORS_HTML);
            },
            controller: ["$scope", "$element", function controller($scope, $element) {
                $scope.hasPrevious = function () {
                    var pane = $element.find('.gp-ui-card__details.active');
                    return pane.prevAll('.gp-ui-card__details').length;
                };
                $scope.hasNext = function () {
                    var pane = $element.find('.gp-ui-card__details.active');
                    return pane.nextAll('.gp-ui-card__details').length;
                };
                $scope.previousDetails = function () {
                    if (!$scope.hasPrevious()) return;
                    var pane = $element.find('.gp-ui-card__details.active');
                    pane.removeClass('active');
                    pane = pane.prevAll('.gp-ui-card__details');
                    if (pane.length) angular.element(pane[0]).addClass('active');
                };
                $scope.nextDetails = function () {
                    if (!$scope.hasNext()) return;
                    var pane = $element.find('.gp-ui-card__details.active');
                    pane.removeClass('active');
                    pane = pane.nextAll('.gp-ui-card__details');
                    if (pane.length) angular.element(pane[0]).addClass('active');
                };
            }]
        };
    });
})(angular);

(function (jQuery, angular) {
    'use strict';
    /**
     * determines whether an rgb value is invalid
     * the value starts as false (the rbg value is valid)
     * and is invalidated if the value(s) are empty, greater than 255 or less than 0
     *
     * @param rgb either an object { r: 0, g: 0, b: 0 } or a single value
     * @returns {boolean} whether the rgb value is invalid
     */

    function invalidRGB(rgb) {
        var error = false;
        if (rgb instanceof Object) {
            var r = parseInt(rgb.r, 10);
            var g = parseInt(rgb.g, 10);
            var b = parseInt(rgb.b, 10);
            if (r > 255 || r < 0 || !r && r !== 0) error = true;
            if (g > 255 || g < 0 || !g && g !== 0) error = true;
            if (b > 255 || b < 0 || !b && b !== 0) error = true;
        } else {
            var x = parseInt(rgb, 10);
            if (x > 255 || x < 0 || !x && x !== 0) error = true;
        }
        return error;
    }
    /**
     * converts a decimal (base 10) number to hex (base 16) string
     *
     * @param c base 10 number
     * @returns {*} base 16 string
     */
    function componentToHex(c) {
        var hex = c.toString(16),
            result = null;
        if (!isNaN(c) && !invalidRGB(c)) result = hex.length == 1 ? '0' + hex : hex;
        return result;
    }
    /**
     * converts an rgb object to a hexadecimal string
     *
     * @param rgb object { r: 0, g: 0, b: 0 }
     * @returns {*} hexadecimal string
     */
    function rgbToHex(rgb) {
        var result = null;
        var r = componentToHex(parseInt(rgb.r, 10));
        var g = componentToHex(parseInt(rgb.g, 10));
        var b = componentToHex(parseInt(rgb.b, 10));
        if (r && g && b) result = '#' + r + g + b;
        return result;
    }
    /**
     * determines whether a hex value is valid
     *
     * @param hex string value
     * @returns hex value or null if hex is invalid
     */
    function validHex(hex) {
        return (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || null
        );
    }
    /**
     * converts a hex string to rgb object
     *
     * @param hex string
     * @returns {*} rgb object { r: 0, g: 0, b: 0 }
     */
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = validHex(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    /**
     * Advanced Color Picker Directive (advanced-color-picker)
     * This color picker is meant to augment the functionality in angular-bootstrap-colorpicker
     * It adds the ability to change the color with RGB and Hex
     * It needs to be used in a container that has at least 160px of vertical real estate
     *
     * You must pass in the following:
     *   - ngModel  (a hexadecimal string color value)
     *   - onChange (the event to be fired when the value changes)
     *
     * Usage Example:
     * <div advanced-color-picker ng-model="hexColor" ng-change="changeEvent()"></div>
     */
    angular.module('gp-common').component('gpColorPicker', {
        bindings: {
            ngModel: '=',
            onChange: '&'
        },
        controller: ["$timeout", "$q", function controller($timeout, $q) {
            // fired when an rgb value is changed
            this.changeRGB = function () {
                // make sure rgb color value is correct
                this.rgbError = invalidRGB(this.rgb);
                // parse it anyways leaving hex value blank until valid rbg
                this.ngModel = rgbToHex(this.rgb);
                // have to use timeout to make sure ngModel is set before
                // firing change event upstream
                var self = this;
                $timeout(function () {
                    self.onChange({ value: self.ngModel });
                });
            };
            // fired when a hex value is changed
            this.changeHex = function () {
                // make sure the hex color value is correct
                if (!validHex(this.ngModel)) this.hexError = 'Invalid hex color value';else this.hexError = false;
                // parse it anyway leaving rgb values blank until it's a valid hex
                this.rgb = hexToRgb(this.ngModel);
                // have to use timeout to make sure ngModel is set before
                // firing change event upstream
                var self = this;
                $timeout(function () {
                    self.onChange({ value: self.ngModel });
                });
            };
            this.$onInit = function () {
                this.rgb = hexToRgb(this.ngModel);
            };
        }],
        template: "\n            <div class=\"gp-colorpicker\">\n                <div class=\"form-group hex-form-group\" ng-class=\"{'has-error':$ctrl.hexError}\">\n                    <input type=\"text\" class=\"form-control\"\n                        ng-model=\"$ctrl.ngModel\" ng-keyup=\"$ctrl.changeHex()\">\n                </div>\n                <div class=\"gp-colorpicker__wrapper\">\n                    <div colorpicker colorpicker-inline=\"true\" colorpicker-parent=\"true\" \n                        ng-model=\"$ctrl.ngModel\" ng-change=\"$ctrl.changeHex()\"></div>\n                </div>\n                <div class=\"form-group rgb-form-group\" ng-class=\"{'has-error':$ctrl.rgbError}\">\n                    <input type=\"text\" class=\"form-control\"\n                        placeholder=\"R\" ng-model=\"$ctrl.rgb.r\" ng-keyup=\"$ctrl.changeRGB()\" title=\"R\">\n                    <input type=\"text\" class=\"form-control\"\n                        placeholder=\"G\" ng-model=\"$ctrl.rgb.g\" ng-keyup=\"$ctrl.changeRGB()\" title=\"G\">\n                    <input type=\"text\" class=\"form-control\"\n                        placeholder=\"B\" ng-model=\"$ctrl.rgb.b\" ng-keyup=\"$ctrl.changeRGB()\" title=\"B\">\n                </div>\n            </div>\n        "
    });
})(jQuery, angular);

(function (jQuery, angular) {
    'use strict';

    angular.module('gp-common').directive('gpDatePicker', ['$timeout', function ($timeout) {
        return {
            scope: {
                label: '@',
                format: '@',
                date: '=',
                onChange: '&?'
            },
            template: ['<div class="input-group-slick">', '    <input type="text" class="form-control" placeholder="{{::label}}"', '        datepicker-popup="{{format}}" ng-model="date" is-open="opened" />', '    <span class="glyphicon glyphicon-calendar" ng-click="toggle($event)"></span>', '</div>', '<p class="help-block"><small><em>Ex: "2015-01-31" or "Jan 31 2015"</em></small></p>'].join(' '),
            controller: ["$scope", "$element", "$attrs", function controller($scope, $element, $attrs) {
                //toggle date picker
                $scope.toggle = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.opened = !this.opened;
                };
                if (!$scope.format) $scope.format = 'MMM dd yyyy';
                var promise = null;
                $scope.debounce = function () {
                    if (promise) $timeout.cancel(promise);
                    promise = $timeout(function () {
                        promise = null;
                        if ($scope.onChange) $scope.onChange();
                    }, 200);
                };
                $scope.$watch('date', function () {
                    $scope.debounce();
                });
                var listener = $scope.$on('$destroy', function () {
                    listener(); //deregister listener
                    if (promise) $timeout.cancel(promise);
                    promise = null;
                    $scope.opened = false; //close picker if open
                    $scope.onChange = null;
                    $scope.format = null;
                    $scope.debounce = null;
                });
            }]
        };
    }]);
})(jQuery, angular);

(function (jQuery, angular) {
    "use strict";

    angular.module("gp-common").directive('gpGeolocation', ['$window', function ($window) {
        var defaultBtnLabel = "Locate";
        return {
            scope: {
                label: '=?'
            },
            restrict: "EA",
            template: ['<a class="btn btn-primary" ng-click="geolocate()" ng-if="available">', '  <span class="glyphicon glyphicon-screenshot" ng-if="!loading"></span>', '  <span class="glyphicon glyphicon-hourglass glyphicon-spin" ng-if="loading"></span>', '  {{btnLabel}}', '</a>', '<div ng-if="error">{{error}}</div>'].join(' '),
            controller: ["$scope", function controller($scope) {
                $scope.btnLabel = $scope.label || defaultBtnLabel;
                $scope.loading = false;
                $scope.available = $window.navigator && $window.navigator.geolocation;
                if (!$scope.available) $scope.error = "Your browser does not support determining location";
                $scope.geolocate = function () {
                    $scope.loading = true;
                    $window.navigator.geolocation.getCurrentPosition(function (position) {
                        $scope.$apply(function () {
                            $scope.loading = false;
                        });
                        $scope.$emit('map:geolocation', position.coords.latitude, position.coords.longitude);
                    }, function (error) {
                        switch (error.code) {
                            case 1:
                                $scope.error = "Permission was denied while attempting to determine location";
                                break;
                            case 2:
                                $scope.error = "Unable to determine your location";
                                break;
                            case 3:
                                $scope.error = "Unable to determine location in a reasonable amount of time";
                                break;
                        }
                    });
                };
            }]
        };
    }]);
})(jQuery, angular);

(function (jQuery, angular) {
    "use strict";

    angular.module("gp-common").directive('gpHeader', ['GPConfig', 'AuthenticationService', function (Config, AuthenticationService) {
        return {
            scope: {
                brand: "@",
                showHomeLink: "@"
            },
            restrict: "AE",
            transclude: true,
            replace: true,
            template: ['<header>', '  <div class="container-fluid">', '    <div class="row">', '      <div class="col-md-12">', '        <ul role="menu" class="header__menu" gp-header-menu>', '          <li ng-if="showHomeLink">', '            <a href="#/goHome">', '                <span class="glyphicon glyphicon-home"></span> ', '                <span class="hidden-xs hidden-sm">Home</span>', '            </a>', '          </li>', '          <div class="transcluded"></div>', '          <li><span gp-login-button></span></li>', '        </ul>', '        <h4 class="brand">', '          <a href="{{portalUrl}}" title="Go to the GeoPlatform Home Page">', '            <span class="icon-gp"></span>', '            <span class="hidden-xs">GeoPlatform</span>', '          </a>', '          {{brand}}', '        </h4>', '      </div>', '    </div>', '  </div>', '  <gp-login-modal></gp-login-modal>', '</header>'].join(' '),
            // controller: function($rootScope, $scope, $element) {
            //     $scope.portalUrl = $rootScope.portalUrl;
            // }, 
            link: function link($scope, $element, $attrs, ctrl, transcludeFn) {
                $scope.showHomeLink = $scope.showHomeLink === 'true' || false;
                $scope.portalUrl = Config.portalUrl;
                AuthenticationService.getUserQ().then(function (user) {
                    $scope.user = user;
                });
                $element.find('.transcluded').replaceWith(transcludeFn());
            }
        };
    }]).directive('gpHeaderMenu', ['$location', function ($location) {
        //default href for "home" link in header__menu
        //uses 'goHome' to avoid angular-route issues with empty hash not 
        // triggering a page reload. Relies upon the "otherwise" condition
        // being configured inside a routeProvider within the application.
        var homeLink = 'goHome';
        function update($element) {
            var path = $location.path();
            if (path === '/' || path === '/#' || path === '/#/') path = homeLink;
            if (path[0] === '/') path = path.substring(1);
            var menu = $element;
            menu.find('li.active').removeClass('active');
            var link = menu.find('li > a[href="#/' + path + '"]');
            if (link.length) {
                //check if link is within a dropdown in the header menu
                var dd = link.closest('.dropdown-menu');
                if (dd.length) {
                    //find next ancestor that is a list element and mark it active
                    dd.closest('li').addClass('active');
                } else {
                    //not in a dropdown, mark this link active
                    link.parent().addClass('active');
                }
            }
            menu.find('li > a').each(function (i, a) {
                var $a = $(a),
                    href = $a.attr('href');
                if (!href) return;
                href = href.replace('#/', '');
                if (path.indexOf(href) === 0) $a.parent().addClass('active');
            });
        }
        return {
            scope: {
                homeHref: '@'
            },
            restrict: "A",
            controller: ["$rootScope", "$scope", "$element", function controller($rootScope, $scope, $element) {
                if ($scope.homeHref) homeLink = $scope.homeHref;
            }],
            link: function link($scope, $element) {
                update($element);
                $scope.$root.$on('$locationChangeSuccess', function () {
                    update($element);
                });
            }
        };
    }]).directive('gpFlexHeader', ['GPConfig', 'AuthenticationService', function (Config, AuthenticationService) {
        return {
            scope: {
                brand: "@",
                showHomeLink: "@"
            },
            restrict: "AE",
            transclude: true,
            replace: true,
            template: "\n                <header>\n                    <h4 class=\"brand\">\n                        <a href=\"{{portalUrl}}\" title=\"Go to the GeoPlatform Home Page\">\n                            <span class=\"icon-gp\"></span>\n                            <span class=\"hidden-xs\">GeoPlatform</span>\n                        </a>\n                        {{brand}}\n                    </h4>\n                    <ul role=\"menu\" class=\"header__menu\" gp-header-menu>\n                        <li ng-if=\"showHomeLink\">\n                            <a href=\"/\">\n                                <span class=\"glyphicon glyphicon-home\"></span> \n                                <span class=\"hidden-xs hidden-sm\">Home</span>\n                            </a>\n                        </li>\n                        <div class=\"transcluded\"></div>\n                        <li><span gp-login-button></span></li>\n                    </ul>\n                </header>\n            ",
            link: function link($scope, $element, $attrs, ctrl, transcludeFn) {
                $scope.showHomeLink = $scope.showHomeLink === 'true' || false;
                $scope.portalUrl = Config.portalUrl;
                AuthenticationService.getUserQ().then(function (user) {
                    $scope.user = user;
                });
                $element.find('.transcluded').replaceWith(transcludeFn());
            }
        };
    }]);
})(jQuery, angular);

(function (angular) {
    "use strict";

    angular.module('gp-common').directive('iframeOnload', function () {
        return {
            scope: {
                callback: '&iframeOnload'
            },
            link: function link(scope, element, attrs) {
                element.on('load', function (event) {
                    element.off('load');
                    return scope.callback(event);
                });
            }
        };
    });
})(angular);

(function (angular, Constants) {
    "use strict";

    angular.module("gp-common").directive('onImgFail', function () {
        return {
            restrict: "A",
            link: function link($scope, $element, $attrs) {
                var jqEl = jQuery($element);
                jqEl.on('error', function () {
                    jqEl.off('error');
                    jqEl.attr('src', $attrs.onImgFail);
                });
            }
        };
    }).directive('mapThumbnail', [function () {
        return {
            restrict: "A",
            scope: {
                mapThumbnail: '='
            },
            link: function link($scope, $element, $attrs) {
                var map = $scope.mapThumbnail;
                if (map.$promise && !map.$resolved) {
                    map.$promise.then(function (m) {
                        if (typeof m.thumbnail === 'string') $element.attr('src', getUrl(m));else buildThumbnail(m); //open map model
                    }).catch(function (e) {
                        $element.attr('src', null);
                    });
                } else {
                    if (typeof map.thumbnail === 'string') $element.attr('src', getUrl(map));else buildThumbnail(map);
                }
                function buildThumbnail(map) {
                    if (!map.thumbnail) {
                        $element.attr('src', null);
                    } else if (map.thumbnail.contentData) {
                        var style = 'background-size:contain;' + 'background-repeat:no-repeat;' + 'background-image: url(data:' + (map.thumbnail.mediaType || 'image/png') + ';base64,' + map.thumbnail.contentData + ');';
                        //if directive is on a responsive item (aka, in a gp-ui-card), 
                        // ignore thumbnail dimensions. Otherwise, use them
                        if ($element.attr('class').indexOf('embed-responsive-item') < 0) {
                            style += 'width:' + (map.thumbnail.width || '32') + 'px;' + 'height:' + (map.thumbnail.height || '32') + 'px;';
                        }
                        $element.attr('style', style);
                    } else if (map.thumbnail.url) {
                        $element.attr('src', map.thumbnail.url);
                    } else $element.attr('src', null);
                }
                function getUrl(map) {
                    var url = map.thumbnail;
                    if (!url || !url.length) url = Constants.ualUrl + '/api/maps/' + map.id + '/thumbnail';else if (url.indexOf("http") !== 0) {
                        if (url[0] !== '/') url = Constants.ualUrl + '/' + url;else url = Constants.ualUrl + url;
                    }
                    return url;
                }
            }
        };
    }]).directive('itemThumbnail', ['$q', function ($q) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                item: '=',
                fallback: '@',
                link: '@'
            },
            template: "\n                <a ng-show=\"hasThumbnail\" class=\"media embed-responsive embed-responsive-16by9\">\n                    <img class=\"embed-responsive-item\" on-img-error=\"{{fallback||'/img/img-404.jpg'}}\">\n                </a>\n            ",
            controller: ["$scope", function controller($scope) {
                $scope.elName = 'div';
                $scope.isLink = !!$scope.link;
                if ($scope.isLink) {
                    $scope.elName = 'a';
                }
            }],
            link: function link($scope, $element, $attrs) {
                var item = $scope.item;
                (item.$promise || $q.resolve(item)).then(function (obj) {
                    var url = $scope.fallback;
                    //maps
                    if (obj.type && obj.type === 'Map') url = Constants.ualUrl + "/api/maps/" + obj.id + "/thumbnail";else if (obj.assetType && obj.assetType === 'Map') url = Constants.ualUrl + "/api/maps/" + obj.assetId + "/thumbnail";else if (obj.thumbnail && obj.thumbnail.url) url = obj.thumbnail.url;else if (obj.thumbnail && obj.thumbnail.contentData) {
                        var style = 'background-size:contain;' + 'background-repeat:no-repeat;' + 'background-image: url(data:' + (obj.thumbnail.mediaType || 'image/png') + ';base64,' + obj.thumbnail.contentData + ');';
                        //if directive is on a responsive item (aka, in a gp-ui-card), 
                        // ignore thumbnail dimensions. Otherwise, use them
                        if ($element.attr('class').indexOf('embed-responsive-item') < 0) {
                            style += 'width:' + (obj.thumbnail.width || '32') + 'px;' + 'height:' + (obj.thumbnail.height || '32') + 'px;';
                        }
                        $element.find('img').attr('style', style);
                    }
                    $scope.hasThumbnail = !!url;
                    $element.find('img').attr('src', url);
                    if ($scope.isLink) {
                        //$element is a.media because of 'replace:true'
                        $element.attr('href', $scope.link).attr('target', '_blank');
                    }
                }).catch(function (e) {
                    $element.find('img').attr('src', $scope.fallback);
                });
            }
        };
    }]);
})(angular, GeoPlatform);

(function (angular) {
    "use strict";

    angular.module('gp-common').service('NotificationService', ['$rootScope', function ($rootScope) {
        var Service = function Service() {
            this.items = [];
        };
        Service.prototype = {
            getItems: function getItems() {
                return this.items;
            },
            /**
             * @param item object
             * @return function to cancel the notification
             */
            addItem: function addItem(item) {
                this.items.push(item);
                $rootScope.$broadcast('gp:notifications:new', item);
                var fn = function fn(item) {
                    this.removeItem(item);
                };
                return fn.bind(this, item);
            },
            removeItem: function removeItem(item) {
                var index = this.items.indexOf(item);
                if (index >= 0) return this.items.splice(index, 1);
                return null;
            },
            error: function error(label, msg, dismiss) {
                return this.addItem({ type: 'error', label: label, message: msg, canDismiss: dismiss });
            },
            success: function success(label, msg, dismiss) {
                return this.addItem({ type: 'success', label: label, message: msg, canDismiss: dismiss });
            },
            info: function info(label, msg, dismiss) {
                return this.addItem({ type: 'info', label: label, message: msg, canDismiss: dismiss });
            }
        };
        return new Service();
    }]).directive('gpNotifications', ['$timeout', 'NotificationService', function ($timeout, NotificationService) {
        return {
            scope: {
                expiration: '@'
            },
            template: ['<div class="notifications ng-hide" ng-show="items.length">', '  <div class="notification" ng-repeat="item in items"', '    ng-class="{\'notification--success\':item.type===\'success\', \'notification--error\':item.type===\'error\', \'notification--info\':item.type===\'info\'}">', '    <h5 class="notification__title">', '        <span class="pull-right glyphicon" ', '            ng-class="{\'glyphicon-ok-sign\':item.type===\'success\',\'glyphicon-exclamation-sign\':item.type===\'error\',\'glyphicon-info-sign\':item.type===\'info\'}">', '        </span>', '        {{item.label}}', '    </h5>', '    <p class="notification__content" ng-bind-html="item.message"></p>', '    <div class="notification__actions" ng-if="item.canDismiss">', '        <button type="button" class="btn btn-link" ng-click="dismiss(item)">dismiss</button>', '    </div>', '  </div>', '</div>'].join(' '),
            link: function link($scope, $element, $attrs) {
                $scope.expiration = ($scope.expiration || 2000) * 1;
                $scope.items = [];
                function update() {
                    $scope.items = NotificationService.getItems();
                    //if updated before timer expired, reset timer
                    if ($scope.timer) {
                        $timeout.cancel($scope.timer);
                        $scope.timer = null;
                    }
                    //set timer to kill earliest item after time
                    $scope.timer = $timeout(function () {
                        $scope.timer = null;
                        //will ultimately call update() and thus trigger timeout again
                        $scope.removeOldest();
                    }, $scope.expiration);
                }
                update();
                $scope.removeOldest = function () {
                    //find oldest that can be removed
                    var oldest = $scope.items.find(function (item) {
                        return item.canDismiss;
                    });
                    if (oldest) NotificationService.removeItem(oldest);
                };
                $scope.dismiss = function (item) {
                    //remove item using service
                    NotificationService.removeItem(item);
                };
                $scope.$watchCollection(function () {
                    return NotificationService.getItems();
                }, update);
                // $scope.$on('gp:notifications:new', function(event, item) { update(); });
            }
        };
    }]);
})(angular);

(function (jQuery, angular) {
    "use strict";
    /*
     * Usage:
     *
     *      <gp-pagination service="$ctrl.service" event-key="maps"></gp-pagination>
     *
     *  Expects a BrowseObjService instance for the 'service' binding, or at least
     * one that provides the same pagination and options API.
     */
    /**
     * Requires a service which exposes the following methods:
     *   - getPagination() : returns {object} defining 'start', 'size', and 'total'
     *   - start(int) : takes {int} defining which index to start requesting
     *   - size(int) : takes {int} defining how many items to request
     *   - on(eventName, listener) : must support event "gp:browse:<key>:pagination" where 'key' may be 'objects' or a custom key
     */

    var PaginationController = /** @class */function () {
        function PaginationController() {
            'ngInject';
        }
        PaginationController.prototype.$onInit = function () {
            var _this = this;
            if (!this.service) return;
            this.options = this.service.getPagination();
            //support using a traditional select instead of a uib dropdown menu
            // in case the pagination control itself is wrapped in a dropdown menu.
            //in this case, we use objects with labels and values in order to display
            // the 'per page' text along with whatever the page size is.
            this.pageSizeDropdown = true;
            this.useSelect = typeof this.useSelect !== 'undefined' && (this.useSelect === true || this.useSelect === 'true' || this.useSelect === 1);
            if (this.useSelect) {
                this.pageSizeDropdown = false;
                this.pageSize = this.options.size;
                this.pageSizeOptions = (this.options.sizeOptions || [5, 10, 20, 50]).map(function (o) {
                    return { label: o + ' per page', value: o };
                });
            }
            var event = 'gp:browse:';
            if (this.eventKey) event = 'gp:browse:' + this.eventKey + ":";else event = 'gp:browse:objects:';
            this.listener = this.service.on(event + 'pagination', function () {
                _this.options = _this.service.getPagination();
            });
        };
        PaginationController.prototype.$onDestroy = function () {
            //remove listener from service if exists
            if (this.listener) this.listener();
            this.service = null;
        };
        PaginationController.prototype.previous = function () {
            if (this.service && this.hasPrevious()) {
                this.service.start(Math.max(0, this.options.start * 1 - this.options.size * 1), true);
            }
        };
        PaginationController.prototype.next = function () {
            if (this.service && this.hasNext()) {
                this.service.start(Math.min(this.options.total, this.options.start * 1 + this.options.size * 1), true);
            }
        };
        PaginationController.prototype.first = function () {
            if (this.service && this.hasPrevious()) {
                this.service.start(0, true);
            }
        };
        PaginationController.prototype.last = function () {
            if (this.service && this.hasNext()) {
                var lastPage = Math.floor(this.options.total / this.options.size);
                this.setPage(lastPage);
            }
        };
        PaginationController.prototype.setPage = function (arg) {
            if (this.service) {
                var page = arg * 1;
                this.service.start(page * (this.options.size * 1), true);
            }
        };
        PaginationController.prototype.setPageSize = function (size) {
            if (this.service) {
                this.service.size(size * 1, true);
            }
        };
        PaginationController.prototype.hasPrevious = function () {
            return this.options && this.options.start > 0;
        };
        PaginationController.prototype.hasNext = function () {
            return this.options && this.options.start + this.options.size < this.options.total;
        };
        return PaginationController;
    }();
    angular.module('gp-common').component('gpPagination', {
        bindings: {
            service: '=',
            eventKey: '@',
            useSelect: '@'
        },
        controller: PaginationController,
        template: "\n            <div class=\"c-pagination\">\n                <div class=\"c-pagination__total\">{{$ctrl.options.total||0}} results</div>\n                <div class=\"c-pagination__page-size\" ng-if=\"$ctrl.pageSizeDropdown\">\n                    <span uib-dropdown>\n                        <a href=\"\" uib-dropdown-toggle title=\"Change the number of results returned\">\n                            {{$ctrl.options.size}} per page <span class=\"caret\"></span>\n                        </a>\n                        <ul class=\"dropdown-menu\" role=\"menu\">\n                            <li ng-repeat=\"size in $ctrl.options.sizeOptions track by $index\">\n                                <a ng-click=\"$ctrl.setPageSize(size)\">{{size}} per page</a>\n                            </li>\n                        </ul>\n                    </span>\n                </div>\n                <div class=\"c-pagination__page-size\" ng-if=\"!$ctrl.pageSizeDropdown\">\n                    <select class=\"form-control\" \n                        ng-model=\"$ctrl.pageSize\" ng-change=\"$ctrl.setPageSize($ctrl.pageSize)\"\n                        ng-options=\"opt.value as opt.label for opt in $ctrl.pageSizeOptions\">\n                    </select>\n                </div>\n                <div class=\"c-pagination__pages\">\n                    <div class=\"c-pagination__button\" \n                        ng-class=\"{'is-disabled':!$ctrl.hasPrevious()}\"\n                        ng-click=\"$ctrl.first()\">\n                        <span class=\"glyphicon glyphicon-fast-backward\"></span>\n                    </div>\n                    <div class=\"c-pagination__button\" \n                        ng-class=\"{'is-disabled':!$ctrl.hasPrevious()}\"\n                        ng-click=\"$ctrl.previous()\">\n                        <span class=\"glyphicon glyphicon-backward\"></span>\n                    </div>\n                    <div class=\"c-pagination__page\">\n                        {{$ctrl.options.start+1}} - {{$ctrl.options.start+$ctrl.options.size}}\n                    </div>\n                    <div class=\"c-pagination__button\" \n                        ng-class=\"{'is-disabled':!$ctrl.hasNext()}\"\n                        ng-click=\"$ctrl.next()\">\n                        <span class=\"glyphicon glyphicon-forward\"></span>\n                    </div>\n                    <div class=\"c-pagination__button\" \n                        ng-class=\"{'is-disabled':!$ctrl.hasNext()}\"\n                        ng-click=\"$ctrl.last()\">\n                        <span class=\"glyphicon glyphicon-fast-forward\"></span>\n                    </div>\n                </div>\n            </div>\n        "
    });
})(jQuery, angular);

(function (angular) {
    "use strict";
    /**
     * Usage:
     *  <gp-progress-circle ng-model="$ctrl.amount"></gp-progress-circle>
     */

    angular.module('gp-common').component('gpProgressCircle', {
        bindings: {
            ngModel: '<' //amount out of 100
        },
        controller: function controller() {
            this.$onInit = function () {
                this.dashArray = 2 * Math.PI * 45 /*radius*/;
                if (!this.ngModel) this.ngModel = 0;
                this.update();
            };
            this.$onChanges = function (changes) {
                if (changes.ngModel) this.update();
            };
            this.update = function () {
                var offset = 2 * Math.PI * 45 * (1 - this.ngModel / 100);
                this.value = offset;
            };
        },
        template: "\n            <svg class=\"c-progress--circle\" viewBox=\"0 0 100 100\">\n                <circle class=\"c-progress__meter\" cx=\"50\" cy=\"50\" r=\"45\" stroke-width=\"10\" />\n                <circle class=\"c-progress__value\" cx=\"50\" cy=\"50\" r=\"45\" stroke-width=\"10\" \n                    stroke-dasharray=\"{{$ctrl.dashArray}}\" stroke-dashoffset=\"{{$ctrl.value}}\"/>\n                <text class=\"c-progress__label\" x=\"50\" y=\"-40\" text-anchor=\"middle\">{{$ctrl.ngModel}}%</text>\n            </svg>\n        "
    });
})(angular);

(function (jQuery, angular) {
    "use strict";

    angular.module('gp-common').provider('responsiveHelper', ["$windowProvider", function ($windowProvider) {
        var $window = $windowProvider.$get();
        function Helper($window) {
            this.window = $window;
        }
        Helper.prototype = {
            getWidth: function getWidth() {
                return $window.innerWidth || $window.outerWidth;
            },
            isXS: function isXS() {
                var width = this.getWidth();return width < 768;
            },
            isSM: function isSM() {
                var width = this.getWidth();return width >= 768 && width < 992;
            },
            isMD: function isMD() {
                var width = this.getWidth();return width >= 992 && width < 1200;
            },
            isLG: function isLG() {
                var width = this.getWidth();return width >= 1200;
            }
        };
        var helper = new Helper($window);
        this.$get = function () {
            return helper;
        };
    }]).directive('gpResponsive', ['$window', 'responsiveHelper', function ($window, responsiveHelper) {
        return {
            restrict: "A",
            link: function link($scope, $element, $attrs) {
                function update(el, helper) {
                    if (helper.isXS()) el.addClass('gp-responsive-xs');else el.removeClass('gp-responsive-xs');
                    if (helper.isSM()) el.addClass('gp-responsive-sm');else el.removeClass('gp-responsive-sm');
                    if (helper.isMD()) el.addClass('gp-responsive-md');else el.removeClass('gp-responsive-md');
                    if (helper.isLG()) el.addClass('gp-responsive-lg');else el.removeClass('gp-responsive-lg');
                }
                update($element, responsiveHelper);
                var resizeFn = function resizeFn() {
                    update($element, responsiveHelper);
                };
                var w = angular.element($window);
                var listener = w.on('resize', resizeFn);
                $scope.$on('$destroy', function () {
                    w.off('resize', resizeFn);
                });
            }
        };
    }]).directive('gpResize', ["$window", "$timeout", function ($window, $timeout) {
        return function ($scope, $element, $attr) {
            var resizeFn = function resizeFn() {
                var hh = jQuery('header')[0].offsetHeight;
                // var fh = jQuery('footer')[0].offsetHeight;
                // console.log('hh & fh', hh, fh);                    
                var tp = hh + 2;
                // var bt = fh + 2;
                // console.log('tp & bt', tp, bt);                
                var changes = {
                    // bottom: bt + 'px',
                    top: tp + 'px'
                };
                $element.css(changes);
                $scope.$apply();
            };
            var w = angular.element($window);
            w.on('resize', resizeFn);
            $timeout(resizeFn, 200);
            $scope.$on('$destroy', function () {
                w.off('resize', resizeFn);
            });
        };
    }]);
})(jQuery, angular);

(function (jQuery, angular) {
    "use strict";

    function inputLinkFunction($scope, $element, $attrs, ngModelController, $timeout) {
        if (!$scope.type) $scope.type = "text";
        if ($scope.required === 'true') $scope.required = true;else $scope.required = false;
        $scope.elId = 'input_' + Math.ceil(Math.random() * 9999);
        $scope.size = $scope.size || 'medium';
        $scope.type = $scope.type || 'text';
        //listen for changes to the inner value by way of the form-control
        $element.find('.form-control').on('change', function onChange() {
            validate($scope.innerValue);
        });
        /* ------------- private methods --------------- */
        function validate() {
            //check form-control for ng-invalid
            var input = $element.find('.form-control');
            $scope.isDirty = input.hasClass('ng-dirty');
            if (input.hasClass('ng-invalid')) {
                if (input.hasClass("ng-empty")) $scope.error = "This field requires a value";else $scope.error = "Invalid value provided";
            } else $scope.error = null;
        }
        function update(newValue) {
            // call $parsers pipeline then update $modelValue
            ngModelController.$setViewValue(newValue);
            // update the local view
            ngModelController.$render();
        }
        // when model change, update our view (just update the div content)
        ngModelController.$render = function () {
            var value = ngModelController.$viewValue;
            //create copy of passed in model value that can be used
            // by the controls here allowing us to cancel and 
            // commit changes at our own leisure
            $scope.innerValue = value;
            $scope.displayValue = value || $scope.placeholder || "No value provided";
            validate(value);
        };
        /* ------------- private methods --------------- */
        $scope.isReadOnly = function () {
            var t = _typeof(this.readOnly);
            if (t === 'undefined') return false;
            if (t === 'string') return this.readOnly.toLowerCase() === 'true';
            if (t === 'number') return this.readOnly === 1;
            if (t === 'boolean') return this.readOnly;
            return false;
        };
        //enter edit mode
        $scope.edit = function () {
            if ($scope.isReadOnly()) return;
            $scope.editing = true;
            //auto-focus on form-control when entering edit mode
            $timeout(function () {
                $element.find('.form-control').focus().select();
            }, 200);
        };
        //leave edit mode (regardless of save() or cancel())
        $scope.done = function () {
            $scope.editing = false;
            $scope.error = null;
        };
        $scope.save = function () {
            //update display with new value
            update($scope.innerValue);
            $scope.done();
        };
        $scope.cancel = function () {
            //reset inner value
            $scope.innerValue = ngModelController.$viewValue;
            $scope.done();
        };
        $scope.onKeyPress = function ($event, code) {
            // console.log("Pressed " + code);
            if ((code === undefined || code === 0) && $event.which !== undefined) code = $event.which;
            if ($scope.type === 'number') {
                //NOTE: Chrome does not catch Backspace onKeyPress, so it 
                // skips this handler. FF does, so we need to watch for 
                // backspace, delete, and numbers
                if (code === 8 || //backspace
                code === 46 || //delete  
                code >= 44 && code <= 57) return;
                //NOTE: keyPress period is 46. keyDown it is 190
                $event.preventDefault();
                return false; //ignore key
            }
        };
        $scope.onKeyUp = function ($event, code) {
            // console.log("Up " + code);
            if ((code === undefined || code === 0) && $event.which !== undefined) code = $event.which;
            if (code === 13 && !$scope.error) $scope.done(); //enter
            else if (code === 27) $scope.cancel(); //esc
                else {
                        if (code !== 8 && //backspace
                        code !== 46 && //delete
                        code !== 190 && ( //period
                        code < 48 || code > 90) && ( //letters and numbers (a-z, 0-9)
                        code < 106 || code > 111) && code < 186) return;
                        validate();
                    }
        };
        $scope.$destroy = function () {
            $element.off('change');
        };
    }
    angular.module("gp-common").directive('gpSlickFormInput', ['$timeout', function ($timeout) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                label: "@",
                placeholder: '@',
                help: '=',
                // validator: '&',
                // validationExpr: '@',
                type: '@',
                pattern: "@",
                required: '@',
                readOnly: '@',
                size: '@',
                icon: '@'
            },
            template: INPUT_TEMPLATE,
            link: function link($scope, $element, $attrs, ngModelController) {
                inputLinkFunction($scope, $element, $attrs, ngModelController, $timeout);
            }
        };
    }]).directive('gpSlickFormTextarea', ['$timeout', function ($timeout) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                label: "@",
                placeholder: '@',
                help: "@",
                readOnly: "@",
                size: "@",
                icon: "@"
            },
            template: TEXTAREA_TEMPLATE,
            link: function link($scope, $element, $attrs, ngModelController) {
                inputLinkFunction($scope, $element, $attrs, ngModelController, $timeout);
            }
        };
    }]).directive('gpSlickFormDate', ['$timeout', '$filter', function ($timeout, $filter) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                label: "@",
                format: "@",
                placeholder: '@',
                required: "@",
                readOnly: "@",
                size: '@',
                icon: '@'
            },
            template: DATE_TEMPLATE,
            controller: ["$scope", "$element", function controller($scope, $element) {
                if (!$scope.format || $scope.format.length < 3) $scope.format = "mediumDate";
                $scope.inline = $element.hasClass("inline");
            }],
            /**
             *
             */
            link: function link($scope, $element, $attrs, ngModelController) {
                if ($scope.required === 'true') $scope.required = true;else $scope.required = false;
                $scope.elId = 'input_' + Math.ceil(Math.random() * 9999);
                $scope.size = $scope.size || 'medium';
                $scope.type = $scope.type || 'text';
                function validate(value) {
                    // console.log("Validating '" + value + "'");
                    //check form-control for ng-invalid
                    var input = $element.find('.form-control');
                    if (input.hasClass('ng-invalid')) {
                        if (input.hasClass("ng-empty")) $scope.error = "This field requires a value";else $scope.error = "Invalid value provided";
                    } else $scope.error = null;
                }
                function update(newValue) {
                    // call $parsers pipeline then update $modelValue
                    ngModelController.$setViewValue(newValue);
                    // update the local view
                    ngModelController.$render();
                }
                // when model change, update our view (just update the div content)
                ngModelController.$render = function () {
                    var value = ngModelController.$viewValue;
                    //create copy of passed in model value that can be used
                    // by the controls here allowing us to cancel and 
                    // commit changes at our own leisure
                    $scope.innerValue = value;
                    $scope.displayValue = value ? $filter('date')(ngModelController.$modelValue, $scope.format) : $scope.placeholder || "No value provided";
                    validate(value);
                };
                $scope.isReadOnly = function () {
                    var t = _typeof(this.readOnly);
                    if (t === 'undefined') return false;
                    if (t === 'string') return this.readOnly.toLowerCase() === 'true';
                    if (t === 'number') return this.readOnly === 1;
                    if (t === 'boolean') return this.readOnly;
                    return false;
                };
                //enter edit mode
                $scope.edit = function () {
                    if ($scope.isReadOnly()) return;
                    $scope.editing = true;
                    //auto-focus on form-control when entering edit mode
                    // $timeout(function() { $element.find('.form-control').focus().select(); }, 200);
                };
                //leave edit mode (regardless of save() or cancel())
                $scope.done = function () {
                    $scope.opened = false;
                    $scope.editing = false;
                    $scope.error = null;
                };
                $scope.save = function () {
                    //update display with new value
                    update($scope.innerValue);
                    $scope.done();
                };
                $scope.cancel = function () {
                    //reset inner value
                    $scope.innerValue = angular.copy(ngModelController.$modelValue);
                    $scope.done();
                };
                $scope.open = function () {
                    //must wrap 'opened' variable in an object for 
                    // angular to properly track its value changes
                    // from within children scope (ie, the date picker)
                    if (typeof $scope.uibopts === 'undefined') {
                        $scope.uibopts = {};
                    }
                    $scope.uibopts.opened = true;
                };
                $scope.onKeyUp = function (code) {
                    if (code === 13) {
                        $scope.done();
                    } else if (code === 27) {
                        $scope.cancel();
                    }
                };
                $scope.onChange = function (date) {
                    if (isNaN(ngModelController.$modelValue) && $scope.required) {
                        $scope.error = "This field requires a value";
                    } else $scope.error = null;
                };
            }
        };
    }]).directive('gpSlickFormSelect', ['$timeout', function ($timeout) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                label: "@",
                codeList: "=",
                help: '=',
                required: "@",
                readOnly: "@",
                size: '@',
                icon: '@'
            },
            template: SELECT_TEMPLATE,
            link: function link($scope, $element, $attrs, ngModelController) {
                if (!$scope.type) $scope.type = "text";
                if ($scope.required === 'true') $scope.required = true;else $scope.required = false;
                $scope.elId = 'input_' + Math.ceil(Math.random() * 9999);
                $scope.size = $scope.size || 'medium';
                $scope.type = $scope.type || 'text';
                var $select = null;
                function getSelect() {
                    if (!$select || !$select.length) $select = $element.find('.form-control');
                    return $select;
                }
                if ($scope.codeList) {
                    $scope.selectOptions = $scope.codeList.map(function (item) {
                        if ((typeof item === "undefined" ? "undefined" : _typeof(item)) !== 'object' || !item.value) return { value: item, label: item };else if (!item.label) return { value: item.value, label: item.value };
                        return item;
                    });
                } else $scope.selectOptions = [];
                //listen for changes to the inner value by way of the form-control
                // $element.find('.form-control').on('change', function onChange() { 
                //     validate($scope.innerValue); 
                // });
                /* ------------- private methods --------------- */
                function validate() {
                    //check form-control for ng-invalid
                    var select = getSelect();
                    $scope.isDirty = select.hasClass('ng-dirty');
                    if (select.hasClass('ng-invalid')) {
                        if (select.hasClass("ng-empty")) $scope.error = "This field requires a value";else $scope.error = "Invalid value provided";
                    } else $scope.error = null;
                }
                function update(newValue) {
                    // call $parsers pipeline then update $modelValue
                    ngModelController.$setViewValue(newValue);
                    // update the local view
                    ngModelController.$render();
                }
                // when model change, update our view (just update the div content)
                ngModelController.$render = function () {
                    var value = ngModelController.$viewValue;
                    //@see https://github.com/angular/angular.js/commit/7fda214c4f65a6a06b25cf5d5aff013a364e9cef
                    //create copy of passed in model value that can be used
                    // by the controls here allowing us to cancel and 
                    // commit changes at our own leisure
                    $scope.innerValue = value;
                    $scope.displayValue = $scope.placeholder || "No value provided";
                    if (value) {
                        //values are objects, not literals
                        var opt = $scope.selectOptions.find(function (o) {
                            return o.value == value;
                        });
                        $scope.displayValue = opt.label;
                    }
                    validate();
                };
                /* ------------- private methods --------------- */
                $scope.onChange = function (value) {
                    // console.log("Changing value " + value + " vs " + $scope.innerValue);
                    $scope.innerValue = value;
                    $timeout(function () {
                        validate();
                    }, 200);
                };
                $scope.onTypeaheadSelection = function ($item, $model, $label, $event) {
                    $scope.innerValue = $item ? $item.value : null;
                    $timeout(function () {
                        validate();
                    }, 200);
                };
                $scope.isReadOnly = function () {
                    var t = _typeof(this.readOnly);
                    if (t === 'undefined') return false;
                    if (t === 'string') return this.readOnly.toLowerCase() === 'true';
                    if (t === 'number') return this.readOnly === 1;
                    if (t === 'boolean') return this.readOnly;
                    return false;
                };
                //enter edit mode
                $scope.edit = function () {
                    if ($scope.isReadOnly()) return;
                    $scope.editing = true;
                    //auto-focus on form-control when entering edit mode
                    $timeout(function () {
                        $select.focus().select();
                    }, 200);
                };
                //leave edit mode (regardless of save() or cancel())
                $scope.done = function () {
                    $scope.editing = false;
                    $scope.error = null;
                };
                $scope.save = function () {
                    //update display with new value
                    update($scope.innerValue);
                    $scope.done();
                };
                $scope.cancel = function () {
                    //reset inner value
                    $scope.innerValue = ngModelController.$viewValue;
                    $scope.done();
                };
                $scope.onKeyUp = function (code) {
                    if (code === 13 && !$scope.error) {
                        $scope.save();
                    } else if (code === 27) {
                        $scope.cancel();
                    }
                };
                $scope.onTypeaheadKeyUp = function (code) {
                    validate();
                };
                $scope.$destroy = function () {
                    // $element.off('change');
                };
            }
        };
    }]);
    var INPUT_TEMPLATE = ['<div class="form-group form-group-slick">', '   <label for="{{::elId}}" class="control-label">{{::label}}</label>', '   <div class="input__display" ', '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error,\'text-lg\':size===\'large\'}" ', '       ng-show="!editing" ng-click="edit()" ', '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">', '      {{displayValue}}', '   </div>', '   <div ng-show="editing">', '      <div class="input-group" ng-class="{\'input-group-lg\':size===\'large\'}">', '           <div class="input-group-slick" ng-class="{\'input-group-slick--lg\':size===\'large\'}">', '               <span ng-if="icon" class="{{::icon}}"></span>', '               <input id="{{::elId}}" type="{{::type}}" class="form-control" ', '                   pattern="{{pattern}}" ', '                   ng-model="innerValue" ', '                   ng-required="{{required}}" ', '                   ng-keypress="onKeyPress($event, $event.keyCode)" ', '                   ng-keyup="onKeyUp($event, $event.keyCode)" >', '               <span class="indicators">', '                   <span class="is-valid glyphicon glyphicon-ok-sign"></span>', '                  <span class="is-invalid glyphicon glyphicon-exclamation-sign"></span>', '              </span>', '           </div>', '          <span class="input-group-btn">', '               <button type="button" class="btn btn-default" ', '                   ng-class="{\'btn-lg\':size===\'large\'}"', '                   ng-click="cancel()" title="Cancel changes">', '                   <span class="glyphicon glyphicon-ban-circle"></span>', '              </button>', '               <button type="button" class="btn btn-default" ', '                   ng-class="{disabled:!!error||!isDirty,\'btn-lg\':size===\'large\'}"', '                   ng-disabled="{{!!error}}" ', '                   ng-click="save()" title="Save changes">', '                  <span class="glyphicon glyphicon-ok"></span>', '               </button>', '           </span>', '       </div>', '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>', '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>', '   </div>', '</div>'].join(' ');
    var TEXTAREA_TEMPLATE = ['<div class="form-group form-group-slick">', '   <label for="{{::elId}}" class="control-label">{{::label}}</label>', '   <div class="input__display" ', '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error,\'text-lg\':size===\'large\'}" ', '       ng-show="!editing" ng-click="edit()" ', '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">', '      {{displayValue}}', '   </div>', '   <div ng-show="editing">', '      <div class="input-group" ng-class="{\'input-group-lg\':size===\'large\'}">', '           <div class="input-group-slick" ng-class="{\'input-group-slick--lg\':size===\'large\'}">', '               <span ng-if="icon" class="{{::icon}}"></span>', '               <textarea rows="3" id="{{::elId}}" class="form-control" ', '                   ng-required="{{required}}" ng-model="innerValue"', '                   ng-keypress="onKeyPress($event, $event.keyCode)" ', '                   ng-keyup="onKeyUp($event, $event.keyCode)"></textarea>', '               <span class="indicators">', '                   <span class="is-valid glyphicon glyphicon-ok-sign"></span>', '                  <span class="is-invalid glyphicon glyphicon-exclamation-sign"></span>', '              </span>', '           </div>', '          <span class="input-group-btn">', '               <button type="button" class="btn btn-default" ', '                   ng-class="{\'btn-lg\':size===\'large\'}"', '                   ng-click="cancel()" title="Cancel changes">', '                   <span class="glyphicon glyphicon-ban-circle"></span>', '              </button>', '               <button type="button" class="btn btn-default" ', '                   ng-class="{disabled:!!error||!isDirty,\'btn-lg\':size===\'large\'}"', '                   ng-disabled="{{!!error}}" ', '                   ng-click="save()" title="Save changes">', '                  <span class="glyphicon glyphicon-ok"></span>', '               </button>', '           </span>', '       </div>', '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>', '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>', '   </div>', '</div>'].join(' ');
    var DATE_TEMPLATE = ['<div class="form-group form-group-slick">', '   <label for="{{::elId}}" class="control-label">{{::label}}</label>', '   <div class="input__display" ', '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error}" ', '       ng-show="!editing" ng-click="edit()" ', '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">', '      {{displayValue}}', '   </div>', '   <div ng-show="editing">', '       <div uib-datepicker ng-required="{{required}}" ng-model="innerValue" datepicker-options="{showWeeks:false}"></div>', '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>', '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>', '       <button type="button" class="btn btn-default" ', '           ng-class="{\'btn-lg\':size===\'large\'}"', '           ng-click="cancel()" title="Cancel changes">', '           <span class="glyphicon glyphicon-ban-circle"></span>', '      </button>', '      <button type="button" class="btn btn-default" ', '           ng-class="{disabled:!!error,\'btn-lg\':size===\'large\'}"', '          ng-disabled="{{!!error}}" ', '           ng-click="save()" title="Save changes">', '           <span class="glyphicon glyphicon-ok"></span>', '      </button>', '   </div>', '</div>'].join(' ');
    var SELECT_TEMPLATE = ['<div class="form-group form-group-slick">', '   <label for="{{::elId}}" class="control-label">{{::label}}</label>', '   <div class="input__display" ', '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error}" ', '       ng-show="!editing" ng-click="edit()" ', '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">', '      {{displayValue}}', '   </div>', '   <div ng-show="editing">', '      <div class="input-group" ng-class="{\'input-group-lg\':size===\'large\'}">', '           <div class="input-group-slick" ng-class="{\'input-group-slick--lg\':size===\'large\'}">', '               <span ng-if="icon" class="{{::icon}}"></span>', '               <select class="form-control input__field" ', '                   ng-if="codeList.length<=12" ', '                   ng-model="innerValue" ', '                   ng-options="opt.value as opt.label for opt in selectOptions" ', '                   ng-required="{{required}}" ', '                   ng-change="onChange(innerValue)" ', '                   ng-keyUp="onKeyUp($event.keyCode)" >', '                   <option value="">Select One</option>', '               </select>', '               <input type="text" class="form-control input__field" ng-if="codeList.length>12" ', '                   ng-model="innerValue" ', '                   ng-required="{{required}}" ', '                   ng-keyUp="onTypeaheadKeyUp($event.keyCode)" ', '                   typeahead-on-select="onTypeaheadSelection($item, $model, $label, $event)" ', '                   uib-typeahead="opt.value as opt.label for opt in selectOptions | filter:{value:$viewValue} | limitTo:12" ', '                   typeahead-min-length="0" ', '                   typeahead-editable="false">', '               <span class="indicators">', '                   <span class="is-valid glyphicon glyphicon-ok-sign"></span>', '                  <span class="is-invalid glyphicon glyphicon-exclamation-sign"></span>', '              </span>', '           </div>', '          <span class="input-group-btn">', '               <button type="button" class="btn btn-default" ', '                   ng-class="{\'btn-lg\':size===\'large\'}"', '                   ng-click="cancel()" title="Cancel changes">', '                   <span class="glyphicon glyphicon-ban-circle"></span>', '              </button>', '               <button type="button" class="btn btn-default" ', '                   ng-class="{disabled:!!error||!isDirty,\'btn-lg\':size===\'large\'}"', '                   ng-disabled="{{!!error}}" ', '                   ng-click="save()" title="Save changes">', '                  <span class="glyphicon glyphicon-ok"></span>', '               </button>', '           </span>', '       </div>', '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>', '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>', '   </div>', '</div>'].join(' ');
})(jQuery, angular);

(function (angular) {
    "use strict";

    angular.module("gp-common").directive('gpTweetButton', ['$timeout', function ($timeout) {
        function debounce(func, wait, immediate) {
            var timeout;
            return function () {
                var context = this,
                    args = arguments;
                var later = function later() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
        return {
            link: function link(scope, element, attr) {
                if (typeof twttr === 'undefined') {
                    element.className += ' disabled';
                    return;
                }
                var renderTwitterButton = debounce(function () {
                    if (attr.url) {
                        $timeout(function () {
                            element[0].innerHTML = '';
                            twttr.widgets.createShareButton(attr.url, element[0], function () {}, {
                                count: attr.count,
                                text: attr.text,
                                via: attr.via,
                                size: attr.size,
                                hashtags: attr.hashtags,
                                dnt: attr.dnt
                            });
                        });
                    }
                }, 75);
                attr.$observe('url', renderTwitterButton);
                attr.$observe('text', renderTwitterButton);
            }
        };
    }]);
})(angular);

(function (angular) {
    "use strict";

    angular.module("gp-common").directive('sortOrder', function () {
        return {
            replace: true,
            require: 'ngModel',
            template: ['<div>', '<a class="btn btn-default" title="Click to sort in ascending order" href ng-if="value===\'dsc\'" ng-click="toggle()">', '    <span class="glyphicon glyphicon-sort-by-attributes-alt"></span>', '</a>', '<a class="btn btn-default" title="Click to sort in descending order" href ng-if="value===\'asc\'" ng-click="toggle()">', '    <span class="glyphicon glyphicon-sort-by-attributes"></span>', '</a>', '</div>'].join(' '),
            link: function link($scope, element, attrs, ngModel) {
                ngModel.$viewChangeListeners.push(function () {
                    $scope.$eval(attrs.ngChange);
                });
                ngModel.$render = function () {
                    $scope.value = ngModel.$modelValue;
                };
                $scope.toggle = function () {
                    $scope.value = $scope.value === 'asc' ? 'dsc' : 'asc';
                    ngModel.$setViewValue($scope.value);
                };
            }
        };
    });
})(angular);

(function (angular) {
    'use strict';
    /**
     * directive used in conjunction with ng-model to map arrays of strings
     * to form field controls for editing.
     *
     * Usage:  <input ng-model="arrOfStr" string-array-input></input>
     *
     */

    angular.module('gp-common').directive('stringArrayInput', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function link(scope, element, attr, ngModel) {
                function fromInput(text) {
                    var result = null;
                    if (text && text.length) result = text.split(',').map(function (i) {
                        return i.trim();
                    });
                    return result;
                }
                function toInput(arr) {
                    var result = null;
                    if (arr && typeof arr.push !== 'undefined') result = arr.join(', ');
                    return result;
                }
                ngModel.$parsers.push(fromInput);
                ngModel.$formatters.push(toInput);
            }
        };
    });
})(angular);

(function (jQuery, angular) {
    "use strict";

    angular.module("gp-common").filter('fixLabel', function () {
        return function (value) {
            if (!value || typeof value !== 'string' || !value.length) return 'Untitled';
            var result = value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").trim();
            return result.charAt(0).toUpperCase() + result.slice(1);
        };
    }).filter('pluralize', function () {
        return function (text) {
            if (!text || !text.length) return "";
            if (text.endsWith('ss')) return text + 'es'; //classes, etc
            if (text.endsWith('s')) return text; //already plural
            return text + 's';
            //TODO support irregular words like "foot" -> "feet"
            // and words that need duplicate letters: "quiz" -> "quizzes"
        };
    }).filter('capitalize', function () {
        return function (text) {
            return text[0].toUpperCase() + text.substring(1);
        };
    }).filter('facets', function () {
        return function (arr, facetName) {
            if (!facetName) return arr;
            if (!arr || !arr.length) return [];
            return arr.filter(function (f) {
                return f.toLowerCase().startsWith(facetName + ":");
            }).map(function (f) {
                return f.substring(f.indexOf(':') + 1, f.length);
            });
        };
    }).filter('joinBy', function () {
        return function (input, delimiter, emptyValue) {
            if (input && typeof input.push !== 'undefined' && input.length) return input.join(delimiter || ', ');else return emptyValue || '';
        };
    }).filter('defaultValue', function () {
        return function (text, defVal) {
            if (typeof text === 'undefined' || !text.length) return defVal;
            return text;
        };
    }).filter('count', function () {
        return function (input) {
            if (typeof input !== 'undefined') {
                if (typeof input.push === 'function') return input.length;
                if ((typeof input === "undefined" ? "undefined" : _typeof(input)) === 'object') {
                    if (typeof Object.keys !== 'undefined') {
                        return Object.keys(input);
                    }
                }
            }
            return 0;
        };
    }).filter('gpObjTypeMapper', function () {
        return function (str) {
            if (!str || typeof str !== 'string' || str.length === 0) return str;
            var name = str;
            var idx = str.indexOf(":");
            if (~idx) name = str.substring(idx + 1);
            if ('VCard' === name) return 'Contact';
            return name;
        };
    }).filter('gpReliabilityGrade', function () {
        return function (arg) {
            var o = arg;
            if ((typeof o === "undefined" ? "undefined" : _typeof(o)) === 'object') {
                if (o.statistics) o = o.statistics.reliability || null;else if (o.reliability) o = o.reliability;else o = null;
            }
            if (!isNaN(o)) {
                o = o * 1;
                if (o === null || typeof o === 'undefined') return 'X';else if (o > 90) return 'A';else if (o > 80) return 'B';else if (o > 70) return 'C';else if (o > 60) return 'D';else return 'F';
                // if (value >= 97) letter = 'A+';
                // else if (value >= 93) letter = 'A';
                // else if (value >= 90) letter = 'A-';
                // else if (value >= 87) letter = 'B+';
                // else if (value >= 83) letter = 'B';
                // else if (value >= 80) letter = 'B-';
                // else if (value >= 77) letter = 'C+';
                // else if (value >= 73) letter = 'C';
                // else if (value >= 70) letter = 'C-';
                // else if (value >= 67) letter = 'D+';
                // else if (value >= 63) letter = 'D';
                // else if (value >= 60) letter = 'D-';
            }
            return "X";
        };
    });
})(jQuery, angular);

(function (angular, Constants) {
    'use strict';

    var KGEditor = /** @class */function () {
        KGEditor.$inject = ["$rootScope", "$element", "KGFields", "KGHelper"];
        function KGEditor($rootScope, $element, KGFields, KGHelper) {
            'ngInject';

            this.$rootScope = $rootScope;
            this.$element = $element;
            this.fields = KGFields.slice(0);
            this.helper = KGHelper;
        }
        KGEditor.prototype.$onInit = function () {
            this.displayOptions = {};
            this.completion = 0;
            this.service = this.helper.getService(this.ngModel.type);
            this.descriptions = {
                purpose: 'The intended use or reason for the Object (i.e., layer, map, gallery) e.g., environmental impact of an oil spill.',
                'function': 'The business actions, activities, or tasks this Object is intended to support (i.e., the role it plays in supporting an activity).  e.g., environmental impact assessment.',
                audience: 'The group of people for which this Object was intended to be used. e.g., general public, disaster recovery personnel, Congress.',
                community: 'The GeoPlatform community this Object was produced for. e.g., "Ecosystems and Biodiversity" community',
                place: 'The central locale or common names for the place where the Subjects of the Object occur. e.g.,  USA/Gulf Coast',
                category: 'The type or category of the Object.  e.g., topographic map, elevation layer',
                primarySubject: 'The selected things, events, or concepts forming part of or represented by the Object. e.g., Deep Water Horizon oil rig, oil slick extent, oil slick movement over time, predicted oil slick movement, impacted sites, impact severity.',
                secondarySubject: 'Second-order subjects derived by machine processing/ analysis of the target Object',
                primaryTopic: 'The central branch of knowledge or theme pertaining to the thing, concept, situation, issue, or event of interest. e.g., environmental impact of oil spill.',
                secondaryTopic: 'Second-order topics derived by machine processing/ analysis of the target Object'
            };
            if (!this.ngModel.classifiers) this.ngModel.classifiers = {};
            this.calculatePercentage();
        };
        KGEditor.prototype.$onDestroy = function () {
            this.$rootScope = null;
            this.ngModel = null;
            this.helper = null;
            this.fields = null;
            this.service = null;
        };
        /**
         * @param {string} property - name of KG property being modified
         * @param {array[object]} values - new values to assign to the property (includes old values)
         */
        KGEditor.prototype.onChange = function (property, values) {
            // console.log("Changed " + property + " with " + (values?values.length:0) + " values");
            this.ngModel.classifiers[property] = values;
            this.calculatePercentage();
        };
        /**
         * @param {string} classifier - KG property whose value has been activated
         * @param {object} value - selected value being activated
         */
        KGEditor.prototype.onValueClick = function (classifier, value) {
            if (this.onActivate) {
                this.onActivate({ classifier: classifier, value: value });
            }
        };
        /**
         *
         */
        KGEditor.prototype.calculatePercentage = function () {
            this.completion = this.helper.calculate(this.ngModel.classifiers);
        };
        return KGEditor;
    }();
    angular.module('gp-common-kg').component('kgEditor', {
        require: {
            // formCtrl: '^form', 
            ngModelCtrl: 'ngModel'
        },
        bindings: {
            ngModel: '=',
            onActivate: '&' //function to invoke on KG item activation (click)
        },
        controller: KGEditor,
        template: "\n            <div class=\"c-kg-editor\">\n                <div class=\"c-kg-editor__header l-flex-container flex-justify-between flex-align-center\">\n                    <div class=\"flex-1\">\n                        <h4>Knowledge Graph</h4>\n                        <div class=\"u-text--sm\">\n                            Knowledge graphs (KGs) are formed from classifiers for several dimensions of GeoPlatform items \n                            (layers, maps, galleries, etc), including <em>Purpose</em>, <em>Scope</em>, \n                            <em>Fitness for Use</em>, and <em>Social Context</em>. \n                            <br>\n                            <br>\n                            Knowledge graphs are used to answer questions about items, such as:\n                            <ul>\n                            <li>Why was the item created?</li>\n                            <li>Why is it useful for others?</li>\n                            <li>Why is it appropriate to be used?</li>\n                            </ul>\n                        </div>\n                    </div>\n                    <gp-progress-circle ng-model=\"$ctrl.completion\" class=\"u-mg-left--xlg u-mg-right--xlg\"></gp-progress-circle>\n                </div>\n\n                <div class=\"c-kg-editor__content\">\n\n                    <div class=\"c-kg-editor__section\">\n                        <h4 class=\"t-fg--accent\">Purpose</h4>\n\n                        <kg-section \n                            service=\"$ctrl.service\"\n                            ng-model=\"$ctrl.ngModel.classifiers.purposes\"\n                            on-change=\"$ctrl.onChange('purposes', values)\"\n                            on-activate=\"$ctrl.onValueClick('purposes', value)\"\n                            type=\"Purpose\"\n                            label=\"Purpose\" \n                            description=\"{{$ctrl.descriptions.purpose}}\">\n                        </kg-section>\n                    </div>\n\n\n                    <div class=\"c-kg-editor__section\">\n                        <h4 class=\"t-fg--accent\">Scope</h4>\n\n                        <kg-section \n                            service=\"$ctrl.service\"\n                            ng-model=\"$ctrl.ngModel.classifiers.primaryTopics\"\n                            on-change=\"$ctrl.onChange('primaryTopics', values)\"\n                            on-activate=\"$ctrl.onValueClick('primaryTopics', value)\"\n                            type=\"Topic\" \n                            label=\"Primary Topics\" \n                            description=\"{{$ctrl.descriptions.primaryTopic}}\">\n                        </kg-section>\n                        <kg-section \n                            service=\"$ctrl.service\"\n                            ng-model=\"$ctrl.ngModel.classifiers.secondaryTopics\"\n                            on-change=\"$ctrl.onChange('secondaryTopics', values)\"\n                            on-activate=\"$ctrl.onValueClick('secondaryTopics', value)\"\n                            type=\"Topic\" \n                            label=\"Secondary Topics\" \n                            description=\"{{$ctrl.descriptions.secondaryTopic}}\">\n                        </kg-section>\n                        <kg-section \n                            service=\"$ctrl.service\"\n                            ng-model=\"$ctrl.ngModel.classifiers.primarySubjects\"\n                            on-change=\"$ctrl.onChange('primarySubjects', values)\"\n                            on-activate=\"$ctrl.onValueClick('primarySubjects', value)\"\n                            type=\"Subject\" \n                            label=\"Primary Subjects\" \n                            description=\"{{$ctrl.descriptions.primarySubject}}\">\n                        </kg-section>\n                        <kg-section \n                            service=\"$ctrl.service\"\n                            ng-model=\"$ctrl.ngModel.classifiers.secondarySubjects\"\n                            on-change=\"$ctrl.onChange('secondarySubjects', values)\"\n                            on-activate=\"$ctrl.onValueClick('secondarySubjects', value)\"\n                            type=\"Subject\" \n                            label=\"Secondary Subjects\" \n                            description=\"{{$ctrl.descriptions.secondarySubject}}\">\n                        </kg-section>\n                        <kg-section \n                            service=\"$ctrl.service\"\n                            ng-model=\"$ctrl.ngModel.classifiers.categories\"\n                            on-change=\"$ctrl.onChange('categories', values)\"\n                            on-activate=\"$ctrl.onValueClick('categories', value)\"\n                            type=\"Category\" \n                            label=\"Categories\" \n                            description=\"{{$ctrl.descriptions.category}}\">\n                        </kg-section>\n                        <kg-section \n                            service=\"$ctrl.service\"\n                            ng-model=\"$ctrl.ngModel.classifiers.communities\"\n                            on-change=\"$ctrl.onChange('communities', values)\"\n                            on-activate=\"$ctrl.onValueClick('communities', value)\"\n                            type=\"Community\" \n                            label=\"Communities\" \n                            description=\"{{$ctrl.descriptions.community}}\">\n                        </kg-section>\n                        <kg-section \n                            service=\"$ctrl.service\"\n                            ng-model=\"$ctrl.ngModel.classifiers.places\"\n                            on-change=\"$ctrl.onChange('places', values)\"\n                            on-activate=\"$ctrl.onValueClick('places', value)\"\n                            type=\"Place\" \n                            label=\"Places\" \n                            description=\"{{$ctrl.descriptions.place}}\">\n                        </kg-section> \n                    </div> \n\n                    <div class=\"c-kg-editor__section\">\n                        <h4 class=\"t-fg--accent\">Fitness for Use</h4>\n\n                        <kg-section \n                            service=\"$ctrl.service\"\n                            ng-model=\"$ctrl.ngModel.classifiers.functions\"\n                            on-change=\"$ctrl.onChange('functions', values)\"\n                            on-activate=\"$ctrl.onValueClick('functions', value)\"\n                            type=\"Function\" \n                            label=\"Function\" \n                            description=\"{{$ctrl.descriptions.function}}\">\n                        </kg-section>\n                    </div>\n\n                    <div class=\"c-kg-editor__section\">\n                        <h4 class=\"t-fg--accent\">Social Context</h4>\n\n                        <kg-section \n                            service=\"$ctrl.service\"\n                            ng-model=\"$ctrl.ngModel.classifiers.audiences\"\n                            on-change=\"$ctrl.onChange('audiences', values)\"\n                            on-activate=\"$ctrl.onValueClick('audiences', value)\"\n                            type=\"Audience\" \n                            label=\"Audiences\" \n                            description=\"{{$ctrl.descriptions.audience}}\">\n                        </kg-section>\n                    </div>\n\n                </div>\n            </div>\n        "
    });
})(angular, GeoPlatform);

(function (angular, Constants) {
    'use strict';

    var SectionController = /** @class */function () {
        SectionController.$inject = ["$timeout", "RecommenderService"];
        function SectionController($timeout, RecommenderService) {
            'ngInject';

            this.$timeout = $timeout;
            // this.service = RecommenderService;
        }
        SectionController.prototype.$onInit = function () {
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
            //default section description if one was not provided
            if (!this.description) this.description = '<em>No description provided</em>';
        };
        /**
         * Update cache when bound 'ngModel' is actually assigned in the component lifecycle
         */
        SectionController.prototype.$onChanges = function () {
            this.updateCache();
        };
        SectionController.prototype.$onDestroy = function () {
            this.eventHandlers = null;
            this.clearOptions();
            this.selected = null;
            this.service = null;
            this.$timeout = null;
        };
        /**
         *
         * @param {object} item - selected value being activated (clicked on for navigation)
         */
        SectionController.prototype.activate = function (item) {
            if (this.onActivate) this.onActivate({ value: item });
        };
        SectionController.prototype.on = function (event, callback) {
            this.eventHandlers = this.eventHandlers || {};
            this.eventHandlers[event] = this.eventHandlers[event] || [];
            this.eventHandlers[event].push(callback);
        };
        SectionController.prototype.notify = function (event, data) {
            if (!this.eventHandlers || !this.eventHandlers[event]) return;
            angular.forEach(this.eventHandlers[event], function (handler) {
                try {
                    handler(data);
                } catch (e) {}
            });
        };
        /**
         * @param {string} query - keywords provided by user input
         * @return {Promise} resolving an array of results
         */
        SectionController.prototype.fetchOptions = function (query) {
            var _this = this;
            //need this timeout or else 'this.query' isn't being 
            // seen as having the same value as 'query'
            this.$timeout(function () {
                _this.query = query;
            }, 10);
            this.displayOptions.fetching = true;
            var params = {
                type: this.type,
                q: query,
                page: Math.floor(this.paging.start / this.paging.size),
                size: this.paging.size
            };
            // if(this.forType)
            //     params['for'] = this.forType;
            return this.service.query(params).$promise.then(function (response) {
                _this.paging.total = response.totalResults;
                _this.notify('gp:browse:suggestions:pagination', _this.paging);
                _this.suggested = response.results.map(function (result) {
                    result._selected = _this.isSelected(result);
                    return result;
                });
                _this.displayOptions.showSuggested = true;
                return _this.suggested;
            }).catch(function (e) {
                _this.paging.total = 0;
                _this.notify('gp:browse:suggestions:pagination', _this.paging);
                _this.suggested = [];
                return _this.suggested;
            }).finally(function () {
                return _this.displayOptions.fetching = false;
            });
        };
        SectionController.prototype.clearQuery = function () {
            this.query = '';
            this.fetchOptions(this.query);
        };
        SectionController.prototype.clearOptions = function () {
            //clear query and available options
            this.query = '';
            this.suggested = null;
            //reset paging
            this.paging.start = 0;
            this.paging.total = 0;
            // this.notify('gp:browse:suggestions:pagination', this.paging);
            //hide available options
            this.displayOptions.showSuggested = false;
        };
        /**
         * @param {integer} index - position in selected array of item removed
         */
        SectionController.prototype.remove = function (index) {
            var removed = this.ngModel[index].uri;
            this.ngModel.splice(index, 1);
            //remove from suggested list if one is populated (being shown)
            if (this.suggested && this.suggested.length) {
                var found = this.suggested.find(function (it) {
                    return it.uri === removed;
                });
                if (found) found._selected = false;
            }
            this.updateCache(); //update cache of selected ids
            if (this.onChange) this.onChange({ values: this.ngModel }); //notify others of change
        };
        /**
         * @param {object} value - item being checked for selection
         * @return {boolean}
         */
        SectionController.prototype.isSelected = function (value) {
            return value._selected || ~this.selected.indexOf(value.uri);
        };
        /**
         * @param {object} value - item being selected
         */
        SectionController.prototype.selectValue = function (value) {
            if (value._selected) return; //already selected
            value._selected = true;
            this.ngModel = this.ngModel || [];
            this.ngModel.push(value);
            this.updateCache();
            if (this.onChange) this.onChange({ values: this.ngModel });
        };
        SectionController.prototype.updateCache = function () {
            this.selected = (this.ngModel || []).map(function (o) {
                return o.uri;
            });
        };
        SectionController.prototype.onDropdownToggled = function (open) {
            if (!open) this.clearOptions();
        };
        /* -------- pagination methods ----------- */
        SectionController.prototype.getPagination = function () {
            return this.paging;
        };
        SectionController.prototype.start = function (index) {
            this.paging.start = index;
            this.fetchOptions(this.query);
        };
        SectionController.prototype.size = function (value) {
            this.paging.size = value;
            this.fetchOptions(this.query);
        };
        return SectionController;
    }();
    angular.module('gp-common-kg').component('kgSection', {
        bindings: {
            ngModel: '<',
            service: '<',
            label: '@',
            description: '@',
            type: '@',
            onChange: '&?',
            onActivate: '&?' //fire when selected value link is clicked
        },
        controller: SectionController,
        template: "\n            <h5>{{$ctrl.label}}</h5>\n            <p class=\"u-text--sm\" ng-bind-html=\"$ctrl.description\"></p>\n\n            <div class=\"list-group list-group-sm\">\n                <div ng-repeat=\"item in $ctrl.ngModel track by $index\" class=\"list-group-item\">\n                    <button type=\"button\" class=\"btn btn-link\" ng-click=\"$ctrl.remove($index)\">\n                        <span class=\"glyphicon glyphicon-remove-circle t-fg--danger\"></span> \n                    </button>\n                    <div class=\"flex-1 u-pd--md\">\n                        <div class=\"u-pd-bottom--sm t-text--strong\">\n                            <a ng-click=\"$ctrl.activate(item)\" ng-if=\"$ctrl.onActivate\"\n                                 class=\"u-break--all\">{{item.label}}</a>\n                            <span ng-if=\"!$ctrl.onActivate\">{{item.label}}</span>\n                        </div>\n                        <div class=\"u-text--sm t-text--italic\">\n                            <a href=\"{{item.uri}}\" target=\"_blank\" class=\"u-break--all\"\n                                title=\"Open source info in new window\">{{item.uri}}</a>\n                        </div>\n                        <div class=\"description\" ng-if=\"item.description\" ng-bind-html=\"item.description\"></div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"t-fg--gray-md\" ng-if=\"!$ctrl.ngModel.length\"><em>No values specified</em></div>            \n\n            <hr>\n\n            <div uib-dropdown is-open=\"$ctrl.displayOptions.showSuggested\" \n                auto-close=\"outsideClick\" on-toggle=\"$ctrl.onDropdownToggled(open)\">\n\n                <div class=\"l-flex-container flex-justify-between flex-align-center\">\n                    <div class=\"input-group-slick flex-1\">\n                        <span class=\"glyphicon\"\n                            ng-class=\"{'glyphicon-search':!$ctrl.displayOptions.fetching, 'glyphicon-hourglass spin':$ctrl.displayOptions.fetching}\"></span>\n                        <input type=\"text\" class=\"form-control\" \n                            ng-model=\"$ctrl.query\" \n                            ng-model-options=\"{ debounce: 250 }\"\n                            ng-change=\"$ctrl.fetchOptions($ctrl.query)\"\n                            placeholder=\"Find values to add...\">\n                    </div>\n                </div>\n                \n                <div class=\"dropdown-menu\" uib-dropdown-menu>\n                    \n                    <div class=\"form-group l-flex-container flex-justify-between flex-align-center\">\n                        <div class=\"input-group-slick flex-1\">\n                            <span class=\"glyphicon\"\n                                ng-class=\"{'glyphicon-search':!$ctrl.displayOptions.fetching, 'glyphicon-hourglass spin':$ctrl.displayOptions.fetching}\"></span>\n                            <input type=\"text\" class=\"form-control\" \n                                ng-model=\"$ctrl.query\" \n                                ng-model-options=\"{ debounce: 250 }\"\n                                ng-change=\"$ctrl.fetchOptions($ctrl.query)\"\n                                placeholder=\"Find values to add...\">\n                            <span class=\"glyphicon glyphicon-remove\"\n                                ng-if=\"$ctrl.query.length\"\n                                ng-click=\"$event.stopPropagation();$ctrl.clearQuery()\"></span>\n                        </div>\n                        <button type=\"button\" class=\"btn btn-info u-mg-left--xlg animated-show\"\n                            ng-click=\"$ctrl.clearOptions();\">\n                            Done\n                        </button>\n                    </div>\n                    \n                    <gp-pagination service=\"$ctrl\" event-key=\"suggestions\" use-select=\"true\"></gp-pagination>\n\n                    <div class=\"list-group list-group-sm u-text--sm\">\n                        <div ng-repeat=\"item in $ctrl.suggested track by $index\" class=\"list-group-item\">\n                            <button type=\"button\" class=\"btn btn-link\" ng-click=\"$ctrl.selectValue(item)\"\n                                ng-class=\"{disabled:item._selected}\">\n                                <span class=\"glyphicon glyphicon-ok t-fg--gray-md\" ng-show=\"item._selected\"></span> \n                                <span class=\"glyphicon glyphicon-plus-sign t-fg--success\" ng-show=\"!item._selected\"></span> \n                            </button>\n                            <div class=\"flex-1 u-pd--md\">\n                                <div class=\"u-break--all t-text--strong u-pd-bottom--sm\">{{item.prefLabel}}</div>\n                                <a href=\"{{item.uri}}\" target=\"_blank\" \n                                    class=\"u-break--all u-text--sm t-text--italic\"\n                                    title=\"Open source info in new window\">\n                                    {{item.uri}}\n                                </a>\n                                <div class=\"description\">{{item.description||\"No description provided\"}}</div>\n                            </div>\n                        </div>\n                        <div ng-if=\"!$ctrl.suggested.length\" class=\"list-group-item disabled u-pd--md\">\n                            No results match your query\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "
    });
})(angular, GeoPlatform);

(function (angular, Constants) {
    'use strict';

    var FACET_NAME = 'usedBy.id';
    angular.module('gp-common').component('communityFilter', {
        bindings: {
            name: '@',
            service: "<"
        },
        controller: ["$http", function controller($http) {
            this.$onInit = function () {
                this.collapse = true;
                this.updateValues();
            };
            this.$onDestroy = function () {
                this.values = null;
            };
            this.hasSelections = function () {
                return (this.service.getUsedBy() || []).length;
            };
            this.isSelected = function (value) {
                var selected = this.service.getUsedBy() || [];
                return ~selected.indexOf(value.id);
            };
            this.toggle = function (value) {
                var selected = this.service.getUsedBy() || [];
                var idx = selected.indexOf(value.id);
                if (idx >= 0) selected.splice(idx, 1);else selected.push(value.id);
                this.service.setUsedBy(selected);
            };
            this.clear = function () {
                var selected = this.service.getUsedBy() || [];
                if (!selected || !selected.length) this.collapse = !this.collapse; //toggle collapsed state
                else this.service.setUsedBy([]);
            };
            this.getCount = function (value) {
                var facet = this.service.getFacet(FACET_NAME);
                if (!facet) return '';
                var valObj = facet.buckets.find(function (v) {
                    return v.label === value.id;
                });
                if (!valObj) return '';
                return valObj.count;
            };
            this.updateValues = function (query) {
                var _this = this;
                return $http.get(Constants.ualUrl + '/api/communities', {
                    params: {
                        sort: 'label,asc',
                        q: query,
                        size: 20,
                        bust: new Date().getTime()
                    }
                }).then(function (response) {
                    var total = response.data.totalResults;
                    var newValues = response.data.results.slice(0);
                    _this.additionalValueCount = total - newValues.length;
                    var selections = _this.service.getUsedBy();
                    if (selections && selections.length && _this.values && _this.values.length) {
                        var existing = _this.values.filter(function (v) {
                            //find existing values that are selected
                            return ~selections.indexOf(v.id) &&
                            // but not in new set of values
                            !newValues.filter(function (nv) {
                                return nv.id === v.id;
                            }).length;
                        });
                        newValues = existing.concat(newValues);
                    }
                    _this.values = newValues;
                }).catch(function (response) {
                    console.log("(" + response.status + ") " + response.statusText);
                });
            };
        }],
        template: "\n            <div class=\"card c-query-filter\">\n                <h5 class=\"card-title\">\n                    <button type=\"button\" class=\"btn btn-sm btn-link\"\n                        title=\"{{$ctrl.collapse?'Expand':'Collapse'}}\"\n                        ng-click=\"$ctrl.collapse = !$ctrl.collapse\">\n                        <span class=\"glyphicon\" ng-class=\"{'glyphicon-minus':!$ctrl.collapse,'glyphicon-plus':$ctrl.collapse}\"></span>\n                    </button>\n                    <span class=\"flex-1\">Filter by Communities</span>\n                </h5>\n                <div class=\"card-content\">\n                    <div class=\"c-facets\" ng-class=\"{'is-collapsed':$ctrl.collapse}\">\n\n                        <div class=\"c-facet__value\">\n                            <div class=\"input-group-slick\">\n                                <input name=\"scheme-typeahead\" type=\"text\" class=\"form-control\"\n                                    ng-model=\"$ctrl.typeaheadValue\"\n                                    ng-change=\"$ctrl.updateValues($ctrl.typeaheadValue)\"\n                                    ng-model-options=\"{debounce:200}\"\n                                    placeholder=\"Search by name\">\n                                <span class=\"glyphicon glyphicon-remove\"\n                                    title=\"Clear query\"\n                                    ng-if=\"$ctrl.typeaheadValue.length\"\n                                    ng-click=\"$ctrl.updateValues($ctrl.typeaheadValue=null)\">\n                                </span>\n                            </div>\n                        </div>\n\n                        <a class=\"c-facet__value\" ng-click=\"$ctrl.clear()\"\n                            ng-class=\"{active:!$ctrl.hasSelections()}\">\n                            <span class=\"glyphicon\"\n                                ng-class=\"{'glyphicon-check':!$ctrl.hasSelections(), 'glyphicon-unchecked t-fg--gray-lt':$ctrl.hasSelections()}\">\n                            </span>\n                            Any Community\n                        </a>\n                        <a  ng-repeat=\"value in $ctrl.values track by $index\"\n                            class=\"c-facet__value\"\n                            ng-click=\"$ctrl.toggle(value)\"\n                            ng-class=\"{active:$ctrl.isSelected(value)}\">\n\n                            <span class=\"badge pull-right\">{{$ctrl.getCount(value)}}</span>\n                            <span class=\"glyphicon\"\n                                ng-class=\"{'glyphicon-check':$ctrl.isSelected(value),'glyphicon-unchecked t-fg--gray-lt':!$ctrl.isSelected(value)}\"></span>\n                            {{value.label}}\n                        </a>\n                        <div class=\"c-facet__value t-fg--gray-md\"\n                            ng-if=\"$ctrl.additionalValueCount\">\n                            <em>plus {{$ctrl.additionalValueCount}} more options</em>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "
    });
})(angular, GeoPlatform);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
(function (angular) {
    'use strict';

    var CreatedBy = /** @class */function (_super) {
        __extends(CreatedBy, _super);
        CreatedBy.$inject = ["$rootScope", "AuthenticationService"];
        function CreatedBy($rootScope, AuthenticationService) {
            return _super.call(this, $rootScope, AuthenticationService) || this;
        }
        CreatedBy.prototype.$onInit = function () {
            _super.prototype.$onInit.call(this);
            this.value = null; //input from user for "created by" value
            this.collapse = true; //hide show controls
            this.limitToUser = false; //filter using current user
            this.modelOptions = {
                'updateOn': 'default blur',
                'debounce': {
                    'default': 250,
                    'blur': 0
                }
            };
        };
        CreatedBy.prototype.$onDestroy = function () {
            _super.prototype.$onDestroy.call(this);
            this.value = null;
            this.collapse = null;
            this.limitToUser = null;
            this.username = null;
        };
        CreatedBy.prototype.onAuthEvent = function (event, user) {
            _super.prototype.onAuthEvent.call(this, event, user);
            //if user logged out but was still constrained to their items,
            // refresh without that filter
            if (!user && this.limitToUser) {
                this.limitToUser = null;
                this.filter();
            }
        };
        CreatedBy.prototype.filter = function () {
            var value = this.limitToUser ? this.authState.user.username : this.value;
            if (typeof value !== 'undefined' && value !== null && value.trim().length === 0) value = null; //don't accept empty strings
            this.service.setCreatedBy(value, true);
        };
        CreatedBy.prototype.toggleLimitToUser = function () {
            this.limitToUser = !this.limitToUser;
            this.filter();
        };
        CreatedBy.prototype.clear = function () {
            this.value = null;
            this.filter();
        };
        return CreatedBy;
    }(GeoPlatform.AuthenticatedComponent);
    angular.module('gp-common').component('createdByFilter', {
        bindings: {
            service: '<' //service filtering by
        },
        controller: CreatedBy,
        template: "\n            <div class=\"card c-query-filter\">\n                <h5 class=\"card-title\">\n                    <button type=\"button\" class=\"btn btn-sm btn-link\"\n                        title=\"{{$ctrl.collapse?'Expand':'Collapse'}}\"\n                        ng-click=\"$ctrl.collapse = !$ctrl.collapse\">\n                        <span class=\"glyphicon\" ng-class=\"{'glyphicon-minus':!$ctrl.collapse,'glyphicon-plus':$ctrl.collapse}\"></span>\n                    </button>\n                    <span class=\"flex-1\">Filter by Author</span>\n                </h5>\n                <div class=\"card-content\">\n\n                    <div class=\"c-facets\" ng-hide=\"$ctrl.collapse\">\n\n                        <div class=\"input-group-slick\">\n                            <span class=\"glyphicon glyphicon-user\"></span>\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Specify author username\"\n                                ng-disabled=\"$ctrl.limitToUser\"\n                                ng-model=\"$ctrl.value\"\n                                ng-model-options=\"$ctrl.modelOptions\"\n                                ng-change=\"$ctrl.filter()\">\n                            <span class=\"glyphicon glyphicon-remove\" title=\"Clear author\"\n                                ng-if=\"$ctrl.value.length&&!$ctrl.limitToUser\" ng-click=\"$ctrl.clear()\"></span>\n                        </div>\n\n                        <label class=\"control-label u-text--sm text-muted u-pd-top--sm\" ng-if=\"$ctrl.isAuthenticated()\">\n                            <input type=\"checkbox\" ng-model=\"$ctrl.limitToUser\" ng-change=\"$ctrl.filter()\">\n                            Only show my items\n                        </label>\n\n                    </div>\n                </div>\n            </div>\n        "
    });
})(angular);

(function (angular, Constants) {
    'use strict';

    var PUBLISHER_FACET = 'publishers';
    angular.module('gp-common').component('publisherFilter', {
        bindings: {
            name: '@',
            service: "<"
        },
        controller: ["$http", function controller($http) {
            this.$onInit = function () {
                this.collapse = true;
                this.updateValues();
            };
            this.$onDestroy = function () {
                this.values = null;
            };
            this.hasSelections = function () {
                return (this.service.getAgencies() || []).length;
            };
            this.isSelected = function (value) {
                var selected = this.service.getAgencies() || [];
                return ~selected.indexOf(value.id);
            };
            this.toggle = function (value) {
                var selected = this.service.getAgencies() || [];
                var idx = selected.indexOf(value.id);
                if (idx >= 0) selected.splice(idx, 1);else selected.push(value.id);
                this.service.setAgencies(selected);
            };
            this.clear = function () {
                var selected = this.service.getAgencies() || [];
                if (!selected || !selected.length) this.collapse = !this.collapse; //toggle collapsed state
                else this.service.setAgencies([]);
            };
            this.getCount = function (value) {
                var facet = this.service.getFacet(PUBLISHER_FACET);
                if (!facet) return '';
                var valObj = facet.buckets.find(function (v) {
                    return v.label === value.id;
                });
                if (!valObj) return '';
                return valObj.count;
            };
            this.updateValues = function (query) {
                var _this = this;
                return $http.get(Constants.ualUrl + '/api/items', {
                    params: {
                        type: 'org:Organization',
                        sort: 'label,asc',
                        q: query,
                        size: 20,
                        bust: new Date().getTime()
                    }
                }).then(function (response) {
                    var total = response.data.totalResults;
                    var newValues = response.data.results.slice(0);
                    _this.additionalValueCount = total - newValues.length;
                    var selections = _this.service.getAgencies();
                    if (selections && selections.length && _this.values && _this.values.length) {
                        var existing = _this.values.filter(function (v) {
                            //find existing values that are selected
                            return ~selections.indexOf(v.id) &&
                            // but not in new set of values
                            !newValues.filter(function (nv) {
                                return nv.id === v.id;
                            }).length;
                        });
                        newValues = existing.concat(newValues);
                    }
                    _this.values = newValues;
                }, function (response) {
                    console.log("(" + response.status + ") " + response.statusText);
                });
            };
        }],
        template: "\n            <div class=\"card c-query-filter\">\n                <h5 class=\"card-title\">\n                    <button type=\"button\" class=\"btn btn-sm btn-link\"\n                        title=\"{{$ctrl.collapse?'Expand':'Collapse'}}\"\n                        ng-click=\"$ctrl.collapse = !$ctrl.collapse\">\n                        <span class=\"glyphicon\" ng-class=\"{'glyphicon-minus':!$ctrl.collapse,'glyphicon-plus':$ctrl.collapse}\"></span>\n                    </button>\n                    <span class=\"flex-1\">Filter by Publishers</span>\n                </h5>\n                <div class=\"card-content\">\n                    <div class=\"c-facets\" ng-class=\"{'is-collapsed':$ctrl.collapse}\">\n\n                        <div class=\"c-facet__value\">\n                            <div class=\"input-group-slick\">\n                                <input name=\"scheme-typeahead\" type=\"text\" class=\"form-control\"\n                                    ng-model=\"$ctrl.typeaheadValue\"\n                                    ng-change=\"$ctrl.updateValues($ctrl.typeaheadValue)\"\n                                    ng-model-options=\"{debounce:200}\"\n                                    placeholder=\"Search by name\">\n                                <span class=\"glyphicon glyphicon-remove\"\n                                    title=\"Clear query\"\n                                    ng-if=\"$ctrl.typeaheadValue.length\"\n                                    ng-click=\"$ctrl.updateValues($ctrl.typeaheadValue=null)\">\n                                </span>\n                            </div>\n                        </div>\n\n                        <a class=\"c-facet__value\" ng-click=\"$ctrl.clear()\"\n                            ng-class=\"{active:!$ctrl.hasSelections()}\">\n                            <span class=\"glyphicon\"\n                                ng-class=\"{'glyphicon-check':!$ctrl.hasSelections(), 'glyphicon-unchecked t-fg--gray-lt':$ctrl.hasSelections()}\">\n                            </span>\n                            Any Publisher\n                        </a>\n                        <a  ng-repeat=\"value in $ctrl.values track by $index\"\n                            class=\"c-facet__value\"\n                            ng-click=\"$ctrl.toggle(value)\"\n                            ng-class=\"{active:$ctrl.isSelected(value)}\">\n\n                            <span class=\"badge pull-right\">{{$ctrl.getCount(value)}}</span>\n                            <span class=\"glyphicon\"\n                                ng-class=\"{'glyphicon-check':$ctrl.isSelected(value),'glyphicon-unchecked t-fg--gray-lt':!$ctrl.isSelected(value)}\"></span>\n                            {{value.label}}\n                        </a>\n                        <div class=\"c-facet__value t-fg--gray-md\"\n                            ng-if=\"$ctrl.additionalValueCount\">\n                            <em>plus {{$ctrl.additionalValueCount}} more options</em>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "
    });
})(angular, GeoPlatform);

(function (angular) {
    'use strict';

    var PARAMETER = "concepts";
    var RecommendedTermFilter = /** @class */function () {
        RecommendedTermFilter.$inject = ["$timeout", "RecommenderService"];
        function RecommendedTermFilter($timeout, RecommenderService) {
            'ngInject';

            this.termService = RecommenderService;
            this.$timeout = $timeout;
        }
        RecommendedTermFilter.prototype.$onInit = function () {
            this.displayOpts = {
                fetching: false,
                empty: false,
                collapse: false,
                suggest: false
            };
            this.values = [];
            this.suggested = [];
            this.termQuery = null;
            this.paging = {
                start: 0,
                size: 5,
                sizeOptions: [5, 10, 20]
            };
        };
        RecommendedTermFilter.prototype.$onDestroy = function () {
            this.$timeout = null;
            this.displayOpts = null;
            this.values = null;
            this.suggested = null;
            this.service = null;
            this.termService = null;
            this.termQuery = null;
            this.paging = null;
            this.eventHandlers = null;
        };
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
        RecommendedTermFilter.prototype.hideSuggested = function () {
            this.displayOpts.suggest = this.displayOpts.fetching = this.displayOpts.empty = false;
            this.termQuery = null;
            this.suggested = [];
            this.paging.start = this.paging.total = 0;
        };
        RecommendedTermFilter.prototype.select = function (item) {
            item._selected = true; //update status to show it's already _selected
            this.values.push(item); //append selection to list
            this.update(); //update overall browse query with new selection
        };
        RecommendedTermFilter.prototype.getOptions = function () {
            var _this = this;
            var text = this.termQuery;
            // console.log("Querying using '" + text + "'");
            //if empty value was provided, don't search.
            if (!text || !text.length) {
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
            var params = {
                q: text,
                page: Math.floor(this.paging.start / this.paging.size),
                size: this.paging.size
            };
            if (this.type) params['for'] = this.type;
            this.termService.query(params).$promise.then(function (response) {
                var results = response.results;
                _this.displayOpts.empty = !results.length;
                _this.suggested = results.map(function (result) {
                    result._selected = _this.isSelected(result);
                    return result;
                });
                _this.paging.total = response.totalResults;
                _this.notify('gp:browse:suggestions:pagination', _this.paging);
            }).catch(function (e) {
                _this.displayOpts.empty = true;
                _this.suggested = [];
                _this.paging.total = 0;
                _this.notify('gp:browse:suggestions:pagination', _this.paging);
                console.log("Error finding semantic terms: " + e.message);
            }).finally(function () {
                _this.displayOpts.fetching = false;
                // this.displayOpts.suggest = true;
            });
        };
        RecommendedTermFilter.prototype.hasSelections = function () {
            return this.values.length;
        };
        RecommendedTermFilter.prototype.isSelected = function (item) {
            return this.values.filter(function (v) {
                return v.uri === item.uri;
            }).length;
        };
        RecommendedTermFilter.prototype.removeValue = function (index) {
            if (this.values.length >= index) {
                var removed_1 = this.values.splice(index, 1)[0]; //remove from selected
                this.update(); //update overall browse query
                //update associated item in suggested list (if visible)
                if (this.suggested.length) {
                    var match = this.suggested.find(function (i) {
                        return i.uri === removed_1.uri;
                    });
                    if (match) match._selected = false;
                }
            }
        };
        RecommendedTermFilter.prototype.clear = function () {
            this.values = [];
            this.update();
        };
        RecommendedTermFilter.prototype.update = function () {
            var value = this.values.length ? this.values.map(function (v) {
                return v.uri;
            }) : null;
            this.service.applyOption(PARAMETER, value, true);
        };
        /* -------- pagination methods ----------- */
        RecommendedTermFilter.prototype.on = function (event, callback) {
            this.eventHandlers = this.eventHandlers || {};
            this.eventHandlers[event] = this.eventHandlers[event] || [];
            this.eventHandlers[event].push(callback);
        };
        RecommendedTermFilter.prototype.notify = function (event, data) {
            var _this = this;
            if (!this.$timeout || !this.eventHandlers || !this.eventHandlers[event]) return;
            this.$timeout(function () {
                angular.forEach(_this.eventHandlers[event], function (handler) {
                    try {
                        handler(data);
                    } catch (e) {}
                });
            }, 100);
        };
        RecommendedTermFilter.prototype.getPagination = function () {
            return this.paging;
        };
        RecommendedTermFilter.prototype.start = function (index) {
            this.paging.start = index;
            this.getOptions();
        };
        RecommendedTermFilter.prototype.size = function (value) {
            this.paging.size = value;
            this.getOptions();
        };
        return RecommendedTermFilter;
    }();
    angular.module('gp-common').component('recommendedTermFilter', {
        bindings: {
            //type of object being searched (ie, Layer, Map)
            type: '@',
            //BrowseObjectService the filter will affect
            service: "<"
        },
        controller: RecommendedTermFilter,
        template: "\n            <div class=\"card c-query-filter c-filter__recommended-terms\">\n\n                <h5 class=\"card-title\">\n                    <button type=\"button\" class=\"btn btn-sm btn-link\"\n                        title=\"{{$ctrl.displayOpts.collapse?'Expand':'Collapse'}}\"\n                        ng-click=\"$ctrl.displayOpts.collapse = !$ctrl.displayOpts.collapse\">\n                        <span class=\"glyphicon\"\n                            ng-class=\"{'glyphicon-minus':!$ctrl.displayOpts.collapse,'glyphicon-plus':$ctrl.displayOpts.collapse}\"></span>\n                    </button>\n                    <span>Filter using Semantic Concepts</span>\n                </h5>\n\n                <div class=\"c-facets\" ng-class=\"{'is-collapsed':$ctrl.displayOpts.collapse}\">\n\n                    <!--\n                    <div class=\"c-facet__value\">\n\n                        <div class=\"input-group-slick\">\n                            <input name=\"termQuery\" type=\"text\" class=\"form-control\"\n                              ng-model=\"$ctrl.termQuery\"\n                              typeahead-on-select=\"$ctrl.onSelection($item, $model, $label, $event)\"\n                              uib-typeahead=\"opt as ' (' + opt.context + ') ' + opt.label for opt in $ctrl.getOptions($viewValue)\"\n                              typeahead-loading=\"$ctrl.displayOpts.fetching\"\n                              typeahead-no-results=\"$ctrl.displayOpts.empty\"\n                              ng-model-options=\"{ debounce: 250 }\"\n                              typeahead-min-length=\"2\"\n                              typeahead-editable=\"false\"\n                              placeholder=\"Find a concept\">\n                            <span class=\"glyphicon glyphicon-hourglass spin\" ng-if=\"$ctrl.displayOpts.fetching\"></span>\n                        </div>\n\n                        <div ng-show=\"$ctrl.displayOpts.empty\">No Results Found</div>\n\n                    </div>\n                    -->\n\n                    <div ng-hide=\"$ctrl.displayOpts.collapse\">\n\n                        <div class=\"input-group-slick\">\n                            <span class=\"glyphicon\"\n                                ng-class=\"{'glyphicon-search':!$ctrl.displayOpts.fetching, 'glyphicon-hourglass spin':$ctrl.displayOpts.fetching}\"></span>\n                            <input type=\"text\" class=\"form-control\"\n                                ng-model=\"$ctrl.termQuery\"\n                                ng-model-options=\"{ debounce: 250 }\"\n                                ng-change=\"$ctrl.getOptions()\"\n                                placeholder=\"Find concepts\">\n                            <span class=\"glyphicon glyphicon-remove\" ng-if=\"$ctrl.displayOpts.suggest\"\n                                ng-click=\"$ctrl.hideSuggested()\"></span>\n                        </div>\n\n                        <gp-pagination service=\"$ctrl\" event-key=\"suggestions\" use-select=\"true\"\n                            ng-if=\"$ctrl.displayOpts.suggest\">\n                        </gp-pagination>\n\n                        <div class=\"list-group list-group-sm u-text--sm\"\n                            ng-if=\"$ctrl.displayOpts.suggest && !$ctrl.displayOpts.fetching\">\n\n                            <a ng-repeat=\"item in $ctrl.suggested track by $index\"\n                                class=\"list-group-item\"\n                                ng-class=\"{disabled:item._selected}\"\n                                ng-click=\"$ctrl.select(item)\">\n                                <span class=\"u-break--all t-text--strong u-pd-bottom--sm\">{{item.prefLabel}}</span>\n                                <br>\n                                <span class=\"u-break--all u-text--sm t-text--italic\">{{item.uri}}</span>\n                            </a>\n\n                            <div ng-if=\"$ctrl.displayOpts.empty\" class=\"list-group-item disabled u-pd--md\">\n                                No concepts found\n                            </div>\n\n                        </div>\n\n                    </div>\n\n\n                    <!-- selected terms -->\n                    <div ng-repeat=\"term in $ctrl.values\" class=\"c-facet__value active\"\n                        title=\"Remove this term from the query\"\n                        ng-click=\"$ctrl.removeValue($index)\">\n\n                        <div class=\"u-break--all t-text--strong u-pd-bottom--sm\">\n                            <span class=\"glyphicon glyphicon-check\"></span>\n                            {{term.prefLabel}}\n                        </div>\n                        <div class=\"u-break--all u-text--sm t-text--italic\">{{term.uri}}</div>\n                    </div>\n\n                </div>\n\n            </div>\n        "
    });
})(angular);

(function (angular) {
    'use strict';

    angular.module('gp-common').component('similarityFilter', {
        bindings: {
            //type of object being searched (ie, Layer, Map)
            type: '@',
            //BrowseObjectService the filter will affect
            service: "<",
            //optional, id of current map (if one exists)
            mapId: '@'
        },
        controller: function controller() {
            this.$onInit = function () {
                var _this = this;
                this.collapse = true;
                this.value = null;
                this.useMap = false;
                var evtName = this.service.events.SIMILARITY;
                this.listener = this.service.on(evtName, function (event, layer) {
                    _this.value = layer;
                    _this.service.applyOption('similarTo', _this.value.id, true);
                });
                if (!this.type) this.type = "item";
            };
            this.$onDestroy = function () {
                this.listener(); //dispose of listener
                this.collapse = null;
                this.value = null;
                this.service = null;
                this.mapId = null;
            };
            this.hasSelections = function () {
                return !!this.value;
            };
            this.clearValue = function () {
                if (this.useMap) {
                    this.useMap = false;
                    this.service.applyOption('similarTo', this.value.id, true);
                } else {
                    this.value = null;
                    this.service.applyOption('similarTo', null, true);
                }
            };
            this.toggleCurrentMap = function (bool) {
                if (this.useMap) {
                    this.useMap = false;
                    if (this.value) {
                        this.service.applyOption('similarTo', this.value.id, true);
                    } else {
                        this.service.applyOption('similarTo', false, true);
                    }
                } else {
                    this.useMap = true;
                    this.service.applyOption('similarTo', this.mapId, true);
                }
            };
        },
        template: "\n            <div class=\"card c-query-filter\" ng-if=\"$ctrl.value\">\n\n                <h5 class=\"card-title\">Find Similar</h5>\n                <div class=\"card-content\">\n\n                    <p class=\"u-text--sm\">Searching for {{$ctrl.type}}s similar to the following: </p>\n\n                    <div class=\"c-facets\">\n\n                        <a class=\"c-facet__value\" ng-if=\"$ctrl.value\" ng-click=\"$ctrl.clearValue()\">\n                            <span class=\"glyphicon glyphicon-remove-circle\"></span>\n                            {{$ctrl.value.label}}\n                        </a>\n\n                        <!--\n                        <a ng-if=\"$ctrl.mapId\" class=\"c-facet__value\"\n                            ng-click=\"$ctrl.toggleCurrentMap()\" ng-class=\"{active:$ctrl.useMap}\">\n                            <span class=\"glyphicon glyphicon-check\" ng-show=\"$ctrl.useMap\"></span>\n                            <span class=\"glyphicon glyphicon-unchecked\" ng-show=\"!$ctrl.useMap\"></span>\n                            Find similar to my current map\n                        </a>\n                        -->\n\n                    </div>\n\n                    <br>\n                    <p class=\"u-text--sm\">Note that query filters below are still being applied.</p>\n\n                </div>\n            </div>\n        "
    });
})(angular);

(function (angular, Constants) {
    'use strict';
    /*
        <themes-filter></themes-filter>
     */

    angular.module('gp-common').component('themeFilter', {
        bindings: {
            name: '@',
            service: '<'
        },
        controller: ["$http", function controller($http) {
            this.$onInit = function () {
                this.collapse = true;
                this.updateValues();
            };
            this.$onDestroy = function () {
                this.values = null;
                this.service = null;
            };
            this.hasSelections = function () {
                return (this.service.getThemes() || []).length;
            };
            this.isSelected = function (value) {
                var themes = this.service.getThemes() || [];
                return ~themes.indexOf(value.id);
            };
            this.toggle = function (value) {
                var themes = this.service.getThemes() || [];
                var idx = themes.indexOf(value.id);
                if (idx >= 0) themes.splice(idx, 1);else themes.push(value.id);
                this.service.setThemes(themes);
            };
            this.clear = function () {
                var themes = this.service.getThemes() || [];
                if (!themes || !themes.length) this.collapse = !this.collapse; //toggle collapsed state
                else this.service.setThemes([]);
            };
            this.getCount = function (value) {
                var facet = this.service.getFacet('themes');
                if (!facet) return '';
                var valObj = facet.buckets.find(function (v) {
                    return v.label === value.id;
                });
                if (!valObj) return '';
                return valObj.count;
            };
            this.updateValues = function (query) {
                var _this = this;
                return $http.get(Constants.ualUrl + '/api/items', {
                    params: {
                        type: 'skos:Concept',
                        'scheme.label': 'NGDA Portfolio Themes',
                        fields: 'scheme',
                        size: 9999,
                        sort: 'label,asc',
                        bust: new Date().getTime()
                    }
                }).then(function (response) {
                    // let total = response.data.totalResults;
                    _this.values = response.data.results.slice(0);
                }, function (response) {
                    console.log("(" + response.status + ") " + response.statusText);
                }).catch(function (e) {
                    console.log("Error fetching NGDA Themes: " + e.message);
                });
            };
        }],
        template: "\n            <div class=\"card c-query-filter c-browse-filter\">\n                <h5 class=\"card-title\">\n                    <button type=\"button\" class=\"btn btn-sm btn-link\"\n                        title=\"{{$ctrl.collapse?'Expand':'Collapse'}}\"\n                        ng-click=\"$ctrl.collapse = !$ctrl.collapse\">\n                        <span class=\"glyphicon\" ng-class=\"{'glyphicon-minus':!$ctrl.collapse,'glyphicon-plus':$ctrl.collapse}\"></span>\n                    </button>\n                    <span>Filter by NGDA Themes</span>\n                </h5>\n                <div class=\"card-content\">\n                    <div class=\"c-facets\" ng-class=\"{'is-collapsed':$ctrl.collapse}\">\n                        <a class=\"c-facet__value\" ng-click=\"$ctrl.clear()\"\n                            ng-class=\"{active:!$ctrl.hasSelections()}\">\n                            <span class=\"glyphicon\"\n                                ng-class=\"{'glyphicon-check':!$ctrl.hasSelections(), 'glyphicon-unchecked t-fg--gray-lt':$ctrl.hasSelections()}\">\n                            </span>\n                            Any Theme\n                        </a>\n                        <a ng-repeat=\"theme in $ctrl.values track by $index\"\n                            class=\"c-facet__value\" ng-click=\"$ctrl.toggle(theme)\"\n                            ng-class=\"{active:$ctrl.isSelected(theme)}\">\n                                <span class=\"badge pull-right\">{{$ctrl.getCount(theme)}}</span>\n                                <span class=\"glyphicon\"\n                                    ng-class=\"{'glyphicon-check':$ctrl.isSelected(theme),'glyphicon-unchecked t-fg--gray-lt':!$ctrl.isSelected(theme)}\"></span>\n                                {{theme.label}}\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "
    });
})(angular, GeoPlatform);

(function (angular, Constants) {
    "use strict";
    //fields list sent to MDR in order to have these properties for display in search results

    var FIELDS = ['created', 'modified', 'publishers', 'themes', 'description', 'extent'];
    //facets list sent to MDR in order to get aggregation numbers
    var FACETS = ['types', 'themes', 'publishers', 'serviceTypes', 'schemes', 'visibility', 'createdBy'];
    var SORT_OPTIONS = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }, { value: "_score,desc", label: "Relevance" }];
    //list of _options variables for mapping to parameters
    var VAR_TYPES = 'types';
    var VAR_THEMES = 'themes';
    var VAR_PUBLISHERS = 'publishers';
    var VAR_USED_BY = 'usedBy';
    var VAR_USER = 'user';
    var VAR_CREATED_BY = 'createdBy';
    var VAR_SERVICE_TYPES = 'serviceTypes';
    var VAR_SCHEMES = 'schemes';
    var VAR_VISIBILITY = "visibility";
    var VAR_QUERY = 'query';
    var VAR_EXTENT = 'bbox';
    var VAR_MODIFIED_BEFORE = 'modified.max';
    var VAR_MODIFIED_AFTER = 'modified.min';
    var VAR_RESOURCE_TYPES = 'resourceTypes';
    //parameter names for various query constraints used in requests to MDR for results
    var PARAMETER_TYPE = 'type';
    var PARAMETER_THEME = 'theme.id';
    var PARAMETER_PUBLISHER = 'publisher.id';
    var PARAMETER_USED_BY = 'usedBy.id';
    var PARAMETER_CREATED_BY = 'createdBy';
    var PARAMETER_CONTRIBUTED_BY = 'contributedBy';
    var PARAMETER_CREATOR = 'creator.id';
    var PARAMETER_SVC_TYPE = 'serviceType.id';
    var PARAMETER_IN_SCHEME = 'scheme.id';
    var PARAMETER_VISIBILITY = 'visibility';
    var PARAMETER_QUERY = 'q';
    var PARAMETER_EXTENT = 'extent';
    var PARAMETER_MODIFIED_BEFORE = 'modified.max';
    var PARAMETER_MODIFIED_AFTER = 'modified.min';
    var PARAMETER_RESOURCE_TYPES = 'resourceType';
    // const PARAMETER_CONTRIBUTOR     = 'contributor.id';
    var PARAM_OPTIONS = [{ option: VAR_TYPES, parameter: PARAMETER_TYPE }, { option: VAR_THEMES, parameter: PARAMETER_THEME }, { option: VAR_PUBLISHERS, parameter: PARAMETER_PUBLISHER }, { option: VAR_USED_BY, parameter: PARAMETER_USED_BY }, { option: VAR_USER, parameter: PARAMETER_CREATOR }, { option: VAR_CREATED_BY, parameter: PARAMETER_CREATED_BY }, { option: VAR_SERVICE_TYPES, parameter: PARAMETER_SVC_TYPE }, { option: VAR_SCHEMES, parameter: PARAMETER_IN_SCHEME }, { option: VAR_VISIBILITY, parameter: PARAMETER_VISIBILITY }, { option: VAR_QUERY, parameter: PARAMETER_QUERY }, { option: VAR_EXTENT, parameter: PARAMETER_EXTENT }, { option: VAR_MODIFIED_BEFORE, parameter: PARAMETER_MODIFIED_BEFORE }, { option: VAR_MODIFIED_AFTER, parameter: PARAMETER_MODIFIED_AFTER }, { option: VAR_RESOURCE_TYPES, parameter: PARAMETER_RESOURCE_TYPES }];
    var PAGE_SIZE_BASE_10 = [10, 20, 50, 100];
    var PAGE_SIZE_BASE_12 = [12, 24, 48, 96];
    /**
     *
     *
     */
    function BrowseObjectsService($rootScope, $timeout, $resource, options) {
        /* -------- private data ----------- */
        var url = options && options.url ? options.url + "/:id" : Constants.ualUrl + '/api/items/:id';
        var eventKey = 'gp:browse:' + (options && options.key ? options.key : 'objects') + ":";
        var svc = $resource(url, { id: '@id' }, {
            query: {
                isArray: false
            }
        });
        var _pageSizeBase = PAGE_SIZE_BASE_10.slice(0);
        if (options && options.pageSizeBase && options.pageSizeBase === 12) _pageSizeBase = PAGE_SIZE_BASE_12.slice(0);
        var _options = {
            start: 0,
            size: _pageSizeBase[0],
            total: 0,
            sort: options && options.sort ? options.sort : "modified,desc",
            facets: {}
        };
        //list of field names to request in response
        var _fields = options && options.fields ? options.fields : FIELDS.slice(0);
        //list of facet names to request
        var _requestFacets = options && options.facets ? options.facets : FACETS.slice(0);
        var _facets = [];
        var _selectedFacets = [];
        var _results = [];
        var _dirtyPromise = null;
        var _isLoading = false;
        var _selected = [];
        var _onSelectFn = options && options.onSelect ? options.onSelect : null;
        /**
         *
         */
        function notify(eventName, arg) {
            // console.log("Notifying of " + eventName + " with " + arg);
            $rootScope.$broadcast(eventName, arg);
        }
        /**
         * when marked as dirty, debounce for rapid fire events like onKeyUp
         */
        function dirty(delay, resetStart) {
            var doReset = typeof resetStart === 'undefined' || resetStart === true;
            if (_dirtyPromise) $timeout.cancel(_dirtyPromise);
            _dirtyPromise = $timeout(function () {
                _dirtyPromise = null;
                _doUpdate(doReset);
            }, delay || 100);
        }
        /**
         *
         */
        function _doUpdate(resetStart) {
            if (resetStart) _options.start = 0;
            _isLoading = true;
            notify(eventKey + 'querying');
            var params = {};
            // -------- QUERY FILTERS --------
            //create a temporary options object
            var opts = angular.copy(_options);
            //apply options as parameters
            angular.forEach(PARAM_OPTIONS, function (po) {
                var name = po.parameter;
                var value = opts[po.option];
                var isSet = value !== null && typeof value !== 'undefined';
                var isArr = isSet && typeof value.push !== 'undefined';
                if (isSet && (!isArr || value.length)) {
                    params[name] = isArr ? value.join(',') : value;
                } else {
                    delete params[name];
                }
                delete opts[po.option]; //remove from temp opts
            });
            //apply remaining options to query
            // these are not keyed with specific parameters (ie, custom params)
            angular.forEach(opts, function (value, name) {
                if (value !== null && typeof value !== 'undefined') {
                    var isArr = typeof value.push !== 'undefined';
                    params[name] = isArr ? value.join(',') : value;
                } else {
                    //make sure it doesn't get sent if no value provided
                    delete params[name];
                }
            });
            // -------- QUERY FILTERS --------
            var arr = [];
            for (var k in _options.facets) {
                if (_options.facets.hasOwnProperty(k)) {
                    //encode commas in facet name since it's used to separate multiple
                    // facet values
                    arr.push(k + ":" + _options.facets[k].replace(/,/g, '%2C'));
                }
            }
            _selectedFacets = arr;
            var start = _options.start;
            if (isNaN(start)) start = 0;else start = start * 1;
            params.page = Math.floor(start / _options.size);
            params.size = _options.size;
            params.sort = _options.sort;
            if (arr.length) params.facets = arr.join(',');
            //prevent CORS cache bug in Chrome
            params.bust = new Date().getTime();
            //request facets
            params.includeFacet = _requestFacets.join(',');
            //request fields
            params.fields = _fields.join(',');
            svc.query(params).$promise.then(function (response) {
                _results = response.results;
                _facets = response.facets || [];
                //auto select objects if user has marked it as selected previously
                // this is needed to maintain selections across pagination pages
                _selected.each(function (id) {
                    var map = _results.find(function (map) {
                        return map._id === id;
                    });
                    if (map) map.selected = true;
                });
                //will trigger update on pagination directive
                _options.total = response.totalResults;
                _isLoading = false;
                notify(eventKey + 'results');
                notify(eventKey + 'pagination');
            }).catch(function (response) {
                _isLoading = false;
                //fallback
                var obj = { error: "An Error Occurred", message: "No details provided" };
                //http response error
                if (response && response.data) obj = response.data;else if (response && response.message) obj = response;
                //serialized json
                if (typeof obj === 'string') {
                    try {
                        obj = JSON.parse(obj);
                    } catch (e) {
                        obj.message = "Bad response from server";
                    }
                }
                var error = {
                    label: obj.error || "An Error Occurred",
                    message: obj.message || "No details provided"
                };
                notify(eventKey + 'error', error);
            });
        }
        function setOption(name, value, fire) {
            _options[name] = value;
            if (typeof fire === 'undefined' || !!fire) {
                var delay = 500;
                if (value === null || value === undefined) delay = 0;
                if (value && typeof value.push !== 'undefined' && value.length) delay = 0; //arrays
                else if (value && value.length) delay = 0; //strings
                dirty(delay);
            }
        }
        /* ------------ public api ------------- */
        return {
            events: {
                LOADING: eventKey + 'querying',
                RESULTS: eventKey + 'results',
                PAGINATION: eventKey + 'pagination',
                SELECTED: eventKey + 'selected',
                ERROR: eventKey + 'error',
                SELECTED_ADDED: eventKey + 'selected:added',
                SELECTED_REMOVED: eventKey + 'selected:removed',
                SIMILARITY: eventKey + 'similarTo'
            },
            /**
             * @return {bool}
             */
            getLoadingStatus: function getLoadingStatus() {
                return _isLoading;
            },
            /**
             * NOTE: Make sure event names are prefixed with
             *  eventKey + ''
             * @param {string} eventName
             * @param {function} listener
             */
            on: function on(eventName, listener) {
                // if(eventName.indexOf(eventKey + ":") !== 0)
                //     eventName = eventKey + '' + eventName;
                return $rootScope.$on(eventName, listener);
            },
            /**
             * @param {string} eventName
             * @param {*} args
             */
            trigger: function trigger(eventName, args) {
                notify(eventName, args);
            },
            /**
             * @return {array[object]}
             */
            getResults: function getResults() {
                return _results;
            },
            /**
             * @return {array[string]} list of facet names
             */
            getFacetNames: function getFacetNames() {
                return FACETS.slice(0);
            },
            /**
             * @return {object} in form of <facet>: [<values>]
             */
            getFacets: function getFacets() {
                return _facets;
            },
            /**
             * @param {string} name
             * @return {object|null}
             */
            getFacet: function getFacet(name) {
                if (_facets) {
                    return _facets.find(function (facet) {
                        return facet.name === name;
                    });
                }
                return null;
            },
            addFacet: function addFacet(name) {
                _requestFacets.push(name);
            },
            applyConstraints: function applyConstraints(obj) {
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        _options[p] = obj[p];
                    }
                }
                _doUpdate(true);
            },
            applyOption: function applyOption(key, value, fire) {
                setOption(key, value, fire);
            },
            applyOptions: function applyOptions(opts, fire) {
                angular.forEach(opts, function (value, key) {
                    setOption(key, value, false);
                });
                if (fire) _doUpdate(true);
            },
            /**
             * @param {string} text - free text query
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setQuery: function setQuery(text, fireUpdate) {
                setOption(VAR_QUERY, text, fireUpdate);
            },
            getQuery: function getQuery() {
                return _options[VAR_QUERY];
            },
            /**
             * @param {array[string]} types - name of class(es) to request
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setTypes: function setTypes(types, fireUpdate) {
                setOption(VAR_TYPES, types, fireUpdate);
            },
            getTypes: function getTypes() {
                return _options[VAR_TYPES];
            },
            /**
             * @param {string} userId - identifier of user
             * @param {boolean} fireUpdate -
             */
            setUser: function setUser(userId, fireUpdate) {
                setOption(VAR_USER, userId, fireUpdate);
            },
            getUser: function getUser() {
                return _options[VAR_USER];
            },
            /**
             * @param {array[string]} creators - ids of creators
             * @param {boolean} fireUpdate -
             */
            setCreatedBy: function setCreatedBy(creators, fireUpdate) {
                setOption(VAR_CREATED_BY, creators, fireUpdate);
            },
            getCreatedBy: function getCreatedBy() {
                return _options[VAR_CREATED_BY];
            },
            /**
             * @param {array[string]} themes - name of class(es) to request
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setThemes: function setThemes(themes, fireUpdate) {
                setOption(VAR_THEMES, themes, fireUpdate);
            },
            getThemes: function getThemes() {
                return _options[VAR_THEMES];
            },
            /**
             * @param {array[string]} publishers - name of class(es) to request
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setAgencies: function setAgencies(publishers, fireUpdate) {
                setOption(VAR_PUBLISHERS, publishers, fireUpdate);
            },
            getAgencies: function getAgencies() {
                return _options[VAR_PUBLISHERS];
            },
            /**
             * @param {array[string]} ids - ids of agents using this item
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setUsedBy: function setUsedBy(ids, fireUpdate) {
                setOption(VAR_USED_BY, ids, fireUpdate);
            },
            getUsedBy: function getUsedBy() {
                return _options[VAR_USED_BY];
            },
            /**
             * @param {array[string]} svcTypes - ids
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setServiceTypes: function setServiceTypes(svcTypes, fireUpdate) {
                setOption(VAR_SERVICE_TYPES, svcTypes, fireUpdate);
            },
            getServiceTypes: function getServiceTypes() {
                return _options[VAR_SERVICE_TYPES];
            },
            /**
             * @param {array[string]} resTypes - uris
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setResourceTypes: function setResourceTypes(resTypes, fireUpdate) {
                setOption(VAR_RESOURCE_TYPES, resTypes, fireUpdate);
            },
            getResourceTypes: function getResourceTypes() {
                return _options[VAR_RESOURCE_TYPES];
            },
            /**
             * @param {array[string]} schemes - ids
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setSchemes: function setSchemes(schemes, fireUpdate) {
                setOption(VAR_SCHEMES, schemes, fireUpdate);
            },
            getSchemes: function getSchemes() {
                return _options[VAR_SCHEMES];
            },
            /**
             * @param {string} visibility - one of 'public' or 'private'
             * @param {boolean} fireUpdate
             */
            setVisibility: function setVisibility(visibility, fireUpdate) {
                setOption(VAR_VISIBILITY, visibility, fireUpdate);
            },
            getVisibility: function getVisibility() {
                return _options[VAR_VISIBILITY];
            },
            /**
             * @param {Date} date - date to compare against
             * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after)
             * @param {boolean} fireUpdate - flag specifying whether to trigger update automatically
             */
            setModified: function setModified(date, beforeOrAfter, fireUpdate) {
                //if no date was supplied, consider it "unset" for both properties
                if (!date) {
                    setOption(VAR_MODIFIED_BEFORE, null, false);
                    setOption(VAR_MODIFIED_AFTER, null, true);
                    return;
                }
                var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
                var prop = dir ? VAR_MODIFIED_BEFORE : VAR_MODIFIED_AFTER; //property being set
                var oppProp = dir ? VAR_MODIFIED_AFTER : VAR_MODIFIED_BEFORE; //unset opposite property
                var arg = date && date.getTime ? date.getTime() : date;
                setOption(oppProp, null, false);
                setOption(prop, arg, true);
            },
            getModified: function getModified() {
                return this._options[VAR_MODIFIED_BEFORE] || this._options[VAR_MODIFIED_AFTER];
            },
            /**
             * @param {string} bboxStr - form of "minx,miny,maxx,maxy"
             * @param {boolean} fireUpdate
             */
            setExtent: function setExtent(bboxStr) {
                setOption(VAR_EXTENT, bboxStr, true);
            },
            /** @return {string} bbox string or null if not set */
            getExtent: function getExtent() {
                return _options[VAR_EXTENT];
            },
            /**
             * @return {array} list of selected items from current search results
             */
            getSelected: function getSelected() {
                return _selected;
            },
            /**
             * @param {array} arr - list of items to select in current search results
             */
            setSelected: function setSelected(arr) {
                _selected = arr;
                notify(this.events.SELECTED, _selected);
            },
            /**
             * @param {string} id - identifier of item in current search results to add to selected list
             */
            select: function select(id) {
                var finder = function finder(l) {
                    return l.id === id;
                };
                var existing = _selected.find(finder);
                if (existing) {
                    var idx = _selected.indexOf(existing);
                    if (idx >= 0) {
                        _selected.splice(idx, 1);
                        notify(eventKey + 'selected:removed', existing);
                    }
                } else {
                    var obj = _results.find(finder);
                    if (obj) {
                        if (_onSelectFn) {
                            _onSelectFn(id, function (err, item) {
                                if (item) {
                                    _selected.unshift(item);
                                    notify(eventKey + 'selected:added', item);
                                }
                            });
                        } else {
                            _selected.unshift(obj);
                            notify(eventKey + 'selected:added', obj);
                        }
                    }
                }
                notify(this.events.SELECTED, _selected);
            },
            /**
             * @param {string} id - identifier of item to check
             * @return {boolean} true if selected, false otherwise
             */
            isSelected: function isSelected(id) {
                return _selected.find(function (obj) {
                    return obj.id === id;
                });
            },
            /**
             * select all items in current page of results
             */
            selectAll: function selectAll() {
                var _this = this;
                angular.forEach(_results, function (obj) {
                    if (!_this.isSelected(obj.id)) _selected.unshift(obj);
                });
                notify(this.events.SELECTED, _selected);
            },
            /**
             * empty list of selected items
             */
            clearSelected: function clearSelected() {
                _selected = [];
                notify(this.events.SELECTED, []);
            },
            /**
             *
             */
            clear: function clear(refresh) {
                for (var prop in _options) {
                    if (!_options.hasOwnProperty(prop)) continue;
                    if ('start' === prop) _options[prop] = 0;else if ('size' === prop) {} else if ('sort' === prop) _options[prop] = 'modified,desc';else if ('facets' === prop) _options[prop] = {};else _options[prop] = null;
                }
                if (refresh || typeof refresh === 'undefined') _doUpdate(true);
            },
            /*
             * @param {string} category - name of facet
             * @param {string} value - value of facet
             */
            setFacet: function setFacet(category, value) {
                var f = _options.facets[category];
                if (!f) _options.facets[category] = value;else {
                    if (f === value) {
                        //unset it
                        delete _options.facets[category];
                    } else {
                        //set it
                        _options.facets[category] = value;
                    }
                }
                _doUpdate(true);
            },
            /**
             * @param {array[string]} fields - list of field names to request for each search result
             */
            setFields: function setFields(fields) {
                if (fields && typeof fields.push !== 'undefined') _fields = fields;
            },
            /**
             * @param {int} start - beginning index of results to request
             * @param {bool} andUpdate - trigger update (default is true)
             */
            start: function start(_start, andUpdate) {
                _options.start = _start;
                if (andUpdate && andUpdate === true) _doUpdate(false);
            },
            /**
             * @param {int} size - page size to request
             * @param {bool} andUpdate - trigger update (default is true)
             */
            size: function size(_size, andUpdate) {
                _options.size = _size;
                //find out which page in the new scheme the current first-result of current page
                // will show up in, and set start so that it shows up with the new page size
                var page = Math.floor(_options.start * 1 / _options.size * 1);
                _options.start = page * (_options.size * 1);
                if (andUpdate && andUpdate === true) _doUpdate(false);
            },
            /**
             * @param {int} size - number of items to return in each page of results
             */
            pageSize: function pageSize(size) {
                this.size(size, true);
            },
            /**
             * @param {string} sort - form of <field>,<dir>
             */
            sort: function sort(_sort) {
                _options.sort = _sort;
                _doUpdate(false);
            },
            /**
             * return {object} containing start index, page size, and total results
             */
            getPagination: function getPagination() {
                return {
                    start: _options.start,
                    size: _options.size,
                    pageSize: _options.size,
                    total: _options.total,
                    sizeOptions: _pageSizeBase
                };
            },
            /**
             * @return {array} list of key-value pairs of sort options
             */
            getSortOptions: function getSortOptions() {
                return SORT_OPTIONS.slice(0);
            },
            /**
             * @return {string} sorting parameter (field,order)
             */
            getSortValue: function getSortValue() {
                return _options.sort;
            },
            /**
             * @return {object} clone of the current set of query options
             */
            getQueryOptions: function getQueryOptions() {
                return jQuery.extend({}, _options);
            },
            /**
             *
             */
            hasQueryOptions: function hasQueryOptions() {
                var result = false;
                for (var k in _options) {
                    if (_options.hasOwnProperty(k)) {
                        if ('start' === k || 'size' === k || 'total' === k || 'sort' === k || 'order' === k || 'within' === k || 'facets' === k) continue;
                        if (_selectedFacets.length) result = true;
                        if (typeof _options[k] !== 'undefined' && _options[k] !== null) {
                            result = true;
                        }
                    }
                }
                return result;
            },
            /**
             * Triggers a refresh of current search results
             * @param {boolean} resetStart - reset 'start' to 0 flag
             */
            update: function update(resetStart) {
                dirty(0, resetStart);
            },
            reset: function reset() {
                _options = {
                    start: 0,
                    size: _pageSizeBase[0],
                    total: 0,
                    sort: "modified,desc", order: "asc",
                    facets: {}
                };
                _facets = [];
                _selectedFacets = [];
                _results = [];
                _isLoading = false;
                _selected = [];
                if (_dirtyPromise) $timeout.cancel(_dirtyPromise);
                _dirtyPromise = null;
            },
            destroy: function destroy() {
                if (_dirtyPromise) $timeout.cancel(_dirtyPromise);
            }
        };
    }
    /**
     * Factory for creating instances of BrowseObjectsService
     */
    function BrowseServiceFactory($rootScope, $timeout, $resource) {
        return function (options) {
            var svc = BrowseObjectsService($rootScope, $timeout, $resource, options);
            if (options && options.params) svc.applyOptions(options.params);
            return svc;
        };
    }
    angular.module('gp-common').service("BrowseObjectsService", ['$rootScope', '$timeout', '$resource', BrowseObjectsService]).factory("BrowseServiceFactory", ['$rootScope', '$timeout', '$resource', 'BrowseObjectsService', BrowseServiceFactory]);
    /*
        Example of how to use the factory to customize a service
    
        //layer-specific browse service
        .service('BrowseLayerObjService', ['BrowseServiceFactory', function(BrowseServiceFactory) {
            let service = BrowseServiceFactory({
                key: 'layers',
                url: Constants.ualUrl + '/api/layers'
            });
    
            //add custom methods here
    
            return service;
        }])
    */
})(angular, GeoPlatform);

(function (angular) {
    'use strict';
    /* *********************************************
     * Requires socket.io be in the global namespace
     * tested with version 2.x
     * ********************************************* */
    /*
       Usage:
        let service = ...
        let svcId = service.getId();
        //listen to events from the server
       service.on('testing', (event) => {
           if(event.clientId === svcId) return; //ignore our own events
           ... do something ...
       });
       
       //sends out a message to others
       service.emit( service.events.CREATED, 'test');
        //sends out a message to others
       service.begin(service.events.EDITING, 'test');
        //sends out a message to others
       service.end(service.events.EDITING, 'test');
        //stop listening and close the socket
       service.close();
      */
    /**
     *
     */

    var SocketService = /** @class */function () {
        SocketService.$inject = ["url", "options"];
        function SocketService(url, options) {
            'ngInject';

            var _this = this;
            var opts = (typeof options === "undefined" ? "undefined" : _typeof(options)) === 'object' ? options : {};
            for (var key in opts) {
                this[key] = opts[key];
            }this.socket = null;
            //list of ids of things being tracked, such as 
            // items edited, in order to send messages
            // about the things lifecycle
            this.tracking = {};
            //events supported.
            // Note that lifecycles can be added by using the 
            // begin() and end() methods on the service,
            // which appends '_start' and '_end' respectively
            this.events = {
                CREATED: 'created',
                UPDATED: 'updated',
                DELETED: 'deleted',
                EDITING: 'editing',
                STATUS: 'status'
            };
            if (typeof io === 'undefined') {
                console.log("Socket.IO not found in global namespace");
                return;
            }
            if (!url) {
                console.log("No web socket URL configured for this app to communicate with");
                return;
            }
            //make connection
            this.socket = io.connect(url);
            //listen for the init event indicating connection has been made
            // and to get the socket's id from the server
            this.socket.on("init", function (evt) {
                _this.socketId = evt.id;
            });
            //if unable to connect
            this.socket.on('error', function () {
                console.log("Unable to connect to " + url + " with websockets");
            });
        }
        /**
         *
         */
        SocketService.prototype.getId = function () {
            return this.socketId;
        };
        /**
         * @param {string} eventName
         * @param {Function} callback
         * @return {Function} to remove the listener
         */
        SocketService.prototype.on = function (eventName, callback) {
            var _this = this;
            if (!this.socket) return function () {};
            //add the listener to the socket
            this.socket.on(eventName, callback);
            //return an 'off' function to remove the listener
            return function () {
                _this.socket.off(eventName, callback);
            };
        };
        /**
         *
         */
        SocketService.prototype.emit = function (eventName, data, callback) {
            if (!this.socket) return;
            this.socket.emit(eventName, data, callback);
        };
        /**
         * Closes this service's socket
         */
        SocketService.prototype.close = function () {
            var _this = this;
            //if this app was tracking an obj, 
            // notify listeners that it is no longer
            for (var event in this.tracking) {
                if (this.tracking.hasOwnProperty(event)) {
                    var tracks = this.tracking[event];
                    if (tracks && tracks.length) {
                        /* jshint ignore:start */
                        angular.forEach(tracks, function (id) {
                            _this.end(event, id);
                        });
                        /* jshint ignore:end */
                    }
                }
            }
            if (this.socket) {
                this.socket.close();
                this.socket = null;
            }
            return null;
        };
        /**
         * @param {string} event - name of the event being started
         * @param {string} objId - identifier of the item being tracked
         */
        SocketService.prototype.begin = function (event, objId) {
            var _this = this;
            this.tracking[event] = this.tracking[event] || [];
            this.tracking[event].push(objId);
            var room = objId + "_" + event.toLowerCase();
            this.join(room, function () {
                _this.socket.emit(event, room, _this.socketId, true);
            });
        };
        /**
         * @param {string} event - name of the event being ended
         * @param {string} objId - identifier of the item being tracked
         */
        SocketService.prototype.end = function (event, objId) {
            var _this = this;
            this.tracking[event] = this.tracking[event] || [];
            if (!this.tracking[event].length) return; //empty, ignore request
            var idx = this.tracking[event].indexOf(objId);
            if (idx < 0)
                //remove tracker
                this.tracking[event].splice(idx, 1);
            //send event to server about client stopping it's tracking
            var room = objId + "_" + event.toLowerCase();
            this.socket.emit(event, room, this.socketId, false, function () {
                _this.leave(room);
            });
        };
        /**
         *
         */
        SocketService.prototype.join = function (objId, callback) {
            this.emit('join', objId, callback);
        };
        /**
         *
         */
        SocketService.prototype.leave = function (objId, callback) {
            this.emit('leave', objId, callback);
        };
        return SocketService;
    }();
    /**
     * Factory to get a Service used to listen for WebSocket messages from a server
     *
     * Usage:
     *
     * let wsUrl = ...
     * let service = SocketServiceFactory(wsUrl);
     *
     */
    angular.module('gp-common').factory('SocketServiceFactory', ["$rootScope", "$window", "UUID", function ($rootScope, $window, UUID) {
        var cache = {};
        //disconnect whenever the app is closed
        var onClose = function onClose(e) {
            for (var key in cache) {
                if (cache.hasOwnProperty(key)) {
                    cache[key].close();
                    cache[key] = null;
                }
            }
            cache = null;
            return null;
        };
        //needed for reload/backbtn
        if ($window.onbeforeunload === 'function') {
            var existing_1 = $window.onbeforeunload;
            $window.onbeforeunload = function (e) {
                onClose(e);
                return existing_1(e);
            };
        } else {
            $window.onbeforeunload = onClose;
        }
        $rootScope.$on('$destroy', onClose);
        //-------------------
        return function (url) {
            // if(!url) return null;
            // if(cache[url]) return cache[url];
            var cacheRef = UUID();
            var service = new SocketService(url, $rootScope, { cacheRef: cacheRef });
            var closeDelegate = service.close;
            service.close = function () {
                var id = service.cacheRef;
                closeDelegate.call(service); //have service disconnect and clean up itself
                //then clean up cache reference
                delete cache[id];
            };
            var onDelegate = service.on;
            service.on = function (event, callback) {
                if (typeof callback === 'function') {
                    //have to use old-school refs instead of arrow functions
                    // or else the arguments get scrambled
                    var handle = function handle() {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            callback.apply(service.socket, args);
                        });
                    };
                    return onDelegate.call(service, event, handle);
                } else {
                    return onDelegate.call(service, event);
                }
            };
            var emitDelegate = service.emit;
            service.emit = function (event, data, callback) {
                if (typeof callback === 'function') {
                    //have to use old-school refs instead of arrow functions
                    // or else the arguments get scrambled
                    var handle = function handle() {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            callback.apply(service.socket, args);
                        });
                    };
                    emitDelegate.call(service, event, data, handle);
                } else {
                    emitDelegate.call(service, event, data);
                }
            };
            // cache[url] = service;
            cache[cacheRef] = service;
            return service;
        };
    }]);
})(angular);

(function (angular) {
    'use strict';

    angular.module("gp-common").factory('UUID', function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        /*
        return function() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }
         */
        return function () {
            // http://www.ietf.org/rfc/rfc4122.txt
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
            return s.join("");
        };
    });
})(angular);

(function () {
    "use strict";

    if (typeof Array.prototype.find === 'undefined') {
        Array.prototype.find = function (callback) {
            for (var i = 0; i < this.length; ++i) {
                if (callback(this[i], i, this)) return this[i];
            }
            return null;
        };
    }
    if (typeof Array.prototype.filter === 'undefined') {
        Array.prototype.filter = function (callback) {
            var results = [];
            for (var i = 0; i < this.length; ++i) {
                if (callback(this[i], i, this)) results.push(this[i]);
            }
            return results;
        };
    }
    if (typeof Array.prototype.each === 'undefined') {
        Array.prototype.each = function (callback) {
            for (var i = 0; i < this.length; ++i) {
                callback(this[i], i, this);
            }
        };
    }
    if (typeof Array.prototype.indexOfObj === 'undefined') {
        Array.prototype.indexOfObj = function (obj, comparatorFn) {
            var arr = this,
                len = arr.length;
            if (typeof comparatorFn !== 'function') comparatorFn = function comparatorFn(a, b) {
                return a === b;
            };
            for (var i = 0; i < len; ++i) {
                if (comparatorFn(obj, arr[i])) return i;
            }
            return -1;
        };
    }
    if (typeof String.prototype.startsWith === 'undefined') {
        String.prototype.startsWith = function (value) {
            var str = this;
            if (!str.length) return false;
            if (!value.length) return false;
            if (str.length < value.length) return false;
            return str.indexOf(value) === 0;
        };
    }
    if (typeof String.prototype.endsWith === 'undefined') {
        String.prototype.endsWith = function (value) {
            var str = this;
            if (!str.length) return false;
            if (!value.length) return false;
            if (str.length < value.length) return false;
            var substr = str.substring(str.length - value.length, str.length);
            return substr == value;
        };
    }
    if (typeof Date.prototype.plus === 'undefined') {
        Date.prototype.plus = function (offset) {
            var type = typeof offset === "undefined" ? "undefined" : _typeof(offset);
            if (type === 'undefined') return this;
            var offsetMS = 0;
            if (type === 'string') {
                switch (offset) {
                    case 'hour':
                        offsetMS = 1000 * 60 * 60;
                        break;
                    case 'day':
                        offsetMS = 1000 * 60 * 60 * 24;
                        break;
                    case 'week':
                        offsetMS = 1000 * 60 * 60 * 24 * 7;
                        break;
                    case 'month':
                        offsetMS = 1000 * 60 * 60 * 24 * 31;
                        break;
                    case 'year':
                        offsetMS = 1000 * 60 * 60 * 24 * 365;
                        break;
                }
            } else if (type === 'number') {
                offsetMS = offset;
            } else return this;
            var d = this;
            return new Date(d.getTime() + offsetMS);
        };
    }
    if (typeof Date.prototype.random === 'undefined') {
        Date.prototype.random = function (threshold) {
            var type = typeof threshold === "undefined" ? "undefined" : _typeof(threshold);
            if (type === 'undefined') return this;
            var offsetMS = 0;
            if (type === 'string') {
                switch (threshold) {
                    case 'hour':
                        offsetMS = 1000 * 60 * 60;
                        break;
                    case 'day':
                        offsetMS = 1000 * 60 * 60 * 24;
                        break;
                    case 'week':
                        offsetMS = 1000 * 60 * 60 * 24 * 7;
                        break;
                    case 'month':
                        offsetMS = 1000 * 60 * 60 * 24 * 31;
                        break;
                    case 'year':
                        offsetMS = 1000 * 60 * 60 * 24 * 365;
                        break;
                }
            } else if (type === 'number') {
                offsetMS = threshold;
            } else return this;
            var d = this;
            return new Date(d.getTime() + Math.floor(Math.random() * offsetMS));
        };
    }
})();

/// <reference path="../types.ts" />
(function (angular) {
    'use strict';
    //flag on whether we're in dev env
    // function isDEV() {
    //     return "localhost" === window.location.hostname ||
    //         ~window.location.hostname.indexOf("192.168")||
    //         ~window.location.hostname.indexOf("localhost")||
    //         ~window.location.hostname.indexOf("10.0");
    // }
    /**
     * Get token from query string
     *
     * Note:
     *  Lifted outside of any Angular service to prevent cyclical service dependencies.
     *
     * @method getJWTFromUrl
     * @returns {String} token - token in query string or undefined
     */

    function getJWTFromUrl() {
        var queryString = window.location.hash ? window.location.hash : window.location.href;
        var res = queryString.match(/access_token=([^\&]*)/);
        return res && res[1];
    }
    ;
    /**
     * GeoPlatform Common Module Authentication Support
     *
     * Contains re-usable services, directives, and other angular components
     *
     *
     * NOTE: This module uses certain variables in $rootScope in order to
     * perform actions like authentication.  The following variables should be
     * set before using any service/directive in this file:
     *
     *   - idspUrl : the url to the identity service provider server
     *   - idmUrl : the url to the identity management server
     *   - portalUrl : the url to the main landing page of GeoPlatform (www.geoplatform.gov in production)
     */
    angular.module('gp-common').service('AuthenticationService', ['$q', '$http', '$location', '$rootScope', '$window', 'GPConfig', function ($q, $http, $location, $rootScope, $window, Config) {
        //extend Storage prototype
        Storage.prototype.setObject = function (key, value) {
            this.setItem(key, btoa(JSON.stringify(value)));
        };
        Storage.prototype.getObject = function (key) {
            var value = atob(this.getItem(key));
            return value && JSON.parse(value);
        };
        var User = /** @class */function () {
            function User(opts) {
                this.id = opts.sub;
                this.username = opts.username;
                this.name = opts.name;
                this.email = opts.email;
                this.org = opts.orgs[0] && opts.orgs[0].name;
                this.groups = opts.groups;
                this.exp = opts.exp;
            }
            User.prototype.toJSON = function () {
                return JSON.parse(JSON.stringify(this));
            };
            ;
            User.prototype.clone = function () {
                return Object.assign({}, this);
            };
            ;
            User.prototype.compare = function (arg) {
                if (arg instanceof User) {
                    return this.id === arg.id;
                } else if ((typeof arg === "undefined" ? "undefined" : _typeof(arg)) === 'object') {
                    return typeof arg.id !== 'undefined' && arg.id === this.id;
                }
                return false;
            };
            ;
            User.prototype.isAuthorized = function (role) {
                var env = Config.env || Config.ENV || Config.NODE_ENV;
                if ((env === 'dev' || env === 'development') && typeof Config.ALLOW_DEV_EDITS !== 'undefined') return true;
                return this.groups && !!this.groups.map(function (g) {
                    return g.name;
                }).filter(function (n) {
                    return n === role;
                }).length;
            };
            ;
            return User;
        }();
        /**
         * Authentication Service
         */
        var AuthService = /** @class */function () {
            function AuthService() {
                var self = this;
                // Setup general event listeners that always run
                addEventListener('message', function (event) {
                    // Handle User Authenticated
                    if (event.data === 'iframe:userAuthenticated') {
                        self.init(); // will broadcast to angular (side-effect)
                    }
                    // Handle logout event
                    if (event.data === 'userSignOut') {
                        self.removeAuth();
                    }
                });
                var user = self.init();
                if (!user) self.ssoCheck();
            }
            AuthService.prototype.ssoCheck = function () {
                var self = this;
                // Setup ssoIframe specific handlers
                addEventListener('message', function (event) {
                    // Handle SSO login failure
                    if (event.data === 'iframe:ssoFailed') {
                        ssoIframe.remove();
                        // Force login only after SSO has failed
                        if (Config.FORCE_LOGIN) self.forceLogin();
                    }
                    // Handle User Authenticated
                    if (event.data === 'iframe:userAuthenticated') {
                        ssoIframe.remove();
                    }
                });
                var ssoURL = "/login?sso=true&cachebuster=" + new Date().getTime();
                var ssoIframe = this.createIframe(ssoURL);
            };
            /**
             * We keep this outside the constructor so that other services call
             * call it to trigger the side-effects.
             *
             * @method init
             */
            AuthService.prototype.init = function () {
                var jwt = this.getJWT();
                if (jwt) this.setAuth(jwt);
                //clean hosturl on redirect from oauth
                if (getJWTFromUrl()) {
                    if (window.history && window.history.replaceState) {
                        window.history.replaceState({}, 'Remove token from URL', $window.location.href.replace(/[\?\&]access_token=.*\&token_type=Bearer/, ''));
                    } else {
                        $window.location.search.replace(/[\?\&]access_token=.*\&token_type=Bearer/, '');
                    }
                }
                return this.getUserFromJWT(jwt);
            };
            /**
             * Create an invisable iframe and appends it to the bottom of the page.
             *
             * @method createIframe
             * @returns {HTMLIFrameElement}
             */
            AuthService.prototype.createIframe = function (url) {
                var iframe = document.createElement('iframe');
                iframe.style.display = "none";
                iframe.src = url;
                document.body.appendChild(iframe);
                return iframe;
            };
            ;
            /**
             * Redirects or displays login window the page to the login site
             */
            AuthService.prototype.login = function () {
                // Check implicit we need to actually redirect them
                if (Config.AUTH_TYPE === 'token') {
                    window.location.href = Config.IDP_BASE_URL + '/auth/authorize?client_id=' + Config.APP_ID + '&response_type=' + Config.AUTH_TYPE + '&redirect_uri=' + encodeURIComponent(Config.CALLBACK || '/login');
                    // Otherwise pop up the login modal
                } else {
                    // Iframe login
                    if (Config.ALLOWIFRAMELOGIN) {
                        $rootScope.$broadcast('auth:requireLogin');
                        // Redirect login
                    } else {
                        window.location.href = Config.LOGIN_URL || "/login" + ("?redirect_url=" + encodeURIComponent(window.location.href));
                    }
                }
            };
            ;
            /**
             * Performs background logout and requests jwt revokation
             */
            AuthService.prototype.logout = function () {
                var self = this;
                // Create iframe to manually call the logout and remove gpoauth cookie
                // https://stackoverflow.com/questions/13758207/why-is-passportjs-in-node-not-removing-session-on-logout#answer-33786899
                // this.createIframe(`${Config.IDP_BASE_URL}/auth/logout`)
                // Save JWT to send with final request to revoke it
                var jwt = this.getJWT();
                self.removeAuth(); // purge the JWT
                return $http({
                    method: 'GET',
                    url: "/revoke?sso=true",
                    headers: {
                        Authorization: "Bearer " + jwt
                    }
                }).then(function () {
                    if (Config.LOGOUT_URL) window.location.href = Config.LOGOUT_URL;
                    if (Config.FORCE_LOGIN) self.forceLogin();
                }).catch(function (err) {
                    return console.log('Error logging out: ', err);
                });
            };
            ;
            /**
             * Optional force redirect for non-public services
             */
            AuthService.prototype.forceLogin = function () {
                this.login();
            };
            ;
            /**
             * Get protected user profile
             */
            AuthService.prototype.getOauthProfile = function () {
                var Q = $q.defer();
                //check to make sure we can make called
                if (this.getJWT()) {
                    $http.get(Config.IDP_BASE_URL + '/api/profile').then(function (response) {
                        return Q.resolve(response);
                    }).catch(function (err) {
                        return Q.reject(err);
                    });
                } else {
                    Q.reject(null);
                }
                return Q.promise;
            };
            ;
            /**
             * Get User object from the JWT.
             *
             * If no JWT is provided it will be looked for at the normal JWT
             * locations (localStorage or URL queryString).
             *
             * @param {JWT} [jwt] - the JWT to extract user from.
             */
            AuthService.prototype.getUserFromJWT = function (jwt) {
                var user = this.parseJwt(jwt);
                return user ? new User(Object.assign({}, user, { id: user.sub })) : null;
            };
            /**
             * If the callback parameter is specified, this method
             * will return undefined. Otherwise, it returns the user (or null).
             *
             * Side Effects:
             *  - Will redirect users if no valid JWT was found
             *
             * @param callback optional function to invoke with the user
             * @return object representing current user
             */
            AuthService.prototype.getUser = function (callback) {
                var jwt = this.getJWT();
                // If callback provided we can treat async and call server
                if (callback && typeof callback === 'function') {
                    this.check().then(function (user) {
                        return callback(user);
                    });
                    // If no callback we have to provide a sync response (no network)
                } else {
                    // We allow front end to get user data if grant type and expired
                    // because they will recieve a new token automatically when
                    // making a call to the client(application)
                    return this.isImplicitJWT(jwt) && this.isExpired(jwt) ? null : this.getUserFromJWT(jwt);
                }
            };
            /**
             * Promise version of get user.
             *
             * Below is a table of how this function handels this method with
             * differnt configurations.
             *  - FORCE_LOGIN : Horizontal
             *  - ALLOWIFRAMELOGIN : Vertical
             *
             *
             * getUserQ | T | F (FORCE_LOGIN)
             * -----------------------------
             * T        | 1 | 2
             * F        | 3 | 4
             * (ALLOWIFRAMELOGIN)
             *
             * Cases:
             * 1. Delay resolve function till user is logged in
             * 2. Return null (if user not authorized)
             * 3. Force the redirect
             * 4. Return null (if user not authorized)
             *
             * NOTE:
             * Case 1 above will cause this method's promise to be a long stall
             * until the user completes the login process. This should allow the
             * app to forgo a reload is it should have waited till the entire
             * time till the user was successfully logged in.
             *
             * @method getUserQ
             *
             * @returns {Promise<User>} User - the authenticated user
             */
            AuthService.prototype.getUserQ = function () {
                var self = this;
                var q = $q.defer();
                this.check().then(function (user) {
                    if (user) {
                        q.resolve(user);
                    } else {
                        // Case 1 - ALLOWIFRAMELOGIN: true | FORCE_LOGIN: true
                        if (Config.ALLOWIFRAMELOGIN && Config.FORCE_LOGIN) {
                            // Resolve with user once they have logged in
                            $rootScope.$on('userAuthenticated', function (event, user) {
                                q.resolve(user);
                            });
                        }
                        // Case 2 - ALLOWIFRAMELOGIN: true | FORCE_LOGIN: false
                        if (Config.ALLOWIFRAMELOGIN && !Config.FORCE_LOGIN) {
                            q.resolve(null);
                        }
                        // Case 3 - ALLOWIFRAMELOGIN: false | FORCE_LOGIN: true
                        if (!Config.ALLOWIFRAMELOGIN && Config.FORCE_LOGIN) {
                            addEventListener('message', function (event) {
                                // Handle SSO login failure
                                if (event.data === 'iframe:ssoFailed') {
                                    q.resolve(self.getUser());
                                }
                            });
                            // q.resolve(null)
                        }
                        // Case 4 - ALLOWIFRAMELOGIN: false | FORCE_LOGIN: false
                        if (!Config.ALLOWIFRAMELOGIN && !Config.FORCE_LOGIN) {
                            q.resolve(null); // or reject?
                        }
                    }
                }).catch(function (err) {
                    return console.log(err);
                });
                return q.promise;
            };
            ;
            /**
             * Check function being used by some front end apps already.
             * (wrapper for getUser)
             *
             * @method check
             * @returns {User} - ng-common user object or null
             */
            AuthService.prototype.check = function () {
                var _this = this;
                var jwt = this.getJWT();
                if (!jwt) return $q.when(null);
                if (!this.isImplicitJWT(jwt)) {
                    return this.isExpired(jwt) ? this.checkWithClient(jwt).then(function (jwt) {
                        return _this.getUserFromJWT(jwt);
                    }) : // Check with server
                    $q.when(this.getUserFromJWT(jwt));
                } else {
                    return this.isExpired(jwt) ? $q.reject(null) : $q.when(this.getUserFromJWT(jwt));
                }
            };
            /**
             * Makes a call to a service hosting node-gpoauth to allow for a
             * token refresh on an expired token, or a token that has been
             * invalidated to be revoked.
             *
             * Note: Client as in hosting application:
             *    https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2
             *
             * @method checkWithClient
             * @param {jwt} - encoded accessToken/JWT
             *
             * @return {Promise<jwt>} - promise resolving with a JWT
             */
            AuthService.prototype.checkWithClient = function (originalJWT) {
                var _this = this;
                return $http.get('/checktoken').then(function (resp) {
                    var header = resp.headers('Authorization');
                    var newJWT = header && header.replace('Bearer ', '');
                    if (newJWT) _this.setAuth(newJWT);
                    return newJWT ? newJWT : originalJWT;
                });
            };
            //=====================================================
            /**
             * Extract token from current URL
             *
             * @method getJWTFromUrl
             *
             * @return {String | undefined} - JWT Token (raw string)
             */
            AuthService.prototype.getJWTFromUrl = function () {
                var queryString = $window && $window.location && $window.location.hash ? $window.location.hash : $location.url();
                var res = queryString.match(/access_token=([^\&]*)/);
                return res && res[1];
            };
            ;
            /**
             * Load the JWT stored in local storage.
             *
             * @method getJWTfromLocalStorage
             *
             * @return {JWT | undefined} An object wih the following format:
             */
            AuthService.prototype.getJWTfromLocalStorage = function () {
                return window.localStorage.gpoauthJWT;
            };
            ;
            /**
             * Attempt and pull JWT from the following locations (in order):
             *  - URL query parameter 'access_token' (returned from IDP)
             *  - Browser local storage (saved from previous request)
             *
             * @method getJWT
             *
             * @return {sting | undefined}
             */
            AuthService.prototype.getJWT = function () {
                var jwt = this.getJWTFromUrl() || this.getJWTfromLocalStorage();
                // Only deny implicit tokens that have expired
                if (!jwt || jwt && this.isImplicitJWT(jwt) && this.isExpired(jwt)) {
                    return null;
                } else {
                    return jwt;
                }
            };
            ;
            /**
             * Remove the JWT saved in local storge.
             *
             * @method clearLocalStorageJWT
             *
             * @return  {undefined}
             */
            AuthService.prototype.clearLocalStorageJWT = function () {
                delete window.localStorage.gpoauthJWT;
            };
            ;
            /**
             * Is a token expired.
             *
             * @method isExpired
             * @param {JWT} jwt - A JWT
             *
             * @return {boolean}
             */
            AuthService.prototype.isExpired = function (jwt) {
                var parsedJWT = this.parseJwt(jwt);
                if (parsedJWT) {
                    var now = new Date().getTime() / 1000;
                    return now > parsedJWT.exp;
                }
                return true;
            };
            ;
            /**
             * Is the JWT an implicit JWT?
             * @param jwt
             */
            AuthService.prototype.isImplicitJWT = function (jwt) {
                var parsedJWT = this.parseJwt(jwt);
                return parsedJWT && parsedJWT.implicit;
            };
            /**
             * Unsafe (signature not checked) unpacking of JWT.
             *
             * @param {string} token - Access Token (JWT)
             *
             * @return {Object} the parsed payload in the JWT
             */
            AuthService.prototype.parseJwt = function (token) {
                var parsed;
                if (token) {
                    try {
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace('-', '+').replace('_', '/');
                        parsed = JSON.parse(atob(base64));
                    } catch (e) {}
                }
                return parsed;
            };
            ;
            /**
             * Simple front end validion to verify JWT is complete and not
             * expired.
             *
             * Note:
             *  Signature validation is the only truly save method. This is done
             *  automatically in the node-gpoauth module.
             */
            AuthService.prototype.validateJwt = function (token) {
                var parsed = this.parseJwt(token);
                var valid = parsed && parsed.exp && parsed.exp * 1000 > Date.now() ? true : false;
                return valid;
            };
            ;
            /**
             * Save JWT to localStorage and in the request headers for accessing
             * protected resources.
             *
             * @param {JWT} jwt
             */
            AuthService.prototype.setAuth = function (jwt) {
                window.localStorage.gpoauthJWT = jwt;
                $http.defaults.headers.common.Authorization = 'Bearer ' + jwt;
                $rootScope.$broadcast("userAuthenticated", this.getUserFromJWT(jwt));
                // $http.defaults.useXDomain = true;
            };
            ;
            /**
             * Purge the JWT from localStorage and authorization headers.
             */
            AuthService.prototype.removeAuth = function () {
                delete window.localStorage.gpoauthJWT;
                delete $http.defaults.headers.common.Authorization;
                // Send null user as well (backwards compatability)
                $rootScope.$broadcast("userAuthenticated", null);
                $rootScope.$broadcast("userSignOut");
                // $http.defaults.useXDomain = false;
            };
            ;
            return AuthService;
        }();
        return new AuthService();
    }]).factory('ng-common-AuthenticationInterceptor', ["$injector", "$window", function ($injector, $window) {
        // Interceptor
        return {
            response: function response(resp) {
                var jwt = getJWTFromUrl();
                var authHeader = resp.headers('Authorization');
                if (jwt) {
                    var AuthenticationService = $injector.get('AuthenticationService');
                    AuthenticationService.setAuth(jwt);
                } else if (authHeader) {
                    var AuthenticationService = $injector.get('AuthenticationService');
                    var token = authHeader.replace('Bearer', '').trim();
                    AuthenticationService.setAuth(token);
                }
                return resp;
            }
        };
    }]).config(["$httpProvider", function myAppConfig($httpProvider) {
        $httpProvider.interceptors.push('ng-common-AuthenticationInterceptor');
    }]).directive('gpLoginModal', ['$rootScope', 'AuthenticationService', 'GPConfig', function ($rootScope, AuthenticationService, Config) {
        return {
            scope: {
                minimal: '@'
            },
            replace: true,
            template: "<div class=\"gpLoginCover\" ng-show=\"requireLogin\">\n\n              <button class=\"btn btn-cancel gpLoginCancelIframe pull-right\"\n                ng-show=\"!FORCE_LOGIN\"\n                ng-click=\"cancel()\">\n                Cancel\n                <span class=\"glyphicon glyphicon-remove-sign\"></span>\n              </button>\n\n              <!-- In order to keep the trigger in scope we use ng-show above and ng-if here -->\n              <div class=\"gpLoginWindow\" ng-if=\"requireLogin\">\n                <iframe src=\"/login?redirect_url=" + encodeURIComponent(window.location.origin + "/auth/loading?cachebuster=" + new Date().getTime()) + "&cachebuster=" + new Date().getTime() + "\"></iframe>\n              </div>\n\n            </div>",
            controller: ["$scope", "$element", "$timeout", function controller($scope, $element, $timeout) {
                $scope.requireLogin = false;
                $scope.FORCE_LOGIN = Config.FORCE_LOGIN;
                // Catch the request to display login modal
                $scope.$on('auth:requireLogin', function () {
                    $timeout(function () {
                        $scope.requireLogin = true;
                    });
                });
                // Catch the request to display login modal
                $scope.$on('userAuthenticated', function () {
                    $timeout(function () {
                        $scope.requireLogin = false;
                    });
                });
                $scope.cancel = function () {
                    console.log("CALLED");
                    $scope.requireLogin = false;
                };
            }]
        };
    }]).directive('gpLoginButton', ['$rootScope', '$timeout', 'AuthenticationService', 'GPConfig', function ($rootScope, $timeout, AuthenticationService, Config) {
        return {
            scope: {
                minimal: '@'
            },
            replace: true,
            template: ['<div class="btn-account btn-group">' +
            //not logged in
            '  <a class="btn btn-link" ng-click="login()" ng-if="!user">Sign In</a>' +
            //logged in
            '  <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" ' + '   aria-expanded="false" ng-if="user">' + '     <span class="glyphicon glyphicon-user"></span> ' + '     <span class="hidden-xs">{{::user.name}}</span> ' + '     <span class="caret"></span>' + '  </button>' + '  <ul class="dropdown-menu dropdown-menu-right" role="menu" ng-if="user">' + '    <li class="account-details">' + '      <div class="media">' + '        <div class="media-left">' + '          <div class="media-object">' + '            <span class="glyphicon glyphicon-user glyphicon-xlg"></span>' + '          </div>' + '        </div>' + '        <div class="media-body">' + '          <div class="media-heading">{{::user.name}}</div>' + '          <div><em>{{::user.username}}</em></div>' + '          <div>{{::user.email}}</div>' + '          <div>{{::user.org}}</div>' + '        </div>' + '      </div>' + '    </li>' + '    <li class="divider"></li>' + '    <li><a target="_blank" href="{{::IDP_BASE_URL}}/profile">Edit Info</a></li>' + '    <li><a target="_blank" href="{{::IDP_BASE_URL}}/updatepw">Change Password</a></li>' + '    <li><a href ng-click="logout()">Sign Out</a></li>' + '  </ul>' + '</div>'].join(' '),
            controller: ["$scope", "$rootScope", "$element", function controller($scope, $rootScope, $element) {
                $scope.IDP_BASE_URL = Config.IDP_BASE_URL;
                if ($scope.minimal === 'true') $scope.minimal = true;
                if ($scope.minimal !== true) $scope.minimal = false;
                $scope.user = AuthenticationService.getUser();
                $rootScope.$on('userAuthenticated', function (event, user) {
                    $timeout(function () {
                        $scope.user = user;
                    });
                });
                $rootScope.$on('userSignOut', function (event) {
                    $timeout(function () {
                        $scope.user = null;
                    });
                });
                $scope.login = function () {
                    AuthenticationService.login();
                };
                $scope.logout = function () {
                    AuthenticationService.logout();
                };
            }]
        };
    }]).directive('gpAccountDetails', ['$timeout', 'AuthenticationService', 'GPConfig', function ($timeout, AuthenticationService, Config) {
        return {
            scope: {},
            replace: true,
            template: ['<div>' + '  <div class="media">', '    <div class="media-left">', '        <div class="media-object">', '            <span class="glyphicon glyphicon-user glyphicon-xlg"></span>', '        </div>', '    </div>', '    <div class="media-body" ng-if="user">', '       <div class="media-heading">{{::user.name}}</div>' + '       <div><small><em>{{::user.username}}</em></small></div>' + '       <div><small>{{::user.email}}</small></div>' + '       <div><small>{{::user.org}}</small></div>' + '    </div>', '    <div class="media-body" ng-if="!user">', '       <div class="media-heading">Please Sign In</div>' + '       <div><small>Sign in to your GeoPlatform account or register a new account.</small></div>' + '    </div>', '  </div>', '  <hr/>', '  <div ng-if="user">', '    <button type="button" class="btn btn-sm btn-accent pull-right" ng-click="logout()">Sign Out</button>' + '    <a class="btn btn-sm btn-default" target="_blank" href="{{::IDP_BASE_URL}}/profile">Edit Details</a>' + '  </div>', '  <div ng-if="!user">', '    <button type="button" class="btn btn-sm btn-accent pull-right" ng-click="login()">Sign In</button>' + '    <a class="btn btn-sm btn-default" target="_blank" href="{{::IDP_BASE_URL}}/register">Register</a>' + '  </div>', '</div>'].join(' '),
            controller: ["$scope", "$rootScope", "$element", "$timeout", function controller($scope, $rootScope, $element, $timeout) {
                $scope.IDP_BASE_URL = Config.IDP_BASE_URL;
                $scope.user = AuthenticationService.getUser();
                $rootScope.$on('userAuthenticated', function (event, user) {
                    $timeout(function () {
                        $scope.user = user;
                    });
                });
                $rootScope.$on('userSignOut', function (event) {
                    $timeout(function () {
                        $scope.user = null;
                    });
                });
                $scope.login = function () {
                    AuthenticationService.login();
                };
                $scope.logout = function () {
                    AuthenticationService.logout();
                };
            }]
        };
    }]);
})(angular);