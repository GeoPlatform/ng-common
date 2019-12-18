import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Config } from '@geoplatform/client';
import { RPMService } from '@geoplatform/rpm/src/iRPMService';
import { authServiceFactory } from './auth.factory';
import { logger } from "../logger";
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
            logger.debug("Received Auth Message: " + msg.name);
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
        logger.debug("AuthService.onUserChange() : User is " + (user ? user.username : 'N/A'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImF1dGgvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQXdCLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQTtBQU03RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7QUFLbkM7SUFZSSx3QkFBaUMsR0FBZ0I7UUFSekMsY0FBUyxHQUNiLEVBQWlELENBQUM7UUFRbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBR0QsNkJBQUksR0FBSjtRQUFBLGlCQWlCQztRQWZHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFFNUMsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUU3QixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztZQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxR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QyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7O2dEQTdGYSxNQUFNLFNBQUMsVUFBVTs7O0lBWnRCLGNBQWM7UUFEMUIsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO1FBYWYsbUJBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO09BWnZCLGNBQWMsQ0EwRzFCO3lCQXpIRDtDQXlIQyxBQTFHRCxJQTBHQztTQTFHWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcbmltcG9ydCB7IFJQTVNlcnZpY2UgfSBmcm9tICdAZ2VvcGxhdGZvcm0vcnBtL3NyYy9pUlBNU2VydmljZSdcblxuaW1wb3J0IHtcbiAgICBuZ0dwb2F1dGhGYWN0b3J5LCBBdXRoU2VydmljZSwgR2VvUGxhdGZvcm1Vc2VyXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9vYXV0aC1uZy9hbmd1bGFyJztcblxuaW1wb3J0IHsgYXV0aFNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi9hdXRoLmZhY3RvcnknO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uL2xvZ2dlclwiO1xuXG5cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQXBwQXV0aFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSB1c2VyIDogR2VvUGxhdGZvcm1Vc2VyO1xuICAgIHByaXZhdGUgdXNlciQgOiBTdWJqZWN0PEdlb1BsYXRmb3JtVXNlcj47XG4gICAgcHJpdmF0ZSBvYnNlcnZlcnMgOiB7IFtrZXk6c3RyaW5nXTogT2JzZXJ2ZXI8R2VvUGxhdGZvcm1Vc2VyPiB9ID1cbiAgICAgICAge30gYXMgeyBba2V5OnN0cmluZ106IE9ic2VydmVyPEdlb1BsYXRmb3JtVXNlcj4gfTtcbiAgICBwcml2YXRlIGdwQXV0aFN1YnNjcmlwdGlvbiA6IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlIDogQXV0aFNlcnZpY2U7XG4gICAgcHJpdmF0ZSBycG06IFJQTVNlcnZpY2U7XG5cblxuXG4gICAgY29uc3RydWN0b3IoIEBJbmplY3QoUlBNU2VydmljZSkgcnBtIDogUlBNU2VydmljZSApIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZSA9IGF1dGhTZXJ2aWNlRmFjdG9yeShDb25maWcpO1xuICAgICAgICB0aGlzLnJwbSA9IHJwbTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG5cbiAgICBpbml0KCkge1xuXG4gICAgICAgIHRoaXMudXNlciQgPSBuZXcgU3ViamVjdDxHZW9QbGF0Zm9ybVVzZXI+KCk7XG5cbiAgICAgICAgaWYoIXRoaXMuYXV0aFNlcnZpY2UpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLmF1dGhTZXJ2aWNlLmdldE1lc3NlbmdlcigpLnJhdygpO1xuICAgICAgICB0aGlzLmdwQXV0aFN1YnNjcmlwdGlvbiA9IHN1Yi5zdWJzY3JpYmUobXNnID0+IHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhcIlJlY2VpdmVkIEF1dGggTWVzc2FnZTogXCIgKyBtc2cubmFtZSk7XG4gICAgICAgICAgICBzd2l0Y2gobXNnLm5hbWUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJBdXRoZW50aWNhdGVkJzogdGhpcy5vblVzZXJDaGFuZ2UobXNnLnVzZXIpOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd1c2VyU2lnbk91dCc6IHRoaXMub25Vc2VyQ2hhbmdlKG51bGwpOyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5nZXRVc2VyKCkudGhlbiggdXNlciA9PiB7IHRoaXMub25Vc2VyQ2hhbmdlKHVzZXIpOyB9KTtcblxuICAgIH1cblxuICAgIG9uVXNlckNoYW5nZSh1c2VyIDogR2VvUGxhdGZvcm1Vc2VyKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcIkF1dGhTZXJ2aWNlLm9uVXNlckNoYW5nZSgpIDogVXNlciBpcyBcIiArICh1c2VyID8gdXNlci51c2VybmFtZSA6ICdOL0EnKSk7XG4gICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICAgIC8vIHRoaXMucnBtLnNldFVzZXJJZCggdXNlciA/IHVzZXIuaWQgOiBudWxsKTtcbiAgICAgICAgdGhpcy51c2VyJC5uZXh0KHVzZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0TWVzc2VuZ2VyKCkgOiBTdWJqZWN0PGFueT57XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlID8gdGhpcy5hdXRoU2VydmljZS5nZXRNZXNzZW5nZXIoKS5yYXcoKSA6IG51bGw7XG4gICAgfVxuXG5cbiAgICBpc0F1dGhlbnRpY2F0ZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLnVzZXI7XG4gICAgfVxuXG4gICAgZ2V0VXNlcigpIDogR2VvUGxhdGZvcm1Vc2VyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlcjtcbiAgICB9XG5cbiAgICBnZXRUb2tlbigpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UgPyB0aGlzLmF1dGhTZXJ2aWNlLmdldEpXVCgpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgdW5kZXJseWluZyBhdXRoZW50aWNhdGlvbiBtZWNoYW5pc20gZW5kcG9pbnQgdG8gdmFsaWRhdGUgdGhlXG4gICAgICogY3VycmVudCBKV1QgdG9rZW4gKGlmIG9uZSBleGlzdHMpIGlzIG5vdCBleHBpcmVkIG9yIHJldm9rZWQuXG4gICAgICogQHJldHVybiBHZW9QbGF0Zm9ybVVzZXIgb3IgbnVsbFxuICAgICAqL1xuICAgIGNoZWNrKCkgOiBQcm9taXNlPEdlb1BsYXRmb3JtVXNlcj4ge1xuICAgICAgICBpZighdGhpcy5hdXRoU2VydmljZSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuY2hlY2tXaXRoQ2xpZW50KClcbiAgICAgICAgLnRoZW4oIHRva2VuID0+IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlcigpIClcbiAgICAgICAgLnRoZW4oIHVzZXIgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4geyB0aGlzLm9uVXNlckNoYW5nZSh1c2VyKTsgfSwxMDAgKTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2dpbigpIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dpbigpO1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHN1YnNjcmliZSggY2FsbGJhY2sgOiBPYnNlcnZlcjxHZW9QbGF0Zm9ybVVzZXI+ICkgOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyJC5zdWJzY3JpYmUoIGNhbGxiYWNrICk7XG4gICAgfVxuXG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZih0aGlzLmdwQXV0aFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5ncEF1dGhTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuZ3BBdXRoU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnVzZXIkID0gbnVsbDtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBudWxsO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlID0gbnVsbDtcbiAgICB9XG59XG4iXX0=