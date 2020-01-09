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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL3Jlc3VsdHMvcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSyxTQUFTLEVBQ2pCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRy9ELHVFQUF1RTtBQUN2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0RCxPQUFPLEVBQTRCLDZCQUE2QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFPOUYsQ0FBQztBQUVGLElBQU0sb0JBQW9CLEdBQXdCO0lBQzlDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBTSxLQUFLLEVBQUUsV0FBVyxFQUFHO0lBQ2pELEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBSSxLQUFLLEVBQUUsd0JBQXdCLEVBQUc7SUFDOUQsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFLLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtJQUM5RCxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQVEsS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQU8sS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO0NBQ3JELENBQUM7QUFHRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxREc7QUFNSDtJQWlDSTtJQUNJLHdEQUF3RDtJQUNoRCxNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBaENwQixnQkFBVyxHQUF3QixvQkFBb0Is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QUMsT0FBSyxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDOztnQkE3R29CLFNBQVM7O0lBakNwQjtRQUFULEtBQUssRUFBRTsyREFBOEI7SUFDNUI7UUFBVCxLQUFLLEVBQUU7K0RBQTBEO0lBQ3pEO1FBQVIsS0FBSyxFQUFFOzREQUFxQztJQUVwQztRQUFSLEtBQUssRUFBRTsyREFBaUQ7SUFHaEQ7UUFBUixLQUFLLEVBQUU7dUVBQWlEO0lBRWhEO1FBQVIsS0FBSyxFQUFFO3lFQUFpRDtJQUVoRDtRQUFSLEtBQUssRUFBRTtzRUFBaUQ7SUFFaEQ7UUFBUixLQUFLLEVBQUU7cUVBQWlEO0lBRWhEO1FBQVIsS0FBSyxFQUFFO3VFQUFpRDtJQUUvQztRQUFULE1BQU0sRUFBRTsyREFBMkU7SUFuQjNFLHNCQUFzQjtRQUxsQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLGdpRkFBdUM7O1NBRXhDLENBQUM7T0FDVyxzQkFBc0IsQ0FrSmxDO0lBQUQsNkJBQUM7Q0FBQSxBQWxKRCxJQWtKQztTQWxKWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEluamVjdCwgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSxcbiAgICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0U2VsZWN0Q2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29uZmlnLCBRdWVyeSwgU2VhcmNoUmVzdWx0cywgSXRlbSB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG4vLyBpbXBvcnQgeyBBcHBBdXRoU2VydmljZSwgQXV0aGVudGljYXRlZENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9hdXRoXCI7XG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gXCIuLi8uLi9ldmVudFwiO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSwgU2VhcmNoU2VydmljZUV2ZW50LCBTZWFyY2hBd2FyZUNvbXBvbmVudCB9IGZyb20gXCIuLi9zZWFyY2guc2VydmljZVwiO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0c0l0ZW1BZGFwdGVyLCBHZW9QbGF0Zm9ybVJlc3VsdHNJdGVtQWRhcHRlciB9IGZyb20gXCIuLi9pdGVtL2l0ZW0tYWRhcHRlclwiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vbG9nZ2VyJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaFNvcnRPcHRpb24ge1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbn07XG5cbmNvbnN0IERFRkFVTFRfU09SVF9PUFRJT05TIDogU2VhcmNoU29ydE9wdGlvbltdID0gW1xuICAgIHsgdmFsdWU6IFwiX3Njb3JlLGRlc2NcIiwgICAgIGxhYmVsOiBcIlJlbGV2YW5jZVwiICB9LFxuICAgIHsgdmFsdWU6IFwibW9kaWZpZWQsZGVzY1wiLCAgIGxhYmVsOiBcIk1vc3QgUmVjZW50bHkgTW9kaWZpZWRcIiAgfSxcbiAgICB7IHZhbHVlOiBcIm1vZGlmaWVkLGFzY1wiLCAgICBsYWJlbDogXCJMZWFzdCBSZWNlbnRseSBNb2RpZmllZFwiIH0sXG4gICAgeyB2YWx1ZTogXCJsYWJlbCxhc2NcIiwgICAgICAgbGFiZWw6IFwiVGl0bGUgW0EtWl1cIiB9LFxuICAgIHsgdmFsdWU6IFwibGFiZWwsZGVzY1wiLCAgICAgIGxhYmVsOiBcIlRpdGxlIFtaLUFdXCIgfSxcbiAgICB7IHZhbHVlOiBcInJlbGlhYmlsaXR5LGFzY1wiLCBsYWJlbDogXCJSZWxpYWJpbGl0eVwiIH1cbl07XG5cblxuLyoqXG4gKiBTZWFyY2ggUmVzdWx0cyBDb21wb25lbnRcbiAqXG4gKiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIGRpc3BsYXkgc2VhcmNoIHJlc3VsdHMuXG4gKlxuICogRXhhbXBsZTpcbiAqICAgPGdwLXNlYXJjaC1yZXN1bHRzIFtzZXJ2aWNlXT1cInNlcnZpY2VcIj5cbiAqICAgPC9ncC1zZWFyY2gtcmVzdWx0cz5cbiAqXG4gKlxuICogTGlzdGVuIGZvciBzZWxlY3Rpb24gb3Igb3RoZXIgZXZlbnRzIGJ5IHBhc3NpbmcgYW4gXCJvbkV2ZW50XCIgY2FsbGJhY2tcbiAqXG4gKiBFeGFtcGxlOlxuICogICA8Z3Atc2VhcmNoLXJlc3VsdHMgIFtzZXJ2aWNlXT1cInNlcnZpY2VcIlxuICogICAgICAgIChvbkV2ZW50KT1cImhhbmRsZUl0ZW1FdmVudCgkZXZlbnQpXCI+XG4gKiAgIDwvZ3Atc2VhcmNoLXJlc3VsdHM+XG4gKlxuICpcbiAqIFN1cHBvcnQgY3VzdG9tIGl0ZW1zIGJ5IHByb3ZpZGluZyBhIFNlYXJjaFJlc3VsdHNJdGVtQWRhcHRlclxuICpcbiAqIEV4YW1wbGU6XG4gKiAgIGNsYXNzIEN1c3RvbUl0ZW1BZGFwdGVyIGltcGxlbWVudHMgU2VhcmNoUmVzdWx0c0l0ZW1BZGFwdGVyPEl0ZW0+IHtcbiAqICAgICAgY29uc3RydWN0b3IoKSB7fVxuICogICAgICBnZXRJZCggaXRlbTogSXRlbSApIDogc3RyaW5nIHsgcmV0dXJuIGl0ZW0uaWRGaWVsZDsgfVxuICogICAgICBnZXRMYWJlbCggaXRlbTogSXRlbSApIDogc3RyaW5nIHsgcmV0dXJuIGl0ZW0uaGVhZGluZzsgfVxuICogICAgICAvL3JlbWFpbmluZyBtZXRob2RzLi4uXG4gKiAgIH1cbiAqICAgLi4uXG4gKlxuICogICBwdWJsaWMgbXlDdXN0b21JdGVtQWRhcHRlciA6IFNlYXJjaFJlc3VsdHNJdGVtQWRhcHRlcjxJdGVtPiA9IG5ldyBDdXN0b21JdGVtQWRhcHRlcigpO1xuICpcbiAqICAgLi4uXG4gKlxuICogICA8Z3Atc2VhcmNoLXJlc3VsdHMgW3NlcnZpY2VdPVwic2VydmljZVwiXG4gKiAgICAgICAgW2FkYXB0ZXJdPVwibXlDdXN0b21JdGVtQWRhcHRlclwiPlxuICogICA8L2dwLXNlYXJjaC1yZXN1bHRzPlxuICpcbiAqXG4gKlxuICogQ3VzdG9taXplIGhvdyBpdGVtcyBhcmUgZGlzcGxheWVkIHVzaW5nIGFueSBvZiB0aGUgdGVtcGxhdGUgYmluZGluZ3NcbiAqXG4gKiBFeGFtcGxlOlxuICogICA8Z3Atc2VhcmNoLXJlc3VsdHMgW3NlcnZpY2VdPVwic2VydmljZVwiXG4gKiAgICAgICAgW2l0ZW1IZWFkaW5nVGVtcGxhdGVdPVwibXlDdXN0b21JdGVtSGVhZGluZ1RlbXBsYXRlXCJcbiAqICAgICAgICBbaXRlbUFjdGlvbnNUZW1wbGF0ZV09XCJteUN1c3RvbUl0ZW1BY3Rpb25zVGVtcGxhdGVcIj5cbiAqICAgPC9ncC1zZWFyY2gtcmVzdWx0cz5cbiAqICAgPG5nLXRlbXBsYXRlICNteUN1c3RvbUl0ZW1IZWFkaW5nVGVtcGxhdGUgbGV0LWl0ZW09XCJpdGVtXCI+XG4gKiAgICAgPGRpdj5NeSBDdXN0b21pemVkIHt7aXRlbS5sYWJlbH19PC9kaXY+XG4gKiAgIDwvbmctdGVtcGxhdGU+XG4gKiAgIDxuZy10ZW1wbGF0ZSAjbXlDdXN0b21JdGVtQWN0aW9uc1RlbXBsYXRlIGxldC1pdGVtPVwiaXRlbVwiPlxuICogICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgKGNsaWNrKT1cImhhbmRsZUNsaWNrKGl0ZW0pXCI+Q2xpY2sgTWU8L2J1dHRvbj5cbiAqICAgPC9uZy10ZW1wbGF0ZT5cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLXNlYXJjaC1yZXN1bHRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Jlc3VsdHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yZXN1bHRzLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBTZWFyY2hBd2FyZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSAgc2VydmljZSAgICAgOiBTZWFyY2hTZXJ2aWNlO1xuICAgIEBJbnB1dCgpICBzb3J0T3B0aW9ucyA6IFNlYXJjaFNvcnRPcHRpb25bXSA9IERFRkFVTFRfU09SVF9PUFRJT05TO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93RGVzYyAgIDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgcHVibGljIGFkYXB0ZXIgOiBTZWFyY2hSZXN1bHRzSXRlbUFkYXB0ZXI8SXRlbT47XG5cbiAgICAvL2N1c3RvbSBoZWFkaW5nIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1IZWFkaW5nVGVtcGxhdGUgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gdGh1bWJuYWlsIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1UaHVtYm5haWxUZW1wbGF0ZSA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gZm9vdGVyIChjb21wbGV0ZSlcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbUZvb3RlclRlbXBsYXRlICAgIDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvL2N1c3RvbSBmb290ZXIgc3RhdHMgdGVtcGxhdGVcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbVN0YXRzVGVtcGxhdGUgICAgIDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvL2N1c3RvbSBmb290ZXIgYWN0aW9ucyB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtQWN0aW9uc1RlbXBsYXRlICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQE91dHB1dCgpIG9uRXZlbnQgICAgIDogRXZlbnRFbWl0dGVyPFNlYXJjaEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoRXZlbnQ+KCk7XG5cbiAgICBwdWJsaWMgcXVlcnkgOiBRdWVyeTtcbiAgICBwdWJsaWMgcmVzdWx0cyA6IFNlYXJjaFJlc3VsdHM7XG4gICAgcHVibGljIHNlbGVjdGVkIDogSXRlbVtdO1xuICAgIHB1YmxpYyBzb3J0VmFsdWUgOiBzdHJpbmc7XG4gICAgcHVibGljIGlzTG9hZGluZyA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgZXJyb3IgOiBFcnJvcjtcblxuICAgIC8vbGlzdGVuZXIgZm9yIHdoZW4gU2VhcmNoU2VydmljZSBmaXJlcyBldmVudHMgZm9yIGNoYW5nZSBpblxuICAgIC8vIHF1ZXJ5LCByZXN1bHRzLCBvciBzZWxlY3RlZCBpdGVtc1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uIDogU3Vic2NyaXB0aW9uO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLy8gQEluamVjdChBcHBBdXRoU2VydmljZSkgYXV0aFNlcnZpY2UgOiBBcHBBdXRoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkaWFsb2cgOiBNYXREaWFsb2dcbiAgICApIHtcbiAgICAgICAgLy8gc3VwZXIoYXV0aFNlcnZpY2UpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyBzdXBlci5pbml0KCk7XG5cbiAgICAgICAgaWYoIXRoaXMuYWRhcHRlcikge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyID0gbmV3IEdlb1BsYXRmb3JtUmVzdWx0c0l0ZW1BZGFwdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNvcnRWYWx1ZSA9IHRoaXMuc29ydE9wdGlvbnNbMF0udmFsdWU7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5zZXJ2aWNlLnN1YnNjcmliZSh0aGlzKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gc3VwZXIuZGVzdHJveSgpO1xuXG4gICAgICAgIGlmKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkgPSBudWxsO1xuICAgICAgICB0aGlzLnJlc3VsdHMgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICB9XG5cbiAgICBvblF1ZXJ5Q2hhbmdlKCBxdWVyeSA6IFF1ZXJ5ICkge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgb25SZXN1bHRzQ2hhbmdlKCByZXN1bHRzIDogU2VhcmNoUmVzdWx0cywgZXJyb3IgPzogRXJyb3IgKSB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAoZXJyb3IpID8gZXJyb3IgOiBudWxsO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBvblNlbGVjdGVkQ2hhbmdlKCBzZWxlY3RlZCA6IEl0ZW1bXSApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgaXNTZWxlY3RlZCAoaXRlbSA6IEl0ZW0pIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNTZWxlY3RlZChpdGVtKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbGxJblBhZ2UoKSB7XG4gICAgICAgIGlmKHRoaXMub25FdmVudCkge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuU0VMRUNULCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVzdWx0cy5yZXN1bHRzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0QWxsKCkge1xuICAgICAgICB0aGlzLnNlcnZpY2UuY2xlYXJTZWxlY3RlZCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkl0ZW1FdmVudCggJGV2ZW50IDogU2VhcmNoRXZlbnQgKSB7XG4gICAgICAgIGxldCBuYW1lID0gJGV2ZW50LmdldFR5cGUoKTsgLy8kZXZlbnQubmFtZTtcbiAgICAgICAgaWYoICFuYW1lICkgcmV0dXJuO1xuICAgICAgICBzd2l0Y2goIG5hbWUgKSB7XG5cbiAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlcy5TRUxFQ1QgOlxuICAgICAgICAgICAgaWYodGhpcy5vbkV2ZW50KSB0aGlzLm9uRXZlbnQuZW1pdCgkZXZlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlcy5RVUVSWSA6XG4gICAgICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLnNlcnZpY2UuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgIHF1ZXJ5LmFwcGx5UGFyYW1ldGVycygkZXZlbnQuZ2V0T3B0aW9ucygpKTtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zZWFyY2gocXVlcnkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlTm8gLSBuZXcgcGFnZSBudW1iZXIgYmVpbmcgcmVxdWVzdGVkXG4gICAgICovXG4gICAgb25QYWdpbmdFdmVudCggZXZlbnQgOiBQYWdlRXZlbnQgKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMuc2VydmljZS5nZXRRdWVyeSgpO1xuICAgICAgICBsZXQgcHJldmlvdXMgPSBxdWVyeS5nZXRQYWdlKCk7XG4gICAgICAgIGxldCBjdXJyZW50ID0gZXZlbnQucGFnZUluZGV4O1xuICAgICAgICBpZihwcmV2aW91cyAhPT0gY3VycmVudCkge1xuICAgICAgICAgICAgcXVlcnkucGFnZShjdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBxdWVyeS5zZXRQYWdlU2l6ZSggZXZlbnQucGFnZVNpemUgKTtcblxuICAgICAgICBpZih0aGlzLm9uRXZlbnQpIHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCB7IHZhbHVlIDogcXVlcnkgfSk7XG4gICAgICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNvcnRDaGFuZ2UoJGV2ZW50IDogTWF0U2VsZWN0Q2hhbmdlKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMuc2VydmljZS5nZXRRdWVyeSgpO1xuICAgICAgICBxdWVyeS5zb3J0KHRoaXMuc29ydFZhbHVlKTtcblxuICAgICAgICBpZih0aGlzLm9uRXZlbnQpIHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCB7IHZhbHVlIDogcXVlcnkgfSk7XG4gICAgICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==