import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var SelectedItemsComponent = /** @class */ (function () {
    function SelectedItemsComponent() {
        this.onEvent = new EventEmitter();
    }
    SelectedItemsComponent.prototype.ngOnInit = function () {
    };
    SelectedItemsComponent.prototype.ngOnChanges = function (changes) {
    };
    SelectedItemsComponent.prototype.clear = function () {
        this.onEvent.emit({ name: 'selected:clear' });
    };
    SelectedItemsComponent.prototype.remove = function (item) {
    };
    tslib_1.__decorate([
        Input()
    ], SelectedItemsComponent.prototype, "selected", void 0);
    tslib_1.__decorate([
        Output()
    ], SelectedItemsComponent.prototype, "onEvent", void 0);
    SelectedItemsComponent = tslib_1.__decorate([
        Component({
            selector: 'gpmm-selected-items',
            template: "<div class=\"o-selected-items\">\n\n    <div class=\"list-group list-group-sm u-text--sm\">\n\n        <div *ngIf=\"!selected || !selected.length\" class=\"list-group-item\">\n            <div class=\"t-fg--gray-md t-text--italic\">Nothing selected</div>\n        </div>\n\n        <div *ngFor=\"let item of selected\"\n            class=\"list-group-item d-flex flex-justify-between flex-align-center\">\n            <div class=\"flex-1\">\n                <span class=\"icon-{{item.type.toLowerCase()}} is-themed\"></span>\n                {{item.label}}\n            </div>\n            <button type=\"button\" class=\"btn btn-link u-mg-left--sm\" (click)=\"remove(item)\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n\n    </div>\n\n    <div class=\"list-group list-group-sm u-text--sm u-mg-top--md\">\n\n        <!-- <div class=\"list-group-item d-flex flex-justify-between flex-align-center\"\n            [ngClass]=\"{'is-faded':!isAuthenticated()||!selected?.length}\">\n\n            <div class=\"flex-1\">\n                <span class=\"icon-gallery\"></span>\n                Add Selected to a Gallery\n            </div>\n            <button type=\"button\" class=\"btn btn-link\"\n                (click))=\"openDialog()\"\n                [disabled]=\"!isAuthenticated()\">\n                <span class=\"gpicons plus-circle t-fg--success\"></span>\n            </button>\n        </div> -->\n\n        <div class=\"list-group-item d-flex flex-justify-between flex-align-center\"\n            [ngClass]=\"{'is-faded':!selected?.length}\"\n            (click)=\"clear()\">\n            <div class=\"flex-1\">Clear Selections</div>\n            <button type=\"button\" class=\"btn btn-link\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n    </div>\n\n</div>\n",
            styles: [""]
        })
    ], SelectedItemsComponent);
    return SelectedItemsComponent;
}());
export { SelectedItemsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0ZWQvc2VsZWN0ZWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQVF2QjtJQUtJO1FBRlUsWUFBTyxHQUF1QixJQUFJLFlBQVksRUFBTyxDQUFDO0lBRWhELENBQUM7SUFFakIseUNBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCw0Q0FBVyxHQUFYLFVBQWEsT0FBdUI7SUFFcEMsQ0FBQztJQUVELHNDQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVELHVDQUFNLEdBQU4sVUFBUSxJQUFXO0lBRW5CLENBQUM7SUFsQlE7UUFBUixLQUFLLEVBQUU7NERBQW1CO0lBQ2pCO1FBQVQsTUFBTSxFQUFFOzJEQUF1RDtJQUh2RCxzQkFBc0I7UUFMbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixtNERBQXdDOztTQUV6QyxDQUFDO09BQ1csc0JBQXNCLENBcUJsQztJQUFELDZCQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FyQlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLFxuICAgIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncG1tLXNlbGVjdGVkLWl0ZW1zJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdGVkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VsZWN0ZWQuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGVkIDogSXRlbVtdO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50IDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyggY2hhbmdlcyA6IFNpbXBsZUNoYW5nZXMgKSB7XG5cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoIHsgbmFtZTogJ3NlbGVjdGVkOmNsZWFyJyB9ICk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCBpdGVtIDogSXRlbSApIHtcbiAgICAgICAgXG4gICAgfVxufVxuIl19