import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Inject } from '@angular/core';
import {
    Query, QueryParameters, ItemTypes, Item, ItemService, SearchResults
} from '@geoplatform/client';

import { SearchEvent, EventTypes } from '../../../event';

@Component({
    selector: 'gp-service-type-filter',
    templateUrl: './service-types.component.html',
    styleUrls: ['./service-types.component.scss']
})
export class ServiceTypeFilterComponent implements OnInit, OnDestroy {

    //the key associated with this filter's selections
    @Input()  key       : string = QueryParameters.SERVICE_TYPES;
    //the current set of values
    @Input()  selected  : string[] = [];
    //the query being affected by this filter's selections
    // used to determine if this filter should be shown or not
    @Input()  query     : Query;
    @Output() onEvent   : EventEmitter<SearchEvent> = new EventEmitter<SearchEvent>();

    public  isCollapsed : boolean = true;
    public  types       : Item[] = [];

    constructor(
        @Inject(ItemService) private service : ItemService
    ) { }

    ngOnInit() {
        let query = new Query({
            type:           'dct:Standard',
            resourceType:   'ServiceType',
            fields:         "availableVersions",
            size:           50,
            sort:           'label,asc'
        });
        this.service.search(query)
        .then( (response : SearchResults) => {
            this.types = response.results;
        })
        .catch( (error : Error) => {
            console.log("Error loading supported service types");
        });
    }

    ngOnDestroy () {
        this.types = null;
        // this.svcQuery = null;
        // this.serviceSvc = null;
        // this.serviceTypes = null;
        // this.serviceTypesError = null;
        // this.byType = null;
    }

    hasSelections () : boolean {
        return this.selected && this.selected.length > 0;
    }

    isSelected (value : any) : boolean {
        return this.hasSelections() && this.selected.indexOf(value) >= 0;
    }

    getIndexOf(value : any) : number {
        return this.hasSelections() ? this.selected.indexOf(value) : -1;
    }

    isSupported() : boolean {
        if(this.query) {
            let types = this.query.getTypes();
            return types && types.length && types.indexOf(ItemTypes.SERVICE)>=0;
        }
        return false;
    }

    toggle (value : any) {
        let result = this.selected.slice(0);
        let idx = this.getIndexOf(value);
        if(idx >= 0) {
            result = result.splice(idx, 1);
        } else {
            result.push(value);
        }

        let change = {};
        change[this.key] = result;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }

    clear () {
        if(!this.hasSelections())
            this.isCollapsed = !this.isCollapsed; //toggle collapsed state
        else {
            let change = {};
            change[this.key] = null;
            let event = new SearchEvent(EventTypes.QUERY, change);
            this.onEvent.emit(event);
        }
    }

    getCount (value : any) : number {
        // var facet = this.service.getFacet("serviceTypes");
        // if(!facet) return '';
        // var valObj = facet.buckets.find(function(v) { return v.label===value; });
        // if(!valObj) return '';
        // return valObj.count;
        return 0;
    }




/*
    // isSupported () {
    //     let objTypes = this.service.getTypes();
    //     return objTypes && (
    //         ~objTypes.indexOf( APIClient.ItemTypes.DATASET ) ||
    //         ~objTypes.indexOf( APIClient.ItemTypes.LAYER )
    //     );
    // }

    getValue() : any {
        // return this.service.getService();
        return null;
    }

    setValue( value : any ) {
        // this.service.setService(value);
        // this.svcInstValue = value;
        //
        // if(!this.hasSelections())
        // this.values = [];
    }

    hasSelections () : boolean {
        // return !!this.getValue();
        return false;
    }

    isSelected ( value : any ) {
        // let current = this.getValue();
        // if(!current) return false;
        // return current === value.id;
        return false;
    }

    toggle ( value : any ) {
        // let val = value;
        // if(this.isSelected(value)) {
        //     val = null;
        // }
        // this.setValue(val);
    }

    clear () {
        if(!this.hasSelections()) {
            this.isCollapsed = !this.isCollapsed;
        } else {
            this.setValue(null);
        }
    }

    getCount ( value : any ) : number {
        return 0;
    }


    updateValues (query : Query) {

        // if(!query || !query.length) {
        //     this.values = this.values.filter( v => this.isSelected(v) );
        //     return;
        // }
        //
        // this.svcQuery.q(query);
        //
        // return this.serviceSvc.search(this.svcQuery)
        // .then( (response) => {
        //     this.$timeout( () => {
        //         let newValues = response.results;
        //         if(this.hasSelections() && this.values && this.values.length) {
        //             let existing = this.values.filter( v => {
        //                 //find existing values that are selected
        //                 return this.isSelected(v) &&
        //                 // but not in new set of values
        //                 !newValues.filter( nv => nv.id === v.id).length;
        //             });
        //             newValues = existing.concat(newValues);
        //         }
        //         this.values = newValues;
        //     });
        // })
        // .catch( (error) => {
        //     let err = (error && error.message) ? error :
        //     (error && error.data) ? error.data : {
        //         message: "something unexpected came back from GeoPlatform API"
        //     };
        //     console.log("An error occurred searching Services...");
        //     console.log(err.message);
        // });
    }
*/
}
