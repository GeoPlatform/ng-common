import { OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { Item } from "@geoplatform/client";
export declare class SelectedItemsComponent implements OnInit {
    selected: Item[];
    onEvent: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    clear(): void;
    remove(item: Item): void;
}
