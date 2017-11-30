
/**
 * 
 * KnowledgeGraph property on RIM Asset renamed to Classifiers
 *
 */


(function(jQuery, angular, Constants) {
    'use strict';

    angular.module('gp-common-kg', [])

    // .constant('KGClassifiers', [
    //     { 
    //         label: 'purpose', 
    //         description: 'The intended use or reason for the Object (i.e., layer, map, gallery) e.g., environmental impact of an oil spill.',
    //         property: 'purposes',
    //         section: 'Purpose' 
    //     },
    //     { 
    //         label: 'primarySubject', 
    //         description: 'The selected things, events, or concepts forming part of or represented by the Object. e.g., Deep Water Horizon oil rig, oil slick extent, oil slick movement over time, predicted oil slick movement, impacted sites, impact severity.',
    //         property: 'primarySubjects',
    //         section: 'Scope' 
    //     },
    //     { 
    //         label: 'secondarySubject', 
    //         description: 'Second-order subjects derived by machine processing/ analysis of the target Object',
    //         property: 'secondarySubjects',
    //         section: 'Scope' 
    //     },
    //     { 
    //         label: 'primaryTopic', 
    //         description: 'The central branch of knowledge or theme pertaining to the thing, concept, situation, issue, or event of interest. e.g., environmental impact of oil spill.',
    //         property: 'primaryTopics',
    //         section: 'Scope' 
    //     },
    //     { 
    //         label: 'secondaryTopic', 
    //         description: 'Second-order topics derived by machine processing/ analysis of the target Object',
    //         property: 'secondaryTopics',
    //         section: 'Scope' 
    //     },
    //     { 
    //         label: 'category', 
    //         description: 'The type or category of the Object.  e.g., topographic map, elevation layer',
    //         property: 'categories',
    //         section: 'Scope' 
    //     },
    //     { 
    //         label: 'community', 
    //         description: 'The GeoPlatform community this Object was produced for. e.g., "Ecosystems and Biodiversity" community',
    //         property: 'communities',
    //         section: 'Scope' 
    //     },
    //     { 
    //         label: 'place', 
    //         description: 'The central locale or common names for the place where the Subjects of the Object occur. e.g.,  USA/Gulf Coast',
    //         property: 'places',
    //         section: 'Scope' 
    //     },
    //     { 
    //         label: 'function', 
    //         description: 'The business actions, activities, or tasks this Object is intended to support (i.e., the role it plays in supporting an activity).  e.g., environmental impact assessment.',
    //         property: 'functions',
    //         section: 'Fitness for Use' 
    //     },
    //     { 
    //         label: 'audience', 
    //         description: 'The group of people for which this Object was intended to be used. e.g., general public, disaster recovery personnel, Congress.',
    //         property: 'audiences',
    //         section: 'Social Context' 
    //     }
    // ])

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
            <span class="glyphicon glyphicon-dashboard"></span>
        `

    })
    ;


}) (jQuery, angular, GeoPlatform);

