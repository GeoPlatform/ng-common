import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
import { SearchEvent } from '../../../event';
export declare class TopicFilterComponent extends ItemFilterComponent {
    key: string;
    onEvent: EventEmitter<any>;
    constructor(service: ItemService, dialog: MatDialog);
    getKey(): string;
    notify(event: SearchEvent): void;
}
