import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSelectChange } from '@angular/material';
// import { AppAuthService, AuthenticatedComponent } from "../../auth";
import { SearchEvent, EventTypes } from "../../event";
import { GeoPlatformResultsItemAdapter } from "../item/item-adapter";
;
const DEFAULT_SORT_OPTIONS = [
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
let SearchResultsComponent = class SearchResultsComponent {
    constructor(
    // @Inject(AppAuthService) authService : AppAuthService,
    dialog) {
        this.dialog = dialog;
        this.sortOptions = DEFAULT_SORT_OPTIONS;
        this.showDesc = false;
        this.onEvent = new EventEmitter();
        this.isLoading = false;
        // super(authService);
    }
    ngOnInit() {
        // super.init();
        if (!this.adapter) {
            this.adapter = new GeoPlatformResultsItemAdapter();
        }
        this.sortValue = this.sortOptions[0].value;
        this.subscription = this.service.subscribe(this);
    }
    ngOnDestroy() {
        // super.destroy();
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.query = null;
        this.results = null;
        this.selected = null;
    }
    onQueryChange(query) {
        this.query = query;
        this.isLoading = true;
    }
    onResultsChange(results, error) {
        this.results = results;
        this.error = (error) ? error : null;
        this.isLoading = false;
    }
    onSelectedChange(selected) {
        this.selected = selected;
    }
    /**
     *
     */
    isSelected(item) {
        return this.service.isSelected(item);
    }
    selectAllInPage() {
        if (this.onEvent) {
            let event = new SearchEvent(EventTypes.SELECT, {
                value: this.results.results
            });
            this.onEvent.emit(event);
        }
    }
    deselectAll() {
        this.service.clearSelected();
    }
    /**
     *
     */
    onItemEvent($event) {
        let name = $event.getType(); //$event.name;
        if (!name)
            return;
        switch (name) {
            case EventTypes.SELECT:
                if (this.onEvent)
                    this.onEvent.emit($event);
                break;
            case EventTypes.QUERY:
                let query = this.service.getQuery();
                query.applyParameters($event.getOptions());
                this.service.search(query);
                break;
        }
    }
    /**
     * @param pageNo - new page number being requested
     */
    onPagingEvent(event) {
        let query = this.service.getQuery();
        let previous = query.getPage();
        let current = event.pageIndex;
        if (previous !== current) {
            query.page(current);
        }
        query.setPageSize(event.pageSize);
        if (this.onEvent) {
            let event = new SearchEvent(EventTypes.QUERY, { value: query });
            this.onEvent.emit(event);
        }
    }
    onSortChange($event) {
        let query = this.service.getQuery();
        query.sort(this.sortValue);
        if (this.onEvent) {
            let event = new SearchEvent(EventTypes.QUERY, { value: query });
            this.onEvent.emit(event);
        }
    }
};
SearchResultsComponent.ctorParameters = () => [
    { type: MatDialog }
];
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
export { SearchResultsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL3Jlc3VsdHMvcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSyxTQUFTLEVBQ2pCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRy9ELHVFQUF1RTtBQUN2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0RCxPQUFPLEVBQTRCLDZCQUE2QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFPOUYsQ0FBQztBQUVGLE1BQU0sb0JBQW9CLEdBQXdCO0lBQzlDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBTSxLQUFLLEVBQUUsV0FBVyxFQUFHO0lBQ2pELEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBSSxLQUFLLEVBQUUsd0JBQXdCLEVBQUc7SUFDOUQsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFLLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtJQUM5RCxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQVEsS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQU8sS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO0NBQ3JELENBQUM7QUFHRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxREc7QUFNSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQWlDL0I7SUFDSSx3REFBd0Q7SUFDaEQsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0s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SixDQUFBOztZQS9Hd0IsU0FBUzs7QUFqQ3BCO0lBQVQsS0FBSyxFQUFFO3VEQUE4QjtBQUM1QjtJQUFULEtBQUssRUFBRTsyREFBMEQ7QUFDekQ7SUFBUixLQUFLLEVBQUU7d0RBQXFDO0FBRXBDO0lBQVIsS0FBSyxFQUFFO3VEQUFpRDtBQUdoRDtJQUFSLEtBQUssRUFBRTttRUFBaUQ7QUFFaEQ7SUFBUixLQUFLLEVBQUU7cUVBQWlEO0FBRWhEO0lBQVIsS0FBSyxFQUFFO2tFQUFpRDtBQUVoRDtJQUFSLEtBQUssRUFBRTtpRUFBaUQ7QUFFaEQ7SUFBUixLQUFLLEVBQUU7bUVBQWlEO0FBRS9DO0lBQVQsTUFBTSxFQUFFO3VEQUEyRTtBQW5CM0Usc0JBQXNCO0lBTGxDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsZ2lGQUF1Qzs7S0FFeEMsQ0FBQztHQUNXLHNCQUFzQixDQWtKbEM7U0FsSlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBJbmplY3QsIENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksXG4gICAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2VFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdFNlbGVjdENoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE9ic2VydmVyLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpZywgUXVlcnksIFNlYXJjaFJlc3VsdHMsIEl0ZW0gfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuLy8gaW1wb3J0IHsgQXBwQXV0aFNlcnZpY2UsIEF1dGhlbnRpY2F0ZWRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYXV0aFwiO1xuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tIFwiLi4vLi4vZXZlbnRcIjtcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UsIFNlYXJjaFNlcnZpY2VFdmVudCwgU2VhcmNoQXdhcmVDb21wb25lbnQgfSBmcm9tIFwiLi4vc2VhcmNoLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNlYXJjaFJlc3VsdHNJdGVtQWRhcHRlciwgR2VvUGxhdGZvcm1SZXN1bHRzSXRlbUFkYXB0ZXIgfSBmcm9tIFwiLi4vaXRlbS9pdGVtLWFkYXB0ZXJcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL2xvZ2dlcic7XG5cblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hTb3J0T3B0aW9uIHtcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG59O1xuXG5jb25zdCBERUZBVUxUX1NPUlRfT1BUSU9OUyA6IFNlYXJjaFNvcnRPcHRpb25bXSA9IFtcbiAgICB7IHZhbHVlOiBcIl9zY29yZSxkZXNjXCIsICAgICBsYWJlbDogXCJSZWxldmFuY2VcIiAgfSxcbiAgICB7IHZhbHVlOiBcIm1vZGlmaWVkLGRlc2NcIiwgICBsYWJlbDogXCJNb3N0IFJlY2VudGx5IE1vZGlmaWVkXCIgIH0sXG4gICAgeyB2YWx1ZTogXCJtb2RpZmllZCxhc2NcIiwgICAgbGFiZWw6IFwiTGVhc3QgUmVjZW50bHkgTW9kaWZpZWRcIiB9LFxuICAgIHsgdmFsdWU6IFwibGFiZWwsYXNjXCIsICAgICAgIGxhYmVsOiBcIlRpdGxlIFtBLVpdXCIgfSxcbiAgICB7IHZhbHVlOiBcImxhYmVsLGRlc2NcIiwgICAgICBsYWJlbDogXCJUaXRsZSBbWi1BXVwiIH0sXG4gICAgeyB2YWx1ZTogXCJyZWxpYWJpbGl0eSxhc2NcIiwgbGFiZWw6IFwiUmVsaWFiaWxpdHlcIiB9XG5dO1xuXG5cbi8qKlxuICogU2VhcmNoIFJlc3VsdHMgQ29tcG9uZW50XG4gKlxuICogVGhpcyBjb21wb25lbnQgaXMgdXNlZCB0byBkaXNwbGF5IHNlYXJjaCByZXN1bHRzLlxuICpcbiAqIEV4YW1wbGU6XG4gKiAgIDxncC1zZWFyY2gtcmVzdWx0cyBbc2VydmljZV09XCJzZXJ2aWNlXCI+XG4gKiAgIDwvZ3Atc2VhcmNoLXJlc3VsdHM+XG4gKlxuICpcbiAqIExpc3RlbiBmb3Igc2VsZWN0aW9uIG9yIG90aGVyIGV2ZW50cyBieSBwYXNzaW5nIGFuIFwib25FdmVudFwiIGNhbGxiYWNrXG4gKlxuICogRXhhbXBsZTpcbiAqICAgPGdwLXNlYXJjaC1yZXN1bHRzICBbc2VydmljZV09XCJzZXJ2aWNlXCJcbiAqICAgICAgICAob25FdmVudCk9XCJoYW5kbGVJdGVtRXZlbnQoJGV2ZW50KVwiPlxuICogICA8L2dwLXNlYXJjaC1yZXN1bHRzPlxuICpcbiAqXG4gKiBTdXBwb3J0IGN1c3RvbSBpdGVtcyBieSBwcm92aWRpbmcgYSBTZWFyY2hSZXN1bHRzSXRlbUFkYXB0ZXJcbiAqXG4gKiBFeGFtcGxlOlxuICogICBjbGFzcyBDdXN0b21JdGVtQWRhcHRlciBpbXBsZW1lbnRzIFNlYXJjaFJlc3VsdHNJdGVtQWRhcHRlcjxJdGVtPiB7XG4gKiAgICAgIGNvbnN0cnVjdG9yKCkge31cbiAqICAgICAgZ2V0SWQoIGl0ZW06IEl0ZW0gKSA6IHN0cmluZyB7IHJldHVybiBpdGVtLmlkRmllbGQ7IH1cbiAqICAgICAgZ2V0TGFiZWwoIGl0ZW06IEl0ZW0gKSA6IHN0cmluZyB7IHJldHVybiBpdGVtLmhlYWRpbmc7IH1cbiAqICAgICAgLy9yZW1haW5pbmcgbWV0aG9kcy4uLlxuICogICB9XG4gKiAgIC4uLlxuICpcbiAqICAgcHVibGljIG15Q3VzdG9tSXRlbUFkYXB0ZXIgOiBTZWFyY2hSZXN1bHRzSXRlbUFkYXB0ZXI8SXRlbT4gPSBuZXcgQ3VzdG9tSXRlbUFkYXB0ZXIoKTtcbiAqXG4gKiAgIC4uLlxuICpcbiAqICAgPGdwLXNlYXJjaC1yZXN1bHRzIFtzZXJ2aWNlXT1cInNlcnZpY2VcIlxuICogICAgICAgIFthZGFwdGVyXT1cIm15Q3VzdG9tSXRlbUFkYXB0ZXJcIj5cbiAqICAgPC9ncC1zZWFyY2gtcmVzdWx0cz5cbiAqXG4gKlxuICpcbiAqIEN1c3RvbWl6ZSBob3cgaXRlbXMgYXJlIGRpc3BsYXllZCB1c2luZyBhbnkgb2YgdGhlIHRlbXBsYXRlIGJpbmRpbmdzXG4gKlxuICogRXhhbXBsZTpcbiAqICAgPGdwLXNlYXJjaC1yZXN1bHRzIFtzZXJ2aWNlXT1cInNlcnZpY2VcIlxuICogICAgICAgIFtpdGVtSGVhZGluZ1RlbXBsYXRlXT1cIm15Q3VzdG9tSXRlbUhlYWRpbmdUZW1wbGF0ZVwiXG4gKiAgICAgICAgW2l0ZW1BY3Rpb25zVGVtcGxhdGVdPVwibXlDdXN0b21JdGVtQWN0aW9uc1RlbXBsYXRlXCI+XG4gKiAgIDwvZ3Atc2VhcmNoLXJlc3VsdHM+XG4gKiAgIDxuZy10ZW1wbGF0ZSAjbXlDdXN0b21JdGVtSGVhZGluZ1RlbXBsYXRlIGxldC1pdGVtPVwiaXRlbVwiPlxuICogICAgIDxkaXY+TXkgQ3VzdG9taXplZCB7e2l0ZW0ubGFiZWx9fTwvZGl2PlxuICogICA8L25nLXRlbXBsYXRlPlxuICogICA8bmctdGVtcGxhdGUgI215Q3VzdG9tSXRlbUFjdGlvbnNUZW1wbGF0ZSBsZXQtaXRlbT1cIml0ZW1cIj5cbiAqICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlua1wiIChjbGljayk9XCJoYW5kbGVDbGljayhpdGVtKVwiPkNsaWNrIE1lPC9idXR0b24+XG4gKiAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1zZWFyY2gtcmVzdWx0cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZXN1bHRzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVzdWx0cy5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgU2VhcmNoQXdhcmVDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgIHNlcnZpY2UgICAgIDogU2VhcmNoU2VydmljZTtcbiAgICBASW5wdXQoKSAgc29ydE9wdGlvbnMgOiBTZWFyY2hTb3J0T3B0aW9uW10gPSBERUZBVUxUX1NPUlRfT1BUSU9OUztcbiAgICBASW5wdXQoKSBwdWJsaWMgc2hvd0Rlc2MgICA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBhZGFwdGVyIDogU2VhcmNoUmVzdWx0c0l0ZW1BZGFwdGVyPEl0ZW0+O1xuXG4gICAgLy9jdXN0b20gaGVhZGluZyB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtSGVhZGluZ1RlbXBsYXRlICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIHRodW1ibmFpbCB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtVGh1bWJuYWlsVGVtcGxhdGUgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIGZvb3RlciAoY29tcGxldGUpXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1Gb290ZXJUZW1wbGF0ZSAgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gZm9vdGVyIHN0YXRzIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1TdGF0c1RlbXBsYXRlICAgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gZm9vdGVyIGFjdGlvbnMgdGVtcGxhdGVcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbUFjdGlvbnNUZW1wbGF0ZSAgIDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgICA6IEV2ZW50RW1pdHRlcjxTZWFyY2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaEV2ZW50PigpO1xuXG4gICAgcHVibGljIHF1ZXJ5IDogUXVlcnk7XG4gICAgcHVibGljIHJlc3VsdHMgOiBTZWFyY2hSZXN1bHRzO1xuICAgIHB1YmxpYyBzZWxlY3RlZCA6IEl0ZW1bXTtcbiAgICBwdWJsaWMgc29ydFZhbHVlIDogc3RyaW5nO1xuICAgIHB1YmxpYyBpc0xvYWRpbmcgOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGVycm9yIDogRXJyb3I7XG5cbiAgICAvL2xpc3RlbmVyIGZvciB3aGVuIFNlYXJjaFNlcnZpY2UgZmlyZXMgZXZlbnRzIGZvciBjaGFuZ2UgaW5cbiAgICAvLyBxdWVyeSwgcmVzdWx0cywgb3Igc2VsZWN0ZWQgaXRlbXNcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbiA6IFN1YnNjcmlwdGlvbjtcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8vIEBJbmplY3QoQXBwQXV0aFNlcnZpY2UpIGF1dGhTZXJ2aWNlIDogQXBwQXV0aFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGlhbG9nIDogTWF0RGlhbG9nXG4gICAgKSB7XG4gICAgICAgIC8vIHN1cGVyKGF1dGhTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gc3VwZXIuaW5pdCgpO1xuXG4gICAgICAgIGlmKCF0aGlzLmFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlciA9IG5ldyBHZW9QbGF0Zm9ybVJlc3VsdHNJdGVtQWRhcHRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zb3J0VmFsdWUgPSB0aGlzLnNvcnRPcHRpb25zWzBdLnZhbHVlO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuc2VydmljZS5zdWJzY3JpYmUodGhpcyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIHN1cGVyLmRlc3Ryb3koKTtcblxuICAgICAgICBpZih0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgfVxuXG4gICAgb25RdWVyeUNoYW5nZSggcXVlcnkgOiBRdWVyeSApIHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgfVxuICAgIG9uUmVzdWx0c0NoYW5nZSggcmVzdWx0cyA6IFNlYXJjaFJlc3VsdHMsIGVycm9yID86IEVycm9yICkge1xuICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgICAgICB0aGlzLmVycm9yID0gKGVycm9yKSA/IGVycm9yIDogbnVsbDtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgb25TZWxlY3RlZENoYW5nZSggc2VsZWN0ZWQgOiBJdGVtW10gKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGlzU2VsZWN0ZWQgKGl0ZW0gOiBJdGVtKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlzU2VsZWN0ZWQoaXRlbSk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWxsSW5QYWdlKCkge1xuICAgICAgICBpZih0aGlzLm9uRXZlbnQpIHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlNFTEVDVCwge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnJlc3VsdHMucmVzdWx0c1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdEFsbCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmNsZWFyU2VsZWN0ZWQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25JdGVtRXZlbnQoICRldmVudCA6IFNlYXJjaEV2ZW50ICkge1xuICAgICAgICBsZXQgbmFtZSA9ICRldmVudC5nZXRUeXBlKCk7IC8vJGV2ZW50Lm5hbWU7XG4gICAgICAgIGlmKCAhbmFtZSApIHJldHVybjtcbiAgICAgICAgc3dpdGNoKCBuYW1lICkge1xuXG4gICAgICAgICAgICBjYXNlIEV2ZW50VHlwZXMuU0VMRUNUIDpcbiAgICAgICAgICAgIGlmKHRoaXMub25FdmVudCkgdGhpcy5vbkV2ZW50LmVtaXQoJGV2ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEV2ZW50VHlwZXMuUVVFUlkgOlxuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5zZXJ2aWNlLmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICBxdWVyeS5hcHBseVBhcmFtZXRlcnMoJGV2ZW50LmdldE9wdGlvbnMoKSk7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFnZU5vIC0gbmV3IHBhZ2UgbnVtYmVyIGJlaW5nIHJlcXVlc3RlZFxuICAgICAqL1xuICAgIG9uUGFnaW5nRXZlbnQoIGV2ZW50IDogUGFnZUV2ZW50ICkge1xuICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLnNlcnZpY2UuZ2V0UXVlcnkoKTtcbiAgICAgICAgbGV0IHByZXZpb3VzID0gcXVlcnkuZ2V0UGFnZSgpO1xuICAgICAgICBsZXQgY3VycmVudCA9IGV2ZW50LnBhZ2VJbmRleDtcbiAgICAgICAgaWYocHJldmlvdXMgIT09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgIHF1ZXJ5LnBhZ2UoY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcXVlcnkuc2V0UGFnZVNpemUoIGV2ZW50LnBhZ2VTaXplICk7XG5cbiAgICAgICAgaWYodGhpcy5vbkV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgeyB2YWx1ZSA6IHF1ZXJ5IH0pO1xuICAgICAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Tb3J0Q2hhbmdlKCRldmVudCA6IE1hdFNlbGVjdENoYW5nZSkge1xuICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLnNlcnZpY2UuZ2V0UXVlcnkoKTtcbiAgICAgICAgcXVlcnkuc29ydCh0aGlzLnNvcnRWYWx1ZSk7XG5cbiAgICAgICAgaWYodGhpcy5vbkV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgeyB2YWx1ZSA6IHF1ZXJ5IH0pO1xuICAgICAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=