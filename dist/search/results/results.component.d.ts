import { OnInit, OnDestroy, EventEmitter, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatSelectChange } from '@angular/material';
import { Query, SearchResults, Item } from "@geoplatform/client";
import { SearchEvent } from "../../event";
import { SearchService, SearchAwareComponent } from "../search.service";
import { SearchResultsItemAdapter } from "../item/item-adapter";
export interface SearchSortOption {
    value: string;
    label: string;
}
export declare class SearchResultsComponent implements OnInit, OnDestroy, SearchAwareComponent {
    private dialog;
    service: SearchService;
    sortOptions: SearchSortOption[];
    showDesc: boolean;
    adapter: SearchResultsItemAdapter<Item>;
    itemHeadingTemplate: TemplateRef<any>;
    itemThumbnailTemplate: TemplateRef<any>;
    itemFooterTemplate: TemplateRef<any>;
    itemStatsTemplate: TemplateRef<any>;
    itemActionsTemplate: TemplateRef<any>;
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
