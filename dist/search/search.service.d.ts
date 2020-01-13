import { Observable, Subject, Subscription } from 'rxjs';
import { Item, Query, SearchResults, ItemService } from '@geoplatform/client';
/**
 *
 */
export interface SearchServiceEvent<Q, R, I> {
    query?: Q;
    results?: R;
    selected?: I[];
    error?: Error;
}
/**
 *
 */
export interface GeoPlatformSearchServiceEvent extends SearchServiceEvent<Query, SearchResults, Item> {
}
/**
 * Search Aware Component Interface
 *
 * Components which implement this interface can receive notifications when their
 * subscribed-to SearchService implementation trigger changes to queries,
 * search results, and selections
 */
export interface SearchAwareComponent<Q, R, I> {
    onQueryChange(query: Q): void;
    onResultsChange(results: R, error?: Error): void;
    onSelectedChange(selected: I[]): void;
}
/**
 * Search Service Interface
 *
 * Services which implement this interface can act as data providers for
 * SearchAwareComponent implementations
 */
export interface SearchService<Q, R, I> {
    setQuery(query: Q): any;
    getQuery(): Q;
    getResults(): R;
    search(query?: Q): any;
    select(item: I | I[]): any;
    isSelected(item: I): boolean;
    hasSelected(): boolean;
    getSelected(): I[];
    clearSelected(): any;
    subscribe(listener: SearchAwareComponent<Q, R, I>): Subscription;
}
/**
 * Abstract Search Service
 *
 * Base Search Service implementation which implements most of the interfaces
 * methods. The remaning methods are required to be implemented by specific
 * implementations of this class
 */
export declare abstract class AbstractSearchService<Q, R, I> implements SearchService<Q, R, I> {
    private _query;
    private _results;
    private _selected;
    private _error;
    protected subject: Subject<SearchServiceEvent<Q, R, I>>;
    protected subject$: Observable<SearchServiceEvent<Q, R, I>>;
    constructor();
    /**
     * Factory to create the internal subject used to notify subscribers to
     * changes in the data the search service is managing.
     */
    abstract createSubject(): Subject<SearchServiceEvent<Q, R, I>>;
    /**
     * Triggers a query of data using either the supplied query instance or
     * the most recent one managed by this service
     */
    abstract search(query?: Q): any;
    /** Method to compare two items for similarity */
    protected abstract compareItems(a: I, b: I): boolean;
    /** Method to sort search result items */
    protected abstract sortItems(items: I[]): any;
    /**
     * Notify subscribers of a change to one or more pieces of managed data
     */
    emit(event: SearchServiceEvent<Q, R, I>): void;
    getError(): Error;
    protected setError(err: Error): void;
    /**
     * Updates the query managed by this search service instance and optionally
     * triggers a refresh of search results using that query
     */
    setQuery(query: Q, andSearch?: boolean): void;
    getQuery(): Q;
    getResults(): R;
    protected setResults(results: R): void;
    /**
     * Toggle one or more items as selected
     */
    select(item: I | I[]): void;
    /**
     * Internal method which toggles an Item as selected (or de-selected if it
     * was already selected) and optionally triggers a notification of a change
     * in the selected items managed by this service instance
     */
    protected _toggleItem(item: I, fireEvent: boolean): void;
    /**
     * @param item being checked for selection
     * @return boolean
     */
    isSelected(item: I): boolean;
    /**
     * @return boolean true if there is one or more selected items
     */
    hasSelected(): boolean;
    /**
     * @return array of selected items
     */
    getSelected(): I[];
    protected setSelected(sel: I[]): void;
    /**
     * De-selects all currently selected items
     */
    clearSelected(): void;
    /**
     * Registers a listener on this service's subject which will be notified
     * upon any change in managed data
     */
    subscribe(listener: SearchAwareComponent<Q, R, I>): Subscription;
}
/**
 * GeoPlatform Search Service
 *
 * Instance of SearchService which allows searching GeoPlatform Portfolio (RIM)
 * Items (Datasets, Maps, Layers, Services, etc)
 */
export declare class GeoPlatformSearchService extends AbstractSearchService<Query, SearchResults, Item> {
    private service;
    constructor(service: ItemService);
    protected getService(): ItemService;
    createSubject(): Subject<SearchServiceEvent<Query, SearchResults, Item>>;
    /**
     *
     */
    getQuery(): Query;
    /**
     *
     */
    search(query?: Query): void;
    /**
     *
     */
    _toggleItem(item: Item, fireEvent: boolean): void;
    compareItems(a: Item, b: Item): boolean;
    sortItems(items: Item[]): void;
}
