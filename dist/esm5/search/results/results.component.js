import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSelectChange } from '@angular/material';
// import { AppAuthService, AuthenticatedComponent } from "../../auth";
import { SearchEvent, EventTypes } from "../../event";
import { GeoPlatformResultsItemAdapter } from "../item/item-adapter";
;
var DEFAULT_SORT_OPTIONS = [
    { value: "_score,desc", label: "Relevance" },
    { value: "modified,desc", label: "Most Recently Modified" },
    { value: "modified,asc", label: "Least Recently Modified" },
    { value: "label,asc", label: "Title [A-Z]" },
    { value: "label,desc", label: "Title [Z-A]" },
    { value: "reliability,asc", label: "Reliability" }
];
var SearchResultsComponent = /** @class */ (function () {
    function SearchResultsComponent(
    // @Inject(AppAuthService) authService : AppAuthService,
    dialog) {
        this.dialog = dialog;
        this.sortOptions = DEFAULT_SORT_OPTIONS;
        this.showDesc = false;
        this.onEvent = new EventEmitter();
        this.isLoading = false;
        // super(authService);
    }
    SearchResultsComponent.prototype.ngOnInit = function () {
        // super.init();
        if (!this.adapter) {
            this.adapter = new GeoPlatformResultsItemAdapter();
        }
        this.sortValue = this.sortOptions[0].value;
        this.subscription = this.service.subscribe(this);
    };
    SearchResultsComponent.prototype.ngOnDestroy = function () {
        // super.destroy();
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.query = null;
        this.results = null;
        this.selected = null;
    };
    SearchResultsComponent.prototype.onQueryChange = function (query) {
        this.query = query;
        this.isLoading = true;
    };
    SearchResultsComponent.prototype.onResultsChange = function (results, error) {
        this.results = results;
        this.error = (error) ? error : null;
        this.isLoading = false;
    };
    SearchResultsComponent.prototype.onSelectedChange = function (selected) {
        this.selected = selected;
    };
    /**
     *
     */
    SearchResultsComponent.prototype.isSelected = function (item) {
        return this.service.isSelected(item);
    };
    SearchResultsComponent.prototype.selectAllInPage = function () {
        if (this.onEvent) {
            var event_1 = new SearchEvent(EventTypes.SELECT, {
                value: this.results.results
            });
            this.onEvent.emit(event_1);
        }
    };
    SearchResultsComponent.prototype.deselectAll = function () {
        this.service.clearSelected();
    };
    /**
     *
     */
    SearchResultsComponent.prototype.onItemEvent = function ($event) {
        var name = $event.getType(); //$event.name;
        if (!name)
            return;
        switch (name) {
            case EventTypes.SELECT:
                if (this.onEvent)
                    this.onEvent.emit($event);
                break;
            case EventTypes.QUERY:
                var query = this.service.getQuery();
                query.applyParameters($event.getOptions());
                this.service.search(query);
                break;
        }
    };
    /**
     * @param pageNo - new page number being requested
     */
    SearchResultsComponent.prototype.onPagingEvent = function (event) {
        var query = this.service.getQuery();
        var previous = query.getPage();
        var current = event.pageIndex;
        if (previous !== current) {
            query.page(current);
        }
        query.setPageSize(event.pageSize);
        if (this.onEvent) {
            var event_2 = new SearchEvent(EventTypes.QUERY, { value: query });
            this.onEvent.emit(event_2);
        }
    };
    SearchResultsComponent.prototype.onSortChange = function ($event) {
        var query = this.service.getQuery();
        query.sort(this.sortValue);
        if (this.onEvent) {
            var event_3 = new SearchEvent(EventTypes.QUERY, { value: query });
            this.onEvent.emit(event_3);
        }
    };
    SearchResultsComponent.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "service", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "sortOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "showDesc", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "adapter", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "itemHeadingTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "itemThumbnailTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "itemFooterTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "itemStatsTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "itemActionsTemplate", void 0);
    tslib_1.__decorate([
        Output()
    ], SearchResultsComponent.prototype, "onEvent", void 0);
    SearchResultsComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-search-results',
            template: "<div class=\"o-search-results\">\n\n    <div class=\"o-search-results__toolbar\">\n\n        <div class=\"flex-1 u-mg-left--md\">\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-light dropdown-toggle\"\n                    data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                    <span *ngIf=\"!selected || !selected.length\" class=\"far fa-square\"></span>\n                    <span *ngIf=\"selected?.length\" class=\"fas fa-check-square\"></span>\n                    <span class=\"caret\"></span>\n                </button>\n                <div class=\"dropdown-menu dropdown-menu-right\">\n                    <a class=\"dropdown-item\" (click)=\"selectAllInPage()\">\n                        Select all on this page\n                    </a>\n                    <a class=\"dropdown-item\"  (click)=\"deselectAll()\">\n                        Deselect all\n                    </a>\n                </div>\n            </div>\n        </div>\n\n        <mat-paginator\n            [length]=\"results?.totalResults || 0\"\n            [pageSize]=\"query?.pageSize || 10\"\n            [pageSizeOptions]=\"[10, 25, 50, 100]\"\n            (page)=\"onPagingEvent($event)\">\n        </mat-paginator>\n\n        <mat-form-field>\n            <strong matPrefix><span class=\"fas fa-sort-amount-down\"></span> Sort by&nbsp;</strong>\n            <mat-select [(ngModel)]=\"sortValue\" (selectionChange)=\"onSortChange($event)\">\n                <mat-option *ngFor=\"let option of sortOptions\" value=\"{{option.value}}\">{{option.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n\n    </div>\n\n    <!-- Loading indicator -->\n    <mat-progress-bar mode=\"indeterminate\" *ngIf=\"isLoading\"></mat-progress-bar>\n\n    <div class=\"m-results\" *ngIf=\"results\">\n        <div *ngFor=\"let result of results.results\">\n            <gp-search-results-item\n                [item]=\"result\"\n                [adapter]=\"adapter\"\n                [showDesc]=\"showDesc\"\n                [isSelected]=\"isSelected(result)\"\n                [itemHeadingTemplate]=\"itemHeadingTemplate\"\n                [itemThumbnailTemplate]=\"itemThumbnailTemplate\"\n                [itemFooterTemplate]=\"itemFooterTemplate\"\n                [itemStatsTemplate]=\"itemStatsTemplate\"\n                [itemActionsTemplate]=\"itemActionsTemplate\"\n                (onEvent)=\"onItemEvent($event)\">\n            </gp-search-results-item>\n        </div>\n    </div>\n\n</div>\n",
            styles: [":host{display:block;width:100%;height:100%;overflow-y:auto}.o-search-results__toolbar{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;border-bottom:1px solid #ddd;background:#f9f9f9}"]
        })
    ], SearchResultsComponent);
    return SearchResultsComponent;
}());
export { SearchResultsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL3Jlc3VsdHMvcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSyxTQUFTLEVBQ2pCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRy9ELHVFQUF1RTtBQUN2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0RCxPQUFPLEVBQTRCLDZCQUE2QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFPOUYsQ0FBQztBQUVGLElBQU0sb0JBQW9CLEdBQXdCO0lBQzlDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBTSxLQUFLLEVBQUUsV0FBVyxFQUFHO0lBQ2pELEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBSSxLQUFLLEVBQUUsd0JBQXdCLEVBQUc7SUFDOUQsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFLLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtJQUM5RCxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQVEsS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQU8sS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO0NBQ3JELENBQUM7QUFTRjtJQWlDSTtJQUNJLHdEQUF3RDtJQUNoRCxNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBaENwQixnQkFBVyxHQUF3QixvQkFBb0IsQ0FBQztRQUNsRCxhQUFRLEdBQWUsS0FBSyxDQUFDO1FBZW5DLFlBQU8sR0FBbUMsSUFBSSxZQUFZLEVBQWUs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QUssRUFBRTsyREFBOEI7SUFDNUI7UUFBVCxLQUFLLEVBQUU7K0RBQTBEO0lBQ3pEO1FBQVIsS0FBSyxFQUFFOzREQUFxQztJQUVwQztRQUFSLEtBQUssRUFBRTsyREFBaUQ7SUFHaEQ7UUFBUixLQUFLLEVBQUU7dUVBQWlEO0lBRWhEO1FBQVIsS0FBSyxFQUFFO3lFQUFpRDtJQUVoRDtRQUFSLEtBQUssRUFBRTtzRUFBaUQ7SUFFaEQ7UUFBUixLQUFLLEVBQUU7cUVBQWlEO0lBRWhEO1FBQVIsS0FBSyxFQUFFO3VFQUFpRDtJQUUvQztRQUFULE1BQU0sRUFBRTsyREFBMkU7SUFuQjNFLHNCQUFzQjtRQUxsQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLGdpRkFBdUM7O1NBRXhDLENBQUM7T0FDVyxzQkFBc0IsQ0FrSmxDO0lBQUQsNkJBQUM7Q0FBQSxBQWxKRCxJQWtKQztTQWxKWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEluamVjdCwgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSxcbiAgICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0U2VsZWN0Q2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29uZmlnLCBRdWVyeSwgU2VhcmNoUmVzdWx0cywgSXRlbSB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG4vLyBpbXBvcnQgeyBBcHBBdXRoU2VydmljZSwgQXV0aGVudGljYXRlZENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9hdXRoXCI7XG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gXCIuLi8uLi9ldmVudFwiO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSwgU2VhcmNoU2VydmljZUV2ZW50LCBTZWFyY2hBd2FyZUNvbXBvbmVudCB9IGZyb20gXCIuLi9zZWFyY2guc2VydmljZVwiO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0c0l0ZW1BZGFwdGVyLCBHZW9QbGF0Zm9ybVJlc3VsdHNJdGVtQWRhcHRlciB9IGZyb20gXCIuLi9pdGVtL2l0ZW0tYWRhcHRlclwiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vbG9nZ2VyJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaFNvcnRPcHRpb24ge1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbn07XG5cbmNvbnN0IERFRkFVTFRfU09SVF9PUFRJT05TIDogU2VhcmNoU29ydE9wdGlvbltdID0gW1xuICAgIHsgdmFsdWU6IFwiX3Njb3JlLGRlc2NcIiwgICAgIGxhYmVsOiBcIlJlbGV2YW5jZVwiICB9LFxuICAgIHsgdmFsdWU6IFwibW9kaWZpZWQsZGVzY1wiLCAgIGxhYmVsOiBcIk1vc3QgUmVjZW50bHkgTW9kaWZpZWRcIiAgfSxcbiAgICB7IHZhbHVlOiBcIm1vZGlmaWVkLGFzY1wiLCAgICBsYWJlbDogXCJMZWFzdCBSZWNlbnRseSBNb2RpZmllZFwiIH0sXG4gICAgeyB2YWx1ZTogXCJsYWJlbCxhc2NcIiwgICAgICAgbGFiZWw6IFwiVGl0bGUgW0EtWl1cIiB9LFxuICAgIHsgdmFsdWU6IFwibGFiZWwsZGVzY1wiLCAgICAgIGxhYmVsOiBcIlRpdGxlIFtaLUFdXCIgfSxcbiAgICB7IHZhbHVlOiBcInJlbGlhYmlsaXR5LGFzY1wiLCBsYWJlbDogXCJSZWxpYWJpbGl0eVwiIH1cbl07XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1zZWFyY2gtcmVzdWx0cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZXN1bHRzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVzdWx0cy5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgU2VhcmNoQXdhcmVDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgIHNlcnZpY2UgICAgIDogU2VhcmNoU2VydmljZTtcbiAgICBASW5wdXQoKSAgc29ydE9wdGlvbnMgOiBTZWFyY2hTb3J0T3B0aW9uW10gPSBERUZBVUxUX1NPUlRfT1BUSU9OUztcbiAgICBASW5wdXQoKSBwdWJsaWMgc2hvd0Rlc2MgICA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBhZGFwdGVyIDogU2VhcmNoUmVzdWx0c0l0ZW1BZGFwdGVyPEl0ZW0+O1xuXG4gICAgLy9jdXN0b20gaGVhZGluZyB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtSGVhZGluZ1RlbXBsYXRlICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIHRodW1ibmFpbCB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtVGh1bWJuYWlsVGVtcGxhdGUgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIGZvb3RlciAoY29tcGxldGUpXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1Gb290ZXJUZW1wbGF0ZSAgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gZm9vdGVyIHN0YXRzIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1TdGF0c1RlbXBsYXRlICAgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gZm9vdGVyIGFjdGlvbnMgdGVtcGxhdGVcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbUFjdGlvbnNUZW1wbGF0ZSAgIDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgICA6IEV2ZW50RW1pdHRlcjxTZWFyY2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaEV2ZW50PigpO1xuXG4gICAgcHVibGljIHF1ZXJ5IDogUXVlcnk7XG4gICAgcHVibGljIHJlc3VsdHMgOiBTZWFyY2hSZXN1bHRzO1xuICAgIHB1YmxpYyBzZWxlY3RlZCA6IEl0ZW1bXTtcbiAgICBwdWJsaWMgc29ydFZhbHVlIDogc3RyaW5nO1xuICAgIHB1YmxpYyBpc0xvYWRpbmcgOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGVycm9yIDogRXJyb3I7XG5cbiAgICAvL2xpc3RlbmVyIGZvciB3aGVuIFNlYXJjaFNlcnZpY2UgZmlyZXMgZXZlbnRzIGZvciBjaGFuZ2UgaW5cbiAgICAvLyBxdWVyeSwgcmVzdWx0cywgb3Igc2VsZWN0ZWQgaXRlbXNcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbiA6IFN1YnNjcmlwdGlvbjtcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8vIEBJbmplY3QoQXBwQXV0aFNlcnZpY2UpIGF1dGhTZXJ2aWNlIDogQXBwQXV0aFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGlhbG9nIDogTWF0RGlhbG9nXG4gICAgKSB7XG4gICAgICAgIC8vIHN1cGVyKGF1dGhTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gc3VwZXIuaW5pdCgpO1xuXG4gICAgICAgIGlmKCF0aGlzLmFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlciA9IG5ldyBHZW9QbGF0Zm9ybVJlc3VsdHNJdGVtQWRhcHRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zb3J0VmFsdWUgPSB0aGlzLnNvcnRPcHRpb25zWzBdLnZhbHVlO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuc2VydmljZS5zdWJzY3JpYmUodGhpcyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIHN1cGVyLmRlc3Ryb3koKTtcblxuICAgICAgICBpZih0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgfVxuXG4gICAgb25RdWVyeUNoYW5nZSggcXVlcnkgOiBRdWVyeSApIHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgfVxuICAgIG9uUmVzdWx0c0NoYW5nZSggcmVzdWx0cyA6IFNlYXJjaFJlc3VsdHMsIGVycm9yID86IEVycm9yICkge1xuICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgICAgICB0aGlzLmVycm9yID0gKGVycm9yKSA/IGVycm9yIDogbnVsbDtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgb25TZWxlY3RlZENoYW5nZSggc2VsZWN0ZWQgOiBJdGVtW10gKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGlzU2VsZWN0ZWQgKGl0ZW0gOiBJdGVtKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlzU2VsZWN0ZWQoaXRlbSk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWxsSW5QYWdlKCkge1xuICAgICAgICBpZih0aGlzLm9uRXZlbnQpIHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlNFTEVDVCwge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnJlc3VsdHMucmVzdWx0c1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdEFsbCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmNsZWFyU2VsZWN0ZWQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25JdGVtRXZlbnQoICRldmVudCA6IFNlYXJjaEV2ZW50ICkge1xuICAgICAgICBsZXQgbmFtZSA9ICRldmVudC5nZXRUeXBlKCk7IC8vJGV2ZW50Lm5hbWU7XG4gICAgICAgIGlmKCAhbmFtZSApIHJldHVybjtcbiAgICAgICAgc3dpdGNoKCBuYW1lICkge1xuXG4gICAgICAgICAgICBjYXNlIEV2ZW50VHlwZXMuU0VMRUNUIDpcbiAgICAgICAgICAgIGlmKHRoaXMub25FdmVudCkgdGhpcy5vbkV2ZW50LmVtaXQoJGV2ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEV2ZW50VHlwZXMuUVVFUlkgOlxuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5zZXJ2aWNlLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBxdWVyeS5hcHBseVBhcmFtZXRlcnMoJGV2ZW50LmdldE9wdGlvbnMoKSk7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFnZU5vIC0gbmV3IHBhZ2UgbnVtYmVyIGJlaW5nIHJlcXVlc3RlZFxuICAgICAqL1xuICAgIG9uUGFnaW5nRXZlbnQoIGV2ZW50IDogUGFnZUV2ZW50ICkge1xuICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLnNlcnZpY2UuZ2V0UXVlcnkoKTtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gcXVlcnkuZ2V0UGFnZSgpO1xuICAgICAgICBsZXQgY3VycmVudCA9IGV2ZW50LnBhZ2VJbmRleDtcbiAgICAgICAgaWYocHJldmlvdXMgIT09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgIHF1ZXJ5LnBhZ2UoY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcXVlcnkuc2V0UGFnZVNpemUoIGV2ZW50LnBhZ2VTaXplICk7XG5cbiAgICAgICAgaWYodGhpcy5vbkV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgeyB2YWx1ZSA6IHF1ZXJ5IH0pO1xuICAgICAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Tb3J0Q2hhbmdlKCRldmVudCA6IE1hdFNlbGVjdENoYW5nZSkge1xuICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLnNlcnZpY2UuZ2V0UXVlcnkoKTtcbiAgICAgICAgcXVlcnkuc29ydCh0aGlzLnNvcnRWYWx1ZSk7XG5cbiAgICAgICAgaWYodGhpcy5vbkV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgeyB2YWx1ZSA6IHF1ZXJ5IH0pO1xuICAgICAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=