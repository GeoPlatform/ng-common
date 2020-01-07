import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import { QueryParameters } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
var BEFORE = "Before";
var AFTER = "After";
var ModifiedFilterComponent = /** @class */ (function () {
    function ModifiedFilterComponent() {
        this.key = QueryParameters.MODIFIED;
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.format = 'MM/DD/YYYY'; //'MMM dd yyyy';
        this.debouncePromise = null;
        this.lastModifiedOptions = [BEFORE, AFTER];
        this.lastModifiedDir = BEFORE;
    }
    ModifiedFilterComponent.prototype.ngOnInit = function () {
        // console.log("Modified.init() : " + this.lastModifiedDir);
    };
    // onKeyUp($event) {
    //     let text = $event.target.value;
    //     this.onValueChange(text);
    // }
    ModifiedFilterComponent.prototype.onDateChanged = function (event) {
        this.value = event && event.value ? event.value.getTime() : null;
        this.onValueChange(this.value);
    };
    ModifiedFilterComponent.prototype.onValueChange = function (value) {
        var change = {};
        if (BEFORE === this.lastModifiedDir) {
            change[QueryParameters.MODIFIED_BEFORE] = value;
            change[QueryParameters.MODIFIED_AFTER] = null;
        }
        else {
            change[QueryParameters.MODIFIED_AFTER] = value;
            change[QueryParameters.MODIFIED_BEFORE] = null;
        }
        var event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    };
    ModifiedFilterComponent.prototype.onDirChange = function () {
        // console.log("Modified.onDirChange() : " + this.lastModifiedDir);
        if (this.value) {
            this.onValueChange(this.value);
        }
    };
    ModifiedFilterComponent.prototype.clear = function () {
        if (this.value) {
            this.value = null;
            this.onValueChange(this.value);
        }
        else {
            this.isCollapsed = true;
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
    return ModifiedFilterComponent;
}());
export { ModifiedFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL21vZGlmaWVkL21vZGlmaWVkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQzVELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxhQUFhLEVBRWhCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHekQsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBQ3hCLElBQU0sS0FBSyxHQUFJLE9BQU8sQ0FBQztBQVF2QjtJQWFJO1FBWFMsUUFBRyxHQUF1QixlQUFlLENBQUMsUUFBUSxDQUFDO1FBRWxELFlBQU8sR0FBNkIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUcvRCxnQkFBVyxHQUFxQixJQUFJLENBQUM7UUFDckMsV0FBTSxHQUF5QixZQUFZLENBQUEsQ0FBQyxnQkFBZ0I7UUFDNUQsb0JBQWUsR0FBYSxJQUFJLENBQUM7UUFDakMsd0JBQW1CLEdBQWMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakQsb0JBQWUsR0FBZ0IsTUFBTSxDQUFDO0lBRTdCLENBQUM7SUFFakIsMENBQVEsR0FBUjtRQUNJLDREQUE0RDtJQUNoRSxDQUFDO0lBRUQsb0JBQW9CO0lBQ3BCLHNDQUFzQztJQUN0QyxnQ0FBZ0M7SUFDaEMsSUFBSTtJQUVKLCtDQUFhLEdBQWIsVUFBZSxLQUFvQztRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakUsSUFBSSxDQUFDLGFBQWEsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELCtDQUFhLEdBQWIsVUFBZSxLQUFLO1FBQ2hCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ2pEO2FBQU07WUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUMvQyxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNsRDtRQUVELElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDZDQUFXLEdBQVg7UUFDSSxtRUFBbUU7UUFDbkUsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRUQsdUNBQUssR0FBTDtRQUNJLElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNMLENBQUM7SUF4RFE7UUFBUixLQUFLLEVBQUU7d0RBQW9EO0lBQ25EO1FBQVIsS0FBSyxFQUFFOzBEQUF5QjtJQUN2QjtRQUFULE1BQU0sRUFBRTs0REFBNkQ7SUFDNUI7UUFBekMsU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQzsrREFBaUM7SUFMakUsdUJBQXVCO1FBTG5DLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsMGtGQUF3Qzs7U0FFekMsQ0FBQztPQUNXLHVCQUF1QixDQTJEbkM7SUFBRCw4QkFBQztDQUFBLEFBM0RELElBMkRDO1NBM0RZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBNYXREYXRlcGlja2VyLCBNYXREYXRlcGlja2VySW5wdXRFdmVudCxcbiAgICBEYXRlQWRhcHRlciwgTmF0aXZlRGF0ZUFkYXB0ZXIsIE1BVF9EQVRFX0ZPUk1BVFNcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUXVlcnlQYXJhbWV0ZXJzIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi8uLi9ldmVudCc7XG5cblxuY29uc3QgQkVGT1JFID0gXCJCZWZvcmVcIjtcbmNvbnN0IEFGVEVSICA9IFwiQWZ0ZXJcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1tb2RpZmllZC1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9kaWZpZWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tb2RpZmllZC5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1vZGlmaWVkRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGtleSAgICAgICAgICAgIDogc3RyaW5nID0gUXVlcnlQYXJhbWV0ZXJzLk1PRElGSUVEO1xuICAgIEBJbnB1dCgpIHZhbHVlICAgICAgICAgIDogbnVtYmVyO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAVmlld0NoaWxkKE1hdERhdGVwaWNrZXIsIHtzdGF0aWM6ZmFsc2V9KSBkYXRlcGlja2VyOiBNYXREYXRlcGlja2VyPERhdGU+O1xuXG4gICAgcHVibGljIGlzQ29sbGFwc2VkICAgICAgICAgOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgZm9ybWF0ICAgICAgICAgICAgICA6IHN0cmluZyA9ICdNTS9ERC9ZWVlZJyAvLydNTU0gZGQgeXl5eSc7XG4gICAgcHVibGljIGRlYm91bmNlUHJvbWlzZSAgICAgOiBhbnkgPSBudWxsO1xuICAgIHB1YmxpYyBsYXN0TW9kaWZpZWRPcHRpb25zIDogc3RyaW5nW10gPSBbQkVGT1JFLCBBRlRFUl07XG4gICAgcHVibGljIGxhc3RNb2RpZmllZERpciAgICAgOiBzdHJpbmcgPSBCRUZPUkU7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTW9kaWZpZWQuaW5pdCgpIDogXCIgKyB0aGlzLmxhc3RNb2RpZmllZERpcik7XG4gICAgfVxuXG4gICAgLy8gb25LZXlVcCgkZXZlbnQpIHtcbiAgICAvLyAgICAgbGV0IHRleHQgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIC8vICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UodGV4dCk7XG4gICAgLy8gfVxuXG4gICAgb25EYXRlQ2hhbmdlZCggZXZlbnQ6IE1hdERhdGVwaWNrZXJJbnB1dEV2ZW50PERhdGU+ICkge1xuICAgICAgICB0aGlzLnZhbHVlID0gZXZlbnQgJiYgZXZlbnQudmFsdWUgPyBldmVudC52YWx1ZS5nZXRUaW1lKCkgOiBudWxsO1xuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UoIHRoaXMudmFsdWUgKTtcbiAgICB9XG5cbiAgICBvblZhbHVlQ2hhbmdlKCB2YWx1ZSApIHtcbiAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuXG4gICAgICAgIGlmKEJFRk9SRSA9PT0gdGhpcy5sYXN0TW9kaWZpZWREaXIpIHtcbiAgICAgICAgICAgIGNoYW5nZVtRdWVyeVBhcmFtZXRlcnMuTU9ESUZJRURfQkVGT1JFXSA9IHZhbHVlO1xuICAgICAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUl0gPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUl0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGNoYW5nZVtRdWVyeVBhcmFtZXRlcnMuTU9ESUZJRURfQkVGT1JFXSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgY2hhbmdlKTtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uRGlyQ2hhbmdlKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk1vZGlmaWVkLm9uRGlyQ2hhbmdlKCkgOiBcIiArIHRoaXMubGFzdE1vZGlmaWVkRGlyKTtcbiAgICAgICAgaWYodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGlmKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=