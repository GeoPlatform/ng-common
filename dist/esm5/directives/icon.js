import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
var GeoPlatformIconDirective = /** @class */ (function () {
    function GeoPlatformIconDirective(el) {
        this.el = el;
        this.themed = true;
    }
    GeoPlatformIconDirective.prototype.ngOnInit = function () {
        if (!this.item)
            return;
        var className = this.item.type.toLowerCase().replace(/^[a-z]+\:/, '');
        className = 'icon-' + className;
        if (this.themed) {
            className += " is-themed";
        }
        this.el.nativeElement.className = className;
    };
    GeoPlatformIconDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return GeoPlatformIconDirective;
}());
export { GeoPlatformIconDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2ljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPckU7SUFLSSxrQ0FBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFGekIsV0FBTSxHQUFhLElBQUksQ0FBQztJQUlqQyxDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU87UUFDdEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNyRSxTQUFTLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWixTQUFTLElBQUksWUFBWSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUNoRCxDQUFDOztnQkFadUIsVUFBVTs7SUFIekI7UUFBUixLQUFLLEVBQUU7MERBQWE7SUFDWjtRQUFSLEtBQUssRUFBRTs0REFBeUI7SUFIeEIsd0JBQXdCO1FBSHBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1NBQ3JCLENBQUM7T0FDVyx3QkFBd0IsQ0FrQnBDO0lBQUQsK0JBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWxCWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tncEljb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybUljb25EaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCkgaXRlbSA6IEl0ZW07XG4gICAgQElucHV0KCkgdGhlbWVkIDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYoIXRoaXMuaXRlbSkgcmV0dXJuO1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5pdGVtLnR5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eW2Etel0rXFw6LywnJyk7XG4gICAgICAgIGNsYXNzTmFtZSA9ICdpY29uLScgKyBjbGFzc05hbWU7XG4gICAgICAgIGlmKHRoaXMudGhlbWVkKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gXCIgaXMtdGhlbWVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICB9XG59XG4iXX0=