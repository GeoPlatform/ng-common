import {
    Component, OnInit, OnChanges,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { Item } from "@geoplatform/client";

@Component({
  selector: 'gpmm-selected-items',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.less']
})
export class SelectedItemsComponent implements OnInit {

    @Input() selected : Item[];
    @Output() onEvent : EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges( changes : SimpleChanges ) {

    }

    clear() {
        this.onEvent.emit( { name: 'selected:clear' } );
    }

    remove( item : Item ) {
        
    }
}
