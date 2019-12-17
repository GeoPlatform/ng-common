import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GPError } from './error';
var ErrorService = /** @class */ (function () {
    function ErrorService() {
        this.updateSubject = new BehaviorSubject(null);
        this.error$ = this.updateSubject.asObservable();
    }
    ErrorService.prototype.setError = function (error) {
        var gpe = GPError.from(error);
        this.updateSubject.next(gpe);
    };
    ErrorService = tslib_1.__decorate([
        Injectable()
    ], ErrorService);
    return ErrorService;
}());
export { ErrorService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJlcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdsQztJQURBO1FBR1ksa0JBQWEsR0FBNkIsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7UUFFckYsV0FBTSxHQUF3QixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBTXBFLENBQUM7SUFKRywrQkFBUSxHQUFSLFVBQVMsS0FBWTtRQUNqQixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFUUSxZQUFZO1FBRHhCLFVBQVUsRUFBRTtPQUNBLFlBQVksQ0FVeEI7SUFBRCxtQkFBQztDQUFBLEFBVkQsSUFVQztTQVZZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgR1BFcnJvciB9IGZyb20gJy4vZXJyb3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgdXBkYXRlU3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PEdQRXJyb3I+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxHUEVycm9yPihudWxsKTtcblxuICAgIGVycm9yJDogT2JzZXJ2YWJsZTxHUEVycm9yPiA9IHRoaXMudXBkYXRlU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICAgIHNldEVycm9yKGVycm9yOiBFcnJvcikge1xuICAgICAgICBsZXQgZ3BlID0gR1BFcnJvci5mcm9tKGVycm9yKTtcbiAgICAgICAgdGhpcy51cGRhdGVTdWJqZWN0Lm5leHQoZ3BlKTtcbiAgICB9XG59XG4iXX0=