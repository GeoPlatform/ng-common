import { OnInit, OnDestroy, EventEmitter, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatSelectChange } from '@angular/material';
import { Query, SearchResults, Item } from "@geoplatform/client";
import { SearchEvent } from "../../event";
import { GeoPlatformSearchService, SearchAwareComponent } from "../search.service";
import { SearchResultsItemAdapter } from "../item/item-adapter";
export interface SearchSortOption {
    value: string;
    label: string;
}
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
export declare class SearchResultsComponent implements OnInit, OnDestroy, SearchAwareComponent<Query, SearchResults, Item> {
    private dialog;
    service: GeoPlatformSearchService;
    sortOptions: SearchSortOption[];
    showDesc: boolean;
    hasPrimaryAction: boolean;
    adapter: SearchResultsItemAdapter<Item>;
    itemHeadingTemplate: TemplateRef<any>;
    itemSubHeadingTemplate: TemplateRef<any>;
    itemThumbnailTemplate: TemplateRef<any>;
    itemContentTemplate: TemplateRef<any>;
    itemFooterTemplate: TemplateRef<any>;
    itemStatsTemplate: TemplateRef<any>;
    itemActionsTemplate: TemplateRef<any>;
    itemPrimaryActionTemplate: TemplateRef<any>;
    onEvent: EventEmitter<SearchEvent>;
    query: Query;
    results: SearchResults;
    selected: Item[];
    sortValue: string;
    isLoading: boolean;
    error: Error;
    private subscription;
    constructor(dialog: MatDialog);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onQueryChange(query: Query): void;
    onResultsChange(results: SearchResults, error?: Error): void;
    onSelectedChange(selected: Item[]): void;
    /**
     *
     */
    isSelected(item: Item): boolean;
    selectAllInPage(): void;
    deselectAll(): void;
    /**
     *
     */
    onItemEvent($event: SearchEvent): void;
    /**
     * @param pageNo - new page number being requested
     */
    onPagingEvent(event: PageEvent): void;
    onSortChange($event: MatSelectChange): void;
}
