import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchEvent, EventTypes } from '../../event';
var SelectedItemsComponent = /** @class */ (function () {
    function SelectedItemsComponent() {
        this.onEvent = new EventEmitter();
    }
    SelectedItemsComponent.prototype.ngOnInit = function () {
    };
    SelectedItemsComponent.prototype.ngOnChanges = function (changes) {
    };
    SelectedItemsComponent.prototype.clear = function () {
        var event = new SearchEvent(EventTypes.SELECT_NONE);
        this.onEvent.emit(event);
    };
    SelectedItemsComponent.prototype.remove = function (item) {
        var event = new SearchEvent(EventTypes.SELECT, { value: item });
        this.onEvent.emit(event);
    };
    tslib_1.__decorate([
        Input()
    ], SelectedItemsComponent.prototype, "selected", void 0);
    tslib_1.__decorate([
        Input()
    ], SelectedItemsComponent.prototype, "itemTemplate", void 0);
    tslib_1.__decorate([
        Output()
    ], SelectedItemsComponent.prototype, "onEvent", void 0);
    SelectedItemsComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-selected-items',
            template: "<div class=\"o-selected-items\">\n\n    <div class=\"list-group list-group-sm u-text--sm\"\n        *ngIf=\"selected && selected.length > 0; else noContent\">\n\n        <div class=\"list-group-item d-flex flex-justify-between flex-align-center\"\n            *ngFor=\"let item of selected\">\n            <ng-container\n                [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n                [ngTemplateOutletContext]=\"{item: item}\">\n            </ng-container>\n            <button type=\"button\" class=\"btn btn-link u-mg-left--sm\" (click)=\"remove(item)\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n\n    </div>\n\n    <!-- actions -->\n    <div class=\"list-group list-group-sm u-text--sm u-mg-top--md\"\n        *ngIf=\"selected && selected.length\">\n\n        <!-- custom actions provided -->\n        <ng-content select=\"[actions]\"></ng-content>\n\n        <!-- default clear all action -->\n        <div class=\"list-group-item d-flex flex-justify-between flex-align-center\"\n            [ngClass]=\"{'is-faded':!selected?.length}\"\n            (click)=\"clear()\">\n            <div class=\"flex-1\">Clear Selections</div>\n            <button type=\"button\" class=\"btn btn-link\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n    </div>\n\n    <ng-template #noContent>\n      <div class=\"t-fg--gray-md t-text--italic\">Nothing selected</div>\n    </ng-template>\n    <ng-template #defaultItemTemplate let-item=\"item\">\n        <div class=\"flex-1\">\n            <span class=\"icon-{{item.type.toLowerCase()}} is-themed\"></span>\n            {{item.label||item.title||item.prefLabel||\"Un-titled Item\"}}\n        </div>\n    </ng-template>\n\n\n</div>\n",
            styles: [".o-selected-items{padding:1em}"]
        })
    ], SelectedItemsComponent);
    return SelectedItemsComponent;
}());
export { SelectedItemsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0ZWQvc2VsZWN0ZWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU90RDtJQU1JO1FBRlUsWUFBTyxHQUF1QixJQUFJLFlBQVksRUFBTyxDQUFDO0lBRWhELENBQUM7SUFFakIseUNBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCw0Q0FBVyxHQUFYLFVBQWEsT0FBdUI7SUFFcEMsQ0FBQztJQUVELHNDQUFLLEdBQUw7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHVDQUFNLEdBQU4sVUFBUSxJQUFXO1FBQ2YsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFyQlE7UUFBUixLQUFLLEVBQUU7NERBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFO2dFQUF1QztJQUNyQztRQUFULE1BQU0sRUFBRTsyREFBdUQ7SUFKdkQsc0JBQXNCO1FBTGxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsOHpEQUF3Qzs7U0FFekMsQ0FBQztPQUNXLHNCQUFzQixDQXdCbEM7SUFBRCw2QkFBQztDQUFBLEFBeEJELElBd0JDO1NBeEJZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgVGVtcGxhdGVSZWYsXG4gICAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCB7IFNlYXJjaEV2ZW50LCBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vZXZlbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1zZWxlY3RlZC1pdGVtcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3RlZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbGVjdGVkLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgc2VsZWN0ZWQgOiBJdGVtW107XG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBAT3V0cHV0KCkgb25FdmVudCA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoIGNoYW5nZXMgOiBTaW1wbGVDaGFuZ2VzICkge1xuXG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlNFTEVDVF9OT05FKTtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIHJlbW92ZSggaXRlbSA6IEl0ZW0gKSB7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlNFTEVDVCwge3ZhbHVlOiBpdGVtfSk7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG59XG4iXX0=