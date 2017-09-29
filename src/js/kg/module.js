
(function(jQuery, angular, Constants) {
    'use strict';

    angular.module('gp-common-kg', [])


    .constant('KGFields', [
        'purposes', 'functions', 'primaryTopics', 'secondaryTopics', 
        'primarySubjects', 'secondarySubjects', 'communities', 'audiences', 'places'
    ])


    .service('KGHelper', [ 'KGFields', function(KGFields) {

        return {
            calculate: function(kg) {
                if(!kg) return 0;
                let result = 0;
                angular.forEach(KGFields, prop => {
                    if(kg[prop] && kg[prop].length)
                        result += 10 + (kg[prop].length-1);
                    // result += kg[prop] ? kg[prop].length*5 : 0;
                });
                return result;
            }

        };
    }])



    /**
     * Service that queries the recommendation service endpoint 
     * exposed by UAL 
     */
    .service("RecommenderService", function($resource) {

        let baseUrl = Constants.ualUrl + '/api/recommender';
        return $resource(baseUrl, { }, {

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

    })

    
    ;


}) (jQuery, angular, GeoPlatform);

