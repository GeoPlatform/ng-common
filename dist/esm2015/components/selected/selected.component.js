import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchEvent, EventTypes } from '../../event';
let SelectedItemsComponent = class SelectedItemsComponent {
    constructor() {
        this.onEvent = new EventEmitter();
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
    }
    clear() {
        let event = new SearchEvent(EventTypes.SELECT_NONE);
        this.onEvent.emit(event);
    }
    remove(item) {
        let event = new SearchEvent(EventTypes.SELECT, { value: item });
        this.onEvent.emit(event);
    }
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
export { SelectedItemsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0ZWQvc2VsZWN0ZWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU90RCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQU0vQjtRQUZVLFlBQU8sR0FBdUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVoRCxDQUFDO0lBRWpCLFFBQVE7SUFDUixDQUFDO0lBRUQsV0FBVyxDQUFFLE9BQXVCO0lBRXBDLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNLENBQUUsSUFBVztRQUNmLElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0osQ0FBQTtBQXRCWTtJQUFSLEtBQUssRUFBRTt3REFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7NERBQXVDO0FBQ3JDO0lBQVQsTUFBTSxFQUFFO3VEQUF1RDtBQUp2RCxzQkFBc0I7SUFMbEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3Qiw4ekRBQXdDOztLQUV6QyxDQUFDO0dBQ1csc0JBQXNCLENBd0JsQztTQXhCWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIFRlbXBsYXRlUmVmLFxuICAgIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uL2V2ZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3Atc2VsZWN0ZWQtaXRlbXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0ZWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3RlZC5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdGVkSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgcHVibGljIHNlbGVjdGVkIDogSXRlbVtdO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgQE91dHB1dCgpIG9uRXZlbnQgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCBjaGFuZ2VzIDogU2ltcGxlQ2hhbmdlcyApIHtcblxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5TRUxFQ1RfTk9ORSk7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICByZW1vdmUoIGl0ZW0gOiBJdGVtICkge1xuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5TRUxFQ1QsIHt2YWx1ZTogaXRlbX0pO1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxufVxuIl19