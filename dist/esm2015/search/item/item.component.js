import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QueryParameters } from '@geoplatform/client';
import { SearchEvent, EventTypes } from '../../event';
import { GeoPlatformResultsItemAdapter } from './item-adapter';
const GP_MAP_RESOURCE_TYPE = 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap';
const AGOL_MAP_RESOURCE_TYPE = 'http://www.geoplatform.gov/ont/openmap/AGOLMap';
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
let SearchResultsItemComponent = class SearchResultsItemComponent {
    constructor() {
        this.isSelected = false;
        this.showDesc = false;
        this.onEvent = new EventEmitter();
    }
    ngOnInit() {
        if (!this.adapter) {
            this.adapter = new GeoPlatformResultsItemAdapter();
        }
    }
    ngOnChanges(changes) {
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
    }
    ngOnDestroy() {
        this.adapter = null;
    }
    /**
     * Triggers a selection event for the item
     */
    select() {
        let event = new SearchEvent(EventTypes.SELECT, { value: this.item });
        this.onEvent.emit(event);
    }
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
    constrainToUser(username) {
        let change = {};
        change[QueryParameters.CREATED_BY] = username;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
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
        template: "<div class=\"m-results-item\" id=\"map-{{adapter?.getId(item)}}\" [ngClass]=\"{selected:item.selected}\">\n\n    <div class=\"m-results-item__body flex-align-center\">\n\n        <!-- Selection button -->\n        <div class=\"u-mg-right--md\">\n            <button type=\"button\" class=\"btn btn-light btn-lg\" title=\"Select this item\"\n                (click)=\"select()\" [ngClass]=\"{'active':isSelected}\">\n                <span class=\"far fa-square t-fg--gray-lt\" *ngIf=\"!isSelected\"></span>\n                <span class=\"fas fa-check\" *ngIf=\"isSelected\"></span>\n                <span class=\"sr-only\">Select this item</span>\n            </button>\n        </div>\n\n        <div class=\"flex-1\">\n\n            <div class=\"m-results-item__heading\">\n                <ng-container\n                    [ngTemplateOutlet]=\"itemHeadingTemplate || defaultResultItemHeadingTemplate\"\n                    [ngTemplateOutletContext]=\"{item: item}\">\n                </ng-container>\n            </div>\n\n            <div class=\"m-results-item__facets\">\n                <strong>\n                    <span class=\"{{adapter?.getIconClass(item)}}\"></span>\n                    {{adapter?.getTypeLabel(item)}}\n                </strong>\n                <span *ngIf=\"adapter?.getAuthorName(item)\">\n                    &nbsp;by\n                    <a class=\"is-linkless\" title=\"Find more maps by this author\"\n                        (click)=\"constrainToUser(adapter.getAuthorName(item))\">\n                        {{adapter.getAuthorName(item)}}\n                    </a>\n                </span>\n\n                <span *ngIf=\"adapter?.getCreatedDate(item)\">\n                    &nbsp;\n                    created <em>{{adapter.getCreatedDate(item)|date:'mediumDate':'UTC'}}</em>\n                </span>\n\n                <span *ngIf=\"adapter?.getModifiedDate(item)\">\n                    &nbsp;\n                    last modified <em>{{adapter.getModifiedDate(item)|date:'mediumDate':'UTC'}}</em>\n                </span>\n\n            </div>\n\n            <div class=\"m-results-item__description u-break--all\" *ngIf=\"showDesc\">\n                <div *ngIf=\"adapter?.getDescription(item)\" [innerHTML]=\"adapter?.getDescription(item)\"> </div>\n                <div *ngIf=\"!adapter?.getDescription(item)\">No description provided</div>\n            </div>\n\n        </div>\n\n        <div class=\"m-results-item__icon\">\n            <ng-container\n                [ngTemplateOutlet]=\"itemThumbnailTemplate || defaultResultItemThumbnailTemplate\"\n                [ngTemplateOutletContext]=\"{item: item}\">\n            </ng-container>\n        </div>\n\n    </div>\n\n    <div class=\"m-results-item__footer\" *ngIf=\"itemFooterTemplate || itemStatsTemplate || itemActionsTemplate\">\n        <ng-container *ngIf=\"itemFooterTemplate\"\n            [ngTemplateOutlet]=\"itemFooterTemplate\"\n            [ngTemplateOutletContext]=\"{item: item}\">\n        </ng-container>\n        <div class=\"m-results-item__stats\" *ngIf=\"!itemFooterTemplate\">\n            <ng-container *ngIf=\"itemStatsTemplate\"\n                [ngTemplateOutlet]=\"itemStatsTemplate\"\n                [ngTemplateOutletContext]=\"{item: item}\">\n            </ng-container>\n        </div>\n        <div class=\"m-results-item__actions\" *ngIf=\"!itemFooterTemplate\">\n            <ng-container *ngIf=\"itemActionsTemplate\"\n                [ngTemplateOutlet]=\"itemActionsTemplate\"\n                [ngTemplateOutletContext]=\"{item: item}\">\n            </ng-container>\n        </div>\n    </div>\n\n\n\n    <ng-template #defaultResultItemHeadingTemplate let-item=\"item\">\n        {{adapter?.getLabel(item)}}\n    </ng-template>\n    <ng-template #defaultResultItemThumbnailTemplate let-item=\"item\">\n        <gp-item-thumbnail [item]=\"item\"></gp-item-thumbnail>\n    </ng-template>\n\n</div>\n",
        styles: [":host .m-results-item .m-results-item__body{-webkit-box-align:center;align-items:center}.m-results-item:hover{background-color:#f8f9fa;box-shadow:none}.m-results-item gp-item-thumbnail{-webkit-box-flex:0;flex:0 1 128px;max-width:128px}@media (min-width:768px){.m-results-item .m-results-item__description{margin:0}}"]
    })
], SearchResultsItemComponent);
export { SearchResultsItemComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2l0ZW0vaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQzlCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBbUIsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdEQsT0FBTyxFQUE0Qiw2QkFBNkIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXpGLE1BQU0sb0JBQW9CLEdBQUcsdURBQXVELENBQUM7QUFDckYsTUFBTSxzQkFBc0IsR0FBRyxnREFBZ0QsQ0FBQztBQUVoRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFNSCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQXFCbkM7UUFqQmdCLGVBQVUsR0FBYSxLQUFLLENBQUM7UUFDN0IsYUFBUSxHQUFlLEtBQUssQ0FBQztRQWFuQyxZQUFPLEdBQStCLElBQUksWUFBWSxFQUFlLENBQUM7SUFHaEUsQ0FBQztJQUVqQixRQUFRO1FBQ0osSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksNkJBQTZCLEVBQUUsQ0FBQztTQUN0RDtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUUsT0FBdUI7UUFDaEMsSUFBRyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEMsOERBQThEO1lBQzlELG1FQUFtRTtZQUNuRSxtQkFBbUI7WUFDbkIsU0FBUztZQUNULEVBQUU7WUFDRix5QkFBeUI7WUFDekIscUJBQXFCO1lBQ3JCLElBQUk7U0FDUDtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNGLElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELG1CQUFtQjtJQUNuQix5RUFBeUU7SUFDekUsNkJBQTZCO0lBQzdCLElBQUk7SUFDSixFQUFFO0lBQ0YsbUJBQW1CO0lBQ25CLDRFQUE0RTtJQUM1RSwyREFBMkQ7SUFDM0QsOENBQThDO0lBQzlDLHdEQUF3RDtJQUN4RCxrRkFBa0Y7SUFDbEYsc0ZBQXNGO0lBQ3RGLHdCQUF3QjtJQUN4QixRQUFRO0lBQ1Isa0VBQWtFO0lBQ2xFLHVEQUF1RDtJQUN2RCxJQUFJO0lBRUo7O09BRUc7SUFDSCxlQUFlLENBQUMsUUFBUTtRQUNwQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDOUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBRUosQ0FBQTtBQWhGWTtJQUFSLEtBQUssRUFBRTt3REFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7MkRBQWlEO0FBQ2hEO0lBQVIsS0FBSyxFQUFFOzhEQUFxQztBQUNwQztJQUFSLEtBQUssRUFBRTs0REFBcUM7QUFHcEM7SUFBUixLQUFLLEVBQUU7dUVBQWlEO0FBRWhEO0lBQVIsS0FBSyxFQUFFO3lFQUFpRDtBQUVoRDtJQUFSLEtBQUssRUFBRTtzRUFBaUQ7QUFFaEQ7SUFBUixLQUFLLEVBQUU7cUVBQWlEO0FBRWhEO0lBQVIsS0FBSyxFQUFFO3VFQUFpRDtBQUUvQztJQUFULE1BQU0sRUFBRTsyREFBdUU7QUFsQnZFLDBCQUEwQjtJQUx0QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLGszSEFBb0M7O0tBRXJDLENBQUM7R0FDVywwQkFBMEIsQ0FrRnRDO1NBbEZZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsXG4gICAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEl0ZW0sIEl0ZW1UeXBlcywgUXVlcnlQYXJhbWV0ZXJzIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbmltcG9ydCB7IFNlYXJjaEV2ZW50LCBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vZXZlbnQnO1xuXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHRzSXRlbUFkYXB0ZXIsIEdlb1BsYXRmb3JtUmVzdWx0c0l0ZW1BZGFwdGVyIH0gZnJvbSAnLi9pdGVtLWFkYXB0ZXInO1xuXG5cblxuY29uc3QgR1BfTUFQX1JFU09VUkNFX1RZUEUgPSAnaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvb250L29wZW5tYXAvR2VvcGxhdGZvcm1NYXAnO1xuY29uc3QgQUdPTF9NQVBfUkVTT1VSQ0VfVFlQRSA9ICdodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3Blbm1hcC9BR09MTWFwJztcblxuLyoqXG4gKiBTZWFyY2ggUmVzdWx0cyBJdGVtIENvbXBvbmVudFxuICpcbiAqIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gZGlzcGxheSBzZWFyY2ggcmVzdWx0cyBpdGVtcy5cbiAqXG4gKiBFeGFtcGxlOlxuICogICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJlc3VsdHNcIj5cbiAqICAgICA8Z3Atc2VhcmNoLXJlc3VsdHMtaXRlbSBbaXRlbV09XCJpdGVtXCI+PC9ncC1zZWFyY2gtcmVzdWx0cy1pdGVtPlxuICogICA8L2Rpdj5cbiAqXG4gKiBMaXN0ZW4gZm9yIHNlbGVjdGlvbiBvciBvdGhlciBldmVudHMgYnkgcGFzc2luZyBhbiBcIm9uRXZlbnRcIiBjYWxsYmFja1xuICpcbiAqIEV4YW1wbGU6XG4gKiAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgcmVzdWx0c1wiPlxuICogICAgIDxncC1zZWFyY2gtcmVzdWx0cy1pdGVtIFtpdGVtXT1cIml0ZW1cIlxuICogICAgICAgICAgKG9uRXZlbnQpPVwiaGFuZGxlSXRlbUV2ZW50KCRldmVudClcIj5cbiAqICAgICA8L2dwLXNlYXJjaC1yZXN1bHRzLWl0ZW0+XG4gKiAgIDwvZGl2PlxuICpcbiAqIEN1c3RvbWl6ZSBob3cgdGhlIGl0ZW0gaXMgZGlzcGxheWVkIHVzaW5nIGFueSBvZiB0aGUgdGVtcGxhdGUgYmluZGluZ3NcbiAqXG4gKiBFeGFtcGxlOlxuICogICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJlc3VsdHNcIj5cbiAqICAgICA8Z3Atc2VhcmNoLXJlc3VsdHMtaXRlbSBbaXRlbV09XCJpdGVtXCJcbiAqICAgICAgICAgIFtpdGVtSGVhZGluZ1RlbXBsYXRlXT1cIm15Q3VzdG9tSGVhZGluZ1RlbXBsYXRlXCJcbiAqICAgICAgICAgIFtpdGVtQWN0aW9uc1RlbXBsYXRlXT1cIm15Q3VzdG9tQWN0aW9uc1RlbXBsYXRlXCI+XG4gKiAgICAgPC9ncC1zZWFyY2gtcmVzdWx0cy1pdGVtPlxuICogICA8L2Rpdj5cbiAqICAgPG5nLXRlbXBsYXRlICNteUN1c3RvbUhlYWRpbmdUZW1wbGF0ZSBsZXQtaXRlbT1cIml0ZW1cIj5cbiAqICAgICA8ZGl2Pk15IEN1c3RvbWl6ZWQge3tpdGVtLmxhYmVsfX08L2Rpdj5cbiAqICAgPC9uZy10ZW1wbGF0ZT5cbiAqICAgPG5nLXRlbXBsYXRlICNteUN1c3RvbUFjdGlvbnNUZW1wbGF0ZSBsZXQtaXRlbT1cIml0ZW1cIj5cbiAqICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlua1wiIChjbGljayk9XCJoYW5kbGVDbGljayhpdGVtKVwiPkNsaWNrIE1lPC9idXR0b24+XG4gKiAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1zZWFyY2gtcmVzdWx0cy1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2l0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pdGVtLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0l0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtICAgICAgIDogSXRlbTtcbiAgICBASW5wdXQoKSBwdWJsaWMgYWRhcHRlciA6IFNlYXJjaFJlc3VsdHNJdGVtQWRhcHRlcjxJdGVtPjtcbiAgICBASW5wdXQoKSBwdWJsaWMgaXNTZWxlY3RlZCA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgc2hvd0Rlc2MgICA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vY3VzdG9tIGhlYWRpbmcgdGVtcGxhdGVcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbUhlYWRpbmdUZW1wbGF0ZSAgIDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvL2N1c3RvbSB0aHVtYm5haWwgdGVtcGxhdGVcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbVRodW1ibmFpbFRlbXBsYXRlIDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvL2N1c3RvbSBmb290ZXIgKGNvbXBsZXRlKVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtRm9vdGVyVGVtcGxhdGUgICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIGZvb3RlciBzdGF0cyB0ZW1wbGF0ZVxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtU3RhdHNUZW1wbGF0ZSAgICAgOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8vY3VzdG9tIGZvb3RlciBhY3Rpb25zIHRlbXBsYXRlXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1BY3Rpb25zVGVtcGxhdGUgICA6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAT3V0cHV0KCkgb25FdmVudCA6IEV2ZW50RW1pdHRlcjxTZWFyY2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaEV2ZW50PigpO1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmKCF0aGlzLmFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlciA9IG5ldyBHZW9QbGF0Zm9ybVJlc3VsdHNJdGVtQWRhcHRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoIGNoYW5nZXMgOiBTaW1wbGVDaGFuZ2VzICkge1xuICAgICAgICBpZihjaGFuZ2VzLml0ZW0gfHwgY2hhbmdlcy5hZGFwdGVyKSB7XG4gICAgICAgICAgICAvLyBsZXQgaXRlbSA9IGNoYW5nZXMuaXRlbSA/IGNoYW5nZXMuaXRlbS5jdXJyZW50VmFsdWUgOiBudWxsO1xuICAgICAgICAgICAgLy8gbGV0IGFkYXB0ZXIgPSBjaGFuZ2VzLmFkYXB0ZXIgPyBjaGFuZ2VzLmFkYXB0ZXIuY3VycmVudFZhbHVlIDogKFxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYWRhcHRlclxuICAgICAgICAgICAgLy8gICAgICk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gaWYoaXRlbSAmJiAhYWRhcHRlcikge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuYWRhcHRlciA9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhIHNlbGVjdGlvbiBldmVudCBmb3IgdGhlIGl0ZW1cbiAgICAgKi9cbiAgICBzZWxlY3QoKSB7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlNFTEVDVCwgeyB2YWx1ZTogdGhpcy5pdGVtIH0pO1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgLy8gZ2V0SWNvbkNsYXNzKCkge1xuICAgIC8vICAgICBsZXQgdHlwZSA9IHRoaXMuaXRlbS50eXBlLnJlcGxhY2UoL15bYS16XStcXDovaSwgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gICAgIHJldHVybiAnaWNvbi0nICsgdHlwZTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBnZXRUeXBlTGFiZWwoKSB7XG4gICAgLy8gICAgIGlmKCBJdGVtVHlwZXMuU0VSVklDRSA9PT0gdGhpcy5pdGVtLnR5cGUgJiYgISF0aGlzLml0ZW0uc2VydmljZVR5cGUgKVxuICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbS5zZXJ2aWNlVHlwZS5sYWJlbCB8fCBcIlNlcnZpY2VcIjtcbiAgICAvLyAgICAgaWYoIEl0ZW1UeXBlcy5NQVAgPT09IHRoaXMuaXRlbS50eXBlKSB7XG4gICAgLy8gICAgICAgICBsZXQgcmVzVHlwZXMgPSB0aGlzLml0ZW0ucmVzb3VyY2VUeXBlcyB8fCBbXTtcbiAgICAvLyAgICAgICAgIGlmKCB+cmVzVHlwZXMuaW5kZXhPZihHUF9NQVBfUkVTT1VSQ0VfVFlQRSkgKSByZXR1cm4gJ0dlb1BsYXRmb3JtIE1hcCc7XG4gICAgLy8gICAgICAgICBpZiggfnJlc1R5cGVzLmluZGV4T2YoQUdPTF9NQVBfUkVTT1VSQ0VfVFlQRSkgKSByZXR1cm4gJ0FyY0dJUyBPbmxpbmUgTWFwJztcbiAgICAvLyAgICAgICAgIHJldHVybiBcIk1hcFwiO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGlmKCBJdGVtVHlwZXMuQ09OVEFDVCA9PT0gdGhpcy5pdGVtLnR5cGUpIHJldHVybiAnQ29udGFjdCc7XG4gICAgLy8gICAgIHJldHVybiB0aGlzLml0ZW0udHlwZS5yZXBsYWNlKC9eW2Etel0rXFw6L2ksICcnKTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGEgc2VhcmNoIGV2ZW50IHdoaWNoIGNvbnN0cmFpbnMgYnkgY3JlYXRvclxuICAgICAqL1xuICAgIGNvbnN0cmFpblRvVXNlcih1c2VybmFtZSkge1xuICAgICAgICBsZXQgY2hhbmdlID0ge307XG4gICAgICAgIGNoYW5nZVtRdWVyeVBhcmFtZXRlcnMuQ1JFQVRFRF9CWV0gPSB1c2VybmFtZTtcbiAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIGNoYW5nZSk7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbn1cbiJdfQ==