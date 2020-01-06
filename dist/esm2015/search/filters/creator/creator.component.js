import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Query, QueryParameters, QueryFacets, ItemService } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
import { AuthenticatedComponent, AppAuthService } from '../../../auth';
;
let CreatedByFilterComponent = class CreatedByFilterComponent extends AuthenticatedComponent {
    constructor(authService, service) {
        super(authService);
        this.service = service;
        this.key = QueryParameters.QUERY;
        this.onEvent = new EventEmitter();
        this.typeaheadValue = null;
        this.isCollapsed = true;
        this.pagination = { page: 0, size: 10 };
        this.values = [];
        this.pagedValues = [];
        this.visibleAmount = 10;
    }
    ngOnInit() {
        super.ngOnInit();
        this.selected = null;
        this.fetchValues();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.values = null;
        this.pagedValues = null;
        this.pagination = null;
        this.selected = null;
        this.outsideSelection = null;
    }
    notify() {
        let key = this.key;
        let change = {};
        change[key] = this.selected;
        change[QueryParameters.PAGE] = 0;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
    hasSelections() {
        return this.selected && this.selected.length > 0;
    }
    isSelected(arg) {
        return this.hasSelections() && this.getIndexOf(arg) >= 0;
    }
    getIndexOf(arg) {
        if (!this.selected || !this.selected.length)
            return -1;
        return this.selected.indexOf(arg);
    }
    /**
     * @param arg - item or identifier
     */
    toggle(arg) {
        if (this.selected && this.selected === arg)
            this.selected = null;
        else
            this.selected = arg;
        this.notify();
    }
    clear() {
        if (this.hasSelections()) {
            this.selected = null;
            this.notify();
        }
        else if (this.isCollapsed) {
            this.isCollapsed = false;
        }
    }
    fetchValues() {
        let query = new Query().pageSize(1)
            .facets(QueryFacets.CREATED_BY)
            .parameter('includeFacet._createdBy.size', 1000); //TODO not use Registry name
        this.service.search(query)
            .then((response) => {
            let facet = response.facets.find(facet => facet.name === 'createdBy');
            if (!facet)
                this.values = [];
            else {
                this.values = (facet.buckets || []).map((bucket) => {
                    // Awaiting DT-1092 resolution
                    return {
                        id: bucket.label,
                        label: bucket.label,
                        count: bucket.count
                    };
                });
            }
        })
            .catch(e => { this.values = []; })
            .finally(() => {
            this.updatePagedValues();
        });
    }
    /**
     *
     */
    nextPage() {
        let numPages = Math.ceil(this.values.length / this.pagination.size);
        this.pagination.page = Math.min(numPages - 1, this.pagination.page + 1);
        this.updatePagedValues();
    }
    /**
     *
     */
    prevPage() {
        this.pagination.page = Math.max(0, this.pagination.page - 1);
        this.updatePagedValues();
    }
    /**
     * @param resetStart boolean indicating to reset pagination start
     */
    updatePagedValues(resetStart) {
        if (resetStart)
            this.pagination.page = 0;
        let values = this.values;
        if (this.typeaheadValue && this.typeaheadValue.length) {
            values = values.filter(v => v.label.indexOf(this.typeaheadValue) >= 0);
        }
        if (values.length < this.pagination.size) {
            this.pagination.page = 0; //reset current page
            this.pagedValues = values;
            console.log("Paged Values: " + JSON.stringify(this.pagedValues));
        }
        let start = this.pagination.page * this.pagination.size;
        let end = Math.min(start + this.pagination.size, values.length);
        this.pagedValues = values.slice(start, end);
        this.checkForOutsideSelections();
    }
    /**
     *
     */
    checkForOutsideSelections() {
        let selected = this.getSelection();
        if (selected && !this.pagedValues.find(v => v.id === selected)) {
            this.outsideSelection = selected;
        }
        else {
            this.outsideSelection = null;
        }
    }
    /**
     *
     */
    clearTypeAhead() {
        this.typeaheadValue = null;
        this.updatePagedValues();
    }
    /**
     *
     */
    toggleCurrentUser() {
        let username = this.getCurrentUserName();
        if (username)
            this.toggle(username);
        else {
            console.log("No user to use to filter");
        }
    }
    getCurrentUserName() {
        if (!this.isAuthenticated())
            return null;
        let user = this.getUser();
        return user ? user.username : null;
    }
    getSelection() {
        // let value = this.service.getCreatedBy();
        // if(Array.isArray(value)) return value.length ? value[0] : null;
        // return value;
        return null;
    }
};
CreatedByFilterComponent.ctorParameters = () => [
    { type: AppAuthService },
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
];
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
export { CreatedByFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMvY3JlYXRvci9jcmVhdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBcUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUNwRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsS0FBSyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUNuRCxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU90RSxDQUFDO0FBUUYsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxzQkFBc0I7SUFjaEUsWUFDSSxXQUE0QixFQUNDLE9BQXFCO1FBRWxELEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUZVLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFkN0MsUUFBRyxHQUF1QixlQUFlLENBQUMsS0FBSyxDQUFDO1FBRS9DLFlBQU8sR0FBNkIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUvRCxtQkFBYyxHQUFjLElBQUksQ0FBQztRQUNqQyxnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsZUFBVSxHQUEyQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQzNFLFdBQU0sR0FBeUIsRUFBRSxDQUFDO1FBQ2xDLGdCQUFXLEdBQW9CLEVBQUUsQ0FBQztRQUVsQyxrQkFBYSxHQUFZLEVBQUUsQ0FBQztJQU9uQyxDQUFDO0lBRUQsUUFBUTtRQUNKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztR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ZGQ7SUFBUixLQUFLLEVBQUU7cURBQWlEO0FBQ2hEO0lBQVIsS0FBSyxFQUFFOzBEQUF5QjtBQUN2QjtJQUFULE1BQU0sRUFBRTt5REFBNkQ7QUFKN0Qsd0JBQXdCO0lBTHBDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsdXVIQUF1Qzs7S0FFeEMsQ0FBQztJQWlCTyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7R0FoQmYsd0JBQXdCLENBMkxwQztTQTNMWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBRdWVyeSwgUXVlcnlQYXJhbWV0ZXJzLCBRdWVyeUZhY2V0cywgSXRlbVNlcnZpY2UsIFNlYXJjaFJlc3VsdHNcbn0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi8uLi9ldmVudCc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGVkQ29tcG9uZW50LCBBcHBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2F1dGgnO1xuXG5cbmludGVyZmFjZSBDcmVhdG9yIHtcbiAgICBpZCAgIDogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgY291bnQ6IG51bWJlcjtcbn07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtY3JlYXRlZGJ5LWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jcmVhdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3JlYXRvci5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIENyZWF0ZWRCeUZpbHRlckNvbXBvbmVudCBleHRlbmRzIEF1dGhlbnRpY2F0ZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBrZXkgICAgICAgICAgICA6IHN0cmluZyA9IFF1ZXJ5UGFyYW1ldGVycy5RVUVSWTtcbiAgICBASW5wdXQoKSBzZWxlY3RlZCAgICAgICA6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgb25FdmVudCAgICAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBwdWJsaWMgdHlwZWFoZWFkVmFsdWUgICA6IHN0cmluZyA9IG51bGw7XG4gICAgcHVibGljIGlzQ29sbGFwc2VkICAgICAgOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgcGFnaW5hdGlvbiAgICAgICA6IHsgcGFnZTogbnVtYmVyOyBzaXplOiBudW1iZXI7IH0gPSB7IHBhZ2U6IDAsIHNpemU6IDEwIH07XG4gICAgcHVibGljIHZhbHVlcyAgICAgICAgICAgOiBDcmVhdG9yW10gPSBbXTtcbiAgICBwdWJsaWMgcGFnZWRWYWx1ZXMgICAgICA6IENyZWF0b3JbXSA9IFtdO1xuICAgIHB1YmxpYyBvdXRzaWRlU2VsZWN0aW9uIDogQ3JlYXRvcjtcbiAgICBwdWJsaWMgdmlzaWJsZUFtb3VudCA6IG51bWJlciA9IDEwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGF1dGhTZXJ2aWNlIDogQXBwQXV0aFNlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoSXRlbVNlcnZpY2UpIHByaXZhdGUgc2VydmljZSA6IEl0ZW1TZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGF1dGhTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZmV0Y2hWYWx1ZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBudWxsO1xuICAgICAgICB0aGlzLnBhZ2VkVmFsdWVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgIHRoaXMub3V0c2lkZVNlbGVjdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgbm90aWZ5KCApIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMua2V5O1xuICAgICAgICBsZXQgY2hhbmdlID0ge307XG4gICAgICAgIGNoYW5nZVtrZXldID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5QQUdFXSA9IDA7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCBjaGFuZ2UpO1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgaGFzU2VsZWN0aW9ucygpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKCBhcmcgOiBzdHJpbmcgKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNTZWxlY3Rpb25zKCkgJiYgdGhpcy5nZXRJbmRleE9mKGFyZykgPj0gMDtcbiAgICB9XG5cbiAgICBnZXRJbmRleE9mKCBhcmcgOiBzdHJpbmcgKSA6IG51bWJlciB7XG4gICAgICAgIGlmKCF0aGlzLnNlbGVjdGVkIHx8ICF0aGlzLnNlbGVjdGVkLmxlbmd0aCkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZC5pbmRleE9mKGFyZyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gaXRlbSBvciBpZGVudGlmaWVyXG4gICAgICovXG4gICAgdG9nZ2xlKCBhcmcgOiBzdHJpbmcgKSB7XG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZCA9PT0gYXJnKSB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgZWxzZSB0aGlzLnNlbGVjdGVkID0gYXJnO1xuICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgaWYodGhpcy5oYXNTZWxlY3Rpb25zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkoKTtcblxuICAgICAgICB9IGVsc2UgaWYoIHRoaXMuaXNDb2xsYXBzZWQgKXtcbiAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZmV0Y2hWYWx1ZXMoKSB7XG4gICAgICAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KCkucGFnZVNpemUoMSlcbiAgICAgICAgICAgLmZhY2V0cyhRdWVyeUZhY2V0cy5DUkVBVEVEX0JZKVxuICAgICAgICAgICAucGFyYW1ldGVyKCdpbmNsdWRlRmFjZXQuX2NyZWF0ZWRCeS5zaXplJywgMTAwMCk7ICAgLy9UT0RPIG5vdCB1c2UgUmVnaXN0cnkgbmFtZVxuXG4gICAgICAgdGhpcy5zZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgICAudGhlbiggKHJlc3BvbnNlIDogU2VhcmNoUmVzdWx0cykgPT4ge1xuICAgICAgICAgICBsZXQgZmFjZXQgPSByZXNwb25zZS5mYWNldHMuZmluZCggZmFjZXQgPT4gZmFjZXQubmFtZT09PSdjcmVhdGVkQnknKTtcbiAgICAgICAgICAgaWYoIWZhY2V0KSB0aGlzLnZhbHVlcyA9IFtdO1xuICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgIHRoaXMudmFsdWVzID0gKGZhY2V0LmJ1Y2tldHN8fFtdKS5tYXAoIChidWNrZXQ6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgLy8gQXdhaXRpbmcgRFQtMTA5MiByZXNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgaWQgICA6IGJ1Y2tldC5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGJ1Y2tldC5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IGJ1Y2tldC5jb3VudFxuICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgfVxuICAgICAgIH0pXG4gICAgICAgLmNhdGNoKGUgPT4geyB0aGlzLnZhbHVlcyA9IFtdOyB9KVxuICAgICAgIC5maW5hbGx5ICggKCkgPT4ge1xuICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VkVmFsdWVzKCk7XG4gICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBuZXh0UGFnZSgpIHtcbiAgICAgICAgbGV0IG51bVBhZ2VzID0gTWF0aC5jZWlsKHRoaXMudmFsdWVzLmxlbmd0aCAvIHRoaXMucGFnaW5hdGlvbi5zaXplKTtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uLnBhZ2UgPSBNYXRoLm1pbiggbnVtUGFnZXMtMSwgdGhpcy5wYWdpbmF0aW9uLnBhZ2UrMSk7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnZWRWYWx1ZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHByZXZQYWdlKCkge1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24ucGFnZSA9IE1hdGgubWF4KDAsIHRoaXMucGFnaW5hdGlvbi5wYWdlLTEpO1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VkVmFsdWVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHJlc2V0U3RhcnQgYm9vbGVhbiBpbmRpY2F0aW5nIHRvIHJlc2V0IHBhZ2luYXRpb24gc3RhcnRcbiAgICAgKi9cbiAgICB1cGRhdGVQYWdlZFZhbHVlcyggcmVzZXRTdGFydCA/OiBib29sZWFuICkge1xuXG4gICAgICAgIGlmKHJlc2V0U3RhcnQpIHRoaXMucGFnaW5hdGlvbi5wYWdlID0gMDtcblxuICAgICAgICBsZXQgdmFsdWVzID0gdGhpcy52YWx1ZXM7XG4gICAgICAgIGlmKHRoaXMudHlwZWFoZWFkVmFsdWUgJiYgdGhpcy50eXBlYWhlYWRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5maWx0ZXIoIHYgPT4gdi5sYWJlbC5pbmRleE9mKHRoaXMudHlwZWFoZWFkVmFsdWUpID49MCApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodmFsdWVzLmxlbmd0aCA8IHRoaXMucGFnaW5hdGlvbi5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRpb24ucGFnZSA9IDA7ICAgLy9yZXNldCBjdXJyZW50IHBhZ2VcbiAgICAgICAgICAgIHRoaXMucGFnZWRWYWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhZ2VkIFZhbHVlczogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhZ2VkVmFsdWVzKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wYWdpbmF0aW9uLnBhZ2UqdGhpcy5wYWdpbmF0aW9uLnNpemU7XG4gICAgICAgIGxldCBlbmQgPSBNYXRoLm1pbihzdGFydCArIHRoaXMucGFnaW5hdGlvbi5zaXplLCB2YWx1ZXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5wYWdlZFZhbHVlcyA9IHZhbHVlcy5zbGljZShzdGFydCwgZW5kKTtcblxuICAgICAgICB0aGlzLmNoZWNrRm9yT3V0c2lkZVNlbGVjdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNoZWNrRm9yT3V0c2lkZVNlbGVjdGlvbnMoKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGlmKCBzZWxlY3RlZCAmJiAhdGhpcy5wYWdlZFZhbHVlcy5maW5kKHYgPT4gdi5pZCA9PT0gc2VsZWN0ZWQpICkge1xuICAgICAgICAgICAgdGhpcy5vdXRzaWRlU2VsZWN0aW9uID0gc2VsZWN0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm91dHNpZGVTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjbGVhclR5cGVBaGVhZCgpIHtcbiAgICAgICAgdGhpcy50eXBlYWhlYWRWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnZWRWYWx1ZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHRvZ2dsZUN1cnJlbnRVc2VyKCkge1xuICAgICAgICBsZXQgdXNlcm5hbWUgPSB0aGlzLmdldEN1cnJlbnRVc2VyTmFtZSgpO1xuICAgICAgICBpZih1c2VybmFtZSkgdGhpcy50b2dnbGUoIHVzZXJuYW1lICk7XG4gICAgICAgIGVsc2UgeyBjb25zb2xlLmxvZyhcIk5vIHVzZXIgdG8gdXNlIHRvIGZpbHRlclwiKTsgfVxuICAgIH1cblxuICAgIGdldEN1cnJlbnRVc2VyTmFtZSgpIHtcbiAgICAgICAgaWYoIXRoaXMuaXNBdXRoZW50aWNhdGVkKCkpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgdXNlciA9IHRoaXMuZ2V0VXNlcigpO1xuICAgICAgICByZXR1cm4gdXNlciA/IHVzZXIudXNlcm5hbWUgOiBudWxsO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGlvbigpIHtcbiAgICAgICAvLyBsZXQgdmFsdWUgPSB0aGlzLnNlcnZpY2UuZ2V0Q3JlYXRlZEJ5KCk7XG4gICAgICAgLy8gaWYoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiB2YWx1ZS5sZW5ndGggPyB2YWx1ZVswXSA6IG51bGw7XG4gICAgICAgLy8gcmV0dXJuIHZhbHVlO1xuICAgICAgIHJldHVybiBudWxsO1xuICAgfVxufVxuIl19