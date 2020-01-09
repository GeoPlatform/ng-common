import {
    Component, OnInit, Input, Output, EventEmitter
} from '@angular/core';
import { QueryParameters } from "@geoplatform/client";

import { SearchEvent, EventTypes } from '../../../event';

@Component({
  selector: 'gp-keywords-filter',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.less']
})
export class KeywordFilterComponent implements OnInit {

    @Input() key            : string = QueryParameters.QUERY;
    @Input() searchString   : string;
    @Input() placeholder    : string = "Search GeoPlatform";
    @Output() onEvent       : EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    onKeyUp($event) {
        let text = $event.target.value;
        this.onValueChange(text);
    }

    onValueChange( value ) {
        let change = {};
        change[this.key] = value && value.length ? value : null;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }

    clear() {
        this.searchString=null;
        this.onValueChange(null);
    }
}
