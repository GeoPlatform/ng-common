import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeoPlatformError } from './error';
var GeoPlatformErrorService = /** @class */ (function () {
    function GeoPlatformErrorService() {
        this.updateSubject = new BehaviorSubject(null);
        this.error$ = this.updateSubject.asObservable();
    }
    GeoPlatformErrorService.prototype.setError = function (error) {
        var gpe = GeoPlatformError.from(error);
        this.updateSubject.next(gpe);
    };
    GeoPlatformErrorService = tslib_1.__decorate([
        Injectable()
    ], GeoPlatformErrorService);
    return GeoPlatformErrorService;
}());
export { GeoPlatformErrorService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJlcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRzNDO0lBREE7UUFHWSxrQkFBYSxHQUFzQyxJQUFJLGVBQWUsQ0FBbUIsSUFBSSxDQUFDLENBQUM7UUFFdkcsV0FBTSxHQUFpQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBTTdFLENBQUM7SUFKRywwQ0FBUSxHQUFSLFVBQVMsS0FBWTtRQUNqQixJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQVRRLHVCQUF1QjtRQURuQyxVQUFVLEVBQUU7T0FDQSx1QkFBdUIsQ0FVbkM7SUFBRCw4QkFBQztDQUFBLEFBVkQsSUFVQztTQVZZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBHZW9QbGF0Zm9ybUVycm9yIH0gZnJvbSAnLi9lcnJvcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybUVycm9yU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHVwZGF0ZVN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxHZW9QbGF0Zm9ybUVycm9yPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8R2VvUGxhdGZvcm1FcnJvcj4obnVsbCk7XG5cbiAgICBlcnJvciQ6IE9ic2VydmFibGU8R2VvUGxhdGZvcm1FcnJvcj4gPSB0aGlzLnVwZGF0ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBzZXRFcnJvcihlcnJvcjogRXJyb3IpIHtcbiAgICAgICAgbGV0IGdwZSA9IEdlb1BsYXRmb3JtRXJyb3IuZnJvbShlcnJvcik7XG4gICAgICAgIHRoaXMudXBkYXRlU3ViamVjdC5uZXh0KGdwZSk7XG4gICAgfVxufVxuIl19