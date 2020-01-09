import {
    Inject, Component, OnInit, OnDestroy,
    Input, Output, EventEmitter, TemplateRef
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatSelectChange } from '@angular/material';
import { Observer, Subscription } from 'rxjs';
import { Config, Query, SearchResults, Item } from "@geoplatform/client";
// import { AppAuthService, AuthenticatedComponent } from "../../auth";
import { SearchEvent, EventTypes } from "../../event";
import { SearchService, SearchServiceEvent, SearchAwareComponent } from "../search.service";
import { SearchResultsItemAdapter, GeoPlatformResultsItemAdapter } from "../item/item-adapter";
import { logger } from '../../logger';


export interface SearchSortOption {
    value: string;
    label: string;
};

const DEFAULT_SORT_OPTIONS : SearchSortOption[] = [
    { value: "_score,desc",     label: "Relevance"  },
    { value: "modified,desc",   label: "Most Recently Modified"  },
    { value: "modified,asc",    label: "Least Recently Modified" },
    { value: "label,asc",       label: "Title [A-Z]" },
    { value: "label,desc",      label: "Title [Z-A]" },
    { value: "reliability,asc", label: "Reliability" }
];


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
@Component({
  selector: 'gp-search-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.less']
})
export class SearchResultsComponent implements OnInit, OnDestroy, SearchAwareComponent {

    @Input()  service     : SearchService;
    @Input()  sortOptions : SearchSortOption[] = DEFAULT_SORT_OPTIONS;
    @Input() public showDesc   : boolean = false;

    @Input() public adapter : SearchResultsItemAdapter<Item>;

    //custom heading template
    @Input() public itemHeadingTemplate   : TemplateRef<any>;
    //custom thumbnail template
    @Input() public itemThumbnailTemplate : TemplateRef<any>;
    //custom footer (complete)
    @Input() public itemFooterTemplate    : TemplateRef<any>;
    //custom footer stats template
    @Input() public itemStatsTemplate     : TemplateRef<any>;
    //custom footer actions template
    @Input() public itemActionsTemplate   : TemplateRef<any>;

    @Output() onEvent     : EventEmitter<SearchEvent> = new EventEmitter<SearchEvent>();

    public query : Query;
    public results : SearchResults;
    public selected : Item[];
    public sortValue : string;
    public isLoading : boolean = false;
    public error : Error;

    //listener for when SearchService fires events for change in
    // query, results, or selected items
    private subscription : Subscription;


    constructor(
        // @Inject(AppAuthService) authService : AppAuthService,
        private dialog : MatDialog
    ) {
        // super(authService);
    }

    ngOnInit() {
        // super.init();

        if(!this.adapter) {
            this.adapter = new GeoPlatformResultsItemAdapter();
        }

        this.sortValue = this.sortOptions[0].value;
        this.subscription = this.service.subscribe(this);
    }

    ngOnDestroy() {
        // super.destroy();

        if(this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.query = null;
        this.results = null;
        this.selected = null;
    }

    onQueryChange( query : Query ) {
        this.query = query;
        this.isLoading = true;
    }
    onResultsChange( results : SearchResults, error ?: Error ) {
        this.results = results;
        this.error = (error) ? error : null;
        this.isLoading = false;
    }
    onSelectedChange( selected : Item[] ) {
        this.selected = selected;
    }

    /**
     *
     */
    isSelected (item : Item) : boolean {
        return this.service.isSelected(item);
    }

    selectAllInPage() {
        if(this.onEvent) {
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
    onItemEvent( $event : SearchEvent ) {
        let name = $event.getType(); //$event.name;
        if( !name ) return;
        switch( name ) {

            case EventTypes.SELECT :
            if(this.onEvent) this.onEvent.emit($event);
            break;

            case EventTypes.QUERY :
            let query = this.service.getQuery();
            query.applyParameters($event.getOptions());
            this.service.search(query);
            break;

        }
    }

    /**
     * @param pageNo - new page number being requested
     */
    onPagingEvent( event : PageEvent ) {
        let query = this.service.getQuery();
        let previous = query.getPage();
        let current = event.pageIndex;
        if(previous !== current) {
            query.page(current);
        }
        query.setPageSize( event.pageSize );

        if(this.onEvent) {
            let event = new SearchEvent(EventTypes.QUERY, { value : query });
            this.onEvent.emit(event);
        }
    }

    onSortChange($event : MatSelectChange) {
        let query = this.service.getQuery();
        query.sort(this.sortValue);

        if(this.onEvent) {
            let event = new SearchEvent(EventTypes.QUERY, { value : query });
            this.onEvent.emit(event);
        }
    }

}
