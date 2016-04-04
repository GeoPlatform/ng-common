(function(angular) {
    
    "use strict";


    angular.module('gp-common')


    //
    .service('NotificationService', ['$rootScope', function($rootScope) {
        var Service = function() {
            this.items = [];
        };
        Service.prototype = {
            getItems: function() { return this.items; },
            /**
             * @param item object
             * @return function to cancel the notification
             */
            addItem: function(item) { 
                this.items.push(item); 
                $rootScope.$broadcast('gp:notifications:new', item);

                var fn = function(item) { this.removeItem(item); };
                return fn.bind(this, item);
            },
            removeItem: function(item) {
                var index = this.items.indexOf(item);
                if(index >= 0)
                    return this.items.splice(index, 1);
                return null;
            },
            error: function(label, msg, dismiss) { 
                return this.addItem({ type: 'error', label: label, message: msg, canDismiss: dismiss });
            },
            success: function(label, msg, dismiss) { 
                return this.addItem({ type: 'success', label: label, message: msg, canDismiss: dismiss });
            },
            info: function(label, msg, dismiss) { 
                return this.addItem({ type: 'info', label: label, message: msg, canDismiss: dismiss });
            }
        };
        return new Service();
    }])


    // Usage: <gp-notifications />
    .directive('gpNotifications', ['$timeout', 'NotificationService', function($timeout, NotificationService) {
        return {
            scope: {
                expiration: '@'
            },
            template: [
                '<div class="notifications ng-hide" ng-show="items.length">',
                '  <div class="notification" ng-repeat="item in items"',
                '    ng-class="{\'notification--success\':item.type===\'success\', \'notification--error\':item.type===\'error\', \'notification--info\':item.type===\'info\'}">',
                '    <h5 class="notification__title">',
                '        <span class="pull-right glyphicon" ',
                '            ng-class="{\'glyphicon-ok-sign\':item.type===\'success\',\'glyphicon-exclamation-sign\':item.type===\'error\',\'glyphicon-info-sign\':item.type===\'info\'}">',
                '        </span>',
                '        {{item.label}}',
                '    </h5>',
                '    <p class="notification__content" ng-bind-html="item.message"></p>',
                '    <div class="notification__actions" ng-if="item.canDismiss">',
                '        <button type="button" class="btn btn-link" ng-click="dismiss(item)">dismiss</button>',
                '    </div>',
                '  </div>',
                '</div>'
            ].join(' '),

            link: function($scope, $element, $attrs) {

                $scope.expiration = ($scope.expiration || 2000)*1;

                $scope.items = [];


                function update() {
                    $scope.items = NotificationService.getItems();

                    //if updated before timer expired, reset timer
                    if($scope.timer) {
                        $timeout.cancel($scope.timer);
                        $scope.timer = null;
                    }

                    //set timer to kill earliest item after time
                    $scope.timer = $timeout(function() {
                        $scope.timer = null;
                        //will ultimately call update() and thus trigger timeout again
                        $scope.removeOldest();
                    }, $scope.expiration);
                }
                update();

                $scope.removeOldest = function() {
                    //find oldest that can be removed
                    var oldest = $scope.items.find(function(item) {return item.canDismiss;});
                    if(oldest)
                        NotificationService.removeItem(oldest);
                };

                $scope.dismiss = function(item) {
                    //remove item using service
                    NotificationService.removeItem(item);
                };

                $scope.$watchCollection(function() {
                    return NotificationService.getItems();
                }, update);

                // $scope.$on('gp:notifications:new', function(event, item) { update(); });

            }
        };
    }]);


})(angular);