import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { of, empty } from 'rxjs';
import { ItemService, TrackingService, TrackingTypes, TrackingEventFactory } from '@geoplatform/client';
import { ItemFactory } from './item-factory';
import { GPError } from './error';
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
            var gpe = new GPError("Type " + type + " is unsupported", "Unsupported Type", 400);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInJlc29sdmVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUNILE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQy9ELE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUNHLFdBQVcsRUFDakIsZUFBZSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFDdkQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQVksZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFnQixTQUFTLENBQUM7QUFHNUM7SUFFSSxzQkFDaUMsT0FBcUIsRUFDakIsZUFBaUM7UUFEckMsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUNqQixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7SUFFdEUsQ0FBQztJQUVELDhCQUFPLEdBQVAsVUFDSSxLQUE2QixFQUM3QixLQUEwQjtRQUY5QixpQkFrQkM7UUFiRyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLElBQUksR0FBUyxFQUFFLENBQUM7UUFDcEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsSUFBRyxPQUFPO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDO2FBQ2hD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QUNyQixDQUFDOztnQkFYMkIsTUFBTTs7SUFEekIsYUFBYTtRQUR6QixVQUFVLEVBQUU7T0FDQSxhQUFhLENBYXpCO0lBQUQsb0JBQUM7Q0FBQSxBQWJELElBYUM7U0FiWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIFJvdXRlciwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCwgUmVzb2x2ZVxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIGVtcHR5IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICAgIEl0ZW0sIEl0ZW1TZXJ2aWNlLFxuICAgIFRyYWNraW5nU2VydmljZSwgVHJhY2tpbmdUeXBlcywgVHJhY2tpbmdFdmVudEZhY3Rvcnlcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgeyBJdGVtRmFjdG9yeSB9ICAgICAgIGZyb20gJy4vaXRlbS1mYWN0b3J5JztcbmltcG9ydCB7IEdQRXJyb3IgfSAgICAgICAgICAgZnJvbSAnLi9lcnJvcic7XG5cbkBJbmplY3RhYmxlKC8qeyBwcm92aWRlZEluOiAncm9vdCcgfSovKVxuZXhwb3J0IGNsYXNzIEl0ZW1SZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8SXRlbT4ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSXRlbVNlcnZpY2UpIHByaXZhdGUgc2VydmljZSA6IEl0ZW1TZXJ2aWNlLFxuICAgICAgICBASW5qZWN0KFRyYWNraW5nU2VydmljZSkgcHJpdmF0ZSB0cmFja2luZ1NlcnZpY2UgOiBUcmFja2luZ1NlcnZpY2VcbiAgICApIHtcbiAgICB9XG5cbiAgICByZXNvbHZlKFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgICAgICAgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3RcbiAgICApOiBPYnNlcnZhYmxlPGFueT58UHJvbWlzZTxhbnk+fGFueSB7XG5cbiAgICAgICAgbGV0IGlkID0gcm91dGUucGFyYW1NYXAuZ2V0KCdpZCcpO1xuICAgICAgICBsZXQgb3B0cyA6IGFueSA9IHt9O1xuICAgICAgICBsZXQgdmVyc2lvbiA9IHJvdXRlLnBhcmFtTWFwLmdldChcInZlcnNpb25cIik7XG4gICAgICAgIGlmKHZlcnNpb24pIG9wdHMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0KGlkLCBvcHRzKVxuICAgICAgICAudGhlbiggaXRlbSA9PiB7XG4gICAgICAgICAgICBpZih0aGlzLnRyYWNraW5nU2VydmljZSkge1xuICAgICAgICAgICAgICAgIGxldCBldmVudCA9IFRyYWNraW5nRXZlbnRGYWN0b3J5KFRyYWNraW5nVHlwZXMuVklFV0VELCBpdGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNraW5nU2VydmljZS5sb2dFdmVudChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCAoZSA6IEVycm9yKSA9PiBvZiggZSApICk7XG4gICAgfVxufVxuXG5cbkBJbmplY3RhYmxlKC8qeyBwcm92aWRlZEluOiAncm9vdCcgfSovKVxuZXhwb3J0IGNsYXNzIFZlcnNpb25SZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8c3RyaW5nPiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcmVzb2x2ZShcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90XG4gICAgKTogT2JzZXJ2YWJsZTxhbnk+fFByb21pc2U8YW55Pnxhbnkge1xuICAgICAgICBsZXQgdmVyc2lvbiA9IHJvdXRlLnBhcmFtTWFwLmdldChcInZlcnNpb25cIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmVyc2lvbnx8bnVsbCk7XG4gICAgfVxufVxuXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5ld0l0ZW1SZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8SXRlbT4ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIC8vIHByaXZhdGUgZXJyb3JTZXJ2aWNlOiBFcnJvclNlcnZpY2VcbiAgICApIHtcblxuICAgIH1cblxuICAgIHJlc29sdmUoIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCApOiBPYnNlcnZhYmxlPEl0ZW0+IHtcbiAgICAgICAgbGV0IHR5cGUgPSByb3V0ZS5wYXJhbXMudHlwZTtcbiAgICAgICAgbGV0IGl0ZW0gPSBJdGVtRmFjdG9yeS5jcmVhdGUodHlwZSk7XG4gICAgICAgIGlmKCFpdGVtKSB7XG4gICAgICAgICAgICBsZXQgZ3BlID0gbmV3IEdQRXJyb3IoYFR5cGUgJHt0eXBlfSBpcyB1bnN1cHBvcnRlZGAsIFwiVW5zdXBwb3J0ZWQgVHlwZVwiLCA0MDApO1xuICAgICAgICAgICAgLy8gdGhpcy5lcnJvclNlcnZpY2Uuc2V0RXJyb3IoZ3BlKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJ2Vycm9yJywge3NraXBMb2NhdGlvbkNoYW5nZTpmYWxzZX0pO1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JSZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8RXJyb3I+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7fVxuICAgIHJlc29sdmUoIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCApOiBPYnNlcnZhYmxlPEVycm9yPiB7XG4gICAgICAgIGxldCB0eXBlID0gcm91dGUucGFyYW1zLnR5cGU7XG4gICAgICAgIGxldCBtc2cgPSBcIkFuIGVycm9yIGhhcyBvY2N1cnJlZFwiO1xuICAgICAgICBpZihcInVuc3VwcG9ydGVkXCIgPT09IHR5cGUpXG4gICAgICAgICAgICBtc2cgPSBgVHlwZSAke3R5cGV9IGlzIG5vdCBzdXBwb3J0ZWRgO1xuICAgICAgICBlbHNlIGlmKFwiNDA0XCIgPT09IHR5cGUpXG4gICAgICAgICAgICBtc2cgPSBcIkl0ZW0gbm90IGZvdW5kXCI7XG4gICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAvLyBlcnJvci5lcnJvciA9IFwiVW5zdXBwb3J0ZWQgVHlwZVwiO1xuICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xuICAgIH1cbn1cbiJdfQ==