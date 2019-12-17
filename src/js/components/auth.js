

(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([], function() {
            if(!GeoPlatform) {
                throw new Error("AuthenticatedComponent - 'GeoPlatform' global not defined!");
            }
            return (GeoPlatform.AuthenticatedComponent = root.AuthenticatedComponent = factory());
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.AuthenticatedComponent = factory()
        );
    } else {
        GeoPlatform.AuthenticatedComponent = factory();
    }
}(this||window, function() {



    const EDIT_ROLE = 'gp_editor';

    /**
     *
     * base class for Angular components that need to be notified
     * when the user's authentication status changes (ie, log in or log out).
     *
     */
    class AuthenticatedComponent {

        constructor($rootScope, AuthenticationService) {
            //NOTE: do not use ngInject 'annotation' here or else it will munge
            // the constructor arguments of any sub-class.

            this.authState = { user: null, authorized: false };
            this.authService = AuthenticationService;
            this.authListeners = [
                $rootScope.$on('userAuthenticated', (event, user) => {
                    this.onAuthEvent(event, user);
                }),
                $rootScope.$on('userSignOut', (event) => {
                    this.onAuthEvent(event, null);
                })
            ];
        }

        $onInit () {
            this.authService.getUser( (user) => {
                this.onAuthEvent(null, user);
            });
        }

        $onDestroy () {
            while(this.authListeners.length) {
                this.authListeners.pop()();
            }
            this.authListeners = null;
            this.authService = null;
            this.authState = null;
        }

        /**
         * Triggered whenever the user logs in or out of the app
         * @param {Object} event
         * @param {Object} user
         */
        onAuthEvent (event, user) {
            this.authState.user = user;
            this.authState.authorized = user && user.isAuthorized(EDIT_ROLE);
        }

        isAuthenticated() {
            return !!this.authState.user;
        }

        canUserEdit(item) {
            if(!this.authState.user) return false;
            if(!item) return this.authState.authorized;
            return this.isAuthorOf(item) || this.authState.authorized;
        }

        isAuthorOf(item) {
            if(!this.authState.user) return false;
            if(!item) return false;
            return item.createdBy && item.createdBy === this.authState.user.username;
        }

        getUser() {
            return this.authState ? this.authState.user : null;
        }

        getToken() {
            return this.authService.getJWT();
        }
    }

    return AuthenticatedComponent;

}));
