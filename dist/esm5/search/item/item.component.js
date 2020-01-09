import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QueryParameters } from '@geoplatform/client';
import { SearchEvent, EventTypes } from '../../event';
import { GeoPlatformResultsItemAdapter } from './item-adapter';
var GP_MAP_RESOURCE_TYPE = 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap';
var AGOL_MAP_RESOURCE_TYPE = 'http://www.geoplatform.gov/ont/openmap/AGOLMap';
/**
 * Search Results Item Component
 *
 * This component is used to display search results items.
 *
 * Example:
 *   <div *ngFor="let item of results">
 *     <gp-search-results-item [item]="item"></gp-search-results-item>
 *   </div>
 *
 * Listen for selection or other events by passing an "onEvent" callback
 *
 * Example:
 *   <div *ngFor="let item of results">
 *     <gp-search-results-item [item]="item"
 *          (onEvent)="handleItemEvent($event)">
 *     </gp-search-results-item>
 *   </div>
 *
 * Customize how the item is displayed using any of the template bindings
 *
 * Example:
 *   <div *ngFor="let item of results">
 *     <gp-search-results-item [item]="item"
 *          [itemHeadingTemplate]="myCustomHeadingTemplate"
 *          [itemActionsTemplate]="myCustomActionsTemplate">
 *     </gp-search-results-item>
 *   </div>
 *   <ng-template #myCustomHeadingTemplate let-item="item">
 *     <div>My Customized {{item.label}}</div>
 *   </ng-template>
 *   <ng-template #myCustomActionsTemplate let-item="item">
 *     <button type="button" class="btn btn-link" (click)="handleClick(item)">Click Me</button>
 *   </ng-template>
 *
 */
var SearchResultsItemComponent = /** @class */ (function () {
    function SearchResultsItemComponent() {
        this.isSelected = false;
        this.canSelect = true;
        this.showDesc = false;
        this.onEvent = new EventEmitter();
    }
    SearchResultsItemComponent.prototype.ngOnInit = function () {
        if (!this.adapter) {
            this.adapter = new GeoPlatformResultsItemAdapter();
        }
    };
    SearchResultsItemComponent.prototype.ngOnChanges = function (changes) {
        if (changes.item || changes.adapter) {
            // let item = changes.item ? changes.item.currentValue : null;
            // let adapter = changes.adapter ? changes.adapter.currentValue : (
            //     this.adapter
            //     );
            //
            // if(item && !adapter) {
            //     this.adapter =
            // }
        }
    };
    SearchResultsItemComponent.prototype.ngOnDestroy = function () {
        this.adapter = null;
    };
    /**
     * Triggers a selection event for the item
     */
    SearchResultsItemComponent.prototype.select = function () {
        var event = new SearchEvent(EventTypes.SELECT, { value: this.item });
        this.onEvent.emit(event);
    };
    // getIconClass() {
    //     let type = this.item.type.replace(/^[a-z]+\:/i, '').toLowerCase();
    //     return 'icon-' + type;
    // }
    //
    // getTypeLabel() {
    //     if( ItemTypes.SERVICE === this.item.type && !!this.item.serviceType )
    //         return this.item.serviceType.label || "Service";
    //     if( ItemTypes.MAP === this.item.type) {
    //         let resTypes = this.item.resourceTypes || [];
    //         if( ~resTypes.indexOf(GP_MAP_RESOURCE_TYPE) ) return 'GeoPlatform Map';
    //         if( ~resTypes.indexOf(AGOL_MAP_RESOURCE_TYPE) ) return 'ArcGIS Online Map';
    //         return "Map";
    //     }
    //     if( ItemTypes.CONTACT === this.item.type) return 'Contact';
    //     return this.item.type.replace(/^[a-z]+\:/i, '');
    // }
    /**
     * Trigger a search event which constrains by creator
     */
    SearchResultsItemComponent.prototype.constrainToUser = function (username) {
        var change = {};
        change[QueryParameters.CREATED_BY] = username;
        var event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    };
    tslib_1.__decorate([
        Input()
    ], SearchResultsItemComponent.prototype, "item", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsItemComponent.prototype, "adapter", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsItemComponent.prototype, "isSelected", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsItemComponent.prototype, "canSelect", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsItemComponent.prototype, "showDesc", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsItemComponent.prototype, "itemHeadingTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsItemComponent.prototype, "itemThumbnailTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsItemComponent.prototype, "itemFooterTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsItemComponent.prototype, "itemStatsTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchResultsItemComponent.prototype, "itemActionsTemplate", void 0);
    tslib_1.__decorate([
        Output()
    ], SearchResultsItemComponent.prototype, "onEvent", void 0);
    SearchResultsItemComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-search-results-item',
            template: "<div class=\"m-results-item\" id=\"map-{{adapter?.getId(item)}}\" [ngClass]=\"{selected:item.selected}\">\n\n    <div class=\"m-results-item__body flex-align-center\">\n\n        <!-- Selection button -->\n        <div class=\"u-mg-right--md\" *ngIf=\"canSelect\">\n            <button type=\"button\" class=\"btn btn-light btn-lg\" title=\"Select this item\"\n                (click)=\"select()\" [ngClass]=\"{'active':isSelected}\">\n                <span class=\"far fa-square t-fg--gray-lt\" *ngIf=\"!isSelected\"></span>\n                <span class=\"fas fa-check\" *ngIf=\"isSelected\"></span>\n                <span class=\"sr-only\">Select this item</span>\n            </button>\n        </div>\n\n        <div class=\"flex-1\">\n\n            <div class=\"m-results-item__heading\">\n                <ng-container\n                    [ngTemplateOutlet]=\"itemHeadingTemplate || defaultResultItemHeadingTemplate\"\n                    [ngTemplateOutletContext]=\"{item: item}\">\n                </ng-container>\n            </div>\n\n            <div class=\"m-results-item__facets\">\n                <strong>\n                    <span class=\"{{adapter?.getIconClass(item)}}\"></span>\n                    {{adapter?.getTypeLabel(item)}}\n                </strong>\n                <span *ngIf=\"adapter?.getAuthorName(item)\">\n                    &nbsp;by\n                    <a class=\"is-linkless\" title=\"Find more maps by this author\"\n                        (click)=\"constrainToUser(adapter.getAuthorName(item))\">\n                        {{adapter.getAuthorName(item)}}\n                    </a>\n                </span>\n\n                <span *ngIf=\"adapter?.getCreatedDate(item)\">\n                    &nbsp;\n                    created <em>{{adapter.getCreatedDate(item)|date:'mediumDate':'UTC'}}</em>\n                </span>\n\n                <span *ngIf=\"adapter?.getModifiedDate(item)\">\n                    &nbsp;\n                    last modified <em>{{adapter.getModifiedDate(item)|date:'mediumDate':'UTC'}}</em>\n                </span>\n\n            </div>\n\n            <div class=\"m-results-item__description u-break--all\" *ngIf=\"showDesc\">\n                <div *ngIf=\"adapter?.getDescription(item)\" [innerHTML]=\"adapter?.getDescription(item)\"> </div>\n                <div *ngIf=\"!adapter?.getDescription(item)\">No description provided</div>\n            </div>\n\n        </div>\n\n        <div class=\"m-results-item__icon\">\n            <ng-container\n                [ngTemplateOutlet]=\"itemThumbnailTemplate || defaultResultItemThumbnailTemplate\"\n                [ngTemplateOutletContext]=\"{item: item}\">\n            </ng-container>\n        </div>\n\n    </div>\n\n    <div class=\"m-results-item__footer\" *ngIf=\"itemFooterTemplate || itemStatsTemplate || itemActionsTemplate\">\n        <ng-container *ngIf=\"itemFooterTemplate\"\n            [ngTemplateOutlet]=\"itemFooterTemplate\"\n            [ngTemplateOutletContext]=\"{item: item}\">\n        </ng-container>\n        <div class=\"m-results-item__stats\" *ngIf=\"!itemFooterTemplate\">\n            <ng-container *ngIf=\"itemStatsTemplate\"\n                [ngTemplateOutlet]=\"itemStatsTemplate\"\n                [ngTemplateOutletContext]=\"{item: item}\">\n            </ng-container>\n        </div>\n        <div class=\"m-results-item__actions\" *ngIf=\"!itemFooterTemplate\">\n            <ng-container *ngIf=\"itemActionsTemplate\"\n                [ngTemplateOutlet]=\"itemActionsTemplate\"\n                [ngTemplateOutletContext]=\"{item: item}\">\n            </ng-container>\n        </div>\n    </div>\n\n\n\n    <ng-template #defaultResultItemHeadingTemplate let-item=\"item\">\n        {{adapter?.getLabel(item)}}\n    </ng-template>\n    <ng-template #defaultResultItemThumbnailTemplate let-item=\"item\">\n        <gp-item-thumbnail [item]=\"item\"></gp-item-thumbnail>\n    </ng-template>\n\n</div>\n",
            styles: [":host .m-results-item .m-results-item__body{-webkit-box-align:center;align-items:center}.m-results-item:hover{background-color:#f8f9fa;box-shadow:none}.m-results-item gp-item-thumbnail{-webkit-box-flex:0;flex:0 1 128px;max-width:128px}@media (min-width:768px){.m-results-item .m-results-item__description{margin:0}}"]
        })
    ], SearchResultsItemComponent);
    return SearchResultsItemComponent;
}());
export { SearchResultsItemComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2l0ZW0vaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQzlCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBbUIsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdEQsT0FBTyxFQUE0Qiw2QkFBNkIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXpGLElBQU0sb0JBQW9CLEdBQUcsdURBQXVELENBQUM7QUFDckYsSUFBTSxzQkFBc0IsR0FBRyxnREFBZ0QsQ0FBQztBQUVoRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFNSDtJQXNCSTtRQWxCZ0IsZUFBVSxHQUFhLEtBQUssQ0FBQztRQUM3QixjQUFTLEdBQWMsSUFBSSxDQUFDO1FBQzVCLGFBQVEsR0FBZSxLQUFLLENBQUM7UUFhbkMsWUFBTyxHQUErQixJQUFJLFlBQVksRUFBZSxDQUFDO0lBR2hFLENBQUM7SUFFakIsNkNBQVEsR0FBUjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLDZCQUE2QixFQUFFLENBQUM7U0FDdEQ7SUFDTCxDQUFDO0lBRUQsZ0RBQVcsR0FBWCxVQUFhLE9BQXVCO1FBQ2hDLElBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2hDLDhEQUE4RDtZQUM5RCxtRUFBbUU7WUFDbkUsbUJBQW1CO1lBQ25CLFNBQVM7WUFDVCxFQUFFO1lBQ0YseUJBQXlCO1lBQ3pCLHFCQUFxQjtZQUNyQixJQUFJO1NBQ1A7SUFDTCxDQUFDO0lBRUQsZ0RBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNILDJDQUFNLEdBQU47UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxtQkFBbUI7SUFDbkIseUVBQXlFO0lBQ3pFLDZCQUE2QjtJQUM3QixJQUFJO0lBQ0osRUFBRTtJQUNGLG1CQUFtQjtJQUNuQiw0RUFBNEU7SUFDNUUsMkRBQTJEO0lBQzNELDhDQUE4QztJQUM5Qyx3REFBd0Q7SUFDeEQsa0ZBQWtGO0lBQ2xGLHNGQUFzRjtJQUN0Rix3QkFBd0I7SUFDeEIsUUFBUTtJQUNSLGtFQUFrRTtJQUNsRSx1REFBdUQ7SUFDdkQsSUFBSTtJQUVKOztPQUVHO0lBQ0gsb0RBQWUsR0FBZixVQUFnQixRQUFRO1FBQ3BCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUM5QyxJQUFJLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUEvRVE7UUFBUixLQUFLLEVBQUU7NERBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFOytEQUFpRDtJQUNoRDtRQUFSLEtBQUssRUFBRTtrRUFBcUM7SUFDcEM7UUFBUixLQUFLLEVBQUU7aUVBQW9DO0lBQ25DO1FBQVIsS0FBSyxFQUFFO2dFQUFxQztJQUdwQztRQUFSLEtBQUssRUFBRTsyRUFBaUQ7SUFFaEQ7UUFBUixLQUFLLEVBQUU7NkVBQWlEO0lBRWhEO1FBQVIsS0FBSyxFQUFFOzBFQUFpRDtJQUVoRDtRQUFSLEtBQUssRUFBRTt5RUFBaUQ7SUFFaEQ7UUFBUixLQUFLLEVBQUU7MkVBQWlEO0lBRS9DO1FBQVQsTUFBTSxFQUFFOytEQUF1RTtJQW5CdkUsMEJBQTBCO1FBTHRDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsczRIQUFvQzs7U0FFckMsQ0FBQztPQUNXLDBCQUEwQixDQW1GdEM7SUFBRCxpQ0FBQztDQUFBLEFBbkZELElBbUZDO1NBbkZZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsXG4gICAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEl0ZW0sIEl0ZW1UeXBlcywgUXVlcnlQYXJhbWV0ZXJzIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbmltcG9ydCB7IFNlYXJjaEV2ZW50LCBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vZXZlbnQnO1xuXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHRzSXRlbUFkYXB0ZXIsIEdlb1BsYXRmb3JtUmVzdWx0c0l0ZW1BZGFwdGVyIH0gZnJvbSAnLi9pdGVtLWFkYXB0ZXInO1xuXG5cblxuY29uc3QgR1BfTUFQX1JFU09VUkNFX1RZUEUgPSAnaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvb250L29wZW5tYXAvR2VvcGxhdGZvcm1NYXAnO1xuY29uc3QgQUdPTF9NQVBfUkVTT1VSQ0VfVFlQRSA9ICdodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3Blbm1hcC9BR09MTWFwJztcblxuLyoqXG4gKiBTZWFyY2ggUmVzdWx0cyBJdGVtIENvbXBvbmVudFxuICpcbiAqIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gZGlzcGxheSBzZWFyY2ggcmVzdWx0cyBpdGVtcy5cbiAqXG4gKiBFeGFtcGxlOlxuICogICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJlc3VsdHNcIj5cbiAqICAgICA8Z3Atc2VhcmNoLXJlc3VsdHMtaXRlbSBbaXRlbV09XCJpdGVtXCI+PC9ncC1zZWFyY2gtcmVzdWx0cy1pdGVtPlxuICogICA8L2Rpdj5cbiAqXG4gKiBMaXN0ZW4gZm9yIHNlbGVjdGlvbiBvciBvdGhlciBldmVudHMgYnkgcGFzc2luZyBhbiBcIm9uRXZlbnRcIiBjYWxsYmFja1xuICpcbiAqIEV4YW1wbGU6XG4gKiAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgcmVzdWx0c1wiPlxuICogICAgIDxncC1zZWFyY2gtcmVzdWx0cy1pdGVtIFtpdGVtXT1cIml0ZW1cIlxuICogICAgICAgICAgKG9uRXZlbnQpPVwiaGFuZGxlSXRlbUV2ZW50KCRldmVudClcIj5cbiAqICAgICA8L2dwLXNlYXJjaC1yZXN1bHRzLWl0ZW0+XG4gKiAgIDwvZGl2PlxuICpcbiAqIEN1c3RvbWl6ZSBob3cgdGhlIGl0ZW0gaXMgZGlzcGxheWVkIHVzaW5nIGFueSBvZiB0aGUgdGVtcGxhdGUgYmluZGluZ3NcbiAqXG4gKiBFeGFtcGxlOlxuICogICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJlc3VsdHNcIj5cbiAqICAgICA8Z3Atc2VhcmNoLXJlc3VsdHMtaXRlbSBbaXRlbV09XCJpdGVtXCJcbiAqICAgICAgICAgIFtpdGVtSGVhZGluZ1RlbXBsYXRlXT1cIm15Q3VzdG9tSGVhZGluZ1RlbXBsYXRlXCJcbiAqICAgICAgICAgIFtpdGVtQWN0aW9uc1RlbXBsYXRlXT1cIm15Q3VzdG9tQWN0aW9uc1RlbXBsYXRlXCI+XG4gKiAgICAgPC9ncC1zZWFyY2gtcmVzdWx0cy1pdGVtPlxuICogICA8L2Rpdj5cbiAqICAgPG5nLXRlbXBsYXRlICNteUN1c3RvbUhlYWRpbmdUZW1wbGF0ZSBsZXQtaXRlbT1cIml0ZW1cIj5cbiAqICAgICA8ZGl2Pk15IEN1c3RvbWl6ZWQge3tpdGVtLmxhYmVsfX08L2Rpdj5cbiAqICAgPC9uZy10ZW1wbGF0ZT5cbiAqICAgPG5nLXRlbXBsYXRlICNteUN1c3RvbUFjdGlvbnNUZW1wbGF0ZSBsZXQtaXRlbT1cIml0ZW1cIj5cbiAqICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlua1wiIChjbGljayk9XCJoYW5kbGVDbGljayhpdGVtKVwiPkNsaWNrIE1lPC9idXR0b24+XG4gKiAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1zZWFyY2gtcmVzdWx0cy1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2l0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pdGVtLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0l0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtICAgICAgIDogSXRlbTtcbiAgICBASW5wdXQoKSBwdWJsaWMgYWRhcHRlciA6IFNlYXJjaFJlc3VsdHNJdGVtQWRhcHRlcjxJdGVtPjtcbiAgICBASW5wdXQoKSBwdWJsaWMgaXNTZWxlY3RlZCA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgY2FuU2VsZWN0ICA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93RGVzYyAgIDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy9jdXN0b20gaGVhZGluZyB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtSGVhZGluZ1RlbXBsYXRlICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIHRodW1ibmFpbCB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtVGh1bWJuYWlsVGVtcGxhdGUgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIGZvb3RlciAoY29tcGxldGUpXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1Gb290ZXJUZW1wbGF0ZSAgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gZm9vdGVyIHN0YXRzIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1TdGF0c1RlbXBsYXRlICAgICA6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy9jdXN0b20gZm9vdGVyIGFjdGlvbnMgdGVtcGxhdGVcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbUFjdGlvbnNUZW1wbGF0ZSAgIDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKSBvbkV2ZW50IDogRXZlbnRFbWl0dGVyPFNlYXJjaEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoRXZlbnQ+KCk7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYoIXRoaXMuYWRhcHRlcikge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyID0gbmV3IEdlb1BsYXRmb3JtUmVzdWx0c0l0ZW1BZGFwdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyggY2hhbmdlcyA6IFNpbXBsZUNoYW5nZXMgKSB7XG4gICAgICAgIGlmKGNoYW5nZXMuaXRlbSB8fCBjaGFuZ2VzLmFkYXB0ZXIpIHtcbiAgICAgICAgICAgIC8vIGxldCBpdGVtID0gY2hhbmdlcy5pdGVtID8gY2hhbmdlcy5pdGVtLmN1cnJlbnRWYWx1ZSA6IG51bGw7XG4gICAgICAgICAgICAvLyBsZXQgYWRhcHRlciA9IGNoYW5nZXMuYWRhcHRlciA/IGNoYW5nZXMuYWRhcHRlci5jdXJyZW50VmFsdWUgOiAoXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5hZGFwdGVyXG4gICAgICAgICAgICAvLyAgICAgKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBpZihpdGVtICYmICFhZGFwdGVyKSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5hZGFwdGVyID1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGEgc2VsZWN0aW9uIGV2ZW50IGZvciB0aGUgaXRlbVxuICAgICAqL1xuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuU0VMRUNULCB7IHZhbHVlOiB0aGlzLml0ZW0gfSk7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvLyBnZXRJY29uQ2xhc3MoKSB7XG4gICAgLy8gICAgIGxldCB0eXBlID0gdGhpcy5pdGVtLnR5cGUucmVwbGFjZSgvXlthLXpdK1xcOi9pLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAvLyAgICAgcmV0dXJuICdpY29uLScgKyB0eXBlO1xuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIGdldFR5cGVMYWJlbCgpIHtcbiAgICAvLyAgICAgaWYoIEl0ZW1UeXBlcy5TRVJWSUNFID09PSB0aGlzLml0ZW0udHlwZSAmJiAhIXRoaXMuaXRlbS5zZXJ2aWNlVHlwZSApXG4gICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5pdGVtLnNlcnZpY2VUeXBlLmxhYmVsIHx8IFwiU2VydmljZVwiO1xuICAgIC8vICAgICBpZiggSXRlbVR5cGVzLk1BUCA9PT0gdGhpcy5pdGVtLnR5cGUpIHtcbiAgICAvLyAgICAgICAgIGxldCByZXNUeXBlcyA9IHRoaXMuaXRlbS5yZXNvdXJjZVR5cGVzIHx8IFtdO1xuICAgIC8vICAgICAgICAgaWYoIH5yZXNUeXBlcy5pbmRleE9mKEdQX01BUF9SRVNPVVJDRV9UWVBFKSApIHJldHVybiAnR2VvUGxhdGZvcm0gTWFwJztcbiAgICAvLyAgICAgICAgIGlmKCB+cmVzVHlwZXMuaW5kZXhPZihBR09MX01BUF9SRVNPVVJDRV9UWVBFKSApIHJldHVybiAnQXJjR0lTIE9ubGluZSBNYXAnO1xuICAgIC8vICAgICAgICAgcmV0dXJuIFwiTWFwXCI7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgaWYoIEl0ZW1UeXBlcy5DT05UQUNUID09PSB0aGlzLml0ZW0udHlwZSkgcmV0dXJuICdDb250YWN0JztcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuaXRlbS50eXBlLnJlcGxhY2UoL15bYS16XStcXDovaSwgJycpO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXIgYSBzZWFyY2ggZXZlbnQgd2hpY2ggY29uc3RyYWlucyBieSBjcmVhdG9yXG4gICAgICovXG4gICAgY29uc3RyYWluVG9Vc2VyKHVzZXJuYW1lKSB7XG4gICAgICAgIGxldCBjaGFuZ2UgPSB7fTtcbiAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5DUkVBVEVEX0JZXSA9IHVzZXJuYW1lO1xuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgY2hhbmdlKTtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cblxufVxuIl19