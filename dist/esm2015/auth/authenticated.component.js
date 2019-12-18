import { logger } from '../logger';
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
                logger.debug("AuthenticatedComponent : User changed to " + (value ? value.username : 'null'));
                this.user = value;
                this.onUserChange(this.user);
            },
            error: (err) => {
                logger.error("Unable to get authenticated user info: " +
                    err.message);
            },
            complete: () => { }
        };
        this.gpAuthSubscription = this.authService.subscribe(obs);
        //for components that initialize AFTER a user has changed auth state,
        // we need to fetch the current user details
        this.user = this.authService.getUser();
        this.onUserChange(this.user);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRlZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiYXV0aC9hdXRoZW50aWNhdGVkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUc5Qjs7O0dBR0c7QUFDSCxNQUFNLE9BQWdCLHNCQUFzQjtJQUt4QyxZQUFzQixXQUE0QjtRQUE1QixnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7SUFDbEQsQ0FBQztJQUVELDBFQUEwRTtJQUMxRSwrQkFBK0I7SUFDL0IsUUFBUSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0IsV0FBVyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFakM7OztPQUdHO0lBQ0gsSUFBSTtRQUVBLElBQUksR0FBRyxHQUErQjtZQUNsQyxJQUFJLEVBQUcsQ0FBQyxLQUFzQixFQUFFLEVBQUU7Z0JBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkNBQTJDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzlGLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBQ0QsS0FBSyxFQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMseUNBQXlDO29CQUNqRCxHQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUNELFFBQVEsRUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUUsR0FBRyxDQUFFLENBQUM7UUFFNUQscUVBQXFFO1FBQ3JFLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNILE9BQU87UUFDSCxJQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN4QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCx3QkFBd0I7SUFDeEIsZUFBZSxLQUFlLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRW5ELGdDQUFnQztJQUNoQyxPQUFPLEtBQXVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFakQsMEVBQTBFO0lBQzFFLFlBQVksS0FBYyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRS9ELHNEQUFzRDtJQUN0RCxTQUFTLEtBQWdDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFM0U7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLElBQVc7UUFDbkIsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDNUIsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFVBQVUsQ0FBQyxJQUFXO1FBQ2xCLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25FLENBQUM7SUFFRDs7T0FFRztJQUNPLFlBQVksQ0FBQyxJQUFzQixJQUFtQyxDQUFDO0NBR3BGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UsIEdlb1BsYXRmb3JtVXNlciB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9vYXV0aC1uZy9hbmd1bGFyJztcblxuaW1wb3J0IHsgQXBwQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi9sb2dnZXInO1xuXG5jb25zdCBFRElUX1JPTEUgPSAnZ3BfZWRpdG9yJztcblxuXG4vKipcbiAqIEJhc2UgY2xhc3MgdGhhdCBjYW4gYmUgdXNlZCB0byBob29rIGF1dGhlbnRpY2F0aW9uIG5vdGlmaWNhdGlvbnMgaW50b1xuICogQW5ndWxhciBAQ29tcG9uZW50IGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEF1dGhlbnRpY2F0ZWRDb21wb25lbnQge1xuXG4gICAgcHVibGljIHVzZXIgOiBHZW9QbGF0Zm9ybVVzZXI7XG4gICAgcHJpdmF0ZSBncEF1dGhTdWJzY3JpcHRpb24gOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYXV0aFNlcnZpY2UgOiBBcHBBdXRoU2VydmljZSkge1xuICAgIH1cblxuICAgIC8vZmFjYWRlIG1ldGhvZHMgdG8gbWltaWMgQENvbXBvbmVudCBsaWZlY3ljbGUgbWV0aG9kcyBpbiBjYXNlIHN1Yi1jbGFzc2VzXG4gICAgLy8gd2FudCB0byB1c2UgY29uc2lzdGVudCBuYW1lc1xuICAgIG5nT25Jbml0KCkgeyB0aGlzLmluaXQoKTsgfVxuICAgIG5nT25EZXN0cm95KCkgeyB0aGlzLmRlc3Ryb3koKTsgfVxuXG4gICAgLyoqXG4gICAgICogU3ViLWNsYXNzZXMgbXVzdCBpbnZva2UgdGhpcyBtZXRob2QgaW4gb3JkZXIgdG8gcmVnaXN0ZXIgbGlzdGVuZXJzXG4gICAgICogZm9yIGF1dGhlbnRpY2F0aW9uIGV2ZW50c1xuICAgICAqL1xuICAgIGluaXQoKSB7XG5cbiAgICAgICAgbGV0IG9icyA6IE9ic2VydmVyPEdlb1BsYXRmb3JtVXNlcj4gPSB7XG4gICAgICAgICAgICBuZXh0IDogKHZhbHVlOiBHZW9QbGF0Zm9ybVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoXCJBdXRoZW50aWNhdGVkQ29tcG9uZW50IDogVXNlciBjaGFuZ2VkIHRvIFwiICsgKHZhbHVlID8gdmFsdWUudXNlcm5hbWUgOiAnbnVsbCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVXNlckNoYW5nZSh0aGlzLnVzZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKFwiVW5hYmxlIHRvIGdldCBhdXRoZW50aWNhdGVkIHVzZXIgaW5mbzogXCIgK1xuICAgICAgICAgICAgICAgICAgICAoZXJyIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZSA6ICgpID0+IHsgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZ3BBdXRoU3Vic2NyaXB0aW9uID0gdGhpcy5hdXRoU2VydmljZS5zdWJzY3JpYmUoIG9icyApO1xuXG4gICAgICAgIC8vZm9yIGNvbXBvbmVudHMgdGhhdCBpbml0aWFsaXplIEFGVEVSIGEgdXNlciBoYXMgY2hhbmdlZCBhdXRoIHN0YXRlLFxuICAgICAgICAvLyB3ZSBuZWVkIHRvIGZldGNoIHRoZSBjdXJyZW50IHVzZXIgZGV0YWlsc1xuICAgICAgICB0aGlzLnVzZXIgPSB0aGlzLmF1dGhTZXJ2aWNlLmdldFVzZXIoKTtcbiAgICAgICAgdGhpcy5vblVzZXJDaGFuZ2UodGhpcy51c2VyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdWItY2xhc3NlcyBtdXN0IGludm9rZSB0aGlzIG1ldGhvZCBpbiBvcmRlciB0byBkZS1yZWdpc3RlciBsaXN0ZW5lcnNcbiAgICAgKiBmb3IgYXV0aGVudGljYXRpb24gZXZlbnRzIGFuZCBjbGVhbiB1cCBpbnRlcm5hbHNcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZih0aGlzLmdwQXV0aFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5ncEF1dGhTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuZ3BBdXRoU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgICBpc0F1dGhlbnRpY2F0ZWQoKSA6IGJvb2xlYW4geyByZXR1cm4gISF0aGlzLnVzZXI7IH1cblxuICAgIC8qKiBAcmV0dXJuIHtHZW9QbGF0Zm9ybVVzZXJ9ICovXG4gICAgZ2V0VXNlcigpIDogR2VvUGxhdGZvcm1Vc2VyIHsgcmV0dXJuIHRoaXMudXNlcjsgfVxuXG4gICAgLyoqIEByZXR1cm4ge3N0cmluZ30gSldUIHRva2VuIGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudCB1c2VyIG9yIG51bGwgKi9cbiAgICBnZXRBdXRoVG9rZW4oKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmdldFRva2VuKCk7IH1cblxuICAgIC8qKiBAcmV0dXJuIFByb21pc2UgY29udGFpbmluZyBjdXJyZW50IHVzZXIgb3IgbnVsbCAqL1xuICAgIGNoZWNrQXV0aCgpIDogUHJvbWlzZTxHZW9QbGF0Zm9ybVVzZXI+IHsgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuY2hlY2soKTsgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW0gLSBvcHRpb25hbCBvYmplY3QgdGhlIHVzZXIgbWF5IGJlIGFibGUgdG8gZWRpdFxuICAgICAqIEByZXR1cm4gYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdXNlciBjYW4gZWRpdCB0aGUgcmVxdWVzdGVkIGl0ZW0gb3IgaXMgYW4gZWRpdG9yIGlmIG5vIGl0ZW0gd2FzIHNwZWNpZmllZFxuICAgICAqL1xuICAgIGNhblVzZXJFZGl0KGl0ZW0gPzogYW55KSA6IGJvb2xlYW4ge1xuICAgICAgICBpZighdGhpcy51c2VyKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKHRoaXMudXNlci5pc0F1dGhvcml6ZWQoRURJVF9ST0xFKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQXV0aG9yT2YoaXRlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW0gLSBvYmplY3QgdGhlIHVzZXIgbWF5IGJlIHRoZSBvd25lciBvZlxuICAgICAqIEByZXR1cm4gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIGlzIHRoZSBhc3NvY2lhdGVkIGNyZWF0b3Ivb3duZXIgb2YgdGhlIGl0ZW1cbiAgICAgKi9cbiAgICBpc0F1dGhvck9mKGl0ZW0gPzogYW55KSA6IGJvb2xlYW4ge1xuICAgICAgICBpZighdGhpcy51c2VyIHx8ICFpdGVtKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBpdGVtLmNyZWF0ZWRCeSAmJiBpdGVtLmNyZWF0ZWRCeSA9PT0gdGhpcy51c2VyLnVzZXJuYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7R2VvUGxhdGZvcm1Vc2VyfSB1c2VyIC0gYXV0aGVudGljYXRlZCB1c2VyIG9iamVjdCBvciBudWxsIGlmIG5vdCBhdXRoZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25Vc2VyQ2hhbmdlKHVzZXIgOiBHZW9QbGF0Zm9ybVVzZXIpIHsgLyogaW1wbGVtZW50IGluIHN1Yi1jbGFzc2VzICovIH1cblxuXG59XG4iXX0=