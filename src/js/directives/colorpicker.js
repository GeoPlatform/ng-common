(function(jQuery, angular) {

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

        if(rgb instanceof Object) {
            var r = parseInt(rgb.r, 10);
            var g = parseInt(rgb.g, 10);
            var b = parseInt(rgb.b, 10);

            if(r > 255 || r < 0 || (!r && r !== 0)) error = true;
            if(g > 255 || g < 0 || (!g && g !== 0)) error = true;
            if(b > 255 || b < 0 || (!b && b !== 0)) error = true;
        } else {
            var x = parseInt(rgb, 10);
            if(x > 255 || x < 0 || (!x && x !== 0)) error = true;
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
        var hex = c.toString(16), result = null;

        if(!isNaN(c) && !invalidRGB(c))
            result = hex.length == 1 ? '0' + hex : hex;

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

        if(r && g && b) result = '#' + r + g + b;

        return result;
    }

    /**
     * determines whether a hex value is valid
     *
     * @param hex string value
     * @returns hex value or null if hex is invalid
     */
    function validHex(hex) {
        return  (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(hex) || null;
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
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
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
            ngModel : '=',
            onChange: '&'
        },

        controller: function($timeout, $q) {
            
            // fired when an rgb value is changed
            this.changeRGB = function() {
                
                // make sure rgb color value is correct
                this.rgbError = invalidRGB(this.rgb);

                // parse it anyways leaving hex value blank until valid rbg
                this.ngModel = rgbToHex(this.rgb);

                // have to use timeout to make sure ngModel is set before
                // firing change event upstream
                var self = this;
                $timeout(function() {
                    self.onChange({value: self.ngModel});
                });

            };

            // fired when a hex value is changed
            this.changeHex = function() {
            
                // make sure the hex color value is correct
                if(!validHex(this.ngModel))
                    this.hexError = 'Invalid hex color value';
                else this.hexError = false;

                // parse it anyway leaving rgb values blank until it's a valid hex
                this.rgb = hexToRgb(this.ngModel);

                // have to use timeout to make sure ngModel is set before
                // firing change event upstream
                var self = this;
                $timeout(function() {
                    self.onChange({value: self.ngModel});
                });

            };


            this.$onInit = function() {
                this.rgb = hexToRgb(this.ngModel);
            };

                
        },

        template: 
        `
            <div class="gp-colorpicker">
                <div class="form-group hex-form-group" ng-class="{'has-error':$ctrl.hexError}">
                    <input type="text" class="form-control"
                        ng-model="$ctrl.ngModel" ng-keyup="$ctrl.changeHex()">
                </div>
                <div class="gp-colorpicker__wrapper">
                    <div colorpicker colorpicker-inline="true" colorpicker-parent="true" 
                        ng-model="$ctrl.ngModel" ng-change="$ctrl.changeHex()"></div>
                </div>
                <div class="form-group rgb-form-group" ng-class="{'has-error':$ctrl.rgbError}">
                    <input type="text" class="form-control"
                        placeholder="R" ng-model="$ctrl.rgb.r" ng-keyup="$ctrl.changeRGB()" title="R">
                    <input type="text" class="form-control"
                        placeholder="G" ng-model="$ctrl.rgb.g" ng-keyup="$ctrl.changeRGB()" title="G">
                    <input type="text" class="form-control"
                        placeholder="B" ng-model="$ctrl.rgb.b" ng-keyup="$ctrl.changeRGB()" title="B">
                </div>
            </div>
        `
    });

})(jQuery, angular);