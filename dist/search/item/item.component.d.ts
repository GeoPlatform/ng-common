import { OnInit, OnDestroy, OnChanges, SimpleChanges, EventEmitter, TemplateRef } from '@angular/core';
import { Item } from '@geoplatform/client';
import { SearchEvent } from '../../event';
import { SearchResultsItemAdapter } from './item-adapter';
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
export declare class SearchResultsItemComponent implements OnInit, OnChanges, OnDestroy {
    item: Item;
    adapter: SearchResultsItemAdapter<Item>;
    isSelected: boolean;
    showDesc: boolean;
    itemHeadingTemplate: TemplateRef<any>;
    itemThumbnailTemplate: TemplateRef<any>;
    itemFooterTemplate: TemplateRef<any>;
    itemStatsTemplate: TemplateRef<any>;
    itemActionsTemplate: TemplateRef<any>;
    onEvent: EventEmitter<SearchEvent>;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /**
     * Triggers a selection event for the item
     */
    select(): void;
    /**
     * Trigger a search event which constrains by creator
     */
    constrainToUser(username: any): void;
}
