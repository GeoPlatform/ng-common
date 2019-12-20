import { Inject, Injectable } from '@angular/core';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { Item, Query, SearchResults, ItemService } from '@geoplatform/client';
import { logger } from '../logger';


/**
 *
 */
export interface SearchServiceEvent {
    query    ?: Query;
    results  ?: SearchResults;
    selected ?: Item[]
}

/**
 *
 */
export interface SearchAwareComponent {
    onQueryChange( query : Query ) : void;
    onResultsChange( results : SearchResults ) : void;
    onSelectedChange( selected : Item[] ) : void;
}


/**
 *
 */
@Injectable()
export class SearchService {

    private query    : Query;
    private results  : SearchResults;
    private selected : Item[] = [] as Item[];

    private subject = new Subject<SearchServiceEvent>();
    private subject$ = this.subject.asObservable();


    constructor(
        @Inject(ItemService) private service : ItemService
    ) {

    }

    setQuery(query : Query) {
        this.query = query ? query.clone() : new Query();
        this.subject.next({ query : this.query.clone() });
    }

    getQuery() : Query {
        return this.query.clone();
    }

    getResults() : SearchResults {
        return this.results;
    }

    search(query ?: Query) {

        //if a query was provided, store it and use it
        if(query) this.setQuery(query);

        this.service.search(this.query)
        .then( (response:SearchResults) => {
            logger.debug('SearchService.search() - ' + response.totalResults + " results found");
            this.results = response;
            this.subject.next({ results : response });
        })
        .catch( (error : Error) => {
            logger.error(error.message);
        });
    }


    /**
     * @param item - item or array of item selected from search results
     * @param asBaseLayer - boolean indicating how to select the layer
     */
    select( item : Item|Item[] ) {

        if(Array.isArray(item)) { //multiple selections
            item.forEach( it => this._toggleItem(it, false) );
            this.subject.next({ selected: this.selected });
            return;
        }

        this._toggleItem( item, true );
    }

    /**
     *
     */
    _toggleItem( item : Item, fireEvent : boolean ) {
        if(!item || !item.id) return;

        let position = this.selected.findIndex( s => s.id === item.id );

        if(position >= 0) { //already selected, deselect it and return
            this.selected.splice(position, 1);
            if(fireEvent) this.subject.next({selected: this.selected});
            return;
        }

        //new selection
        // logger.error(`Selecting ${item.label} as ${entry.type.toString()}`);

        //fetch full object and replace placeholder in selected array
        this.service.get(item.id)
        .then( fullItem => {
            this.selected.push(fullItem);
            this.selected.sort( (a,b) => a.label > b.label ? 1 : -1 );
            if(fireEvent) this.subject.next({selected: this.selected});
        })
        .catch(e => {
            logger.error("SearchService.select() - " +
                "Error encountered fetching selected item's details: " + e.message);
        });
    }

    /**
     * @param item Item
     * @return boolean
     */
    isSelected( item : Item ): boolean {
        return this.selected.length &&
            item && item.id &&
            this.selected.findIndex(it=>it.id===item.id) >= 0;
    }

    /**
     *
     */
    hasSelected() : boolean {
        return this.selected && this.selected.length > 0;
    }

    /**
     * @return Item[]
     */
    getSelected() : Item[] {
        return this.selected;
    }

    clearSelected() {
        this.selected = [];
        this.subject.next({ selected: this.selected });
    }


    subscribe( listener : SearchAwareComponent ) : Subscription {

        let obs : Observer<SearchServiceEvent> = {
            next : (value: SearchServiceEvent) => {
                if( typeof(value) === 'undefined' || value === null) return;
                if(value.query)
                    listener.onQueryChange( value.query );
                if(value.results)
                    listener.onResultsChange( value.results );
                if(value.selected)
                    listener.onSelectedChange( value.selected );
            },
            error : ( err: Error ) => {
                console.log("[ERROR] " + err.message);
            },
            complete : () => { }
        };

        return this.subject$.subscribe( obs );
    }

}
