import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
var TopicFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TopicFilterComponent, _super);
    function TopicFilterComponent(service, dialog) {
        var _this = _super.call(this, service, ItemTypes.TOPIC, "Topics", dialog) || this;
        _this.key = QueryParameters.TOPIC_ID;
        _this.onEvent = new EventEmitter();
        return _this;
    }
    TopicFilterComponent.prototype.getKey = function () {
        return this.key;
    };
    TopicFilterComponent.prototype.notify = function (event) {
        this.onEvent.emit(event);
    };
    TopicFilterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
        { type: MatDialog }
    ]; };
    tslib_1.__decorate([
        Input()
    ], TopicFilterComponent.prototype, "key", void 0);
    tslib_1.__decorate([
        Output()
    ], TopicFilterComponent.prototype, "onEvent", void 0);
    TopicFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-topic-filter',
            template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
            styles: [""]
        }),
        tslib_1.__param(0, Inject(ItemService))
    ], TopicFilterComponent);
    return TopicFilterComponent;
}(ItemFilterComponent));
export { TopicFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL3RvcGljL3RvcGljLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUy9EO0lBQTBDLGdEQUFtQjtJQUt6RCw4QkFDeUIsT0FBcUIsRUFDMUMsTUFBa0I7UUFGdEIsWUFJSSxrQkFBTSxPQUFPLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQ3BEO1FBUlMsU0FBRyxHQUFrQixlQUFlLENBQUMsUUFBUSxDQUFDO1FBQzlDLGFBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQzs7SUFPbEUsQ0FBQztJQUVELHFDQUFNLEdBQU47UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELHFDQUFNLEdBQU4sVUFBUSxLQUFtQjtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDOztnREFaSSxNQUFNLFNBQUMsV0FBVztnQkFDVixTQUFTOztJQUxaO1FBQVQsS0FBSyxFQUFFO3FEQUFnRDtJQUM5QztRQUFULE1BQU0sRUFBRTt5REFBeUQ7SUFIekQsb0JBQW9CO1FBTGhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsNHVDQUE0Qzs7U0FFN0MsQ0FBQztRQU9PLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQU5mLG9CQUFvQixDQW9CaEM7SUFBRCwyQkFBQztDQUFBLEFBcEJELENBQTBDLG1CQUFtQixHQW9CNUQ7U0FwQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBJdGVtVHlwZXMsIFF1ZXJ5UGFyYW1ldGVycywgSXRlbVNlcnZpY2UgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcbmltcG9ydCB7IEl0ZW1GaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuLi9pdGVtLWZpbHRlci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2V2ZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtdG9waWMtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuLi9pdGVtLWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RvcGljLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgVG9waWNGaWx0ZXJDb21wb25lbnQgZXh0ZW5kcyBJdGVtRmlsdGVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpICBrZXkgICAgICAgOiBzdHJpbmcgPSBRdWVyeVBhcmFtZXRlcnMuVE9QSUNfSUQ7XG4gICAgQE91dHB1dCgpIG9uRXZlbnQgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChJdGVtU2VydmljZSkgc2VydmljZSA6IEl0ZW1TZXJ2aWNlLFxuICAgICAgICBkaWFsb2cgOiBNYXREaWFsb2dcbiAgICApIHtcbiAgICAgICAgc3VwZXIoc2VydmljZSwgSXRlbVR5cGVzLlRPUElDLCBcIlRvcGljc1wiLCBkaWFsb2cpO1xuICAgIH1cblxuICAgIGdldEtleSgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5O1xuICAgIH1cblxuICAgIG5vdGlmeSggZXZlbnQgOiBTZWFyY2hFdmVudCApIHtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cblxufVxuIl19