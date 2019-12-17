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
                console.log("AuthenticatedComponent : User changed to " + (value ? value.username : 'null'));
                _this.user = value;
                _this.onUserChange(_this.user);
            },
            error: function (err) {
                console.log("Unable to get authenticated user info: " +
                    err.message);
            },
            complete: function () { }
        };
        this.gpAuthSubscription = this.authService.subscribe(obs);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRlZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiYXV0aC9hdXRoZW50aWNhdGVkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFHOUI7OztHQUdHO0FBQ0g7SUFLSSxnQ0FBc0IsV0FBNEI7UUFBNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO0lBQ2xELENBQUM7SUFFRCwwRUFBMEU7SUFDMUUsK0JBQStCO0lBQy9CLHlDQUFRLEdBQVIsY0FBYSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNCLDRDQUFXLEdBQVgsY0FBZ0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVqQzs7O09BR0c7SUFDSCxxQ0FBSSxHQUFKO1FBQUEsaUJBZ0JDO1FBZEcsSUFBSSxHQUFHLEdBQStCO1lBQ2xDLElBQUksRUFBRyxVQUFDLEtBQXNCO2dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM3RixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUNELEtBQUssRUFBRyxVQUFDLEdBQVE7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUM7b0JBQ2hELEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBQ0QsUUFBUSxFQUFHLGNBQVEsQ0FBQztTQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7O09BR0c7SUFDSCx3Q0FBTyxHQUFQO1FBQ0ksSUFBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsd0JBQXdCO0lBQ3hCLGdEQUFlLEdBQWYsY0FBOEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFbkQsZ0NBQWdDO0lBQ2hDLHdDQUFPLEdBQVAsY0FBOEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVqRCwwRUFBMEU7SUFDMUUsNkNBQVksR0FBWixjQUEwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRS9ELHNEQUFzRDtJQUN0RCwwQ0FBUyxHQUFULGNBQXlDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFM0U7OztPQUdHO0lBQ0gsNENBQVcsR0FBWCxVQUFZLElBQVc7UUFDbkIsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDNUIsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNILDJDQUFVLEdBQVYsVUFBVyxJQUFXO1FBQ2xCLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25FLENBQUM7SUFFRDs7T0FFRztJQUNPLDZDQUFZLEdBQXRCLFVBQXVCLElBQXNCLElBQW1DLENBQUM7SUFHckYsNkJBQUM7QUFBRCxDQUFDLEFBckZELElBcUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UsIEdlb1BsYXRmb3JtVXNlciB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9vYXV0aC1uZy9hbmd1bGFyJztcblxuaW1wb3J0IHsgQXBwQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5cblxuY29uc3QgRURJVF9ST0xFID0gJ2dwX2VkaXRvcic7XG5cblxuLyoqXG4gKiBCYXNlIGNsYXNzIHRoYXQgY2FuIGJlIHVzZWQgdG8gaG9vayBhdXRoZW50aWNhdGlvbiBub3RpZmljYXRpb25zIGludG9cbiAqIEFuZ3VsYXIgQENvbXBvbmVudCBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdXRoZW50aWNhdGVkQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyB1c2VyIDogR2VvUGxhdGZvcm1Vc2VyO1xuICAgIHByaXZhdGUgZ3BBdXRoU3Vic2NyaXB0aW9uIDogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGF1dGhTZXJ2aWNlIDogQXBwQXV0aFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvL2ZhY2FkZSBtZXRob2RzIHRvIG1pbWljIEBDb21wb25lbnQgbGlmZWN5Y2xlIG1ldGhvZHMgaW4gY2FzZSBzdWItY2xhc3Nlc1xuICAgIC8vIHdhbnQgdG8gdXNlIGNvbnNpc3RlbnQgbmFtZXNcbiAgICBuZ09uSW5pdCgpIHsgdGhpcy5pbml0KCk7IH1cbiAgICBuZ09uRGVzdHJveSgpIHsgdGhpcy5kZXN0cm95KCk7IH1cblxuICAgIC8qKlxuICAgICAqIFN1Yi1jbGFzc2VzIG11c3QgaW52b2tlIHRoaXMgbWV0aG9kIGluIG9yZGVyIHRvIHJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgICAqIGZvciBhdXRoZW50aWNhdGlvbiBldmVudHNcbiAgICAgKi9cbiAgICBpbml0KCkge1xuXG4gICAgICAgIGxldCBvYnMgOiBPYnNlcnZlcjxHZW9QbGF0Zm9ybVVzZXI+ID0ge1xuICAgICAgICAgICAgbmV4dCA6ICh2YWx1ZTogR2VvUGxhdGZvcm1Vc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdXRoZW50aWNhdGVkQ29tcG9uZW50IDogVXNlciBjaGFuZ2VkIHRvIFwiICsgKHZhbHVlID8gdmFsdWUudXNlcm5hbWUgOiAnbnVsbCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVXNlckNoYW5nZSh0aGlzLnVzZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmFibGUgdG8gZ2V0IGF1dGhlbnRpY2F0ZWQgdXNlciBpbmZvOiBcIiArXG4gICAgICAgICAgICAgICAgICAgIChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsZXRlIDogKCkgPT4geyB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ncEF1dGhTdWJzY3JpcHRpb24gPSB0aGlzLmF1dGhTZXJ2aWNlLnN1YnNjcmliZSggb2JzICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3ViLWNsYXNzZXMgbXVzdCBpbnZva2UgdGhpcyBtZXRob2QgaW4gb3JkZXIgdG8gZGUtcmVnaXN0ZXIgbGlzdGVuZXJzXG4gICAgICogZm9yIGF1dGhlbnRpY2F0aW9uIGV2ZW50cyBhbmQgY2xlYW4gdXAgaW50ZXJuYWxzXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYodGhpcy5ncEF1dGhTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZ3BBdXRoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmdwQXV0aFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gICAgaXNBdXRoZW50aWNhdGVkKCkgOiBib29sZWFuIHsgcmV0dXJuICEhdGhpcy51c2VyOyB9XG5cbiAgICAvKiogQHJldHVybiB7R2VvUGxhdGZvcm1Vc2VyfSAqL1xuICAgIGdldFVzZXIoKSA6IEdlb1BsYXRmb3JtVXNlciB7IHJldHVybiB0aGlzLnVzZXI7IH1cblxuICAgIC8qKiBAcmV0dXJuIHtzdHJpbmd9IEpXVCB0b2tlbiBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgdXNlciBvciBudWxsICovXG4gICAgZ2V0QXV0aFRva2VuKCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5nZXRUb2tlbigpOyB9XG5cbiAgICAvKiogQHJldHVybiBQcm9taXNlIGNvbnRhaW5pbmcgY3VycmVudCB1c2VyIG9yIG51bGwgKi9cbiAgICBjaGVja0F1dGgoKSA6IFByb21pc2U8R2VvUGxhdGZvcm1Vc2VyPiB7IHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmNoZWNrKCk7IH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpdGVtIC0gb3B0aW9uYWwgb2JqZWN0IHRoZSB1c2VyIG1heSBiZSBhYmxlIHRvIGVkaXRcbiAgICAgKiBAcmV0dXJuIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHVzZXIgY2FuIGVkaXQgdGhlIHJlcXVlc3RlZCBpdGVtIG9yIGlzIGFuIGVkaXRvciBpZiBubyBpdGVtIHdhcyBzcGVjaWZpZWRcbiAgICAgKi9cbiAgICBjYW5Vc2VyRWRpdChpdGVtID86IGFueSkge1xuICAgICAgICBpZighdGhpcy51c2VyKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKHRoaXMudXNlci5pc0F1dGhvcml6ZWQoRURJVF9ST0xFKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQXV0aG9yT2YoaXRlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW0gLSBvYmplY3QgdGhlIHVzZXIgbWF5IGJlIHRoZSBvd25lciBvZlxuICAgICAqIEByZXR1cm4gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIGlzIHRoZSBhc3NvY2lhdGVkIGNyZWF0b3Ivb3duZXIgb2YgdGhlIGl0ZW1cbiAgICAgKi9cbiAgICBpc0F1dGhvck9mKGl0ZW0gPzogYW55KSB7XG4gICAgICAgIGlmKCF0aGlzLnVzZXIgfHwgIWl0ZW0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY3JlYXRlZEJ5ICYmIGl0ZW0uY3JlYXRlZEJ5ID09PSB0aGlzLnVzZXIudXNlcm5hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtHZW9QbGF0Zm9ybVVzZXJ9IHVzZXIgLSBhdXRoZW50aWNhdGVkIHVzZXIgb2JqZWN0IG9yIG51bGwgaWYgbm90IGF1dGhlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvblVzZXJDaGFuZ2UodXNlciA6IEdlb1BsYXRmb3JtVXNlcikgeyAvKiBpbXBsZW1lbnQgaW4gc3ViLWNsYXNzZXMgKi8gfVxuXG5cbn1cbiJdfQ==