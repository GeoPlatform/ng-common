import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Query, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
import { SearchEvent } from '../../../event';
export declare class SchemeFilterComponent extends ItemFilterComponent {
    key: string;
    selected: string[];
    query: Query;
    onEvent: EventEmitter<any>;
    constructor(service: ItemService, dialog: MatDialog);
    getKey(): string;
    notify(event: SearchEvent): void;
    isSupported(): boolean;
}
