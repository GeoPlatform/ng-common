

( function(angular, Constants) {

    'use strict';



    class KGEditor {

        constructor ($rootScope, $element, KGFields, KGHelper) {
            'ngInject';
            this.$rootScope = $rootScope;
            this.$element = $element;
            this.fields = KGFields.slice(0);
            this.helper = KGHelper;
        }

        $onInit () {
            this.displayOptions = { };
            this.completion = 0;

            this.service = this.helper.getService(this.ngModel.type);

            this.descriptions = {
                purpose: 'The intended use or reason for the Object (i.e., layer, map, gallery) e.g., environmental impact of an oil spill.',
                'function': 'The business actions, activities, or tasks this Object is intended to support (i.e., the role it plays in supporting an activity).  e.g., environmental impact assessment.',
                audience: 'The group of people for which this Object was intended to be used. e.g., general public, disaster recovery personnel, Congress.',
                community: 'The GeoPlatform community this Object was produced for. e.g., "Ecosystems and Biodiversity" community',
                place: 'The central locale or common names for the place where the Subjects of the Object occur. e.g.,  USA/Gulf Coast',
                category: 'The type or category of the Object.  e.g., topographic map, elevation layer',
                primarySubject: 'The selected things, events, or concepts forming part of or represented by the Object. e.g., Deep Water Horizon oil rig, oil slick extent, oil slick movement over time, predicted oil slick movement, impacted sites, impact severity.',
                secondarySubject: 'Second-order subjects derived by machine processing/ analysis of the target Object',
                primaryTopic: 'The central branch of knowledge or theme pertaining to the thing, concept, situation, issue, or event of interest. e.g., environmental impact of oil spill.',
                secondaryTopic: 'Second-order topics derived by machine processing/ analysis of the target Object'
            };

            if(!this.ngModel.classifiers)
                this.ngModel.classifiers = { };

            this.calculatePercentage();
        }

        $onDestroy () {
            this.$rootScope = null;
            this.ngModel = null;
            this.helper = null;
            this.fields = null;
            this.service = null;
        }

        /**
         * @param {string} property - name of KG property being modified
         * @param {array[object]} values - new values to assign to the property (includes old values)
         */
        onChange (property, values) {
            // console.log("Changed " + property + " with " + (values?values.length:0) + " values");
            this.ngModel.classifiers[property] = values;
            this.calculatePercentage();
        }

        /**
         * @param {string} classifier - KG property whose value has been activated
         * @param {object} value - selected value being activated
         */
        onValueClick (classifier, value) {
            if(this.onActivate) {
                this.onActivate({classifier: classifier, value: value});
            }
        }

        /**
         *
         */
        calculatePercentage () {
            this.completion = this.helper.calculate(this.ngModel.classifiers);
        }
    }



    angular.module('gp-common-kg').component('kgEditor', {
        require: {
            // formCtrl: '^form',
            ngModelCtrl: 'ngModel'
        },
        bindings: {
            ngModel: '=',       //object containing the KG
            onActivate: '&'     //function to invoke on KG item activation (click)
        },
        controller: KGEditor,
        template:
        `
            <div class="c-kg-editor">
                <div class="c-kg-editor__header l-flex-container flex-justify-between flex-align-center">
                    <div class="flex-1 m-article">
                        <div class="m-article__heading">Knowledge Graph</div>
                        <div class="u-text--sm">
                            Knowledge graphs (KGs) are formed from classifiers for several dimensions of GeoPlatform items
                            (layers, maps, galleries, etc), including <em>Purpose</em>, <em>Scope</em>,
                            <em>Fitness for Use</em>, and <em>Social Context</em>.
                            <br>
                            <br>
                            Knowledge graphs are used to answer questions about items, such as:
                            <ul>
                            <li>Why was the item created?</li>
                            <li>Why is it useful for others?</li>
                            <li>Why is it appropriate to be used?</li>
                            </ul>
                        </div>
                    </div>
                    <gp-progress-circle ng-model="$ctrl.completion" class="u-mg-left--xlg u-mg-right--xlg"></gp-progress-circle>
                </div>

                <div class="c-kg-editor__content">

                    <div class="m-article">
                        <div class="m-article__heading">Purpose</div>
                        <div class="m-article__desc c-kg-editor__section">
                            <kg-section
                                service="$ctrl.service"
                                ng-model="$ctrl.ngModel.classifiers.purposes"
                                on-change="$ctrl.onChange('purposes', values)"
                                on-activate="$ctrl.onValueClick('purposes', value)"
                                type="Purpose"
                                label="Purpose"
                                description="{{$ctrl.descriptions.purpose}}">
                            </kg-section>
                        </div>
                    </div>


                    <div class="m-article">
                        <div class="m-article__heading">Scope</div>
                        <div class="m-article__desc c-kg-editor__section">
                            <kg-section
                                service="$ctrl.service"
                                ng-model="$ctrl.ngModel.classifiers.primaryTopics"
                                on-change="$ctrl.onChange('primaryTopics', values)"
                                on-activate="$ctrl.onValueClick('primaryTopics', value)"
                                type="Topic"
                                label="Primary Topics"
                                description="{{$ctrl.descriptions.primaryTopic}}">
                            </kg-section>
                            <kg-section
                                service="$ctrl.service"
                                ng-model="$ctrl.ngModel.classifiers.secondaryTopics"
                                on-change="$ctrl.onChange('secondaryTopics', values)"
                                on-activate="$ctrl.onValueClick('secondaryTopics', value)"
                                type="Topic"
                                label="Secondary Topics"
                                description="{{$ctrl.descriptions.secondaryTopic}}">
                            </kg-section>
                            <kg-section
                                service="$ctrl.service"
                                ng-model="$ctrl.ngModel.classifiers.primarySubjects"
                                on-change="$ctrl.onChange('primarySubjects', values)"
                                on-activate="$ctrl.onValueClick('primarySubjects', value)"
                                type="Subject"
                                label="Primary Subjects"
                                description="{{$ctrl.descriptions.primarySubject}}">
                            </kg-section>
                            <kg-section
                                service="$ctrl.service"
                                ng-model="$ctrl.ngModel.classifiers.secondarySubjects"
                                on-change="$ctrl.onChange('secondarySubjects', values)"
                                on-activate="$ctrl.onValueClick('secondarySubjects', value)"
                                type="Subject"
                                label="Secondary Subjects"
                                description="{{$ctrl.descriptions.secondarySubject}}">
                            </kg-section>
                            <kg-section
                                service="$ctrl.service"
                                ng-model="$ctrl.ngModel.classifiers.categories"
                                on-change="$ctrl.onChange('categories', values)"
                                on-activate="$ctrl.onValueClick('categories', value)"
                                type="Category"
                                label="Categories"
                                description="{{$ctrl.descriptions.category}}">
                            </kg-section>
                            <kg-section
                                service="$ctrl.service"
                                ng-model="$ctrl.ngModel.classifiers.communities"
                                on-change="$ctrl.onChange('communities', values)"
                                on-activate="$ctrl.onValueClick('communities', value)"
                                type="Community"
                                label="Communities"
                                description="{{$ctrl.descriptions.community}}">
                            </kg-section>
                            <kg-section
                                service="$ctrl.service"
                                ng-model="$ctrl.ngModel.classifiers.places"
                                on-change="$ctrl.onChange('places', values)"
                                on-activate="$ctrl.onValueClick('places', value)"
                                type="Place"
                                label="Places"
                                description="{{$ctrl.descriptions.place}}">
                            </kg-section>
                        </div>
                    </div>

                    <div class="m-article">
                        <div class="m-article__heading">Fitness for Use</div>
                        <div class="m-article__desc c-kg-editor__section">
                            <kg-section
                                service="$ctrl.service"
                                ng-model="$ctrl.ngModel.classifiers.functions"
                                on-change="$ctrl.onChange('functions', values)"
                                on-activate="$ctrl.onValueClick('functions', value)"
                                type="Function"
                                label="Function"
                                description="{{$ctrl.descriptions.function}}">
                            </kg-section>
                        </div>
                    </div>

                    <div class="m-article">
                        <div class="m-article__heading">Social Context</div>
                        <div class="m-article__desc c-kg-editor__section">
                            <kg-section
                                service="$ctrl.service"
                                ng-model="$ctrl.ngModel.classifiers.audiences"
                                on-change="$ctrl.onChange('audiences', values)"
                                on-activate="$ctrl.onValueClick('audiences', value)"
                                type="Audience"
                                label="Audiences"
                                description="{{$ctrl.descriptions.audience}}">
                            </kg-section>
                        </div>
                    </div>

                </div>
            </div>
        `
    });

}) (angular, GeoPlatform);
