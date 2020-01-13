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
/**
 * Search Results Component
 *
 * This component is used to display search results.
 *
 * Example:
 *   <gp-search-results [service]="service">
 *   </gp-search-results>
 *
 *
 * Listen for selection or other events by passing an "onEvent" callback
 *
 * Example:
 *   <gp-search-results  [service]="service"
 *        (onEvent)="handleItemEvent($event)">
 *   </gp-search-results>
 *
 *
 * Support custom items by providing a SearchResultsItemAdapter
 *
 * Example:
 *   class CustomItemAdapter implements SearchResultsItemAdapter<Item> {
 *      constructor() {}
 *      getId( item: Item ) : string { return item.idField; }
 *      getLabel( item: Item ) : string { return item.heading; }
 *      //remaining methods...
 *   }
 *   ...
 *
 *   public myCustomItemAdapter : SearchResultsItemAdapter<Item> = new CustomItemAdapter();
 *
 *   ...
 *
 *   <gp-search-results [service]="service"
 *        [adapter]="myCustomItemAdapter">
 *   </gp-search-results>
 *
 *
 *
 * Customize how items are displayed using any of the template bindings
 *
 * Example:
 *   <gp-search-results [service]="service"
 *        [itemHeadingTemplate]="myCustomItemHeadingTemplate"
 *        [itemActionsTemplate]="myCustomItemActionsTemplate">
 *   </gp-search-results>
 *   <ng-template #myCustomItemHeadingTemplate let-item="item">
 *     <div>My Customized {{item.label}}</div>
 *   </ng-template>
 *   <ng-template #myCustomItemActionsTemplate let-item="item">
 *     <button type="button" class="btn btn-link" (click)="handleClick(item)">Click Me</button>
 *   </ng-template>
 *
 */
var SearchResultsComponent = /** @class */ (function () {
    function SearchResultsComponent(
    // @Inject(AppAuthService) authService : AppAuthService,
    dialog) {
        this.dialog = dialog;
        this.sortOptions = DEFAULT_SORT_OPTIONS;
        this.showDesc = false;
        this.hasPrimaryAction = true;
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
    ], SearchResultsComponent.prototype, "hasPrimaryAction", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "adapter", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "itemHeadingTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "itemSubHeadingTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "itemThumbnailTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsComponent.prototype, "itemContentTemplate", void 0);
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
        Input()
    ], SearchResultsComponent.prototype, "itemPrimaryActionTemplate", void 0);
    tslib_1.__decorate([
        Output()
    ], SearchResultsComponent.prototype, "onEvent", void 0);
    SearchResultsComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-search-results',
            template: "<div class=\"o-search-results\">\n\n    <div class=\"o-search-results__toolbar\">\n\n        <div class=\"flex-1 u-mg-left--md\">\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-light dropdown-toggle\"\n                    data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                    <span *ngIf=\"!selected || !selected.length\" class=\"far fa-square\"></span>\n                    <span *ngIf=\"selected?.length\" class=\"fas fa-check-square\"></span>\n                    <span class=\"caret\"></span>\n                </button>\n                <div class=\"dropdown-menu dropdown-menu-right\">\n                    <a class=\"dropdown-item\" (click)=\"selectAllInPage()\">\n                        Select all on this page\n                    </a>\n                    <a class=\"dropdown-item\"  (click)=\"deselectAll()\">\n                        Deselect all\n                    </a>\n                </div>\n            </div>\n        </div>\n\n        <mat-paginator\n            [length]=\"results?.totalResults || 0\"\n            [pageSize]=\"query?.pageSize || 10\"\n            [pageSizeOptions]=\"[10, 25, 50, 100]\"\n            (page)=\"onPagingEvent($event)\">\n        </mat-paginator>\n\n        <mat-form-field>\n            <strong matPrefix><span class=\"fas fa-sort-amount-down\"></span> Sort by&nbsp;</strong>\n            <mat-select [(ngModel)]=\"sortValue\" (selectionChange)=\"onSortChange($event)\">\n                <mat-option *ngFor=\"let option of sortOptions\" value=\"{{option.value}}\">{{option.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n\n    </div>\n\n    <!-- Loading indicator -->\n    <mat-progress-bar mode=\"indeterminate\" *ngIf=\"isLoading\"></mat-progress-bar>\n\n    <!-- error displayed to user if present -->\n    <div *ngIf=\"error\" class=\"m-message--error\">\n        <div class=\"a-heading\">\n            <span class=\"fas fa-exclamation-circle\"></span>\n            An Error Occurred\n        </div>\n        <div>{{error.message}}</div>\n        <div class=\"d-flex flex-justify-end\">\n            <button type=\"button\" class=\"btn btn-link\" (click)=\"error=null\">DISMISS</button>\n        </div>\n    </div>\n\n    <!-- Search results display -->\n    <div class=\"m-results\" *ngIf=\"results\">\n\n        <div *ngIf=\"!results.totalResults\" class=\"m-message--warning\">\n            <em>No results found matching the specified criteria.</em>\n        </div>\n\n        <div *ngFor=\"let result of results.results\">\n            <gp-search-results-item\n                [item]=\"result\"\n                [adapter]=\"adapter\"\n                [showDesc]=\"showDesc\"\n                [isSelected]=\"isSelected(result)\"\n                [hasPrimaryAction]=\"hasPrimaryAction\"\n                [headingTemplate]=\"itemHeadingTemplate\"\n                [subHeadingTemplate]=\"itemSubHeadingTemplate\"\n                [thumbnailTemplate]=\"itemThumbnailTemplate\"\n                [contentTemplate]=\"itemContentTemplate\"\n                [footerTemplate]=\"itemFooterTemplate\"\n                [statsTemplate]=\"itemStatsTemplate\"\n                [actionsTemplate]=\"itemActionsTemplate\"\n                [primaryActionTemplate]=\"itemPrimaryActionTemplate\"\n                (onEvent)=\"onItemEvent($event)\">\n            </gp-search-results-item>\n        </div>\n    </div>\n\n</div>\n",
            styles: [":host{display:block;width:100%;height:100%;overflow-y:auto}.o-search-results__toolbar{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;border-bottom:1px solid #ddd;background:#f9f9f9}"]
        })
    ], SearchResultsComponent);
    return SearchResultsComponent;
}());
export { SearchResultsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL3Jlc3VsdHMvcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSyxTQUFTLEVBQ2pCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRy9ELHVFQUF1RTtBQUN2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0RCxPQUFPLEVBQTRCLDZCQUE2QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFPOUYsQ0FBQztBQUVGLElBQU0sb0JBQW9CLEdBQXdCO0lBQzlDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBTSxLQUFLLEVBQUUsV0FBVyxFQUFHO0lBQ2pELEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBSSxLQUFLLEVBQUUsd0JBQXdCLEVBQUc7SUFDOUQsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFLLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtJQUM5RCxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQVEsS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQU8sS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO0NBQ3JELENBQUM7QUFHRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxREc7QUFNSDtJQXVDSTtJQUNJLHdEQUF3RDtJQUNoRCxNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBckNkLGdCQUFXLEdBQThCLG9CQUFvQixD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RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFLLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7O2dCQTdHb0IsU0FBUzs7SUF0Q3JCO1FBQVIsS0FBSyxFQUFFOzJEQUFxRDtJQUNwRDtRQUFSLEtBQUssRUFBRTsrREFBc0U7SUFDckU7UUFBUixLQUFLLEVBQUU7NERBQTRDO0lBQzNDO1FBQVIsS0FBSyxFQUFFO29FQUEyQztJQUMxQztRQUFSLEtBQUssRUFBRTsyREFBMkQ7SUFHMUQ7UUFBUixLQUFLLEVBQUU7dUVBQXFEO0lBQ3BEO1FBQVIsS0FBSyxFQUFFOzBFQUFxRDtJQUVwRDtRQUFSLEtBQUssRUFBRTt5RUFBcUQ7SUFFcEQ7UUFBUixLQUFLLEVBQUU7dUVBQXFEO0lBRXBEO1FBQVIsS0FBSyxFQUFFO3NFQUFxRDtJQUVwRDtRQUFSLEtBQUssRUFBRTtxRUFBcUQ7SUFFcEQ7UUFBUixLQUFLLEVBQUU7dUVBQXFEO0lBRXBEO1FBQVIsS0FBSyxFQUFFOzZFQUFxRDtJQUVuRDtRQUFULE1BQU0sRUFBRTsyREFBMkU7SUF6QjNFLHNCQUFzQjtRQUxsQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLHM2R0FBdUM7O1NBRXhDLENBQUM7T0FDVyxzQkFBc0IsQ0F3SmxDO0lBQUQsNkJBQUM7Q0FBQSxBQXhKRCxJQXdKQztTQXhKWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEluamVjdCwgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSxcbiAgICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0U2VsZWN0Q2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29uZmlnLCBRdWVyeSwgU2VhcmNoUmVzdWx0cywgSXRlbSB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG4vLyBpbXBvcnQgeyBBcHBBdXRoU2VydmljZSwgQXV0aGVudGljYXRlZENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9hdXRoXCI7XG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gXCIuLi8uLi9ldmVudFwiO1xuaW1wb3J0IHsgR2VvUGxhdGZvcm1TZWFyY2hTZXJ2aWNlLCBTZWFyY2hTZXJ2aWNlRXZlbnQsIFNlYXJjaEF3YXJlQ29tcG9uZW50IH0gZnJvbSBcIi4uL3NlYXJjaC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHRzSXRlbUFkYXB0ZXIsIEdlb1BsYXRmb3JtUmVzdWx0c0l0ZW1BZGFwdGVyIH0gZnJvbSBcIi4uL2l0ZW0vaXRlbS1hZGFwdGVyXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9sb2dnZXInO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoU29ydE9wdGlvbiB7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xufTtcblxuY29uc3QgREVGQVVMVF9TT1JUX09QVElPTlMgOiBTZWFyY2hTb3J0T3B0aW9uW10gPSBbXG4gICAgeyB2YWx1ZTogXCJfc2NvcmUsZGVzY1wiLCAgICAgbGFiZWw6IFwiUmVsZXZhbmNlXCIgIH0sXG4gICAgeyB2YWx1ZTogXCJtb2RpZmllZCxkZXNjXCIsICAgbGFiZWw6IFwiTW9zdCBSZWNlbnRseSBNb2RpZmllZFwiICB9LFxuICAgIHsgdmFsdWU6IFwibW9kaWZpZWQsYXNjXCIsICAgIGxhYmVsOiBcIkxlYXN0IFJlY2VudGx5IE1vZGlmaWVkXCIgfSxcbiAgICB7IHZhbHVlOiBcImxhYmVsLGFzY1wiLCAgICAgICBsYWJlbDogXCJUaXRsZSBbQS1aXVwiIH0sXG4gICAgeyB2YWx1ZTogXCJsYWJlbCxkZXNjXCIsICAgICAgbGFiZWw6IFwiVGl0bGUgW1otQV1cIiB9LFxuICAgIHsgdmFsdWU6IFwicmVsaWFiaWxpdHksYXNjXCIsIGxhYmVsOiBcIlJlbGlhYmlsaXR5XCIgfVxuXTtcblxuXG4vKipcbiAqIFNlYXJjaCBSZXN1bHRzIENvbXBvbmVudFxuICpcbiAqIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gZGlzcGxheSBzZWFyY2ggcmVzdWx0cy5cbiAqXG4gKiBFeGFtcGxlOlxuICogICA8Z3Atc2VhcmNoLXJlc3VsdHMgW3NlcnZpY2VdPVwic2VydmljZVwiPlxuICogICA8L2dwLXNlYXJjaC1yZXN1bHRzPlxuICpcbiAqXG4gKiBMaXN0ZW4gZm9yIHNlbGVjdGlvbiBvciBvdGhlciBldmVudHMgYnkgcGFzc2luZyBhbiBcIm9uRXZlbnRcIiBjYWxsYmFja1xuICpcbiAqIEV4YW1wbGU6XG4gKiAgIDxncC1zZWFyY2gtcmVzdWx0cyAgW3NlcnZpY2VdPVwic2VydmljZVwiXG4gKiAgICAgICAgKG9uRXZlbnQpPVwiaGFuZGxlSXRlbUV2ZW50KCRldmVudClcIj5cbiAqICAgPC9ncC1zZWFyY2gtcmVzdWx0cz5cbiAqXG4gKlxuICogU3VwcG9ydCBjdXN0b20gaXRlbXMgYnkgcHJvdmlkaW5nIGEgU2VhcmNoUmVzdWx0c0l0ZW1BZGFwdGVyXG4gKlxuICogRXhhbXBsZTpcbiAqICAgY2xhc3MgQ3VzdG9tSXRlbUFkYXB0ZXIgaW1wbGVtZW50cyBTZWFyY2hSZXN1bHRzSXRlbUFkYXB0ZXI8SXRlbT4ge1xuICogICAgICBjb25zdHJ1Y3RvcigpIHt9XG4gKiAgICAgIGdldElkKCBpdGVtOiBJdGVtICkgOiBzdHJpbmcgeyByZXR1cm4gaXRlbS5pZEZpZWxkOyB9XG4gKiAgICAgIGdldExhYmVsKCBpdGVtOiBJdGVtICkgOiBzdHJpbmcgeyByZXR1cm4gaXRlbS5oZWFkaW5nOyB9XG4gKiAgICAgIC8vcmVtYWluaW5nIG1ldGhvZHMuLi5cbiAqICAgfVxuICogICAuLi5cbiAqXG4gKiAgIHB1YmxpYyBteUN1c3RvbUl0ZW1BZGFwdGVyIDogU2VhcmNoUmVzdWx0c0l0ZW1BZGFwdGVyPEl0ZW0+ID0gbmV3IEN1c3RvbUl0ZW1BZGFwdGVyKCk7XG4gKlxuICogICAuLi5cbiAqXG4gKiAgIDxncC1zZWFyY2gtcmVzdWx0cyBbc2VydmljZV09XCJzZXJ2aWNlXCJcbiAqICAgICAgICBbYWRhcHRlcl09XCJteUN1c3RvbUl0ZW1BZGFwdGVyXCI+XG4gKiAgIDwvZ3Atc2VhcmNoLXJlc3VsdHM+XG4gKlxuICpcbiAqXG4gKiBDdXN0b21pemUgaG93IGl0ZW1zIGFyZSBkaXNwbGF5ZWQgdXNpbmcgYW55IG9mIHRoZSB0ZW1wbGF0ZSBiaW5kaW5nc1xuICpcbiAqIEV4YW1wbGU6XG4gKiAgIDxncC1zZWFyY2gtcmVzdWx0cyBbc2VydmljZV09XCJzZXJ2aWNlXCJcbiAqICAgICAgICBbaXRlbUhlYWRpbmdUZW1wbGF0ZV09XCJteUN1c3RvbUl0ZW1IZWFkaW5nVGVtcGxhdGVcIlxuICogICAgICAgIFtpdGVtQWN0aW9uc1RlbXBsYXRlXT1cIm15Q3VzdG9tSXRlbUFjdGlvbnNUZW1wbGF0ZVwiPlxuICogICA8L2dwLXNlYXJjaC1yZXN1bHRzPlxuICogICA8bmctdGVtcGxhdGUgI215Q3VzdG9tSXRlbUhlYWRpbmdUZW1wbGF0ZSBsZXQtaXRlbT1cIml0ZW1cIj5cbiAqICAgICA8ZGl2Pk15IEN1c3RvbWl6ZWQge3tpdGVtLmxhYmVsfX08L2Rpdj5cbiAqICAgPC9uZy10ZW1wbGF0ZT5cbiAqICAgPG5nLXRlbXBsYXRlICNteUN1c3RvbUl0ZW1BY3Rpb25zVGVtcGxhdGUgbGV0LWl0ZW09XCJpdGVtXCI+XG4gKiAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiAoY2xpY2spPVwiaGFuZGxlQ2xpY2soaXRlbSlcIj5DbGljayBNZTwvYnV0dG9uPlxuICogICA8L25nLXRlbXBsYXRlPlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3Atc2VhcmNoLXJlc3VsdHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVzdWx0cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Jlc3VsdHMuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRzQ29tcG9uZW50XG5pbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBTZWFyY2hBd2FyZUNvbXBvbmVudDxRdWVyeSwgU2VhcmNoUmVzdWx0cywgSXRlbT4ge1xuXG4gICAgQElucHV0KCkgcHVibGljIHNlcnZpY2UgICAgICAgICAgIDogR2VvUGxhdGZvcm1TZWFyY2hTZXJ2aWNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzb3J0T3B0aW9ucyAgICAgICA6IFNlYXJjaFNvcnRPcHRpb25bXSA9IERFRkFVTFRfU09SVF9PUFRJT05TO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93RGVzYyAgICAgICAgICA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaGFzUHJpbWFyeUFjdGlvbiAgOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgYWRhcHRlciAgICAgICAgICAgOiBTZWFyY2hSZXN1bHRzSXRlbUFkYXB0ZXI8SXRlbT47XG5cbiAgICAvL2N1c3RvbSBoZWFkaW5nIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1IZWFkaW5nVGVtcGxhdGUgICAgICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtU3ViSGVhZGluZ1RlbXBsYXRlICAgIDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvL2N1c3RvbSB0aHVtYm5haWwgdGVtcGxhdGVcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbVRodW1ibmFpbFRlbXBsYXRlICAgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9cbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbUNvbnRlbnRUZW1wbGF0ZSAgICAgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gZm9vdGVyIChjb21wbGV0ZSlcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbUZvb3RlclRlbXBsYXRlICAgICAgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gZm9vdGVyIHN0YXRzIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1TdGF0c1RlbXBsYXRlICAgICAgICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIGZvb3RlciBhY3Rpb25zIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1BY3Rpb25zVGVtcGxhdGUgICAgICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIHByaW1hcnkgYWN0aW9uIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1QcmltYXJ5QWN0aW9uVGVtcGxhdGUgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQE91dHB1dCgpIG9uRXZlbnQgICAgIDogRXZlbnRFbWl0dGVyPFNlYXJjaEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoRXZlbnQ+KCk7XG5cbiAgICBwdWJsaWMgcXVlcnkgICAgIDogUXVlcnk7XG4gICAgcHVibGljIHJlc3VsdHMgICA6IFNlYXJjaFJlc3VsdHM7XG4gICAgcHVibGljIHNlbGVjdGVkICA6IEl0ZW1bXTtcbiAgICBwdWJsaWMgc29ydFZhbHVlIDogc3RyaW5nO1xuICAgIHB1YmxpYyBpc0xvYWRpbmcgOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGVycm9yICAgICA6IEVycm9yO1xuXG4gICAgLy9saXN0ZW5lciBmb3Igd2hlbiBTZWFyY2hTZXJ2aWNlIGZpcmVzIGV2ZW50cyBmb3IgY2hhbmdlIGluXG4gICAgLy8gcXVlcnksIHJlc3VsdHMsIG9yIHNlbGVjdGVkIGl0ZW1zXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb24gOiBTdWJzY3JpcHRpb247XG5cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvLyBASW5qZWN0KEFwcEF1dGhTZXJ2aWNlKSBhdXRoU2VydmljZSA6IEFwcEF1dGhTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRpYWxvZyA6IE1hdERpYWxvZ1xuICAgICkge1xuICAgICAgICAvLyBzdXBlcihhdXRoU2VydmljZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIHN1cGVyLmluaXQoKTtcblxuICAgICAgICBpZighdGhpcy5hZGFwdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIgPSBuZXcgR2VvUGxhdGZvcm1SZXN1bHRzSXRlbUFkYXB0ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc29ydFZhbHVlID0gdGhpcy5zb3J0T3B0aW9uc1swXS52YWx1ZTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnNlcnZpY2Uuc3Vic2NyaWJlKHRoaXMpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICAvLyBzdXBlci5kZXN0cm95KCk7XG5cbiAgICAgICAgaWYodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5xdWVyeSA9IG51bGw7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIH1cblxuICAgIG9uUXVlcnlDaGFuZ2UoIHF1ZXJ5IDogUXVlcnkgKSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBvblJlc3VsdHNDaGFuZ2UoIHJlc3VsdHMgOiBTZWFyY2hSZXN1bHRzLCBlcnJvciA/OiBFcnJvciApIHtcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0cztcbiAgICAgICAgdGhpcy5lcnJvciA9IChlcnJvcikgPyBlcnJvciA6IG51bGw7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIG9uU2VsZWN0ZWRDaGFuZ2UoIHNlbGVjdGVkIDogSXRlbVtdICkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1NlbGVjdGVkIChpdGVtIDogSXRlbSkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5pc1NlbGVjdGVkKGl0ZW0pO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbEluUGFnZSgpIHtcbiAgICAgICAgaWYodGhpcy5vbkV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5TRUxFQ1QsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5yZXN1bHRzLnJlc3VsdHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGwoKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5jbGVhclNlbGVjdGVkKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uSXRlbUV2ZW50KCAkZXZlbnQgOiBTZWFyY2hFdmVudCApIHtcbiAgICAgICAgbGV0IG5hbWUgPSAkZXZlbnQuZ2V0VHlwZSgpOyAvLyRldmVudC5uYW1lO1xuICAgICAgICBpZiggIW5hbWUgKSByZXR1cm47XG4gICAgICAgIHN3aXRjaCggbmFtZSApIHtcblxuICAgICAgICAgICAgY2FzZSBFdmVudFR5cGVzLlNFTEVDVCA6XG4gICAgICAgICAgICBpZih0aGlzLm9uRXZlbnQpIHRoaXMub25FdmVudC5lbWl0KCRldmVudCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBFdmVudFR5cGVzLlFVRVJZIDpcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IHRoaXMuc2VydmljZS5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgcXVlcnkuYXBwbHlQYXJhbWV0ZXJzKCRldmVudC5nZXRPcHRpb25zKCkpO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnNlYXJjaChxdWVyeSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhZ2VObyAtIG5ldyBwYWdlIG51bWJlciBiZWluZyByZXF1ZXN0ZWRcbiAgICAgKi9cbiAgICBvblBhZ2luZ0V2ZW50KCBldmVudCA6IFBhZ2VFdmVudCApIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5zZXJ2aWNlLmdldFF1ZXJ5KCk7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IHF1ZXJ5LmdldFBhZ2UoKTtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBldmVudC5wYWdlSW5kZXg7XG4gICAgICAgIGlmKHByZXZpb3VzICE9PSBjdXJyZW50KSB7XG4gICAgICAgICAgICBxdWVyeS5wYWdlKGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXJ5LnNldFBhZ2VTaXplKCBldmVudC5wYWdlU2l6ZSApO1xuXG4gICAgICAgIGlmKHRoaXMub25FdmVudCkge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIHsgdmFsdWUgOiBxdWVyeSB9KTtcbiAgICAgICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU29ydENoYW5nZSgkZXZlbnQgOiBNYXRTZWxlY3RDaGFuZ2UpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5zZXJ2aWNlLmdldFF1ZXJ5KCk7XG4gICAgICAgIHF1ZXJ5LnNvcnQodGhpcy5zb3J0VmFsdWUpO1xuXG4gICAgICAgIGlmKHRoaXMub25FdmVudCkge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIHsgdmFsdWUgOiBxdWVyeSB9KTtcbiAgICAgICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19