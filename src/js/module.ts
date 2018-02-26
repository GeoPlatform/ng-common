/// <reference path="../types.ts" />

(function(jQuery, angular) {

    "use strict";

    angular.module("gp-common", [])

    //Assumes a global object containing configuration values for GeoPlatform exists
    // prior to this module being declared
    // (using 'value' since config might change)
    .constant('GPConfig', (function(){
        // throw error if field missing
        function missing(field: string){
            throw `ng.common: Required field in GeoPlatform is missing: ${field}/n` +
                    `Please see https://github.com/GeoPlatform/ng-common/tree/develop for configuration details`;
        }

        // throw error if field invalid
        function invalid(value: string, expected: string) {
            throw `ng.common: A field you provided has an invalid value: ${value}/n` +
                    `Expected value was: ${expected}` +
                    `Please see https://github.com/GeoPlatform/ng-common/tree/develop for configuration details`
        }

        // General
        if(!GeoPlatform.env && !GeoPlatform.ENV && GeoPlatform.NODE_ENV){
            missing(`"env", "ENV", or "NODE_ENV"`)
        }
        // if(!GeoPlatform.portalUrl){ missing(`"portalUrl"`) }

        // Auth Settings
        if(GeoPlatform.AUTH_TYPE && (['token','grant'].indexOf(GeoPlatform.AUTH_TYPE) === -1)){
            // Not set is ok as well
            invalid(GeoPlatform.AUTH_TYPE, 'token | grant');
        }
        if(GeoPlatform.AUTH_TYPE === 'token'){
            if(!GeoPlatform.IDP_BASE_URL) missing('IDP_BASE_URL');
            if(!GeoPlatform.APP_ID) missing('APP_ID');
        }
        // Convert boolean implicits
        // All because !!'false' === true (WAT typing!!!)
        function toREALBoolean(val: any): boolean {
            return JSON.parse(val)
        }

        GeoPlatform.ALLOWIFRAMELOGIN = toREALBoolean(GeoPlatform.ALLOWIFRAMELOGIN || false)
        GeoPlatform.FORCE_LOGIN = toREALBoolean(GeoPlatform.FORCE_LOGIN || false)

        return GeoPlatform;
    })());

})(jQuery, angular);
