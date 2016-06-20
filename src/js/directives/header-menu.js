(function(jQuery, angular) {
    
    "use strict"; 
    
    angular.module("gp-common")


    /**
     * Header directive for GeoPlatform Angular-based web applications
     * 
     * Uses transclusion to inject links into the nav-menu which floats to the right.
     * The menu already provides a "Home" link (to app home) and Sign In/User Info button.
     * The home link is not enabled by default but can be shown using 'show-home-link="true"' 
     * parameter on the directive.
     *
     * Note: any links transcluded should reference '$parent.user' to access authenticated user info
     * 
     * ex:
     * 
     *   <div gp-header brand="Map Manager" show-home-link="true" class="navbar-fixed-top">
     *     <li><a href="#/maps">Maps</a></li>
     *     <li><a href="#/galleries">Galleries</a></li>
     *     <li><a ng-if="$parent.user!==null" href="#/agol">AGOL</a></li>
     *     <li><a href="#/help">Help</a></li>
     *   </div>
     */
    .directive('gpHeader', ['GPConfig', 'AuthenticationService', function(Config, AuthenticationService) {

        return {

            scope: {
                brand: "@",
                showHomeLink: "@"
            },
            restrict: "AE",
            transclude: true,
            replace: true,
            template: [
                '<header>',
                '  <div class="container-fluid">',
                '    <div class="row">',
                '      <div class="col-md-12">',
                '        <ul role="menu" class="header__menu" gp-header-menu>',
                '          <li ng-if="showHomeLink">',
                '            <a href="#/goHome">',
                '                <span class="glyphicon glyphicon-home"></span> ',
                '                <span class="hidden-xs hidden-sm">Home</span>',
                '            </a>',
                '          </li>',
                '          <div class="transcluded"></div>',
                '          <li><span gp-login-button></span></li>',
                '        </ul>',
                '        <h4 class="brand">',
                '          <a href="{{portalUrl}}" title="Go to the GeoPlatform Home Page">',
                '            <span class="icon-gp"></span>',
                '            <span class="hidden-xs">GeoPlatform</span>',
                '          </a>',
                '          {{brand}}',
                '        </h4>',
                '      </div>',
                '    </div>',
                '  </div>',
                '</header>'
            ].join(' '),

            // controller: function($rootScope, $scope, $element) {
            //     $scope.portalUrl = $rootScope.portalUrl;
            // }, 

            link: function($scope, $element, $attrs, ctrl, transcludeFn) {

                $scope.showHomeLink = $scope.showHomeLink === 'true' || false;

                $scope.portalUrl = Config.portalUrl;

                AuthenticationService.getUserQ().then(function(user) {
                    $scope.user = user;    
                });
                
                $element.find('.transcluded').replaceWith(transcludeFn());
            }            

        };

    }])


    
    /**
     * Header Menu
     *
     * Monitors the current page URL and updates the header links 
     * to highlight whichever one is associated with the current page
     *
     * Usage: 
     *
     *  <ul role="menu" class="header__menu" gp-header-menu>
     *      <li><a href="#/maps">Maps</a></li>
     *      <li><a href="#/galleries">Galleries</a></li>
     *      ...
     *  </ul>
     *
     */
    .directive('gpHeaderMenu', ['$location', function($location) {

        //default href for "home" link in header__menu
        //uses 'goHome' to avoid angular-route issues with empty hash not 
        // triggering a page reload. Relies upon the "otherwise" condition
        // being configured inside a routeProvider within the application.
        var homeLink = 'goHome';

        function update($element) {

            var path = $location.path();
            
            if(path === '/' || path === '/#' || path === '/#/')
                path = homeLink;

            if(path[0] === '/') 
                path = path.substring(1);

            var menu = $element;
            menu.find('li.active').removeClass('active');
            
            var link = menu.find('li > a[href="#/' + path + '"]');
            if(link.length) {
                //check if link is within a dropdown in the header menu
                var dd = link.closest('.dropdown-menu');
                if(dd.length) {
                    //find next ancestor that is a list element and mark it active
                    dd.closest('li').addClass('active');
                } else {
                    //not in a dropdown, mark this link active
                    link.parent().addClass('active');
                }
            }
            
            menu.find('li > a').each(function(i,a) {
                var $a = $(a), href = $a.attr('href');
                if(!href) return;
                href = href.replace('#/', '');
                if(path.indexOf(href) === 0)
                    $a.parent().addClass('active');
            });
        }

        return {
            scope: {
                homeHref: '@'
            },
            restrict: "A",
            
            controller: function($rootScope, $scope, $element) {
                if($scope.homeHref)
                    homeLink = $scope.homeHref;
            },

            link: function($scope, $element) {

                update($element);

                $scope.$root.$on('$locationChangeSuccess', function() {
                    update($element);
                });

            }
        };
    }]);

})(jQuery, angular);
