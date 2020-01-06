import { OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item, ItemService, Query } from '@geoplatform/client';
import { SearchEvent } from '../../event';
export declare abstract class ItemFilterComponent implements OnInit, OnDestroy {
    private service;
    private types;
    filterLabel: string;
    isCollapsed: boolean;
    choices: any[];
    selected: Item[];
    dialog: MatDialog;
    protected query: Query;
    constructor(service: ItemService, types: string | string[], label?: string, dialog?: MatDialog);
    ngOnInit(): void;
    ngOnDestroy(): void;
    openDialog(): void;
    /**
     * @return configuration options for the material dialog used to select new values
     */
    getDialogOptions(): any;
    isSupported(): boolean;
    /**
     *
     */
    initQuery(): void;
    hasSelections(): boolean;
    isSelected(arg: Item): boolean;
    /**
     * @param arg - item or identifier
     */
    toggle(arg: Item): void;
    clear(): void;
    protected abstract getKey(): string;
    protected abstract notify(event: SearchEvent): any;
}
