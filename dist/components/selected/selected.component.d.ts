import { OnInit, TemplateRef, EventEmitter, SimpleChanges } from '@angular/core';
import { Item } from "@geoplatform/client";
export declare class SelectedItemsComponent implements OnInit {
    selected: Item[];
    itemTemplate: TemplateRef<any>;
    onEvent: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    clear(): void;
    remove(item: Item): void;
}
