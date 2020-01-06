import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
var SchemeFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SchemeFilterComponent, _super);
    function SchemeFilterComponent(service, dialog) {
        var _this = _super.call(this, service, ItemTypes.CONCEPT_SCHEME, "Scheme", dialog) || this;
        //the key associated with this filter's selections
        _this.key = QueryParameters.SCHEMES_ID;
        //the current set of values
        _this.selected = [];
        _this.onEvent = new EventEmitter();
        return _this;
    }
    SchemeFilterComponent.prototype.getKey = function () {
        return this.key;
    };
    SchemeFilterComponent.prototype.notify = function (event) {
        this.onEvent.emit(event);
    };
    SchemeFilterComponent.prototype.isSupported = function () {
        if (this.query) {
            var types = this.query.getTypes();
            return types && types.length && types.indexOf(ItemTypes.CONCEPT) >= 0;
        }
        return false;
    };
    SchemeFilterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
        { type: MatDialog }
    ]; };
    tslib_1.__decorate([
        Input()
    ], SchemeFilterComponent.prototype, "key", void 0);
    tslib_1.__decorate([
        Input()
    ], SchemeFilterComponent.prototype, "selected", void 0);
    tslib_1.__decorate([
        Input()
    ], SchemeFilterComponent.prototype, "query", void 0);
    tslib_1.__decorate([
        Output()
    ], SchemeFilterComponent.prototype, "onEvent", void 0);
    SchemeFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-scheme-filter',
            template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
            styles: [""]
        }),
        tslib_1.__param(0, Inject(ItemService))
    ], SchemeFilterComponent);
    return SchemeFilterComponent;
}(ItemFilterComponent));
export { SchemeFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJzZWFyY2gvZmlsdGVycy9zY2hlbWUvc2NoZW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBUyxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUy9EO0lBQTJDLGlEQUFtQjtJQVcxRCwrQkFDeUIsT0FBcUIsRUFDMUMsTUFBa0I7UUFGdEIsWUFJSSxrQkFBTSxPQUFPLEVBQUUsU0FBUyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQzdEO1FBZEQsa0RBQWtEO1FBQ3hDLFNBQUcsR0FBa0IsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUMxRCwyQkFBMkI7UUFDakIsY0FBUSxHQUFlLEVBQUUsQ0FBQztRQUkxQixhQUFPLEdBQXlCLElBQUksWUFBWSxFQUFPLENBQUM7O0lBT2xFLENBQUM7SUFFRCxzQ0FBTSxHQUFOO1FBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQ0FBTSxHQUFOLFVBQVEsS0FBbUI7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDSSxJQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xDLE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUUsQ0FBQyxDQUFDO1NBQ3ZFO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Z0RBcEJJLE1BQU0sU0FBQyxXQUFXO2dCQUNWLFNBQVM7O0lBVlo7UUFBVCxLQUFLLEVBQUU7c0RBQWtEO0lBRWhEO1FBQVQsS0FBSyxFQUFFOzJEQUE0QjtJQUcxQjtRQUFULEtBQUssRUFBRTt3REFBb0I7SUFDbEI7UUFBVCxNQUFNLEVBQUU7MERBQXlEO0lBVHpELHFCQUFxQjtRQUxqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLDR1Q0FBNEM7O1NBRTdDLENBQUM7UUFhTyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FaZixxQkFBcUIsQ0FrQ2pDO0lBQUQsNEJBQUM7Q0FBQSxBQWxDRCxDQUEyQyxtQkFBbUIsR0FrQzdEO1NBbENZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgUXVlcnksIEl0ZW1UeXBlcywgUXVlcnlQYXJhbWV0ZXJzLCBJdGVtU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgSXRlbUZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uL2l0ZW0tZmlsdGVyLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFNlYXJjaEV2ZW50LCBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vZXZlbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1zY2hlbWUtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuLi9pdGVtLWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NjaGVtZS5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNjaGVtZUZpbHRlckNvbXBvbmVudCBleHRlbmRzIEl0ZW1GaWx0ZXJDb21wb25lbnQge1xuXG4gICAgLy90aGUga2V5IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGZpbHRlcidzIHNlbGVjdGlvbnNcbiAgICBASW5wdXQoKSAga2V5ICAgICAgIDogc3RyaW5nID0gUXVlcnlQYXJhbWV0ZXJzLlNDSEVNRVNfSUQ7XG4gICAgLy90aGUgY3VycmVudCBzZXQgb2YgdmFsdWVzXG4gICAgQElucHV0KCkgIHNlbGVjdGVkICA6IHN0cmluZ1tdID0gW107XG4gICAgLy90aGUgcXVlcnkgYmVpbmcgYWZmZWN0ZWQgYnkgdGhpcyBmaWx0ZXIncyBzZWxlY3Rpb25zXG4gICAgLy8gdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhpcyBmaWx0ZXIgc2hvdWxkIGJlIHNob3duIG9yIG5vdFxuICAgIEBJbnB1dCgpICBxdWVyeSAgICAgOiBRdWVyeTtcbiAgICBAT3V0cHV0KCkgb25FdmVudCAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEl0ZW1TZXJ2aWNlKSBzZXJ2aWNlIDogSXRlbVNlcnZpY2UsXG4gICAgICAgIGRpYWxvZyA6IE1hdERpYWxvZ1xuICAgICkge1xuICAgICAgICBzdXBlcihzZXJ2aWNlLCBJdGVtVHlwZXMuQ09OQ0VQVF9TQ0hFTUUsIFwiU2NoZW1lXCIsIGRpYWxvZyk7XG4gICAgfVxuXG4gICAgZ2V0S2V5KCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXk7XG4gICAgfVxuXG4gICAgbm90aWZ5KCBldmVudCA6IFNlYXJjaEV2ZW50ICkge1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgaXNTdXBwb3J0ZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICBpZih0aGlzLnF1ZXJ5KSB7XG4gICAgICAgICAgICBsZXQgdHlwZXMgPSB0aGlzLnF1ZXJ5LmdldFR5cGVzKCk7XG4gICAgICAgICAgICByZXR1cm4gdHlwZXMgJiYgdHlwZXMubGVuZ3RoICYmIHR5cGVzLmluZGV4T2YoSXRlbVR5cGVzLkNPTkNFUFQpPj0wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==