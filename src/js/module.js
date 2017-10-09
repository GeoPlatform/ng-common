(function(jQuery, angular) {
    
    "use strict"; 
    
    angular.module("gp-common", [])

    //Assumes a global object containing configuration values for GeoPlatform exists 
    // prior to this module being declared
    // (using 'value' since config might change)
    .value('GPConfig', GeoPlatform)
    ;

})(jQuery, angular);
