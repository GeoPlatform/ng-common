(function(jQuery, angular) {

    "use strict";



    function inputLinkFunction($scope, $element, $attrs, ngModelController, $timeout) {

        if(!$scope.type) $scope.type = "text";
        if($scope.required === 'true')
            $scope.required = true;
        else $scope.required = false;

        $scope.elId = 'input_' + Math.ceil(Math.random()*9999);
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

            if(input.hasClass('ng-invalid')) {
                if(input.hasClass("ng-empty"))
                    $scope.error = "This field requires a value";
                else
                    $scope.error = "Invalid value provided";
            } else
                $scope.error = null;

        }

        function update(newValue) {
            // call $parsers pipeline then update $modelValue
            ngModelController.$setViewValue(newValue);
            // update the local view
            ngModelController.$render();
        }



        // when model change, update our view (just update the div content)
        ngModelController.$render = function() {

            var value = ngModelController.$viewValue;

            //create copy of passed in model value that can be used
            // by the controls here allowing us to cancel and
            // commit changes at our own leisure
            $scope.innerValue = value;

            $scope.displayValue = value || $scope.placeholder || "No value provided";

            validate(value);
        };


        /* ------------- private methods --------------- */

        $scope.isReadOnly = function() {
            var t = typeof(this.readOnly);
            if(t === 'undefined') return false;
            if(t === 'string') return this.readOnly.toLowerCase() === 'true';
            if(t === 'number') return this.readOnly === 1;
            if(t === 'boolean') return this.readOnly;
            return false;
        };

        //enter edit mode
        $scope.edit = function() {
            if($scope.isReadOnly()) return;
            $scope.editing=true;
            //auto-focus on form-control when entering edit mode
            $timeout(function() { $element.find('.form-control').focus().select(); }, 200);
        };
        //leave edit mode (regardless of save() or cancel())
        $scope.done = function() {
            $scope.editing=false;
            $scope.error = null;
        };


        $scope.save = function() {
            //update display with new value
            update($scope.innerValue);
            $scope.done();
        };
        $scope.cancel = function() {
            //reset inner value
            $scope.innerValue = ngModelController.$viewValue;
            $scope.done();
        };


        $scope.onKeyPress = function($event, code) {
            // console.log("Pressed " + code);
            if((code === undefined || code === 0) && $event.which !== undefined)
                code = $event.which;
            if($scope.type === 'number') {

                //NOTE: Chrome does not catch Backspace onKeyPress, so it
                // skips this handler. FF does, so we need to watch for
                // backspace, delete, and numbers

                if (code === 8  ||   //backspace
                    code === 46 ||  //delete
                    (code >= 44 && code <= 57))    //comma, hyphen, period and numbers (0-9)
                    return;

                //NOTE: keyPress period is 46. keyDown it is 190

                $event.preventDefault();
                return false;               //ignore key
            }
        };
        $scope.onKeyUp = function($event, code) {
            // console.log("Up " + code);
            if((code === undefined || code === 0) && $event.which !== undefined)
                code = $event.which;
            if(code === 13 && !$scope.error) $scope.done();  //enter
            else if(code === 27)             $scope.cancel();//esc
            else {

                if(code !== 8 &&                //backspace
                    code !== 46 &&              //delete
                    code !== 190 &&             //period
                    (code < 48 || code > 90) && //letters and numbers (a-z, 0-9)
                    (code < 106 || code > 111) &&
                    (code < 186))
                    return;

                validate();
            }
        };


        $scope.$destroy = function() {
            $element.off('change');
        };
    }



    angular.module("gp-common")

    .directive('gpSlickFormInput', ['$timeout', function($timeout) {

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
            link: function($scope, $element, $attrs, ngModelController) {
                inputLinkFunction($scope, $element, $attrs, ngModelController, $timeout);
            }
        };

    }])


    .directive('gpSlickFormTextarea', ['$timeout', function($timeout) {

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
            link: function($scope, $element, $attrs, ngModelController) {
                inputLinkFunction($scope, $element, $attrs, ngModelController, $timeout);
            }
        };

    }])


    /**
     *
     * Notes:
     *  - use 'form form-inline' classes for editable date so the field doesn't take up whole line
     */
    .directive('gpSlickFormDate', ['$timeout', '$filter', function($timeout, $filter) {

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

            controller: function($scope, $element) {
                if(!$scope.format || $scope.format.length < 3) $scope.format = "mediumDate";
                $scope.inline = $element.hasClass("inline");
            },

            /**
             *
             */
            link: function($scope, $element, $attrs, ngModelController) {

                if($scope.required === 'true')
                    $scope.required = true;
                else $scope.required = false;

                $scope.elId = 'input_' + Math.ceil(Math.random()*9999);
                $scope.size = $scope.size || 'medium';
                $scope.type = $scope.type || 'text';


                function validate(value) {
                    // console.log("Validating '" + value + "'");

                    //check form-control for ng-invalid
                    var input = $element.find('.form-control');
                    if(input.hasClass('ng-invalid')) {
                        if(input.hasClass("ng-empty"))
                            $scope.error = "This field requires a value";
                        else
                            $scope.error = "Invalid value provided";
                    } else
                        $scope.error = null;
                }

                function update(newValue) {
                    // call $parsers pipeline then update $modelValue
                    ngModelController.$setViewValue(newValue);
                    // update the local view
                    ngModelController.$render();
                }


                // when model change, update our view (just update the div content)
                ngModelController.$render = function() {

                    var value = ngModelController.$viewValue;

                    //create copy of passed in model value that can be used
                    // by the controls here allowing us to cancel and
                    // commit changes at our own leisure
                    $scope.innerValue = value;

                    $scope.displayValue = value ? $filter('date')(ngModelController.$modelValue, $scope.format) :
                        $scope.placeholder || "No value provided";

                    validate(value);

                };




                $scope.isReadOnly = function() {
                    var t = typeof(this.readOnly);
                    if(t === 'undefined') return false;
                    if(t === 'string') return this.readOnly.toLowerCase() === 'true';
                    if(t === 'number') return this.readOnly === 1;
                    if(t === 'boolean') return this.readOnly;
                    return false;
                };


                //enter edit mode
                $scope.edit = function() {
                    if($scope.isReadOnly()) return;

                    $scope.editing=true;

                    //auto-focus on form-control when entering edit mode
                    // $timeout(function() { $element.find('.form-control').focus().select(); }, 200);
                };
                //leave edit mode (regardless of save() or cancel())
                $scope.done = function() {
                    $scope.opened = false;
                    $scope.editing=false;
                    $scope.error = null;
                };


                $scope.save = function() {
                    //update display with new value
                    update($scope.innerValue);
                    $scope.done();
                };
                $scope.cancel = function() {
                    //reset inner value
                    $scope.innerValue = angular.copy(ngModelController.$modelValue);
                    $scope.done();
                };





                $scope.open = function() {
                    //must wrap 'opened' variable in an object for
                    // angular to properly track its value changes
                    // from within children scope (ie, the date picker)
                    if (typeof($scope.uibopts) === 'undefined'){
                       $scope.uibopts = {};
                    }
                    $scope.uibopts.opened = true;
                };

                $scope.onKeyUp = function(code) {
                    if(code === 13) {   //enter
                        $scope.done();
                    } else if(code === 27) {    //esc
                        $scope.cancel();
                    }
                };
                $scope.onChange = function(date) {
                    if(isNaN(ngModelController.$modelValue) && $scope.required) {
                        $scope.error = "This field requires a value";
                    } else $scope.error = null;
                };
            }
        };

    }])



    .directive('gpSlickFormSelect', ['$timeout', function($timeout) {

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
            link: function($scope, $element, $attrs, ngModelController) {

                if(!$scope.type) $scope.type = "text";
                if($scope.required === 'true')
                    $scope.required = true;
                else $scope.required = false;

                $scope.elId = 'input_' + Math.ceil(Math.random()*9999);
                $scope.size = $scope.size || 'medium';
                $scope.type = $scope.type || 'text';

                var $select = null;

                function getSelect() {
                    if(!$select || !$select.length)
                        $select = $element.find('.form-control');
                    return $select;
                }


                if($scope.codeList) {
                    $scope.selectOptions = $scope.codeList.map(function(item) {
                        if(typeof(item) !== 'object' || !item.value)
                            return {value: item, label: item};
                        else if(!item.label)
                            return {value: item.value, label: item.value};
                        return item;
                    });
                } else
                    $scope.selectOptions = [];



                //listen for changes to the inner value by way of the form-control
                // $element.find('.form-control').on('change', function onChange() {
                //     validate($scope.innerValue);
                // });



                /* ------------- private methods --------------- */

                function validate() {

                    //check form-control for ng-invalid
                    var select = getSelect();

                    $scope.isDirty = select.hasClass('ng-dirty');

                    if(select.hasClass('ng-invalid')) {
                        if(select.hasClass("ng-empty"))
                            $scope.error = "This field requires a value";
                        else
                            $scope.error = "Invalid value provided";
                    } else
                        $scope.error = null;

                }

                function update(newValue) {
                    // call $parsers pipeline then update $modelValue
                    ngModelController.$setViewValue(newValue);
                    // update the local view
                    ngModelController.$render();
                }



                // when model change, update our view (just update the div content)
                ngModelController.$render = function() {

                    var value = ngModelController.$viewValue;

                    //@see https://github.com/angular/angular.js/commit/7fda214c4f65a6a06b25cf5d5aff013a364e9cef

                    //create copy of passed in model value that can be used
                    // by the controls here allowing us to cancel and
                    // commit changes at our own leisure
                    $scope.innerValue = value;

                    $scope.displayValue = $scope.placeholder || "No value provided";

                    if(value) {
                        //values are objects, not literals
                        var opt = $scope.selectOptions.find(function(o){return o.value==value;});
                        $scope.displayValue = opt.label;
                    }

                    validate();
                };


                /* ------------- private methods --------------- */

                $scope.onChange = function(value) {

                    // console.log("Changing value " + value + " vs " + $scope.innerValue);
                    $scope.innerValue = value;
                    $timeout(function() { validate(); }, 200);

                };

                $scope.onTypeaheadSelection = function($item, $model, $label, $event) {

                    $scope.innerValue = $item ? $item.value : null;
                    $timeout(function() { validate(); }, 200);

                };

                $scope.isReadOnly = function() {
                    var t = typeof(this.readOnly);
                    if(t === 'undefined') return false;
                    if(t === 'string') return this.readOnly.toLowerCase() === 'true';
                    if(t === 'number') return this.readOnly === 1;
                    if(t === 'boolean') return this.readOnly;
                    return false;
                };

                //enter edit mode
                $scope.edit = function() {
                    if($scope.isReadOnly()) return;
                    $scope.editing=true;
                    //auto-focus on form-control when entering edit mode
                    $timeout(function() { $select.focus().select(); }, 200);
                };
                //leave edit mode (regardless of save() or cancel())
                $scope.done = function() {
                    $scope.editing=false;
                    $scope.error = null;
                };


                $scope.save = function() {
                    //update display with new value
                    update($scope.innerValue);
                    $scope.done();
                };
                $scope.cancel = function() {
                    //reset inner value
                    $scope.innerValue = ngModelController.$viewValue;
                    $scope.done();
                };

                $scope.onKeyUp = function(code) {
                    if(code === 13 && !$scope.error) {   //enter
                        $scope.save();
                    } else if(code === 27) {    //esc
                        $scope.cancel();
                    }
                };

                $scope.onTypeaheadKeyUp = function(code) {
                    validate();
                };


                $scope.$destroy = function() {
                    // $element.off('change');
                };
            }
        };

    }])



    ;


    var INPUT_TEMPLATE = [

        '<div class="form-group form-group-slick">',

        '   <label for="{{::elId}}" class="control-label">{{::label}}</label>',

        '   <div class="input__display" ',
        '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error,\'text-lg\':size===\'large\'}" ',
        '       ng-show="!editing" ng-click="edit()" ',
        '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">',
        '      {{displayValue}}',
        '   </div>',

        '   <div ng-show="editing">',
        '      <div class="input-group" ng-class="{\'input-group-lg\':size===\'large\'}">',
        '           <div class="input-group-slick" ng-class="{\'input-group-slick--lg\':size===\'large\'}">',

        '               <span ng-if="icon" class="{{::icon}}"></span>',

        '               <input id="{{::elId}}" type="{{::type}}" class="form-control" ',
        '                   pattern="{{pattern}}" ',
        '                   ng-model="innerValue" ',
        '                   ng-required="{{required}}" ',
        '                   ng-keypress="onKeyPress($event, $event.keyCode)" ',
        '                   ng-keyup="onKeyUp($event, $event.keyCode)" >',

        '               <span class="indicators">',
        '                   <span class="is-valid gpicons check-circle"></span>',
        '                  <span class="is-invalid gpicons exclamation-circle"></span>',
        '              </span>',

        '           </div>',

        '          <span class="input-group-btn">',

        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{\'btn-lg\':size===\'large\'}"' ,
        '                   ng-click="cancel()" title="Cancel changes">',
        '                   <span class="gpicons ban-circle"></span>',
        '              </button>',

        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{disabled:!!error||!isDirty,\'btn-lg\':size===\'large\'}"' ,
        '                   ng-disabled="{{!!error}}" ',
        '                   ng-click="save()" title="Save changes">',
        '                  <span class="gpicons check"></span>',
        '               </button>',

        '           </span>',

        '       </div>',

        '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>',
        '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>',

        '   </div>',

        '</div>'

    ].join(' ');

    var TEXTAREA_TEMPLATE = [
        '<div class="form-group form-group-slick">',

        '   <label for="{{::elId}}" class="control-label">{{::label}}</label>',

        '   <div class="input__display" ',
        '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error,\'text-lg\':size===\'large\'}" ',
        '       ng-show="!editing" ng-click="edit()" ',
        '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">',
        '      {{displayValue}}',
        '   </div>',

        '   <div ng-show="editing">',
        '      <div class="input-group" ng-class="{\'input-group-lg\':size===\'large\'}">',
        '           <div class="input-group-slick" ng-class="{\'input-group-slick--lg\':size===\'large\'}">',

        '               <span ng-if="icon" class="{{::icon}}"></span>',

        '               <textarea rows="3" id="{{::elId}}" class="form-control" ',
        '                   ng-required="{{required}}" ng-model="innerValue"',
        '                   ng-keypress="onKeyPress($event, $event.keyCode)" ',
        '                   ng-keyup="onKeyUp($event, $event.keyCode)"></textarea>',

        '               <span class="indicators">',
        '                   <span class="is-valid gpicons check-circle"></span>',
        '                  <span class="is-invalid gpicons exclamation-circle"></span>',
        '              </span>',

        '           </div>',

        '          <span class="input-group-btn">',

        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{\'btn-lg\':size===\'large\'}"' ,
        '                   ng-click="cancel()" title="Cancel changes">',
        '                   <span class="gpicons ban-circle"></span>',
        '              </button>',

        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{disabled:!!error||!isDirty,\'btn-lg\':size===\'large\'}"' ,
        '                   ng-disabled="{{!!error}}" ',
        '                   ng-click="save()" title="Save changes">',
        '                  <span class="gpicons check"></span>',
        '               </button>',

        '           </span>',

        '       </div>',

        '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>',
        '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>',

        '   </div>',

        '</div>'
    ].join(' ');

    var DATE_TEMPLATE = [


        '<div class="form-group form-group-slick">',

        '   <label for="{{::elId}}" class="control-label">{{::label}}</label>',

        '   <div class="input__display" ',
        '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error}" ',
        '       ng-show="!editing" ng-click="edit()" ',
        '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">',
        '      {{displayValue}}',
        '   </div>',

        '   <div ng-show="editing">',
        '       <div uib-datepicker ng-required="{{required}}" ng-model="innerValue" datepicker-options="{showWeeks:false}"></div>',

        '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>',
        '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>',

        '       <button type="button" class="btn btn-default" ',
        '           ng-class="{\'btn-lg\':size===\'large\'}"' ,
        '           ng-click="cancel()" title="Cancel changes">',
        '           <span class="gpicons ban-circle"></span>',
        '      </button>',

        '      <button type="button" class="btn btn-default" ',
        '           ng-class="{disabled:!!error,\'btn-lg\':size===\'large\'}"' ,
        '          ng-disabled="{{!!error}}" ',
        '           ng-click="save()" title="Save changes">',
        '           <span class="gpicons check"></span>',
        '      </button>',

        '   </div>',

        '</div>'

    ].join(' ');

    var SELECT_TEMPLATE = [

        '<div class="form-group form-group-slick">',

        '   <label for="{{::elId}}" class="control-label">{{::label}}</label>',

        '   <div class="input__display" ',
        '       ng-class="{\'is-read-only\':isReadOnly(), \'has-error\':!!error}" ',
        '       ng-show="!editing" ng-click="edit()" ',
        '       title="{{!!error?error:(!isReadOnly()?\'Click to edit\':\'\')}}">',
        '      {{displayValue}}',
        '   </div>',

        '   <div ng-show="editing">',

        '      <div class="input-group" ng-class="{\'input-group-lg\':size===\'large\'}">',

        '           <div class="input-group-slick" ng-class="{\'input-group-slick--lg\':size===\'large\'}">',

        '               <span ng-if="icon" class="{{::icon}}"></span>',

        '               <select class="form-control input__field" ',
        '                   ng-if="codeList.length<=12" ',
        '                   ng-model="innerValue" ',
        '                   ng-options="opt.value as opt.label for opt in selectOptions" ',
        '                   ng-required="{{required}}" ',
        '                   ng-change="onChange(innerValue)" ',
        '                   ng-keyUp="onKeyUp($event.keyCode)" >',
        '                   <option value="">Select One</option>',
        '               </select>',

        '               <input type="text" class="form-control input__field" ng-if="codeList.length>12" ',
        '                   ng-model="innerValue" ',
        '                   ng-required="{{required}}" ',
        '                   ng-keyUp="onTypeaheadKeyUp($event.keyCode)" ',
        '                   typeahead-on-select="onTypeaheadSelection($item, $model, $label, $event)" ',
        '                   uib-typeahead="opt.value as opt.label for opt in selectOptions | filter:{value:$viewValue} | limitTo:12" ',
        '                   typeahead-min-length="0" ',
        '                   typeahead-editable="false">',

        '               <span class="indicators">',
        '                   <span class="is-valid gpicons check-circle"></span>',
        '                  <span class="is-invalid gpicons exclamation-circle"></span>',
        '              </span>',

        '           </div>',

        '          <span class="input-group-btn">',

        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{\'btn-lg\':size===\'large\'}"' ,
        '                   ng-click="cancel()" title="Cancel changes">',
        '                   <span class="gpicons ban-circle"></span>',
        '              </button>',

        '               <button type="button" class="btn btn-default" ',
        '                   ng-class="{disabled:!!error||!isDirty,\'btn-lg\':size===\'large\'}"' ,
        '                   ng-disabled="{{!!error}}" ',
        '                   ng-click="save()" title="Save changes">',
        '                  <span class="gpicons check"></span>',
        '               </button>',

        '           </span>',

        '       </div>',

        '       <div ng-if="error && error.length"><small class="help-block text-danger">{{error}}</small></div>',
        '       <div ng-if="help && help.length"><small class="help-block">{{help}}</small></div>',

        '   </div>',

        '</div>'

    ].join(' ');

})(jQuery, angular);
