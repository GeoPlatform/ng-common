import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QueryParameters } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
var ModifiedFilterComponent = /** @class */ (function () {
    function ModifiedFilterComponent() {
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
    ModifiedFilterComponent.prototype.ngOnInit = function () {
    };
    ModifiedFilterComponent.prototype.onKeyUp = function ($event) {
        var text = $event.target.value;
        this.onValueChange(text);
    };
    ModifiedFilterComponent.prototype.onValueChange = function (value) {
        var change = {};
        if (this.lastModifiedDir.before) {
            change[QueryParameters.MODIFIED_BEFORE] = value;
            change[QueryParameters.MODIFIED_AFTER] = null;
        }
        else {
            change[QueryParameters.MODIFIED_BEFORE] = null;
            change[QueryParameters.MODIFIED_AFTER] = value;
        }
        var event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    };
    ModifiedFilterComponent.prototype.onDirChange = function () {
        this.onValueChange(this.value);
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
    ModifiedFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-modified-filter',
            template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Modified Date\n    </div>\n\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <div *ngIf=\"isCollapsed\" class=\"m-facet active\">\n            <span *ngIf=\"value\">{{lastModifiedDir.value}} {{value}}</span>\n            <span *ngIf=\"!value\">No date specified</span>\n        </div>\n\n        <div class=\"m-facet  d-flex flex-justify-between flex-align-stretch\">\n\n            <select class=\"form-control flex-1 u-mg-right--md\"\n                ([ngModel])=\"lastModifiedDir\"\n                (change)=\"onDirChange()\"\n                aria-label=\"Select before or after modification date constraint\">\n                <option *ngFor=\"let opt of lastModifiedOptions\" [value]=\"opt\">{{opt.value}}</option>\n            </select>\n\n            <div class=\"flex-2 input-group-slick\">\n                <!-- <span class=\"fas fa-calendar\"\n                    title=\"Open date picker to select a date\"\n                    (click)=\"toggle($event)\">\n                </span> -->\n                <input type=\"text\" class=\"form-control\"\n                    placeholder=\"Specify modified date\"\n                    aria-label=\"Specify modified date\"\n                    ([ngModel])=\"value\"\n                    (change)=\"onValueChange(value)\" />\n                <span class=\"fas fa-times\" title=\"Clear value\"\n                    *ngIf=\"value\" (click)=\"clear()\">\n                </span>\n            </div>\n        </div>\n\n    </div>\n</div>\n",
            styles: [""]
        })
    ], ModifiedFilterComponent);
    return ModifiedFilterComponent;
}());
export { ModifiedFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL21vZGlmaWVkL21vZGlmaWVkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDakQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRekQ7SUFlSTtRQWJTLFFBQUcsR0FBdUIsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUVsRCxZQUFPLEdBQTZCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFL0QsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFDN0IsV0FBTSxHQUFZLGFBQWEsQ0FBQztRQUNoQyxvQkFBZSxHQUFTLElBQUksQ0FBQztRQUM3Qix3QkFBbUIsR0FBVztZQUNqQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNqQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUcsTUFBTSxFQUFFLEtBQUssRUFBRTtTQUNyQyxDQUFDO1FBQ0ssb0JBQWUsR0FBUyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFM0MsQ0FBQztJQUVqQiwwQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHlDQUFPLEdBQVAsVUFBUSxNQUFNO1FBQ1YsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsK0NBQWEsR0FBYixVQUFlLEtBQUs7UUFDaEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDaEQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDakQ7YUFBTTtZQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ2xEO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsNkNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx1Q0FBSyxHQUFMO1FBQ0ksSUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FFbEM7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQWxEUTtRQUFSLEtBQUssRUFBRTt3REFBb0Q7SUFDbkQ7UUFBUixLQUFLLEVBQUU7MERBQXVCO0lBQ3JCO1FBQVQsTUFBTSxFQUFFOzREQUE2RDtJQUo3RCx1QkFBdUI7UUFMbkMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixzOERBQXdDOztTQUV6QyxDQUFDO09BQ1csdUJBQXVCLENBcURuQztJQUFELDhCQUFDO0NBQUEsQUFyREQsSUFxREM7U0FyRFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUXVlcnlQYXJhbWV0ZXJzIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi8uLi9ldmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtbW9kaWZpZWQtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21vZGlmaWVkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9kaWZpZWQuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RpZmllZEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBrZXkgICAgICAgICAgICA6IHN0cmluZyA9IFF1ZXJ5UGFyYW1ldGVycy5NT0RJRklFRDtcbiAgICBASW5wdXQoKSB2YWx1ZSAgICAgICAgICA6IERhdGU7XG4gICAgQE91dHB1dCgpIG9uRXZlbnQgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgcHVibGljIGlzQ29sbGFwc2VkIDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGZvcm1hdCA6IHN0cmluZyA9ICdNTU0gZGQgeXl5eSc7XG4gICAgcHVibGljIGRlYm91bmNlUHJvbWlzZSA6IGFueSA9IG51bGw7XG4gICAgcHVibGljIGxhc3RNb2RpZmllZE9wdGlvbnMgOiBhbnlbXSA9IFtcbiAgICAgICAgeyB2YWx1ZTogXCJCZWZvcmVcIiwgYmVmb3JlOiB0cnVlIH0sXG4gICAgICAgIHsgdmFsdWU6IFwiQWZ0ZXJcIiwgIGJlZm9yZTogZmFsc2UgfVxuICAgIF07XG4gICAgcHVibGljIGxhc3RNb2RpZmllZERpciA6IGFueSA9IHRoaXMubGFzdE1vZGlmaWVkT3B0aW9uc1sxXTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBvbktleVVwKCRldmVudCkge1xuICAgICAgICBsZXQgdGV4dCA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSh0ZXh0KTtcbiAgICB9XG5cbiAgICBvblZhbHVlQ2hhbmdlKCB2YWx1ZSApIHtcbiAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuXG4gICAgICAgIGlmKHRoaXMubGFzdE1vZGlmaWVkRGlyLmJlZm9yZSkge1xuICAgICAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkVdID0gdmFsdWU7XG4gICAgICAgICAgICBjaGFuZ2VbUXVlcnlQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSXSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFuZ2VbUXVlcnlQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRV0gPSBudWxsO1xuICAgICAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUl0gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCBjaGFuZ2UpO1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25EaXJDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgaWYodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19