import { OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item, KGService } from "@geoplatform/client";
export declare class SemanticFilterComponent implements OnInit {
    private service;
    dialog: MatDialog;
    key: string;
    onEvent: EventEmitter<any>;
    isCollapsed: boolean;
    selected: Item[];
    visibleAmount: number;
    constructor(service: KGService, dialog: MatDialog);
    ngOnInit(): void;
    openDialog(): void;
    getKey(): string;
    notify(): void;
    hasSelections(): boolean;
    isSelected(arg: Item): boolean;
    getIndexOf(arg: Item): number;
    /**
     * @param arg - item or identifier
     */
    toggle(arg: Item): void;
    clear(): void;
}
