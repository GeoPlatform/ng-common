(function(jQuery, angular) {
    
    "use strict";

    angular.module('gp-common').directive('gpPagination', function() {


        function Controller($scope, $element) {

            if(!$scope.pageSizeOpts) {
                $scope.pageSizeOpts = [5, 10, 25, 50];
            }
            if($scope.pageSize && $scope.pageSizeOpts.indexOf($scope.pageSize*1)<0) {
                $scope.pageSizeOpts.push($scope.pageSize*1).sort();
            }

            $scope.previous = function() { 
                $scope.start = Math.max(0, $scope.start*1 - $scope.pageSize*1);
                $scope.$emit('pagination:change', $scope.start, $scope.pageSize);
            };

            $scope.next = function() {
                $scope.start = Math.min($scope.total, $scope.start*1 + $scope.pageSize*1);
                $scope.$emit('pagination:change', $scope.start, $scope.pageSize);
            };

            $scope.setPage = function(arg) {
                var page = arg*1;
                $scope.start = (page-1) * ($scope.pageSize*1);
                $scope.$emit('pagination:change', $scope.start, $scope.pageSize);
            };

            $scope.setPageSize = function(size) {

                $scope.pageSize = size*1;
                //move start cursor to beginning of new current page based on updated pagesize
                var currentPage = Math.floor($scope.start / $scope.pageSize) + 1;
                $scope.setPage(currentPage);
            };

            $scope.hasPrevious = function() {
                return $scope.start > 0;
            };

            $scope.hasNext = function() {
                return ($scope.start+$scope.pageSize) < $scope.total;
            };


            function update() {
            
                var ostart = $scope.start*1;
                var osize = $scope.pageSize*1;
                
                //calculate # of pages needed
                var pages = [];
                var maxPagination = 5;
                var maxPaginationMidPoint = ((maxPagination % 2) !== 0) ? Math.ceil(maxPagination / 2) : maxPagination / 2;

                if($scope.total > 0) {
                    
                    var numPages = Math.ceil($scope.total / osize);
                    var currentPage = Math.floor(ostart / osize);

                    var s = 0;
                    if(currentPage > Math.floor(maxPagination/2)) {     //  1 2 '3' 4 5
                        s = currentPage-Math.floor(maxPagination/2);    //  1 2 3 '4' 5
                                                                        //  ...

                    } else {                                            //  '1' 2 3 4 5
                        s = 0;                                          //  1 '2' 3 4 5
                                                                        //  ...
                    }

                    var e = Math.min(s+maxPagination, numPages);

                    //ensure at least <maxPagination> # of page links are shown
                    // even if near the end of the results
                    while(s>0 && ((e-s) < maxPagination))
                        s-=1;

                    for(var i=s; i<e; ++i) {
                        var pageStart = (i*osize)+1;
                        var pageEnd = Math.min(pageStart + osize - 1, $scope.total);
                        pages.push({
                            label: (i+1)+"",
                            tooltip: "Results " + pageStart + "-" + pageEnd
                        });
                        if(i == currentPage)
                            pages[pages.length-1].active = true;
                    }

                }

                $scope.pages = pages;

            }

            update();

            $scope.$watch('start',      update);
            $scope.$watch('pageSize',   update);
            $scope.$watch('total',      update);

        }



        return {

            scope: {
                start: '=',
                pageSize: '=',
                total: '=',
                pageSizeOpts: '='
            },
            replace: true,
            template: [
                '<div>',
                '  <div class="visible-xs row">',
                '    <div class="col-xs-6">{{total}} results</div>',
                '    <div class="col-xs-6">',
                '      <select class="form-control" ng-model="pageSize">',
                '        <option ng-repeat="ps in pageSizeOpts" ',
                '          ng-selected="pageSize===ps" ',
                '          value="{{ps}}">{{ps}} per page</option>',
                '      </select>',
                '    </div>',
                '  </div>',
                '  <ul class="pagination">',
                '    <li class="info hidden-xs">',
                '      <a>{{total}} results</a>',
                '    </li>',
                '    <li class="pagination-control hidden-xs" ng-if="total>0">',
                '      <span uib-dropdown>',
                '        <a href="" uib-dropdown-toggle title="Change the number of results returned">',
                '          {{pageSize}} per page <span class="caret"></span>',
                '        </a>',
                '        <ul class="dropdown-menu" role="menu">',
                '          <li ng-repeat="ps in pageSizeOpts"><a ng-click="setPageSize(ps)">{{ps}} per page</a></li>',
                '        </ul>',
                '      </span>',
                '    </li>',
                '    <li class="separator hidden-xs"></li>',
                '    <li ng-if="hasPrevious()">',
                '      <a ng-click="previous()">',
                '        <span class="glyphicon glyphicon-backward"></span>',
                '      </a>',
                '    </li>',
                '    <li ng-repeat="page in pages" ng-class="{active:page.active,disabled:page.disabled}">',
                '      <a ng-click="setPage(page.label)" title="{{::page.tooltip}}">{{::page.label}}</a>',
                '    </li>',
                '    <li ng-if="hasNext()">',
                '      <a ng-click="next()">',
                '        <span class="glyphicon glyphicon-forward"></span>',
                '      </a>',
                '    </li>',
                '  </ul>',
                '</div>'
            ].join(' '),

            controller: Controller

        };

    });


})(jQuery, angular);