import {
    Component, OnInit, Input, Output, EventEmitter, ViewChild
} from '@angular/core';
import {
    MatDatepicker, MatDatepickerInputEvent,
    DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS
} from '@angular/material';
import { QueryParameters } from "@geoplatform/client";

import { SearchEvent, EventTypes } from '../../../event';


const BEFORE = "Before";
const AFTER  = "After";


@Component({
  selector: 'gp-modified-filter',
  templateUrl: './modified.component.html',
  styleUrls: ['./modified.component.less']
})
export class ModifiedFilterComponent implements OnInit {

    @Input() key            : string = QueryParameters.MODIFIED;
    @Input() value          : number;
    @Output() onEvent       : EventEmitter<any> = new EventEmitter<any>();
    @ViewChild(MatDatepicker, {static:false}) datepicker: MatDatepicker<Date>;

    public isCollapsed         : boolean = true;
    public format              : string = 'MM/DD/YYYY' //'MMM dd yyyy';
    public debouncePromise     : any = null;
    public lastModifiedOptions : string[] = [BEFORE, AFTER];
    public lastModifiedDir     : string = BEFORE;

    constructor() { }

    ngOnInit() {
        // console.log("Modified.init() : " + this.lastModifiedDir);
    }

    // onKeyUp($event) {
    //     let text = $event.target.value;
    //     this.onValueChange(text);
    // }

    onDateChanged( event: MatDatepickerInputEvent<Date> ) {
        this.value = event && event.value ? event.value.getTime() : null;
        this.onValueChange( this.value );
    }

    onValueChange( value ) {
        let change = {};

        if(BEFORE === this.lastModifiedDir) {
            change[QueryParameters.MODIFIED_BEFORE] = value;
            change[QueryParameters.MODIFIED_AFTER] = null;
        } else {
            change[QueryParameters.MODIFIED_AFTER] = value;
            change[QueryParameters.MODIFIED_BEFORE] = null;
        }

        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }

    onDirChange() {
        // console.log("Modified.onDirChange() : " + this.lastModifiedDir);
        if(this.value) {
            this.onValueChange(this.value);
        }
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
