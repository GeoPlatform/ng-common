import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
var CommunityFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CommunityFilterComponent, _super);
    function CommunityFilterComponent(service, dialog) {
        var _this = _super.call(this, service, ItemTypes.COMMUNITY, "Communities", dialog) || this;
        _this.key = QueryParameters.USED_BY_ID;
        _this.onEvent = new EventEmitter();
        return _this;
    }
    CommunityFilterComponent.prototype.getKey = function () {
        return this.key;
    };
    CommunityFilterComponent.prototype.notify = function (event) {
        this.onEvent.emit(event);
    };
    CommunityFilterComponent.prototype.initQuery = function () {
        _super.prototype.initQuery.call(this);
        // this.query.fields(['subOrganizationOf']);
    };
    CommunityFilterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
        { type: MatDialog }
    ]; };
    tslib_1.__decorate([
        Input()
    ], CommunityFilterComponent.prototype, "key", void 0);
    tslib_1.__decorate([
        Output()
    ], CommunityFilterComponent.prototype, "onEvent", void 0);
    CommunityFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-community-filter',
            template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
            styles: [""]
        }),
        tslib_1.__param(0, Inject(ItemService))
    ], CommunityFilterComponent);
    return CommunityFilterComponent;
}(ItemFilterComponent));
export { CommunityFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJzZWFyY2gvZmlsdGVycy9jb21tdW5pdHkvY29tbXVuaXR5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUy9EO0lBQThDLG9EQUFtQjtJQUs3RCxrQ0FDeUIsT0FBcUIsRUFDMUMsTUFBa0I7UUFGdEIsWUFJSSxrQkFBTSxPQUFPLEVBQUUsU0FBUyxDQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLFNBQzdEO1FBUlMsU0FBRyxHQUFrQixlQUFlLENBQUMsVUFBVSxDQUFDO1FBQ2hELGFBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQzs7SUFPbEUsQ0FBQztJQUVELHlDQUFNLEdBQU47UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELHlDQUFNLEdBQU4sVUFBUSxLQUFtQjtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsNENBQVMsR0FBVDtRQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1FBQ2xCLDRDQUE0QztJQUNoRCxDQUFDOztnREFqQkksTUFBTSxTQUFDLFdBQVc7Z0JBQ1YsU0FBUzs7SUFMWjtRQUFULEtBQUssRUFBRTt5REFBa0Q7SUFDaEQ7UUFBVCxNQUFNLEVBQUU7NkRBQXlEO0lBSHpELHdCQUF3QjtRQUxwQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLDR1Q0FBNEM7O1NBRTdDLENBQUM7UUFPTyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FOZix3QkFBd0IsQ0E4QnBDO0lBQUQsK0JBQUM7Q0FBQSxBQTlCRCxDQUE4QyxtQkFBbUIsR0E4QmhFO1NBOUJZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgSXRlbVR5cGVzLCBRdWVyeVBhcmFtZXRlcnMsIEl0ZW1TZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgeyBJdGVtRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vaXRlbS1maWx0ZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi8uLi9ldmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLWNvbW11bml0eS1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4uL2l0ZW0tZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29tbXVuaXR5LmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29tbXVuaXR5RmlsdGVyQ29tcG9uZW50IGV4dGVuZHMgSXRlbUZpbHRlckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSAga2V5ICAgICAgIDogc3RyaW5nID0gUXVlcnlQYXJhbWV0ZXJzLlVTRURfQllfSUQ7XG4gICAgQE91dHB1dCgpIG9uRXZlbnQgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChJdGVtU2VydmljZSkgc2VydmljZSA6IEl0ZW1TZXJ2aWNlLFxuICAgICAgICBkaWFsb2cgOiBNYXREaWFsb2dcbiAgICApIHtcbiAgICAgICAgc3VwZXIoc2VydmljZSwgSXRlbVR5cGVzLkNPTU1VTklUWSwgXCJDb21tdW5pdGllc1wiLCBkaWFsb2cpO1xuICAgIH1cblxuICAgIGdldEtleSgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5O1xuICAgIH1cblxuICAgIG5vdGlmeSggZXZlbnQgOiBTZWFyY2hFdmVudCApIHtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGluaXRRdWVyeSgpIHtcbiAgICAgICAgc3VwZXIuaW5pdFF1ZXJ5KCk7XG4gICAgICAgIC8vIHRoaXMucXVlcnkuZmllbGRzKFsnc3ViT3JnYW5pemF0aW9uT2YnXSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0RGlhbG9nT3B0aW9ucygpIDogYW55IHtcbiAgICAvLyAgICAgbGV0IG9wdHMgPSBzdXBlci5nZXREaWFsb2dPcHRpb25zKCk7XG4gICAgLy8gICAgIG9wdHMuZGF0YS5zdWJIZWFkaW5nID0gXCJzdWJPcmdhbml6YXRpb25PZlwiO1xuICAgIC8vICAgICByZXR1cm4gb3B0cztcbiAgICAvLyB9XG59XG4iXX0=