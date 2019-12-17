import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let SelectedItemsComponent = class SelectedItemsComponent {
    constructor() {
        this.onEvent = new EventEmitter();
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
    }
    clear() {
        this.onEvent.emit({ name: 'selected:clear' });
    }
    remove(item) {
    }
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
export { SelectedItemsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0ZWQvc2VsZWN0ZWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQVF2QixJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUsvQjtRQUZVLFlBQU8sR0FBdUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVoRCxDQUFDO0lBRWpCLFFBQVE7SUFDUixDQUFDO0lBRUQsV0FBVyxDQUFFLE9BQXVCO0lBRXBDLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBRSxDQUFDO0lBQ3BELENBQUM7SUFFRCxNQUFNLENBQUUsSUFBVztJQUVuQixDQUFDO0NBQ0osQ0FBQTtBQW5CWTtJQUFSLEtBQUssRUFBRTt3REFBbUI7QUFDakI7SUFBVCxNQUFNLEVBQUU7dURBQXVEO0FBSHZELHNCQUFzQjtJQUxsQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLG00REFBd0M7O0tBRXpDLENBQUM7R0FDVyxzQkFBc0IsQ0FxQmxDO1NBckJZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcyxcbiAgICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3BtbS1zZWxlY3RlZC1pdGVtcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3RlZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbGVjdGVkLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBzZWxlY3RlZCA6IEl0ZW1bXTtcbiAgICBAT3V0cHV0KCkgb25FdmVudCA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoIGNoYW5nZXMgOiBTaW1wbGVDaGFuZ2VzICkge1xuXG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KCB7IG5hbWU6ICdzZWxlY3RlZDpjbGVhcicgfSApO1xuICAgIH1cblxuICAgIHJlbW92ZSggaXRlbSA6IEl0ZW0gKSB7XG4gICAgICAgIFxuICAgIH1cbn1cbiJdfQ==