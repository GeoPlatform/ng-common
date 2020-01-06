import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
var ThemeFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ThemeFilterComponent, _super);
    function ThemeFilterComponent(service, dialog) {
        var _this = _super.call(this, service, ItemTypes.CONCEPT, "Themes", dialog) || this;
        _this.key = QueryParameters.THEMES_ID;
        _this.onEvent = new EventEmitter();
        return _this;
    }
    ThemeFilterComponent.prototype.getKey = function () {
        return this.key;
    };
    ThemeFilterComponent.prototype.notify = function (event) {
        this.onEvent.emit(event);
    };
    ThemeFilterComponent.prototype.initQuery = function () {
        _super.prototype.initQuery.call(this);
        this.query.fields(['scheme']);
    };
    ThemeFilterComponent.prototype.getDialogOptions = function () {
        var opts = _super.prototype.getDialogOptions.call(this);
        opts.data.subHeading = "scheme";
        return opts;
    };
    ThemeFilterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
        { type: MatDialog }
    ]; };
    tslib_1.__decorate([
        Input()
    ], ThemeFilterComponent.prototype, "key", void 0);
    tslib_1.__decorate([
        Output()
    ], ThemeFilterComponent.prototype, "onEvent", void 0);
    ThemeFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-theme-filter',
            template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
            styles: [""]
        }),
        tslib_1.__param(0, Inject(ItemService))
    ], ThemeFilterComponent);
    return ThemeFilterComponent;
}(ItemFilterComponent));
export { ThemeFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL3RoZW1lL3RoZW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUS9EO0lBQTBDLGdEQUFtQjtJQUt6RCw4QkFDeUIsT0FBcUIsRUFDMUMsTUFBa0I7UUFGdEIsWUFJSSxrQkFBTSxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQ3REO1FBUlMsU0FBRyxHQUFrQixlQUFlLENBQUMsU0FBUyxDQUFDO1FBQy9DLGFBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQzs7SUFPbEUsQ0FBQztJQUVELHFDQUFNLEdBQU47UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELHFDQUFNLEdBQU4sVUFBUSxLQUFtQjtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsd0NBQVMsR0FBVDtRQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsK0NBQWdCLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsaUJBQU0sZ0JBQWdCLFdBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Z0RBdkJJLE1BQU0sU0FBQyxXQUFXO2dCQUNWLFNBQVM7O0lBTFo7UUFBVCxLQUFLLEVBQUU7cURBQWlEO0lBQy9DO1FBQVQsTUFBTSxFQUFFO3lEQUF5RDtJQUh6RCxvQkFBb0I7UUFMaEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQiw0dUNBQTRDOztTQUU3QyxDQUFDO1FBT08sbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BTmYsb0JBQW9CLENBK0JoQztJQUFELDJCQUFDO0NBQUEsQUEvQkQsQ0FBMEMsbUJBQW1CLEdBK0I1RDtTQS9CWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IEl0ZW1UeXBlcywgUXVlcnlQYXJhbWV0ZXJzLCBJdGVtU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgSXRlbUZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uL2l0ZW0tZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2V2ZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtdGhlbWUtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuLi9pdGVtLWZpbHRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RoZW1lLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGhlbWVGaWx0ZXJDb21wb25lbnQgZXh0ZW5kcyBJdGVtRmlsdGVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpICBrZXkgICAgICAgOiBzdHJpbmcgPSBRdWVyeVBhcmFtZXRlcnMuVEhFTUVTX0lEO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSXRlbVNlcnZpY2UpIHNlcnZpY2UgOiBJdGVtU2VydmljZSxcbiAgICAgICAgZGlhbG9nIDogTWF0RGlhbG9nXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHNlcnZpY2UsIEl0ZW1UeXBlcy5DT05DRVBULCBcIlRoZW1lc1wiLCBkaWFsb2cpO1xuICAgIH1cblxuICAgIGdldEtleSgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5O1xuICAgIH1cblxuICAgIG5vdGlmeSggZXZlbnQgOiBTZWFyY2hFdmVudCApIHtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGluaXRRdWVyeSgpIHtcbiAgICAgICAgc3VwZXIuaW5pdFF1ZXJ5KCk7XG4gICAgICAgIHRoaXMucXVlcnkuZmllbGRzKFsnc2NoZW1lJ10pO1xuICAgIH1cblxuICAgIGdldERpYWxvZ09wdGlvbnMoKSA6IGFueSB7XG4gICAgICAgIGxldCBvcHRzID0gc3VwZXIuZ2V0RGlhbG9nT3B0aW9ucygpO1xuICAgICAgICBvcHRzLmRhdGEuc3ViSGVhZGluZyA9IFwic2NoZW1lXCI7XG4gICAgICAgIHJldHVybiBvcHRzO1xuICAgIH1cblxufVxuIl19