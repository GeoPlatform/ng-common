import {
    Component, OnInit, OnChanges, SimpleChanges,
    Input, Output, EventEmitter, Inject
} from '@angular/core';
import { Item, QueryParameters, ItemService } from "@geoplatform/client";

import { SearchEvent, EventTypes } from '../../../event';


@Component({
  selector: 'gp-similarity-filter',
  templateUrl: './similarity.component.html',
  styleUrls: ['./similarity.component.less']
})
export class SimilarityFilterComponent implements OnInit, OnChanges {

    @Input()  key     : string = QueryParameters.SIMILAR_TO;
    @Input()  selected: string;
    @Output() onEvent : EventEmitter<SearchEvent> = new EventEmitter<SearchEvent>();

    public  isCollapsed : boolean = true;
    public    item : Item;

    constructor( @Inject(ItemService) private service : ItemService ) { }

    ngOnInit() { }

    ngOnChanges( changes : SimpleChanges ) {
        if(changes.selected) {
            let id = changes.selected.currentValue;
            if(!id) this.item = null;
            else {
                this.service.get(id)
                .then( (result : Item) => { this.item = result; })
                .catch( (err : Error) => {
                    console.log("SimilarityFilter.OnChange('selected') : ", err);
                });
            }
        }
    }


    clear() {
        let change = {};
        change[this.key] = null;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
}
