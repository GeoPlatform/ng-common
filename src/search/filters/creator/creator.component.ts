import {
    Component, OnInit, OnDestroy, Input, Output, EventEmitter, Inject
} from '@angular/core';
import {
    Query, QueryParameters, QueryFacets, ItemService, SearchResults
} from "@geoplatform/client";

import { SearchEvent, EventTypes } from '../../../event';
import { AuthenticatedComponent, AppAuthService } from '../../../auth';


interface Creator {
    id   : string;
    label: string;
    count: number;
};


@Component({
  selector: 'gp-createdby-filter',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.less']
})
export class CreatedByFilterComponent extends AuthenticatedComponent implements OnInit, OnDestroy {

    @Input() key            : string = QueryParameters.QUERY;
    @Input() selected       : string;
    @Output() onEvent       : EventEmitter<any> = new EventEmitter<any>();

    public typeaheadValue   : string = null;
    public isCollapsed      : boolean = true;
    public pagination       : { page: number; size: number; } = { page: 0, size: 10 };
    public values           : Creator[] = [];
    public pagedValues      : Creator[] = [];
    public outsideSelection : Creator;
    public visibleAmount : number = 10;

    constructor(
        authService : AppAuthService,
        @Inject(ItemService) private service : ItemService
    ) {
        super(authService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.selected = null;
        this.fetchValues();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.values = null;
        this.pagedValues = null;
        this.pagination = null;
        this.selected = null;
        this.outsideSelection = null;
    }

    notify( ) {
        let key = this.key;
        let change = {};
        change[key] = this.selected;
        change[QueryParameters.PAGE] = 0;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }

    hasSelections() : boolean {
        return this.selected && this.selected.length > 0;
    }

    isSelected( arg : string ) : boolean {
        return this.hasSelections() && this.getIndexOf(arg) >= 0;
    }

    getIndexOf( arg : string ) : number {
        if(!this.selected || !this.selected.length) return -1;
        return this.selected.indexOf(arg);
    }


    /**
     * @param arg - item or identifier
     */
    toggle( arg : string ) {
        if(this.selected && this.selected === arg) this.selected = null;
        else this.selected = arg;
        this.notify();
    }

    clear () {
        if(this.hasSelections()) {
            this.selected = null;
            this.notify();

        } else if( this.isCollapsed ){
            this.isCollapsed = false;
        }
    }


    fetchValues() {
       let query = new Query().pageSize(1)
           .facets(QueryFacets.CREATED_BY)
           .parameter('includeFacet._createdBy.size', 1000);   //TODO not use Registry name

       this.service.search(query)
       .then( (response : SearchResults) => {
           let facet = response.facets.find( facet => facet.name==='createdBy');
           if(!facet) this.values = [];
           else {
               this.values = (facet.buckets||[]).map( (bucket:any) => {
                   // Awaiting DT-1092 resolution
                   return {
                       id   : bucket.label,
                       label: bucket.label,
                       count: bucket.count
                   };
               });
           }
       })
       .catch(e => { this.values = []; })
       .finally ( () => {
           this.updatePagedValues();
       });
    }

    /**
     *
     */
    nextPage() {
        let numPages = Math.ceil(this.values.length / this.pagination.size);
        this.pagination.page = Math.min( numPages-1, this.pagination.page+1);
        this.updatePagedValues();
    }

    /**
     *
     */
    prevPage() {
        this.pagination.page = Math.max(0, this.pagination.page-1);
        this.updatePagedValues();
    }

    /**
     * @param resetStart boolean indicating to reset pagination start
     */
    updatePagedValues( resetStart ?: boolean ) {

        if(resetStart) this.pagination.page = 0;

        let values = this.values;
        if(this.typeaheadValue && this.typeaheadValue.length) {
            values = values.filter( v => v.label.indexOf(this.typeaheadValue) >=0 );
        }

        if(values.length < this.pagination.size) {
            this.pagination.page = 0;   //reset current page
            this.pagedValues = values;
            console.log("Paged Values: " + JSON.stringify(this.pagedValues));
        }
        let start = this.pagination.page*this.pagination.size;
        let end = Math.min(start + this.pagination.size, values.length);
        this.pagedValues = values.slice(start, end);

        this.checkForOutsideSelections();
    }

    /**
     *
     */
    checkForOutsideSelections() {
        let selected = this.getSelection();
        if( selected && !this.pagedValues.find(v => v.id === selected) ) {
            this.outsideSelection = selected;
        } else {
            this.outsideSelection = null;
        }
    }

    /**
     *
     */
    clearTypeAhead() {
        this.typeaheadValue = null;
        this.updatePagedValues();
    }

    /**
     *
     */
    toggleCurrentUser() {
        let username = this.getCurrentUserName();
        if(username) this.toggle( username );
        else { console.log("No user to use to filter"); }
    }

    getCurrentUserName() {
        if(!this.isAuthenticated()) return null;
        let user = this.getUser();
        return user ? user.username : null;
    }

    getSelection() {
       // let value = this.service.getCreatedBy();
       // if(Array.isArray(value)) return value.length ? value[0] : null;
       // return value;
       return null;
   }
}
