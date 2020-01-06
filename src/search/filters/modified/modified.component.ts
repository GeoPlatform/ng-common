import {
    Component, OnInit, Input, Output, EventEmitter
} from '@angular/core';
import { QueryParameters } from "@geoplatform/client";

import { SearchEvent, EventTypes } from '../../../event';


@Component({
  selector: 'gp-modified-filter',
  templateUrl: './modified.component.html',
  styleUrls: ['./modified.component.less']
})
export class ModifiedFilterComponent implements OnInit {

    @Input() key            : string = QueryParameters.MODIFIED;
    @Input() value          : Date;
    @Output() onEvent       : EventEmitter<any> = new EventEmitter<any>();

    public isCollapsed : boolean = true;
    public format : string = 'MMM dd yyyy';
    public debouncePromise : any = null;
    public lastModifiedOptions : any[] = [
        { value: "Before", before: true },
        { value: "After",  before: false }
    ];
    public lastModifiedDir : any = this.lastModifiedOptions[1];

    constructor() { }

    ngOnInit() {
    }

    onKeyUp($event) {
        let text = $event.target.value;
        this.onValueChange(text);
    }

    onValueChange( value ) {
        let change = {};

        if(this.lastModifiedDir.before) {
            change[QueryParameters.MODIFIED_BEFORE] = value;
            change[QueryParameters.MODIFIED_AFTER] = null;
        } else {
            change[QueryParameters.MODIFIED_BEFORE] = null;
            change[QueryParameters.MODIFIED_AFTER] = value;
        }

        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }

    onDirChange() {
        this.onValueChange(this.value);
    }

    clear() {
        if(this.value) {
            this.value = null;
            this.onValueChange(this.value);

        } else {
            this.isCollapsed = true;
        }
    }
}
