
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


    .service('KGHelper', [ 'KGFields', function(KGFields) {

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

