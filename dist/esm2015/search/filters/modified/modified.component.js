import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QueryParameters } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
let ModifiedFilterComponent = class ModifiedFilterComponent {
    constructor() {
        this.key = QueryParameters.MODIFIED;
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.format = 'MMM dd yyyy';
        this.debouncePromise = null;
        this.lastModifiedOptions = [
            { value: "Before", before: true },
            { value: "After", before: false }
        ];
        this.lastModifiedDir = this.lastModifiedOptions[1];
    }
    ngOnInit() {
    }
    onKeyUp($event) {
        let text = $event.target.value;
        this.onValueChange(text);
    }
    onValueChange(value) {
        let change = {};
        if (this.lastModifiedDir.before) {
            change[QueryParameters.MODIFIED_BEFORE] = value;
            change[QueryParameters.MODIFIED_AFTER] = null;
        }
        else {
            change[QueryParameters.MODIFIED_BEFORE] = null;
            change[QueryParameters.MODIFIED_AFTER] = value;
        }
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
    onDirChange() {
        this.onValueChange(this.value);
    }
    clear() {
        if (this.value) {
            this.value = null;
            this.onValueChange(this.value);
        }
        else {
            this.isCollapsed = true;
        }
    }
};
tslib_1.__decorate([
    Input()
], ModifiedFilterComponent.prototype, "key", void 0);
tslib_1.__decorate([
    Input()
], ModifiedFilterComponent.prototype, "value", void 0);
tslib_1.__decorate([
    Output()
], ModifiedFilterComponent.prototype, "onEvent", void 0);
ModifiedFilterComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-modified-filter',
        template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Modified Date\n    </div>\n\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <div *ngIf=\"isCollapsed\" class=\"m-facet active\">\n            <span *ngIf=\"value\">{{lastModifiedDir.value}} {{value}}</span>\n            <span *ngIf=\"!value\">No date specified</span>\n        </div>\n\n        <div class=\"m-facet  d-flex flex-justify-between flex-align-stretch\">\n\n            <select class=\"form-control flex-1 u-mg-right--md\"\n                ([ngModel])=\"lastModifiedDir\"\n                (change)=\"onDirChange()\"\n                aria-label=\"Select before or after modification date constraint\">\n                <option *ngFor=\"let opt of lastModifiedOptions\" [value]=\"opt\">{{opt.value}}</option>\n            </select>\n\n            <div class=\"flex-2 input-group-slick\">\n                <!-- <span class=\"fas fa-calendar\"\n                    title=\"Open date picker to select a date\"\n                    (click)=\"toggle($event)\">\n                </span> -->\n                <input type=\"text\" class=\"form-control\"\n                    placeholder=\"Specify modified date\"\n                    aria-label=\"Specify modified date\"\n                    ([ngModel])=\"value\"\n                    (change)=\"onValueChange(value)\" />\n                <span class=\"fas fa-times\" title=\"Clear value\"\n                    *ngIf=\"value\" (click)=\"clear()\">\n                </span>\n            </div>\n        </div>\n\n    </div>\n</div>\n",
        styles: [""]
    })
], ModifiedFilterComponent);
export { ModifiedFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL21vZGlmaWVkL21vZGlmaWVkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDakQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRekQsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFlaEM7UUFiUyxRQUFHLEdBQXVCLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFFbEQsWUFBTyxHQUE2QixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRS9ELGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBQzdCLFdBQU0sR0FBWSxhQUFhLENBQUM7UUFDaEMsb0JBQWUsR0FBUyxJQUFJLENBQUM7UUFDN0Isd0JBQW1CLEdBQVc7WUFDakMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDakMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFHLE1BQU0sRUFBRSxLQUFLLEVBQUU7U0FDckMsQ0FBQztRQUNLLG9CQUFlLEdBQVMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNDLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBTTtRQUNWLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGFBQWEsQ0FBRSxLQUFLO1FBQ2hCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ2pEO2FBQU07WUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMvQyxNQUFNLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNsRDtRQUVELElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsS0FBSztRQUNELElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBRWxDO2FBQU07WUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBbkRZO0lBQVIsS0FBSyxFQUFFO29EQUFvRDtBQUNuRDtJQUFSLEtBQUssRUFBRTtzREFBdUI7QUFDckI7SUFBVCxNQUFNLEVBQUU7d0RBQTZEO0FBSjdELHVCQUF1QjtJQUxuQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLHM4REFBd0M7O0tBRXpDLENBQUM7R0FDVyx1QkFBdUIsQ0FxRG5DO1NBckRZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFF1ZXJ5UGFyYW1ldGVycyB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCB7IFNlYXJjaEV2ZW50LCBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vZXZlbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLW1vZGlmaWVkLWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9tb2RpZmllZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21vZGlmaWVkLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgTW9kaWZpZWRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkga2V5ICAgICAgICAgICAgOiBzdHJpbmcgPSBRdWVyeVBhcmFtZXRlcnMuTU9ESUZJRUQ7XG4gICAgQElucHV0KCkgdmFsdWUgICAgICAgICAgOiBEYXRlO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBpc0NvbGxhcHNlZCA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBmb3JtYXQgOiBzdHJpbmcgPSAnTU1NIGRkIHl5eXknO1xuICAgIHB1YmxpYyBkZWJvdW5jZVByb21pc2UgOiBhbnkgPSBudWxsO1xuICAgIHB1YmxpYyBsYXN0TW9kaWZpZWRPcHRpb25zIDogYW55W10gPSBbXG4gICAgICAgIHsgdmFsdWU6IFwiQmVmb3JlXCIsIGJlZm9yZTogdHJ1ZSB9LFxuICAgICAgICB7IHZhbHVlOiBcIkFmdGVyXCIsICBiZWZvcmU6IGZhbHNlIH1cbiAgICBdO1xuICAgIHB1YmxpYyBsYXN0TW9kaWZpZWREaXIgOiBhbnkgPSB0aGlzLmxhc3RNb2RpZmllZE9wdGlvbnNbMV07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgb25LZXlVcCgkZXZlbnQpIHtcbiAgICAgICAgbGV0IHRleHQgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UodGV4dCk7XG4gICAgfVxuXG4gICAgb25WYWx1ZUNoYW5nZSggdmFsdWUgKSB7XG4gICAgICAgIGxldCBjaGFuZ2UgPSB7fTtcblxuICAgICAgICBpZih0aGlzLmxhc3RNb2RpZmllZERpci5iZWZvcmUpIHtcbiAgICAgICAgICAgIGNoYW5nZVtRdWVyeVBhcmFtZXRlcnMuTU9ESUZJRURfQkVGT1JFXSA9IHZhbHVlO1xuICAgICAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUl0gPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkVdID0gbnVsbDtcbiAgICAgICAgICAgIGNoYW5nZVtRdWVyeVBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVJdID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgY2hhbmdlKTtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uRGlyQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGlmKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzQ29sbGFwc2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==