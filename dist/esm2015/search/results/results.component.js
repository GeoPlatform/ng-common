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
        this.hasPrimaryAction = true;
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
export { SearchResultsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL3Jlc3VsdHMvcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSyxTQUFTLEVBQ2pCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRy9ELHVFQUF1RTtBQUN2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0RCxPQUFPLEVBQTRCLDZCQUE2QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFPOUYsQ0FBQztBQUVGLE1BQU0sb0JBQW9CLEdBQXdCO0lBQzlDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBTSxLQUFLLEVBQUUsV0FBVyxFQUFHO0lBQ2pELEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBSSxLQUFLLEVBQUUsd0JBQXdCLEVBQUc7SUFDOUQsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFLLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtJQUM5RCxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQVEsS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQU8sS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO0NBQ3JELENBQUM7QUFHRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxREc7QUFNSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQXVDL0I7SUFDSSx3REFBd0Q7SUFDaEQsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0s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Q0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztDQUVKLENBQUE7O1lBL0d3QixTQUFTOztBQXRDckI7SUFBUixLQUFLLEVBQUU7dURBQXFEO0FBQ3BEO0lBQVIsS0FBSyxFQUFFOzJEQUFzRTtBQUNyRTtJQUFSLEtBQUssRUFBRTt3REFBNEM7QUFDM0M7SUFBUixLQUFLLEVBQUU7Z0VBQTJDO0FBQzFDO0lBQVIsS0FBSyxFQUFFO3VEQUEyRDtBQUcxRDtJQUFSLEtBQUssRUFBRTttRUFBcUQ7QUFDcEQ7SUFBUixLQUFLLEVBQUU7c0VBQXFEO0FBRXBEO0lBQVIsS0FBSyxFQUFFO3FFQUFxRDtBQUVwRDtJQUFSLEtBQUssRUFBRTttRUFBcUQ7QUFFcEQ7SUFBUixLQUFLLEVBQUU7a0VBQXFEO0FBRXBEO0lBQVIsS0FBSyxFQUFFO2lFQUFxRDtBQUVwRDtJQUFSLEtBQUssRUFBRTttRUFBcUQ7QUFFcEQ7SUFBUixLQUFLLEVBQUU7eUVBQXFEO0FBRW5EO0lBQVQsTUFBTSxFQUFFO3VEQUEyRTtBQXpCM0Usc0JBQXNCO0lBTGxDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsczZHQUF1Qzs7S0FFeEMsQ0FBQztHQUNXLHNCQUFzQixDQXdKbEM7U0F4Slksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBJbmplY3QsIENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksXG4gICAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2VFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdFNlbGVjdENoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE9ic2VydmVyLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpZywgUXVlcnksIFNlYXJjaFJlc3VsdHMsIEl0ZW0gfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuLy8gaW1wb3J0IHsgQXBwQXV0aFNlcnZpY2UsIEF1dGhlbnRpY2F0ZWRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYXV0aFwiO1xuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tIFwiLi4vLi4vZXZlbnRcIjtcbmltcG9ydCB7IEdlb1BsYXRmb3JtU2VhcmNoU2VydmljZSwgU2VhcmNoU2VydmljZUV2ZW50LCBTZWFyY2hBd2FyZUNvbXBvbmVudCB9IGZyb20gXCIuLi9zZWFyY2guc2VydmljZVwiO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0c0l0ZW1BZGFwdGVyLCBHZW9QbGF0Zm9ybVJlc3VsdHNJdGVtQWRhcHRlciB9IGZyb20gXCIuLi9pdGVtL2l0ZW0tYWRhcHRlclwiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vbG9nZ2VyJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaFNvcnRPcHRpb24ge1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbn07XG5cbmNvbnN0IERFRkFVTFRfU09SVF9PUFRJT05TIDogU2VhcmNoU29ydE9wdGlvbltdID0gW1xuICAgIHsgdmFsdWU6IFwiX3Njb3JlLGRlc2NcIiwgICAgIGxhYmVsOiBcIlJlbGV2YW5jZVwiICB9LFxuICAgIHsgdmFsdWU6IFwibW9kaWZpZWQsZGVzY1wiLCAgIGxhYmVsOiBcIk1vc3QgUmVjZW50bHkgTW9kaWZpZWRcIiAgfSxcbiAgICB7IHZhbHVlOiBcIm1vZGlmaWVkLGFzY1wiLCAgICBsYWJlbDogXCJMZWFzdCBSZWNlbnRseSBNb2RpZmllZFwiIH0sXG4gICAgeyB2YWx1ZTogXCJsYWJlbCxhc2NcIiwgICAgICAgbGFiZWw6IFwiVGl0bGUgW0EtWl1cIiB9LFxuICAgIHsgdmFsdWU6IFwibGFiZWwsZGVzY1wiLCAgICAgIGxhYmVsOiBcIlRpdGxlIFtaLUFdXCIgfSxcbiAgICB7IHZhbHVlOiBcInJlbGlhYmlsaXR5LGFzY1wiLCBsYWJlbDogXCJSZWxpYWJpbGl0eVwiIH1cbl07XG5cblxuLyoqXG4gKiBTZWFyY2ggUmVzdWx0cyBDb21wb25lbnRcbiAqXG4gKiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIGRpc3BsYXkgc2VhcmNoIHJlc3VsdHMuXG4gKlxuICogRXhhbXBsZTpcbiAqICAgPGdwLXNlYXJjaC1yZXN1bHRzIFtzZXJ2aWNlXT1cInNlcnZpY2VcIj5cbiAqICAgPC9ncC1zZWFyY2gtcmVzdWx0cz5cbiAqXG4gKlxuICogTGlzdGVuIGZvciBzZWxlY3Rpb24gb3Igb3RoZXIgZXZlbnRzIGJ5IHBhc3NpbmcgYW4gXCJvbkV2ZW50XCIgY2FsbGJhY2tcbiAqXG4gKiBFeGFtcGxlOlxuICogICA8Z3Atc2VhcmNoLXJlc3VsdHMgIFtzZXJ2aWNlXT1cInNlcnZpY2VcIlxuICogICAgICAgIChvbkV2ZW50KT1cImhhbmRsZUl0ZW1FdmVudCgkZXZlbnQpXCI+XG4gKiAgIDwvZ3Atc2VhcmNoLXJlc3VsdHM+XG4gKlxuICpcbiAqIFN1cHBvcnQgY3VzdG9tIGl0ZW1zIGJ5IHByb3ZpZGluZyBhIFNlYXJjaFJlc3VsdHNJdGVtQWRhcHRlclxuICpcbiAqIEV4YW1wbGU6XG4gKiAgIGNsYXNzIEN1c3RvbUl0ZW1BZGFwdGVyIGltcGxlbWVudHMgU2VhcmNoUmVzdWx0c0l0ZW1BZGFwdGVyPEl0ZW0+IHtcbiAqICAgICAgY29uc3RydWN0b3IoKSB7fVxuICogICAgICBnZXRJZCggaXRlbTogSXRlbSApIDogc3RyaW5nIHsgcmV0dXJuIGl0ZW0uaWRGaWVsZDsgfVxuICogICAgICBnZXRMYWJlbCggaXRlbTogSXRlbSApIDogc3RyaW5nIHsgcmV0dXJuIGl0ZW0uaGVhZGluZzsgfVxuICogICAgICAvL3JlbWFpbmluZyBtZXRob2RzLi4uXG4gKiAgIH1cbiAqICAgLi4uXG4gKlxuICogICBwdWJsaWMgbXlDdXN0b21JdGVtQWRhcHRlciA6IFNlYXJjaFJlc3VsdHNJdGVtQWRhcHRlcjxJdGVtPiA9IG5ldyBDdXN0b21JdGVtQWRhcHRlcigpO1xuICpcbiAqICAgLi4uXG4gKlxuICogICA8Z3Atc2VhcmNoLXJlc3VsdHMgW3NlcnZpY2VdPVwic2VydmljZVwiXG4gKiAgICAgICAgW2FkYXB0ZXJdPVwibXlDdXN0b21JdGVtQWRhcHRlclwiPlxuICogICA8L2dwLXNlYXJjaC1yZXN1bHRzPlxuICpcbiAqXG4gKlxuICogQ3VzdG9taXplIGhvdyBpdGVtcyBhcmUgZGlzcGxheWVkIHVzaW5nIGFueSBvZiB0aGUgdGVtcGxhdGUgYmluZGluZ3NcbiAqXG4gKiBFeGFtcGxlOlxuICogICA8Z3Atc2VhcmNoLXJlc3VsdHMgW3NlcnZpY2VdPVwic2VydmljZVwiXG4gKiAgICAgICAgW2l0ZW1IZWFkaW5nVGVtcGxhdGVdPVwibXlDdXN0b21JdGVtSGVhZGluZ1RlbXBsYXRlXCJcbiAqICAgICAgICBbaXRlbUFjdGlvbnNUZW1wbGF0ZV09XCJteUN1c3RvbUl0ZW1BY3Rpb25zVGVtcGxhdGVcIj5cbiAqICAgPC9ncC1zZWFyY2gtcmVzdWx0cz5cbiAqICAgPG5nLXRlbXBsYXRlICNteUN1c3RvbUl0ZW1IZWFkaW5nVGVtcGxhdGUgbGV0LWl0ZW09XCJpdGVtXCI+XG4gKiAgICAgPGRpdj5NeSBDdXN0b21pemVkIHt7aXRlbS5sYWJlbH19PC9kaXY+XG4gKiAgIDwvbmctdGVtcGxhdGU+XG4gKiAgIDxuZy10ZW1wbGF0ZSAjbXlDdXN0b21JdGVtQWN0aW9uc1RlbXBsYXRlIGxldC1pdGVtPVwiaXRlbVwiPlxuICogICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgKGNsaWNrKT1cImhhbmRsZUNsaWNrKGl0ZW0pXCI+Q2xpY2sgTWU8L2J1dHRvbj5cbiAqICAgPC9uZy10ZW1wbGF0ZT5cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLXNlYXJjaC1yZXN1bHRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Jlc3VsdHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yZXN1bHRzLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0NvbXBvbmVudFxuaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgU2VhcmNoQXdhcmVDb21wb25lbnQ8UXVlcnksIFNlYXJjaFJlc3VsdHMsIEl0ZW0+IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXJ2aWNlICAgICAgICAgICA6IEdlb1BsYXRmb3JtU2VhcmNoU2VydmljZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgc29ydE9wdGlvbnMgICAgICAgOiBTZWFyY2hTb3J0T3B0aW9uW10gPSBERUZBVUxUX1NPUlRfT1BUSU9OUztcbiAgICBASW5wdXQoKSBwdWJsaWMgc2hvd0Rlc2MgICAgICAgICAgOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgcHVibGljIGhhc1ByaW1hcnlBY3Rpb24gIDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcHVibGljIGFkYXB0ZXIgICAgICAgICAgIDogU2VhcmNoUmVzdWx0c0l0ZW1BZGFwdGVyPEl0ZW0+O1xuXG4gICAgLy9jdXN0b20gaGVhZGluZyB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtSGVhZGluZ1RlbXBsYXRlICAgICAgIDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbVN1YkhlYWRpbmdUZW1wbGF0ZSAgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gdGh1bWJuYWlsIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1UaHVtYm5haWxUZW1wbGF0ZSAgICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1Db250ZW50VGVtcGxhdGUgICAgICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIGZvb3RlciAoY29tcGxldGUpXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1Gb290ZXJUZW1wbGF0ZSAgICAgICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIGZvb3RlciBzdGF0cyB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtU3RhdHNUZW1wbGF0ZSAgICAgICAgIDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvL2N1c3RvbSBmb290ZXIgYWN0aW9ucyB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtQWN0aW9uc1RlbXBsYXRlICAgICAgIDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvL2N1c3RvbSBwcmltYXJ5IGFjdGlvbiB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtUHJpbWFyeUFjdGlvblRlbXBsYXRlIDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgICA6IEV2ZW50RW1pdHRlcjxTZWFyY2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaEV2ZW50PigpO1xuXG4gICAgcHVibGljIHF1ZXJ5ICAgICA6IFF1ZXJ5O1xuICAgIHB1YmxpYyByZXN1bHRzICAgOiBTZWFyY2hSZXN1bHRzO1xuICAgIHB1YmxpYyBzZWxlY3RlZCAgOiBJdGVtW107XG4gICAgcHVibGljIHNvcnRWYWx1ZSA6IHN0cmluZztcbiAgICBwdWJsaWMgaXNMb2FkaW5nIDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBlcnJvciAgICAgOiBFcnJvcjtcblxuICAgIC8vbGlzdGVuZXIgZm9yIHdoZW4gU2VhcmNoU2VydmljZSBmaXJlcyBldmVudHMgZm9yIGNoYW5nZSBpblxuICAgIC8vIHF1ZXJ5LCByZXN1bHRzLCBvciBzZWxlY3RlZCBpdGVtc1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uIDogU3Vic2NyaXB0aW9uO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLy8gQEluamVjdChBcHBBdXRoU2VydmljZSkgYXV0aFNlcnZpY2UgOiBBcHBBdXRoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkaWFsb2cgOiBNYXREaWFsb2dcbiAgICApIHtcbiAgICAgICAgLy8gc3VwZXIoYXV0aFNlcnZpY2UpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyBzdXBlci5pbml0KCk7XG5cbiAgICAgICAgaWYoIXRoaXMuYWRhcHRlcikge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyID0gbmV3IEdlb1BsYXRmb3JtUmVzdWx0c0l0ZW1BZGFwdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNvcnRWYWx1ZSA9IHRoaXMuc29ydE9wdGlvbnNbMF0udmFsdWU7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5zZXJ2aWNlLnN1YnNjcmliZSh0aGlzKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgICAgIGlmKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkgPSBudWxsO1xuICAgICAgICB0aGlzLnJlc3VsdHMgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB9XG5cbiAgICBvblF1ZXJ5Q2hhbmdlKCBxdWVyeSA6IFF1ZXJ5ICkge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgb25SZXN1bHRzQ2hhbmdlKCByZXN1bHRzIDogU2VhcmNoUmVzdWx0cywgZXJyb3IgPzogRXJyb3IgKSB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAoZXJyb3IpID8gZXJyb3IgOiBudWxsO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBvblNlbGVjdGVkQ2hhbmdlKCBzZWxlY3RlZCA6IEl0ZW1bXSApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgaXNTZWxlY3RlZCAoaXRlbSA6IEl0ZW0pIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNTZWxlY3RlZChpdGVtKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbGxJblBhZ2UoKSB7XG4gICAgICAgIGlmKHRoaXMub25FdmVudCkge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuU0VMRUNULCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVzdWx0cy5yZXN1bHRzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0QWxsKCkge1xuICAgICAgICB0aGlzLnNlcnZpY2UuY2xlYXJTZWxlY3RlZCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkl0ZW1FdmVudCggJGV2ZW50IDogU2VhcmNoRXZlbnQgKSB7XG4gICAgICAgIGxldCBuYW1lID0gJGV2ZW50LmdldFR5cGUoKTsgLy8kZXZlbnQubmFtZTtcbiAgICAgICAgaWYoICFuYW1lICkgcmV0dXJuO1xuICAgICAgICBzd2l0Y2goIG5hbWUgKSB7XG5cbiAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlcy5TRUxFQ1QgOlxuICAgICAgICAgICAgaWYodGhpcy5vbkV2ZW50KSB0aGlzLm9uRXZlbnQuZW1pdCgkZXZlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlcy5RVUVSWSA6XG4gICAgICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLnNlcnZpY2UuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgIHF1ZXJ5LmFwcGx5UGFyYW1ldGVycygkZXZlbnQuZ2V0T3B0aW9ucygpKTtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zZWFyY2gocXVlcnkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlTm8gLSBuZXcgcGFnZSBudW1iZXIgYmVpbmcgcmVxdWVzdGVkXG4gICAgICovXG4gICAgb25QYWdpbmdFdmVudCggZXZlbnQgOiBQYWdlRXZlbnQgKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMuc2VydmljZS5nZXRRdWVyeSgpO1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBxdWVyeS5nZXRQYWdlKCk7XG4gICAgICAgIGxldCBjdXJyZW50ID0gZXZlbnQucGFnZUluZGV4O1xuICAgICAgICBpZihwcmV2aW91cyAhPT0gY3VycmVudCkge1xuICAgICAgICAgICAgcXVlcnkucGFnZShjdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBxdWVyeS5zZXRQYWdlU2l6ZSggZXZlbnQucGFnZVNpemUgKTtcblxuICAgICAgICBpZih0aGlzLm9uRXZlbnQpIHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCB7IHZhbHVlIDogcXVlcnkgfSk7XG4gICAgICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNvcnRDaGFuZ2UoJGV2ZW50IDogTWF0U2VsZWN0Q2hhbmdlKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMuc2VydmljZS5nZXRRdWVyeSgpO1xuICAgICAgICBxdWVyeS5zb3J0KHRoaXMuc29ydFZhbHVlKTtcblxuICAgICAgICBpZih0aGlzLm9uRXZlbnQpIHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCB7IHZhbHVlIDogcXVlcnkgfSk7XG4gICAgICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==