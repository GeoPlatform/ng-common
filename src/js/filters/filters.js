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


    .filter('gpReliabilityGrade', function() {

        return function(arg) {

            let o = arg;
            if(typeof(o) === 'object') {
                if(o.statistics)        o = o.statistics.reliability || null;
                else if(o.reliability)  o = o.reliability;
                else                    o = null;
            }

            if(!isNaN(o)) {

                o = o*1;

                if(o===null || typeof(o)==='undefined') 
                    return 'X';
                else if(o > 90) return 'A';
                else if(o > 80) return 'B';
                else if(o > 70) return 'C';
                else if(o > 60) return 'D';
                else return 'F';

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
    })

    ;

})(jQuery, angular);