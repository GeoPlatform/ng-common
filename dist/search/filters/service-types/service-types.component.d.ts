import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Query, Item, ItemService } from '@geoplatform/client';
import { SearchEvent } from '../../../event';
export declare class ServiceTypeFilterComponent implements OnInit, OnDestroy {
    private service;
    key: string;
    selected: string[];
    query: Query;
    onEvent: EventEmitter<SearchEvent>;
    isCollapsed: boolean;
    types: Item[];
    constructor(service: ItemService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    hasSelections(): boolean;
    isSelected(value: any): boolean;
    getIndexOf(value: any): number;
    isSupported(): boolean;
    toggle(value: any): void;
    clear(): void;
    getCount(value: any): number;
}
