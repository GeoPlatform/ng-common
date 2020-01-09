import {
    Component, OnInit, OnChanges, TemplateRef,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { Item } from "@geoplatform/client";

import { SearchEvent, EventTypes } from '../../event';

@Component({
  selector: 'gp-selected-items',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.less']
})
export class SelectedItemsComponent implements OnInit {

    @Input() public selected : Item[];
    @Input() public itemTemplate: TemplateRef<any>;
    @Output() onEvent : EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges( changes : SimpleChanges ) {

    }

    clear() {
        let event = new SearchEvent(EventTypes.SELECT_NONE);
        this.onEvent.emit(event);
    }

    remove( item : Item ) {
        let event = new SearchEvent(EventTypes.SELECT, {value: item});
        this.onEvent.emit(event);
    }
}
