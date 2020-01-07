import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import { QueryParameters } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
const BEFORE = "Before";
const AFTER = "After";
let ModifiedFilterComponent = class ModifiedFilterComponent {
    constructor() {
        this.key = QueryParameters.MODIFIED;
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.format = 'MM/DD/YYYY'; //'MMM dd yyyy';
        this.debouncePromise = null;
        this.lastModifiedOptions = [BEFORE, AFTER];
        this.lastModifiedDir = BEFORE;
    }
    ngOnInit() {
        // console.log("Modified.init() : " + this.lastModifiedDir);
    }
    // onKeyUp($event) {
    //     let text = $event.target.value;
    //     this.onValueChange(text);
    // }
    onDateChanged(event) {
        this.value = event && event.value ? event.value.getTime() : null;
        this.onValueChange(this.value);
    }
    onValueChange(value) {
        let change = {};
        if (BEFORE === this.lastModifiedDir) {
            change[QueryParameters.MODIFIED_BEFORE] = value;
            change[QueryParameters.MODIFIED_AFTER] = null;
        }
        else {
            change[QueryParameters.MODIFIED_AFTER] = value;
            change[QueryParameters.MODIFIED_BEFORE] = null;
        }
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
    onDirChange() {
        // console.log("Modified.onDirChange() : " + this.lastModifiedDir);
        if (this.value) {
            this.onValueChange(this.value);
        }
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
tslib_1.__decorate([
    ViewChild(MatDatepicker, { static: false })
], ModifiedFilterComponent.prototype, "datepicker", void 0);
ModifiedFilterComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-modified-filter',
        template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Modified Date\n    </div>\n\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <div *ngIf=\"isCollapsed\" class=\"m-facet active\">\n            <span *ngIf=\"value\">{{lastModifiedDir}} {{value}}</span>\n            <span *ngIf=\"!value\">No date specified</span>\n        </div>\n\n        <div class=\"m-facet\">\n\n            <div class=\"  d-flex flex-justify-between flex-align-stretch\">\n\n                <select class=\"form-control flex-1 u-mg-right--md\"\n                    [(ngModel)]=\"lastModifiedDir\"\n                    (change)=\"onDirChange()\"\n                    aria-label=\"Select before or after modification date constraint\">\n                    <option *ngFor=\"let opt of lastModifiedOptions\" value=\"{{opt}}\">{{opt}}</option>\n                </select>\n\n                <!--\n                <div class=\"flex-2 input-group-slick\">\n                    <span class=\"fas fa-calendar\"\n                        title=\"Open date picker to select a date\"\n                        (click)=\"toggle($event)\">\n                    </span>\n                    <input type=\"text\" class=\"form-control\"\n                        placeholder=\"Specify modified date\"\n                        aria-label=\"Specify modified date\"\n                        [(ngModel)]=\"value\"\n                        (change)=\"onValueChange(value)\" />\n                    <span class=\"fas fa-times\" title=\"Clear value\"\n                        *ngIf=\"value\" (click)=\"clear()\">\n                    </span>\n                </div>\n                -->\n\n                <mat-form-field class=\"flex-2\">\n                    <input matInput [matDatepicker]=\"modifiedFilterDatePicker\" (dateInput)=\"onDateChanged($event)\">\n                    <mat-datepicker-toggle matSuffix [for]=\"modifiedFilterDatePicker\"></mat-datepicker-toggle>\n                    <mat-datepicker #modifiedFilterDatePicker></mat-datepicker>\n                </mat-form-field>\n            </div>\n            <div class=\"u-text--sm t-fg--gray-md\">Date format {{format}}</div>\n        </div>\n\n\n    </div>\n</div>\n",
        styles: [""]
    })
], ModifiedFilterComponent);
export { ModifiedFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL21vZGlmaWVkL21vZGlmaWVkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQzVELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxhQUFhLEVBRWhCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHekQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBQ3hCLE1BQU0sS0FBSyxHQUFJLE9BQU8sQ0FBQztBQVF2QixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQWFoQztRQVhTLFFBQUcsR0FBdUIsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUVsRCxZQUFPLEdBQTZCLElBQUksWUFBWSxFQUFPLENBQUM7UUFHL0QsZ0JBQVcsR0FBcUIsSUFBSSxDQUFDO1FBQ3JDLFdBQU0sR0FBeUIsWUFBWSxDQUFBLENBQUMsZ0JBQWdCO1FBQzVELG9CQUFlLEdBQWEsSUFBSSxDQUFDO1FBQ2pDLHdCQUFtQixHQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELG9CQUFlLEdBQWdCLE1BQU0sQ0FBQztJQUU3QixDQUFDO0lBRWpCLFFBQVE7UUFDSiw0REFBNEQ7SUFDaEUsQ0FBQztJQUVELG9CQUFvQjtJQUNwQixzQ0FBc0M7SUFDdEMsZ0NBQWdDO0lBQ2hDLElBQUk7SUFFSixhQUFhLENBQUUsS0FBb0M7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxhQUFhLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxhQUFhLENBQUUsS0FBSztRQUNoQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsSUFBRyxNQUFNLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNoQyxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUNoRCxNQUFNLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNqRDthQUFNO1lBQ0gsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDbEQ7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxXQUFXO1FBQ1AsbUVBQW1FO1FBQ25FLElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQXpEWTtJQUFSLEtBQUssRUFBRTtvREFBb0Q7QUFDbkQ7SUFBUixLQUFLLEVBQUU7c0RBQXlCO0FBQ3ZCO0lBQVQsTUFBTSxFQUFFO3dEQUE2RDtBQUM1QjtJQUF6QyxTQUFTLENBQUMsYUFBYSxFQUFFLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxDQUFDOzJEQUFpQztBQUxqRSx1QkFBdUI7SUFMbkMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5Qiwwa0ZBQXdDOztLQUV6QyxDQUFDO0dBQ1csdUJBQXVCLENBMkRuQztTQTNEWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgTWF0RGF0ZXBpY2tlciwgTWF0RGF0ZXBpY2tlcklucHV0RXZlbnQsXG4gICAgRGF0ZUFkYXB0ZXIsIE5hdGl2ZURhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFF1ZXJ5UGFyYW1ldGVycyB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCB7IFNlYXJjaEV2ZW50LCBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vZXZlbnQnO1xuXG5cbmNvbnN0IEJFRk9SRSA9IFwiQmVmb3JlXCI7XG5jb25zdCBBRlRFUiAgPSBcIkFmdGVyXCI7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtbW9kaWZpZWQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21vZGlmaWVkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9kaWZpZWQuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RpZmllZEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBrZXkgICAgICAgICAgICA6IHN0cmluZyA9IFF1ZXJ5UGFyYW1ldGVycy5NT0RJRklFRDtcbiAgICBASW5wdXQoKSB2YWx1ZSAgICAgICAgICA6IG51bWJlcjtcbiAgICBAT3V0cHV0KCkgb25FdmVudCAgICAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQFZpZXdDaGlsZChNYXREYXRlcGlja2VyLCB7c3RhdGljOmZhbHNlfSkgZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlcjxEYXRlPjtcblxuICAgIHB1YmxpYyBpc0NvbGxhcHNlZCAgICAgICAgIDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGZvcm1hdCAgICAgICAgICAgICAgOiBzdHJpbmcgPSAnTU0vREQvWVlZWScgLy8nTU1NIGRkIHl5eXknO1xuICAgIHB1YmxpYyBkZWJvdW5jZVByb21pc2UgICAgIDogYW55ID0gbnVsbDtcbiAgICBwdWJsaWMgbGFzdE1vZGlmaWVkT3B0aW9ucyA6IHN0cmluZ1tdID0gW0JFRk9SRSwgQUZURVJdO1xuICAgIHB1YmxpYyBsYXN0TW9kaWZpZWREaXIgICAgIDogc3RyaW5nID0gQkVGT1JFO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk1vZGlmaWVkLmluaXQoKSA6IFwiICsgdGhpcy5sYXN0TW9kaWZpZWREaXIpO1xuICAgIH1cblxuICAgIC8vIG9uS2V5VXAoJGV2ZW50KSB7XG4gICAgLy8gICAgIGxldCB0ZXh0ID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAvLyAgICAgdGhpcy5vblZhbHVlQ2hhbmdlKHRleHQpO1xuICAgIC8vIH1cblxuICAgIG9uRGF0ZUNoYW5nZWQoIGV2ZW50OiBNYXREYXRlcGlja2VySW5wdXRFdmVudDxEYXRlPiApIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGV2ZW50ICYmIGV2ZW50LnZhbHVlID8gZXZlbnQudmFsdWUuZ2V0VGltZSgpIDogbnVsbDtcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlKCB0aGlzLnZhbHVlICk7XG4gICAgfVxuXG4gICAgb25WYWx1ZUNoYW5nZSggdmFsdWUgKSB7XG4gICAgICAgIGxldCBjaGFuZ2UgPSB7fTtcblxuICAgICAgICBpZihCRUZPUkUgPT09IHRoaXMubGFzdE1vZGlmaWVkRGlyKSB7XG4gICAgICAgICAgICBjaGFuZ2VbUXVlcnlQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGNoYW5nZVtRdWVyeVBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVJdID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoYW5nZVtRdWVyeVBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVJdID0gdmFsdWU7XG4gICAgICAgICAgICBjaGFuZ2VbUXVlcnlQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRV0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIGNoYW5nZSk7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkRpckNoYW5nZSgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJNb2RpZmllZC5vbkRpckNoYW5nZSgpIDogXCIgKyB0aGlzLmxhc3RNb2RpZmllZERpcik7XG4gICAgICAgIGlmKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICBpZih0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19