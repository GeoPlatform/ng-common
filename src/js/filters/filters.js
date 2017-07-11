(function(jQuery, angular) {
    
    "use strict"; 
    
    angular.module("gp-common")

    /**
     * Custom filter to make label values visually helpful by 
     * replacing bad characters with spaces or meaningful equivalents
     */
    .filter('fixLabel', function() {
        return function(input) {
            input = input || '';
            return input.replace(/_/g,' ');
        };
    })

    .filter('pluralize', function() {
        return function(text) {
            if(!text || !text.length) return "";
            if(text.endsWith('ss')) return text + 'es'; //classes, etc
            if(text.endsWith('s')) return text;         //already plural
            return text + 's';
            //TODO support irregular words like "foot" -> "feet"
            // and words that need duplicate letters: "quiz" -> "quizzes"
        };
    })    

    .filter('capitalize', function() {
        return function(text) {
            return text[0].toUpperCase() + text.substring(1);
        };
    })


    .filter('facets', function() {

        return function(arr,facetName) {
            if(!facetName) return arr;
            if(!arr || !arr.length) return [];
            return arr.filter(function(f){return f.toLowerCase().startsWith(facetName + ":");})
                .map(function(f) {return f.substring(f.indexOf(':')+1, f.length);});
        };

    })

    .filter('joinBy', function () {
        return function (input,delimiter,emptyValue) {
            if(input && typeof(input.push) !== 'undefined' && input.length) 
                return input.join(delimiter || ', ');
            else             return emptyValue || '';
        };
    })



    .filter('defaultValue', function() {
        return function(text, defVal) {
            if(typeof(text)==='undefined' || !text.length) return defVal;
            return text;
        };
    })

    .filter('count', function() {
        return function(input) {
            if(typeof(input) !== 'undefined') {
                if(typeof(input.push) === 'function') 
                    return input.length;
                if(typeof(input) === 'object') {
                    if(typeof(Object.keys) !== 'undefined') {
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
    .filter('gpObjTypeMapper', function() {
        return function(str) {
            if(!str || typeof(str) !== 'string' || str.length === 0) 
                return str;
            
            var name = str;
            
            var idx = str.indexOf(":");
            if(~idx) name = str.substring(idx+1);

            if('VCard' === name) return 'Contact';
            return name;
            
        };
    })

    ;

})(jQuery, angular);