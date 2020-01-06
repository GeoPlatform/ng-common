import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemTypes, ItemTypeLabels, QueryParameters } from '@geoplatform/client';
import { SearchEvent, EventTypes } from '../../../event';
var TypeFilterComponent = /** @class */ (function () {
    function TypeFilterComponent() {
        this.key = QueryParameters.TYPES;
        this.selected = [];
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.visibleAmount = 10;
    }
    TypeFilterComponent.prototype.ngOnInit = function () {
        this.choices = Object.keys(ItemTypes).map(function (key) {
            var type = ItemTypes[key];
            if (ItemTypes.STANDARD === type || ItemTypes.RIGHTS_STATEMENT === type)
                return null;
            return { label: ItemTypeLabels[type], value: type };
        }).filter(function (v) { return !!v; });
        // console.log("TypeFilter.onInit() " + JSON.stringify(this.selected));
    };
    TypeFilterComponent.prototype.ngOnChanges = function (changes) {
        if (changes.selected) {
            var value = changes.selected.currentValue;
            console.log("TypeFilter.onChanges() " + JSON.stringify(value));
            //if a selected value wasn't provided, ensure it's 'null' and not undefined
            if (value === undefined) {
                this.selected = [];
            }
            else if (typeof (value) === 'string') {
                this.selected = [value];
            }
        }
    };
    TypeFilterComponent.prototype.getKey = function () {
        return this.key;
    };
    TypeFilterComponent.prototype.notify = function (event) {
        this.onEvent.emit(event);
    };
    TypeFilterComponent.prototype.hasSelections = function () {
        return this.selected && this.selected.length > 0;
    };
    TypeFilterComponent.prototype.isSelected = function (arg) {
        return this.getIndexOf(arg) >= 0;
    };
    TypeFilterComponent.prototype.getIndexOf = function (arg) {
        return this.selected ? this.selected.indexOf(arg) : -1;
    };
    /**
     * @param arg - item or identifier
     */
    TypeFilterComponent.prototype.toggle = function (arg) {
        var idx = this.getIndexOf(arg);
        if (idx >= 0) {
            this.selected.splice(idx, 1);
        }
        else {
            this.selected.push(arg);
        }
        var key = this.getKey();
        var value = this.selected.length ? this.selected : null;
        var change = {};
        change[key] = value;
        var event = new SearchEvent(EventTypes.QUERY, change);
        this.notify(event);
    };
    TypeFilterComponent.prototype.clear = function () {
        if (this.hasSelections()) {
            this.selected = [];
            var key = this.getKey();
            var change = {};
            change[key] = null;
            var event_1 = new SearchEvent(EventTypes.QUERY, change);
            this.notify(event_1);
        }
        else if (this.isCollapsed) {
            this.isCollapsed = false;
        }
    };
    TypeFilterComponent.prototype.getCount = function (value) {
        var _this = this;
        var facet = (this.facets || []).find(function (facet) { return facet.name === _this.key; });
        if (!facet || !facet.buckets || !facet.buckets.length) {
            // console.log("No facet for " + this.key);
            return '';
        }
        var valObj = facet.buckets.find(function (v) { return v.label === value; });
        if (!valObj) {
            // console.log("No bucket for " + value);
            return '';
        }
        return valObj.count;
    };
    tslib_1.__decorate([
        Input()
    ], TypeFilterComponent.prototype, "key", void 0);
    tslib_1.__decorate([
        Input()
    ], TypeFilterComponent.prototype, "facets", void 0);
    tslib_1.__decorate([
        Input()
    ], TypeFilterComponent.prototype, "selected", void 0);
    tslib_1.__decorate([
        Output()
    ], TypeFilterComponent.prototype, "onEvent", void 0);
    TypeFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-type-filter',
            template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Type\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a class=\"m-facet\" (click)=\"clear()\" [ngClass]=\"{active:!hasSelections()}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square':!hasSelections(), 'fa-square t-fg--gray-xlt':hasSelections()}\">\n            </span>\n            Any Type\n        </a>\n        <div class=\"m-facet\" *ngFor=\"let option of choices; let $index=index\"\n            (click)=\"toggle(option.value)\"\n            [ngClass]=\"{active:isSelected(option.value),'is-hidden':$index>visibleAmount}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square':isSelected(option.value),'fa-square':!isSelected(option.value)}\">\n            </span>\n            <span class=\"icon-{{option.label.toLowerCase().replace(' ','')}} is-themed\"></span>\n            {{option.label}}\n            <span class=\"badge badge-secondary\">{{getCount(option.value)}}</span>\n        </div>\n    </div>\n</div>\n",
            styles: [""]
        })
    ], TypeFilterComponent);
    return TypeFilterComponent;
}());
export { TypeFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMvdHlwZS90eXBlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDOUIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVN6RDtJQVdJO1FBVFUsUUFBRyxHQUFrQixlQUFlLENBQUMsS0FBSyxDQUFDO1FBRTNDLGFBQVEsR0FBZSxFQUFFLENBQUM7UUFDMUIsWUFBTyxHQUF5QixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTNELGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRTdCLGtCQUFhLEdBQVksRUFBRSxDQUFDO0lBSW5DLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDekMsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLElBQUksU0FBUyxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksU0FBUyxDQUFDLGdCQUFnQixLQUFLLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDcEYsT0FBTyxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUgsQ0FB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dCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsXG4gICAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSXRlbVR5cGVzLCBJdGVtVHlwZUxhYmVscywgUXVlcnlQYXJhbWV0ZXJzIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2V2ZW50JztcblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLXR5cGUtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3R5cGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90eXBlLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHlwZUZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSAga2V5ICAgICAgIDogc3RyaW5nID0gUXVlcnlQYXJhbWV0ZXJzLlRZUEVTO1xuICAgIEBJbnB1dCgpICBmYWNldHMgICAgOiBhbnlbXTtcbiAgICBASW5wdXQoKSAgc2VsZWN0ZWQgIDogc3RyaW5nW10gPSBbXTtcbiAgICBAT3V0cHV0KCkgb25FdmVudCAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBpc0NvbGxhcHNlZCA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBjaG9pY2VzIDogYW55W107XG4gICAgcHVibGljIHZpc2libGVBbW91bnQgOiBudW1iZXIgPSAxMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2hvaWNlcyA9IE9iamVjdC5rZXlzKEl0ZW1UeXBlcykubWFwKGtleT0+e1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBJdGVtVHlwZXNba2V5XTtcbiAgICAgICAgICAgIGlmKCBJdGVtVHlwZXMuU1RBTkRBUkQgPT09IHR5cGUgfHwgSXRlbVR5cGVzLlJJR0hUU19TVEFURU1FTlQgPT09IHR5cGUpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHsgbGFiZWw6IEl0ZW1UeXBlTGFiZWxzW3R5cGVdLCB2YWx1ZTogdHlwZSB9O1xuICAgICAgICB9KS5maWx0ZXIodj0+ISF2KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJUeXBlRmlsdGVyLm9uSW5pdCgpIFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZCkpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCBjaGFuZ2VzIDogU2ltcGxlQ2hhbmdlcyApIHtcbiAgICAgICAgaWYoY2hhbmdlcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gY2hhbmdlcy5zZWxlY3RlZC5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHlwZUZpbHRlci5vbkNoYW5nZXMoKSBcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG5cbiAgICAgICAgICAgIC8vaWYgYSBzZWxlY3RlZCB2YWx1ZSB3YXNuJ3QgcHJvdmlkZWQsIGVuc3VyZSBpdCdzICdudWxsJyBhbmQgbm90IHVuZGVmaW5lZFxuICAgICAgICAgICAgaWYodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0eXBlb2YodmFsdWUpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbdmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0S2V5KCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXk7XG4gICAgfVxuXG4gICAgbm90aWZ5KCBldmVudCA6IFNlYXJjaEV2ZW50ICkge1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuXG5cbiAgICBoYXNTZWxlY3Rpb25zKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoIGFyZyA6IGFueSApIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEluZGV4T2YoYXJnKSA+PSAwO1xuICAgIH1cblxuICAgIGdldEluZGV4T2YoIGFyZzogYW55ICkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCA/IHRoaXMuc2VsZWN0ZWQuaW5kZXhPZihhcmcpIDogLTE7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gaXRlbSBvciBpZGVudGlmaWVyXG4gICAgICovXG4gICAgdG9nZ2xlKCBhcmcgOiBhbnkgKSB7XG5cbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuZ2V0SW5kZXhPZihhcmcpO1xuICAgICAgICBpZihpZHggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaChhcmcpO1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQga2V5ID0gdGhpcy5nZXRLZXkoKTtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5zZWxlY3RlZC5sZW5ndGggPyB0aGlzLnNlbGVjdGVkIDogbnVsbDtcbiAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuICAgICAgICBjaGFuZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgY2hhbmdlKTtcbiAgICAgICAgdGhpcy5ub3RpZnkoZXZlbnQpO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgaWYodGhpcy5oYXNTZWxlY3Rpb25zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLmdldEtleSgpO1xuICAgICAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuICAgICAgICAgICAgY2hhbmdlW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIGNoYW5nZSk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeShldmVudCk7XG5cbiAgICAgICAgfSBlbHNlIGlmKCB0aGlzLmlzQ29sbGFwc2VkICl7XG4gICAgICAgICAgICB0aGlzLmlzQ29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldENvdW50KCB2YWx1ZSA6IGFueSApIDogc3RyaW5nfG51bWJlciB7XG4gICAgICAgIGxldCBmYWNldCA9ICh0aGlzLmZhY2V0c3x8W10pLmZpbmQoIChmYWNldCkgPT4gZmFjZXQubmFtZSA9PT0gdGhpcy5rZXkgKTtcbiAgICAgICAgaWYoIWZhY2V0IHx8ICFmYWNldC5idWNrZXRzIHx8ICFmYWNldC5idWNrZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJObyBmYWNldCBmb3IgXCIgKyB0aGlzLmtleSk7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbE9iaiA9IGZhY2V0LmJ1Y2tldHMuZmluZCggKHYpID0+IHYubGFiZWwgPT09IHZhbHVlICk7XG4gICAgICAgIGlmKCF2YWxPYmopIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTm8gYnVja2V0IGZvciBcIiArIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsT2JqLmNvdW50O1xuICAgIH1cblxufVxuIl19