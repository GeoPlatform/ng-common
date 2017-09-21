(function(jQuery, angular) {
    
    "use strict"; 
    
    angular.module("gp-common", [])

    //Assumes a global has been set
    // Don't use these... deprecated
    .constant('idspBaseUrl', GeoPlatform.idspUrl)
    .constant('idmBaseUrl', GeoPlatform.idmUrl)

    //Assumes a global object containing configuration values for GeoPlatform exists 
    // prior to this module being declared
    // (using 'value' since config might change)
    .value('GPConfig', GeoPlatform)
    .value('ngIdle', ngIdle)
    ;

})(jQuery, angular);
