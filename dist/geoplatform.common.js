"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (jQuery, angular) {

    "use strict";

    angular.module("gp-common", [])

    //Assumes a global has been set
    // Don't use these... deprecated
    .constant('idspBaseUrl', GeoPlatform.idspUrl).constant('idmBaseUrl', GeoPlatform.idmUrl)

    //Assumes a global object containing configuration values for GeoPlatform exists 
    // prior to this module being declared
    // (using 'value' since config might change)
    .value('GPConfig', GeoPlatform);
})(jQuery, angular);
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

    angular.module("gp-common")

    /**
     * Geolocation directive
     */
    .directive('gpGeolocation', ['$window', function ($window) {

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

    angular.module("gp-common")

    /**
     * Header directive for GeoPlatform Angular-based web applications
     * 
     * Uses transclusion to inject links into the nav-menu which floats to the right.
     * The menu already provides a "Home" link (to app home) and Sign In/User Info button.
     * The home link is not enabled by default but can be shown using 'show-home-link="true"' 
     * parameter on the directive.
     *
     * Note: any links transcluded should reference '$parent.user' to access authenticated user info
     * 
     * ex:
     * 
     *   <div gp-header brand="Map Manager" show-home-link="true" class="navbar-fixed-top">
     *     <li><a href="#/maps">Maps</a></li>
     *     <li><a href="#/galleries">Galleries</a></li>
     *     <li><a ng-if="$parent.user!==null" href="#/agol">AGOL</a></li>
     *     <li><a href="#/help">Help</a></li>
     *   </div>
     */
    .directive('gpHeader', ['GPConfig', 'AuthenticationService', function (Config, AuthenticationService) {

        return {

            scope: {
                brand: "@",
                showHomeLink: "@"
            },
            restrict: "AE",
            transclude: true,
            replace: true,
            template: ['<header>', '  <div class="container-fluid">', '    <div class="row">', '      <div class="col-md-12">', '        <ul role="menu" class="header__menu" gp-header-menu>', '          <li ng-if="showHomeLink">', '            <a href="#/goHome">', '                <span class="glyphicon glyphicon-home"></span> ', '                <span class="hidden-xs hidden-sm">Home</span>', '            </a>', '          </li>', '          <div class="transcluded"></div>', '          <li><span gp-login-button></span></li>', '        </ul>', '        <h4 class="brand">', '          <a href="{{portalUrl}}" title="Go to the GeoPlatform Home Page">', '            <span class="icon-gp"></span>', '            <span class="hidden-xs">GeoPlatform</span>', '          </a>', '          {{brand}}', '        </h4>', '      </div>', '    </div>', '  </div>', '</header>'].join(' '),

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
    }])

    /**
     * Header Menu
     *
     * Monitors the current page URL and updates the header links 
     * to highlight whichever one is associated with the current page
     *
     * Usage: 
     *
     *  <ul role="menu" class="header__menu" gp-header-menu>
     *      <li><a href="#/maps">Maps</a></li>
     *      <li><a href="#/galleries">Galleries</a></li>
     *      ...
     *  </ul>
     *
     */
    .directive('gpHeaderMenu', ['$location', function ($location) {

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
                        if (typeof m.thumbnail === 'string') //old map model
                            $element.attr('src', getUrl(m));else buildThumbnail(m); //open map model
                    }).catch(function (e) {
                        $element.attr('src', null);
                    });
                } else {
                    if (typeof map.thumbnail === 'string') //old map model
                        $element.attr('src', getUrl(map));else buildThumbnail(map);
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
                fallback: '@'
            },
            template: "\n                <div ng-show=\"hasThumbnail\" class=\"media embed-responsive embed-responsive-16by9\">\n                    <img class=\"embed-responsive-item\" on-img-error=\"{{fallback||'/img/img-404.jpg'}}\">\n                </div>\n            ",
            link: function link($scope, $element, $attrs) {

                var item = $scope.item;
                (item.$promise || $q.resolve(item)).then(function (obj) {

                    var url = $scope.fallback;

                    //maps
                    if (obj.type && obj.type === 'Map') url = Constants.ualUrl + "/api/maps/" + obj.id + "/thumbnail";
                    //maps as gallery items
                    else if (obj.assetType && obj.assetType === 'Map') url = Constants.ualUrl + "/api/maps/" + obj.assetId + "/thumbnail";
                        //other thumbnail'ed items with URLs
                        else if (obj.thumbnail && obj.thumbnail.url) url = obj.thumbnail.url;
                            //other thumbnail'ed items with base64 content
                            else if (obj.thumbnail && obj.thumbnail.contentData) {

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
                }).catch(function (e) {
                    $element.find('img').attr('src', $scope.fallback);
                });
            }
        };
    }]);
})(angular, GeoPlatform);
(function (angular) {

    "use strict";

    angular.module('gp-common')

    //
    .service('NotificationService', ['$rootScope', function ($rootScope) {
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
    }])

    // Usage: <gp-notifications />
    .directive('gpNotifications', ['$timeout', 'NotificationService', function ($timeout, NotificationService) {
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

    var PaginationController = function () {
        function PaginationController() {
            'ngInject';

            _classCallCheck(this, PaginationController);
        }

        _createClass(PaginationController, [{
            key: "$onInit",
            value: function $onInit() {
                var _this = this;

                if (!this.service) return;

                this.options = this.service.getPagination();

                var event = 'gp:browse:';
                if (this.eventKey) event = 'gp:browse:' + this.eventKey + ":";else event = 'gp:browse:objects:';

                this.listener = this.service.on(event + 'pagination', function () {
                    _this.options = _this.service.getPagination();
                });
            }
        }, {
            key: "$onDestroy",
            value: function $onDestroy() {

                //remove listener from service if exists
                if (this.listener) this.listener();

                this.service = null;
            }
        }, {
            key: "previous",
            value: function previous() {
                if (this.service && this.hasPrevious()) {
                    this.service.start(Math.max(0, this.options.start * 1 - this.options.size * 1), true);
                }
            }
        }, {
            key: "next",
            value: function next() {
                if (this.service && this.hasNext()) {
                    this.service.start(Math.min(this.options.total, this.options.start * 1 + this.options.size * 1), true);
                }
            }
        }, {
            key: "first",
            value: function first() {
                if (this.service && this.hasPrevious()) {
                    this.service.start(0, true);
                }
            }
        }, {
            key: "last",
            value: function last() {
                if (this.service && this.hasNext()) {
                    var lastPage = Math.floor(this.options.total / this.options.size);
                    this.setPage(lastPage);
                }
            }
        }, {
            key: "setPage",
            value: function setPage(arg) {
                if (this.service) {
                    var page = arg * 1;
                    this.service.start(page * (this.options.size * 1), true);
                }
            }
        }, {
            key: "setPageSize",
            value: function setPageSize(size) {
                if (this.service) {
                    this.service.size(size * 1, true);
                }
            }
        }, {
            key: "hasPrevious",
            value: function hasPrevious() {
                return this.options && this.options.start > 0;
            }
        }, {
            key: "hasNext",
            value: function hasNext() {
                return this.options && this.options.start + this.options.size < this.options.total;
            }
        }]);

        return PaginationController;
    }();

    angular.module('gp-common').component('gpPagination', {

        bindings: {
            service: '=',
            eventKey: '@'
        },

        controller: PaginationController,

        template: "\n            <div class=\"c-pagination\">\n                <div class=\"c-pagination__total\">{{$ctrl.options.total||0}} results</div>\n                <div class=\"c-pagination__page-size\">\n                    <span uib-dropdown>\n                        <a href=\"\" uib-dropdown-toggle title=\"Change the number of results returned\">\n                            {{$ctrl.options.size}} per page <span class=\"caret\"></span>\n                        </a>\n                        <ul class=\"dropdown-menu\" role=\"menu\">\n                            <li ng-repeat=\"size in $ctrl.options.sizeOptions track by $index\">\n                                <a ng-click=\"$ctrl.setPageSize(size)\">{{size}} per page</a>\n                            </li>\n                        </ul>\n                    </span>\n                </div>\n                <div class=\"c-pagination__pages\">\n                    <div class=\"c-pagination__button\" \n                        ng-class=\"{'is-disabled':!$ctrl.hasPrevious()}\"\n                        ng-click=\"$ctrl.first()\">\n                        <span class=\"glyphicon glyphicon-fast-backward\"></span>\n                    </div>\n                    <div class=\"c-pagination__button\" \n                        ng-class=\"{'is-disabled':!$ctrl.hasPrevious()}\"\n                        ng-click=\"$ctrl.previous()\">\n                        <span class=\"glyphicon glyphicon-backward\"></span>\n                    </div>\n                    <div class=\"c-pagination__page\">\n                        {{$ctrl.options.start+1}} - {{$ctrl.options.start+$ctrl.options.size}}\n                    </div>\n                    <div class=\"c-pagination__button\" \n                        ng-class=\"{'is-disabled':!$ctrl.hasNext()}\"\n                        ng-click=\"$ctrl.next()\">\n                        <span class=\"glyphicon glyphicon-forward\"></span>\n                    </div>\n                    <div class=\"c-pagination__button\" \n                        ng-class=\"{'is-disabled':!$ctrl.hasNext()}\"\n                        ng-click=\"$ctrl.last()\">\n                        <span class=\"glyphicon glyphicon-fast-forward\"></span>\n                    </div>\n                </div>\n            </div>\n        "

    });
})(jQuery, angular);
(function (jQuery, angular) {

    "use strict";

    angular.module('gp-common')

    //helper to determine size of window for responsive breakpoint purposes
    .provider('responsiveHelper', ["$windowProvider", function ($windowProvider) {

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
    }])

    //directive which appends appropriate responsive breakpoint classNames to the element
    // on which it's set
    .directive('gpResponsive', ['$window', 'responsiveHelper', function ($window, responsiveHelper) {

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
                code >= 44 && code <= 57) //comma, hyphen, period and numbers (0-9)
                    return;

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
    }])

    /**
     *
     * Notes:
     *  - use 'form form-inline' classes for editable date so the field doesn't take up whole line
     */
    .directive('gpSlickFormDate', ['$timeout', '$filter', function ($timeout, $filter) {

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
                        //enter
                        $scope.done();
                    } else if (code === 27) {
                        //esc
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
                        //enter
                        $scope.save();
                    } else if (code === 27) {
                        //esc
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

    angular.module("gp-common")

    /**
     * Custom filter to make label values visually helpful by 
     * replacing bad characters with spaces or meaningful equivalents
     */
    .filter('fixLabel', function () {
        return function (input) {
            input = input || '';
            return input.replace(/_/g, ' ');
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
    })

    /**
     *
     */
    .filter('gpObjTypeMapper', function () {
        return function (str) {
            if (!str || typeof str !== 'string' || str.length === 0) return str;

            var name = str;

            var idx = str.indexOf(":");
            if (~idx) name = str.substring(idx + 1);

            if ('VCard' === name) return 'Contact';
            return name;
        };
    });
})(jQuery, angular);

(function (angular, Constants) {

    "use strict";

    //fields list sent to MDR in order to have these properties for display in search results

    var FIELDS = ['created', 'modified', 'publishers', 'themes', 'description', 'extent'];

    //facets list sent to MDR in order to get aggregation numbers
    var FACETS = ['types', 'themes', 'publishers', 'serviceTypes', 'schemes', 'visibility', 'createdBy'];

    var SORT_OPTIONS = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }];

    //list of _options variables for mapping to parameters
    var VAR_TYPES = 'types';
    var VAR_THEMES = 'themes';
    var VAR_PUBLISHERS = 'publishers';
    var VAR_USER = 'user';
    var VAR_CREATED_BY = 'createdBy';
    var VAR_SERVICE_TYPES = 'svcTypes';
    var VAR_SCHEMES = 'schemes';
    var VAR_VISIBILITY = "visibility";
    var VAR_QUERY = 'query';
    var VAR_EXTENT = 'extent';

    //parameter names for various query constraints used in requests to MDR for results
    var PARAMETER_TYPE = 'type';
    var PARAMETER_THEME = 'theme.id';
    var PARAMETER_PUBLISHER = 'publisher.id';
    var PARAMETER_CREATED_BY = 'createdBy';
    var PARAMETER_CONTRIBUTED_BY = 'contributedBy';
    var PARAMETER_CREATOR = 'creator.id';
    var PARAMETER_SVC_TYPE = 'serviceType.id';
    var PARAMETER_IN_SCHEME = 'scheme.id';
    var PARAMETER_VISIBILITY = 'visibility';
    var PARAMETER_QUERY = 'q';
    var PARAMETER_EXTENT = 'bbox';
    // const PARAMETER_CONTRIBUTOR     = 'contributor.id';

    var PARAM_OPTIONS = [{ option: VAR_TYPES, parameter: PARAMETER_TYPE }, { option: VAR_THEMES, parameter: PARAMETER_THEME }, { option: VAR_PUBLISHERS, parameter: PARAMETER_PUBLISHER }, { option: VAR_USER, parameter: PARAMETER_CREATOR }, { option: VAR_CREATED_BY, parameter: PARAMETER_CREATED_BY }, { option: VAR_SERVICE_TYPES, parameter: PARAMETER_SVC_TYPE }, { option: VAR_SCHEMES, parameter: PARAMETER_IN_SCHEME }, { option: VAR_VISIBILITY, parameter: PARAMETER_VISIBILITY }, { option: VAR_QUERY, parameter: PARAMETER_QUERY }, { option: VAR_EXTENT, parameter: PARAMETER_EXTENT }];

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
            sort: "modified,desc", order: "asc",
            facets: {}
        };

        //list of field names to request in response
        var _fields = options && options.fields ? options.fields : FIELDS.slice(0);

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
                if (value && value.length) {
                    var isArr = typeof value.push !== 'undefined';
                    params[name] = isArr ? value.join(',') : value;
                } else {
                    delete params[name];
                }
                delete opts[po.option]; //remove from temp opts
            });

            //apply remaining options to query
            // these are not keyed with specific parameters (ie, custom params)
            angular.forEach(opts, function (value, name) {
                if (value && value.length) {
                    var isArr = typeof value.push !== 'undefined';
                    params[name] = isArr ? value.join(',') : value;
                } else {
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
            var facets = FACETS.slice(0);
            //not feasible yet because need both id and label to be useful
            // if(~_options.types.indexOf("skos:Concept"))
            //     facets.push("inScheme.label");
            params.includeFacet = facets.join(',');

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
                //TODO if content-type is application/json

                var error = {
                    label: response.data.error,
                    message: response.data.message
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
                SELECTED_REMOVED: eventKey + 'selected:removed'
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

            applyConstraints: function applyConstraints(obj) {
                _options[VAR_QUERY] = obj.query;
                _options[VAR_TYPES] = obj.types;
                _options[VAR_THEMES] = obj.themes;
                _options[VAR_PUBLISHERS] = obj.publishers;
                _options[VAR_USER] = obj.user;
                _options[VAR_CREATED_BY] = obj.createdBy;
                _options[VAR_SERVICE_TYPES] = obj.serviceTypes;
                _options[VAR_SCHEMES] = obj.schemes;
                _options[VAR_VISIBILITY] = obj.visibility;
                //do we need to set extent here too?
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

            /**
             * @param {array[string]} creators - ids of creators
             * @param {boolean} fireUpdate - 
             */
            setCreatedBy: function setCreatedBy(creators, fireUpdate) {
                setOption(VAR_CREATED_BY, creators, fireUpdate);
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
             * @param {array[string]} schemes - ids
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setSchemes: function setSchemes(schemes, fireUpdate) {
                setOption(VAR_SCHEMES, schemes, fireUpdate);
            },

            /**
             * @param {string} visibility - one of 'public' or 'private'
             * @param {boolean} fireUpdate
             */
            setVisibility: function setVisibility(visibility, fireUpdate) {
                setOption(VAR_VISIBILITY, visibility, fireUpdate);
            },

            setExtent: function setExtent(bboxStr) {
                setOption(VAR_EXTENT, bboxStr, true);
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
                notify(eventKey + 'selected', _selected);
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
                    //already selected, deselect it

                    var idx = _selected.indexOf(existing);
                    if (idx >= 0) {
                        _selected.splice(idx, 1);
                        notify(eventKey + 'selected:removed', existing);
                    }
                } else {
                    //not selected, select it

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
                var _this2 = this;

                angular.forEach(_results, function (obj) {
                    if (!_this2.isSelected(obj.id)) _selected.unshift(obj);
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
                if (!f) //this facet category not set yet
                    _options.facets[category] = value;else {
                    //this facet category already set
                    if (f === value) {
                        //this facet value already set
                        //unset it
                        delete _options.facets[category];
                    } else {
                        //this facet value not set
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

    angular.module('gp-common')

    //generic browse service
    .service("BrowseObjectsService", ['$rootScope', '$timeout', '$resource', BrowseObjectsService])

    //factory for creating specific browse services
    .factory("BrowseServiceFactory", ['$rootScope', '$timeout', '$resource', 'BrowseObjectsService', BrowseServiceFactory]);

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

    var SocketService = function () {
        SocketService.$inject = ["url", "options"];
        function SocketService(url, options) {
            'ngInject';

            var _this3 = this;

            _classCallCheck(this, SocketService);

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
                //TODO validate URL with regex?
                console.log("No web socket URL configured for this app to communicate with");
                return;
            }

            //make connection
            this.socket = io.connect(url);

            //listen for the init event indicating connection has been made
            // and to get the socket's id from the server
            this.socket.on("init", function (evt) {
                _this3.socketId = evt.id;
            });

            //if unable to connect
            this.socket.on('error', function () {
                console.log("Unable to connect to " + url + " with websockets");
            });
        }

        /**
         *
         */


        _createClass(SocketService, [{
            key: "getId",
            value: function getId() {
                return this.socketId;
            }

            /**
             * @param {string} eventName
             * @param {Function} callback
             * @return {Function} to remove the listener
             */

        }, {
            key: "on",
            value: function on(eventName, callback) {
                var _this4 = this;

                if (!this.socket) return function () {};
                //add the listener to the socket
                this.socket.on(eventName, callback);
                //return an 'off' function to remove the listener
                return function () {
                    _this4.socket.off(eventName, callback);
                };
            }

            /**
             *
             */

        }, {
            key: "emit",
            value: function emit(eventName, data, callback) {
                if (!this.socket) return;
                this.socket.emit(eventName, data, callback);
            }

            /**
             * Closes this service's socket
             */

        }, {
            key: "close",
            value: function close() {
                var _this5 = this;

                //if this app was tracking an obj, 
                // notify listeners that it is no longer
                for (var event in this.tracking) {
                    if (this.tracking.hasOwnProperty(event)) {
                        var tracks = this.tracking[event];
                        if (tracks && tracks.length) {
                            /* jshint ignore:start */
                            angular.forEach(tracks, function (id) {
                                _this5.end(event, id);
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
            }

            /**
             * @param {string} event - name of the event being started
             * @param {string} objId - identifier of the item being tracked
             */

        }, {
            key: "begin",
            value: function begin(event, objId) {
                var _this6 = this;

                this.tracking[event] = this.tracking[event] || [];
                this.tracking[event].push(objId);

                var room = objId + "_" + event.toLowerCase();

                this.join(room, function () {
                    _this6.socket.emit(event, room, _this6.socketId, true);
                });
            }

            /**
             * @param {string} event - name of the event being ended
             * @param {string} objId - identifier of the item being tracked
             */

        }, {
            key: "end",
            value: function end(event, objId) {
                var _this7 = this;

                this.tracking[event] = this.tracking[event] || [];
                if (!this.tracking[event].length) return; //empty, ignore request

                var idx = this.tracking[event].indexOf(objId);
                if (idx < 0) //not found, ignore request

                    //remove tracker
                    this.tracking[event].splice(idx, 1);

                //send event to server about client stopping it's tracking
                var room = objId + "_" + event.toLowerCase();
                this.socket.emit(event, room, this.socketId, false, function () {
                    _this7.leave(room);
                });
            }

            /**
             *
             */

        }, {
            key: "join",
            value: function join(objId, callback) {
                this.emit('join', objId, callback);
            }

            /**
             *
             */

        }, {
            key: "leave",
            value: function leave(objId, callback) {
                this.emit('leave', objId, callback);
            }
        }]);

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
            var existing = $window.onbeforeunload;
            $window.onbeforeunload = function (e) {
                onClose(e);
                return existing(e);
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
(function (angular) {

    'use strict';

    //flag on whether we're in dev env

    function isDEV() {
        return "localhost" === window.location.hostname || ~window.location.hostname.indexOf("192.168") || ~window.location.hostname.indexOf("10.0");
    }

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
    angular.module('gp-common')

    /**
     * Authentication Service
     * 
     * Because the auth service redirects the page to the IDM portal
     * and WMV is reloaded once the login/logout processes are complete,
     * there's no need to bind listeners informing other components of 
     * an auth change.
     *
     * Inside "DEV", you should close and re-open any components' widgets
     * to get current auth status.
     */
    .service('AuthenticationService', ['$q', '$http', 'GPConfig', function ($q, $http, Config) {

        // console.log("IDSP Base Url: " + Config.idspUrl);

        function User(opts) {
            for (var p in opts) {
                this[p] = opts[p];
            }
            if (!this.id && this.username) this.id = this.username;

            this.toJSON = function () {
                return {
                    id: this.id,
                    username: this.username,
                    name: this.name,
                    email: this.email,
                    org: this.org
                };
            };
            this.clone = function () {
                return new User(this.toJSON());
            };
            this.compare = function (arg) {
                if (arg instanceof User) {
                    return this.id === arg.id;
                } else if ((typeof arg === "undefined" ? "undefined" : _typeof(arg)) === 'object') {
                    return typeof arg.id !== 'undefined' && arg.id === this.id;
                }
                return false;
            };
        }

        var TEST_USER = new User({
            id: "tester",
            username: "tester",
            email: "tester@geoplatform.us",
            name: "John Test",
            org: "Other"
        });

        var _user = null;

        if (isDEV()) {

            /*
             * If testing when user is not logged in, inject the following before
             *  this ng-common library is included in the page:
             * 
             *     GeoPlatform.TEST_NO_AUTH = true;
             * 
             *  but be sure to inject AFTER the GeoPlatform configuration object exists!
             */
            if (GeoPlatform && GeoPlatform.TEST_NO_AUTH) _user = null;else _user = TEST_USER.clone();
        }

        var STATUS = {
            NONE: 0,
            INITIALIZING: -1, //auth check in progress
            INITIALIZED: 1 //auth check completed
        };

        /**
         * Authentication Service
         */
        var Service = function Service() {

            var self = this;

            this.status = STATUS.NONE;

            //$q version of getUser
            this.getUserQ = function () {
                var deferred = $q.defer();
                this.getUser(function (user) {
                    deferred.resolve(user);
                });
                return deferred.promise;
            };

            /**
             * If the callback parameter is specified, this method
             * will return undefined. Otherwise, it returns the user (or null).
             *
             * @param callback optional function to invoke with the user
             * @return object representing current user
             */
            this.getUser = function (callback) {
                if (callback && typeof callback === 'function') {

                    // console.log("Getting user info: " + self.status + ", " + JSON.stringify(_user||{empty:true}));

                    //if already checked, return what we have
                    if (self.status === STATUS.INITIALIZED) callback(_user);
                    //if not in process of checking, check
                    else if (self.status !== STATUS.INITIALIZING) {
                            //if hasn't been checked for auth yet, do that now
                            self.check().then(function (_user) {
                                self.status = STATUS.INITIALIZED;
                                callback(_user);
                            }, function () {
                                self.status = STATUS.INITIALIZED;
                                callback(null);
                            });
                        }
                        //if in process of checking, wait until it finishes
                        else {
                                setTimeout(function () {
                                    self.getUser(callback);
                                }, 500);
                            }
                    return;
                }
                return _user;
            };

            /**
             * Redirects the page to the login site
             */
            this.login = function () {
                if (isDEV() && !(GeoPlatform && GeoPlatform.TEST_NO_AUTH)) {
                    _user = TEST_USER.clone();
                    return _user;
                }
                var current = window.location.href;
                window.location = Config.idspUrl + '/module.php/core/as_login.php?AuthId=geosaml&ReturnTo=' + encodeURIComponent(current);
            };

            /**
             * Redirects the page to the logout site
             */
            this.logout = function () {
                if (isDEV()) {
                    _user = null;
                    return _user;
                }
                var current = window.location.href;
                window.location = Config.idspUrl + '/module.php/core/as_logout.php?AuthId=geosaml&ReturnTo=' + encodeURIComponent(current);
            };

            /**
             * Queries simplesamlphp if the current session is authenticated
             * @return promise - then(function(user) {}, function(response){})
             */
            this.check = function () {

                var deferred = $q.defer();

                if (isDEV()) {
                    // console.log("Dev env");
                    setTimeout(function () {
                        deferred.resolve(_user);
                    }, 1000);
                    return deferred.promise;
                }

                self.status = STATUS.INITIALIZING;

                //check authentication on load
                var promise = $http.get(Config.idspUrl + '/authenticategeosaml.php?as=geosaml');
                promise.then(function (response) {

                    var content = response.data ? response.data : response;

                    // console.log("Received from SP: " + content);
                    if (typeof content === 'string') {
                        try {
                            content = JSON.parse(content);
                        } catch (e) {
                            deferred.reject(e);
                            return;
                        }
                    }

                    if (content.Success) {
                        //authenticated
                        _user = new User({
                            id: content.name[0],
                            username: content.name[0],
                            email: content.mail[0],
                            name: content.first_name[0] + ' ' + content.last_name[0],
                            org: content.organization[0]
                        });
                        // console.log("Authenticated user: " + JSON.stringify(_user));
                    } else {
                        _user = null; //not authenticated
                        // console.log("Failed to authenticate user");
                    }

                    deferred.resolve(_user);
                }, function (data, status, headers) {
                    // failed check
                    // console.log("Authentication call failed");
                    deferred.reject(data);
                }).catch(function (e) {
                    // console.log("Authentication check caught an error: " + e.message);
                    deferred.reject(e.message);
                });

                return deferred.promise;
            };

            //=====================================================

            //initialize with auth check
            this.check().then(function (user) {
                self.status = STATUS.INITIALIZED;
            }, function (err) {
                self.status = STATUS.INITIALIZED;
            }).catch(function (e) {
                // console.log("Initial auth check errored");
            });
        };

        return new Service();
    }]).directive('gpLoginButton', ['$timeout', 'AuthenticationService', 'GPConfig', function ($timeout, AuthenticationService, Config) {
        return {
            scope: {
                minimal: '@'
            },
            replace: true,
            template: ['<div class="btn-account btn-group">' +

            //not logged in
            '  <a class="btn btn-link" ng-click="login()" ng-if="!user">Sign In</a>' +

            //logged in
            '  <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" ' + '   aria-expanded="false" ng-if="user">' + '     <span class="glyphicon glyphicon-user"></span> ' + '     <span class="hidden-xs">{{::user.name}}</span> ' + '     <span class="caret"></span>' + '  </button>' + '  <ul class="dropdown-menu dropdown-menu-right" role="menu" ng-if="user">' + '    <li class="account-details">' + '      <div class="media">' + '        <div class="media-left">' + '          <div class="media-object">' + '            <span class="glyphicon glyphicon-user glyphicon-xlg"></span>' + '          </div>' + '        </div>' + '        <div class="media-body">' + '          <div class="media-heading">{{::user.name}}</div>' + '          <div><em>{{::user.username}}</em></div>' + '          <div>{{::user.email}}</div>' + '          <div>{{::user.org}}</div>' + '        </div>' + '      </div>' + '    </li>' + '    <li class="divider"></li>' + '    <li><a href="{{::idpUrl}}/modifyuser.html">Edit Info</a></li>' + '    <li><a href="{{::idpUrl}}/changepassword.html">Change Password</a></li>' + '    <li><a href ng-click="logout()">Sign Out</a></li>' + '  </ul>' + '</div>'].join(' '),
            controller: ["$scope", "$element", function controller($scope, $element) {

                if ($scope.minimal === 'true') $scope.minimal = true;
                if ($scope.minimal !== true) $scope.minimal = false;

                $scope.idpUrl = Config.idmUrl;
                // console.log("IDM Base Url: " + Config.idmUrl);

                AuthenticationService.getUser(function (user) {
                    $timeout(function () {
                        $scope.user = user;
                    }, 100);
                });

                $scope.login = function () {
                    $scope.user = AuthenticationService.login();
                };

                $scope.logout = function () {
                    $scope.user = AuthenticationService.logout();
                };

                //watch user for changes (timeouts)
                var watcher = $scope.$watch(function () {
                    return AuthenticationService.getUser();
                }, function (newUser) {
                    $scope.user = newUser;
                });

                $scope.$on('$destroy', function () {
                    watcher(); //destroy watcher
                });
            }]
        };
    }]).directive('gpAccountDetails', ['$timeout', 'AuthenticationService', 'GPConfig', function ($timeout, AuthenticationService, Config) {

        return {
            scope: {},
            replace: true,
            template: ['<div>' + '  <div class="media">', '    <div class="media-left">', '        <div class="media-object">', '            <span class="glyphicon glyphicon-user glyphicon-xlg"></span>', '        </div>', '    </div>', '    <div class="media-body" ng-if="user">', '       <div class="media-heading">{{::user.name}}</div>' + '       <div><small><em>{{::user.username}}</em></small></div>' + '       <div><small>{{::user.email}}</small></div>' + '       <div><small>{{::user.org}}</small></div>' + '    </div>', '    <div class="media-body" ng-if="!user">', '       <div class="media-heading">Please Sign In</div>' + '       <div><small>Sign in to your GeoPlatform account or register a new account.</small></div>' + '    </div>', '  </div>', '  <hr/>', '  <div ng-if="user">', '    <button type="button" class="btn btn-sm btn-accent pull-right" ng-click="logout()">Sign Out</button>' + '    <a class="btn btn-sm btn-default" href="{{::idpUrl}}/modifyuser.html">Edit Details</a>' + '  </div>', '  <div ng-if="!user">', '    <button type="button" class="btn btn-sm btn-accent pull-right" ng-click="login()">Sign In</button>' + '    <a class="btn btn-sm btn-default" href="{{::idpUrl}}/registeruser.html">Register</a>' + '  </div>', '</div>'].join(' '),
            controller: ["$scope", "$element", function controller($scope, $element) {

                $scope.idpUrl = Config.idmUrl;

                AuthenticationService.getUser(function (user) {
                    $timeout(function () {
                        $scope.user = user;
                    }, 100);
                });

                $scope.login = function () {
                    $scope.user = AuthenticationService.login();
                };

                $scope.logout = function () {
                    $scope.user = AuthenticationService.logout();
                };

                //watch user for changes (timeouts)
                var watcher = $scope.$watch(function () {
                    return AuthenticationService.getUser();
                }, function (newUser) {
                    $scope.user = newUser;
                });

                $scope.$on('$destroy', function () {
                    watcher(); //destroy watcher
                });
            }]
        };
    }]);
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
                        offsetMS = 1000 * 60 * 60;break;
                    case 'day':
                        offsetMS = 1000 * 60 * 60 * 24;break;
                    case 'week':
                        offsetMS = 1000 * 60 * 60 * 24 * 7;break;
                    case 'month':
                        offsetMS = 1000 * 60 * 60 * 24 * 31;break;
                    case 'year':
                        offsetMS = 1000 * 60 * 60 * 24 * 365;break;
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
                        offsetMS = 1000 * 60 * 60;break;
                    case 'day':
                        offsetMS = 1000 * 60 * 60 * 24;break;
                    case 'week':
                        offsetMS = 1000 * 60 * 60 * 24 * 7;break;
                    case 'month':
                        offsetMS = 1000 * 60 * 60 * 24 * 31;break;
                    case 'year':
                        offsetMS = 1000 * 60 * 60 * 24 * 365;break;
                }
            } else if (type === 'number') {
                offsetMS = threshold;
            } else return this;

            var d = this;
            return new Date(d.getTime() + Math.floor(Math.random() * offsetMS));
        };
    }
})();