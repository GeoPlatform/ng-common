import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
let GeoPlatformIconDirective = class GeoPlatformIconDirective {
    constructor(el) {
        this.el = el;
        this.themed = true;
    }
    ngOnInit() {
        if (!this.item)
            return;
        let className = this.item.type.toLowerCase().replace(/^[a-z]+\:/, '');
        className = 'icon-' + className;
        if (this.themed) {
            className += " is-themed";
        }
        this.el.nativeElement.className = className;
    }
};
GeoPlatformIconDirective.ctorParameters = () => [
    { type: ElementRef }
];
tslib_1.__decorate([
    Input()
], GeoPlatformIconDirective.prototype, "item", void 0);
tslib_1.__decorate([
    Input()
], GeoPlatformIconDirective.prototype, "themed", void 0);
GeoPlatformIconDirective = tslib_1.__decorate([
    Directive({
        selector: '[gpIcon]'
    })
], GeoPlatformIconDirective);
export { GeoPlatformIconDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2ljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPckUsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFLakMsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFGekIsV0FBTSxHQUFhLElBQUksQ0FBQztJQUlqQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU87UUFDdEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNyRSxTQUFTLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWixTQUFTLElBQUksWUFBWSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUNoRCxDQUFDO0NBQ0osQ0FBQTs7WUFiMkIsVUFBVTs7QUFIekI7SUFBUixLQUFLLEVBQUU7c0RBQWE7QUFDWjtJQUFSLEtBQUssRUFBRTt3REFBeUI7QUFIeEIsd0JBQXdCO0lBSHBDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO0tBQ3JCLENBQUM7R0FDVyx3QkFBd0IsQ0FrQnBDO1NBbEJZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2dwSWNvbl0nXG59KVxuZXhwb3J0IGNsYXNzIEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZSB7XG5cbiAgICBASW5wdXQoKSBpdGVtIDogSXRlbTtcbiAgICBASW5wdXQoKSB0aGVtZWQgOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZighdGhpcy5pdGVtKSByZXR1cm47XG4gICAgICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLml0ZW0udHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15bYS16XStcXDovLCcnKTtcbiAgICAgICAgY2xhc3NOYW1lID0gJ2ljb24tJyArIGNsYXNzTmFtZTtcbiAgICAgICAgaWYodGhpcy50aGVtZWQpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSBcIiBpcy10aGVtZWRcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIH1cbn1cbiJdfQ==