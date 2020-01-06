import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Query, QueryParameters, QueryFacets, ItemService } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
import { AuthenticatedComponent, AppAuthService } from '../../../auth';
;
var CreatedByFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CreatedByFilterComponent, _super);
    function CreatedByFilterComponent(authService, service) {
        var _this = _super.call(this, authService) || this;
        _this.service = service;
        _this.key = QueryParameters.QUERY;
        _this.onEvent = new EventEmitter();
        _this.typeaheadValue = null;
        _this.isCollapsed = true;
        _this.pagination = { page: 0, size: 10 };
        _this.values = [];
        _this.pagedValues = [];
        _this.visibleAmount = 10;
        return _this;
    }
    CreatedByFilterComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.selected = null;
        this.fetchValues();
    };
    CreatedByFilterComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.values = null;
        this.pagedValues = null;
        this.pagination = null;
        this.selected = null;
        this.outsideSelection = null;
    };
    CreatedByFilterComponent.prototype.notify = function () {
        var key = this.key;
        var change = {};
        change[key] = this.selected;
        change[QueryParameters.PAGE] = 0;
        var event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    };
    CreatedByFilterComponent.prototype.hasSelections = function () {
        return this.selected && this.selected.length > 0;
    };
    CreatedByFilterComponent.prototype.isSelected = function (arg) {
        return this.hasSelections() && this.getIndexOf(arg) >= 0;
    };
    CreatedByFilterComponent.prototype.getIndexOf = function (arg) {
        if (!this.selected || !this.selected.length)
            return -1;
        return this.selected.indexOf(arg);
    };
    /**
     * @param arg - item or identifier
     */
    CreatedByFilterComponent.prototype.toggle = function (arg) {
        if (this.selected && this.selected === arg)
            this.selected = null;
        else
            this.selected = arg;
        this.notify();
    };
    CreatedByFilterComponent.prototype.clear = function () {
        if (this.hasSelections()) {
            this.selected = null;
            this.notify();
        }
        else if (this.isCollapsed) {
            this.isCollapsed = false;
        }
    };
    CreatedByFilterComponent.prototype.fetchValues = function () {
        var _this = this;
        var query = new Query().pageSize(1)
            .facets(QueryFacets.CREATED_BY)
            .parameter('includeFacet._createdBy.size', 1000); //TODO not use Registry name
        this.service.search(query)
            .then(function (response) {
            var facet = response.facets.find(function (facet) { return facet.name === 'createdBy'; });
            if (!facet)
                _this.values = [];
            else {
                _this.values = (facet.buckets || []).map(function (bucket) {
                    // Awaiting DT-1092 resolution
                    return {
                        id: bucket.label,
                        label: bucket.label,
                        count: bucket.count
                    };
                });
            }
        })
            .catch(function (e) { _this.values = []; })
            .finally(function () {
            _this.updatePagedValues();
        });
    };
    /**
     *
     */
    CreatedByFilterComponent.prototype.nextPage = function () {
        var numPages = Math.ceil(this.values.length / this.pagination.size);
        this.pagination.page = Math.min(numPages - 1, this.pagination.page + 1);
        this.updatePagedValues();
    };
    /**
     *
     */
    CreatedByFilterComponent.prototype.prevPage = function () {
        this.pagination.page = Math.max(0, this.pagination.page - 1);
        this.updatePagedValues();
    };
    /**
     * @param resetStart boolean indicating to reset pagination start
     */
    CreatedByFilterComponent.prototype.updatePagedValues = function (resetStart) {
        var _this = this;
        if (resetStart)
            this.pagination.page = 0;
        var values = this.values;
        if (this.typeaheadValue && this.typeaheadValue.length) {
            values = values.filter(function (v) { return v.label.indexOf(_this.typeaheadValue) >= 0; });
        }
        if (values.length < this.pagination.size) {
            this.pagination.page = 0; //reset current page
            this.pagedValues = values;
            console.log("Paged Values: " + JSON.stringify(this.pagedValues));
        }
        var start = this.pagination.page * this.pagination.size;
        var end = Math.min(start + this.pagination.size, values.length);
        this.pagedValues = values.slice(start, end);
        this.checkForOutsideSelections();
    };
    /**
     *
     */
    CreatedByFilterComponent.prototype.checkForOutsideSelections = function () {
        var selected = this.getSelection();
        if (selected && !this.pagedValues.find(function (v) { return v.id === selected; })) {
            this.outsideSelection = selected;
        }
        else {
            this.outsideSelection = null;
        }
    };
    /**
     *
     */
    CreatedByFilterComponent.prototype.clearTypeAhead = function () {
        this.typeaheadValue = null;
        this.updatePagedValues();
    };
    /**
     *
     */
    CreatedByFilterComponent.prototype.toggleCurrentUser = function () {
        var username = this.getCurrentUserName();
        if (username)
            this.toggle(username);
        else {
            console.log("No user to use to filter");
        }
    };
    CreatedByFilterComponent.prototype.getCurrentUserName = function () {
        if (!this.isAuthenticated())
            return null;
        var user = this.getUser();
        return user ? user.username : null;
    };
    CreatedByFilterComponent.prototype.getSelection = function () {
        // let value = this.service.getCreatedBy();
        // if(Array.isArray(value)) return value.length ? value[0] : null;
        // return value;
        return null;
    };
    CreatedByFilterComponent.ctorParameters = function () { return [
        { type: AppAuthService },
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
    ]; };
    tslib_1.__decorate([
        Input()
    ], CreatedByFilterComponent.prototype, "key", void 0);
    tslib_1.__decorate([
        Input()
    ], CreatedByFilterComponent.prototype, "selected", void 0);
    tslib_1.__decorate([
        Output()
    ], CreatedByFilterComponent.prototype, "onEvent", void 0);
    CreatedByFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-createdby-filter',
            template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Creator\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <a class=\"m-facet\" (click)=\"clear()\" [ngClass]=\"{active:!hasSelections()}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square': !hasSelections(), 'fa-square': hasSelections()}\"></span>\n            <span *ngIf=\"!hasSelections()\">Any creator</span>\n            <span *ngIf=\"hasSelections()\">Clear Selections</span>\n        </a>\n\n        <a class=\"m-facet\"\n            *ngIf=\"isAuthenticated() && !isSelected( getCurrentUserName() )\"\n            (click)=\"toggle( getCurrentUserName() )\">\n            <span class=\"fas fa-square t-fg--gray-lt\"></span>\n            Me ({{getCurrentUserName()||\"\"}})\n        </a>\n\n        <div class=\"m-facet\" *ngIf=\"values.length\">\n            <div class=\"input-group-slick\">\n                <span class=\"fas fa-search\"></span>\n                <input type=\"text\" class=\"form-control\" placeholder=\"Find creator by name\"\n                    ([ngModel])=\"typeaheadValue\" (change)=\"updatePagedValues(true)\">\n                <span class=\"fas fa-times\" *ngIf=\"typeaheadValue?.length\" (click)=\"clearTypeAhead()\"></span>\n            </div>\n        </div>\n\n        <div class=\"m-facet d-flex flex-justify-between flex-align-center\" *ngIf=\"values?.length\">\n            <button type=\"button\" class=\"btn btn-xs btn-light\" (click)=\"prevPage()\">\n                <span class=\"fas fa-backward\"></span>\n            </button>\n            <div>\n                showing {{pagedValues?.length||'0'}}\n                <span *ngIf=\"typeaheadValue?.length\">matches</span>\n                of {{values?.length||'0'}} results\n            </div>\n            <button type=\"button\" class=\"btn btn-xs btn-light\" (click)=\"nextPage()\">\n                <span class=\"fas fa-forward\"></span>\n            </button>\n        </div>\n        <div *ngFor=\"let value of pagedValues; let $index = index\" class=\"m-facet\">\n            <a  *ngIf=\"!isAuthenticated() || (value.id !== getCurrentUserName())\"\n                (click)=\"toggle(value.id)\"\n                [ngClass]=\"{active:isSelected(value.id),'is-hidden':$index>visibleAmount}\">\n                <span class=\"u-mg-right--sm far\"\n                    [ngClass]=\"{'fa-check-square': isSelected(value.id), 'fa-square': !isSelected(value.id)}\"></span>\n                <span class=\"u-mg-right--xs far fa-user\"></span>\n                <span>{{value.label}}</span>\n                <span class=\"badge badge-secondary\">{{value.count}}</span>\n            </a>\n        </div>\n        <!-- show selections that are not in the filtered values above -->\n        <hr *ngIf=\"!isCollapsed && outsideSelection\">\n        <a  *ngIf=\"outsideSelection\" class=\"m-facet\"\n            (click)=\"toggle(outsideSelection.id)\">\n            <span class=\"fas fa-check-square\"></span>\n            <span class=\"badge u-text--md t-fg--gray-md\"\n                title=\"This item is selected but not in the filtered values above\">\n                <span class=\"fas fa-info-circle\"></span>\n            </span>\n            <span class=\"u-mg-right--xs far fa-user\"></span>\n            {{outsideSelection}}\n        </a>\n    </div>\n</div>\n",
            styles: [""]
        }),
        tslib_1.__param(1, Inject(ItemService))
    ], CreatedByFilterComponent);
    return CreatedByFilterComponent;
}(AuthenticatedComponent));
export { CreatedByFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMvY3JlYXRvci9jcmVhdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBcUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUNwRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsS0FBSyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUNuRCxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU90RSxDQUFDO0FBUUY7SUFBOEMsb0RBQXNCO0lBY2hFLGtDQUNJLFdBQTRCLEVBQ0MsT0FBcUI7UUFGdEQsWUFJSSxrQkFBTSxXQUFXLENBQUMsU0FDckI7UUFIZ0MsYUFBTyxHQUFQLE9BQU8sQ0FBYztRQWQ3QyxTQUFHLEdBQXVCLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFFL0MsYUFBTyxHQUE2QixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRS9ELG9CQUFjLEdBQWMsSUFBSSxDQUFDO1FBQ2pDLGlCQUFXLEdBQWtCLElBQUksQ0FBQztRQUNsQyxnQkFBVSxHQUEyQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQzNFLFlBQU0sR0FBeUIsRUFBRSxDQUFDO1FBQ2xDLGlCQUFXLEdBQW9CLEVBQUUsQ0FBQztRQUVsQyxtQkFBYSxHQUFZLEVBQUUsQ0FBQzs7SUFPbkMsQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFDSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxH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QUFrRTtRQUNsRSxnQkFBZ0I7UUFDaEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Z0JBM0trQixjQUFjO2dEQUMzQixNQUFNLFNBQUMsV0FBVzs7SUFkZDtRQUFSLEtBQUssRUFBRTt5REFBaUQ7SUFDaEQ7UUFBUixLQUFLLEVBQUU7OERBQXlCO0lBQ3ZCO1FBQVQsTUFBTSxFQUFFOzZEQUE2RDtJQUo3RCx3QkFBd0I7UUFMcEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQix1dUhBQXVDOztTQUV4QyxDQUFDO1FBaUJPLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQWhCZix3QkFBd0IsQ0EyTHBDO0lBQUQsK0JBQUM7Q0FBQSxBQTNMRCxDQUE4QyxzQkFBc0IsR0EyTG5FO1NBM0xZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIFF1ZXJ5LCBRdWVyeVBhcmFtZXRlcnMsIFF1ZXJ5RmFjZXRzLCBJdGVtU2VydmljZSwgU2VhcmNoUmVzdWx0c1xufSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2V2ZW50JztcbmltcG9ydCB7IEF1dGhlbnRpY2F0ZWRDb21wb25lbnQsIEFwcEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vYXV0aCc7XG5cblxuaW50ZXJmYWNlIENyZWF0b3Ige1xuICAgIGlkICAgOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBjb3VudDogbnVtYmVyO1xufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1jcmVhdGVkYnktZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NyZWF0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jcmVhdG9yLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ3JlYXRlZEJ5RmlsdGVyQ29tcG9uZW50IGV4dGVuZHMgQXV0aGVudGljYXRlZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGtleSAgICAgICAgICAgIDogc3RyaW5nID0gUXVlcnlQYXJhbWV0ZXJzLlFVRVJZO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkICAgICAgIDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyB0eXBlYWhlYWRWYWx1ZSAgIDogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgaXNDb2xsYXBzZWQgICAgICA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBwYWdpbmF0aW9uICAgICAgIDogeyBwYWdlOiBudW1iZXI7IHNpemU6IG51bWJlcjsgfSA9IHsgcGFnZTogMCwgc2l6ZTogMTAgfTtcbiAgICBwdWJsaWMgdmFsdWVzICAgICAgICAgICA6IENyZWF0b3JbXSA9IFtdO1xuICAgIHB1YmxpYyBwYWdlZFZhbHVlcyAgICAgIDogQ3JlYXRvcltdID0gW107XG4gICAgcHVibGljIG91dHNpZGVTZWxlY3Rpb24gOiBDcmVhdG9yO1xuICAgIHB1YmxpYyB2aXNpYmxlQW1vdW50IDogbnVtYmVyID0gMTA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgYXV0aFNlcnZpY2UgOiBBcHBBdXRoU2VydmljZSxcbiAgICAgICAgQEluamVjdChJdGVtU2VydmljZSkgcHJpdmF0ZSBzZXJ2aWNlIDogSXRlbVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoYXV0aFNlcnZpY2UpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgdGhpcy5mZXRjaFZhbHVlcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgICAgICB0aGlzLnZhbHVlcyA9IG51bGw7XG4gICAgICAgIHRoaXMucGFnZWRWYWx1ZXMgPSBudWxsO1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgdGhpcy5vdXRzaWRlU2VsZWN0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBub3RpZnkoICkge1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5rZXk7XG4gICAgICAgIGxldCBjaGFuZ2UgPSB7fTtcbiAgICAgICAgY2hhbmdlW2tleV0gPSB0aGlzLnNlbGVjdGVkO1xuICAgICAgICBjaGFuZ2VbUXVlcnlQYXJhbWV0ZXJzLlBBR0VdID0gMDtcbiAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIGNoYW5nZSk7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBoYXNTZWxlY3Rpb25zKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoIGFyZyA6IHN0cmluZyApIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1NlbGVjdGlvbnMoKSAmJiB0aGlzLmdldEluZGV4T2YoYXJnKSA+PSAwO1xuICAgIH1cblxuICAgIGdldEluZGV4T2YoIGFyZyA6IHN0cmluZyApIDogbnVtYmVyIHtcbiAgICAgICAgaWYoIXRoaXMuc2VsZWN0ZWQgfHwgIXRoaXMuc2VsZWN0ZWQubGVuZ3RoKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkLmluZGV4T2YoYXJnKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBpdGVtIG9yIGlkZW50aWZpZXJcbiAgICAgKi9cbiAgICB0b2dnbGUoIGFyZyA6IHN0cmluZyApIHtcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZCAmJiB0aGlzLnNlbGVjdGVkID09PSBhcmcpIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICBlbHNlIHRoaXMuc2VsZWN0ZWQgPSBhcmc7XG4gICAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgfVxuXG4gICAgY2xlYXIgKCkge1xuICAgICAgICBpZih0aGlzLmhhc1NlbGVjdGlvbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiggdGhpcy5pc0NvbGxhcHNlZCApe1xuICAgICAgICAgICAgdGhpcy5pc0NvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmZXRjaFZhbHVlcygpIHtcbiAgICAgICBsZXQgcXVlcnkgPSBuZXcgUXVlcnkoKS5wYWdlU2l6ZSgxKVxuICAgICAgICAgICAuZmFjZXRzKFF1ZXJ5RmFjZXRzLkNSRUFURURfQlkpXG4gICAgICAgICAgIC5wYXJhbWV0ZXIoJ2luY2x1ZGVGYWNldC5fY3JlYXRlZEJ5LnNpemUnLCAxMDAwKTsgICAvL1RPRE8gbm90IHVzZSBSZWdpc3RyeSBuYW1lXG5cbiAgICAgICB0aGlzLnNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxuICAgICAgIC50aGVuKCAocmVzcG9uc2UgOiBTZWFyY2hSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgIGxldCBmYWNldCA9IHJlc3BvbnNlLmZhY2V0cy5maW5kKCBmYWNldCA9PiBmYWNldC5uYW1lPT09J2NyZWF0ZWRCeScpO1xuICAgICAgICAgICBpZighZmFjZXQpIHRoaXMudmFsdWVzID0gW107XG4gICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSAoZmFjZXQuYnVja2V0c3x8W10pLm1hcCggKGJ1Y2tldDphbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAvLyBBd2FpdGluZyBEVC0xMDkyIHJlc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICBpZCAgIDogYnVja2V0LmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogYnVja2V0LmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogYnVja2V0LmNvdW50XG4gICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICB9XG4gICAgICAgfSlcbiAgICAgICAuY2F0Y2goZSA9PiB7IHRoaXMudmFsdWVzID0gW107IH0pXG4gICAgICAgLmZpbmFsbHkgKCAoKSA9PiB7XG4gICAgICAgICAgIHRoaXMudXBkYXRlUGFnZWRWYWx1ZXMoKTtcbiAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG5leHRQYWdlKCkge1xuICAgICAgICBsZXQgbnVtUGFnZXMgPSBNYXRoLmNlaWwodGhpcy52YWx1ZXMubGVuZ3RoIC8gdGhpcy5wYWdpbmF0aW9uLnNpemUpO1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24ucGFnZSA9IE1hdGgubWluKCBudW1QYWdlcy0xLCB0aGlzLnBhZ2luYXRpb24ucGFnZSsxKTtcbiAgICAgICAgdGhpcy51cGRhdGVQYWdlZFZhbHVlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgcHJldlBhZ2UoKSB7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbi5wYWdlID0gTWF0aC5tYXgoMCwgdGhpcy5wYWdpbmF0aW9uLnBhZ2UtMSk7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnZWRWYWx1ZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcmVzZXRTdGFydCBib29sZWFuIGluZGljYXRpbmcgdG8gcmVzZXQgcGFnaW5hdGlvbiBzdGFydFxuICAgICAqL1xuICAgIHVwZGF0ZVBhZ2VkVmFsdWVzKCByZXNldFN0YXJ0ID86IGJvb2xlYW4gKSB7XG5cbiAgICAgICAgaWYocmVzZXRTdGFydCkgdGhpcy5wYWdpbmF0aW9uLnBhZ2UgPSAwO1xuXG4gICAgICAgIGxldCB2YWx1ZXMgPSB0aGlzLnZhbHVlcztcbiAgICAgICAgaWYodGhpcy50eXBlYWhlYWRWYWx1ZSAmJiB0aGlzLnR5cGVhaGVhZFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmZpbHRlciggdiA9PiB2LmxhYmVsLmluZGV4T2YodGhpcy50eXBlYWhlYWRWYWx1ZSkgPj0wICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih2YWx1ZXMubGVuZ3RoIDwgdGhpcy5wYWdpbmF0aW9uLnNpemUpIHtcbiAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbi5wYWdlID0gMDsgICAvL3Jlc2V0IGN1cnJlbnQgcGFnZVxuICAgICAgICAgICAgdGhpcy5wYWdlZFZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGFnZWQgVmFsdWVzOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMucGFnZWRWYWx1ZXMpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnBhZ2luYXRpb24ucGFnZSp0aGlzLnBhZ2luYXRpb24uc2l6ZTtcbiAgICAgICAgbGV0IGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgdGhpcy5wYWdpbmF0aW9uLnNpemUsIHZhbHVlcy5sZW5ndGgpO1xuICAgICAgICB0aGlzLnBhZ2VkVmFsdWVzID0gdmFsdWVzLnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gICAgICAgIHRoaXMuY2hlY2tGb3JPdXRzaWRlU2VsZWN0aW9ucygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY2hlY2tGb3JPdXRzaWRlU2VsZWN0aW9ucygpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgaWYoIHNlbGVjdGVkICYmICF0aGlzLnBhZ2VkVmFsdWVzLmZpbmQodiA9PiB2LmlkID09PSBzZWxlY3RlZCkgKSB7XG4gICAgICAgICAgICB0aGlzLm91dHNpZGVTZWxlY3Rpb24gPSBzZWxlY3RlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3V0c2lkZVNlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNsZWFyVHlwZUFoZWFkKCkge1xuICAgICAgICB0aGlzLnR5cGVhaGVhZFZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy51cGRhdGVQYWdlZFZhbHVlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgdG9nZ2xlQ3VycmVudFVzZXIoKSB7XG4gICAgICAgIGxldCB1c2VybmFtZSA9IHRoaXMuZ2V0Q3VycmVudFVzZXJOYW1lKCk7XG4gICAgICAgIGlmKHVzZXJuYW1lKSB0aGlzLnRvZ2dsZSggdXNlcm5hbWUgKTtcbiAgICAgICAgZWxzZSB7IGNvbnNvbGUubG9nKFwiTm8gdXNlciB0byB1c2UgdG8gZmlsdGVyXCIpOyB9XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudFVzZXJOYW1lKCkge1xuICAgICAgICBpZighdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCB1c2VyID0gdGhpcy5nZXRVc2VyKCk7XG4gICAgICAgIHJldHVybiB1c2VyID8gdXNlci51c2VybmFtZSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0aW9uKCkge1xuICAgICAgIC8vIGxldCB2YWx1ZSA9IHRoaXMuc2VydmljZS5nZXRDcmVhdGVkQnkoKTtcbiAgICAgICAvLyBpZihBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIHZhbHVlLmxlbmd0aCA/IHZhbHVlWzBdIDogbnVsbDtcbiAgICAgICAvLyByZXR1cm4gdmFsdWU7XG4gICAgICAgcmV0dXJuIG51bGw7XG4gICB9XG59XG4iXX0=