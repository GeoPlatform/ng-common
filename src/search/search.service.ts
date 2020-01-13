import { Inject, Injectable } from '@angular/core';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { Item, Query, SearchResults, ItemService } from '@geoplatform/client';
import { logger } from '../logger';


/**
 *
 */
export interface SearchServiceEvent<Q,R,I> {
    query    ?: Q;
    results  ?: R;
    selected ?: I[];
    error    ?: Error;
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
export interface SearchAwareComponent<Q,R,I> {
    onQueryChange( query : Q ) : void;
    onResultsChange( results : R, error ?: Error ) : void;
    onSelectedChange( selected : I[] ) : void;
}

/**
 * Search Service Interface
 *
 * Services which implement this interface can act as data providers for
 * SearchAwareComponent implementations
 */
export interface SearchService<Q,R,I> {
    setQuery(query : Q);
    getQuery() : Q;
    getResults() : R;
    search(query ?: Q);
    select( item : I|I[] );
    isSelected( item : I ) : boolean;
    hasSelected() : boolean;
    getSelected() : I[];
    clearSelected();
    subscribe( listener : SearchAwareComponent<Q,R,I> ) : Subscription;
}


const INVALID_SUBJECT_ERROR = "SearchService implementation must create a valid Subject using SearchService.prototype.createSubject()";

/**
 * Abstract Search Service
 *
 * Base Search Service implementation which implements most of the interfaces
 * methods. The remaning methods are required to be implemented by specific
 * implementations of this class
 */
export abstract class AbstractSearchService<Q,R,I> implements SearchService<Q,R,I> {

    private _query : Q;
    // protected query    : Q;

    private _results : R;
    // protected results  : R;

    private _selected: I[] = [];
    // protected selected : I[] = [];

    private _error : Error;
    // protected error    : Error;

    protected subject : Subject<SearchServiceEvent<Q,R,I>>;
    protected subject$ : Observable<SearchServiceEvent<Q,R,I>>;

    constructor() {
        this.subject = this.createSubject();
        if(!this.subject) {
            throw new Error(INVALID_SUBJECT_ERROR);
        }
        this.subject$ = this.subject.asObservable();
    }

    /**
     * Factory to create the internal subject used to notify subscribers to
     * changes in the data the search service is managing.
     */
    public abstract createSubject() : Subject<SearchServiceEvent<Q,R,I>>;

    /**
     * Triggers a query of data using either the supplied query instance or
     * the most recent one managed by this service
     */
    public abstract search(query ?: Q);

    /** Method to compare two items for similarity */
    protected abstract compareItems(a : I, b : I) : boolean;

    /** Method to sort search result items */
    protected abstract sortItems( items: I[] );

    /**
     * Notify subscribers of a change to one or more pieces of managed data
     */
    public emit( event : SearchServiceEvent<Q,R,I> ) {
        this.subject.next(event);
    }

    public getError() : Error { return this._error; }
    protected setError( err : Error ) { this._error = err; }

    /**
     * Updates the query managed by this search service instance and optionally
     * triggers a refresh of search results using that query
     */
    public setQuery(query : Q, andSearch ?: boolean) {
        this._query = query;
        this.emit({ query : query });

        if( true === andSearch ) {
            this.search();
        }
    }
    public getQuery() : Q { return this._query; }

    public getResults() : R { return this._results; }
    protected setResults( results : R ) { this._results = results; }

    /**
     * Toggle one or more items as selected
     */
    public select( item : I|I[] ) {
        if(Array.isArray(item)) { //multiple selections
            item.forEach( it => this._toggleItem(it, false) );
            this.emit({ selected: this._selected });
            return;
        }
        this._toggleItem( item, true );
    }

    /**
     * Internal method which toggles an Item as selected (or de-selected if it
     * was already selected) and optionally triggers a notification of a change
     * in the selected items managed by this service instance
     */
    protected _toggleItem( item : I, fireEvent : boolean ) {
        if(!item) return;
        let position = this._selected.findIndex( (s:I) => this.compareItems(s, item) );
        if(position >= 0) { //already selected, deselect it and return
            this._selected.splice(position, 1);
            if(fireEvent) this.emit({selected: this._selected});
            return;
        }
        this._selected.push(item);
        this.sortItems(this._selected);
        if(fireEvent) this.emit({selected: this._selected});
    }

    /**
     * @param item being checked for selection
     * @return boolean
     */
    public isSelected( item : I ): boolean {
        return this._selected.length && item &&
            this._selected.findIndex( (it:I) => this.compareItems(it, item) ) >= 0;
    }

    /**
     * @return boolean true if there is one or more selected items
     */
    public hasSelected() : boolean {
        return this._selected && this._selected.length > 0;
    }

    /**
     * @return array of selected items
     */
    public getSelected() : I[] {
        return this._selected;
    }
    protected setSelected( sel : I[] ) { this._selected = sel; }

    /**
     * De-selects all currently selected items
     */
    public clearSelected() {
        this._selected = [];
        this.emit({ selected: this._selected });
    }

    /**
     * Registers a listener on this service's subject which will be notified
     * upon any change in managed data
     */
    public subscribe( listener : SearchAwareComponent<Q,R,I> ) : Subscription {

        let obs : Observer<SearchServiceEvent<Q,R,I>> = {
            next : (value: SearchServiceEvent<Q,R,I>) => {
                if( typeof(value) === 'undefined' || value === null) return;
                if(value.query)
                    listener.onQueryChange( value.query );
                if(value.results)
                    listener.onResultsChange( value.results, value.error||null );
                if(value.selected)
                    listener.onSelectedChange( value.selected );
            },
            error : ( err: Error ) => {
                console.log("[ERROR] " + err.message);
            },
            complete : () => { }
        };

        let sub = this.subject$.subscribe( obs );

        if(this._query) {
            this.emit({ query : this._query });
        }
        if(this._results || this._error) {
            this.emit({ results : this._results, error: this._error||null });
        }
        if(this._selected) {
            this.emit({ selected : this._selected });
        }

        return sub;
    }

}







/**
 * GeoPlatform Search Service
 *
 * Instance of SearchService which allows searching GeoPlatform Portfolio (RIM)
 * Items (Datasets, Maps, Layers, Services, etc)
 */
@Injectable()
export class GeoPlatformSearchService extends AbstractSearchService<Query, SearchResults, Item>{

    constructor(
        @Inject(ItemService) private service : ItemService
    ) {
        super();
    }

    protected getService() : ItemService { return this.service; }

    createSubject() : Subject<SearchServiceEvent<Query,SearchResults,Item>> {
        return new Subject<SearchServiceEvent<Query,SearchResults,Item>>();
    }

    /**
     *
     */
    getQuery() : Query {
        return super.getQuery().clone();
    }

    // /**
    //  *
    //  */
    // setQuery(query : Query) {
    //     super.setQuery( query ? query.clone() : query );
    // }

    /**
     *
     */
    search(query ?: Query) {
        //if a query was provided, store it and use it
        if(query) this.setQuery(query);

        this.service.search( super.getQuery() )
        .then( (response : SearchResults) => {
            logger.debug('SearchService.search() - ' + response.totalResults + " results found");
            this.setResults(response);
            this.setError(null);
            this.emit({ results : response, error: null });
        })
        .catch( (error : Error) => {
            logger.error(error.message);
            this.setError(error);
            this.emit({ results : null, error: error });
        });
    }


    /**
     *
     */
    _toggleItem( item : Item, fireEvent : boolean ) {
        if(!item || !item.id) return;
        let selected = this.getSelected();
        let position = selected.findIndex( s => s.id === item.id );
        if(position >= 0) { //already selected, deselect it and return
            selected.splice(position, 1);
            this.setSelected(selected);
            if(fireEvent) this.emit({selected: selected});
            return;
        }

        //new selection
        // logger.error(`Selecting ${item.label} as ${entry.type.toString()}`);

        //fetch full object and replace placeholder in selected array
        this.service.get(item.id)
        .then( fullItem => {
            let selected = this.getSelected();
            selected.push(fullItem);
            this.sortItems(selected);
            this.setSelected(selected);
            if(fireEvent) this.emit({selected: selected});
        })
        .catch(e => {
            logger.error("SearchService.select() - " +
                "Error encountered fetching selected item's details: " + e.message);
        });
    }

    compareItems(a : Item, b : Item) : boolean {
        return a.id === b.id;
    }

    sortItems( items: Item[] ) {
        items.sort((a,b) => a.label > b.label ? 1 : -1 );
    }

}
