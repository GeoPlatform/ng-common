(function(jQuery, angular) {
    
    "use strict";



    /*
     * Usage:
     * 
     *      <gp-pagination service="$ctrl.service" event-key="maps"></gp-pagination>
     *
     *  Expects a BrowseObjService instance for the 'service' binding, or at least 
     * one that provides the same pagination and options API.
     */






    /**
     * Requires a service which exposes the following methods:
     *   - getPagination() : returns {object} defining 'start', 'size', and 'total'
     *   - start(int) : takes {int} defining which index to start requesting
     *   - size(int) : takes {int} defining how many items to request
     *   - on(eventName, listener) : must support event "gp:browse:<key>:pagination" where 'key' may be 'objects' or a custom key
     */
    class PaginationController {

        constructor () {
            'ngInject';
        }

        $onInit () {
            
            if(!this.service) return;

            this.options = this.service.getPagination();

            let event = 'gp:browse:';
            if(this.eventKey)
                event = 'gp:browse:' + this.eventKey + ":";
            else
                event = 'gp:browse:objects:';

            this.listener = this.service.on(event + 'pagination', () => { 
                this.options = this.service.getPagination();
            });
        }

        $onDestroy () {

            //remove listener from service if exists
            if(this.listener) 
                this.listener();

            this.service = null;
        }

        previous () { 
            if(this.service && this.hasPrevious()) {
                this.service.start(Math.max(0, this.options.start*1 - this.options.size*1), true);
            }
        }

        next () {
            if(this.service && this.hasNext()) {
                this.service.start(Math.min(this.options.total, this.options.start*1 + this.options.size*1), true);
            }
        }

        first () {
            if(this.service && this.hasPrevious()) {
                this.service.start(0, true);
            }
        }

        last () {
            if(this.service && this.hasNext()) {
                var lastPage = Math.floor(this.options.total / this.options.size);
                this.setPage(lastPage);
            }
        }

        setPage (arg) {
            if(this.service) {
                var page = arg*1;
                this.service.start(page * (this.options.size*1), true);
            }
        }

        setPageSize (size) {
            if(this.service) {
                this.service.size(size*1, true);
            }
        }

        hasPrevious () {
            return this.options && this.options.start > 0;
        }

        hasNext () {
            return this.options && (this.options.start+this.options.size) < this.options.total;
        }

    }





    angular.module('gp-common').component('gpPagination', {

        bindings: {
            service: '=',
            eventKey: '@'
        },

        controller: PaginationController,

        template: 
        `
            <div class="c-pagination">
                <div class="c-pagination__total">{{$ctrl.options.total||0}} results</div>
                <div class="c-pagination__page-size">
                    <span uib-dropdown>
                        <a href="" uib-dropdown-toggle title="Change the number of results returned">
                            {{$ctrl.options.size}} per page <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            <li ng-repeat="size in $ctrl.options.sizeOptions track by $index">
                                <a ng-click="$ctrl.setPageSize(size)">{{size}} per page</a>
                            </li>
                        </ul>
                    </span>
                </div>
                <div class="c-pagination__pages">
                    <div class="c-pagination__button" ng-class="{'is-disabled':!$ctrl.hasPrevious()}">
                        <a ng-click="$ctrl.first()"><span class="glyphicon glyphicon-fast-backward"></span></a>
                    </div>
                    <div class="c-pagination__button" ng-class="{'is-disabled':!$ctrl.hasPrevious()}">
                        <a ng-click="$ctrl.previous()"><span class="glyphicon glyphicon-backward"></span></a>
                    </div>
                    <div class="c-pagination__page">
                        {{$ctrl.options.start+1}} - {{$ctrl.options.start+$ctrl.options.size}}
                    </div>
                    <div class="c-pagination__button" ng-class="{'is-disabled':!$ctrl.hasNext()}">
                        <a ng-click="$ctrl.next()"><span class="glyphicon glyphicon-forward"></span></a>
                    </div>
                    <div class="c-pagination__button" ng-class="{'is-disabled':!$ctrl.hasNext()}">
                        <a ng-click="$ctrl.last()"><span class="glyphicon glyphicon-fast-forward"></span></a>
                    </div>
                </div>
            </div>
        `

    });

})(jQuery, angular);