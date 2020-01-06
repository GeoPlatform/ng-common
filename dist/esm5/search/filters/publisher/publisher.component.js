import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
var PublisherFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PublisherFilterComponent, _super);
    function PublisherFilterComponent(service, dialog) {
        var _this = _super.call(this, service, ItemTypes.ORGANIZATION, "Publishers", dialog) || this;
        _this.key = QueryParameters.PUBLISHERS_ID;
        _this.onEvent = new EventEmitter();
        return _this;
    }
    PublisherFilterComponent.prototype.getKey = function () {
        return this.key;
    };
    PublisherFilterComponent.prototype.notify = function (event) {
        this.onEvent.emit(event);
    };
    PublisherFilterComponent.prototype.initQuery = function () {
        _super.prototype.initQuery.call(this);
        this.query.fields(['subOrganizationOf']);
    };
    PublisherFilterComponent.prototype.getDialogOptions = function () {
        var opts = _super.prototype.getDialogOptions.call(this);
        opts.data.subHeading = "subOrganizationOf";
        return opts;
    };
    PublisherFilterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
        { type: MatDialog }
    ]; };
    tslib_1.__decorate([
        Input()
    ], PublisherFilterComponent.prototype, "key", void 0);
    tslib_1.__decorate([
        Output()
    ], PublisherFilterComponent.prototype, "onEvent", void 0);
    PublisherFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-publisher-filter',
            template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
            styles: [""]
        }),
        tslib_1.__param(0, Inject(ItemService))
    ], PublisherFilterComponent);
    return PublisherFilterComponent;
}(ItemFilterComponent));
export { PublisherFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJzZWFyY2gvZmlsdGVycy9wdWJsaXNoZXIvcHVibGlzaGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUy9EO0lBQThDLG9EQUFtQjtJQUs3RCxrQ0FDeUIsT0FBcUIsRUFDMUMsTUFBa0I7UUFGdEIsWUFJSSxrQkFBTSxPQUFPLEVBQUUsU0FBUyxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLFNBQy9EO1FBUlMsU0FBRyxHQUFrQixlQUFlLENBQUMsYUFBYSxDQUFDO1FBQ25ELGFBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQzs7SUFPbEUsQ0FBQztJQUVELHlDQUFNLEdBQU47UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELHlDQUFNLEdBQU4sVUFBUSxLQUFtQjtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsNENBQVMsR0FBVDtRQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxtREFBZ0IsR0FBaEI7UUFDSSxJQUFJLElBQUksR0FBRyxpQkFBTSxnQkFBZ0IsV0FBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFtQixDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O2dEQXZCSSxNQUFNLFNBQUMsV0FBVztnQkFDVixTQUFTOztJQUxaO1FBQVQsS0FBSyxFQUFFO3lEQUFxRDtJQUNuRDtRQUFULE1BQU0sRUFBRTs2REFBeUQ7SUFIekQsd0JBQXdCO1FBTHBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsNHVDQUE0Qzs7U0FFN0MsQ0FBQztRQU9PLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQU5mLHdCQUF3QixDQThCcEM7SUFBRCwrQkFBQztDQUFBLEFBOUJELENBQThDLG1CQUFtQixHQThCaEU7U0E5Qlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBJdGVtVHlwZXMsIFF1ZXJ5UGFyYW1ldGVycywgSXRlbVNlcnZpY2UgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcbmltcG9ydCB7IEl0ZW1GaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuLi9pdGVtLWZpbHRlci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2V2ZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtcHVibGlzaGVyLWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi4vaXRlbS1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wdWJsaXNoZXIuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQdWJsaXNoZXJGaWx0ZXJDb21wb25lbnQgZXh0ZW5kcyBJdGVtRmlsdGVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpICBrZXkgICAgICAgOiBzdHJpbmcgPSBRdWVyeVBhcmFtZXRlcnMuUFVCTElTSEVSU19JRDtcbiAgICBAT3V0cHV0KCkgb25FdmVudCAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEl0ZW1TZXJ2aWNlKSBzZXJ2aWNlIDogSXRlbVNlcnZpY2UsXG4gICAgICAgIGRpYWxvZyA6IE1hdERpYWxvZ1xuICAgICkge1xuICAgICAgICBzdXBlcihzZXJ2aWNlLCBJdGVtVHlwZXMuT1JHQU5JWkFUSU9OLCBcIlB1Ymxpc2hlcnNcIiwgZGlhbG9nKTtcbiAgICB9XG5cbiAgICBnZXRLZXkoKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleTtcbiAgICB9XG5cbiAgICBub3RpZnkoIGV2ZW50IDogU2VhcmNoRXZlbnQgKSB7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBpbml0UXVlcnkoKSB7XG4gICAgICAgIHN1cGVyLmluaXRRdWVyeSgpO1xuICAgICAgICB0aGlzLnF1ZXJ5LmZpZWxkcyhbJ3N1Yk9yZ2FuaXphdGlvbk9mJ10pO1xuICAgIH1cblxuICAgIGdldERpYWxvZ09wdGlvbnMoKSA6IGFueSB7XG4gICAgICAgIGxldCBvcHRzID0gc3VwZXIuZ2V0RGlhbG9nT3B0aW9ucygpO1xuICAgICAgICBvcHRzLmRhdGEuc3ViSGVhZGluZyA9IFwic3ViT3JnYW5pemF0aW9uT2ZcIjtcbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfVxufVxuIl19