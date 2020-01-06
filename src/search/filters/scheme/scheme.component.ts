import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Query, ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';

import { SearchEvent, EventTypes } from '../../../event';

@Component({
  selector: 'gp-scheme-filter',
  templateUrl: '../item-filter.component.html',
  styleUrls: ['./scheme.component.less']
})
export class SchemeFilterComponent extends ItemFilterComponent {

    //the key associated with this filter's selections
    @Input()  key       : string = QueryParameters.SCHEMES_ID;
    //the current set of values
    @Input()  selected  : string[] = [];
    //the query being affected by this filter's selections
    // used to determine if this filter should be shown or not
    @Input()  query     : Query;
    @Output() onEvent   : EventEmitter<any> = new EventEmitter<any>();

    constructor(
        @Inject(ItemService) service : ItemService,
        dialog : MatDialog
    ) {
        super(service, ItemTypes.CONCEPT_SCHEME, "Scheme", dialog);
    }

    getKey() : string {
        return this.key;
    }

    notify( event : SearchEvent ) {
        this.onEvent.emit(event);
    }

    isSupported() : boolean {
        if(this.query) {
            let types = this.query.getTypes();
            return types && types.length && types.indexOf(ItemTypes.CONCEPT)>=0;
        }
        return false;
    }

}
