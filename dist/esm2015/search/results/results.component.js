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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL3Jlc3VsdHMvcmVzdWx0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSyxTQUFTLEVBQ2pCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUM5QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRy9ELHVFQUF1RTtBQUN2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0RCxPQUFPLEVBQTRCLDZCQUE2QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFPOUYsQ0FBQztBQUVGLE1BQU0sb0JBQW9CLEdBQXdCO0lBQzlDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBTSxLQUFLLEVBQUUsV0FBVyxFQUFHO0lBQ2pELEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBSSxLQUFLLEVBQUUsd0JBQXdCLEVBQUc7SUFDOUQsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFLLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtJQUM5RCxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQVEsS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQU8sS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO0NBQ3JELENBQUM7QUFTRixJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQWlDL0I7SUFDSSx3REFBd0Q7SUFDaEQsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQWhDcEIsZ0JBQVcsR0FBd0Isb0JBQW9CLENBQUM7UUFDbEQsYUFBUSxHQUFlLEtBQUssQ0FBQztR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QUssRUFBRTsyREFBMEQ7QUFDekQ7SUFBUixLQUFLLEVBQUU7d0RBQXFDO0FBRXBDO0lBQVIsS0FBSyxFQUFFO3VEQUFpRDtBQUdoRDtJQUFSLEtBQUssRUFBRTttRUFBaUQ7QUFFaEQ7SUFBUixLQUFLLEVBQUU7cUVBQWlEO0FBRWhEO0lBQVIsS0FBSyxFQUFFO2tFQUFpRDtBQUVoRDtJQUFSLEtBQUssRUFBRTtpRUFBaUQ7QUFFaEQ7SUFBUixLQUFLLEVBQUU7bUVBQWlEO0FBRS9DO0lBQVQsTUFBTSxFQUFFO3VEQUEyRTtBQW5CM0Usc0JBQXNCO0lBTGxDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsZ2lGQUF1Qzs7S0FFeEMsQ0FBQztHQUNXLHNCQUFzQixDQWtKbEM7U0FsSlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBJbmplY3QsIENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksXG4gICAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2VFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdFNlbGVjdENoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE9ic2VydmVyLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpZywgUXVlcnksIFNlYXJjaFJlc3VsdHMsIEl0ZW0gfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuLy8gaW1wb3J0IHsgQXBwQXV0aFNlcnZpY2UsIEF1dGhlbnRpY2F0ZWRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYXV0aFwiO1xuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tIFwiLi4vLi4vZXZlbnRcIjtcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UsIFNlYXJjaFNlcnZpY2VFdmVudCwgU2VhcmNoQXdhcmVDb21wb25lbnQgfSBmcm9tIFwiLi4vc2VhcmNoLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNlYXJjaFJlc3VsdHNJdGVtQWRhcHRlciwgR2VvUGxhdGZvcm1SZXN1bHRzSXRlbUFkYXB0ZXIgfSBmcm9tIFwiLi4vaXRlbS9pdGVtLWFkYXB0ZXJcIjtcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL2xvZ2dlcic7XG5cblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hTb3J0T3B0aW9uIHtcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG59O1xuXG5jb25zdCBERUZBVUxUX1NPUlRfT1BUSU9OUyA6IFNlYXJjaFNvcnRPcHRpb25bXSA9IFtcbiAgICB7IHZhbHVlOiBcIl9zY29yZSxkZXNjXCIsICAgICBsYWJlbDogXCJSZWxldmFuY2VcIiAgfSxcbiAgICB7IHZhbHVlOiBcIm1vZGlmaWVkLGRlc2NcIiwgICBsYWJlbDogXCJNb3N0IFJlY2VudGx5IE1vZGlmaWVkXCIgIH0sXG4gICAgeyB2YWx1ZTogXCJtb2RpZmllZCxhc2NcIiwgICAgbGFiZWw6IFwiTGVhc3QgUmVjZW50bHkgTW9kaWZpZWRcIiB9LFxuICAgIHsgdmFsdWU6IFwibGFiZWwsYXNjXCIsICAgICAgIGxhYmVsOiBcIlRpdGxlIFtBLVpdXCIgfSxcbiAgICB7IHZhbHVlOiBcImxhYmVsLGRlc2NcIiwgICAgICBsYWJlbDogXCJUaXRsZSBbWi1BXVwiIH0sXG4gICAgeyB2YWx1ZTogXCJyZWxpYWJpbGl0eSxhc2NcIiwgbGFiZWw6IFwiUmVsaWFiaWxpdHlcIiB9XG5dO1xuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3Atc2VhcmNoLXJlc3VsdHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVzdWx0cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Jlc3VsdHMuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIFNlYXJjaEF3YXJlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpICBzZXJ2aWNlICAgICA6IFNlYXJjaFNlcnZpY2U7XG4gICAgQElucHV0KCkgIHNvcnRPcHRpb25zIDogU2VhcmNoU29ydE9wdGlvbltdID0gREVGQVVMVF9TT1JUX09QVElPTlM7XG4gICAgQElucHV0KCkgcHVibGljIHNob3dEZXNjICAgOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgYWRhcHRlciA6IFNlYXJjaFJlc3VsdHNJdGVtQWRhcHRlcjxJdGVtPjtcblxuICAgIC8vY3VzdG9tIGhlYWRpbmcgdGVtcGxhdGVcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbUhlYWRpbmdUZW1wbGF0ZSAgIDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvL2N1c3RvbSB0aHVtYm5haWwgdGVtcGxhdGVcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbVRodW1ibmFpbFRlbXBsYXRlIDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvL2N1c3RvbSBmb290ZXIgKGNvbXBsZXRlKVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtRm9vdGVyVGVtcGxhdGUgICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIGZvb3RlciBzdGF0cyB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtU3RhdHNUZW1wbGF0ZSAgICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIGZvb3RlciBhY3Rpb25zIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1BY3Rpb25zVGVtcGxhdGUgICA6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAT3V0cHV0KCkgb25FdmVudCAgICAgOiBFdmVudEVtaXR0ZXI8U2VhcmNoRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hFdmVudD4oKTtcblxuICAgIHB1YmxpYyBxdWVyeSA6IFF1ZXJ5O1xuICAgIHB1YmxpYyByZXN1bHRzIDogU2VhcmNoUmVzdWx0cztcbiAgICBwdWJsaWMgc2VsZWN0ZWQgOiBJdGVtW107XG4gICAgcHVibGljIHNvcnRWYWx1ZSA6IHN0cmluZztcbiAgICBwdWJsaWMgaXNMb2FkaW5nIDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBlcnJvciA6IEVycm9yO1xuXG4gICAgLy9saXN0ZW5lciBmb3Igd2hlbiBTZWFyY2hTZXJ2aWNlIGZpcmVzIGV2ZW50cyBmb3IgY2hhbmdlIGluXG4gICAgLy8gcXVlcnksIHJlc3VsdHMsIG9yIHNlbGVjdGVkIGl0ZW1zXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb24gOiBTdWJzY3JpcHRpb247XG5cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAvLyBASW5qZWN0KEFwcEF1dGhTZXJ2aWNlKSBhdXRoU2VydmljZSA6IEFwcEF1dGhTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRpYWxvZyA6IE1hdERpYWxvZ1xuICAgICkge1xuICAgICAgICAvLyBzdXBlcihhdXRoU2VydmljZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIHN1cGVyLmluaXQoKTtcblxuICAgICAgICBpZighdGhpcy5hZGFwdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIgPSBuZXcgR2VvUGxhdGZvcm1SZXN1bHRzSXRlbUFkYXB0ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc29ydFZhbHVlID0gdGhpcy5zb3J0T3B0aW9uc1swXS52YWx1ZTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnNlcnZpY2Uuc3Vic2NyaWJlKHRoaXMpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICAvLyBzdXBlci5kZXN0cm95KCk7XG5cbiAgICAgICAgaWYodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5xdWVyeSA9IG51bGw7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIH1cblxuICAgIG9uUXVlcnlDaGFuZ2UoIHF1ZXJ5IDogUXVlcnkgKSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBvblJlc3VsdHNDaGFuZ2UoIHJlc3VsdHMgOiBTZWFyY2hSZXN1bHRzLCBlcnJvciA/OiBFcnJvciApIHtcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0cztcbiAgICAgICAgdGhpcy5lcnJvciA9IChlcnJvcikgPyBlcnJvciA6IG51bGw7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIG9uU2VsZWN0ZWRDaGFuZ2UoIHNlbGVjdGVkIDogSXRlbVtdICkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1NlbGVjdGVkIChpdGVtIDogSXRlbSkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5pc1NlbGVjdGVkKGl0ZW0pO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbEluUGFnZSgpIHtcbiAgICAgICAgaWYodGhpcy5vbkV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5TRUxFQ1QsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5yZXN1bHRzLnJlc3VsdHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGwoKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5jbGVhclNlbGVjdGVkKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uSXRlbUV2ZW50KCAkZXZlbnQgOiBTZWFyY2hFdmVudCApIHtcbiAgICAgICAgbGV0IG5hbWUgPSAkZXZlbnQuZ2V0VHlwZSgpOyAvLyRldmVudC5uYW1lO1xuICAgICAgICBpZiggIW5hbWUgKSByZXR1cm47XG4gICAgICAgIHN3aXRjaCggbmFtZSApIHtcblxuICAgICAgICAgICAgY2FzZSBFdmVudFR5cGVzLlNFTEVDVCA6XG4gICAgICAgICAgICBpZih0aGlzLm9uRXZlbnQpIHRoaXMub25FdmVudC5lbWl0KCRldmVudCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBFdmVudFR5cGVzLlFVRVJZIDpcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IHRoaXMuc2VydmljZS5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgcXVlcnkuYXBwbHlQYXJhbWV0ZXJzKCRldmVudC5nZXRPcHRpb25zKCkpO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnNlYXJjaChxdWVyeSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhZ2VObyAtIG5ldyBwYWdlIG51bWJlciBiZWluZyByZXF1ZXN0ZWRcbiAgICAgKi9cbiAgICBvblBhZ2luZ0V2ZW50KCBldmVudCA6IFBhZ2VFdmVudCApIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5zZXJ2aWNlLmdldFF1ZXJ5KCk7XG4gICAgICAgIGxldCBwcmV2aW91cyA9IHF1ZXJ5LmdldFBhZ2UoKTtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBldmVudC5wYWdlSW5kZXg7XG4gICAgICAgIGlmKHByZXZpb3VzICE9PSBjdXJyZW50KSB7XG4gICAgICAgICAgICBxdWVyeS5wYWdlKGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXJ5LnNldFBhZ2VTaXplKCBldmVudC5wYWdlU2l6ZSApO1xuXG4gICAgICAgIGlmKHRoaXMub25FdmVudCkge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIHsgdmFsdWUgOiBxdWVyeSB9KTtcbiAgICAgICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU29ydENoYW5nZSgkZXZlbnQgOiBNYXRTZWxlY3RDaGFuZ2UpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5zZXJ2aWNlLmdldFF1ZXJ5KCk7XG4gICAgICAgIHF1ZXJ5LnNvcnQodGhpcy5zb3J0VmFsdWUpO1xuXG4gICAgICAgIGlmKHRoaXMub25FdmVudCkge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIHsgdmFsdWUgOiBxdWVyeSB9KTtcbiAgICAgICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19