import { Subscription } from 'rxjs';
import { Item, Query, SearchResults, ItemService } from '@geoplatform/client';
/**
 *
 */
export interface SearchServiceEvent {
    query?: Query;
    results?: SearchResults;
    selected?: Item[];
}
/**
 *
 */
export interface SearchAwareComponent {
    onQueryChange(query: Query): void;
    onResultsChange(results: SearchResults): void;
    onSelectedChange(selected: Item[]): void;
}
/**
 *
 */
export declare class SearchService {
    private service;
    private query;
    private results;
    private selected;
    private subject;
    private subject$;
    constructor(service: ItemService);
    setQuery(query: Query): void;
    getQuery(): Query;
    getResults(): SearchResults;
    search(query?: Query): void;
    /**
     * @param item - item or array of item selected from search results
     * @param asBaseLayer - boolean indicating how to select the layer
     */
    select(item: Item | Item[]): void;
    /**
     *
     */
    _toggleItem(item: Item, fireEvent: boolean): void;
    /**
     * @param item Item
     * @return boolean
     */
    isSelected(item: Item): boolean;
    /**
     *
     */
    hasSelected(): boolean;
    /**
     * @return Item[]
     */
    getSelected(): Item[];
    clearSelected(): void;
    subscribe(listener: SearchAwareComponent): Subscription;
}
