import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Config } from '@geoplatform/client';
import { RPMService } from '@geoplatform/rpm/src/iRPMService';
import { authServiceFactory } from './auth.factory';
var AppAuthService = /** @class */ (function () {
    function AppAuthService(rpm) {
        this.observers = {};
        this.authService = authServiceFactory(Config);
        this.rpm = rpm;
        this.init();
    }
    AppAuthService.prototype.init = function () {
        var _this = this;
        this.user$ = new Subject();
        if (!this.authService)
            return;
        var sub = this.authService.getMessenger().raw();
        this.gpAuthSubscription = sub.subscribe(function (msg) {
            // console.log("Received Auth Message: " + msg.name);
            switch (msg.name) {
                case 'userAuthenticated':
                    _this.onUserChange(msg.user);
                    break;
                case 'userSignOut':
                    _this.onUserChange(null);
                    break;
            }
        });
        this.authService.getUser().then(function (user) { _this.onUserChange(user); });
    };
    AppAuthService.prototype.onUserChange = function (user) {
        console.log("AuthService.onUserChange() : User is " + (user ? user.username : 'N/A'));
        this.user = user;
        // this.rpm.setUserId( user ? user.id : null);
        this.user$.next(user);
    };
    /**
     *
     */
    AppAuthService.prototype.getMessenger = function () {
        return this.authService ? this.authService.getMessenger().raw() : null;
    };
    AppAuthService.prototype.isAuthenticated = function () {
        return !!this.user;
    };
    AppAuthService.prototype.getUser = function () {
        return this.user;
    };
    AppAuthService.prototype.getToken = function () {
        return this.authService ? this.authService.getJWT() : null;
    };
    /**
     * Check the underlying authentication mechanism endpoint to validate the
     * current JWT token (if one exists) is not expired or revoked.
     * @return GeoPlatformUser or null
     */
    AppAuthService.prototype.check = function () {
        var _this = this;
        if (!this.authService)
            return Promise.resolve(null);
        return this.authService.checkWithClient()
            .then(function (token) { return _this.authService.getUser(); })
            .then(function (user) {
            setTimeout(function () { _this.onUserChange(user); }, 100);
            return user;
        });
    };
    AppAuthService.prototype.login = function () {
        this.authService.login();
    };
    AppAuthService.prototype.logout = function () {
        this.authService.logout();
    };
    /**
     *
     */
    AppAuthService.prototype.subscribe = function (callback) {
        return this.user$.subscribe(callback);
    };
    AppAuthService.prototype.dispose = function () {
        if (this.gpAuthSubscription) {
            this.gpAuthSubscription.unsubscribe();
            this.gpAuthSubscription = null;
        }
        this.user = null;
        this.user$ = null;
        this.observers = null;
        this.authService = null;
    };
    AppAuthService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [RPMService,] }] }
    ]; };
    AppAuthService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(RPMService))
    ], AppAuthService);
    return AppAuthService;
}());
export { AppAuthService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImF1dGgvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQXdCLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQTtBQU03RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUlwRDtJQVlJLHdCQUFpQyxHQUFnQjtRQVJ6QyxjQUFTLEdBQ2IsRUFBaUQsQ0FBQztRQVFsRCxJQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFHRCw2QkFBSSxHQUFKO1FBQUEsaUJBaUJDO1FBZkcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztRQUU1QyxJQUFHLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBRTdCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ3ZDLHFEQUFxRDtZQUNyRCxRQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUM7Z0JBQ1osS0FBSyxtQkFBbUI7b0JBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7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O0lBQzVCLENBQUM7O2dEQTdGYSxNQUFNLFNBQUMsVUFBVTs7SUFadEIsY0FBYztRQUQxQixVQUFVLEVBQUU7UUFhSyxtQkFBQSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7T0FadkIsY0FBYyxDQTBHMUI7SUFBRCxxQkFBQztDQUFBLEFBMUdELElBMEdDO1NBMUdZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgUlBNU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vc3JjL2lSUE1TZXJ2aWNlJ1xuXG5pbXBvcnQge1xuICAgIG5nR3BvYXV0aEZhY3RvcnksIEF1dGhTZXJ2aWNlLCBHZW9QbGF0Zm9ybVVzZXJcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL29hdXRoLW5nL2FuZ3VsYXInO1xuXG5pbXBvcnQgeyBhdXRoU2VydmljZUZhY3RvcnkgfSBmcm9tICcuL2F1dGguZmFjdG9yeSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwcEF1dGhTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgdXNlciA6IEdlb1BsYXRmb3JtVXNlcjtcbiAgICBwcml2YXRlIHVzZXIkIDogU3ViamVjdDxHZW9QbGF0Zm9ybVVzZXI+O1xuICAgIHByaXZhdGUgb2JzZXJ2ZXJzIDogeyBba2V5OnN0cmluZ106IE9ic2VydmVyPEdlb1BsYXRmb3JtVXNlcj4gfSA9XG4gICAgICAgIHt9IGFzIHsgW2tleTpzdHJpbmddOiBPYnNlcnZlcjxHZW9QbGF0Zm9ybVVzZXI+IH07XG4gICAgcHJpdmF0ZSBncEF1dGhTdWJzY3JpcHRpb24gOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZSA6IEF1dGhTZXJ2aWNlO1xuICAgIHByaXZhdGUgcnBtOiBSUE1TZXJ2aWNlO1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKCBASW5qZWN0KFJQTVNlcnZpY2UpIHJwbSA6IFJQTVNlcnZpY2UgKSB7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UgPSBhdXRoU2VydmljZUZhY3RvcnkoQ29uZmlnKTtcbiAgICAgICAgdGhpcy5ycG0gPSBycG07XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcblxuICAgICAgICB0aGlzLnVzZXIkID0gbmV3IFN1YmplY3Q8R2VvUGxhdGZvcm1Vc2VyPigpO1xuXG4gICAgICAgIGlmKCF0aGlzLmF1dGhTZXJ2aWNlKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5hdXRoU2VydmljZS5nZXRNZXNzZW5nZXIoKS5yYXcoKTtcbiAgICAgICAgdGhpcy5ncEF1dGhTdWJzY3JpcHRpb24gPSBzdWIuc3Vic2NyaWJlKG1zZyA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIEF1dGggTWVzc2FnZTogXCIgKyBtc2cubmFtZSk7XG4gICAgICAgICAgICBzd2l0Y2gobXNnLm5hbWUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJBdXRoZW50aWNhdGVkJzogdGhpcy5vblVzZXJDaGFuZ2UobXNnLnVzZXIpOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd1c2VyU2lnbk91dCc6IHRoaXMub25Vc2VyQ2hhbmdlKG51bGwpOyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5nZXRVc2VyKCkudGhlbiggdXNlciA9PiB7IHRoaXMub25Vc2VyQ2hhbmdlKHVzZXIpOyB9KTtcblxuICAgIH1cblxuICAgIG9uVXNlckNoYW5nZSh1c2VyIDogR2VvUGxhdGZvcm1Vc2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXV0aFNlcnZpY2Uub25Vc2VyQ2hhbmdlKCkgOiBVc2VyIGlzIFwiICsgKHVzZXIgPyB1c2VyLnVzZXJuYW1lIDogJ04vQScpKTtcbiAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgLy8gdGhpcy5ycG0uc2V0VXNlcklkKCB1c2VyID8gdXNlci5pZCA6IG51bGwpO1xuICAgICAgICB0aGlzLnVzZXIkLm5leHQodXNlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXRNZXNzZW5nZXIoKSA6IFN1YmplY3Q8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UgPyB0aGlzLmF1dGhTZXJ2aWNlLmdldE1lc3NlbmdlcigpLnJhdygpIDogbnVsbDtcbiAgICB9XG5cblxuICAgIGlzQXV0aGVudGljYXRlZCgpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMudXNlcjtcbiAgICB9XG5cbiAgICBnZXRVc2VyKCkgOiBHZW9QbGF0Zm9ybVVzZXIge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyO1xuICAgIH1cblxuICAgIGdldFRva2VuKCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZSA/IHRoaXMuYXV0aFNlcnZpY2UuZ2V0SldUKCkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoZSB1bmRlcmx5aW5nIGF1dGhlbnRpY2F0aW9uIG1lY2hhbmlzbSBlbmRwb2ludCB0byB2YWxpZGF0ZSB0aGVcbiAgICAgKiBjdXJyZW50IEpXVCB0b2tlbiAoaWYgb25lIGV4aXN0cykgaXMgbm90IGV4cGlyZWQgb3IgcmV2b2tlZC5cbiAgICAgKiBAcmV0dXJuIEdlb1BsYXRmb3JtVXNlciBvciBudWxsXG4gICAgICovXG4gICAgY2hlY2soKSA6IFByb21pc2U8R2VvUGxhdGZvcm1Vc2VyPiB7XG4gICAgICAgIGlmKCF0aGlzLmF1dGhTZXJ2aWNlKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5jaGVja1dpdGhDbGllbnQoKVxuICAgICAgICAudGhlbiggdG9rZW4gPT4gdGhpcy5hdXRoU2VydmljZS5nZXRVc2VyKCkgKVxuICAgICAgICAudGhlbiggdXNlciA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7IHRoaXMub25Vc2VyQ2hhbmdlKHVzZXIpOyB9LDEwMCApO1xuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ2luKCkge1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luKCk7XG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgc3Vic2NyaWJlKCBjYWxsYmFjayA6IE9ic2VydmVyPEdlb1BsYXRmb3JtVXNlcj4gKSA6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXIkLnN1YnNjcmliZSggY2FsbGJhY2sgKTtcbiAgICB9XG5cblxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmKHRoaXMuZ3BBdXRoU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmdwQXV0aFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5ncEF1dGhTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4gICAgICAgIHRoaXMudXNlciQgPSBudWxsO1xuICAgICAgICB0aGlzLm9ic2VydmVycyA9IG51bGw7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UgPSBudWxsO1xuICAgIH1cbn1cbiJdfQ==