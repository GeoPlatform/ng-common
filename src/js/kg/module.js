
/**
 *
 * KnowledgeGraph property on RIM Asset renamed to Classifiers
 *
 */


(function(jQuery, angular, Constants) {
    'use strict';

    angular.module('gp-common-kg', [])


    .constant('KGFields', [
        'purposes', 'functions', 'primaryTopics', 'secondaryTopics',
        'primarySubjects', 'secondarySubjects', 'communities', 'audiences',
        'places', 'categories'
    ])


    .service('KGHelper', [ 'KGFields', 'RecommenderServiceFactory',
        function(KGFields, RecommenderServiceFactory) {

        return {
            calculate: function(kg) {
                if(!kg) return 0;
                let result = 0;
                angular.forEach(KGFields, prop => {
                    if(kg[prop] && kg[prop].length)
                        result += 7 + Math.floor( (kg[prop].length-1) / 2 );
                    // result += kg[prop] ? kg[prop].length*5 : 0;
                });
                return result;
            },

            getService: function(type) {
                return RecommenderServiceFactory(type);
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
            },

            createCustom: {
                url: Constants.ualUrl + '/api/items',
                method: "POST"
            }

        });

    })



    /**
     * Factory for creating services that query the recommendation
     * service endpoint exposed by UAL and includes object type
     * parameter based upon owner of KG
     */
    .factory("RecommenderServiceFactory", function($resource) {

        return function(type) {

            let baseUrl = Constants.ualUrl + '/api/recommender';
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
                },

                createCustom: {
                    url: Constants.ualUrl + '/api/items',
                    method: "POST"
                },
                getCustomUri: {
                    url: Constants.ualUrl + '/api/utils/uri',
                    method: "POST",
                    responseType: 'text',
                    transformResponse: function(data) {
                        return { uri: data };
                    }
                }

            });

        };

    })



    /**
     * Component for rendering a brief % of completion
     *
     */
    .component('kgCompletionDisplay', {

        bindings: {
            ngModel: '<' // the Asset containing the knowledge graph ('classifiers') property
        },

        controller: function($rootScope, KGHelper) {

            this.$onInit = function() {

                this.update();

                this.listener = $rootScope.$on('gp:kg:updated', (event, item) => {
                    if(item && item.id === this.id) {
                        //in case kg didn't exist,
                        if(!this.ngModel.classifiers)
                            this.ngModel.classifiers = item.classifiers;
                        this.value = KGHelper.calculate(this.ngModel.classifiers);
                    }
                });

            };

            this.$onChanges = function() {
                this.update();
            };

            this.$onDestroy = function() {
                this.listener();
                this.listener = null;
            };

            this.update = function() {

                if(this.ngModel.$promise && !this.ngModel.$resolved) {
                    this.ngModel.$promise.then( model => { this.update(); });
                    return;
                }

                this.id = this.ngModel ? this.ngModel.id : null;
                this.value = KGHelper.calculate(this.ngModel.classifiers);
            };

        },

        template:
        `
            <span>{{$ctrl.value||0}}%</span>
            <span class="gpicons dashboard"></span>
        `

    })
    ;


}) (jQuery, angular, GeoPlatform);
