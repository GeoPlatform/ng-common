const EDIT_ROLE = 'gp_editor';
/**
 * Base class that can be used to hook authentication notifications into
 * Angular @Component instances.
 */
export class AuthenticatedComponent {
    constructor(authService) {
        this.authService = authService;
    }
    //facade methods to mimic @Component lifecycle methods in case sub-classes
    // want to use consistent names
    ngOnInit() { this.init(); }
    ngOnDestroy() { this.destroy(); }
    /**
     * Sub-classes must invoke this method in order to register listeners
     * for authentication events
     */
    init() {
        let obs = {
            next: (value) => {
                console.log("AuthenticatedComponent : User changed to " + (value ? value.username : 'null'));
                this.user = value;
                this.onUserChange(this.user);
            },
            error: (err) => {
                console.log("Unable to get authenticated user info: " +
                    err.message);
            },
            complete: () => { }
        };
        this.gpAuthSubscription = this.authService.subscribe(obs);
    }
    /**
     * Sub-classes must invoke this method in order to de-register listeners
     * for authentication events and clean up internals
     */
    destroy() {
        if (this.gpAuthSubscription) {
            this.gpAuthSubscription.unsubscribe();
            this.gpAuthSubscription = null;
        }
        this.user = null;
        this.authService = null;
    }
    /** @return {boolean} */
    isAuthenticated() { return !!this.user; }
    /** @return {GeoPlatformUser} */
    getUser() { return this.user; }
    /** @return {string} JWT token associated with the current user or null */
    getAuthToken() { return this.authService.getToken(); }
    /** @return Promise containing current user or null */
    checkAuth() { return this.authService.check(); }
    /**
     * @param item - optional object the user may be able to edit
     * @return boolean indicating whether user can edit the requested item or is an editor if no item was specified
     */
    canUserEdit(item) {
        if (!this.user)
            return false;
        if (this.user.isAuthorized(EDIT_ROLE))
            return true;
        return this.isAuthorOf(item);
    }
    /**
     * @param item - object the user may be the owner of
     * @return boolean indicating if the user is the associated creator/owner of the item
     */
    isAuthorOf(item) {
        if (!this.user || !item)
            return false;
        return item.createdBy && item.createdBy === this.user.username;
    }
    /**
     * @param {GeoPlatformUser} user - authenticated user object or null if not authed
     */
    onUserChange(user) { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRlZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiYXV0aC9hdXRoZW50aWNhdGVkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFHOUI7OztHQUdHO0FBQ0gsTUFBTSxPQUFnQixzQkFBc0I7SUFLeEMsWUFBc0IsV0FBNEI7UUFBNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO0lBQ2xELENBQUM7SUFFRCwwRUFBMEU7SUFDMUUsK0JBQStCO0lBQy9CLFFBQVEsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNCLFdBQVcsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWpDOzs7T0FHRztJQUNILElBQUk7UUFFQSxJQUFJLEdBQUcsR0FBK0I7WUFDbEMsSUFBSSxFQUFHLENBQUMsS0FBc0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM3RixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUNELEtBQUssRUFBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QztvQkFDaEQsR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFDRCxRQUFRLEVBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxPQUFPO1FBQ0gsSUFBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsd0JBQXdCO0lBQ3hCLGVBQWUsS0FBZSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVuRCxnQ0FBZ0M7SUFDaEMsT0FBTyxLQUF1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRWpELDBFQUEwRTtJQUMxRSxZQUFZLEtBQWMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvRCxzREFBc0Q7SUFDdEQsU0FBUyxLQUFnQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTNFOzs7T0FHRztJQUNILFdBQVcsQ0FBQyxJQUFXO1FBQ25CLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzVCLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVLENBQUMsSUFBVztRQUNsQixJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7O09BRUc7SUFDTyxZQUFZLENBQUMsSUFBc0IsSUFBbUMsQ0FBQztDQUdwRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBHZW9QbGF0Zm9ybVVzZXIgfSBmcm9tICdAZ2VvcGxhdGZvcm0vb2F1dGgtbmcvYW5ndWxhcic7XG5cbmltcG9ydCB7IEFwcEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuXG5cbmNvbnN0IEVESVRfUk9MRSA9ICdncF9lZGl0b3InO1xuXG5cbi8qKlxuICogQmFzZSBjbGFzcyB0aGF0IGNhbiBiZSB1c2VkIHRvIGhvb2sgYXV0aGVudGljYXRpb24gbm90aWZpY2F0aW9ucyBpbnRvXG4gKiBBbmd1bGFyIEBDb21wb25lbnQgaW5zdGFuY2VzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXV0aGVudGljYXRlZENvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgdXNlciA6IEdlb1BsYXRmb3JtVXNlcjtcbiAgICBwcml2YXRlIGdwQXV0aFN1YnNjcmlwdGlvbiA6IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhdXRoU2VydmljZSA6IEFwcEF1dGhTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLy9mYWNhZGUgbWV0aG9kcyB0byBtaW1pYyBAQ29tcG9uZW50IGxpZmVjeWNsZSBtZXRob2RzIGluIGNhc2Ugc3ViLWNsYXNzZXNcbiAgICAvLyB3YW50IHRvIHVzZSBjb25zaXN0ZW50IG5hbWVzXG4gICAgbmdPbkluaXQoKSB7IHRoaXMuaW5pdCgpOyB9XG4gICAgbmdPbkRlc3Ryb3koKSB7IHRoaXMuZGVzdHJveSgpOyB9XG5cbiAgICAvKipcbiAgICAgKiBTdWItY2xhc3NlcyBtdXN0IGludm9rZSB0aGlzIG1ldGhvZCBpbiBvcmRlciB0byByZWdpc3RlciBsaXN0ZW5lcnNcbiAgICAgKiBmb3IgYXV0aGVudGljYXRpb24gZXZlbnRzXG4gICAgICovXG4gICAgaW5pdCgpIHtcblxuICAgICAgICBsZXQgb2JzIDogT2JzZXJ2ZXI8R2VvUGxhdGZvcm1Vc2VyPiA9IHtcbiAgICAgICAgICAgIG5leHQgOiAodmFsdWU6IEdlb1BsYXRmb3JtVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXV0aGVudGljYXRlZENvbXBvbmVudCA6IFVzZXIgY2hhbmdlZCB0byBcIiArICh2YWx1ZSA/IHZhbHVlLnVzZXJuYW1lIDogJ251bGwnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5vblVzZXJDaGFuZ2UodGhpcy51c2VyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5hYmxlIHRvIGdldCBhdXRoZW50aWNhdGVkIHVzZXIgaW5mbzogXCIgK1xuICAgICAgICAgICAgICAgICAgICAoZXJyIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZSA6ICgpID0+IHsgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZ3BBdXRoU3Vic2NyaXB0aW9uID0gdGhpcy5hdXRoU2VydmljZS5zdWJzY3JpYmUoIG9icyApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN1Yi1jbGFzc2VzIG11c3QgaW52b2tlIHRoaXMgbWV0aG9kIGluIG9yZGVyIHRvIGRlLXJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgICAqIGZvciBhdXRoZW50aWNhdGlvbiBldmVudHMgYW5kIGNsZWFuIHVwIGludGVybmFsc1xuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmKHRoaXMuZ3BBdXRoU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmdwQXV0aFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5ncEF1dGhTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICAgIGlzQXV0aGVudGljYXRlZCgpIDogYm9vbGVhbiB7IHJldHVybiAhIXRoaXMudXNlcjsgfVxuXG4gICAgLyoqIEByZXR1cm4ge0dlb1BsYXRmb3JtVXNlcn0gKi9cbiAgICBnZXRVc2VyKCkgOiBHZW9QbGF0Zm9ybVVzZXIgeyByZXR1cm4gdGhpcy51c2VyOyB9XG5cbiAgICAvKiogQHJldHVybiB7c3RyaW5nfSBKV1QgdG9rZW4gYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IHVzZXIgb3IgbnVsbCAqL1xuICAgIGdldEF1dGhUb2tlbigpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuZ2V0VG9rZW4oKTsgfVxuXG4gICAgLyoqIEByZXR1cm4gUHJvbWlzZSBjb250YWluaW5nIGN1cnJlbnQgdXNlciBvciBudWxsICovXG4gICAgY2hlY2tBdXRoKCkgOiBQcm9taXNlPEdlb1BsYXRmb3JtVXNlcj4geyByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5jaGVjaygpOyB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXRlbSAtIG9wdGlvbmFsIG9iamVjdCB0aGUgdXNlciBtYXkgYmUgYWJsZSB0byBlZGl0XG4gICAgICogQHJldHVybiBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB1c2VyIGNhbiBlZGl0IHRoZSByZXF1ZXN0ZWQgaXRlbSBvciBpcyBhbiBlZGl0b3IgaWYgbm8gaXRlbSB3YXMgc3BlY2lmaWVkXG4gICAgICovXG4gICAgY2FuVXNlckVkaXQoaXRlbSA/OiBhbnkpIHtcbiAgICAgICAgaWYoIXRoaXMudXNlcikgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZih0aGlzLnVzZXIuaXNBdXRob3JpemVkKEVESVRfUk9MRSkpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcy5pc0F1dGhvck9mKGl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpdGVtIC0gb2JqZWN0IHRoZSB1c2VyIG1heSBiZSB0aGUgb3duZXIgb2ZcbiAgICAgKiBAcmV0dXJuIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdXNlciBpcyB0aGUgYXNzb2NpYXRlZCBjcmVhdG9yL293bmVyIG9mIHRoZSBpdGVtXG4gICAgICovXG4gICAgaXNBdXRob3JPZihpdGVtID86IGFueSkge1xuICAgICAgICBpZighdGhpcy51c2VyIHx8ICFpdGVtKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBpdGVtLmNyZWF0ZWRCeSAmJiBpdGVtLmNyZWF0ZWRCeSA9PT0gdGhpcy51c2VyLnVzZXJuYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7R2VvUGxhdGZvcm1Vc2VyfSB1c2VyIC0gYXV0aGVudGljYXRlZCB1c2VyIG9iamVjdCBvciBudWxsIGlmIG5vdCBhdXRoZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25Vc2VyQ2hhbmdlKHVzZXIgOiBHZW9QbGF0Zm9ybVVzZXIpIHsgLyogaW1wbGVtZW50IGluIHN1Yi1jbGFzc2VzICovIH1cblxuXG59XG4iXX0=