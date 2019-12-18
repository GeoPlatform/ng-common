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
        selector: 'gp-selected-items',
        template: "<div class=\"o-selected-items\">\n\n    <div class=\"list-group list-group-sm u-text--sm\">\n\n        <div *ngIf=\"!selected || !selected.length\" class=\"list-group-item\">\n            <div class=\"t-fg--gray-md t-text--italic\">Nothing selected</div>\n        </div>\n\n        <div *ngFor=\"let item of selected\"\n            class=\"list-group-item d-flex flex-justify-between flex-align-center\">\n            <div class=\"flex-1\">\n                <span class=\"icon-{{item.type.toLowerCase()}} is-themed\"></span>\n                {{item.label}}\n            </div>\n            <button type=\"button\" class=\"btn btn-link u-mg-left--sm\" (click)=\"remove(item)\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n\n    </div>\n\n    <div class=\"list-group list-group-sm u-text--sm u-mg-top--md\">\n\n        <ng-content select=\"[actions]\"></ng-content>\n\n        <div class=\"list-group-item d-flex flex-justify-between flex-align-center\"\n            [ngClass]=\"{'is-faded':!selected?.length}\"\n            (click)=\"clear()\">\n            <div class=\"flex-1\">Clear Selections</div>\n            <button type=\"button\" class=\"btn btn-link\">\n                <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            </button>\n        </div>\n    </div>\n\n</div>\n",
        styles: [""]
    })
], SelectedItemsComponent);
export { SelectedItemsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0ZWQvc2VsZWN0ZWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQVF2QixJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUsvQjtRQUZVLFlBQU8sR0FBdUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVoRCxDQUFDO0lBRWpCLFFBQVE7SUFDUixDQUFDO0lBRUQsV0FBVyxDQUFFLE9BQXVCO0lBRXBDLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBRSxDQUFDO0lBQ3BELENBQUM7SUFFRCxNQUFNLENBQUUsSUFBVztJQUVuQixDQUFDO0NBQ0osQ0FBQTtBQW5CWTtJQUFSLEtBQUssRUFBRTt3REFBbUI7QUFDakI7SUFBVCxNQUFNLEVBQUU7dURBQXVEO0FBSHZELHNCQUFzQjtJQUxsQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLHEyQ0FBd0M7O0tBRXpDLENBQUM7R0FDVyxzQkFBc0IsQ0FxQmxDO1NBckJZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcyxcbiAgICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3Atc2VsZWN0ZWQtaXRlbXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0ZWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3RlZC5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdGVkSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgc2VsZWN0ZWQgOiBJdGVtW107XG4gICAgQE91dHB1dCgpIG9uRXZlbnQgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCBjaGFuZ2VzIDogU2ltcGxlQ2hhbmdlcyApIHtcblxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdCggeyBuYW1lOiAnc2VsZWN0ZWQ6Y2xlYXInIH0gKTtcbiAgICB9XG5cbiAgICByZW1vdmUoIGl0ZW0gOiBJdGVtICkge1xuXG4gICAgfVxufVxuIl19