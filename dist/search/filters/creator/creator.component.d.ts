import { OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ItemService } from "@geoplatform/client";
import { AuthenticatedComponent, AppAuthService } from '../../../auth';
interface Creator {
    id: string;
    label: string;
    count: number;
}
export declare class CreatedByFilterComponent extends AuthenticatedComponent implements OnInit, OnDestroy {
    private service;
    key: string;
    selected: string;
    onEvent: EventEmitter<any>;
    typeaheadValue: string;
    isCollapsed: boolean;
    pagination: {
        page: number;
        size: number;
    };
    values: Creator[];
    pagedValues: Creator[];
    outsideSelection: Creator;
    visibleAmount: number;
    constructor(authService: AppAuthService, service: ItemService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    notify(): void;
    hasSelections(): boolean;
    isSelected(arg: string): boolean;
    getIndexOf(arg: string): number;
    /**
     * @param arg - item or identifier
     */
    toggle(arg: string): void;
    clear(): void;
    fetchValues(): void;
    /**
     *
     */
    nextPage(): void;
    /**
     *
     */
    prevPage(): void;
    /**
     * @param resetStart boolean indicating to reset pagination start
     */
    updatePagedValues(resetStart?: boolean): void;
    /**
     *
     */
    checkForOutsideSelections(): void;
    /**
     *
     */
    clearTypeAhead(): void;
    /**
     *
     */
    toggleCurrentUser(): void;
    getCurrentUserName(): string;
    getSelection(): any;
}
export {};
