import { OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Item, ItemService } from "@geoplatform/client";
import { SearchEvent } from '../../../event';
export declare class SimilarityFilterComponent implements OnInit, OnChanges {
    private service;
    key: string;
    selected: string;
    onEvent: EventEmitter<SearchEvent>;
    isCollapsed: boolean;
    item: Item;
    constructor(service: ItemService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    clear(): void;
}
