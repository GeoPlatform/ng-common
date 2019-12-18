import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { of, empty } from 'rxjs';
import { ItemService, TrackingService, TrackingTypes, TrackingEventFactory } from '@geoplatform/client';
import { ItemFactory } from './item-factory';
import { GeoPlatformError } from './error';
var ItemResolver = /** @class */ (function () {
    function ItemResolver(service, trackingService) {
        this.service = service;
        this.trackingService = trackingService;
    }
    ItemResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var id = route.paramMap.get('id');
        var opts = {};
        var version = route.paramMap.get("version");
        if (version)
            opts.version = version;
        return this.service.get(id, opts)
            .then(function (item) {
            if (_this.trackingService) {
                var event_1 = TrackingEventFactory(TrackingTypes.VIEWED, item);
                _this.trackingService.logEvent(event_1);
            }
            return item;
        })
            .catch(function (e) { return of(e); });
    };
    ItemResolver.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [TrackingService,] }] }
    ]; };
    ItemResolver = tslib_1.__decorate([
        Injectable( /*{ providedIn: 'root' }*/),
        tslib_1.__param(0, Inject(ItemService)),
        tslib_1.__param(1, Inject(TrackingService))
    ], ItemResolver);
    return ItemResolver;
}());
export { ItemResolver };
var VersionResolver = /** @class */ (function () {
    function VersionResolver() {
    }
    VersionResolver.prototype.resolve = function (route, state) {
        var version = route.paramMap.get("version");
        return Promise.resolve(version || null);
    };
    VersionResolver = tslib_1.__decorate([
        Injectable( /*{ providedIn: 'root' }*/)
    ], VersionResolver);
    return VersionResolver;
}());
export { VersionResolver };
var NewItemResolver = /** @class */ (function () {
    function NewItemResolver(router) {
        this.router = router;
    }
    NewItemResolver.prototype.resolve = function (route, state) {
        var type = route.params.type;
        var item = ItemFactory.create(type);
        if (!item) {
            var gpe = new GeoPlatformError("Type " + type + " is unsupported", "Unsupported Type", 400);
            // this.errorService.setError(gpe);
            this.router.navigateByUrl('error', { skipLocationChange: false });
            return empty();
        }
        else {
            return of(item);
        }
    };
    NewItemResolver.ctorParameters = function () { return [
        { type: Router }
    ]; };
    NewItemResolver = tslib_1.__decorate([
        Injectable()
    ], NewItemResolver);
    return NewItemResolver;
}());
export { NewItemResolver };
var ErrorResolver = /** @class */ (function () {
    function ErrorResolver(router) {
        this.router = router;
    }
    ErrorResolver.prototype.resolve = function (route, state) {
        var type = route.params.type;
        var msg = "An error has occurred";
        if ("unsupported" === type)
            msg = "Type " + type + " is not supported";
        else if ("404" === type)
            msg = "Item not found";
        var error = new Error(msg);
        // error.error = "Unsupported Type";
        return of(error);
    };
    ErrorResolver.ctorParameters = function () { return [
        { type: Router }
    ]; };
    ErrorResolver = tslib_1.__decorate([
        Injectable()
    ], ErrorResolver);
    return ErrorResolver;
}());
export { ErrorResolver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInJlc29sdmVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUNILE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQy9ELE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUNHLFdBQVcsRUFDakIsZUFBZSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFDdkQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQVksZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQWdCLFNBQVMsQ0FBQztBQUdyRDtJQUVJLHNCQUNpQyxPQUFxQixFQUNqQixlQUFpQztRQURyQyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQ2pCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtJQUV0RSxDQUFDO0lBRUQsOEJBQU8sR0FBUCxVQUNJLEtBQTZCLEVBQzdCLEtBQTBCO1FBRjlCLGlCQWtCQztRQWJHLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksSUFBSSxHQUFTLEVBQUUsQ0FBQztRQUNwQixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFHLE9BQU87WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUM7YUFD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QUM7SUFDckIsQ0FBQzs7Z0JBWDJCLE1BQU07O0lBRHpCLGFBQWE7UUFEekIsVUFBVSxFQUFFO09BQ0EsYUFBYSxDQWF6QjtJQUFELG9CQUFDO0NBQUEsQUFiRCxJQWFDO1NBYlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIFJlc29sdmVcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBlbXB0eSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBJdGVtLCBJdGVtU2VydmljZSxcbiAgICBUcmFja2luZ1NlcnZpY2UsIFRyYWNraW5nVHlwZXMsIFRyYWNraW5nRXZlbnRGYWN0b3J5XG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgSXRlbUZhY3RvcnkgfSAgICAgICBmcm9tICcuL2l0ZW0tZmFjdG9yeSc7XG5pbXBvcnQgeyBHZW9QbGF0Zm9ybUVycm9yIH0gICAgICAgICAgIGZyb20gJy4vZXJyb3InO1xuXG5ASW5qZWN0YWJsZSgvKnsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0qLylcbmV4cG9ydCBjbGFzcyBJdGVtUmVzb2x2ZXIgaW1wbGVtZW50cyBSZXNvbHZlPEl0ZW0+IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEl0ZW1TZXJ2aWNlKSBwcml2YXRlIHNlcnZpY2UgOiBJdGVtU2VydmljZSxcbiAgICAgICAgQEluamVjdChUcmFja2luZ1NlcnZpY2UpIHByaXZhdGUgdHJhY2tpbmdTZXJ2aWNlIDogVHJhY2tpbmdTZXJ2aWNlXG4gICAgKSB7XG4gICAgfVxuXG4gICAgcmVzb2x2ZShcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90XG4gICAgKTogT2JzZXJ2YWJsZTxhbnk+fFByb21pc2U8YW55Pnxhbnkge1xuXG4gICAgICAgIGxldCBpZCA9IHJvdXRlLnBhcmFtTWFwLmdldCgnaWQnKTtcbiAgICAgICAgbGV0IG9wdHMgOiBhbnkgPSB7fTtcbiAgICAgICAgbGV0IHZlcnNpb24gPSByb3V0ZS5wYXJhbU1hcC5nZXQoXCJ2ZXJzaW9uXCIpO1xuICAgICAgICBpZih2ZXJzaW9uKSBvcHRzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldChpZCwgb3B0cylcbiAgICAgICAgLnRoZW4oIGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYodGhpcy50cmFja2luZ1NlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnQgPSBUcmFja2luZ0V2ZW50RmFjdG9yeShUcmFja2luZ1R5cGVzLlZJRVdFRCwgaXRlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFja2luZ1NlcnZpY2UubG9nRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggKGUgOiBFcnJvcikgPT4gb2YoIGUgKSApO1xuICAgIH1cbn1cblxuXG5ASW5qZWN0YWJsZSgvKnsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0qLylcbmV4cG9ydCBjbGFzcyBWZXJzaW9uUmVzb2x2ZXIgaW1wbGVtZW50cyBSZXNvbHZlPHN0cmluZz4ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHJlc29sdmUoXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgICAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdFxuICAgICk6IE9ic2VydmFibGU8YW55PnxQcm9taXNlPGFueT58YW55IHtcbiAgICAgICAgbGV0IHZlcnNpb24gPSByb3V0ZS5wYXJhbU1hcC5nZXQoXCJ2ZXJzaW9uXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZlcnNpb258fG51bGwpO1xuICAgIH1cbn1cblxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZXdJdGVtUmVzb2x2ZXIgaW1wbGVtZW50cyBSZXNvbHZlPEl0ZW0+IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAvLyBwcml2YXRlIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICByZXNvbHZlKCByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QgKTogT2JzZXJ2YWJsZTxJdGVtPiB7XG4gICAgICAgIGxldCB0eXBlID0gcm91dGUucGFyYW1zLnR5cGU7XG4gICAgICAgIGxldCBpdGVtID0gSXRlbUZhY3RvcnkuY3JlYXRlKHR5cGUpO1xuICAgICAgICBpZighaXRlbSkge1xuICAgICAgICAgICAgbGV0IGdwZSA9IG5ldyBHZW9QbGF0Zm9ybUVycm9yKGBUeXBlICR7dHlwZX0gaXMgdW5zdXBwb3J0ZWRgLCBcIlVuc3VwcG9ydGVkIFR5cGVcIiwgNDAwKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZXJyb3JTZXJ2aWNlLnNldEVycm9yKGdwZSk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCdlcnJvcicsIHtza2lwTG9jYXRpb25DaGFuZ2U6ZmFsc2V9KTtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVycm9yUmVzb2x2ZXIgaW1wbGVtZW50cyBSZXNvbHZlPEVycm9yPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cbiAgICByZXNvbHZlKCByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QgKTogT2JzZXJ2YWJsZTxFcnJvcj4ge1xuICAgICAgICBsZXQgdHlwZSA9IHJvdXRlLnBhcmFtcy50eXBlO1xuICAgICAgICBsZXQgbXNnID0gXCJBbiBlcnJvciBoYXMgb2NjdXJyZWRcIjtcbiAgICAgICAgaWYoXCJ1bnN1cHBvcnRlZFwiID09PSB0eXBlKVxuICAgICAgICAgICAgbXNnID0gYFR5cGUgJHt0eXBlfSBpcyBub3Qgc3VwcG9ydGVkYDtcbiAgICAgICAgZWxzZSBpZihcIjQwNFwiID09PSB0eXBlKVxuICAgICAgICAgICAgbXNnID0gXCJJdGVtIG5vdCBmb3VuZFwiO1xuICAgICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgLy8gZXJyb3IuZXJyb3IgPSBcIlVuc3VwcG9ydGVkIFR5cGVcIjtcbiAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcbiAgICB9XG59XG4iXX0=