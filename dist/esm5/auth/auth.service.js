import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Config } from '@geoplatform/client';
import { RPMService } from '@geoplatform/rpm/src/iRPMService';
import { authServiceFactory } from './auth.factory';
import * as i0 from "@angular/core";
import * as i1 from "@geoplatform/rpm/src/iRPMService";
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
    AppAuthService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AppAuthService_Factory() { return new AppAuthService(i0.ɵɵinject(i1.RPMService)); }, token: AppAuthService, providedIn: "root" });
    AppAuthService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__param(0, Inject(RPMService))
    ], AppAuthService);
    return AppAuthService;
}());
export { AppAuthService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImF1dGgvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQXdCLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQTtBQU03RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBSXBEO0lBWUksd0JBQWlDLEdBQWdCO1FBUnpDLGNBQVMsR0FDYixFQUFpRCxDQUFDO1FBUWxELElBQUksQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUdELDZCQUFJLEdBQUo7UUFBQSxpQkFpQkM7UUFmRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBRTVDLElBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFFN0IsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDdkMscURBQXFEO1lBQ3JELFFBQU8sR0FBRyxDQUFDLElBQUksRUFBQztnQkFDWixLQUFLLG1CQUFtQjtvQkFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FB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QUM7SUFDNUIsQ0FBQzs7Z0RBN0ZhLE1BQU0sU0FBQyxVQUFVOzs7SUFadEIsY0FBYztRQUQxQixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7UUFhZixtQkFBQSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7T0FadkIsY0FBYyxDQTBHMUI7eUJBdkhEO0NBdUhDLEFBMUdELElBMEdDO1NBMUdZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgUlBNU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vc3JjL2lSUE1TZXJ2aWNlJ1xuXG5pbXBvcnQge1xuICAgIG5nR3BvYXV0aEZhY3RvcnksIEF1dGhTZXJ2aWNlLCBHZW9QbGF0Zm9ybVVzZXJcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL29hdXRoLW5nL2FuZ3VsYXInO1xuXG5pbXBvcnQgeyBhdXRoU2VydmljZUZhY3RvcnkgfSBmcm9tICcuL2F1dGguZmFjdG9yeSc7XG5cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQXBwQXV0aFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSB1c2VyIDogR2VvUGxhdGZvcm1Vc2VyO1xuICAgIHByaXZhdGUgdXNlciQgOiBTdWJqZWN0PEdlb1BsYXRmb3JtVXNlcj47XG4gICAgcHJpdmF0ZSBvYnNlcnZlcnMgOiB7IFtrZXk6c3RyaW5nXTogT2JzZXJ2ZXI8R2VvUGxhdGZvcm1Vc2VyPiB9ID1cbiAgICAgICAge30gYXMgeyBba2V5OnN0cmluZ106IE9ic2VydmVyPEdlb1BsYXRmb3JtVXNlcj4gfTtcbiAgICBwcml2YXRlIGdwQXV0aFN1YnNjcmlwdGlvbiA6IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlIDogQXV0aFNlcnZpY2U7XG4gICAgcHJpdmF0ZSBycG06IFJQTVNlcnZpY2U7XG5cblxuXG4gICAgY29uc3RydWN0b3IoIEBJbmplY3QoUlBNU2VydmljZSkgcnBtIDogUlBNU2VydmljZSApIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZSA9IGF1dGhTZXJ2aWNlRmFjdG9yeShDb25maWcpO1xuICAgICAgICB0aGlzLnJwbSA9IHJwbTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG5cbiAgICBpbml0KCkge1xuXG4gICAgICAgIHRoaXMudXNlciQgPSBuZXcgU3ViamVjdDxHZW9QbGF0Zm9ybVVzZXI+KCk7XG5cbiAgICAgICAgaWYoIXRoaXMuYXV0aFNlcnZpY2UpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLmF1dGhTZXJ2aWNlLmdldE1lc3NlbmdlcigpLnJhdygpO1xuICAgICAgICB0aGlzLmdwQXV0aFN1YnNjcmlwdGlvbiA9IHN1Yi5zdWJzY3JpYmUobXNnID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUmVjZWl2ZWQgQXV0aCBNZXNzYWdlOiBcIiArIG1zZy5uYW1lKTtcbiAgICAgICAgICAgIHN3aXRjaChtc2cubmFtZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAndXNlckF1dGhlbnRpY2F0ZWQnOiB0aGlzLm9uVXNlckNoYW5nZShtc2cudXNlcik7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJTaWduT3V0JzogdGhpcy5vblVzZXJDaGFuZ2UobnVsbCk7IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmdldFVzZXIoKS50aGVuKCB1c2VyID0+IHsgdGhpcy5vblVzZXJDaGFuZ2UodXNlcik7IH0pO1xuXG4gICAgfVxuXG4gICAgb25Vc2VyQ2hhbmdlKHVzZXIgOiBHZW9QbGF0Zm9ybVVzZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBdXRoU2VydmljZS5vblVzZXJDaGFuZ2UoKSA6IFVzZXIgaXMgXCIgKyAodXNlciA/IHVzZXIudXNlcm5hbWUgOiAnTi9BJykpO1xuICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICAvLyB0aGlzLnJwbS5zZXRVc2VySWQoIHVzZXIgPyB1c2VyLmlkIDogbnVsbCk7XG4gICAgICAgIHRoaXMudXNlciQubmV4dCh1c2VyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGdldE1lc3NlbmdlcigpIDogU3ViamVjdDxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZSA/IHRoaXMuYXV0aFNlcnZpY2UuZ2V0TWVzc2VuZ2VyKCkucmF3KCkgOiBudWxsO1xuICAgIH1cblxuXG4gICAgaXNBdXRoZW50aWNhdGVkKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy51c2VyO1xuICAgIH1cblxuICAgIGdldFVzZXIoKSA6IEdlb1BsYXRmb3JtVXNlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXI7XG4gICAgfVxuXG4gICAgZ2V0VG9rZW4oKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlID8gdGhpcy5hdXRoU2VydmljZS5nZXRKV1QoKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIHVuZGVybHlpbmcgYXV0aGVudGljYXRpb24gbWVjaGFuaXNtIGVuZHBvaW50IHRvIHZhbGlkYXRlIHRoZVxuICAgICAqIGN1cnJlbnQgSldUIHRva2VuIChpZiBvbmUgZXhpc3RzKSBpcyBub3QgZXhwaXJlZCBvciByZXZva2VkLlxuICAgICAqIEByZXR1cm4gR2VvUGxhdGZvcm1Vc2VyIG9yIG51bGxcbiAgICAgKi9cbiAgICBjaGVjaygpIDogUHJvbWlzZTxHZW9QbGF0Zm9ybVVzZXI+IHtcbiAgICAgICAgaWYoIXRoaXMuYXV0aFNlcnZpY2UpIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmNoZWNrV2l0aENsaWVudCgpXG4gICAgICAgIC50aGVuKCB0b2tlbiA9PiB0aGlzLmF1dGhTZXJ2aWNlLmdldFVzZXIoKSApXG4gICAgICAgIC50aGVuKCB1c2VyID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHsgdGhpcy5vblVzZXJDaGFuZ2UodXNlcik7IH0sMTAwICk7XG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9naW4oKSB7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9naW4oKTtcbiAgICB9XG5cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBzdWJzY3JpYmUoIGNhbGxiYWNrIDogT2JzZXJ2ZXI8R2VvUGxhdGZvcm1Vc2VyPiApIDogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlciQuc3Vic2NyaWJlKCBjYWxsYmFjayApO1xuICAgIH1cblxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYodGhpcy5ncEF1dGhTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZ3BBdXRoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmdwQXV0aFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy51c2VyJCA9IG51bGw7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZSA9IG51bGw7XG4gICAgfVxufVxuIl19