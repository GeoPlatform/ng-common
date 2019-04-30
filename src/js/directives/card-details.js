(function(angular) {

    "use strict";

    const ACTIVATORS_HTML =
        `
            <div class="gp-ui-card__details-activator--left" title="Show previous details"
                ng-class="{disabled:!hasPrevious()}" ng-click="previousDetails()">
                <span class="gpicons chevron-left"></span>
            </div>
            <div class="gp-ui-card__details-activator--right" title="Show next details"
                ng-class="{disabled:!hasNext()}" ng-click="nextDetails()">
                <span class="gpicons chevron-right"></span>
            </div>
        `;



    /*
     * Appends carousel-like activators onto a card section
     * Usage:
     *
     *  <div class="text--supporting" card-details-carousel-activator>
     *      <div class="gp-ui-card__details active" id="description">...</div>
     *      <div class="gp-ui-card__details" id="author">...</div>
     *  </div>
     */
    angular.module("gp-common").directive('cardDetailsCarouselActivator', function() {

        return {

            compile: function($element) {
                $element.append(ACTIVATORS_HTML);
            },

            controller: function($scope, $element) {

                $scope.hasPrevious = function() {
                    let pane = $element.find('.gp-ui-card__details.active');
                    return pane.prevAll('.gp-ui-card__details').length;
                };

                $scope.hasNext = function() {
                    let pane = $element.find('.gp-ui-card__details.active');
                    return pane.nextAll('.gp-ui-card__details').length;
                };

                $scope.previousDetails = function() {
                    if(!$scope.hasPrevious()) return;
                    let pane = $element.find('.gp-ui-card__details.active');
                    pane.removeClass('active');
                    pane = pane.prevAll('.gp-ui-card__details');
                    if(pane.length)
                        angular.element(pane[0]).addClass('active');
                };

                $scope.nextDetails = function() {
                    if(!$scope.hasNext()) return;
                    let pane = $element.find('.gp-ui-card__details.active');
                    pane.removeClass('active');
                    pane = pane.nextAll('.gp-ui-card__details');
                    if(pane.length)
                        angular.element(pane[0]).addClass('active');
                };

            }
        };
    });

}) (angular);
