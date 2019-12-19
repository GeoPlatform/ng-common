import { logger } from '../logger';
var EDIT_ROLE = 'gp_editor';
/**
 * Base class that can be used to hook authentication notifications into
 * Angular @Component instances.
 */
var AuthenticatedComponent = /** @class */ (function () {
    function AuthenticatedComponent(authService) {
        this.authService = authService;
    }
    //facade methods to mimic @Component lifecycle methods in case sub-classes
    // want to use consistent names
    AuthenticatedComponent.prototype.ngOnInit = function () { this.init(); };
    AuthenticatedComponent.prototype.ngOnDestroy = function () { this.destroy(); };
    /**
     * Sub-classes must invoke this method in order to register listeners
     * for authentication events
     */
    AuthenticatedComponent.prototype.init = function () {
        var _this = this;
        var obs = {
            next: function (value) {
                logger.debug("AuthenticatedComponent : User changed to " + (value ? value.username : 'null'));
                _this.user = value;
                _this.onUserChange(_this.user);
            },
            error: function (err) {
                logger.error("Unable to get authenticated user info: " +
                    err.message);
            },
            complete: function () { }
        };
        this.gpAuthSubscription = this.authService.subscribe(obs);
        //for components that initialize AFTER a user has changed auth state,
        // we need to fetch the current user details
        this.user = this.authService.getUser();
        this.onUserChange(this.user);
    };
    /**
     * Sub-classes must invoke this method in order to de-register listeners
     * for authentication events and clean up internals
     */
    AuthenticatedComponent.prototype.destroy = function () {
        if (this.gpAuthSubscription) {
            this.gpAuthSubscription.unsubscribe();
            this.gpAuthSubscription = null;
        }
        this.user = null;
        this.authService = null;
    };
    /** @return {boolean} */
    AuthenticatedComponent.prototype.isAuthenticated = function () { return !!this.user; };
    /** @return {GeoPlatformUser} */
    AuthenticatedComponent.prototype.getUser = function () { return this.user; };
    /** @return {string} JWT token associated with the current user or null */
    AuthenticatedComponent.prototype.getAuthToken = function () { return this.authService.getToken(); };
    /** @return Promise containing current user or null */
    AuthenticatedComponent.prototype.checkAuth = function () { return this.authService.check(); };
    /**
     * @param item - optional object the user may be able to edit
     * @return boolean indicating whether user can edit the requested item or is an editor if no item was specified
     */
    AuthenticatedComponent.prototype.canUserEdit = function (item) {
        if (!this.user)
            return false;
        if (this.user.isAuthorized(EDIT_ROLE))
            return true;
        return this.isAuthorOf(item);
    };
    /**
     * @param item - object the user may be the owner of
     * @return boolean indicating if the user is the associated creator/owner of the item
     */
    AuthenticatedComponent.prototype.isAuthorOf = function (item) {
        if (!this.user || !item)
            return false;
        return item.createdBy && item.createdBy === this.user.username;
    };
    /**
     * @param {GeoPlatformUser} user - authenticated user object or null if not authed
     */
    AuthenticatedComponent.prototype.onUserChange = function (user) { };
    return AuthenticatedComponent;
}());
export { AuthenticatedComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRlZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiYXV0aC9hdXRoZW50aWNhdGVkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUc5Qjs7O0dBR0c7QUFDSDtJQUtJLGdDQUFzQixXQUE0QjtRQUE1QixnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7SUFDbEQsQ0FBQztJQUVELDBFQUEwRTtJQUMxRSwrQkFBK0I7SUFDL0IseUNBQVEsR0FBUixjQUFhLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0IsNENBQVcsR0FBWCxjQUFnQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWpDOzs7T0FHRztJQUNILHFDQUFJLEdBQUo7UUFBQSxpQkFxQkM7UUFuQkcsSUFBSSxHQUFHLEdBQStCO1lBQ2xDLElBQUksRUFBRyxVQUFDLEtBQXNCO2dCQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM5RixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUNELEtBQUssRUFBRyxVQUFDLEdBQVE7Z0JBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyx5Q0FBeUM7b0JBQ2pELEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBQ0QsUUFBUSxFQUFHLGNBQVEsQ0FBQztTQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBRTVELHFFQUFxRTtRQUNyRSw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCx3Q0FBTyxHQUFQO1FBQ0ksSUFBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsd0JBQXdCO0lBQ2pCLGdEQUFlLEdBQXRCLGNBQXFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTFELGdDQUFnQztJQUN6Qix3Q0FBTyxHQUFkLGNBQXFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFeEQsMEVBQTBFO0lBQ25FLDZDQUFZLEdBQW5CLGNBQWlDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdEUsc0RBQXNEO0lBQy9DLDBDQUFTLEdBQWhCLGNBQWdELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbEY7OztPQUdHO0lBQ0ksNENBQVcsR0FBbEIsVUFBbUIsSUFBVztRQUMxQixJQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM1QixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ2xELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMkNBQVUsR0FBakIsVUFBa0IsSUFBVztRQUN6QixJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7O09BRUc7SUFDTyw2Q0FBWSxHQUF0QixVQUF1QixJQUFzQixJQUFtQyxDQUFDO0lBR3JGLDZCQUFDO0FBQUQsQ0FBQyxBQTFGRCxJQTBGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBHZW9QbGF0Zm9ybVVzZXIgfSBmcm9tICdAZ2VvcGxhdGZvcm0vb2F1dGgtbmcvYW5ndWxhcic7XG5cbmltcG9ydCB7IEFwcEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyJztcblxuY29uc3QgRURJVF9ST0xFID0gJ2dwX2VkaXRvcic7XG5cblxuLyoqXG4gKiBCYXNlIGNsYXNzIHRoYXQgY2FuIGJlIHVzZWQgdG8gaG9vayBhdXRoZW50aWNhdGlvbiBub3RpZmljYXRpb25zIGludG9cbiAqIEFuZ3VsYXIgQENvbXBvbmVudCBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdXRoZW50aWNhdGVkQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyB1c2VyIDogR2VvUGxhdGZvcm1Vc2VyO1xuICAgIHByaXZhdGUgZ3BBdXRoU3Vic2NyaXB0aW9uIDogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGF1dGhTZXJ2aWNlIDogQXBwQXV0aFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvL2ZhY2FkZSBtZXRob2RzIHRvIG1pbWljIEBDb21wb25lbnQgbGlmZWN5Y2xlIG1ldGhvZHMgaW4gY2FzZSBzdWItY2xhc3Nlc1xuICAgIC8vIHdhbnQgdG8gdXNlIGNvbnNpc3RlbnQgbmFtZXNcbiAgICBuZ09uSW5pdCgpIHsgdGhpcy5pbml0KCk7IH1cbiAgICBuZ09uRGVzdHJveSgpIHsgdGhpcy5kZXN0cm95KCk7IH1cblxuICAgIC8qKlxuICAgICAqIFN1Yi1jbGFzc2VzIG11c3QgaW52b2tlIHRoaXMgbWV0aG9kIGluIG9yZGVyIHRvIHJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgICAqIGZvciBhdXRoZW50aWNhdGlvbiBldmVudHNcbiAgICAgKi9cbiAgICBpbml0KCkge1xuXG4gICAgICAgIGxldCBvYnMgOiBPYnNlcnZlcjxHZW9QbGF0Zm9ybVVzZXI+ID0ge1xuICAgICAgICAgICAgbmV4dCA6ICh2YWx1ZTogR2VvUGxhdGZvcm1Vc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKFwiQXV0aGVudGljYXRlZENvbXBvbmVudCA6IFVzZXIgY2hhbmdlZCB0byBcIiArICh2YWx1ZSA/IHZhbHVlLnVzZXJuYW1lIDogJ251bGwnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5vblVzZXJDaGFuZ2UodGhpcy51c2VyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihcIlVuYWJsZSB0byBnZXQgYXV0aGVudGljYXRlZCB1c2VyIGluZm86IFwiICtcbiAgICAgICAgICAgICAgICAgICAgKGVyciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGUgOiAoKSA9PiB7IH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdwQXV0aFN1YnNjcmlwdGlvbiA9IHRoaXMuYXV0aFNlcnZpY2Uuc3Vic2NyaWJlKCBvYnMgKTtcblxuICAgICAgICAvL2ZvciBjb21wb25lbnRzIHRoYXQgaW5pdGlhbGl6ZSBBRlRFUiBhIHVzZXIgaGFzIGNoYW5nZWQgYXV0aCBzdGF0ZSxcbiAgICAgICAgLy8gd2UgbmVlZCB0byBmZXRjaCB0aGUgY3VycmVudCB1c2VyIGRldGFpbHNcbiAgICAgICAgdGhpcy51c2VyID0gdGhpcy5hdXRoU2VydmljZS5nZXRVc2VyKCk7XG4gICAgICAgIHRoaXMub25Vc2VyQ2hhbmdlKHRoaXMudXNlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3ViLWNsYXNzZXMgbXVzdCBpbnZva2UgdGhpcyBtZXRob2QgaW4gb3JkZXIgdG8gZGUtcmVnaXN0ZXIgbGlzdGVuZXJzXG4gICAgICogZm9yIGF1dGhlbnRpY2F0aW9uIGV2ZW50cyBhbmQgY2xlYW4gdXAgaW50ZXJuYWxzXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYodGhpcy5ncEF1dGhTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZ3BBdXRoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmdwQXV0aFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCgpIDogYm9vbGVhbiB7IHJldHVybiAhIXRoaXMudXNlcjsgfVxuXG4gICAgLyoqIEByZXR1cm4ge0dlb1BsYXRmb3JtVXNlcn0gKi9cbiAgICBwdWJsaWMgZ2V0VXNlcigpIDogR2VvUGxhdGZvcm1Vc2VyIHsgcmV0dXJuIHRoaXMudXNlcjsgfVxuXG4gICAgLyoqIEByZXR1cm4ge3N0cmluZ30gSldUIHRva2VuIGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudCB1c2VyIG9yIG51bGwgKi9cbiAgICBwdWJsaWMgZ2V0QXV0aFRva2VuKCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5nZXRUb2tlbigpOyB9XG5cbiAgICAvKiogQHJldHVybiBQcm9taXNlIGNvbnRhaW5pbmcgY3VycmVudCB1c2VyIG9yIG51bGwgKi9cbiAgICBwdWJsaWMgY2hlY2tBdXRoKCkgOiBQcm9taXNlPEdlb1BsYXRmb3JtVXNlcj4geyByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5jaGVjaygpOyB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXRlbSAtIG9wdGlvbmFsIG9iamVjdCB0aGUgdXNlciBtYXkgYmUgYWJsZSB0byBlZGl0XG4gICAgICogQHJldHVybiBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB1c2VyIGNhbiBlZGl0IHRoZSByZXF1ZXN0ZWQgaXRlbSBvciBpcyBhbiBlZGl0b3IgaWYgbm8gaXRlbSB3YXMgc3BlY2lmaWVkXG4gICAgICovXG4gICAgcHVibGljIGNhblVzZXJFZGl0KGl0ZW0gPzogYW55KSA6IGJvb2xlYW4ge1xuICAgICAgICBpZighdGhpcy51c2VyKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKHRoaXMudXNlci5pc0F1dGhvcml6ZWQoRURJVF9ST0xFKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQXV0aG9yT2YoaXRlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW0gLSBvYmplY3QgdGhlIHVzZXIgbWF5IGJlIHRoZSBvd25lciBvZlxuICAgICAqIEByZXR1cm4gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIGlzIHRoZSBhc3NvY2lhdGVkIGNyZWF0b3Ivb3duZXIgb2YgdGhlIGl0ZW1cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNBdXRob3JPZihpdGVtID86IGFueSkgOiBib29sZWFuIHtcbiAgICAgICAgaWYoIXRoaXMudXNlciB8fCAhaXRlbSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gaXRlbS5jcmVhdGVkQnkgJiYgaXRlbS5jcmVhdGVkQnkgPT09IHRoaXMudXNlci51c2VybmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0dlb1BsYXRmb3JtVXNlcn0gdXNlciAtIGF1dGhlbnRpY2F0ZWQgdXNlciBvYmplY3Qgb3IgbnVsbCBpZiBub3QgYXV0aGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG9uVXNlckNoYW5nZSh1c2VyIDogR2VvUGxhdGZvcm1Vc2VyKSB7IC8qIGltcGxlbWVudCBpbiBzdWItY2xhc3NlcyAqLyB9XG5cblxufVxuIl19